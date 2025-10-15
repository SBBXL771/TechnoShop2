'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  thumbnail?: string;
}

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validItems = parsed.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
          thumbnail: item.thumbnail || '/placeholder.png',
        }));
        setCart(validItems);
      } catch (e) {
        console.error('Invalid cartItems in localStorage');
        setCart([]);
      }
    }
  }, []);

  const saveCartAndDispatch = (newCart: CartItem[]) => {
    localStorage.setItem('cartItems', JSON.stringify(newCart));

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('cart-updated', { detail: newCart.length }),
      );
    }, 0);
  };

  const updateQuantity = (id: number, type: 'inc' | 'dec') => {
    setCart((prev) => {
      const newCart = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'inc'
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item,
      );
      saveCartAndDispatch(newCart);
      return newCart;
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      saveCartAndDispatch(newCart);
      return newCart;
    });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05;
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + tax + shipping - discount;

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();

    if (code === 'SALE10') {
      setDiscount(subtotal * 0.1);
    } else if (code === 'SALE20') {
      setDiscount(subtotal * 0.2);
    } else if (code === 'SALE30') {
      setDiscount(subtotal * 0.3);
    } else {
      setDiscount(0);
      alert('Notogri promo kod');
    }
  };

  return (
    <div className="w-full min-h-[880px] mx-auto flex gap-10 p-10 bg-white">
      <div className="w-[900px] bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-2xl p-4 w-[836px] h-[138px] bg-gray-100"
              >
                <Image
                  src={item.thumbnail || '/placeholder.png'}
                  alt={item.title}
                  width={90}
                  height={90}
                  className="rounded-md object-cover"
                />

                <div className="w-[191px] h-[80px] flex flex-col justify-center">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 w-[104px] h-[32px]">
                  <Button
                    onClick={() => updateQuantity(item.id, 'dec')}
                    className="w-8 h-8 text-lg"
                    variant="outline"
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => updateQuantity(item.id, 'inc')}
                    className="w-8 h-8 text-lg"
                    variant="outline"
                  >
                    +
                  </Button>
                </div>

                <div className="w-[64px] text-right font-bold">
                  ${item.price.toFixed(2)}
                </div>

                <button onClick={() => removeItem(item.id)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-[880px] h-[700px] bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
          <br />
          <br />

          <label className="text-sm font-medium mb-2 block">
            Discount code / Promo code
          </label>
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Code"
            className="w-full h-[56px] border rounded-md px-4 mb-4"
          />

          <label className="text-sm font-medium mb-2 block">
            Your bonus card number
          </label>
          <div className="flex gap-2 mb-6">
            <input
              placeholder="1234 5678 9012 3456"
              className="w-full h-[56px] border rounded-md px-4"
              maxLength={19}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 16) value = value.slice(0, 16);
                const formatted = value.replace(/(.{4})/g, '$1 ').trim();
                e.target.value = formatted;
              }}
            />

            <Button onClick={applyPromo} className="w-[76px] h-[56px]">
              Apply
            </Button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Handling</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Promo Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Link href="/checkout">
          <Button className="w-full h-[56px] mt-6 bg-black text-white hover:bg-red-500">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
