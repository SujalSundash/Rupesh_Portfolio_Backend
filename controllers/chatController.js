const Chat = require("../models/chatModel");
const Role = require("../models/Role");
const sendNotification = require("../utils/sendEmail");

// ─── SEND MESSAGE ──────────────────────────────────────
// All roles can send messages
exports.sendMessage = async (req, res) => {
  try {
    const { message, recipientEmail } = req.body;
    const { role, email: senderEmail, name: senderName } = req.user;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const roleObj = await Role.findOne({ name: role.name.toLowerCase() });
    if (!roleObj) {
      return res.status(500).json({ success: false, message: `Role '${role.name}' not found` });
    }

    const newChat = await Chat.create({
      senderName: senderName || "Anonymous",
      senderEmail,
      message,
      role: roleObj._id,
      senderType: role.name.toLowerCase(),
      recipientEmail: recipientEmail || null,
    });

    // Only notify if user role is 'user'
    if (role.name.toLowerCase() === "user") {
      await sendNotification(message, senderEmail);
    }

    res.status(201).json({ success: true, data: newChat });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET ALL CHATS ─────────────────────────────────────
// Only admin can see all
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate("role", "name")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    console.error("getAllChats error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// chatController.js — add this
exports.getAdminConversations = async (req, res) => {
  try {
    if (req.user.role.name.toLowerCase() !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const chats = await Chat.find().sort({ createdAt: 1 });

    // Group by senderEmail (only user-originated conversations)
    const map = new Map();
    chats.forEach((chat) => {
      const key = chat.senderType === "user" 
        ? chat.senderEmail 
        : chat.recipientEmail;
      
      if (!key) return;
      if (!map.has(key)) {
        map.set(key, {
          id: key,
          senderName: chat.senderType === "user" ? chat.senderName : "Unknown",
          senderEmail: key,
          messages: [],
          online: false,
          unread: 0,
        });
      }
      map.get(key).messages.push({
        sender: chat.senderType,
        text: chat.message,
        timestamp: new Date(chat.createdAt).toLocaleTimeString([], {
          hour: "2-digit", minute: "2-digit",
        }),
      });
    });

    res.status(200).json(Array.from(map.values()));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET CHATS BY EMAIL ────────────────────────────────
// Users & editors can see their own chats; admin can see all
exports.getChatsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const userRole = req.user.role.name.toLowerCase();

    if (userRole !== "admin" && req.user.email !== email) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const chats = await Chat.find({
      $or: [{ senderEmail: email }, { recipientEmail: email }],
    })
      .populate("role", "name")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    console.error("getChatsByEmail error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE MESSAGE ─────────────────────────────────────
// Users & editors can delete their own; admin can delete any
exports.deleteMessage = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ success: false, message: "Message not found" });

    const userRole = req.user.role.name.toLowerCase();
    if (userRole !== "admin" && chat.senderEmail !== req.user.email) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("deleteMessage error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE CONVERSATION BY EMAIL ───────────────────────
// Only admin can delete conversations
exports.deleteConversation = async (req, res) => {
  try {
    if (req.user.role.name.toLowerCase() !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { email } = req.params;

    const result = await Chat.deleteMany({
      $or: [{ senderEmail: email }, { recipientEmail: email }],
    });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} messages for ${email}`,
    });
  } catch (error) {
    console.error("deleteConversation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};