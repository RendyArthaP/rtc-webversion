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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
