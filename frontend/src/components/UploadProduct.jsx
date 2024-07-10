import React, { useState } from 'react';
import ProductCategory from '../helpers/ProductCategory.jsx';
import UploadImage from '../helpers/UploadImage.jsx';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage.jsx';
import ApiSummary from '../common/ApiSummary.jsx';
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';

const UploadProduct = ({ onClose, intent, product, header, fetchData }) => {

    const [data, setData] = useState({
        _id: product?._id || "",
        productName: product?.productName || "",
        brandName: product?.brandName || "",
        category: product?.category || "",
        productImage: product?.productImage || [],
        description: product?.description || "",
        price: product?.price || "",
        sellingPrice: product?.sellingPrice || ""
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState();
    const [loading, setLoading] = useState(false);

    // Handling the form data on change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    // handling the deletion of uploaded pic
    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            };
        });
    };

    // handling the pic to be uploaded
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
    
        if (!file) return;
    
        setLoading(true);
    
        try {
            const uploadImageCloudinary = await UploadImage(file);
    
            setData(prev => {
                return {
                    ...prev,
                    productImage: [...prev.productImage, uploadImageCloudinary.url]
                };
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    // Upload Button Handler
    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            // Exclude _id from data if intent is to upload a new product
            const { _id, ...uploadData } = data;

            const response = await fetch(ApiSummary.uploadProduct.url, {
                method: ApiSummary.uploadProduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(uploadData) // Send only necessary data for upload
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData?.message);
                onClose();
                fetchData();
            } else {
                toast.error(responseData?.message);
            }
        } catch (error) {
            console.error("Error uploading product:", error);
            toast.error("Failed to upload product. Please try again.");
        }
    };

    // Update Button Handler
    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await fetch(ApiSummary.updateProduct.url, {
            method: ApiSummary.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json();

        if(responseData.success){
            toast.success(responseData?.message);
            onClose();
            fetchData();
        }
        if(responseData.error){
            toast.error(responseData?.message);
        }
    }

    // Display Image Full Screen
    const handleImageClick = (imageUrl) => {
        setFullScreenImage(imageUrl);
        setOpenFullScreenImage(true);
    };

    const handleCloseFullScreenImage = () => {
        setOpenFullScreenImage(false);
        setFullScreenImage(null);
    };

    return (
        <div className='fixed z-[100] top-0 bottom-0 right-0 left-0 w-full h-full flex items-center justify-center bg-red-100 bg-opacity-50'>

            {loading && (
                <div className='absolute z-[200] top-0 bottom-0 right-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75'>
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            )}

            <div className='w-full h-full max-w-lg max-h-[75%] p-4 bg-white text-black border-red-600 border-2 rounded-lg overflow-hidden'>
                <h1 className='text-lg font-semibold underline bg-white p-2'>{header}</h1>
                <div className='mt-2 h-full overflow-y-scroll'>
                    <form className='flex flex-col p-2 gap-2' onSubmit={intent ? handleUpload : handleUpdate}>

                        {/* Input Product Name */}
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

                        {/* Input - Brand Name */}
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

                        {/* Choose Category */}
                        <div className='grid'>
                            <label htmlFor="category">Category : </label>
                            <div className='overflow-hidden'>
                                <select
                                    value={data.category}
                                    name="category"
                                    onChange={handleOnChange}
                                    id="category"
                                    required
                                    className='block w-full mt-1 p-2 bg-red-600 text-white border-2 rounded-md overflow-y-auto outline-none'>
                                    <option value={""} className='bg-white text-black'>-Select Category-</option>
                                    {ProductCategory.map((el, index) => (
                                        <option value={el.value} key={index} className='bg-white text-black'>{el.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Upload Product Image */}
                        <div className='grid'>
                            <label htmlFor="productImage">Product Image : </label>
                            <label htmlFor="uploadProductImageInput" className='cursor-pointer'>
                                <div className='bg-red-100 p-2 h-32 rounded-lg flex flex-col justify-center items-center'>
                                    <FaCloudUploadAlt className='text-4xl' />
                                    <p className='text-sm'>Upload Product Images</p>
                                    <input type="file" className='hidden' id='uploadProductImageInput' onChange={handleUploadProduct} />
                                </div>
                            </label>
                        </div>

                        {/* Display Uploaded Images */}
                        <div className='flex flex-wrap'>
                            {
                                data?.productImage[0] ? (
                                    data.productImage.map((el, index) => (
                                        <div className='relative w-1/4 p-1 h-40 group' key={el}>
                                            <img src={el} alt={el} width={80} height={80} className='border-2 border-red-400 w-full h-full'
                                            onClick={() => handleImageClick(el)} />
                                            <button 
                                                className='absolute bottom-2 right-2 p-1 cursor-pointer bg-red-600 text-white rounded-full hidden group-hover:block hover:bg-red-800'
                                                onClick={() => handleDeleteProductImage(index)}>
                                                <MdDelete />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-red-800 text-xs'>*Please upload product images!</p>
                                )
                            }
                        </div>

                        {/* Input - Price */}
                        <div className='grid'>
                            <label htmlFor="price">Price : </label>
                            <div className='bg-slate-100 p-2 rounded-full'>
                                <input
                                    type="number"
                                    name='price'
                                    id='price'
                                    placeholder='Enter price!'
                                    value={data.price}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        {/* Input - Selling Price */}
                        <div className='grid'>
                            <label htmlFor="sellingPrice">Selling Price : </label>
                            <div className='bg-slate-100 p-2 rounded-full'>
                                <input
                                    type="number"
                                    name='sellingPrice'
                                    id='sellingPrice'
                                    placeholder='Enter selling price!'
                                    value={data.sellingPrice}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        {/* Input - Description */}
                        <div className='grid'>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                name='description'
                                id='description'
                                placeholder='Enter description!'
                                value={data.description}
                                onChange={handleOnChange}
                                required
                                className='bg-slate-100 h-32 p-2 rounded-md resize-none outline-none' />
                        </div>

                        {/* Upload and Cancel Button */}
                        <div className='mt-5 flex justify-around text-white mb-10'>
                            {
                                intent ? (
                                    <button className='bg-red-600 hover:bg-red-800 p-2 w-28 rounded-lg' type='submit'>Upload</button>
                                ) : (
                                    <button className='bg-red-600 hover:bg-red-800 p-2 w-28 rounded-lg' type='submit'>Update</button>
                                )
                            }
                            <button className='bg-red-600 hover:bg-red-800 p-2 w-28 rounded-lg' onClick={onClose}>Cancel</button>
                        </div>

                    </form>
                </div>

                {/* Display Full Screen Image */}
                {openFullScreenImage &&
                    <DisplayImage imageUrl={fullScreenImage} onClose={handleCloseFullScreenImage} />
                }

            </div>
        </div>
    );
};

export default UploadProduct;
