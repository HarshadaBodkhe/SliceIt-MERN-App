function FeaturedPizzasSection() {
  const featuredPizzas = [
    {
      id: 1,
      name: 'Pepperoni Feast',
      description: 'Classic pepperoni pizza with extra cheese.',
      price: 199,
      imageUrl: 'https://www.cicis.com/media/gvedawsa/pepperoni-pizza.png',
    },
    {
      id: 2,
      name: 'Margherita Delight',
      description: 'Fresh tomatoes, mozzarella, and basil leaves.',
      price: 249,
      imageUrl: 'https://www.cicis.com/media/5jzgsmbq/supreme-pizza.png',
    },
    {
      id: 3,
      name: 'Veggie Supreme',
      description: 'Loaded with a variety of fresh vegetables.',
      price: 349,
      imageUrl: 'https://www.cicis.com/media/nctfaewb/veggie-pizza.png',
    },
  ];
 return (
  <section
    id="featured-pizzas"
    className="min-h-screen flex flex-col justify-center items-center 
               py-16 px-6 sm:px-12 bg-gray-50"
  >
    <h2 className="text-4xl font-bold text-center text-[#0B3D91] mb-12">
      Chef's Special Picks
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
      {featuredPizzas.map((pizza) => (
        <div
          key={pizza.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden 
                     hover:scale-[1.03] hover:shadow-xl 
                     transition-all duration-300 cursor-pointer"
        >
          <img
            src={pizza.imageUrl}
            alt={pizza.name}
            className="w-full h-52 object-cover"
          />

          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-[#0B3D91]">
                {pizza.name}
              </h3>

              <span className="text-xl font-bold text-[#E31837]">
                ₹{pizza.price}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {pizza.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

}

export default FeaturedPizzasSection;
