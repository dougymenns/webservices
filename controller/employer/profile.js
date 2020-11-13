// import validator and model
const auth = require("../../auth/index");
const EmployerProfile = require("../../model/employer");

//create profile
exports.createProfile = async (req, res) => {
  const verifyToken = await auth.authUser(req.get("Authorization"));

  const newProfile = await EmployerProfile.create({
    user_id: verifyToken.decoded.user_id,
    region: req.body.region,
    company_name: req.body.company_name,
    years_of_existence: req.body.years_of_existence,
    about: req.body.about,
    profile_picture: req.body.profile_picture,
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

  const getFreelancer = await EmployerProfile.findOne({
    where: { user_id: verifyToken.decoded.user_id.toString() },
  });
  try {
    res.status(200).json({ success: true, res: getFreelancer });
  } catch (err) {
    res.status(401).json({ success: false, res: err });
  }
};
