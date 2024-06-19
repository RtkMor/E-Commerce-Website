import React, { useState } from 'react'
import ProductCategory from '../helpers/ProductCategory'

import { FaCloudUploadAlt } from "react-icons/fa";

const UploadProduct = ({onClose}) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: "",
        description: "",
        price: "",
        sellingPrice: ""
    })

    const [uploadProductImage, setUploadProductImage] = useState([]);

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadProduct = (e) => {
        const file = e.target.files[0];
        console.log(file);
    }

    return (
        <div className='fixed z-[100] top-0 bottom-0 right-0 left-0 w-full h-full flex items-center justify-center bg-red-100 bg-opacity-50'>
            <div className='w-full h-full max-w-lg max-h-[75%] p-4 bg-white text-black border-red-600 border-2 rounded-lg shadow-lg overflow-auto'>

                <h1 className='text-lg font-semibold underline'>Add New Product</h1>
                <div className='mt-2'>
                    
                    {/* Product Form */}
                    <form className='flex flex-col p-2 gap-2'>

                        {/* Product Name */}
                        <div className='grid'>
                            <label htmlFor="productName">Product Name : </label>
                            <div className='bg-slate-100 p-2 rounded-full'>
                                <input 
                                    type="text" 
                                    name='productName'
                                    id='productName' 
                                    placeholder='Enter product name!' 
                                    value={data.productName} 
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        {/* Brand Name */}
                        <div className='grid'>
                            <label htmlFor="brandName">Brand Name : </label>
                            <div className='bg-slate-100 p-2 rounded-full'>
                                <input 
                                    type="text" 
                                    name='brandName'
                                    id='brandName' 
                                    placeholder='Enter brand name!' 
                                    value={data.brandName} 
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        {/* Category */}
                        <div className='grid'>
                            <label htmlFor="category">Category : </label>
                            <div className=''>
                                <select 
                                    value={data.category} 
                                    name="category" 
                                    onChange={handleOnChange}
                                    id="category"
                                    className='block w-full mt-1 p-2 bg-red-600 text-white border-2 rounded-md outline-none'>
                                        {
                                            ProductCategory.map((el,index) => (
                                                <option value={el.value} id={el.value+index} className='bg-white text-black'>{el.label}</option>
                                            ))
                                        }

                                </select>
                            </div>
                        </div>

                        {/* Product Images */}
                        <div className='grid'>
                            <label htmlFor="productImage">Product Image : </label>
                            <label htmlFor="uploadProductImageInput" className='cursor-pointer'>
                                <div className='bg-red-100 p-2 h-32 rounded-lg flex flex-col justify-center items-center'>
                                    <FaCloudUploadAlt className='text-4xl' />
                                    <p className='text-sm'>Upload Product Images</p>
                                    <input type="file" className='hidden' id='uploadProductImageInput' onChange={handleUploadProduct}/>
                                </div>
                            </label>
                        </div>
                        <div>
                            <img src="" width={80} height={80} className='bg-red-500 border' />
                        </div>
                        
                        
                    </form>
                </div>
                <div className='mt-5 flex justify-around text-white'>
                <button className='bg-red-600 hover:bg-red-800 p-2 w-28 rounded-lg'>Upload</button>
                <button className='bg-red-600 hover:bg-red-800 p-2 w-28 rounded-lg' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UploadProduct
