import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;
import Contract from './Contract.js';

const trackSchema = new Schema({
  title: { type: String, required: true },
  version: String,
  artist: String,
  isrc: { type: String, required: true },
  pline: String,
  aliases: [String],
  contract: {
    type: SchemaTypes.ObjectId,
    ref: 'Contract',
    required: false,
  },
});
const Track = model('Track', trackSchema);

export const createTrack = async ({ title, version, artist, isrc, pline, aliases, contract }) => {
  const track = await Track.findOne({ title });

  if (track) {
    return track;
  }

  let existingContract;
  if (contract) {
    existingContract = await Contract.findOne({ name: contract });

    if (!existingContract) {
      throw new Error(`[Track] Contract not found: ${contract}`);
    }
  }

  return await Track.create({
    title,
    version,
    artist,
    isrc,
    pline,
    aliases: aliases.split(';').map((alias) => alias.trim()),
    contract: existingContract && existingContract._id,
  });
};

export default Track;
