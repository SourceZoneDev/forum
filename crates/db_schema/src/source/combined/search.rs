use crate::newtypes::{
  CommentId,
  CommunityId,
  MultiCommunityId,
  PersonId,
  PostId,
  SearchCombinedId,
};
use chrono::{DateTime, Utc};
#[cfg(feature = "full")]
use i_love_jesus::CursorKeysModule;
#[cfg(feature = "full")]
use lemmy_db_schema_file::schema::search_combined;
use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

#[skip_serializing_none]
#[derive(PartialEq, Eq, Serialize, Deserialize, Debug, Clone)]
#[cfg_attr(
  feature = "full",
  derive(Identifiable, Queryable, Selectable, CursorKeysModule)
)]
#[cfg_attr(feature = "full", diesel(table_name = search_combined))]
#[cfg_attr(feature = "full", diesel(check_for_backend(diesel::pg::Pg)))]
#[cfg_attr(feature = "full", cursor_keys_module(name = search_combined_keys))]
/// A combined table for a search (posts, comments, communities, persons)
pub struct SearchCombined {
  pub id: SearchCombinedId,
  pub published_at: DateTime<Utc>,
  pub score: i64,
  pub post_id: Option<PostId>,
  pub comment_id: Option<CommentId>,
  pub community_id: Option<CommunityId>,
  pub person_id: Option<PersonId>,
  pub multi_community_id: Option<MultiCommunityId>,
}
