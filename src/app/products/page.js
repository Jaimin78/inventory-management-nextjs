"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Products() {
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');

    const router = useRouter();

    useEffect(() => {
        fetchProducts(); // Fetch products on initial render
    }, []);

    const fetchProducts = async (searchValue = '') => {

        // Fetch products with the search query
        let data = await fetch(`/api/products?search=${searchValue}`, {
            method: "GET"
        });

        data = await data.json();
        setProduct(data.data);
    };

    const deleteProduct = async (id) => {

        let isConfirm = confirm("Are you sure you want to delete this product?")
        if(!isConfirm) return

        let response = await fetch(`/api/products`,{
            method: "DELETE",
            body: JSON.stringify(id),
            headers:{
                "content-type":"application/json"
            }
        })

        response = await response.json()

        if(response.success) {
            alert(response.message)
            return fetchProducts()
        }

        return alert(response.message)
    }
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Products</h1>

            <div className="relative shadow-md sm:rounded-lg">
                <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                const newSearchValue = e.target.value; 
                                setSearch(newSearchValue);
                                fetchProducts(newSearchValue);
                            }}
                            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search for Products"
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Available Quantity</th>
                            <th scope="col" className="px-6 py-3">Max Stock Quantity</th>
                            <th scope="col" className="px-6 py-3">Min Stock Quantity</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((item) => (
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {item.quantity}
                                        <div style={{background:`${(Number(item.quantity) < Number(item.minStock)) ? "red":"green" }`}} className={`h-2.5 w-2.5 rounded-full bg-${(Number(item.quantity) < Number(item.minStock)) ? "red":"green" }-500 ml-2`}></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{item.maxStock}</td>
                                <td className="px-6 py-4">{item.minStock}</td>
                                <td className="px-6 py-4 flex">
                                    <button onClick={()=> router.push(`/products/${item.id}`)} className="font-medium text-blue-600 hover:underline">Edit</button>
                                    <button onClick={() => {
                                        deleteProduct(item.id)}} className="font-medium text-red-600 ml-2 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
