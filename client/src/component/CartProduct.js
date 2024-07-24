import React from "react";
import { LuPlus } from "react-icons/lu";
import { HiMinusSmall } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { decreaseQty, deleteCartItems, increaseQty } from "../redux/productSlice";

const CartProduct = ({ name, image, id, category, qty, total, price }) => {

const dispatch = useDispatch();

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} alt="image-pic" className="h-28 w-40 object-cover" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
        <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
          {name}
        </h3>
      <div className="cursor-pointer text-salte-700 hover:text-red-600" onClick={()=>dispatch(deleteCartItems(id))}>
      <MdDeleteForever />
      </div>
      </div>
        <p className=" text-slate-500 font-medium ">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
        <div className="flex gap-3 items-center">
          <button className="bg-slate-300 p-1 mt-2 mx-2 rounded hover:bg-slate-400 text-2xl " onClick={()=>dispatch(increaseQty(id))}>
            <LuPlus />
          </button>
          <p className="font-semibold p-1">{qty}</p>
          <button className="bg-slate-300 mt-2 mx-2 rounded  p-1 hover:bg-slate-400  " onClick={()=>dispatch(decreaseQty(id))}>
            <HiMinusSmall />
          </button>
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <p>Total:</p>
          <p><span className="text-red-500">₹</span>{total}</p>
        </div>
        </div>
      
      </div>
    </div>
  );
};

export default CartProduct;
