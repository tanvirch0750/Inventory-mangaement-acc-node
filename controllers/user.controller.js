const { signupService, findUserByEmail } = require('../services/user.services');
const { generteToken } = require('../utils/token');

exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Successfully registered the user',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: 'fail',
        error: 'Please provide email and password',
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        error: 'No user found with this email',
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: 'fail',
        error: 'Email or password is not valid',
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        status: 'fail',
        error: 'Your account is not active yet',
      });
    }

    const token = generteToken(user);

    const { password: pass, ...others } = user.toObject();

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in',
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};
