import axios from 'axios';
import React from 'react';

interface Props {
  params: {
    query: string;
  };
}

const SearchPage = async ({ params }: Props) => {
  try {
    const { query } = params;

    const result = await axios.get(
      `https://dummyjson.com/products/search?q=${query}`,
    );

    return (
      <div className="mt-8">
        <h1 className="text-3xl font-semibold mb-4">Qidiruv: {query}</h1>
      </div>
    );
  } catch (error) {
    return <div>Serverda xatolik yuz berdi!</div>;
  }
};

export default SearchPage;
