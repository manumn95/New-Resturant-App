import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItems } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.productList);
const dispatch = useDispatch();
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  
  const handleAddCartProduct=(e)=>{
    e.stopPropagation();
    dispatch(addCartItems(productDisplay))
      }
    
      const handleBuy=()=>{
        dispatch(addCartItems(productDisplay))
        navigate('/cart')
      }

  return (
    <div className=" p-2 md:p-4">
      <div className="w-full max-w-4xl gap-5  m-auto md:flex bg-white">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            alt="productImage"
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-medium text-2xl">
            {productDisplay.category}
          </p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flext gap-3">
            <button className="bg-yellow-500 p-1 mt-2 mx-2 rounded hover:bg-yellow-600  " onClick={handleBuy}>
              Buy
            </button>
            <button className="bg-yellow-500 mt-2 mx-2 rounded hover:bg-yellow-600 p-1 " onClick={handleAddCartProduct}>
              Add To Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description:</p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading='Related Product'></AllProduct>
    </div>
  );
};

export default Menu;
