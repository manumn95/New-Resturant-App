import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import imagetoBase64 from "../utility/imagetoBase64";
import axios from "axios";
import toast from "react-hot-toast";
const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const data = await imagetoBase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, price, category } = data;
    try {
      if (name && image && price && category) {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
          data
        );
        toast.success(response.data.message);
        setData({
          name: "",
          price: "",
          category: "",
          description: "",
          image: "",
        });
      } else {
        toast.error("Enter required fields");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        ></input>
        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          onChange={handleOnChange}
          name="category"
          value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"fruit"}>Fruit</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"Icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"paneer"}>Paneer</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor="image" className="py-1">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data?.image ? (
              <img src={data.image} alt="product-image" className="h-full" />
            ) : (
              <span className="text-5xl">
                <IoCloudUploadOutline />
              </span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="hidden"
              id="image"
            ></input>
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          name="price"
          value={data.price}
        ></input>

        <label htmlFor="decsription">Description</label>
        <textarea
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none"
          onChange={handleOnChange}
          name="description"
          value={data.description}
        ></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow my-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
