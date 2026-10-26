import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Летняя распродажа',
    subtitle: 'Скидки до 50% на все категории товаров',
    bgImage: '/banner1.jpg', // <-- Название твоей первой картинки в папке public
  },
  {
    id: 2,
    title: 'Новинки электроники',
    subtitle: 'Смартфоны и наушники по лучшим ценам',
    bgImage: '/banner2.jpg', // <-- Второй картинки
  },
  {
    id: 3,
    title: 'Уютный дом',
    subtitle: 'Бытовая техника и товары для комфорта',
    bgImage: '/banner3.jpg', // <-- Третьей картинки
  },
];

export const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer); 
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-8 group h-[250px] md:h-[350px]">
      {/* Контейнер со слайдами */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="w-full shrink-0 h-full relative flex flex-col justify-center px-8 md:px-16"
          >
            {/* Слой с картинкой и затемнением */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Затемнение (черный градиент), чтобы белый текст было хорошо видно на любой картинке */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            </div>

            {/* Текст поверх картинки */}
            <div className="relative z-10 text-white max-w-xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
              <p className="text-lg md:text-xl opacity-90 drop-shadow-md">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronRight size={32} />
      </button>

      {/* Точки-индикаторы */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};