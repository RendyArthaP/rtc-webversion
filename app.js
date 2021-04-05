const app = require('express')();
const server = require('http').createServer(app)
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"]
  }
})

app.use(cors())
app.use(routes)

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  })

  socket.on('calluser', ({ userToCall, signalData, from, name}) => {
    io.to(userToCall).emit('calluser', { signal: signalData, from, name})
  })

  socket.on('answercall', (data) => {
    io.to(data.to).emit("callacepted", data.signal)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
