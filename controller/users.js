//package import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../util/database");

const { required } = require("joi");
//local import
const Users = require("../model/users");
const { registerValidation, loginValidation } = require("../validation");
const auth = require("../auth/index");

exports.getUsers = async (req, res) => {
  const user = await Users.findAll();
  return res.status(201).json({
    user,
  });
};

//register
exports.register = async (req, res) => {
  //validate data before accepting data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ result: error.details[0].message });

  // validate existing email
  const emailExist = await Users.findOne({
    where: { email: req.body.email.toLowerCase() },
  });
  if (emailExist)
    return res
      .status(400)
      .json({ result: "Email already exists", success: false });
  // validate existing email
  const usernameExist = await Users.findOne({
    where: { user_name: req.body.user_name.toLowerCase() },
  });
  if (usernameExist)
    return res
      .status(400)
      .json({ result: "Username already exists", success: false });
  // validate existing email
  const phoneExist = await Users.findOne({
    where: { phone: req.body.phone.toLowerCase() },
  });
  if (phoneExist)
    return res
      .status(400)
      .json({ result: "Phone already exists", success: false });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await Users.create({
    first_name: req.body.first_name.toLowerCase(),
    last_name: req.body.last_name.toLowerCase(),
    user_name: req.body.user_name,
    user_type: req.body.user_type,
    phone: req.body.phone,
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });
  try {
    res.status(200).json({ result: "Registration Successful", success: true });
  } catch (err) {
    res.status(400).json({ result: err });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //validate data before accepting data
    const { error } = loginValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ res: error.details[0].message, success: false });

    //validate email
    const user = await Users.findOne({
      where: { email: req.body.email.toLowerCase() },
    });
    if (!user)
      return res
        .status(400)
        .json({ res: "Invalid Email or Passowrd", success: false });

    //password checking
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res
        .status(400)
        .json({ res: "Invalid Email or Passowrd", success: false });

    //token assignment
    const token = jwt.sign(
      {
        email: user.email,
        phone: user.phone,
        user_type: user.user_type,
        user_name: user.user_name,
        user_id: user.id,
      },
      process.env.TOKEN_SECRET
    );
    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(verifyToken);
    res.header("auth-token", token).json({
      token,
      user: user.email,
      phone: user.phone,
      user_type: user.user_type,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//get users
exports.getUsers = async (req, res) => {
  const verifyToken = await auth.authUser(req.get("Authorization"));
  if (!verifyToken) {
    return res.status(400).json({ success: false });
  }

  const getFreelancer = await Users.findOne({
    where: { id: verifyToken.decoded.user_id.toString() },
  });
  try {
    res.status(200).json({ success: true, res: getFreelancer });
  } catch (err) {
    res.status(401).json({ success: false, res: err });
  }
};
