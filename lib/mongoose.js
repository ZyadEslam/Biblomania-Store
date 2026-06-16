import dns from "dns";
import mongoose from "mongoose";
import { resolveWritableMongoUri } from "./mongoUri";

dns.setDefaultResultOrder("ipv4first");

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env or .env.local"
  );
}

const allowInsecureTls =
  process.env.MONGODB_TLS_INSECURE === "true" ||
  process.env.NODE_ENV !== "production";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
    resolvedUri: null,
  };
}

const driverOptions = {
  family: 4,
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  ...(allowInsecureTls && { tlsAllowInvalidCertificates: true }),
};

const mongooseOptions = {
  bufferCommands: false,
  ...driverOptions,
};

async function getConnectionUri() {
  if (cached.resolvedUri) {
    return cached.resolvedUri;
  }

  cached.resolvedUri = await resolveWritableMongoUri(
    process.env.MONGODB_URI,
    driverOptions
  );

  return cached.resolvedUri;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = getConnectionUri().then((uri) =>
      mongoose.connect(uri, mongooseOptions)
    );
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    cached.resolvedUri = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
