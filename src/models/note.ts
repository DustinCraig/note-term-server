export interface Note {
  id: number;
  title: string;
  content: string;
  folderId: number | null;
}

export type NoteInput = Omit<Note, "id">;
