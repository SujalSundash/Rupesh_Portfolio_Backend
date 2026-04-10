const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authorize = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// All roles can send message
router.post(
  "/send",
  authorize,
  roleMiddleware("user", "editor", "admin"),
  chatController.sendMessage
);
router.get("/admin/conversations", authorize, chatController.getAdminConversations);

// Only admin can see all chats
router.get(
  "/",
  authorize,
  roleMiddleware("admin"),
  chatController.getAllChats
);

// Get chats
router.get(
  "/:email",
  authorize,
  chatController.getChatsByEmail
);

// Delete single message
router.delete(
  "/:id",
  authorize,
  chatController.deleteMessage
);

// Delete entire
router.delete(
  "/conversation/:email",
  authorize,
  roleMiddleware("admin"),
  chatController.deleteConversation
);

module.exports = router;