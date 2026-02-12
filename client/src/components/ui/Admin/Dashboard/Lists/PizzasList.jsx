import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import {
  deletePizzaById,
  listPizzas,
} from '../../../../../redux/asyncThunks/pizzaThunks';

// Import Components
import Loader from '../../../Loader';
import Message from '../../../Message';
import Table from '../Table';

function PizzasList() {
  const pizzaColumns = ['_id', 'name', 'price', 'size'];

  const dispatch = useDispatch();

  const pizza = useSelector((state) => state.pizza);
  const {
    loading,
    pizzaList,
    pizzaListError,
    pizzaDeleteByIdError,
    pizzaDeleteByIdSuccess,
  } = pizza;

  const handleDelete = (id) => {
    dispatch(deletePizzaById(id)).then(() => dispatch(listPizzas({})));
  };

  const successMessageDelete = pizzaDeleteByIdSuccess && {
    status: '200',
    message: 'pizza Deleted Successfully!',
  };

  const PizzaByAdmin = pizzaList.filter((pizza) => pizza.createdBy === 'admin');
  const customPizzas = pizzaList.filter((pizza) => pizza.createdBy === 'user');

  useEffect(() => {
    if (!pizzaList) {
      dispatch(listPizzas({}));
    }
  }, [dispatch, pizzaList]);

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-primary my-4 border-l-4 border-secondary pl-3">
  Pizza Management
</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          {(pizzaListError || pizzaDeleteByIdError) && (
            <Message>{pizzaListError || pizzaDeleteByIdError}</Message>
          )}
          {successMessageDelete && <Message>{successMessageDelete}</Message>}
          <div className="mt-6 space-y-8">
            {pizzaList.length > 0 ? (
              <>
                {PizzaByAdmin.length > 0 ? (
                  <div className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                    <h1 className="text-2xl font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">
                      Pizzas By Admin
                    </h1>
                    <Table
                      data={PizzaByAdmin}
                      columns={pizzaColumns}
                      handleDelete={handleDelete}
                    />
                  </div>
                ) : (
                  <h2 className="text-secondary text-lg text-center rounded-lg border-2 border-secondary bg-secondary/10 font-semibold mb-4 p-4">
                    No Pizzas Created By Admin Found..
                  </h2>
                )}
                {customPizzas.length > 0 ? (
                  <div className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                    <h1 className="text-2xl font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">
                      Custom Pizzas
                    </h1>
                    <Table
                      data={customPizzas}
                      columns={pizzaColumns}
                      handleDelete={handleDelete}
                    />
                  </div>
                ) : (
                  <h2 className="text-secondary text-lg text-center rounded-lg border-2 border-secondary bg-secondary/10 font-semibold mb-4 p-4">
                    No Custom Pizzas Found..
                  </h2>
                )}
              </>
            ) : (
              <h2 className="text-secondary text-lg text-center rounded-lg border-2 border-secondary bg-secondary/10 font-semibold mb-4 p-4">
                No Pizzas Found..
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PizzasList;
