import { useState, useEffect } from 'react';
import { BusinessName } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<BusinessName[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nameforge_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const toggleFavorite = (name: BusinessName) => {
    setFavorites((prev) => {
      const isFav = prev.some((f) => f.name === name.name);
      let next;
      if (isFav) {
        next = prev.filter((f) => f.name !== name.name);
      } else {
        next = [...prev, name];
      }
      localStorage.setItem('nameforge_favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (name: string) => {
    return favorites.some((f) => f.name === name);
  };

  return { favorites, toggleFavorite, isFavorite };
};
