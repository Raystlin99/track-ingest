import mongoose from 'mongoose';
import Contract, { createContract } from './model/Contract.js';
import { ingest, ingestWorksheet } from './modules/injest/ingest.js';

mongoose.connect("mongodb+srv://tracks-user:WG2bTryz9mRfQb70@clustertracks.9kig2uf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTracks");

const contract = await createContract('Contract 1');
console.log("Contract created:", contract.name)

const result = ingest('Track Import Test');
console.log(`Data: ${result[0].data.length} records`)

const ingestWorksheetResult = await ingestWorksheet(result);
console.log(`Tracks created: ${ingestWorksheetResult.tracks.length} records`)
console.error("Errors:", ingestWorksheetResult.errors)
