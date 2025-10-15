'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Confetti from 'react-confetti';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
}

interface Address {
  id: number;
  name: string;
  label: 'Home' | 'Office';
  fullAddress: string;
  phone: string;
}

interface Shipping {
  id: number;
  label: string;
  subLabel: string;
  date: string;
}

export default function PaymentStep({ onBack }: any) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<Shipping | null>(
    null,
  );
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    const parts = digits.match(/.{1,4}/g);
    return parts ? parts.join(' ') : '';
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Invalid cart data in localStorage');
      }
    }

    const savedAddresses = localStorage.getItem('addresses');
    const selectedAddressId = localStorage.getItem('selectedAddressId');
    if (savedAddresses && selectedAddressId) {
      try {
        const parsedAddresses: Address[] = JSON.parse(savedAddresses);
        const foundAddress = parsedAddresses.find(
          (address) => address.id === Number(selectedAddressId),
        );
        if (foundAddress) setSelectedAddress(foundAddress);
      } catch (error) {
        console.error('Invalid address data in localStorage');
      }
    }

    const savedShipping = localStorage.getItem('selectedShipping');
    if (savedShipping) {
      try {
        setSelectedShipping(JSON.parse(savedShipping));
      } catch (error) {
        console.error('Invalid shipping data in localStorage');
      }
    }
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05;
  const shippingCost = subtotal > 0 ? 15 : 0;
  const total = subtotal + tax + shippingCost;

  const paymentMethods = ['credit', 'paypal', 'paypalCredit'];

  const handlePayment = () => {
    setShowConfetti(true);
    setShowSuccessModal(true);
    setTimeout(() => setShowConfetti(false), 8000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={1000} />}

      {showSuccessModal && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer"
        >
          <div
            className="bg-white rounded-2xl p-8 text-center shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-2">
              Buyurtma muvaffaqiyatli tasdiqlandi!
            </h2>
            <p className="text-gray-600">
              Rahmat! Sizning buyurtmangiz qabul qilindi.
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      <div className="w-[1120px] bg-white rounded-2xl shadow-sm p-10 flex gap-10">
        <div className="w-[512px] flex flex-col">
          <h2 className="text-[16px] font-semibold mb-4">Summary</h2>
          <br />
          <div className="w-[464px] flex flex-col gap-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-[464px] h-[72px] bg-gray-50 rounded-lg flex items-center justify-between p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.thumbnail || '/placeholder.png'}
                      alt={item.title}
                      className="w-[40px] h-[40px] rounded object-cover"
                    />
                    <span className="text-[14px] w-[319px] line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                  <span className="w-[50px] text-right font-semibold text-[14px]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No items in cart.</p>
            )}
          </div>
          <br />
          <div className="mt-4">
            <h3 className="text-[14px] font-semibold text-black">Address</h3>
            {selectedAddress ? (
              <div className="mt-1 text-[14px]">
                <p>{selectedAddress.fullAddress}</p>
                <p className="text-gray-600">{selectedAddress.phone}</p>
              </div>
            ) : (
              <p className="text-[14px] text-gray-500">No address selected</p>
            )}
          </div>
          <br />
          <div className="mt-2">
            <h3 className="text-[14px] font-semibold text-black">
              Shipment method
            </h3>
            {selectedShipping ? (
              <div className="mt-1 text-[14px]">
                <p>{selectedShipping.label}</p>
                <p className="text-gray-600 text-sm">
                  {selectedShipping.subLabel}
                </p>
                <p className="text-gray-600 text-sm">{selectedShipping.date}</p>
              </div>
            ) : (
              <p className="text-[14px] text-gray-500">No shipping selected</p>
            )}
          </div>
          <br />
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Estimated shipping & Handling</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="w-[512px] flex flex-col">
          <h2 className="text-[16px] font-semibold mb-3">Payment</h2>

          <div className="flex gap-6 border-b mb-4 text-sm">
            {paymentMethods.map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`pb-1 ${
                  paymentMethod === method
                    ? 'border-b-2 border-black font-medium'
                    : 'text-gray-500'
                }`}
              >
                {method === 'credit'
                  ? 'Credit Card'
                  : method === 'paypal'
                    ? 'PayPal'
                    : 'PayPal Credit'}
              </button>
            ))}
          </div>

          {paymentMethod === 'credit' && (
            <div className="flex flex-col gap-4 mt-4">
              <div className="relative w-[337px] h-[190px] rounded-xl overflow-hidden">
                <Image
                  src="/images/card.png"
                  alt="Credit Card"
                  width={337}
                  height={190}
                  className="w-full h-full object-cover"
                />
              </div>

              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-[480px] h-[48px] border rounded px-3 text-sm"
              />

              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(formatCardNumber(event.target.value))
                }
                className="w-[480px] h-[48px] border rounded px-3 text-sm"
                inputMode="numeric"
                maxLength={19}
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Exp. Date"
                  value={expiryDate}
                  onChange={(event) =>
                    setExpiryDate(formatExpiryDate(event.target.value))
                  }
                  className="w-[248px] h-[48px] border rounded px-3 text-sm"
                  inputMode="numeric"
                  maxLength={5}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(event) =>
                    setCvv(event.target.value.replace(/\D/g, '').slice(0, 3))
                  }
                  className="w-[248px] h-[48px] border rounded px-3 text-sm"
                  inputMode="numeric"
                  maxLength={3}
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <input type="checkbox" className="w-[16px] h-[16px]" />
                Same as billing address
              </label>

              <div className="flex justify-between mt-6">
                <button
                  onClick={onBack}
                  className="w-[244.5px] h-[64px] border rounded text-black hover:bg-red-500"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  className="w-[244.5px] h-[64px] bg-black text-white rounded hover:bg-gray-800"
                >
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
