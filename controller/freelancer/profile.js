const sequelize = require("../../util/database");
const jwt = require("jsonwebtoken");

const { required } = require("joi");

// import validator and model
const Freelancer = require("../../model/freelancerProfile");
const { freelancerValidation } = require("../../validation");
const auth = require("../../auth/index");

//create profile
exports.createProfile = async (req, res) => {
  const verifyToken = await auth.authUser(req.get("Authorization"));

  const newProfile = await Freelancer.create({
    user_id: verifyToken.decoded.user_id,
    region: req.body.region,
    expertise: req.body.expertise,
    level_of_expertise: req.body.level_of_expertise,
    other_skills: req.body.other_skills,
    about: req.body.about,
    picture: req.body.picture,
    resume: req.body.resume,
  });
  console.log(newProfile);
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ res: err, success: false });
  }
};

//read profile
exports.getProfile = async (req, res) => {
  const verifyToken = await auth.authUser(req.get("Authorization"));
  if (!verifyToken) {
    return res.status(400).json({ success: false });
  }

  const getFreelancer = await Freelancer.findOne({
    where: { user_id: verifyToken.decoded.user_id.toString() },
  });
  try {
    res.status(200).json({ success: true, res: getFreelancer });
  }catch(err){
    res.status(401).json({success: false, res: err})
  }
};
