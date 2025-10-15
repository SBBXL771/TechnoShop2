"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[448px] mx-auto overflow-hidden">
      <Image
        src="/images/kompsoat.png"
        alt="Big Summer Sale"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white w-[553px] h-[200px] flex flex-col items-center justify-between">
        <h1 className="text-[56px] font-light leading-[72px] w-[553px]">
          Big Summer <span className="font-bold">Sale</span>
        </h1>
        <p className="text-[18px] leading-[32px] w-[553px] text-gray-300">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <button className="w-[191px] h-[56px] border border-white rounded-md hover:bg-white hover:text-black transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}
