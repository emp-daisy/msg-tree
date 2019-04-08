import _, { pickBy, identity } from 'lodash';
import models from "../models";
import { isNotObjectId } from "./validation";
const { Contact } = models;

const ContactResolver = {
  contactById: async ({ id }) => {
    if (isNotObjectId(id)) throw new Error("Invalid id parameter");
    const contact = await Contact.findById(id);
    return contact;
  },
  contactSearch: async ({ input }) => {
    const contact = await Contact.find({
      $or: [{ mobile: new RegExp(input) }, { name: new RegExp(input) }]
    });
    return contact;
  },
  contacts: async () => {
    const contact = await Contact.find();
    return contact;
  },
  addContact: async ({ input: { mobile, name } }) => {
    let contact = await Contact.findOne({ mobile });
    if(contact) throw new Error("Contact already exist");

    contact = new Contact({mobile, name});
    try {
      const contactData = await contact.save()
      return contactData;
    } catch (err) {
      throw new Error("Failed to save to Database");
    }
  },
  editContact: async ({ input:{ mobile, name, id } }) => {
    if (isNotObjectId(id)) throw new Error("Invalid id parameter");
    let contact;
    try {
      contact = await Contact.findByIdAndUpdate(
        id, pickBy({mobile, name}, identity), {new: true});
      } catch (err) {
        throw new Error("Failed to save to Database");
      }
      if(contact === null) throw new Error("Contact does not exist");
      return contact;
  },
  deleteContact: async ({ id }) => {
    if (isNotObjectId(id)) throw new Error("Invalid id parameter");

    let contact = await Contact.findById( id );
    if(contact === null) throw new Error("Contact does not exist");

    try {
      const contactData = await contact.remove()
      return contactData;
      } catch (err) {
        throw new Error("Failed to save to Database");
      }
  }
};

export default ContactResolver;
