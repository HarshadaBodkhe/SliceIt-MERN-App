import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  FaBoxOpen,
  FaCheck,
  FaChevronDown,
  FaChevronRight,
  FaTruck,
  FaUtensils,
} from 'react-icons/fa';

import Button from './Button';

function UserOrdersTable({ orders }) {
  const ordersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate starting and ending indices for the current page
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Received':
        return (
          <FaBoxOpen className="inline-flex items-center justify-center text-green-600" />
        );
      case 'In the Kitchen':
        return (
          <FaUtensils className="inline-flex items-center justify-center text-blue-600" />
        );
      case 'Sent for Delivery':
        return (
          <FaTruck className="inline-flex items-center justify-center text-red-600" />
        );
      case 'Delivered':
        return (
          <FaCheck className="inline-flex items-center justify-center text-green-600" />
        );
      default:
        return (
          <FaBoxOpen className="inline-flex items-center justify-center text-orange-600" />
        );
    }
  };

  return (
    <>
      <div className="overflow-x-auto w-full bg-white shadow-lg rounded-2xl">
        <table className="w-full table-auto border-collapse text-center overflow-hidden">
          <thead className="bg-[#E31837] h-12 uppercase font-semibold text-white tracking-wide">
            <tr>
              <th className="py-3">Pizza</th>
              <th>User Name</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {orders.slice(startIndex, endIndex).map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3">
                  {order.orderItems[0]?.pizza?.name}
                </td>

                <td className="px-4 py-3">
                  {order.user?.name}
                </td>

                <td className="px-4 py-3 font-semibold text-[#0B3D91]">
                  ₹{order.totalPrice}
                </td>

                <td className="px-4 py-3">
                  {getStatusIcon(order.status)}
                </td>

                <td className="px-4 py-3 text-sm text-gray-500">
                  {order.createdAt.substring(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length > ordersPerPage && (
        <div className="flex justify-center items-center my-4 gap-4">
          {currentPage > 1 && (
            <Button
              variant="outline"
              className="rounded-full border-[#E31837] text-[#E31837] hover:bg-[#E31837] hover:text-white transition"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>
          )}

          <span className="font-medium text-gray-700">
            Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}
          </span>

          {currentPage < Math.ceil(orders.length / ordersPerPage) && (
            <Button
              variant="outline"
              className="rounded-full border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white transition"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center my-6 gap-3">
        <span className="bg-[#E31837] text-white px-4 py-2 rounded-full shadow-md flex items-center">
          <FaBoxOpen className="mr-2" />
          Received
        </span>

        <FaChevronRight className="hidden sm:inline-block text-[#0B3D91]" />
        <FaChevronDown className="sm:hidden text-[#0B3D91]" />

        <span className="bg-[#0B3D91] text-white px-4 py-2 rounded-full shadow-md flex items-center">
          <FaUtensils className="mr-2" />
          In the Kitchen
        </span>

        <FaChevronRight className="hidden sm:inline-block text-[#0B3D91]" />
        <FaChevronDown className="sm:hidden text-[#0B3D91]" />

        <span className="bg-[#E31837] text-white px-4 py-2 rounded-full shadow-md flex items-center">
          <FaTruck className="mr-2" />
          Sent for Delivery
        </span>

        <FaChevronRight className="hidden sm:inline-block text-[#0B3D91]" />
        <FaChevronDown className="sm:hidden text-[#0B3D91]" />

        <span className="bg-green-600 text-white px-4 py-2 rounded-full shadow-md flex items-center">
          <FaCheck className="mr-2" />
          Delivered
        </span>
      </div>
    </>
  );

}

UserOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default UserOrdersTable;
