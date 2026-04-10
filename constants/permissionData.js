// permissionsData.ts
const permissionsData = [
  // Admin – full control
  { name: "create_role", group: "admin" },
  { name: "delete_role", group: "admin" },
  { name: "view_users", group: "admin" },
  { name: "delete_user", group: "admin" },
  { name: "assign_role", group: "admin" },
  { name: "create_admin", group: "admin" },
  { name: "verify_user", group: "admin" },
  { name: "manage_all_portfolios", group: "admin" },

  // Editor – can manage content / portfolios
  { name: "update_own_profile", group: "editor" },
  { name: "add_portfolio_video", group: "editor" },
  { name: "edit_portfolio_video", group: "editor" },
  { name: "delete_portfolio_video", group: "editor" },
  { name: "add_skills", group: "editor" },
  { name: "update_skills", group: "editor" },
  { name: "update_bio", group: "editor" },
  { name: "update_social_links", group: "editor" },

  // User – viewer / regular user
  { name: "view_verified_users", group: "user" },
  { name: "like_portfolio_video", group: "user" },
  { name: "comment_portfolio_video", group: "user" },
  { name: "follow_user", group: "user" },
  { name: "send_message", group: "user" },
  { name: "view_own_profile", group: "user" }
];

module.exports = permissionsData;