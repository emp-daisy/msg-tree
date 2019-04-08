import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
});

contactSchema.pre('remove', function(next) {
  this.model('Message').deleteMany({
    $or: [
      {senderMobile: this.mobile},
      {receiverMobile: this.mobile}
    ]}, next);
});

//Alias _id to id virtually
contactSchema.virtual('id').get(function() { return this._id; });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;