import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct.jsx';
import useFetchCategoryList from '../helpers/useFetchCategoryList';
import { ClipLoader } from 'react-spinners';

const Home = () => {

  const { categoryList, loading: categoryLoading } = useFetchCategoryList();

  return (
    <div>
      {/* Render CategoryList with loading indicator */}
      <CategoryList list={categoryList} loading={categoryLoading} />
      <BannerProduct />
      {
        categoryLoading && 
        <>
          <div className='bg-white p-4 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-72'>
            <ClipLoader size={50} color={"#123abc"} loading={categoryLoading} />
          </div>
          <div className='bg-white p-4 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-72'>
            <ClipLoader size={50} color={"#123abc"} loading={categoryLoading} />
          </div>
          <div className='bg-white p-4 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-72'>
            <ClipLoader size={50} color={"#123abc"} loading={categoryLoading} />
          </div>
          <div className='bg-white p-4 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-72'>
            <ClipLoader size={50} color={"#123abc"} loading={categoryLoading} />
          </div>
        </>      
      }
      {categoryList.map((category, index) => (
        <HorizontalCardProduct key={index} heading={"Popular "+category.category} category={category.category} />
      ))}
    </div>
  );
};

export default Home;