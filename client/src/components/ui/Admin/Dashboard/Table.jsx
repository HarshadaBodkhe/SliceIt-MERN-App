import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

// Import Components
import Button from '../../Button';

function Table({ data, columns, handleDelete, handleChange }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
        <table className="w-full table-auto border-collapse text-center">
         <thead className="bg-gray-100 h-12 uppercase text-sm font-semibold text-gray-700">
            <tr>
              {columns.map((column) => (
                <th key={column}>
                  {column.replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className="bg-white text-gray-700">
            {data.slice(startIndex, endIndex).map((row) => (
              <tr key={row._id}>
                {columns.map((column) => (
                  <td
                    key={column}
                    className="border border-gray-200 px-4 py-2 text-sm"
                  >
                    {/* Number Of Orders */}
                    {column === 'numberOfOrders' ? (
                      Array.isArray(row.orders) ? row.orders.length : 0
                    ) :

                      /* isApproved Checkbox */
                      column === 'isApproved' ? (
                        <input
                          type="checkbox"
                          checked={row[column] || false}
                          onChange={() => handleChange(row._id)}
                        />
                      ) :

                        /* isVerified Text */
                        column === 'isVerified' ? (
                          row[column] ? 'Verified' : 'Not Verified'
                        ) :

                          /* Status Dropdown */
                          column === 'status' ? (
                            <select
                              className="bg-gray-100 text-gray-700 rounded-md px-3 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                              value={row[column] || 'Received'}
                              onChange={(e) =>
                                handleChange(row._id, e.target.value)
                              }
                            >
                              <option value="Received">Received</option>
                              <option value="In the Kitchen">
                                In the Kitchen
                              </option>
                              <option value="Sent for Delivery">
                                Sent for Delivery
                              </option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          ) :

                            /* Order Items Nested Table */
                            /* Order Items Nested Table */
                            column === 'orderItems' ? (
                              Array.isArray(row[column]) && row[column].length > 0 ? (
                                <table className="w-full table-auto border-collapse text-center bg-gray-50 rounded-md">
                                  <thead>
                                    <tr>
                                      <th>Pizza</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row[column].map((item) => (
                                      <tr key={item._id}>
                                        <td className="border border-gray-200 px-4 py-2 sm:px-2 sm:py-1">
                                          {item.pizza && typeof item.pizza === 'object'
                                            ? item.pizza.name
                                            : 'N/A'}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2 sm:px-2 sm:py-1">
                                          {item.qty ?? 0}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                'No Items'
                              )
                            ) : (
                              row[column] ?? 'N/A'
                            )}
                  </td>
                ))}

                {/* Delete Button */}
                <td className="border border-gray-200">
                  <Button
                    variant="secondary"
                    className="rounded-md"
                    onClick={() => handleDelete(row._id)}
                  >
                    <FaTrash className="text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-6">
          {currentPage > 1 && (
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>
          )}

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          )}
        </div>
      )}
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Table;
