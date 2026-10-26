import type { ProductWithDetails } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext'; // <-- Импорт
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }: { product: ProductWithDetails }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast(); // <-- Достаем функцию
  
  const isFav = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Товар добавлен в корзину!'); // <-- Показываем уведомление
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
    if (!isFav) {
      showToast('Товар добавлен в избранное!'); // <-- Показываем уведомление
    } else {
      showToast('Товар удален из избранного'); // <-- Показываем уведомление
    }
  };

  return (
    <div className="border rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition-shadow bg-white relative group">
      
      <button 
        onClick={handleToggleFavorite}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
          isFav ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'
        }`}
      >
        <Heart size={20} fill={isFav ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${product.id}`} className="block cursor-pointer">
        <div className="overflow-hidden rounded-lg mb-4 h-48 bg-gray-50 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{product.category}</p>
      </Link>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold">{product.price} ₽</span>
        <button 
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <ShoppingCart size={20} />
          <span className="hidden sm:inline">В корзину</span>
        </button>
      </div>
    </div>
  );
};