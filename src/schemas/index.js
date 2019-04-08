import {buildSchema}  from "graphql";

const Schema = buildSchema(`
type Contact {
  id: String!
  name: String!
  mobile: String!
}
type Message {
  id: String!
  senderMobile: String!
  receiverMobile: String!
  text: String!
  status: String!
}
input NewContactInput {
  name: String!
  mobile: String!
}
input EditContactInput {
  id: String!
  name: String
  mobile: String
}
input NewMessageInput {
  senderMobile: String!
  receiverMobile: String!
  text: String!
}
input EditMessageInput {
  id: String!
  text: String
  status: String
}
type Query {
  # Contacts
  contactById(id: String!): Contact
  contactSearch(input: String!): [Contact]
  contacts: [Contact]
  # Messages
  messageById(id: String!): [Message]
  messageByContact(mobile: String!): [Message]
}
type Mutation {
  # Contacts
  addContact(input: NewContactInput): Contact
  editContact(input: EditContactInput): Contact
  deleteContact(id: String!): Contact
  # Messages
  newMessage(input: NewMessageInput): Message
  editMessage(input: EditMessageInput): Message
  deleteMessage(id: String!): Message
}
`);

export default Schema;