// import validator and model
const auth = require("../../auth/index");
const Jobs = require("../../model/postJob");

//create profile
exports.postJob = async (req, res) => {
  const verifyToken = await auth.authUser(req.get("Authorization"));

  const newProfile = await Jobs.create({
    user_id: verifyToken.decoded.user_id,
    job_title: req.body.job_title,
    job_description: req.body.job_description,
    amount: req.body.amount,
    file: req.body.file,
    work_done: req.body.work_done,
  });
  console.log(newProfile);
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ res: err, success: false });
  }
};

//read profile
exports.getJob = async (req, res) => {
  const verifyToken = await auth.authUser(req.get("Authorization"));
  if (!verifyToken) {
    return res.status(400).json({ success: false });
  }

  const getFreelancer = await Jobs.findOne({
    where: { user_id: verifyToken.decoded.user_id.toString() },
  });
  try {
    res.status(200).json({ success: true, res: getFreelancer });
  } catch (err) {
    res.status(401).json({ success: false, res: err });
  }
};
exports.getJobs = async (req, res) => {
  const verifyToken = await auth.authUser(req.get("Authorization"));
  if (!verifyToken) {
    return res.status(400).json({ success: false });
  }

  const getFreelancer = await Jobs.findAll();
  try {
    res.status(200).json({ success: true, res: getFreelancer });
  } catch (err) {
    res.status(401).json({ success: false, res: err });
  }
};
