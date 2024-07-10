import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryProducts from '../helpers/fetchCategoryProducts';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import displayCurrency from '../helpers/displayCurrency.jsx'


const HorizontalCardProduct = ({ heading ,category, productName }) => {

    const [loading, setLoading] = useState(true)
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const products = await fetchCategoryProducts(category, 10, productName);
            if (products) {
                setCategoryProduct(products);
                setLoading(false)
            } else {
                toast.error('Failed to load products');
                setLoading(false)
            }
        };

        fetchData();
    }, [category, heading, productName]);

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                setIsOverflowing(containerRef.current.scrollWidth > containerRef.current.clientWidth);
            }
        };

        checkOverflow();

        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [categoryProduct]);

    const scrollLeft = () => {
        containerRef.current.scrollBy({
            left: -179,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({
            left: 179,
            behavior: 'smooth'
        });
    };

    return (
        <div className="container-sm mx-auto px-2 md:px-4 relative my-4">
            <div className="px-8 flex items-center justify-between">
                <h1 className='ms-2 text-xl md:text-2xl font-semibold capitalize truncate'>{heading}</h1>
                <Link to={"/product-category/" + category} className='ml-4 py-2 px-3 text-center rounded-2xl text-black hover:bg-red-600 hover:text-white border-red-800 border-2 transition-all truncate'>
                    View More
                </Link>
            </div>
            <div className="px-8 relative">
                {isOverflowing && (
                    <div>
                        <button onClick={scrollLeft} className='absolute z-50 left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg'>
                            &lt;
                        </button>
                        <button onClick={scrollRight} className='absolute z-50 right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg'>
                            &gt;
                        </button>
                    </div>
                )}
                <div ref={containerRef} className='flex items-center h-52 md:h-56 overflow-x-auto gap-2 px-2'
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {loading ? (
                        Array(10).fill().map((_, index) => (
                            <div key={index} className='bg-white p-4 rounded-xl shadow-md overflow-hidden w-40 md:w-48 h-32 md:h-40 flex-shrink-0 flex items-center justify-center'>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                        ))
                    ) : (
                        categoryProduct.map((product, index) => (
                            <Link to={`/product/${product.productName}/${product._id}`} key={index} className='bg-white p-4 rounded-xl shadow-md overflow-hidden w-32 md:w-40 flex-shrink-0 transition-transform transform hover:scale-105 hover:border-2 hover:border-red-800 cursor-pointer'>
                                <div className='h-20 md:h-24 w-full rounded-t-lg'>
                                    <img src={product?.productImage[0]} 
                                        className='object-contain w-full h-full mix-blend-multiply'
                                        alt={product?.category}/>
                                </div>
                                <p className='mt-2 text-center font-medium capitalize truncate'>{product?.productName}</p>
                                <p className="text-gray-600 line-through mr-2">{displayCurrency(product.price)}</p>
                                <p className="text-red-600 font-semibold">{displayCurrency(product.sellingPrice)}</p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default HorizontalCardProduct;