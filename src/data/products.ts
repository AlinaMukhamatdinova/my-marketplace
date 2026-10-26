import type { Product } from '../types';

export interface ProductWithDetails extends Product {
  description: string;
  reviews: { id: number; author: string; rating: number; text: string }[];
}

export const products: ProductWithDetails[] = [
  { 
    id: 1, 
    title: "Смартфон Apple iPhone 15", 
    price: 79990, 
    image: "/iPhone15.jpg", // <-- Убрали точку
    category: "Электроника",
    description: "Смартфон Apple iPhone 15 с ярким дисплеем Super Retina XDR и инновационной камерой 48 Мп. Работает на чипе A16 Bionic.",
    reviews: [
      { id: 1, author: "Алексей", rating: 5, text: "Отличный телефон, камера супер!" },
      { id: 2, author: "Мария", rating: 4, text: "Хороший, но батарея могла бы быть лучше." }
    ]
  },
  { 
    id: 2, 
    title: "Наушники Sony", 
    price: 29990, 
    image: "/Sony.jpg", 
    category: "Электроника",
    description: "Беспроводные наушники с активным шумоподавлением. Идеальны для путешествий и работы.",
    reviews: [
      { id: 1, author: "Иван", rating: 5, text: "Лучшее шумоподавление, которое я слышал." }
    ]
  },
  { 
    id: 3, 
    title: "Футболка хлопковая базовая", 
    price: 1500, 
    image: "/shirt.jpg", 
    category: "Одежда",
    description: "100% хлопок, идеально сидит по фигуре. Подходит для повседневной носки.",
    reviews: [
      { id: 1, author: "Елена", rating: 5, text: "Мягкая и приятная к телу ткань." }
    ]
  },
  { 
    id: 4, 
    title: "Джинсы классические синие", 
    price: 4500, 
    image: "/jeans.jpg", 
    category: "Одежда",
    description: "Классический крой, плотный деним. Не теряют форму после множества стирок.",
    reviews: [
      { id: 1, author: "Дмитрий", rating: 4, text: "Хорошие джинсы, но немного длинноваты." }
    ]
  },
  { 
    id: 5, 
    title: "Кофеварка рожковая", 
    price: 12000, 
    image: "/coffemachine.jpg", 
    category: "Бытовая техника",
    description: "Позволяет приготовить идеальный эспрессо дома. Мощность 1350 Вт, давление 15 бар.",
    reviews: []
  },
  { 
    id: 6, 
    title: "Пылесос робот Xiaomi", 
    price: 25000, 
    image: "/robot.jpg", 
    category: "Бытовая техника",
    description: "Умный робот-пылесос с влажной уборкой и построением карты помещения.",
    reviews: [
      { id: 1, author: "Ольга", rating: 5, text: "Теперь могу забыть о пыли на полу!" }
    ]
  },
  { 
    id: 7, 
    title: "Книга 'Чистый код'", 
    price: 2000, 
    image: "/book.jpg", 
    category: "Книги",
    description: "Классика программирования от Роберта Мартина. Обязательна к прочтению каждому разработчику.",
    reviews: [
      { id: 1, author: "Сергей", rating: 5, text: "Изменила мой взгляд на написание кода." }
    ]
  },
  { 
    id: 8, 
    title: "Кроссовки беговые", 
    price: 8500, 
    image: "/boots.jpg", 
    category: "Обувь",
    description: "Легкие беговые кроссовки с амортизацией. Для профессионального и любительского спорта.",
    reviews: []
  },
];