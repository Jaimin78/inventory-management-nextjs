import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(request, { params }) {

    // Read the products file and parse it
    let products = await fs.readFile(`${process.cwd()}/public/data/products.json`, 'utf8');
    products = JSON.parse(products); // Parse the JSON string into an array

    products = products.find(product => product.id == params.id)

    return NextResponse.json({
        success: true,
        message: "Products Fetched Successfully",
        data: products
    });
}


export async function PUT(request, { params }) {
    let payload = await request.json();    

    // Read the products file and parse it
    let products = await fs.readFile(`${process.cwd()}/public/data/products.json`, 'utf8');
    products = JSON.parse(products); // Parse the JSON string into an array

    let productIndex = products.findIndex(product => product.id == params.id)

    products[productIndex] = {...payload, id: params.id}

    await fs.writeFile(`${process.cwd()}/public/data/products.json`, JSON.stringify(products, null, 4))
    
    return NextResponse.json({
        success: true,
        message: "Product Updated Successfully",
    });
}
