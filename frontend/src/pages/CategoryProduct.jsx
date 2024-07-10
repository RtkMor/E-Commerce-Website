import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import fetchCategoryProducts from '../helpers/fetchCategoryProducts';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import displayCurrency from '../helpers/displayCurrency.jsx';
import useAddToCart from '../helpers/useAddToCart.jsx';

const CategoryProduct = () => {
    const { categoryName } = useParams();
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("lowToHigh");
    const observer = useRef();
    const addToCart = useAddToCart();

    const handleSortOptions = useCallback((e) => {
        const { value } = e.target;
        setSort(value);
    }, []);

    const sortProducts = (products) => {
        const sortedProducts = [...products];
        if (sort === "lowToHigh") {
            sortedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
        } else if (sort === "highToLow") {
            sortedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
        }
        return sortedProducts;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await fetchCategoryProducts(categoryName);
                setAllProducts(fetchedProducts || []);
                const sortedProducts = sortProducts(fetchedProducts);
                setDisplayedProducts(sortedProducts.slice(0, 20) || []);
            } catch (error) {
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryName, sort]);

    const lastProductElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    useEffect(() => {
        if (page > 1) {
            const newProducts = allProducts.slice(0, page * 20);
            const sortedProducts = sortProducts(newProducts);
            setDisplayedProducts(sortedProducts);
        }
    }, [page, allProducts, sort]);

    return (
        <div className="container-sm mx-auto my-4 px-2 md:px-4">
            <div className="flex justify-between ms-2 me-2 px-8 mb-3 text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-semibold capitalize">Products in category: {categoryName}</h1>
                <select
                    name="sort"
                    onChange={handleSortOptions}
                    value={sort}
                    className='text-md px-2 border-2 border-black rounded-lg'>
                    <option value="lowToHigh">Price - Low To High</option>
                    <option value="highToLow">Price - High To Low</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
                {
                    loading ? (
                        Array(8).fill().map((_, index) => (
                            <div key={index} className='bg-white p-4 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-72'>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                        ))
                    ) : (
                        displayedProducts.length > 0 ? (
                            displayedProducts.map((product, index) => (
                                <div key={product._id} ref={index === displayedProducts.length - 1 ? lastProductElementRef : null} className="max-h-[310px] max-w-[400px] w-full mx-auto bg-white p-4 rounded-xl shadow-lg overflow-hidden flex-shrink-0 cursor-pointer transition-transform transform hover:scale-105 hover:border-2 hover:border-red-800">
                                    <Link to={`/product/${product.productName}/${product._id}`}>
                                        <div className="h-32 md:h-40 w-full rounded-t-lg overflow-hidden">
                                            <img src={product.productImage[0]} className="object-contain w-full h-full mix-blend-multiply" alt={product.productName} />
                                        </div>
                                        <p className="mt-2 text-center font-medium capitalize truncate">{product.productName}</p>
                                        <div className="flex justify-center mt-2">
                                            <p className="text-gray-600 line-through mr-2">{displayCurrency(product.price)}</p>
                                            <p className="text-red-600 font-semibold">{displayCurrency(product.sellingPrice)}</p>
                                        </div>
                                    </Link>
                                    <div className='flex justify-center mt-2'>
                                        <button className='bg-red-600 text-white hover:bg-red-800 px-2 py-1 rounded-lg' onClick={(e) => addToCart(e, product._id, 1, true)}>Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )
                    )
                }
            </div>
            {loading && (
                <div className='text-center mt-4'>
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            )}
        </div>
    );
};

export default CategoryProduct;