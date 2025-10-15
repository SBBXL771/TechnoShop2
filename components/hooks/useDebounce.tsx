'use client';

import { useEffect, useState } from "react";

export const useDebounce = (query: string, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(query);

    useEffect(() => {
        const handleTime = setTimeout(() => {
            setDebouncedValue(query);
        }, delay);

        return () => clearTimeout(handleTime);
    }, [query, delay]);

    return debouncedValue;
}
