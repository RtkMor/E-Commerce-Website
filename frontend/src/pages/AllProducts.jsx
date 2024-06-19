import React, { useState } from 'react'

import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  return (
    <div>
      <div className='flex px-4 py-2 items-center border-b-2 border-red-600 justify-between'>
        <h1 className='text-red-800 font-bold underline text-2xl'>All Products</h1>
        <button className='px-3 py-2 rounded-full text-black hover:bg-red-600 hover:text-white border-red-800 border-2 transition-all' onClick={() => setOpenUploadProduct(true)}>Add New Product</button>
      </div>
      {
        openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)}/>
      }
      
    </div>
  )
}

export default AllProducts
