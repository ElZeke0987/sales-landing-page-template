import z from "zod";

export const ExtraImagesSchema = z.object({
    id: z.number(),
    product_id: z.number(),
    image_url: z.string(),
})

export type ExtraImagesType = z.infer<typeof ExtraImagesSchema>