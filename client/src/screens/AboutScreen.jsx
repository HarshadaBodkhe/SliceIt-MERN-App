import React from 'react';
import Logo from '/android-chrome-512x512.png';

function AboutScreen() {
return (
  <section className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10 px-10 sm:px-16 bg-white">
    
    <div className="flex flex-row justify-center items-center">
      <img
        src={Logo}
        alt="SliceIt Logo"
        className="hidden sm:block h-32 w-32"
      />
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mt-4">
        <span className="text-red-600">About</span>
        <br />
        <span className="text-blue-900">SliceIt</span>
      </h1>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 max-w-3xl w-full mt-10 hover:scale-[1.01] transition-all duration-300">
      
      <article className="mb-6">
        <h2 className="text-2xl text-red-600 font-semibold mb-2">
          Introduction
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          SliceIt is a pizza ordering app that allows you to create your
          own custom pizza. You can choose from a variety of toppings and
          sauces to create your dream pizza. You can also choose from a
          selection of pre-made pizzas.
        </p>
      </article>

      <article className="mb-6">
        <h2 className="text-2xl text-red-600 font-semibold mb-2">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our mission is to provide you with the best pizza ordering
          experience. We want to make it easy for you to order your favorite
          pizza. We also want to make it easy for you to create your own
          custom pizza.
        </p>
      </article>

      <article>
        <h2 className="text-2xl text-red-600 font-semibold mb-2">
          Contact Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          If you have any questions or concerns, please contact us at{" "}
          <a
            href="mailto:contact@sliceit.com"
            className="text-blue-900 font-medium hover:text-red-600 transition duration-200"
          >
            contact@sliceit.com
          </a>
        </p>
      </article>

    </div>
  </section>
);

}

export default AboutScreen;
