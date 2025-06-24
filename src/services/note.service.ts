import type { Note, CreateNoteInput, UpdateNoteInput } from "../models/note";
import { NoteRepository } from "../repositories/note.repository";

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {
    this.getNoteById = this.getNoteById.bind(this);
    this.getAllNotes = this.getAllNotes.bind(this);
    this.deleteNoteById = this.deleteNoteById.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
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

  async createNote(
    body: any
  ): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
    const noteData = {
      ...body,
      folderId: body.folderId || null,
      id: undefined,
    };

    await this.noteRepository.create(noteData);
    return { success: true };
  }

  async updateNote(
    body: any
  ): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
    await this.noteRepository.updateById(body.id, body);
    return { success: true };
  }
}
