import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (productId: number, author: string, rating: number, text: string) => void;
  getProductReviews: (productId: number) => Review[];
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  // Загружаем отзывы из localStorage при старте
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : [];
  });

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId: number, author: string, rating: number, text: string) => {
    const newReview: Review = {
      id: Date.now(), // Уникальный ID на основе времени
      productId,
      author,
      rating,
      text,
      date: new Date().toLocaleDateString('ru-RU'),
    };
    setReviews((prev) => [newReview, ...prev]); // Новые отзывы сверху
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter((r) => r.productId === productId);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getProductReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error('useReviews must be used within ReviewsProvider');
  return context;
};