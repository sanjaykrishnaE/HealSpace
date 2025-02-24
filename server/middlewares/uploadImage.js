const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);   //file.originalname
    }
})

const upload = multer({
    storage
})

module.exports = upload;