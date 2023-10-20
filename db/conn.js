import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.ATLAS_URI;
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export const Note = mongoose.model("Note", noteSchema);

export const theNotesDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
