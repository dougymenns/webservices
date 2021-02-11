//package import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../util/database");
const emailService = require("../util/notificationService");
const { required } = require("joi");
const upload = require("../util/uploadService");
const fileUpload = upload.single("profile");
const auth = require("../auth/index");

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
  const emailExist = await Users.findOne({
    where: { email: req.body.email.toLowerCase() },
  });
  if (emailExist) return res.status(400).send("Email already exists");

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
    res.status(200).json({message: "Registration Successful", success: false});
  } catch (err) {
    res.status(400).send(err);
  } finally {
    sequelize.close();
  }
};

//login
exports.login = async (req, res) => {
  try {
    //validate data before accepting data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //validate email
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ message: "Invalid Email or Passowrd", success: false });

    //password checking
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res
        .status(400)
        .json({ message: "Invalid Email or Passowrd", success: false });

    //token assignment
    const token = jwt.sign(
      { email: user.email, phone: user.phone },
      process.env.TOKEN_SECRET
    );
    // req.header("auth-token", token).json({
    //     token,
    //     user: user.email,
    //     phone: user.phone,
    //     user_type: user.user_type,
    //     success: true,
    //   });
    return res.status(200).json({
      data: {
        token,
        user: user.email,
        phone: user.phone,
        user_type: user.user_type,
      },
      success: true,
    });
    // emailService.sendMail(req.body.email,"Login Subject","this is to inform you that you successfully logged in")
  } catch (err) {
    console.log(err);
  }
};

exports.checkToken = async (req, res) => {
  try {
    const verifyToken = await auth.authUser(req.get("Authorization"));
    if (!verifyToken) {
      return res.status(400).json({ success: false, message: "Unathorized" });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

//get users
exports.getUsers = (req, res) => {
  res.json({
    title: "hello",
  });
};

exports.upload = async (req, res) => {
  try {
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.awsUpload = async (req, res) => {
  try {
    fileUpload(req, res, function (err) {
      if (err) {
        return res.status(400).send({
          message: "File Upload Error",
          detail: err.message,
        });
      }
      //
      console.log(req.file);

      res.status(200).send({
        profile: `${req.file.location}`,
      });
    });
    console.log(fileUpload[0]);
    // return res.json({status:"ok"})
  } catch (err) {
    console.log(err);
  }
};
