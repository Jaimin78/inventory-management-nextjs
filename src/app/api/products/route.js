import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(request) {
    const url = new URL(request.url);
    const searchValue = url.searchParams.get('search');

    // Read the products file and parse it
    let products = await fs.readFile(`${process.cwd()}/public/data/products.json`, 'utf8');
    products = JSON.parse(products); // Parse the JSON string into an array

    // If there is no search value, return all products
    if (!searchValue) {
        return NextResponse.json({
            success: true,
            message: "Products Fetched Successfully",
            data: products
        });
    }

    // Filter the products based on the search value
    let newdata = products.filter((product) => {
        return new RegExp(`^${searchValue}`, 'i').test(product.name); // 'i' for case-insensitive matching
    });

    // Return the filtered products
    return NextResponse.json({
        success: true,
        message: "Products Fetched Successfully",
        data: newdata
    });
}

export async function DELETE(request) {

    const id = await request.json()

    let products = await fs.readFile(`${process.cwd()}/public/data/products.json`, 'utf8')
    
    products = JSON.parse(products)

    let productIndex = products.findIndex(product => product.id == id)

    products.splice(productIndex, 1)

    await fs.writeFile(`${process.cwd()}/public/data/products.json`, JSON.stringify(products, null, 4))

    return NextResponse.json({
        success: true,
        message: "Products Deleted Successfully",
    });
}
