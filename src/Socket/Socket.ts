import { io } from "../index";
import { getAllTypeAttack } from "../Server/AttacktypeServer";

io.on("connection", (socket) => {
    //console.log(`Client connected: ${socket.id}`);
    
socket.on("getTypes", async() => {
    const types = await getAllTypeAttack()
    socket.emit("sendTypes", types.filter(x => x != "Unknown"));
})}) 