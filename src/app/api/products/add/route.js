import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import { v4 } from "uuid";

export async function POST(request) {
    let payload = await request.json();    
    payload.id = v4();

    let products = await fs.readFile(`${process.cwd()}/public/data/products.json`, 'utf8')
    
    products = JSON.parse(products)

    products.push(payload)

    await fs.writeFile(`${process.cwd()}/public/data/products.json`, JSON.stringify(products, null, 4))
    
    return NextResponse.json({success:true, message: "New Product Added Successfully"})
}