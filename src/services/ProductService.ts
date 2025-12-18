import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types";
import { safeParse } from "valibot";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

// POST
export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
             await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

// GET 
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } throw new Error('Hubo un error...')

    } catch (error) {
        console.log(error)
    }
}


// GET by ID
export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output
        } throw new Error('Hubo un error...')

    } catch (error) {
        console.log(error)
    }
}

// PUT
export async function updateProduct(data : ProductData, id : Product['id']){
    try {
        const result = safeParse(ProductSchema, {
            id : id,
            name : data.name,
            price : +data.price,
            availability: toBoolean(data.availability.toString())
        }) 
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}


// PATCH
export async function updateProductAvailability(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}


// DELETE
export async function deleteProduct(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}