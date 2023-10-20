import express from "express";
import { Note } from "../db/conn.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const notes = await Note.find({}).exec();
  console.log(notes);
  res.send(notes);
});

router.post("/add-note", async (req, res) => {
  const { title, content } = req.body;

  // Create a new Note document with the provided title and content
  const newNote = new Note({
    title,
    content,
  });

  try {
    const savedNote = await newNote.save();
    res.json(savedNote); // Send the saved note back to the client
  } catch (error) {
    res.status(500).json({ error: "Unable to add the note." });
  }
});

router.delete("/delete-note/:id", async (req, res) => {
  const noteId = req.params.id;

  try {
    // Find the note by ID and delete it from the database
    const deletedNote = await Note.findByIdAndRemove(noteId).exec();

    if (!deletedNote) {
      res.status(404).json({ error: "Note not found." });
      return;
    }

    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the note." });
  }
});

export default router;
