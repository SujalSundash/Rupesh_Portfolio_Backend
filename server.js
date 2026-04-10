const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const path = require("path");
const { initSocket } = require("./utils/socket");
const http = require("http");

// ROUTES
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const noticeRoutes = require("./routes/noticeBoxRoutes");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const blogRoutes = require("./routes/blogRoutes");
const newsletterRourtes = require("./routes/newsletterRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const statsRoutes = require("./routes/statsRoutes");
const videoRoutes = require("./routes/videoRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
const app = express();

// ── Middleware ───────────────────────────────────────────
app.use(express.json());

// ── CORS ─────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://v-ideo-editor.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        console.log("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ── HTTP Server + Socket.io ──────────────────────────────
const server = http.createServer(app);
initSocket(server);

// ── Test Route ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Server running successfully...");
});

// ── API Routes ───────────────────────────────────────────
app.use("/api/contact", contactRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/newsletter", newsletterRourtes);
app.use("/api/partners", partnerRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/chats", chatRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {      
  console.log(`🚀 Server running on port ${PORT}`);
  connectDb();
});