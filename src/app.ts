import express from "express";
import { NoteController } from "./controllers/note.controller";
import { NoteService } from "./services/note.service";
import { NoteRepository } from "./repositories/note.repository";
import notesRoutes from "./routes/notes.routes";
import folderRoutes from "./routes/folder.routes";
import { FolderController } from "./controllers/folder.controller";
import { FolderService } from "./services/folder.service";
import { FolderRepository } from "./repositories/folder.repository";

export function createApp() {
  const app = express();

  // Repositories
  const noteRepository = new NoteRepository();
  const folderRepository = new FolderRepository();
  // Services
  const noteService = new NoteService(noteRepository);
  const folderService = new FolderService(folderRepository);
  // Controllers
  const noteController = new NoteController(noteService);
  const folderController = new FolderController(folderService);
  // Middleware
  app.use(express.json());

  // Routes
  app.use("/api/notes", notesRoutes(noteController));
  app.use("/api/folders", folderRoutes(folderController));

  return app;
}
