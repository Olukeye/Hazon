const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, createJWT } = require("../utils");



const register = async (req, res) => {
    const { 
      firstname,
      lastname,
      password,
      email,
    } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists");
    }

    if (req.body.role === "admin") {
      delete req.body.role;
    }

    const user = new User({
      email,
      firstname,
      lastname,
      password,
    })

    const tokenUser = createTokenUser(user);
    
    await user.save();


    res.status(StatusCodes.CREATED).json({ user: tokenUser});
  
};


const login = async (req, res ) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser });

  return res.status(StatusCodes.OK).json({ user: tokenUser, token });

};


const logout = async(req, res) => {
  try {
      await  await req.session == null;
  } catch (err) {
      console.error('Error logging out:', err);
      return next(new Error('Error logging out'));
  }

  return res.redirect("/login");
}


module.exports = {
  register,
  login,
  logout
};
