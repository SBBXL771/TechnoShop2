'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand?: string;
}

export default function CatalogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'all' | 'asc' | 'desc'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const productsPerPage = 9;
  const brandList = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'Oppo',
    'Vivo',
    'Nokia',
    'Realme',
    'Honor',
    'Google',
  ];

  const additionalFilters = [
    'Battery capacity',
    'Screen type',
    'Screen diagonal',
    'Protection class',
    'Built-in memory',
  ];

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=200`)
      .then((response) => response.json())
      .then((data) => {
        const productList = data.products || [];
        setAllProducts(productList);
        setProducts(productList.slice(0, productsPerPage));
        setTotalProducts(productList.length);
      });

    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) setLikedProducts(JSON.parse(savedLikes));
  }, []);

  useEffect(() => {
    let filteredProducts = [...allProducts];

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.brand?.toLowerCase() === selectedBrand.toLowerCase(),
      );
    }

    if (searchTerm.trim()) {
      filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (selectedBrand) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.brand?.toLowerCase() === selectedBrand.toLowerCase(),
        );
      }
    }

    if (sortOrder === 'asc') {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setTotalProducts(filteredProducts.length);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setProducts(filteredProducts.slice(startIndex, endIndex));
  }, [allProducts, selectedBrand, searchTerm, sortOrder, currentPage]);

  const brandCounts = brandList.reduce(
    (accumulator, brand) => {
      const count = allProducts.filter(
        (product) => product.brand?.toLowerCase() === brand.toLowerCase(),
      ).length;
      accumulator[brand] = count;
      return accumulator;
    },
    {} as Record<string, number>,
  );

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
    const cartItems: (Product & { quantity: number })[] = JSON.parse(
      localStorage.getItem('cartItems') || '[]',
    );
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) existingProduct.quantity += 1;
    else cartItems.push({ ...product, quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(
      new CustomEvent('cart-updated', { detail: cartItems.length }),
    );
  };

  const handleBrandFilter = (brand: string) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'all' | 'asc' | 'desc');
  };

  const handlePreviousPage = () => {
    setCurrentPage((previous) => Math.max(1, previous - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((previous) => previous + 1);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <section className="w-[1440px] mx-auto mt-[-10px]">
      <div className="flex items-center gap-2 h-[104px] ml-[160px] -mt-[3px]">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <Link href="/" className="hover:text-black transition">
          Catalog
        </Link>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <p className="text-black text-sm font-medium">Smartphones</p>
      </div>

      <div className="flex gap-8 w-[1244px] mx-auto">
        <div className="w-[256px] flex flex-col border-r border-gray-200 pr-4">
          <div className="w-full h-[48px] flex items-center justify-between border-b border-gray-200">
            <p className="font-semibold text-lg">Brand</p>
            <ChevronRight className="w-5 h-5 rotate-90 text-gray-500" />
          </div>

          <div className="w-[240px] h-[40px] mt-3 flex items-center border border-gray-300 rounded-md px-2 gap-2">
            <Search className="w-[24px] h-[24px] text-gray-500" />
            <input
              type="text"
              placeholder="Search all products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400"
            />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {brandList.map((brand, index) => (
              <label
                key={index}
                onClick={() => handleBrandFilter(brand)}
                className={`flex items-center justify-between cursor-pointer hover:text-black transition ${
                  selectedBrand === brand
                    ? 'font-bold text-black'
                    : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrand === brand}
                    readOnly
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm">{brand}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({brandCounts[brand] || 0})
                </span>
              </label>
            ))}
          </div>

          {additionalFilters.map((filter, index) => (
            <div key={index} className="mt-6 border-t border-gray-200 pt-4">
              <div className="w-full h-[24px] flex items-center justify-between">
                <p className="font-medium text-gray-800">{filter}</p>
                <ChevronRight className="w-5 h-5 rotate-90 text-gray-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between w-full h-[40px] mb-6 pr-[45px]">
            <p className="text-gray-600 text-sm">
              Selected Products:{' '}
              <span className="font-semibold">{totalProducts}</span>
            </p>

            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md text-sm px-2 py-1 w-[256px]"
            >
              <option value="all">All Products</option>
              <option value="asc">Ascending (A -- Z)</option>
              <option value="desc">Descending (Z -- A)</option>
            </select>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative w-[260px] h-[360px] border border-gray-200 rounded-2xl p-4 flex flex-col items-center bg-gray-50 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/product/${product.id}?brand=${encodeURIComponent(
                        product.brand || selectedBrand || '',
                      )}&title=${encodeURIComponent(product.title)}`,
                    )
                  }
                >
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleLike(product.id);
                    }}
                    className="absolute top-3 right-3"
                  >
                    <Heart
                      size={22}
                      className={`transition-colors ${
                        likedProducts.includes(product.id)
                          ? 'text-red-500 fill-red-500'
                          : 'text-gray-700'
                      }`}
                    />
                  </button>

                  <div className="flex justify-center items-center h-[180px]">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>

                  <h3 className=" text-sm font-semibold text-center line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-lg font-bold mt-5">${product.price}</p>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-[198px] h-[50px] mt-4 bg-black text-white rounded-md hover:bg-red-500 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10 text-lg">
              No products found
            </p>
          )}

          {totalProducts > productsPerPage && (
            <div className="flex items-center justify-center gap-2 mt-8 h-[32px]">
              <button
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                className="w-[32px] h-[32px] flex items-center justify-center border rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-[32px] h-[32px] border rounded-md text-sm font-medium ${
                    index + 1 === currentPage
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage * productsPerPage >= totalProducts}
                onClick={handleNextPage}
                className="w-[32px] h-[32px] flex items-center justify-center border rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
