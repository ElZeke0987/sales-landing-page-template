import { z } from "zod"; 

export const BaseProductSchema = z.object({
    id: z.number(),
    name_id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    thumbnail_url: z.string(),
    category_id: z.number(),
    outstanding: z.boolean(),
    stock: z.number(),
    extra_images: z.array(z.string()),
})

export const UpdateProductSchema = BaseProductSchema.omit({
    id: true,
    name_id: true,
}).partial().refine((data)=>Object.keys(data).length>0, {message: "No data provided in update product parsing"})

export const AddProductSchema = BaseProductSchema.omit({
    id: true,
    name_id: true,
}).refine((data)=>Object.keys(data).length>0, {message: "No data provided in add product parsing"})

export type UpdateProductType = z.infer<typeof UpdateProductSchema>;
export type AddProductType = z.infer<typeof AddProductSchema>;
export type BaseProductType = z.infer<typeof BaseProductSchema>;