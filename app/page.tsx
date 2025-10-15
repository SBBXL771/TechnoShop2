// app/page.tsx
import Image from 'next/image';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrowseByCategory from '@/components/BrowseByCategory';
import ProductsGrid from '@/components/ProductsGrid';
import PopularProducts from '@/components/PopularProducts';
import Discounts from '@/components/Discounts';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-[550px] mx-auto overflow-hidden">
        <Image
          src="/images/Banner.png"
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <FeaturedProducts />
      <BrowseByCategory />
      <ProductsGrid />
      <PopularProducts />
      <Discounts />
      <Hero />
    </div>
  );
}
