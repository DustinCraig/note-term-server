import { z } from "zod";

const id = z.number();
const name = z.string().min(1);

export const createFolderInput = z.object({
  name,
});

export const updateFolderInput = z.object({
  id,
  name,
});
