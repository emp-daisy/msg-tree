import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderMobile: {
    type: String,
    ref: "Contact.mobile",
    required: true
  },
  receiverMobile: {
    type: String,
    ref: "Contact.mobile",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['sent','read'],
    default: 'sent'
  }
});
//Alias _id to id virtually
messageSchema.virtual('id').get(function() { return this._id; });

const Message = mongoose.model("Message", messageSchema);

export default Message;
