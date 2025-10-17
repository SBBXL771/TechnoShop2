'use client';

import Image from 'next/image';

export default function PopularProducts() {
  const products = [
    {
      id: 1,
      title: 'Popular Products',
      description:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      image: '/images/soatairpods.png',
    },
    {
      id: 2,
      title: 'Ipad Pro',
      description:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      image: '/images/ipad.png',
    },
    {
      id: 3,
      title: 'Samsung Galaxy',
      description:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      image: '/images/samsung.png',
    },
    {
      id: 4,
      title: 'Macbook Pro',
      description:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      image: '/images/macbook.png',
    },
  ];

  const backgroundColors = ['#ffffff', '#F5F5F5', '#EDEDED', '#1A1A1A'];

  return (
    <section className="w-full h-[640px] mx-auto mt-1 flex">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="relative flex-1 flex flex-col justify-end p-8 pb-12"
          style={{
            minHeight: '640px',
            backgroundColor: backgroundColors[index],
            color: index === 3 ? 'white' : 'black',
          }}
        >
          <div className="w-full flex justify-center mb-8">
            <Image
              src={product.image}
              alt={product.title}
              width={360}
              height={360}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-xl">{product.title}</h3>

            <p
              className={`text-sm leading-relaxed ${
                index === 3 ? 'text-gray-300' : 'text-gray-600'
              }`}
              style={{ maxWidth: '280px' }}
            >
              {product.description}
            </p>

            <button
              className={`border px-6 py-2.5 mt-2 text-sm font-medium rounded w-fit transition ${
                index === 3
                  ? 'border-white text-white hover:bg-white hover:text-red-600'
                  : 'border-black hover:bg-red-600 hover:text-white'
              }`}
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
