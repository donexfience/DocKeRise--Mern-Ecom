import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import axios from "axios";
import { URL } from "../../../Common/api";
import ProductCard from "../../../components/ProductCard";

const RelatedProducts = ({id}) => {

  const scrollContainerReF = useRef(null);
  let [isLeft, setIsLeft] = useState(false);
  const [product,setProduct]=useState([]);
  const scrollLeft = () => {
    if (scrollContainerReF.current) {
      scrollContainerReF.current.scrollLeft -= 1225;
      setIsLeft(!isLeft);
    }
  };
  const scrollRight = () => {
    if (scrollContainerReF.current) {
      scrollContainerReF.current.scrollLeft += 1225;
      setIsLeft(!isLeft);
    }
  };
  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`${URL}/user/product/${id}`, {
        withCredentials: true,
      });
      if (data) {
        setProduct(data.similarProducts);
      }
    } catch (error) {
        console.log(error)
    }
  };
  useEffect(() => {
    loadProduct();
  }, [id]);
  return (
    <div className="pt-20 lg:py-20 relative bg-white">
        <h2 className="font-bold text-center text-3xl text-violet-500">Realated Products</h2>
      <div>
        <button
          className="bg-black rounded-full w-10 h-10 text-xl flex items-center justify-center absolute top-1/2 left-0 transform -translate-y-1/2  text-white font-bold hover:text-gray-700"
          onClick={scrollLeft}
        >
          <AiOutlineLeft />
        </button>
        <button
          className="bg-black rounded-full w-10 h-10 text-xl flex items-center justify-center absolute top-1/2 right-0 transform -translate-y-1/2 text-white font-bold hover:text-gray-700"
          onClick={scrollRight}
        >
          <AiOutlineRight />
        </button>
      </div>

      <div
        className="flex justify-center items-center gap-20 px-5 scrollbar-hide overflow-x-scroll py-10 w-full"
        ref={scrollContainerReF}
      >
        { product &&
          product.map((data, index) => <ProductCard key={index} data={data} />)}
      </div>
      <div className=" mt-5 font-mono font=bold text-center text-white font-semibold text-xl">View All Products</div>
    </div>
  );
};

export default RelatedProducts;
