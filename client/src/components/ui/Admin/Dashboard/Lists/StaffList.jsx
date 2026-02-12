import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import Thunks
import {
  deleteAdminUserById,
  listAdminUsers,
} from '../../../../../redux/asyncThunks/adminThunks';

// Import Components
import Loader from '../../../Loader';
import Message from '../../../Message';
import Table from '../Table';

function StaffList() {
  const adminUserColumns = [
    '_id',
    'name',
    'email',
    'role',
    'permissions',
    'isApproved',
  ];

  const dispatch = useDispatch();

  const admin = useSelector((state) => state.admin);
  const {
    loading,
    adminUserList,
    adminUserListError,
    adminUserDeleteByIdError,
    adminUserUpdateProfileByIdError,
    adminUserUpdateProfileByIdSuccess,
    adminUserDeleteByIdSuccess,
  } = admin;

  const handleDelete = (id) => {
    dispatch(deleteAdminUserById(id)).then(() => dispatch(listAdminUsers({})));
  };

  const handleChange = (id) => {
    dispatch(
      listAdminUsers({
        id,
        isApproved: !adminUserList.find((user) => user._id === id).isApproved,
      })
    );
  };

  const successMessageUpdate = adminUserUpdateProfileByIdSuccess && {
    status: '200',
    message: 'User Updated Successfully!',
  };

  const successMessageDelete = adminUserDeleteByIdSuccess && {
    status: '200',
    message: 'User Deleted Successfully!',
  };

  useEffect(() => {
    if (!adminUserList) {
      dispatch(listAdminUsers({}));
    }
  }, [dispatch, adminUserList]);

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-primary my-4 border-l-4 border-secondary pl-3">
        Staff Management
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          {(adminUserListError ||
            adminUserDeleteByIdError ||
            adminUserUpdateProfileByIdError) && (
              <Message>
                {adminUserListError ||
                  adminUserDeleteByIdError ||
                  adminUserUpdateProfileByIdError}
              </Message>
            )}
          {(successMessageDelete || successMessageUpdate) && (
            <Message>
              {successMessageDelete || successMessageUpdate}
            </Message>
          )}

          <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
            {adminUserList.length > 0 ? (
              <Table
                data={adminUserList}
                columns={adminUserColumns}
                handleDelete={handleDelete}
                handleChange={handleChange}
              />
            ) : (
              <h2 className="text-secondary text-lg text-center rounded-lg border-2 border-secondary bg-secondary/10 font-semibold p-4">
                No Staff Found..
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default StaffList;
