import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../components/ProductCard';

export const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">В избранном пока пусто</h2>
        <p className="text-gray-500 mb-8">Нажимайте на сердечко на карточке товара, чтобы сохранить его здесь.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Избранное ({favorites.length})</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(product => (
          // Приводим тип, так как в избранном мы храним базовый Product
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>
    </div>
  );
};