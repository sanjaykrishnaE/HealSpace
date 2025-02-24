



const jwt = require('jsonwebtoken');


const doctorAuth = async (req,res,next) => {
  try {
    const { dtoken } = req.headers
    if (!dtoken) {
      return res.status(400).json({ success: false, message: "Not authorized, Login again" })
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

    req.body.docId = token_decode.id
    next()
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = doctorAuth;













