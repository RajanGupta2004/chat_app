import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    if (!loggedInUser) {
      return res.status(400).json({ message: "userId is required....." });
    }
    const filterUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    if (!filterUser) {
      return res.status(404).json({ message: "Users are not found" });
    }

    res.status(200).json({ sideBarUser: filterUser });
  } catch (error) {
    console.log("ERROR to get all user", error.message);
    return res.status(500).json({
      message: "Error in get all user for side bar",
      error: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, reciverId: userToChatId },
        { senderId: userToChatId, reciverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in get message", error);
    return res
      .status(500)
      .json({ message: "Error to get message", error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    if (!senderId || !reciverId) {
      return res
        .status(400)
        .json({ message: "senderId and reciverId is required" });
    }

    let imageURL = "";

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = await new Message({
      senderId,
      reciverId,
      text,
      image: imageURL,
    }).save();

    if (!newMessage) {
      return res.status(400).json({ message: "Error in create message" });
    }

    // implement socket.io

    const reciverSocketId = getReceiverSocketId(reciverId);
    console.log(reciverSocketId);

    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res
      .status(201)
      .json({ message: "message create successfully", newMessage });
  } catch (error) {
    console.log("Erorr in send Message", error);
    return res
      .status(500)
      .json({ message: "Error in send Message", error: error.message });
  }
};

export { getUserForSideBar, getMessages, sendMessage };
