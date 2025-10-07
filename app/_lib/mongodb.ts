// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;
if (!uri) {
  throw new Error("Please add your MongoDB connection string to .env.local");
}

// Options (you can add pool size, etc. if needed)
const options = {};

// Declare cached client globally for dev hot-reload
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // allow global var in TS
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
