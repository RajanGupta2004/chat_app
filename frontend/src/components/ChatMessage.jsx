import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, X } from "lucide-react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const ChatMessage = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreView] = useState("");
  const inputfileRef = useRef();
  const { sendMessage, messages } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("please the  image file...");
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      setImagePreView(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreView(null);
    if (inputfileRef.current) {
      inputfileRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreView("");
      if (inputfileRef.current) {
        inputfileRef.current.value = "";
      }
    } catch (error) {
      console.log("Error in send message", error);
    }
  };

  return (
    <div>
      {imagePreview && (
        <div>
          <div className="relative w-32">
            <img src={imagePreview} alt="image" className="w-32 h-32" />
            <X className="absolute top-0 right-0" onClick={removeImage} />
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 p-4">
        <input
          type="email"
          className={`p-2 outline-none  w-full rounded-md `}
          placeholder="type your message...."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <form onSubmit={handleSendMessage}>
          <input
            type="file"
            ref={inputfileRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            <Image onClick={() => inputfileRef.current.click()} />
            <button type="submit">
              <Send />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatMessage;
