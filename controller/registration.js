//package import
const sequelize = require("../util/database");
const { required } = require("joi");
const jwt = require("jsonwebtoken");

//local import
const Attendees = require("../model/attendees");
const { gssValidation } = require("../validation");
const Users = require("../model/users");
const Score = require("../model/scores");

exports.getUsers = async (req, res) => {
  const user = await Users.findAll();
  return res.status(201).json({
    user,
  });
};

//register
exports.register = async (req, res) => {
  //validate data before accepting data
  const { error } = gssValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ message: error.details[0].message, success: false });

  //validate existing email
  const emailExist = await Attendees.findOne({
    where: { email: req.body.email.toLowerCase() },
  });
  if (emailExist)
    return res
      .status(400)
      .json({ message: "Email already exists", status: true });

  const newAttendee = await Attendees.create({
    full_name: req.body.full_name,
    employed: req.body.employed,
    workplace: req.body.workplace,
    workplace_role: req.body.workplace_role,
    phone: req.body.phone,
    medium: req.body.medium,
    come_along: req.body.come_along,
    people_along: req.body.people_along,
    expectation: req.body.expectation,
    email: req.body.email.toLowerCase(),
  });
  try {
    res
      .status(200)
      .json({ message: "Registration Successful", success: false });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const user = await Users.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res
      .status(400)
      .json({ res: "Invalid Email or Passowrd", success: false });
  }
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.TOKEN_SECRET
  );
  const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(verifyToken);
  return res.status(200).json({
    data: {
      token,
      email: user.email,
    },
    success: true,
  });
};

//get users
exports.getUsers = (req, res) => {
  res.json({
    title: "hello",
  });
};
