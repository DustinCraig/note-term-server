import { NoteService } from "../services/note.service";
import { Request, Response } from "express";
import { StandardResponse } from "../config/config";

export class NoteController {
  private readonly noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;

    this.getNoteById = this.getNoteById.bind(this);
    this.getAllNotes = this.getAllNotes.bind(this);
    this.deleteNoteById = this.deleteNoteById.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  async getNoteById(req: Request, res: Response) {
    const { id } = req.params;
    const note = await this.noteService.getNoteById(Number(id));
    res.json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    } as StandardResponse);
  }

  async getAllNotesInFolder(req: Request, res: Response) {
    const { folderId } = req.params;
    const notesInFolder = await this.noteService.getAllNotesInFolder(
      Number(folderId)
    );
    res.json({
      success: true,
      message: "Notes from folder fetched successfully",
      data: notesInFolder,
    } as StandardResponse);
  }

  async getAllNotes(req: Request, res: Response) {
    const notes = await this.noteService.getAllNotes();
    res.json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    } as StandardResponse);
  }

  async deleteNoteById(req: Request, res: Response) {
    const { id } = req.params;
    await this.noteService.deleteNoteById(Number(id));
    res.json({
      success: true,
      message: "Note deleted successfully",
    } as StandardResponse);
  }

  async createNote(req: Request, res: Response) {
    const { body } = req;
    const didCreate = await this.noteService.createNote(body);
    if (!didCreate) {
      res.status(400).json({
        success: false,
        message: "Invalid note input",
      });
    }
    res.json({
      success: true,
      message: "Note created successfully",
    });
  }

  async updateNote(req: Request, res: Response) {
    const { body } = req;
    console.log("body ", body);
    const didUpdate = await this.noteService.updateNote(body);
    if (!didUpdate) {
      res.status(400).json({
        success: false,
        message: "Failed to updated note",
      });
    }
    res.json({
      success: true,
      message: "Note updated successfully",
    });
  }
}
