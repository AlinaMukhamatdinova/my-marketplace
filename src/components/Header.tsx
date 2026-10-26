import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut, Heart } from 'lucide-react'; // <-- Добавили Heart
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext'; // <-- Импорт
import { useState } from 'react';
import { LoginModal } from './LoginModal';

export const Header = () => {
  const { cartItems } = useCart();
  const { favorites } = useFavorites(); // <-- Достаем избранное
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 md:gap-6">
          <Link to="/" className="text-2xl font-bold text-blue-600 shrink-0">
            МойМаркет
          </Link>
          
           <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium hidden md:block">
              О нас
            </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Искать товары..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
              <Search size={20} />
            </button>
          </form>

          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            {/* Блок авторизации */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 hidden lg:block">Привет, {user}!</span>
                <button 
                  onClick={logout}
                  className="flex flex-col items-center text-gray-600 hover:text-red-500"
                  title="Выйти"
                >
                  <LogOut size={24} />
                  <span className="text-xs mt-1 hidden md:block">Выйти</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600"
              >
                <User size={24} />
                <span className="text-xs mt-1 hidden md:block">Войти</span>
              </button>
            )}

            {/* Иконка Избранного */}
            <Link to="/favorites" className="flex flex-col items-center text-gray-600 hover:text-red-500 relative">
              <Heart size={24} />
              <span className="text-xs mt-1 hidden md:block">Избранное</span>
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {totalFavorites}
                </span>
              )}
            </Link>
            
            {/* Иконка Корзины */}
            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600 relative">
              <ShoppingCart size={24} />
              <span className="text-xs mt-1 hidden md:block">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
};