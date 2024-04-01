import xlsx from 'node-xlsx';
import { createTrack } from '../../model/Track.js';

export const ingest = (filename) => {
  try {
    const worksheet = xlsx.parse(`data/${filename}.xlsx`);
    return worksheet;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const formatHeaders = (headers) => headers.map((header) => header.toLowerCase().replace(/ /g, '_'));

export const ingestWorksheet = async (worksheet) => {
  const errors = [];

  if (!worksheet || !worksheet[0] || !worksheet[0].data) {
    errors.push('[Ingest] No worksheet found');
    return { errors };
  }

  // Expect headers in first row - could be more defensive with this
  const headers = worksheet[0].data[0];
  if (!headers) {
    errors.push('[Ingest] No headers found');
    return { errors };
  }

  const formattedHeaders = formatHeaders(headers);

  const data = worksheet[0].data.slice(1);
  const tracks = data.map((row) => {
    const track = {};
    formattedHeaders.forEach((header, index) => track[header] = row[index]);
    return track;
  });

  const newTracks = [];
  let lineNumber = 1;
  for (const track of tracks) {
    try {
      if (!track.title || !track.isrc) {
        errors.push(`[Error] Line Number: ${lineNumber} / [Ingest] Missing required data`);
      } else {
        const newTrack = await createTrack(track);
        newTracks.push(newTrack);
      }
    } catch (err) {
      errors.push(`[Error] Line Number: ${lineNumber} / ${err.message}`);
    }

    lineNumber++;
  };

  return { errors, tracks: newTracks };
};
