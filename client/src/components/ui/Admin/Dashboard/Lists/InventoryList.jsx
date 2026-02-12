import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import {
  listInventory,
  deleteStockById,
} from '../../../../../redux/asyncThunks/inventoryThunks';

// Import Components
import Loader from '../../../Loader';
import Message from '../../../Message';
import Table from '../Table';

function InventoryList() {
  const inventoryColumns = ['_id', 'item', 'price', 'threshold', 'quantity'];

  const dispatch = useDispatch();

  const inventory = useSelector((state) => state.inventory);
  const {
    loading,
    inventoryList,
    inventoryListError,
    inventoryDeleteByIdError,
    inventoryDeleteByIdSuccess,
  } = inventory;

  const handleDelete = (id) => {
    dispatch(deleteStockById(id)).then(() => dispatch(listInventory({})));
  };

  const handleChange = (id) => {
    console.log(id);
  };

  const successMessageDelete = inventoryDeleteByIdSuccess && {
    status: '200',
    message: 'Inventory Item Deleted Successfully!',
  };

  useEffect(() => {
    if (!inventoryList) {
      dispatch(listInventory({}));
    }
  }, [dispatch, inventoryList]);

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
     <h2 className="text-2xl font-bold text-primary my-4 border-l-4 border-secondary pl-3">
  Inventory Overview
</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          {(inventoryListError || inventoryDeleteByIdError) && (
            <Message>{inventoryListError || inventoryDeleteByIdError}</Message>
          )}
          {successMessageDelete && <Message>{successMessageDelete}</Message>}
          <div className="mt-4">
            {inventoryList ? (
              <>
               <div className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                  <h1 className="text-2xl font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">
                    All Bases
                  </h1>
                  <Table
                    data={inventoryList.bases}
                    columns={inventoryColumns}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
                  />
                </div>
               <div className="mb-8 bg-white p-6 rounded-2xl shadow-md">

                  <h1 className="text-2xl font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">
                    All Cheeses
                  </h1>
                  <Table
                    data={inventoryList.cheeses}
                    columns={inventoryColumns}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
                  />
                </div>
             <div className="mb-8 bg-white p-6 rounded-2xl shadow-md">

                  <h1 className="text-2xl font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">
                    All Sauces
                  </h1>
                  <Table
                    data={inventoryList.sauces}
                    columns={inventoryColumns}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
                  />
                </div>
                <div className="mb-8 bg-white p-6 rounded-2xl shadow-md">

                  <h1 className="text-2xl font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">
                    All Veggies
                  </h1>
                  <Table
                    data={inventoryList.veggies}
                    columns={inventoryColumns}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <h2 className="text-secondary text-lg text-center rounded-lg border-2 border-secondary bg-secondary/10 font-semibold mb-4 p-4">
                No Stock Found..
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default InventoryList;
