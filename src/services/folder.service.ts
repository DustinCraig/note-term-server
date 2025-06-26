import type { Folder } from "../models/folder";
import { FolderRepository } from "../repositories/folder.repository";

export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {
    this.getFolderById = this.getFolderById.bind(this);
    this.getAllFolders = this.getAllFolders.bind(this);
    this.deleteFolderById = this.deleteFolderById.bind(this);
    this.createFolder = this.createFolder.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
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

  async createFolder(
    body: any
  ): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
    const folderData = {
      ...body,
      id: undefined,
    } as Folder;

    await this.folderRepository.create(folderData);
    return { success: true };
  }

  async updateFolder(
    body: Folder
  ): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
    await this.folderRepository.updateById(body.id, body);
    return { success: true };
  }
}
