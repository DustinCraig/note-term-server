import { Note } from "../models/note";
import { GenericRepository } from "./generic.repository";

export class NoteRepository extends GenericRepository<Note> {
  constructor() {
    super("note");
  }
}
