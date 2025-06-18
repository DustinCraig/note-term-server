import { Folder } from "../models/folder";
import { GenericRepository } from "./generic.repository";

export class FolderRepository extends GenericRepository<Folder> {
  constructor() {
    super("folder");
  }
}
