const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT || 5000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

app.use(cors());
app.use(routes);

io.on("connection", socket => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answerCall", data => {
    io.to(data.to).emit("callAcepted", data.signal);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
