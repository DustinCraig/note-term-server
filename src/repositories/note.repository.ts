import { Note } from "../models/note";
import { GenericRepository } from "./generic.repository";

export class NoteRepository extends GenericRepository<Note> {
  constructor() {
    super("note");
  }

  async findByTitle(title: string): Promise<Note | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE title = $1`;
    const result = await this.pool.query(query, [title]);
    return (result.rows[0] as Note) || null;
  }
}
