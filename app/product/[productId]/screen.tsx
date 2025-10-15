'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductDetailsProps {
  product: {
    id: number;
    title: string;
    description: string;
  };
}

export default function screen({ product }: ProductDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const screenDetails = [
    { label: 'Screen diagonal', value: '6.7"' },
    { label: 'The screen resolution', value: '2796×1290' },
    { label: 'The screen refresh rate', value: '120 Hz' },
    { label: 'The pixel density', value: '460 ppi' },
    { label: 'Screen type', value: 'OLED' },
    {
      label: 'Additionally',
      value: `Dynamic Island\nAlways-On display\nHDR display\nTrue Tone\nWide color (P3)`,
    },
  ];

  const cpuDetails = [
    { label: 'CPU', value: 'A16 Bionic' },
    { label: 'Number of cores', value: '6' },
  ];

  const additionalDetails = [
    { label: 'Main camera', value: '48 MP' },
    { label: 'Front camera', value: '12 MP' },
    { label: 'Battery capacity', value: '4323 mAh' },
  ];

  return (
    <section
      className="mx-auto bg-white"
      style={{ width: '1290px', padding: '0 10px' }}
    >
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <div style={{ width: '1190px', height: '32px', margin: '0 auto' }}>
          <h2 className="text-2xl font-semibold">Details</h2>
        </div>
        <div
          style={{ width: '1190px', margin: '24px auto 0' }}
          className="text-gray-600 text-sm leading-relaxed"
        >
          <p>
            Just as a book is judged by its cover, the first thing you notice
            when you pick up a modern smartphone is the display. Nothing
            surprising, because advanced technologies allow you to practically
            level the display frames and cutouts for the front camera and
            speaker, leaving no room for bold design solutions. And how good
            that in such realities Apple everything is fine with displays. Both
            critics and mass consumers always praise the quality of the picture
            provided by the products of the Californian brand. And last year's
            6.7-inch Retina panels, which had ProMotion, caused real admiration
            for many.
          </p>
        </div>

        <div style={{ width: '1190px', margin: '32px auto 0' }}>
          <div style={{ width: '1190px', height: '24px', marginBottom: '16px' }}>
            <h3 className="text-lg font-semibold">Screen</h3>
          </div>

          <div className="flex flex-col gap-4">
            {screenDetails.map((detail, index) => (
              <div
                key={index}
                style={{ width: '1190px', minHeight: '32px' }}
                className="flex justify-between items-start border-b border-gray-200 pb-2"
              >
                <span
                  style={{ height: '24px' }}
                  className="text-sm text-gray-700"
                >
                  {detail.label}
                </span>
                <span
                  style={{ height: 'auto', textAlign: 'right' }}
                  className="text-sm text-gray-900 font-medium whitespace-pre-line"
                >
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '1190px', margin: '32px auto 0' }}>
          <div style={{ width: '1090px', height: '24px', marginBottom: '16px' }}>
            <h3 className="text-lg font-semibold">CPU</h3>
          </div>

          <div className="flex flex-col gap-4">
            {cpuDetails.map((detail, index) => (
              <div
                key={index}
                style={{ width: '1190px', height: '32px' }}
                className="flex justify-between items-center border-b border-gray-200 pb-2"
              >
                <span
                  style={{ height: '24px' }}
                  className="text-sm text-gray-700"
                >
                  {detail.label}
                </span>
                <span
                  style={{ height: '24px' }}
                  className="text-sm text-gray-900 font-medium"
                >
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ width: '216px', height: '48px', margin: '24px auto 0' }}
          className="flex items-center justify-center"
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition"
          >
            <span style={{ height: '24px', lineHeight: '24px' }}>
              View More
            </span>
            <ChevronDown
              size={24}
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {isExpanded && (
          <div style={{ width: '1190px', margin: '32px auto 0' }}>
            <div className="flex flex-col gap-4">
              {additionalDetails.map((detail, index) => (
                <div
                  key={index}
                  style={{ width: '1190px', height: '32px' }}
                  className="flex justify-between items-center border-b border-gray-200 pb-2"
                >
                  <span
                    style={{ height: '24px' }}
                    className="text-sm text-gray-700"
                  >
                    {detail.label}
                  </span>
                  <span
                    style={{ height: '24px' }}
                    className="text-sm text-gray-900 font-medium"
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
