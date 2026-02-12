import { BsChevronDoubleDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import BGImage from '/images/pizza-main.png';

function Jumbotron() {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${BGImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-16 text-white relative pt-24"
    >
      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
        <span className="text-white">Fresh.</span>{' '}
        <span className="text-red-600">Hot.</span>{' '}
        <span className="text-blue-500">Delivered Fast.</span>
      </h1>

      {/* Subtext */}
      <p className="text-lg sm:text-xl mb-10 text-gray-200 max-w-2xl">
        Experience the taste of perfection, straight from our oven to your door.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/menu"
          className="bg-red-600 hover:bg-blue-800 transition duration-300 text-white font-semibold px-8 py-3 rounded-full shadow-xl"
        >
          Explore Menu
        </Link>

        <Link
          to="/custom-pizza"
          className="border border-white hover:bg-white hover:text-black transition duration-300 px-8 py-3 rounded-full"
        >
          Build Your Own
        </Link>
      </div>

      {/* Scroll Icon */}
      <ScrollLink
        to="featured-pizzas"
        smooth={true}
        duration={1000}
        className="absolute bottom-10 hover:text-red-600 transition duration-200 cursor-pointer"
      >
        <BsChevronDoubleDown className="text-4xl animate-bounce" />
      </ScrollLink>
    </section>
  );
}

export default Jumbotron;
