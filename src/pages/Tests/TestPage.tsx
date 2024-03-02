import React, { useState, useRef, useEffect } from "react";
import SimplePeer from "simple-peer";

const ConferenceForm: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isConnected && peer) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          peer.addStream(stream);
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    }
  }, [isConnected, peer]);

  const handleConnect = () => {
    const newPeer = new SimplePeer({ initiator: true, trickle: false });

    newPeer.on("signal", (data) => {
      // Send the signaling data to the server or the other peer
      console.log("Signaling data:", data);
    });

    newPeer.on("connect", () => {
      console.log("Connected to peer");
      setIsConnected(true);
    });

    setPeer(newPeer);
  };

  const handleJoin = () => {
    const newPeer = new SimplePeer({ trickle: false });

    newPeer.on("signal", (data) => {
      // Send the signaling data to the server or the other peer
      console.log("Signaling data:", data);
    });

    newPeer.on("connect", () => {
      console.log("Connected to peer");
      setIsConnected(true);
    });

    setPeer(newPeer);
  };

  return (
    <div>
      <h2>WebRTC Conference Form</h2>
      <label>
        Room ID:
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleConnect}>Create Room</button>
      <button onClick={handleJoin}>Join Room</button>
      <hr />
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default ConferenceForm;
