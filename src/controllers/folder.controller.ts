import { FolderService } from "../services/folder.service";
import { Request, Response } from "express";
import { StandardResponse } from "../config/config";

export class FolderController {
  private readonly folderService: FolderService;

  constructor(folderService: FolderService) {
    this.folderService = folderService;

    this.getFolderById = this.getFolderById.bind(this);
    this.getAllFolders = this.getAllFolders.bind(this);
    this.deleteFolderById = this.deleteFolderById.bind(this);
    this.createFolder = this.createFolder.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
  }

  async getFolderById(req: Request, res: Response) {
    const { id } = req.params;
    const folder = await this.folderService.getFolderById(Number(id));
    res.json({
      success: true,
      message: "Folder fetched successfully",
      data: folder,
    } as StandardResponse);
  }

  async getAllFolders(req: Request, res: Response) {
    const folders = await this.folderService.getAllFolders();
    res.json({
      success: true,
      message: "Folders fetched successfully",
      data: folders,
    } as StandardResponse);
  }

  async deleteFolderById(req: Request, res: Response) {
    const { id } = req.params;
    await this.folderService.deleteFolderById(Number(id));
    res.json({
      success: true,
      message: "Folder deleted successfully",
    } as StandardResponse);
  }

  async createFolder(req: Request, res: Response) {
    const { body } = req;
    const didCreate = await this.folderService.createFolder(body);
    if (!didCreate) {
      res.status(400).json({
        success: false,
        message: "Could not create folder",
      });
    }
    res.json({
      success: true,
      message: "Folder created successfully",
    });
  }

  async updateFolder(req: Request, res: Response) {
    const { body } = req;
    const didUpdate = await this.folderService.updateFolder(body);
    if (!didUpdate) {
      res.status(400).json({
        success: false,
        message: "Could not update folder",
      });
    }
    res.json({
      success: true,
      message: "Folder updated successfully",
    });
  }
}
