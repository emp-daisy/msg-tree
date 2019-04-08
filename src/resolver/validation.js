import validator from 'validator';

const isNotObjectId = (id) => {
  return  !validator.isMongoId(id);
}

export { isNotObjectId };
