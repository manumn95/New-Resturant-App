import React,{useState,useEffect} from 'react'
import CardFeature from './CardFeature';
import { useSelector } from "react-redux";
import FilterProduct from './FilterProduct';
const AllProduct = ({heading}) => {
  const productData = useSelector((state) => state.product.productList);

  const categoryList = [
    ...new Set(productData.map((el, index) => el.category)),
  ];

 const[filterby,setFilterBy] = useState('')
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeatures=new Array(10).fill(null)
  return (
    <div className="my-5">
    <h1 className="font-bold text-2xl text-slate-800 mb-4">
       {heading}
    </h1>
    <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
      {categoryList[0]?
        categoryList.map((el, index) => {
          return (
            <FilterProduct
              category={el}
              onClick={() => handleFilterProduct(el)}
              isActive={el === filterby}
            ></FilterProduct>
          );
        }):(
          <div className="min-h-[150px] flex justify-center items-center">
         <p>Loading...</p>
       </div>
        )}
    </div>
    <div className="flex flex-wrap justify-center gap-4 my-4">
      { dataFilter[0] ?dataFilter.map((el, index) => {
        return (
         
          <CardFeature
            key={index}
            id={el._id}
            image={el.image}
            name={el.name}
            category={el.category}
            price={el.price}
          ></CardFeature>
        );
      }):
      loadingArrayFeatures.map((el, index) => {
        return (
          <CardFeature key={index} loading="loading...."></CardFeature>
        );
      })}
      
    </div>
  </div>
  )
}

export default AllProduct
