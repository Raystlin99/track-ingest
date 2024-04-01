import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const contractSchema = new Schema({
  name: { type: String, required: true },
});
const Contract = model('Contract', contractSchema);

export const createContract = async (name) => {
  const contract = await Contract.findOne({ name });

  if (contract) {
    return contract;
  }

  return await Contract.create({ name });
};

export default Contract;
