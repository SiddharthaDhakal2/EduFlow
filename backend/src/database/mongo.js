import mongoose from "mongoose";

export async function connectMongo() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required for the backend database.");
  }

  await mongoose.connect(process.env.MONGO_URI);
}

const storeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);
