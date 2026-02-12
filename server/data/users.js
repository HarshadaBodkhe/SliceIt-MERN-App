const bcrypt = require('bcryptjs');

const admins = [
  {
    name: 'Admin',
    email: 'hbodkhe76@gmail.com',
    password: bcrypt.hashSync('Admin1234', 10),
    role: 'admin',
    permissions: ['admin'],
    isApproved: true,
  },
];


const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '123-456-7890',
    address: '123 Main St, City',
    orders: [],
    isVerified: true,
    verificationCode: '123456',
    resetPasswordToken: null,
    resetPasswordExpire: null,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    phoneNumber: '123-456-7890',
    address: '123 Main St, City',
    orders: [],
    isVerified: true,
    verificationCode: '098765',
    resetPasswordToken: null,
    resetPasswordExpire: null,
  },
];

module.exports = { admins, users };
