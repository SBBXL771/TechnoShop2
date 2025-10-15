'use client';

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useDebounce } from './hooks/useDebounce';
import axios from 'axios';
import Link from 'next/link';

export interface ProductType {
  id: number;
  title: string;
  images?: string[];
}

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedSearchValue.trim()) {
        setSearchResults([]);
        setWarningMessage('');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${debouncedSearchValue}`,
        );
        if (response.data.products.length > 0) {
          setSearchResults(response.data.products);
          setWarningMessage('');
        } else {
          setSearchResults([]);
          setWarningMessage('Maxsulot topilmadi!');
        }
      } catch (error) {
        console.error(error);
        setWarningMessage('Xatolik yuz berdi!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchValue]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setSearchValue('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center px-4 h-[46px] bg-background rounded-md w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 300)}
          placeholder="Search product..."
          className="w-full outline-none border-none"
        />
        <SearchIcon />
      </div>

      {isOpen && searchValue.length > 0 && (
        <div className="absolute top-11 w-full z-50 max-h-[400px] overflow-auto bg-white border border-gray-200 rounded-b-md p-4 border-t-0">
          {isLoading && <div className="p-2">Yuklanmoqda...</div>}

          {!isLoading &&
            searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={handleLinkClick}
                className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-2"
              >
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <span className="font-semibold">{product.title}</span>
              </Link>
            ))}

          {!isLoading && warningMessage && (
            <div className="text-center text-gray-500">{warningMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchModal;
