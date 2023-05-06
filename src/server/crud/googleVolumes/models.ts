import { z } from "zod";

const VolumeInfo = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  categories: z.array(z.string()).optional(),
  imageLinks: z
    .object({
      smallThumbnail: z.string().optional(),
    })
    .optional(),
  previewLink: z.string().optional(),
  authors: z.string().array().optional(),
});

export const Volume = z.object({
  id: z.string(),
  volumeInfo: VolumeInfo,
});

export const GoogleVolumesResponse = z.object({
  items: Volume.array().optional(),
});

export type GoogleVolumesResponse = z.infer<typeof GoogleVolumesResponse>;
export type GoogleVolume = z.infer<typeof Volume>;
export const googleVolumeQueryTypes = { author: "inauthor", title: "intitle" };
