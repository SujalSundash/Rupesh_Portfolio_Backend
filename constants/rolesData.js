// rolesData.ts
const rolesData = [
  {
    name: "admin",
    permissions: [
      "create_role",
      "delete_role",
      "view_users",
      "delete_user",
      "assign_role",
      "create_admin",
      "verify_user",
      "manage_all_portfolios"
    ]
  },
  {
    name: "editor",
    permissions: [
      "update_own_profile",
      "add_portfolio_video",
      "edit_portfolio_video",
      "delete_portfolio_video",
      "add_skills",
      "update_skills",
      "update_bio",
      "update_social_links"
    ]
  },
  {
    name: "user",
    permissions: [
      "view_verified_users",
      "like_portfolio_video",
      "comment_portfolio_video",
      "follow_user",
      "send_message",
      "view_own_profile"
    ]
  }
];

module.exports = rolesData;