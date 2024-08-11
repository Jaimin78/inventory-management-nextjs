"use client";
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts(); // Fetch products on initial render
  }, []);

  const fetchProducts = async (searchValue = '') => {

    // Fetch products with the search query
    let data = await fetch(`/api/products?search=${searchValue}`, {
      method: "GET"
    });

    data = await data.json();
    setProducts(data.data);
  };


  // Generate datasets for Stock Level vs. Max Stock chart
  const stockData = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: 'Quantity',
        data: products.map(product => Number(product.quantity)),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Max Stock',
        data: products.map(product => Number(product.maxStock)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Generate datasets for Product Categories Breakdown chart
  const categories = [...new Set(products.map(product => product.category))];
  const categoryCounts = categories.map(category => products.filter(product => product.category === category).length);

  const categoryData = {
    labels: categories,
    datasets: [
      {
        label: 'Category Breakdown',
        data: categoryCounts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Inventory Management System</h1>

      <div className='grid grid-cols-2 gap-1'>

        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Products</h5>
          <h2 class="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">{products.length}</h2>
        </div>

        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Category</h5>

          <h2 class="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">{categories.length}</h2>
        </div>

        <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Stock Level vs. Max Stock for Each Product</h5>
          <div className="h-64">
            <Bar data={stockData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Product Categories Breakdown</h5>
          <div className="h-64">
            <Pie data={categoryData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>



    </div>
  );
}
