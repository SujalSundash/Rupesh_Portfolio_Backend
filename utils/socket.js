const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      // ✅ Match your server.js allowedOrigins exactly
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    // ✅ Allow both transports on server side too
    transports: ["polling", "websocket"],
  });

  console.log("🔌 Socket.io initialized");

  io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`📌 ${socket.id} joined room: ${roomId}`);
    });

    socket.on("clientMessage", (data) => {
      console.log("📨 clientMessage from:", data.senderEmail);
      io.to("admin").emit("roleMessage", {
        ...data,
        senderType: "user",
      });
    });

    socket.on("adminReply", (data) => {
      console.log("📨 adminReply to:", data.senderEmail);
      io.to(data.senderEmail).emit("clientReceiveMessage", {
        message: data.message,
        senderName: "Support",
      });
    });

    socket.on("disconnect", (reason) => {
      // ✅ Log reason so you know WHY it disconnected
      console.log("❌ Disconnected:", socket.id, "reason:", reason);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

module.exports = { initSocket, getIO };