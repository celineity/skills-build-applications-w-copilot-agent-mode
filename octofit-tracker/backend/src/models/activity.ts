import mongoose, { Schema, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  userId: string;
  type: string;
  duration: number; // in minutes
  calories?: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const ActivitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number },
    date: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<ActivityDocument>('Activity', ActivitySchema);
