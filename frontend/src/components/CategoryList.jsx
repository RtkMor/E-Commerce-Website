import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const CategoryList = ({ list, loading }) => {
    
    const containerRef = useRef(null);
    const [scrollDistance, setScrollDistance] = useState(0);

    const calculateScrollDistance = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            setScrollDistance(containerWidth);
        }
    };

    useEffect(() => {
        calculateScrollDistance();

        const handleResize = () => {
            calculateScrollDistance();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const scrollLeft = () => {
        containerRef.current.scrollBy({
            left: -1 * scrollDistance * 3/4,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({
            left: scrollDistance * 3/4,
            behavior: 'smooth'
        });
    };

    return (
        <div className='container-sm mx-auto my-4 px-4'>
            <div className='px-8 relative'>
                <button onClick={scrollLeft} className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg'>
                    &lt;
                </button>
                <button onClick={scrollRight} className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg'>
                    &gt;
                </button>
                <div ref={containerRef} className='flex items-center h-44 md:h-48 overflow-x-auto gap-2 px-2'
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {
                        loading ? (
                            Array(9).fill().map((_, index) => (
                                <div key={index} className='bg-white p-4 rounded-xl shadow-lg overflow-hidden w-40 md:w-48 h-32 md:h-40 flex-shrink-0 flex items-center justify-center'>
                                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                                </div>
                            ))
                        ) : (
                            list.map((product, index) => (
                                <Link to={"/product-category/" + product?.category} key={index} className='bg-white p-4 rounded-xl shadow-lg overflow-hidden w-32 md:w-40 flex-shrink-0 transition-transform transform hover:scale-105 hover:border-2 hover:border-red-800 cursor-pointer'>
                                    <div className='h-20 md:h-24 w-full rounded-t-lg'>
                                        <img src={product?.productImage[0]} 
                                            className='object-contain w-full h-full mix-blend-multiply'
                                            alt={product?.category}/>
                                    </div>
                                    <p className='mt-2 text-center font-medium capitalize'>{product?.category}</p>
                                </Link>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoryList;