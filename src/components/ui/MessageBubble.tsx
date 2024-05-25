import { auth } from "../../config/firebase";
import { MessageModel } from "../../models/Model";
import "./MessageBubble.css";

const MessageBubble: React.FC<{ data: MessageModel }> = ({ data }) => {
  const messageClass = data.uid === auth.currentUser?.uid ? "sent" : "received";
  return (
    <div className={`message-bubble ${messageClass}`}>
      <p className="message-style">{data.message}</p>
    </div>
  );
};

export default MessageBubble;
