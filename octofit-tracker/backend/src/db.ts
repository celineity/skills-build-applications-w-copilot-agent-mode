import mongoose from 'mongoose';

export async function connectDB(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected:', uri);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}
