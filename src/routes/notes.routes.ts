import { Router } from "express";
import { NoteController } from "../controllers/note.controller";

export default function notesRoutes(noteController: NoteController) {
  const router = Router();

  router.get("/:id", noteController.getNoteById);
  router.delete("/:id", noteController.deleteNoteById);
  router.get("/", noteController.getAllNotes);
  router.get("/:folderId", noteController.getAllNotesInFolder);
  router.post("/", noteController.createNote);

  return router;
}
