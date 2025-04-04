// DO NOT EDIT THIS FILE!!!
// Update it by running `rake javascript:update_constants`

export const SEARCH_PRIORITIES = {
  ignore: 1,
  very_low: 2,
  low: 3,
  normal: 0,
  high: 4,
  very_high: 5,
};

export const SEARCH_PHRASE_REGEXP = '"([^"]+)"';

export const SIDEBAR_URL = {
  max_icon_length: 40,
  max_name_length: 80,
  max_value_length: 1000,
};

export const SIDEBAR_SECTION = {
  max_title_length: 30,
};

export const CATEGORY_STYLE_TYPES = { square: 0, icon: 1, emoji: 2 };

export const AUTO_GROUPS = {
  everyone: {
    id: 0,
    automatic: true,
    name: "everyone",
    display_name: "everyone",
  },
  admins: { id: 1, automatic: true, name: "admins", display_name: "admins" },
  moderators: {
    id: 2,
    automatic: true,
    name: "moderators",
    display_name: "moderators",
  },
  staff: { id: 3, automatic: true, name: "staff", display_name: "staff" },
  trust_level_0: {
    id: 10,
    automatic: true,
    name: "trust_level_0",
    display_name: "trust_level_0",
  },
  trust_level_1: {
    id: 11,
    automatic: true,
    name: "trust_level_1",
    display_name: "trust_level_1",
  },
  trust_level_2: {
    id: 12,
    automatic: true,
    name: "trust_level_2",
    display_name: "trust_level_2",
  },
  trust_level_3: {
    id: 13,
    automatic: true,
    name: "trust_level_3",
    display_name: "trust_level_3",
  },
  trust_level_4: {
    id: 14,
    automatic: true,
    name: "trust_level_4",
    display_name: "trust_level_4",
  },
};

export const GROUP_SMTP_SSL_MODES = { none: 0, ssl_tls: 1, starttls: 2 };

export const MAX_AUTO_MEMBERSHIP_DOMAINS_LOOKUP = 10;

export const MAX_NOTIFICATIONS_LIMIT_PARAMS = 60;

export const TOPIC_VISIBILITY_REASONS = {
  op_flag_threshold_reached: 0,
  op_unhidden: 1,
  embedded_topic: 2,
  manually_unlisted: 3,
  manually_relisted: 4,
  bulk_action: 5,
  unknown: 99,
};

export const SYSTEM_FLAG_IDS = {
  like: 2,
  notify_user: 6,
  off_topic: 3,
  inappropriate: 4,
  spam: 8,
  illegal: 10,
  notify_moderators: 7,
};

export const SITE_SETTING_REQUIRES_CONFIRMATION_TYPES = {
  simple: "simple",
  user_option: "user_option",
};

export const DEFAULT_USER_PREFERENCES = [
  "default_email_digest_frequency",
  "default_include_tl0_in_digests",
  "default_email_level",
  "default_email_messages_level",
  "default_email_mailing_list_mode",
  "default_email_mailing_list_mode_frequency",
  "default_email_previous_replies",
  "default_email_in_reply_to",
  "default_hide_profile",
  "default_hide_presence",
  "default_other_new_topic_duration_minutes",
  "default_other_auto_track_topics_after_msecs",
  "default_other_notification_level_when_replying",
  "default_other_external_links_in_new_tab",
  "default_other_enable_quoting",
  "default_other_enable_smart_lists",
  "default_other_enable_defer",
  "default_other_dynamic_favicon",
  "default_other_like_notification_frequency",
  "default_other_skip_new_user_tips",
  "default_topics_automatic_unpin",
  "default_categories_watching",
  "default_categories_tracking",
  "default_categories_muted",
  "default_categories_watching_first_post",
  "default_categories_normal",
  "default_tags_watching",
  "default_tags_tracking",
  "default_tags_muted",
  "default_tags_watching_first_post",
  "default_text_size",
  "default_title_count_mode",
  "default_navigation_menu_categories",
  "default_navigation_menu_tags",
  "default_sidebar_link_to_filtered_list",
  "default_sidebar_show_count_of_new_items",
];

export const MAX_UNOPTIMIZED_CATEGORIES = 1000;

export const USER_FIELD_FLAGS = [
  "editable",
  "show_on_profile",
  "show_on_user_card",
  "searchable",
];

export const REPORT_MODES = {
  table: "table",
  chart: "chart",
  stacked_chart: "stacked_chart",
  stacked_line_chart: "stacked_line_chart",
  radar: "radar",
  counters: "counters",
  inline_table: "inline_table",
  storage_stats: "storage_stats",
};

export const REVIEWABLE_UNKNOWN_TYPE_SOURCE = "unknown";

export const ADMIN_SEARCH_RESULT_TYPES = [
  "page",
  "setting",
  "theme",
  "component",
  "report",
];

export const API_KEY_SCOPE_MODES = ["global", "read_only", "granular"];
