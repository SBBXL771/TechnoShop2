'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface Category {
  id: number;
  name: string;
  image: string;
}

export default function BrowseByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const previousButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=7');
      const categoryList = response.data.products.map((product: any) => ({
        id: product.id,
        name: product.title,
        image: product.thumbnail,
      }));
      setCategories(categoryList);
    } catch (error: any) {
      console.error('Kategoriya olishda xato:', error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="w-[1440px] h-[352px] mx-auto flex flex-col gap-8 mt-40">
      <div className="flex items-center w-[1120px] h-[32px] mx-auto justify-between">
        <h2 className="text-2xl font-bold">Browse By Category</h2>
        <div className="flex items-center gap-[5px]">
          <button
            ref={previousButtonRef}
            className="w-[65px] h-[32px] rounded flex items-center justify-center hover:bg-gray-200 transition"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            ref={nextButtonRef}
            className="w-[65px] h-[32px] rounded flex items-center justify-center hover:bg-gray-200 transition"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>

      <div className="w-[1120px] h-[128px] mx-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={6}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onInit={(swiper) => {
              if (typeof swiper.params.navigation !== 'boolean') {
                const navigation = swiper.params.navigation!;
                navigation.prevEl = previousButtonRef.current!;
                navigation.nextEl = nextButtonRef.current!;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            className="w-full h-full"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link href={`/catalog/${category.id}`}>
                  <div className="w-[160px] h-[128px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center hover:shadow-md transition hover:scale-105 duration-300 cursor-pointer">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                    <p className="mt-2 text-base font-medium text-center">{category.name}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}