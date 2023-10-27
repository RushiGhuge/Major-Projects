const express = require('express');
const http = require('http')
const {Server} = require('socket.io')

const app = express() // express server...
const PORT = 9000;

const server = http.createServer(app);
app.use(express.static('public'))

server.listen(PORT, () => {
    console.log(`server started... on http://localhost:${PORT}`)
})

// app.get('/', (req,res) => {
//     res.sendFile(public+'index.html')
// })

const io = new Server(server)  // instense of server class

io.on("connection", (socket)=>{
    
    socket.on('echo', (data)=>{
        io.emit('echo',data);
    })
    console.log(socket.id);
})