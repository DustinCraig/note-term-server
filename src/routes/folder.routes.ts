import { Router } from "express";
import { FolderController } from "../controllers/folder.controller";
import { validateData } from "../middlewares/validation.middleware";
import { updateFolderInput } from "../schemas/folder.schema";

export default function folderRoutes(folderController: FolderController) {
  const router = Router();

  // reads
  router.get("/:id", folderController.getFolderById);
  router.get("/", folderController.getAllFolders);

  // deletes
  router.delete("/:id", folderController.deleteFolderById);

  // creates
  router.post("/", folderController.createFolder);

  // updates
  router.put(
    "/:id",
    validateData(updateFolderInput),
    folderController.updateFolder
  );

  return router;
}
