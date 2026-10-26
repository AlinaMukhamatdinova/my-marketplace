import { ShieldCheck, Truck, CreditCard, HeartHandshake, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  const features = [
    {
      icon: <Truck size={32} className="text-blue-600" />,
      title: 'Быстрая доставка',
      desc: 'Доставляем заказы по всей стране от 1 до 3 дней. Курьер, почта или пункты выдачи.'
    },
    {
      icon: <ShieldCheck size={32} className="text-blue-600" />,
      title: 'Гарантия качества',
      desc: 'Работаем только с проверенными поставщиками. На все товары действует гарантия.'
    },
    {
      icon: <CreditCard size={32} className="text-blue-600" />,
      title: 'Удобная оплата',
      desc: 'Оплачивайте картой, через СБП или при получении. Безопасность транзакций гарантирована.'
    },
    {
      icon: <HeartHandshake size={32} className="text-blue-600" />,
      title: 'Забота о клиентах',
      desc: 'Наша поддержка отвечает 24/7. Поможем с выбором, возвратом или обменом.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8">
        <ArrowLeft size={20} className="mr-2" />
        На главную
      </Link>

      {/* Главный баннер страницы */}
      <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-white mb-12 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Добро пожаловать в МойМаркет!</h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Мы — современный маркетплейс, созданный для того, чтобы делать ваши покупки простыми, 
            быстрыми и приятными. Тысячи товаров, честные цены и забота о каждом клиенте.
          </p>
        </div>
        {/* Декоративные круги на фоне */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-1/3 -translate-x-1/4"></div>
      </div>

      {/* Блок преимуществ */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Почему выбирают нас?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Блок с цифрами (статистика) */}
      <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
            <div className="text-gray-400">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-400">Брендов</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-400">Поддержка</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">1-3</div>
            <div className="text-gray-400">Дня на доставку</div>
          </div>
        </div>
      </div>

    </div>
  );
};