import validator from "validator";

const isNotObjectId = id => {
  return !validator.isMongoId(id);
};
const isNotPhoneNumber = mobile => {
  return !(
    validator.isLength(mobile, { min: 10, max: 11 }) &&
    validator.equals(mobile.charAt(0), '0')
  );
};

export { isNotObjectId, isNotPhoneNumber };
