const User = require('../models/User');

exports.signupService = async (userInfo) => await User.create(userInfo);

exports.findUserByEmail = async (email) => await User.findOne({ email });
