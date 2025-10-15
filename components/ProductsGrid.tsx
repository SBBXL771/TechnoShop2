'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('new');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/smartphones?limit=8')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products as Product[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));

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
    <section className="w-[1120px] h-[880px] mx-auto mb-20 flex flex-col gap-10">
      <div className="flex items-center gap-6 h-[32px]">
        <div
          onClick={() => setActiveTab('new')}
          className={`w-[100px] h-[32px] flex items-center justify-center text-sm font-semibold cursor-pointer transition ${
            activeTab === 'new'
              ? 'text-black'
              : 'text-gray-400 hover:text-black'
          }`}
        >
          New Arrival
        </div>

        <div
          onClick={() => setActiveTab('best')}
          className={`w-[86px] h-[32px] flex items-center justify-center text-sm font-semibold cursor-pointer transition ${
            activeTab === 'best'
              ? 'text-black'
              : 'text-gray-400 hover:text-black'
          }`}
        >
          Bestseller
        </div>

        <div
          onClick={() => setActiveTab('featured')}
          className={`w-[159px] h-[32px] flex items-center justify-center text-sm font-semibold cursor-pointer transition ${
            activeTab === 'featured'
              ? 'text-black'
              : 'text-gray-400 hover:text-black'
          }`}
        >
          Featured Products
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-6 justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative border rounded-2xl p-4 flex flex-col items-center bg-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
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
      )}
    </section>
  );
}
