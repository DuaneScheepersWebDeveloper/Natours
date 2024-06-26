//----------------------------------------------------------------

const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');
//Users
exports.getAllUsers =catchAsync(async  (req, res) => {
const users =await User.find();
res.status(200).json({
  status:'sucess',
  results:users.length,
  data:{users}
})
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
