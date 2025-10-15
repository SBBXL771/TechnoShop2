'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function End() {
  const [products, setProducts] = useState<Product[]>([]);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/smartphones?limit=4')
      .then((response) => response.json())
      .then((data) => setProducts(data.products as Product[]));

    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) setLikedProducts(JSON.parse(savedLikes));
  }, []);

  const toggleLike = (productId: number) => {
    let updatedLikes: number[];

    if (likedProducts.includes(productId)) {
      updatedLikes = likedProducts.filter((item) => item !== productId);
    } else {
      updatedLikes = [...likedProducts, productId];
    }

    setLikedProducts(updatedLikes);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
    localStorage.setItem('likedCount', String(updatedLikes.length));

    window.dispatchEvent(
      new CustomEvent('likes-updated', { detail: updatedLikes.length }),
    );
  };

  const addToCart = (product: Product) => {
    const cartItems: (Product & { quantity: number })[] = JSON.parse(
      localStorage.getItem('cartItems') || '[]',
    );

    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(
      new CustomEvent('cart-updated', { detail: cartItems.length }),
    );
  };

  return (
    <section className="w-full flex flex-col items-center bg-white py-10">
      <div className="w-[1120px] h-[32px] mb-6 flex items-center">
        <h2 className="text-[24px] font-semibold">Related Products</h2>
      </div>

      <div className="w-[1120px] h-[432px] flex justify-between">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative border rounded-2xl p-4 flex flex-col items-center bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-1"
            style={{ width: '260px', height: '360px' }}
          >
            <button
              onClick={() => toggleLike(product.id)}
              className="absolute top-3 right-3"
            >
              <Heart
                size={24}
                className={`transition-colors ${
                  likedProducts.includes(product.id)
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-900'
                }`}
              />
            </button>

            <Image
              src={product.thumbnail || '/placeholder.png'}
              alt={product.title}
              width={160}
              height={160}
              className="object-contain mt-5"
            />

            <h3 className="mt-6 text-center text-sm font-semibold line-clamp-2">
              {product.title}
            </h3>

            <p className="text-lg font-bold mt-2">${product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="w-[188px] h-[48px] bg-black text-white rounded-md hover:bg-red-500 transition mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
