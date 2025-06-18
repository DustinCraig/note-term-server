import { Folder } from "../models/folder";
import { FolderRepository } from "../repositories/folder.repository";

export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {
    this.getFolderById = this.getFolderById.bind(this);
    this.getAllFolders = this.getAllFolders.bind(this);
    this.deleteFolderById = this.deleteFolderById.bind(this);
  }

  async getFolderById(id: number): Promise<Folder | null> {
    return this.folderRepository.findById(id);
  }

  async getAllFolders(): Promise<Folder[]> {
    return this.folderRepository.findAll();
  }

  async deleteFolderById(id: number): Promise<void> {
    return this.folderRepository.deleteById(id);
  }
}
