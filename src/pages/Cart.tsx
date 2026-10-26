import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react'; // <-- Добавили иконки

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ваша корзина пуста</h2>
        <p className="text-gray-500 mb-8">Добавьте товары из каталога, чтобы они появились здесь.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Корзина</h2>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-6 last:border-b-0 gap-4">
            
            {/* Левая часть: картинка и название */}
            <div className="flex items-center gap-4 flex-1">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg bg-gray-50" />
              <div>
                <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.price} ₽ / шт.</p>
              </div>
            </div>
            
            {/* Правая часть: количество, сумма, удаление */}
            <div className="flex items-center justify-between sm:justify-end gap-6">
              
              {/* Кнопки +/- */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600"
                >
                  <Minus size={18} />
                </button>
                <span className="font-semibold min-w-[20px] text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Итоговая сумма за этот товар */}
              <span className="font-bold text-xl min-w-[100px] text-right">
                {item.price * item.quantity} ₽
              </span>

              {/* Кнопка удаления */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-600 p-2 transition-colors"
                title="Удалить товар"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-end">
        <div className="text-2xl mb-4">
          Итого: <span className="font-bold">{totalPrice} ₽</span>
        </div>
        <button 
          onClick={() => {
            alert('Заказ успешно оформлен! Спасибо за покупку.');
            clearCart();
          }}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};