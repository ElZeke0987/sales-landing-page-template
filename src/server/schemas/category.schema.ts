import z from "zod";

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    name_id: z.string(),
})

export const AddCategorySchema = CategorySchema.refine((data)=>Object.keys(data).length>0, {message: "No data provided in add category parsing"})

export const UpdateCategorySchema = CategorySchema.partial()
.refine((data)=>Object.keys(data).length>0, {message: "No data provided in update category parsing"})

export type CategoryType = z.infer<typeof CategorySchema>
export type AddCategoryType = z.infer<typeof AddCategorySchema>
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>