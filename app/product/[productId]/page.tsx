'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import {
  ChevronRight,
  Heart,
  Truck,
  ShieldCheck,
  Star,
  Cpu,
  Battery,
} from 'lucide-react';
import Link from 'next/link';
import ScreenDetails from './screen';
// import ReviewsSection from './Reviews';
import End from './end';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  brand?: string;
  thumbnail: string;
  images?: string[];
}

export default function ProductDetails() {
  const { productId } = useParams();
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get('brand');
  const selectedTitle = searchParams.get('title');

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedMemory, setSelectedMemory] = useState<string>('256GB');

  const availableColors = [
    '#000000',
    '#ffffff',
    '#ff0000',
    '#ffd700',
    '#6b21a8',
    '#f97316',
  ];
  const memoryOptions = ['128GB', '256GB', '512GB', '1TB'];

  useEffect(() => {
    if (!productId) return;

    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail || data.images?.[0]);
      });

    const savedLikes = localStorage.getItem('likedProducts');
    const savedColor = localStorage.getItem('selectedColor');
    const savedMemory = localStorage.getItem('selectedMemory');

    if (savedLikes) setLikedProducts(JSON.parse(savedLikes));
    if (savedColor) setSelectedColor(savedColor);
    if (savedMemory) setSelectedMemory(savedMemory);
  }, [productId]);

  const toggleLike = (productId: number) => {
    let updatedLikes: number[];
    if (likedProducts.includes(productId))
      updatedLikes = likedProducts.filter((id) => id !== productId);
    else updatedLikes = [...likedProducts, productId];

    setLikedProducts(updatedLikes);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikes));

    window.dispatchEvent(
      new CustomEvent('likes-updated', { detail: updatedLikes.length }),
    );
  };

  const addToCart = (product: Product) => {
    const cartItems: (Product & {
      quantity: number;
      color?: string;
      memory?: string;
    })[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) existingProduct.quantity += 1;
    else
      cartItems.push({
        ...product,
        quantity: 1,
        color: selectedColor,
        memory: selectedMemory,
      });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(
      new CustomEvent('cart-updated', { detail: cartItems.length }),
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    localStorage.setItem('selectedColor', color);
  };

  const handleMemoryChange = (memory: string) => {
    setSelectedMemory(memory);
    localStorage.setItem('selectedMemory', memory);
  };

  if (!product)
    return (
      <div className="flex items-center justify-center h-[500px]">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <section className="max-w-[1440px] mx-auto py-6 pl-[120px] pt-[8px] mt-6">
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-8">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link href="/catalog/1" className="hover:text-black">
            Catalog
          </Link>
          <ChevronRight size={16} />
          <Link href="/catalog/1" className="hover:text-black">
            Smartphones
          </Link>

          {selectedBrand && (
            <>
              <ChevronRight size={16} />
              <Link
                href={`/catalog/1?brand=${selectedBrand}`}
                className="hover:text-black font-medium"
              >
                {selectedBrand}
              </Link>
            </>
          )}

          <ChevronRight size={16} />
          <span className="font-semibold text-black">
            {selectedTitle || product.title}
          </span>
        </div>

        <div className="flex gap-12 mt-40">
          <div className="flex gap-6 w-[600px]">
            <div className="flex flex-col gap-3 h-[516px] overflow-y-auto pr-1">
              {(product.images || [product.thumbnail]).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`w-[90px] h-[100px] flex items-center justify-center rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-105 `}
                >
                  <Image
                    src={image}
                    alt={`${product.title}-${index}`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </button>
              ))}
            </div>

            <div className="w-[460px] h-[516px] rounded-3xl flex items-center justify-center shadow-sm bg-white">
              {mainImage && (
                <Image
                  src={mainImage}
                  alt={product.title}
                  width={430}
                  height={500}
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>
          </div>

          <div className="w-[536px] flex flex-col mt-[-90px]">
            <div>
              <h1 className="text-5xl font-bold">{product.title}</h1>

              <div className="flex items-end gap-2 mt-3">
                <p className="text-2xl font-bold">${product.price}</p>
                {product.discountPercentage && (
                  <p className="text-gray-400 line-through text-sm">
                    $
                    {(
                      product.price *
                      (1 + product.discountPercentage / 100)
                    ).toFixed(2)}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm">Select color:</span>
                <div className="flex gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? 'ring-2 ring-black' : ''
                      }`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                {memoryOptions.map((memory) => (
                  <button
                    key={memory}
                    onClick={() => handleMemoryChange(memory)}
                    className={`w-[122px] h-[48px] rounded-md border text-sm ${
                      selectedMemory === memory
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-300'
                    }`}
                  >
                    {memory}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { icon: Star, title: 'Screen', value: '6.7"' },
                  { icon: Cpu, title: 'CPU', value: 'A16 Bionic' },
                  { icon: Battery, title: 'Battery', value: '4323mAh' },
                  { icon: Star, title: 'Screen', value: '6.7"' },
                  { icon: Cpu, title: 'CPU', value: 'A16 Bionic' },
                  { icon: Battery, title: 'Battery', value: '4323mAh' },
                ].map(({ icon: Icon, title, value }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-white"
                  >
                    <Icon size={20} />
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs text-gray-500">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => toggleLike(product.id)}
                className={`w-[270px] h-[60px] border rounded-lg flex items-center justify-center gap-2 transition-all ${
                  likedProducts.includes(product.id)
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-black border-gray-300 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart
                  size={20}
                  className={
                    likedProducts.includes(product.id)
                      ? 'text-white fill-white'
                      : 'text-gray-700'
                  }
                />
                <span className="text-sm font-medium">Add to Wishlist</span>
              </button>

              <button
                onClick={() => addToCart(product)}
                className="w-[270px] h-[60px] bg-black text-white rounded-lg text-sm font-medium hover:bg-red-500 transition"
              >
                Add to Cart
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              {[
                { icon: Truck, title: 'Free Delivery', sub: '1-2 day' },
                { icon: Star, title: 'In Stock', sub: 'Today' },
                { icon: ShieldCheck, title: 'Guaranteed', sub: '1 year' },
              ].map(({ icon: Icon, title, sub }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border rounded-lg px-4 py-3 flex-1"
                >
                  <Icon size={22} />
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScreenDetails product={product} />
      {/* <ReviewsSection /> */}
      <End />
    </>
  );
}