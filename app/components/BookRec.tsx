import React from "react";
import Image from "next/image";
import { cookBooks } from "../_lib";
const BookRec = () => {
  return (
    <div className="flex flex-col border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl p-4 overflow-hidden ">
      <h2 className="text-white text-center text-2xl mb-5 font-extrabold playfair-display">
        COOKBOOKS
      </h2>
      {cookBooks.map((book, index) => (
        <div
          key={index}
          className="flex  justify-center mb-8 items-center gap-4"
        >
          <div className="w-[120px] h-[120px] relative">
            <Image
              src={book.imgSrc}
              alt={book.title}
              layout="fill"
              objectFit="contain"
              className="object-center"
            />
          </div>

          <div>
            <h3 className="font-bold text-white">{book.title}</h3>
            <p className="text-sm text-white/90">{book.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookRec;
