'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price?: number;
  thumbnail?: string;
}

export default function LikePage() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      const likedProductIds: number[] = JSON.parse(savedLikes);
      fetch('https://dummyjson.com/products?limit=100')
        .then((response) => response.json())
        .then((data) => {
          const filteredProducts = data.products.filter((product: Product) =>
            likedProductIds.includes(product.id),
          );
          setLikedProducts(filteredProducts);
        });
    }
  }, []);

  if (likedProducts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Hech qanday maxsulot yoq
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-10 bg-white">
      <h2 className="text-2xl font-semibold mb-6">Liked Products</h2>
      <div className="w-[1120px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {likedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="relative border rounded-2xl p-4 flex flex-col items-center bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-1"
            style={{ minHeight: '360px' }}
          >
            <Heart
              size={24}
              className="absolute top-3 right-3 text-red-500 fill-red-500"
            />
            {product.thumbnail && (
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={160}
                height={160}
                className="object-contain mt-5"
              />
            )}
            <h3 className="mt-6 text-center text-sm font-semibold line-clamp-2">
              {product.title}
            </h3>
            {product.price && (
              <p className="text-lg font-bold mt-2">${product.price}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
