import PropTypes from 'prop-types';

function InventoryTable({ title, items }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 overflow-x-auto">
     <h2 className="text-lg font-semibold text-primary mb-3">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h2>
      <table className="w-full table-auto border-collapse text-sm text-center">
        <thead  className="bg-primary text-white uppercase text-xs font-semibold tracking-wide">

          <tr>
            <th>Stock Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
      <tbody className="bg-white text-gray-700">
          {(items || []).map((item) => (
            <tr key={item._id}>
              <td className="border-b border-gray-200 px-4 py-2">
                {item.item}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

InventoryTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InventoryTable;
