'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Parollar mos kelmayapti');
      return;
    }

    try {
      setError('');
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Xatolik yuz berdi');
        return;
      }

      router.push('/login');
    } catch (err) {
      console.error(err);
      setError('Xatolik yuz berdi');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-8 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />
        <button
          type="submit"
          className="bg-black text-white p-2 rounded-md hover:bg-red-500 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
