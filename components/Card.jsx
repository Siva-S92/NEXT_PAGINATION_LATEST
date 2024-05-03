
import React from "react";

const Card = ({ item }) => {
  return (
    <div className="w-[20rem] h-[22rem] flex flex-col border border-gray-400 rounded-lg p-2">
      <div className="w-full h-[50%]">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply"/>
      </div>
      <div className="w-full h-[50%] content-center">
        <h1>{item.title}</h1>
        <p>{item.description.slice(0, 60)}....</p>
        <p>{item.rating}✡✡✡✡</p>
        <p className="font-bold">{item.price}$</p>
      </div>
    </div>
  );
};

export default Card;
