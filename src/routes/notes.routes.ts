import { Router } from "express";
import { validateData } from "../middlewares/validation.middleware";
import { NoteController } from "../controllers/note.controller";
import { createNoteInput, updateNoteInput } from "../schemas/note.schema";

export default function notesRoutes(noteController: NoteController) {
  const router = Router();

  // reads
  router.get("/:id", noteController.getNoteById);
  router.get("/", noteController.getAllNotes);
  router.get("/:folderId", noteController.getAllNotesInFolder);

  // deletes
  router.delete("/:id", noteController.deleteNoteById);

  // creates
  router.post("/", validateData(createNoteInput), noteController.createNote);

  // updates
  router.put("/:id", validateData(updateNoteInput), noteController.updateNote);

  return router;
}
