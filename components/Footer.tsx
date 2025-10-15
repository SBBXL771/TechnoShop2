"use client";
import { Facebook, Instagram, Twitter, Music } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full h-[513px] bg-black text-white mx-auto">
      <div className="w-[1120px] h-[265px] mx-auto flex justify-between pt-[120px]">
        <div className="w-[384px] h-[94.87px]">
          <h2 className="text-[22.87px] font-bold mb-[10px]">cyber</h2>
          <p className="text-[14px] leading-[24px] text-gray-400 w-[384px] h-[48px]">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p><br /><br /><br /><br /><br /><br /><br /><br />
          <div className="flex gap-4 mt-[16px] text-gray-100">
            <Twitter className="w-[16px] h-[16px] hover:text-white cursor-pointer" />
            <Music className="w-[16px] h-[16px] hover:text-white cursor-pointer" />
            <Instagram className="w-[16px] h-[16px] hover:text-white cursor-pointer" />
            <Facebook className="w-[16px] h-[16px] hover:text-white cursor-pointer" />
          </div>
        </div>

        <div className="w-[295.5px] h-[256px]">
          <h3 className="text-[16px] font-semibold mb-[16px]">Services</h3>
          <ul className="space-y-[8px] text-gray-400 text-[14px] leading-[32px]">
            <li>Bonus program</li>
            <li>Gift cards</li>
            <li>Credit and payment</li>
            <li>Service contracts</li>
            <li>Non-cash account</li>
            <li>Payment</li>
          </ul>
        </div>

        <div className="w-[295.5px] h-[256px]">
          <h3 className="text-[16px] font-semibold mb-[16px]">Assistance to the buyer</h3>
          <ul className="space-y-[8px] text-gray-400 text-[14px] leading-[32px]">
            <li>Find an order</li>
            <li>Terms of delivery</li>
            <li>Exchange and return of goods</li>
            <li>Guarantee</li>
            <li>Frequently asked questions</li>
            <li>Terms of use of the site</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
