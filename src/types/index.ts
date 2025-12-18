import {object, string, number, boolean, type InferOutput, array} from 'valibot'

// POST
export const DraftProductSchema = object({
    name: string(),
    price: number()
})

// GET
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>