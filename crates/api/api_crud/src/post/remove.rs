use activitypub_federation::config::Data;
use actix_web::web::Json;
use lemmy_api_utils::{
  build_response::build_post_response,
  context::LemmyContext,
  send_activity::{ActivityChannel, SendActivityData},
  utils::check_community_mod_action,
};
use lemmy_db_schema::{
  source::{
    community::Community,
    local_user::LocalUser,
    mod_log::moderator::{ModRemovePost, ModRemovePostForm},
    post::{Post, PostUpdateForm},
    post_report::PostReport,
  },
  traits::{Crud, Reportable},
};
use lemmy_db_views_local_user::LocalUserView;
use lemmy_db_views_post::api::{PostResponse, RemovePost};
use lemmy_utils::error::LemmyResult;

pub async fn remove_post(
  data: Json<RemovePost>,
  context: Data<LemmyContext>,
  local_user_view: LocalUserView,
) -> LemmyResult<Json<PostResponse>> {
  let post_id = data.post_id;

  // We cannot use PostView to avoid a database read here, as it doesn't return removed items
  // by default. So we would have to pass in `is_mod_or_admin`, but that is impossible without
  // knowing which community the post belongs to.
  let orig_post = Post::read(&mut context.pool(), post_id).await?;
  let community = Community::read(&mut context.pool(), orig_post.community_id).await?;

  check_community_mod_action(&local_user_view, &community, false, &mut context.pool()).await?;

  LocalUser::is_higher_mod_or_admin_check(
    &mut context.pool(),
    orig_post.community_id,
    local_user_view.person.id,
    vec![orig_post.creator_id],
  )
  .await?;

  // Update the post
  let post_id = data.post_id;
  let removed = data.removed;
  let post = Post::update(
    &mut context.pool(),
    post_id,
    &PostUpdateForm {
      removed: Some(removed),
      ..Default::default()
    },
  )
  .await?;

  PostReport::resolve_all_for_object(&mut context.pool(), post_id, local_user_view.person.id)
    .await?;

  // Mod tables
  let form = ModRemovePostForm {
    mod_person_id: local_user_view.person.id,
    post_id: data.post_id,
    removed: Some(removed),
    reason: data.reason.clone(),
  };
  ModRemovePost::create(&mut context.pool(), &form).await?;

  ActivityChannel::submit_activity(
    SendActivityData::RemovePost {
      post,
      moderator: local_user_view.person.clone(),
      reason: data.reason.clone(),
      removed: data.removed,
    },
    &context,
  )?;

  build_post_response(&context, orig_post.community_id, local_user_view, post_id).await
}
