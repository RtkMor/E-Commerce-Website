import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import fetchCategoryList from './fetchCategoryList';

const useFetchCategoryList = () => {
    
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const list = await fetchCategoryList();
            if (list) {
                setCategoryList(list);
            } else {
                toast.error('Failed to load category list');
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return { categoryList, loading };
};

export default useFetchCategoryList;