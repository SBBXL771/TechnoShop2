// "use client";

// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// export interface CartItem {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: number) => void;
//   increaseQuantity: (id: number) => void;
//   decreaseQuantity: (id: number) => void;
//   totalPrice: number;
//   discount: number;
//   applyPromo: (code: string) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [discount, setDiscount] = useState(0);

//   useEffect(() => {
//     const saved = localStorage.getItem("cartItems");
//     if (saved) setItems(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(items));
//     const event = new CustomEvent("cart-updated", { detail: items.length });
//     window.dispatchEvent(event);
//   }, [items]);

//   const addToCart = (item: CartItem) => {
//     setItems((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const increaseQuantity = (id: number) => {
//     setItems((prev) =>
//       prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
//     );
//   };

//   const decreaseQuantity = (id: number) => {
//     setItems((prev) =>
//       prev.map((i) =>
//         i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
//       )
//     );
//   };

//   const applyPromo = (code: string) => {
//     if (code === "DISCOUNT10") setDiscount(10);
//     else setDiscount(0);
//   };

//   const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         totalPrice,
//         discount,
//         applyPromo,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
