import React, { useRef } from "react";
import bikeLogo from "../assest/bike.png";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  const homeProductCardList = productData.slice(0, 4);
  const homeProductCartVegtable = productData.filter(
    (el) => el.category === "vegetable"
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeatures = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2  ">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img src={bikeLogo} alt="bikeLogo" className="h-7" />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery in{" "}
            <span className="text-orange-500">Your Home</span>
          </h2>
          <p className="p-3 text-base ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries
          </p>
          <button className="text-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md hover:bg-red-600">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCardList[0]
            ? homeProductCardList.map((el, index) => {
                return (
                  <HomeCard
                    id={el._id}
                    key={index}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  ></HomeCard>
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index} loading={"loading...."}></HomeCard>
                );
              })}
        </div>
      </div>
      <div>
        <div className="flex w-full items-center">
          <h1 className="font-bold text-2xl text-slate-800 mb-4">
            fresh Vegetables
          </h1>
          <div className="ml-auto flex gap-4">
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={prevProduct}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={nextProduct}
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartVegtable[0]
            ? homeProductCartVegtable.map((el, index) => {
                return (
                  <CardFeature
                    key={index}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  ></CardFeature>
                );
              })
            : loadingArrayFeatures.map((el, index) => {
                return (
                  <CardFeature key={index} loading="loading...."></CardFeature>
                );
              })}
        </div>
      </div>

      <AllProduct heading={"Your products"}></AllProduct>
    </div>
  );
};

export default Home;
