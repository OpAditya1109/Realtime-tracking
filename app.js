const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const path = require("path");

app.set("views", path.join(__dirname, "views"));  // Ensure Express knows where the views directory is


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000; // Use dynamic port from Vercel
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
