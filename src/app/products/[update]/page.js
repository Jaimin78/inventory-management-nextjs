"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Update({ params }) {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [maxStock, setMaxStock] = useState('');
    const [minStock, setMinStock] = useState('');

    const router = useRouter()

    useEffect(() => {
        fetchSingleProduct();
    }, []);

    const fetchSingleProduct = async () => {

        // Fetch products with the search query
        let data = await fetch(`/api/products/${params.update}`, {
            method: "GET"
        });

        data = await data.json();

        setProductName(data.data.name);
        setCategory(data.data.category);
        setQuantity(data.data.quantity);
        setPrice(data.data.price);
        setMaxStock(data.data.maxStock);
        setMinStock(data.data.minStock);

    };

    const updateForm = async (e) => {
        e.preventDefault();

        if (!Number(quantity)) return alert("Please Enter Valid Quantity")

        if (!Number(price)) return alert("Please Enter Valid Price")

        if (Number(maxStock) < Number(minStock)) return alert("Please select Valid Min & Max Stock Quantity")


        const newProduct = {
            name: productName,
            category: category,
            quantity: quantity,
            price: price,
            maxStock: maxStock,
            minStock: minStock,
        };

        let response = await fetch(`/api/products/${params.update}`, {
            method: "PUT",
            body: JSON.stringify(newProduct),
            headers: {
                "content-type": "application/json"
            }
        })

        response = await response.json()

        if (response.success) {
            alert(response.message)
            return router.push('/products')
        };
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Update Product</h1>
            <form onSubmit={updateForm} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Name
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option value="" disabled>Choose Product Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Stationery">Stationery</option>
                    </select>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Quantity
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Price
                    </label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            value={maxStock}
                            onChange={(e) => setMaxStock(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        >
                            <option value="" disabled>Choose Max Stock Quantity</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            value={minStock}
                            onChange={(e) => setMinStock(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        >
                            <option value="" disabled>Choose Min Stock Quantity</option>
                            <option value="5">5</option>
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="35">35</option>
                            <option value="45">45</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Update Product
                </button>
            </form>
        </div>
    );
}
