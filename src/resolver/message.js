import _, { pickBy, identity } from 'lodash';
import models from "../models";
import { isNotObjectId } from "./validation";
const { Message, Contact } = models;

const MessageResolver = {
  messageById: async ({ id }) => {
    if (isNotObjectId(id)) throw new Error("Invalid id parameter");
    const message = await Message.findById(id);
    return message;
  },
  messageByContact: async ({ mobile }) => {
    const message = await Message.find({ $or: [
      {senderMobile: mobile},
      {receiverMobile:mobile}
    ]});
    return message;
  },
  messages: async () => {
    const message = await Message.find();
    return message;
  },
  newMessage: async ({ input: { senderMobile, receiverMobile, text } }) => {
    if(senderMobile===receiverMobile) throw new Error("Cannot send message to same number!");

    const validMobile = await Contact.find({ mobile: { $in: [ senderMobile, receiverMobile ] } });
    if(validMobile.length !== 2) throw new Error("Mobile number not in contact!");

    let message = new Message({senderMobile, receiverMobile, text});
    try {
      const messageData = await message.save()
      return messageData;
    } catch (err) {
      throw new Error("Failed to save to Database");
    }
  },
  editMessage: async ({ input:{ text, status, id } }) => {
    if (isNotObjectId(id)) throw new Error("Invalid id parameter");
    let message;
    try {
      message = await Message.findByIdAndUpdate(
        id, pickBy({status, text}, identity), {new: true});
      } catch (err) {
        throw new Error("Failed to save to Database");
      }
      if(message === null) throw new Error("Message does not exist");
      return message;
  },
  deleteMessage: async ({ id }) => {
    if (isNotObjectId(id)) throw new Error("Invalid id parameter");
    let message;
    try {
      message = await Message.findByIdAndDelete(id);
      } catch (err) {
        throw new Error("Failed to save to Database");
      }
      if(message === null) throw new Error("Message does not exist");
      return message;
  }
};

export default MessageResolver;