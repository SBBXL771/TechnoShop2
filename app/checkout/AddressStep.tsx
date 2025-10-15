'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, X, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Address {
  id: number;
  name: string;
  label: 'Home' | 'Office';
  fullAddress: string;
  phone: string;
}

export default function AddressStep({ onNext }: { onNext: () => void }) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [modalData, setModalData] = useState<Partial<Address> | null>(null);
  const [modalMode, setModalMode] = useState<'edit' | 'add' | null>(null);

  const defaultAddresses: Address[] = [
    {
      id: 1,
      name: 'Home Address',
      label: 'Home',
      fullAddress: '1131 Dusty Townline, Jacksonville, TX 40322',
      phone: '(209) 555-0104',
    },
    {
      id: 2,
      name: 'Office Address',
      label: 'Office',
      fullAddress: '2715 Ash Dr. San Jose, South Dakota 83475',
      phone: '(704) 555-0127',
    },
  ];

  const addressLabels = ['Home', 'Office'];

  useEffect(() => {
    const savedAddresses = localStorage.getItem('addresses');
    const savedSelectedId = localStorage.getItem('selectedAddressId');

    if (savedAddresses) {
      const parsedAddresses: Address[] = JSON.parse(savedAddresses);
      setAddresses(parsedAddresses);
      setSelectedAddressId(
        savedSelectedId
          ? Number(savedSelectedId)
          : parsedAddresses[0]?.id || null,
      );
    } else {
      setAddresses(defaultAddresses);
      setSelectedAddressId(defaultAddresses[0].id);
      localStorage.setItem('addresses', JSON.stringify(defaultAddresses));
      localStorage.setItem('selectedAddressId', String(defaultAddresses[0].id));
    }
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }
    if (selectedAddressId !== null) {
      localStorage.setItem('selectedAddressId', String(selectedAddressId));
    }
  }, [addresses, selectedAddressId]);

  const handleDeleteAddress = (addressId: number) => {
    const updatedAddresses = addresses.filter(
      (address) => address.id !== addressId,
    );
    setAddresses(updatedAddresses);
    if (selectedAddressId === addressId && updatedAddresses.length > 0) {
      setSelectedAddressId(updatedAddresses[0].id);
    } else if (updatedAddresses.length === 0) {
      setSelectedAddressId(null);
    }
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const handleEditAddress = (address: Address) => {
    setModalData(address);
    setModalMode('edit');
  };

  const handleAddAddress = () => {
    setModalData({ name: '', label: 'Home', fullAddress: '', phone: '' });
    setModalMode('add');
  };

  const handleSaveAddress = () => {
    if (!modalData?.name || !modalData?.fullAddress || !modalData?.phone)
      return;

    if (modalMode === 'edit' && modalData.id) {
      setAddresses((previousAddresses) =>
        previousAddresses.map((address) =>
          address.id === modalData.id ? (modalData as Address) : address,
        ),
      );
    } else if (modalMode === 'add') {
      const newAddress = { ...(modalData as Address), id: Date.now() };
      setAddresses((previousAddresses) => [...previousAddresses, newAddress]);
    }
    setModalData(null);
    setModalMode(null);
  };

  const handleCloseModal = () => {
    setModalData(null);
    setModalMode(null);
  };

  return (
    <div className="w-[1120px] mx-auto p-10 flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Select Address</h2>

      {addresses.map((address) => (
        <div
          key={address.id}
          className="flex justify-between bg-gray-100 border rounded-2xl p-6 items-center"
        >
          <div className="flex items-start gap-2">
            <input
              type="radio"
              name="address"
              checked={selectedAddressId === address.id}
              onChange={() => setSelectedAddressId(address.id)}
              className="mt-1 accent-black"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{address.name}</span>
                <span className="bg-black text-white text-xs px-2 py-1 rounded">
                  {address.label}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{address.fullAddress}</p>
              <p className="text-gray-600 text-sm">{address.phone}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Pencil
              className="w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => handleEditAddress(address)}
            />
            <X
              className="w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => handleDeleteAddress(address.id)}
            />
          </div>
        </div>
      ))}

      <div
        className="mt-10 text-center cursor-pointer"
        onClick={handleAddAddress}
      >
        <Plus className="w-6 h-6 text-gray-500 mx-auto" />
        <p className="text-gray-700 font-medium mt-2">Add New Address</p>
      </div>

      <div className="flex justify-between mt-10">
        <Button
          variant="outline"
          onClick={() => router.back()}
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

      {modalData && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-20">
          <div className="bg-white p-8 rounded-2xl w-[480px]">
            <h3 className="text-lg font-semibold mb-4">
              {modalMode === 'edit' ? 'Edit Address' : 'Add Address'}
            </h3>
            <input
              type="text"
              placeholder="Address Name"
              value={modalData.name || ''}
              onChange={(event) =>
                setModalData((previous) => ({
                  ...previous!,
                  name: event.target.value,
                }))
              }
              className="border p-2 rounded-md mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Full Address"
              value={modalData.fullAddress || ''}
              onChange={(event) =>
                setModalData((previous) => ({
                  ...previous!,
                  fullAddress: event.target.value,
                }))
              }
              className="border p-2 rounded-md mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              value={modalData.phone || ''}
              onChange={(event) =>
                setModalData((previous) => ({
                  ...previous!,
                  phone: event.target.value,
                }))
              }
              className="border p-2 rounded-md mb-3 w-full"
            />
            <div className="flex gap-4 mb-4">
              {addressLabels.map((label) => (
                <label key={label} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={modalData.label === label}
                    onChange={() =>
                      setModalData((previous) => ({
                        ...previous!,
                        label: label as 'Home' | 'Office',
                      }))
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveAddress}
                className="bg-black text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
