import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BannerCarousel } from '../components/BannerCarousel';
import { SkeletonCard } from '../components/SkeletonCard';
import { ArrowDownUp } from 'lucide-react'; // <-- Иконка для сортировки

export const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // 1. Добавляем состояние для сортировки
  const [sortOrder, setSortOrder] = useState<string>('default'); 

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  // Эффект для имитации загрузки при смене категории, поиска ИЛИ сортировки
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortOrder]); // <-- Добавили sortOrder в зависимости

  // 2. Логика фильтрации и сортировки
  const filteredAndSortedProducts = products
    .filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery) || 
        p.category.toLowerCase().includes(searchQuery);
        
      const matchesCategory = 
        selectedCategory === 'Все' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price; // Сначала дешевле
      }
      if (sortOrder === 'desc') {
        return b.price - a.price; // Сначала дороже
      }
      return 0; // По умолчанию (как в массиве)
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <BannerCarousel />

      {/* Блок с фильтрами и сортировкой */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        
        {/* Категории */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Выпадающий список сортировки */}
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shrink-0">
          <ArrowDownUp size={18} className="text-gray-500" />
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="default">По умолчанию</option>
            <option value="asc">Сначала дешевле</option>
            <option value="desc">Сначала дороже</option>
          </select>
        </div>
      </div>

      {/* Заголовок */}
      <h2 className="text-2xl font-bold mb-6">
        {searchQuery ? `Результаты поиска: "${searchQuery}"` : 
         selectedCategory !== 'Все' ? `Категория: ${selectedCategory}` : 'Все товары'}
      </h2>
      
      {/* Сетка товаров / Скелетоны */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500 mb-2">По вашему запросу ничего не найдено :(</p>
          <button 
            onClick={() => {
              setSelectedCategory('Все');
              setSortOrder('default');
            }}
            className="text-blue-600 hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};