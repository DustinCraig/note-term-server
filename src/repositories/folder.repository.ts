import { Folder } from "../models/folder";
import { GenericRepository } from "./generic.repository";

export class FolderRepository extends GenericRepository<Folder> {
  constructor() {
    super("folder");
  }

  async findByName(name: string): Promise<Folder | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE name = $1`;
    const result = await this.pool.query(query, [name]);
    return (result.rows[0] as Folder) || null;
  }
}
