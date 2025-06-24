import { z } from "zod";

const id = z.number();
const title = z.string().min(1);
const content = z.string();
const folderid = z.number().nullable().optional();

export const createNoteInput = z.object({
  title,
  content,
  folderid,
});

export const updateNoteInput = z.object({
  id,
  title,
  content,
  folderid,
});
