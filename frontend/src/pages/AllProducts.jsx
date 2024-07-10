import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import AdminProductCard from '../components/AdminProductCard';
import ApiSummary from '../common/ApiSummary';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [productList, setProductList] = useState([]);
  const [intent, setIntent] = useState(false);
  const [clickProduct, setClickProduct] = useState("");
  const [header, setHeader] = useState("");

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(ApiSummary.allProducts.url);
      const dataResponse = await response.json();
      setProductList(dataResponse?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAddNewProduct = () => {
    setHeader("Add New Product");
    setIntent(true);
    setClickProduct("");
    setOpenUploadProduct(true);
  };

  const handleEditButton = (product) => {
    setHeader("Edit Product");
    setIntent(false);
    setClickProduct(product);
    setOpenUploadProduct(true);
  };

  const handleDeleteButton = async (product) => {
    try {
      const response = await fetch(ApiSummary.deleteProduct.url, {
        method: ApiSummary.deleteProduct.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: product._id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log(result.message);
        fetchAllProducts(); // Refresh the product list
      } else {
        console.error(result.message);
        alert("Failed to delete the product: " + result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert("An error occurred while deleting the product: " + error.message);
    }
  };

  return (
    <div>
      <div className='flex px-4 py-2 items-center border-b-2 border-red-600 justify-between'>
        <h1 className='text-red-800 font-bold underline text-2xl'>All Products</h1>
        <button
          className='px-3 py-2 rounded-full text-black hover:bg-red-600 hover:text-white border-red-800 border-2 transition-all'
          onClick={handleAddNewProduct}
        >
          Add New Product
        </button>
      </div>
  
      {/* All Products List */}
      <div className='h-[calc(100vh-170px)] mt-2 grid gap-4 mx-[10%] grid-cols-1 xs:grid-cols-2 xs:mx-0 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 py-2'
           style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {productList.map((product, index) => (
          <AdminProductCard
            key={index + "AdminProduct"}
            data={product}
            onEditClick={() => handleEditButton(product)}
            onDeleteClick={handleDeleteButton}
          />
        ))}
      </div>

  
      {/* Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct
          fetchData={fetchAllProducts}
          header={header}
          product={clickProduct}
          intent={intent}
          onClose={() => setOpenUploadProduct(false)}
        />
      )}
    </div>
  );  
};

export default AllProducts;
