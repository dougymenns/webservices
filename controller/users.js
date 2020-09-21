//package import
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { required } = require("joi");
//local import
const Users = require("../model/users");
const { registerValidation, loginValidation } = require("../validation");

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
  if (error) return res.status(400).send(error.details[0].message);

  //validate existing email
  const emailExist = await Users.findOne({ where: { email: req.body.email.toLowerCase() } });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await Users.create({
    first_name: req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1),
    last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1),
    phone: req.body.phone,
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });
  try {
    res.send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

//login
exports.login = async (req, res) => {
    //validate data before accepting data
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //validate email
    const user = await Users.findOne({where: {email: req.body.email.toLowerCase()}})
    if (!user) return res.status(400).send("Invalid Email or Passowrd")

    //password checking
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Invalid Email or Passowrd")

    //token assignment
    const token = jwt.sign({email: user.email},process.env.TOKEN_SECRET)
    res.header('auth-token', token).json({token,user:user.email})
}

//get users
exports.getUsers = (req, res)=> {
    res.json({
        title: 'hello'
    })
}