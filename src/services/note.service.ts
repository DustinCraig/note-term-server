import type { Note, NoteInput } from "../models/note";
import { NoteRepository } from "../repositories/note.repository";

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {
    this.getNoteById = this.getNoteById.bind(this);
    this.getAllNotes = this.getAllNotes.bind(this);
    this.deleteNoteById = this.deleteNoteById.bind(this);
    this.createNote = this.createNote.bind(this);
  }

  private isValidNoteInput(data: any): data is Omit<Note, "id"> {
    if (!data) {
      return false;
    }

    const typeValidations: Record<keyof NoteInput, (value: any) => boolean> = {
      title: (v): v is string => typeof v === "string",
      content: (v): v is string => typeof v === "string",
      folderId: (v): v is number | null | undefined =>
        v === undefined || null || typeof v === "number",
    };

    return Object.entries(typeValidations).every(([key, validator]) => {
      const value = data[key];
      return validator(value);
    });
  }

  async getNoteById(id: number): Promise<Note | null> {
    return this.noteRepository.findById(id);
  }

  async getAllNotes(): Promise<Note[]> {
    return this.noteRepository.findAll();
  }

  async getAllNotesInFolder(folderId: number): Promise<Note[]> {
    return await this.noteRepository.findAllBy({ folderId });
  }

  async deleteNoteById(id: number): Promise<void> {
    return this.noteRepository.deleteById(id);
  }

  async createNote(body: any): Promise<boolean> {
    if (!this.isValidNoteInput(body)) {
      console.error(
        "Invalid note data: missing required fields or incorrect types"
      );
      return false;
    }

    const noteData = {
      ...body,
      folderId: body.folderId || null,
    };

    await this.noteRepository.create(noteData);
    return true;
  }
}
