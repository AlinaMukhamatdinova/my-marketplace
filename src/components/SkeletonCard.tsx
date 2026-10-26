export const SkeletonCard = () => {
  return (
    <div className="border rounded-xl p-4 flex flex-col justify-between bg-white h-[350px]">
      <div>
        {/* Заглушка для картинки */}
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
        
        {/* Заглушка для заголовка */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        
        {/* Заглушка для категории */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        {/* Заглушка для цены */}
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        
        {/* Заглушка для кнопки */}
        <div className="h-10 bg-gray-200 rounded-lg w-10 sm:w-28 animate-pulse"></div>
      </div>
    </div>
  );
};