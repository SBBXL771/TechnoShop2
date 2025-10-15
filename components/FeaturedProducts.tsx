import Image from 'next/image';

export default function FeaturedProducts() {
  return (
    <section className="w-full h-[600px] mx-auto grid grid-cols-2 gap-0">
      <div className="grid grid-rows-2 h-full">
        <div className="flex items-center bg-white p-6 w-[720px] h-[343px] text-black">
          <Image
            src="/images/PlayStation.png"
            alt="Playstation 5"
            width={300}
            height={300}
            className="object-contain "
          />

          <div className="ml-6 w-[338px]">
            <h2 className="text-5xl font-bold">Playstation 5</h2>
            <p className="text-gray-600 text-md mt-2">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
              will redefine your PlayStation experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-0 w-full h-[272px]">
          <div className="bg-gray-100 p-4 flex">
            <Image
              src="/images/airpods.png"
              alt="Apple AirPods Max"
              width={104}
              height={272}
              className="object-cover"
            />
            <div className="ml-4 w-[160px] h-[272px] flex flex-col justify-center">
              <h3 className="text-3xl">
                Apple <br /> AirPods <br />
                <span className="font-bold">Max</span>
              </h3>
              <br />
              <p className="text-sm text-muted-foreground">
                Computational audio. Listen, it's powerful
              </p>
            </div>
          </div>

          <div className="bg-black text-white p-4 flex items-center">
            <Image
              src="/images/applevision.png"
              alt="Apple Vision Pro"
              width={136}
              height={190}
              className="object-contain"
            />
            <div className="ml-4 w-[160px] h-[144px] flex flex-col justify-center">
              <h3 className="text-3xl">
                Apple <br />
                <span className="font-bold">Vision Pro</span>
              </h3>
              <p className="text-sm text-gray-300">
                <br />
                An immersive way to experience <br /> entertainment
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-6 pl-5 flex justify-between h-[648px]">
        <div className="w-[360px] h-[272px] flex flex-col mt-40">
          <h2 className="text-6xl font-light">
            Macbook <br /> <span className="font-bold">Air</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            The new 15-inch MacBook Air makes room for more <br /> of what you
            love with a spacious Liquid Retina display.
          </p>
          <button className="mt-4 border border-gray-400 px-4 py-2 rounded-md hover:bg-red-600 transition">
            Shop Now
          </button>
        </div>

        <Image
          src="/images/MacBookPro14.png"
          alt="Macbook Air"
          width={292}
          height={502}
          className="object-contain m-0 t-0"
        />
      </div>
    </section>
  );
}
