'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function ShippingStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('Select Date');
  const [selectedMethodId, setSelectedMethodId] = useState<number>(1);

  useEffect(() => {
    const savedShipping = localStorage.getItem('selectedShipping');
    if (savedShipping) {
      const parsedShipping = JSON.parse(savedShipping);
      setSelectedMethodId(parsedShipping.id);
      if (parsedShipping.id === 3 && parsedShipping.date) {
        setSelectedDate(parsedShipping.date);
      }
    }
  }, []);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setIsDropdownOpen(false);
    const scheduleMethod = shippingMethods.find((method) => method.id === 3);
    if (scheduleMethod) {
      const updatedMethod = { ...scheduleMethod, date };
      localStorage.setItem('selectedShipping', JSON.stringify(updatedMethod));
    }
  };

  const shippingMethods = [
    {
      id: 1,
      label: 'Free',
      subLabel: 'Regular shipment',
      date: '30 Oct, 2025',
    },
    {
      id: 2,
      label: '$8.50',
      subLabel: 'Get your delivery as soon as possible',
      date: '20 Oct, 2025',
    },
    {
      id: 3,
      label: 'Schedule',
      subLabel: 'Pick a date when you want to get your delivery',
      date: selectedDate,
      isDropdown: true,
    },
  ];

  const handleSelectMethod = (method: any) => {
    setSelectedMethodId(method.id);
    localStorage.setItem('selectedShipping', JSON.stringify(method));
  };

  const availableDates = ['20 Oct, 2025', '21 Oct, 2025', '22 Oct, 2025'];

  return (
    <div className="w-[1120px] mx-auto flex flex-col gap-6">
      <h2 className="text-xl font-semibold mt-10">Shipping Method</h2>

      <div className="flex flex-col gap-4 relative">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className="flex justify-between items-center border rounded-2xl bg-gray-100 px-6 py-4 w-full relative"
            style={{ height: '72px' }}
          >
            <div className="flex items-center gap-4 w-[973px]">
              <input
                type="radio"
                name="shipping"
                checked={selectedMethodId === method.id}
                onChange={() => handleSelectMethod(method)}
                className="accent-black cursor-pointer"
              />
              <div className="flex items-center gap-3 w-full">
                <span className="font-semibold w-[75px] text-[15px] text-black">
                  {method.label}
                </span>
                <span className="text-gray-600 w-[882px] text-[15px] leading-tight">
                  {method.subLabel}
                </span>
              </div>
            </div>

            <div className="w-[220px] flex items-center justify-end gap-2 relative">
              {method.isDropdown ? (
                <div className="relative inline-flex items-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-end gap-1 font-semibold text-black text-[15px] whitespace-nowrap"
                  >
                    {method.date}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full mt-1 right-0 bg-white border rounded-xl shadow-lg z-10 w-[150px]">
                      {availableDates.map((date) => (
                        <p
                          key={date}
                          onClick={() => handleSelectDate(date)}
                          className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2 text-[14px] text-gray-700"
                        >
                          {date}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-gray-600 text-[15px] whitespace-nowrap">
                  {method.date}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-[210px] h-[64px] text-black hover:bg-red-500"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="w-[208px] h-[64px] bg-black text-white hover:bg-red-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}