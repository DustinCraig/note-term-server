export interface Note {
  id: number;
  title: string;
  content: string;
  folderId: number | null;
}

export type CreateNoteInput = Omit<Note, "id">;

export type UpdateNoteInput = Note;
