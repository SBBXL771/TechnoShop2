'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price?: number;
  thumbnail?: string;
}

export default function LikePage() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      const savedLikes = localStorage.getItem('likedProducts');
      if (savedLikes) {
        const likedProductIds: number[] = JSON.parse(savedLikes);

        const productPromises = likedProductIds.map((productId) =>
          fetch(`https://dummyjson.com/products/${productId}`)
            .then((response) => response.json())
            .catch((error) => {
              console.error(`Error fetching product ${productId}:`, error);
              return null;
            })
        );

        const products = await Promise.all(productPromises);
        const validProducts = products.filter(
          (product) => product !== null
        ) as Product[];
        
        setLikedProducts(validProducts);
      }
      setIsLoading(false);
    };

    fetchLikedProducts();
  }, []);

  const toggleLike = (productId: number) => {
    const savedLikes = localStorage.getItem('likedProducts');
    let likedProductIds: number[] = savedLikes ? JSON.parse(savedLikes) : [];

    if (likedProductIds.includes(productId)) {
      likedProductIds = likedProductIds.filter((id) => id !== productId);
    } else {
      likedProductIds = [...likedProductIds, productId];
    }

    localStorage.setItem('likedProducts', JSON.stringify(likedProductIds));

    window.dispatchEvent(
      new CustomEvent('likes-updated', { detail: likedProductIds.length })
    );

    setLikedProducts((previousProducts) =>
      previousProducts.filter((product) => likedProductIds.includes(product.id))
    );
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-gray-500">Yuklanmoqda...</div>
    );
  }

  if (likedProducts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Hech qanday maxsulot yoq
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-10 bg-white">
      <h2 className="text-2xl font-semibold mb-6">
        Liked Products ({likedProducts.length})
      </h2>

      <div className="w-[1120px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {likedProducts.map((product) => (
          <div
            key={product.id}
            className="relative border rounded-2xl p-4 flex flex-col items-center bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-1"
            style={{ width: '260px', height: '360px' }}
          >
            <button
              onClick={(event) => {
                event.stopPropagation();
                toggleLike(product.id);
              }}
              className="absolute top-3 right-3 z-10"
            >
              <Heart size={24} className="text-red-500 fill-red-500" />
            </button>

            <Link
              href={`/product/${product.id}`}
              className="flex flex-col items-center w-full h-full justify-start"
            >
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
          </div>
        ))}
      </div>
    </div>
  );
}