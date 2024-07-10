import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiSummary from '../common/ApiSummary';
import { toast } from 'react-toastify';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import displayCurrency from '../helpers/displayCurrency.jsx';
import useAddToCart from '../helpers/useAddToCart.jsx';
import { ClipLoader } from 'react-spinners';


const ProductDetails = () => {
    const [loading, setLoading] = useState(true)
    const { productId } = useParams();
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });
    const [selectedImage, setSelectedImage] = useState('');
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const addToCart = useAddToCart();

    const fetchData = async () => {
        try {
            const response = await fetch(ApiSummary.productDetails.url, {
                method: ApiSummary.productDetails.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ productId })
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setData(dataResponse?.data);
                setSelectedImage(dataResponse?.data?.productImage[0]);
            } else {
                throw new Error("Failed to fetch the product!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchData();
        setLoading(false)
    }, [productId]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    return (
        <div>
            {
                loading ? (
                    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-4">
                        <div className="flex flex-row md:flex-col gap-2 md:gap-4 md:w-[7.5rem] md:p-2 flex-wrap xs:flex-nowrap">
                            <div className='w-32 h-32 border p-2 rounded-lg flex justify-center items-center'>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                            <div className='w-32 h-32 border p-2 rounded-lg flex justify-center items-center'>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                            <div className='w-32 h-32 border p-2 rounded-lg flex justify-center items-center'>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                            <div className='w-32 h-32 border p-2 rounded-lg flex justify-center items-center'>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                        </div>
                        <div className="flex items-center justify-center border p-2 rounded relative bg-white gap-4 ms-0 md:ms-4">
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                        <div className="flex items-center justify-center border p-2 rounded relative gap-4">
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-4">
                        <div className="flex flex-row md:flex-col gap-2 md:gap-4 md:w-[7.5rem] md:p-2 flex-wrap xs:flex-nowrap">
                            {data.productImage.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image} 
                                    alt={data.productName} 
                                    className="w-32 h-32 border p-2 rounded-lg overflow-hidden cursor-pointer object-contain" 
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-center border p-2 rounded relative bg-white">
                            {selectedImage && <img src={selectedImage} alt={data.productName} className="max-w-full max-h-[30rem] object-contain border-2 p-2 rounded-lg" 
                                                    onMouseEnter={() => setIsZoomed(true)}
                                                    onMouseLeave={() => setIsZoomed(false)}
                                                    onMouseMove={handleMouseMove}
                                                />}
                        </div>
                        <div className="flex flex-col justify-between relative gap-2 p-2">
                            {isZoomed && selectedImage && (
                                <div 
                                    className="absolute inset-0 bg-white flex items-center justify-center z-10"
                                    style={{
                                        backgroundImage: `url(${selectedImage})`,
                                        backgroundSize: '175%',
                                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    }}
                                >
                                    <div className="w-full h-full"></div>
                                </div>
                            )}
                            <div className='mb-2'>
                                <h1 className="text-3xl font-bold mb-2">{data.productName}</h1>
                                <p className="text-xl text-gray-600 mb-1">Brand: {data.brandName}</p>
                                <div className="mb-2">
                                    <p className="text-lg text-gray-800">{data.description}</p>
                                </div>
                                <p className="text-2xl text-red-600">{displayCurrency(data.sellingPrice)}</p>
                                <p className="text-xl line-through text-gray-500">{displayCurrency(data.price)}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800">
                                    Buy Now
                                </button>
                                <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800" onClick={(e) => addToCart(e, productId, 1, true)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            
            <HorizontalCardProduct category={data.category} heading={"Similar Products"} productName={data.productName} />
        </div>
    );
}

export default ProductDetails;