import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import {
  deleteUserById,
  listUsers,
} from '../../../../../redux/asyncThunks/userThunks';

// Import Components
import Loader from '../../../Loader';
import Message from '../../../Message';
import Table from '../Table';

function UsersList() {
  const userColumns = ['_id', 'name', 'email', 'numberOfOrders', 'isVerified'];

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const {
    loading,
    userList,
    userListError,
    userDeleteByIdError,
    userDeleteByIdSuccess,
  } = user;

  const handleDelete = (id) => {
    dispatch(deleteUserById(id)).then(() => dispatch(listUsers({})));
  };

  const successMessageDelete = userDeleteByIdSuccess && {
    status: '200',
    message: 'User Deleted Successfully!',
  };

  useEffect(() => {
    if (!userList) {
      dispatch(listUsers({}));
    }
  }, [dispatch, userList]);

  return (
   <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-primary my-4 border-l-4 border-secondary pl-3">
  User Management
</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          {(userListError || userDeleteByIdError) && (
            <Message>{userListError || userDeleteByIdError}</Message>
          )}
          {successMessageDelete && <Message>{successMessageDelete}</Message>}
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
            {userList.length > 0 ? (
              <Table
                data={userList}
                columns={userColumns}
                handleDelete={handleDelete}
              />
            ) : (
              <h2 className="text-secondary text-lg text-center rounded-lg border-2 border-secondary bg-secondary/10 font-semibold p-4">
                No Users Found..
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersList;
