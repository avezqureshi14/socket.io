import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
const App = () => {
  const [message, setMessage] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [receiverRoomId, setReceiverRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  // const socket = io("http://localhost:8000/");
  const socket = useMemo(() => io("http://localhost:8000/"), []);
  useEffect(() => {
    socket.on("connect", () => {
      // console.log("Connected", socket.id)
      setCurrentRoomId(socket.id);
    });



    socket.on("receive-message", (data) => {
      console.log(data);
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, receiverRoomId });
    setMessage("");
    setReceiverRoomId("")
  }
  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  }
  return (
    <div>
      <p> {currentRoomId} </p>
      <form onSubmit={(e) => handleJoinRoom(e)} >
        <input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder='Enter Room Name' />
        <br />
        <button type='submit' >Send</button>
      </form>
      <br />
      <form onSubmit={(e) => handleSubmit(e)} >
        <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter message' />
        <br />
        <input type='text' value={receiverRoomId} onChange={(e) => setReceiverRoomId(e.target.value)} placeholder='Enter Room Id' />
        <br />
        <button type='submit' >Send</button>
      </form>
    </div>
  )
}

export default App
