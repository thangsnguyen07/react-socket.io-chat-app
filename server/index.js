require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err.message);
  }
};

connectDB();

// Route
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`User ID: ${socket.id} joined room ${roomId}`);
  });

  socket.on("send-message", (data) => {
    socket.to(data.room).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

//////////////////

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
