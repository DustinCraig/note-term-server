import { Router } from "express";
import { FolderController } from "../controllers/folder.controller";

export default function folderRoutes(folderController: FolderController) {
  const router = Router();

  router.get("/:id", folderController.getFolderById);
  router.delete("/:id", folderController.deleteFolderById);
  router.get("/", folderController.getAllFolders);

  return router;
}
