'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/components/hooks/useDebounce';
import axios from 'axios';

export interface ProductType {
  id: number;
  title: string;
  images?: string[];
}

export default function Header() {
  const [likeCount, setLikeCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const debounce = useDebounce(searchValue, 500);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedCount');
    if (savedLikes) setLikeCount(parseInt(savedLikes));

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) setCartCount(JSON.parse(savedCart).length);
  }, []);

  useEffect(() => {
    const handleLikeUpdate = (e: any) => setLikeCount(e.detail);
    const handleCartUpdate = (e: any) => setCartCount(e.detail);

    window.addEventListener('likes-updated', handleLikeUpdate);
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('likes-updated', handleLikeUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!debounce.trim()) {
        setSearchResults([]);
        setWarning('');
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `https://dummyjson.com/products/search?q=${debounce}`,
        );
        if (res.data.products.length > 0) {
          setSearchResults(res.data.products);
          setWarning('');
        } else {
          setSearchResults([]);
          setWarning('Maxsulot topilmadi!');
        }
      } catch (err) {
        console.error(err);
        setWarning('Xatolik yuz berdi!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debounce]);

  const handleLinkClick = () => {
    setOpen(false);
    setSearchValue('');
  };

  return (
    <header className="bg-card border-b">
      <div className="container mx-auto px-20">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            cyber
          </Link>

          <div className="flex-1 flex justify-start mx-14 relative">
            <div className="relative max-w-md w-[calc(100%-3px)]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10 bg-muted border-0 w-full rounded-md"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 200)}
              />

              {open && searchValue.length > 0 && (
                <div className="absolute top-11 w-full z-50 max-h-[400px] overflow-auto bg-white border border-gray-200 rounded-b-md p-4 border-t-0">
                  {loading && <div className="p-2">Yuklanmoqda...</div>}

                  {!loading &&
                    searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        onClick={handleLinkClick}
                        className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-2"
                      >
                        {item.images?.[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        )}
                        <span className="font-semibold">{item.title}</span>
                      </Link>
                    ))}

                  {!loading && warning && (
                    <div className="text-center text-gray-500">{warning}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-8 text-sm">
              <a href="#" className="hover:text-secondary transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                About
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Blog
              </a>
            </nav>

            <div className="flex items-center gap-6 relative">
              <Link href="/likes" className="relative">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                {likeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {likeCount}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href="/registr">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
