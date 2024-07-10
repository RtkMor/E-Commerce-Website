import React, { useRef, useEffect, useState } from 'react';

// Desktop Banner Images
import image1 from '../assets/banner/img1.webp';
import image2 from '../assets/banner/img2.webp';
import image3 from '../assets/banner/img3.jpg';
import image4 from '../assets/banner/img4.jpg';
import image5 from '../assets/banner/img5.webp';

// Mobile Banner Images
import image1Mobile from '../assets/banner/img1_mobile.jpg';
import image2Mobile from '../assets/banner/img2_mobile.webp';
import image3Mobile from '../assets/banner/img3_mobile.jpg';
import image4Mobile from '../assets/banner/img4_mobile.jpg';
import image5Mobile from '../assets/banner/img5_mobile.png';

const BannerProduct = () => {

    const containerRef = useRef(null);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [totalBanners, setTotalBanners] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);

    const desktopImages = [image1, image2, image3, image4, image5];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

    const calculateScrollDistance = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            setScrollDistance(containerWidth);
        }
    };

    const checkIsMobileView = () => {
        const viewportWidth = window.innerWidth;
        setIsMobileView(viewportWidth < 768);
    };

    useEffect(() => {
        
        const handleResize = () => {
            calculateScrollDistance();
            checkIsMobileView();
        };
        window.addEventListener('resize', handleResize);

        checkIsMobileView();
        calculateScrollDistance();
        setTotalBanners(desktopImages.length);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateScrollDistance]);

    // Effect to handle auto-scrolling
    useEffect(() => {
        const autoScrollInterval = setInterval(scrollRight, 5000);

        return () => {
            clearInterval(autoScrollInterval);
        };
    }, [currentIndex, scrollDistance, totalBanners]);
    

    // Function to handle scrolling to the left and right
    const scrollLeft = () => {
        const nextIndex = (currentIndex - 1 + totalBanners) % totalBanners;
        setCurrentIndex(nextIndex);
        containerRef.current.scrollTo({
            left: nextIndex * scrollDistance,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        const nextIndex = (currentIndex + 1) % totalBanners;
        setCurrentIndex(nextIndex);
        containerRef.current.scrollTo({
            left: nextIndex * scrollDistance,
            behavior: 'smooth',
        });
    };

    return (
        <div className="container-sm mx-auto my-4 px-2 md:px-4">
            <div className="px-8 relative">
                <button
                    onClick={scrollLeft}
                    className="absolute z-50 left-10 top-1/2 transform -translate-y-1/2 bg-white text-black text-xl p-2 rounded-full shadow-lg"
                >
                    &lt;
                </button>
                <button
                    onClick={scrollRight}
                    className="absolute z-50 right-10 top-1/2 transform -translate-y-1/2 bg-white text-black text-xl p-2 rounded-full shadow-lg"
                >
                    &gt;
                </button>

                {/* Render banners based on view type */}
                <div
                    ref={containerRef}
                    className={`flex ${isMobileView ? 'h-96' : 'h-80'} w-full bg-red-400 rounded-lg overflow-hidden`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
                >
                    {isMobileView
                        ? mobileImages.map((imageURL, index) => (
                              <img
                                  key={index}
                                  src={imageURL}
                                  alt={`Mobile Banner ${index + 1}`}
                                  className="object-fit min-w-full h-full"
                              />
                          ))
                        : desktopImages.map((imageURL, index) => (
                              <img
                                  key={index}
                                  src={imageURL}
                                  alt={`Desktop Banner ${index + 1}`}
                                  className="object-fit min-w-full h-full"
                              />
                          ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;