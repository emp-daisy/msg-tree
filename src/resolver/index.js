import UserResolver from "./contact";
import MessageResolver from "./message";

const Resolver = {
  ...UserResolver,
  ...MessageResolver,
};

export default Resolver;