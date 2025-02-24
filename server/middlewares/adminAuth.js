// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const adminAuth = async (req, res, next) => {
//   try {
//     const { atoken } = req.headers;
//     if (!atoken) {
//       return res.status(482).json({ success:false , message: "Not authorized, Login again" });
//     }
//     const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
//     // console.log('Decoded token:', token_decode); // Add log
//     if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res.status(482).json({success:false , message: "Not authorized, Login again" });
//     }
//     next();
//   } catch (error) {
//     res.status(403).json({success:false , message: error.message });
//   }
// };

// module.exports = adminAuth;






const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuth = async (req ,res ,next) => {
    try {

        const {atoken} = req.headers
        if (!atoken) {
            return res.status(482).json({message:"Not autharized Login again"})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
        if ( token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(482).json({message:"Not autharized Login again"})
        }
        
        next()
    } catch (error) {
        res.status(403).json({ message: error.message });
    }

}

module.exports = adminAuth;