import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewsContext';
import { useToast } from '../context/ToastContext';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard'; // <-- Импорт карточки

export const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addReview, getProductReviews } = useReviews();
  const { showToast } = useToast();

  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const product = products.find(p => p.id === Number(id));
  const productReviews = product ? getProductReviews(product.id) : [];

  // Логика поиска похожих товаров (та же категория, кроме текущего)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
        <Link to="/" className="text-blue-600 hover:underline">Вернуться в каталог</Link>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (text.trim().length < 3) return alert('Отзыв слишком короткий');

    addReview(product.id, user, rating, text);
    setText('');
    setRating(5);
    showToast('Спасибо за ваш отзыв!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Назад в каталог
      </Link>

      {/* Верхний блок с товаром */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
          <img src={product.image} alt={product.title} className="max-h-[400px] object-contain" />
        </div>

        <div className="flex flex-col">
          <span className="text-blue-600 font-medium mb-2">{product.category}</span>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className={star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
            ))}
            <span className="text-gray-500 text-sm ml-2">({productReviews.length} отзывов)</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6">{product.price} ₽</div>

          <button 
            onClick={() => {
              addToCart(product);
              showToast('Товар добавлен в корзину!');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors w-full sm:w-auto mb-8"
          >
            <ShoppingCart size={24} />
            Добавить в корзину
          </button>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Описание</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Блок с отзывами */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-10 mb-12">
        <h3 className="text-2xl font-bold mb-6">Отзывы ({productReviews.length})</h3>

        {user ? (
          <form onSubmit={handleSubmitReview} className="mb-8 bg-gray-50 p-6 rounded-xl border">
            <h4 className="font-semibold mb-4">Оставить отзыв</h4>
            
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    size={28} 
                    className={star <= (hoveredStar || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  />
                </button>
              ))}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Поделитесь впечатлениями о товаре..."
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-500 min-h-[100px]"
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Отправить отзыв
            </button>
          </form>
        ) : (
          <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
            <p className="text-gray-700 mb-2">Хотите оставить отзыв?</p>
            <p className="font-semibold text-blue-800">Пожалуйста, войдите в аккаунт, чтобы написать отзыв.</p>
          </div>
        )}

        {productReviews.length === 0 ? (
          <p className="text-gray-500 italic text-center py-4">Пока нет отзывов. Будьте первым!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {productReviews.map(review => (
              <div key={review.id} className="bg-gray-50 p-5 rounded-xl border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{review.author}</span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Блок похожих товаров */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-6">Похожие товары</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct as any} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};