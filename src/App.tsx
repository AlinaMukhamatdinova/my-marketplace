import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Product } from './pages/Product';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About'; // <-- Импорт

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} /> {/* <-- Маршрут */}
      </Routes>
    </div>
  );
}

export default App;