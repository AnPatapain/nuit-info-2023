const multer = require('multer');
const path = require('path');
const ResourceNotFoundError = require('../errors/RessourceNotFoundError');


const uploadsFolderPath = path.join(__dirname, '..', '..', '..', 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsFolderPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({
    storage: storage
});

const single = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        next();
    });
}


const multerUpload = {
    single
}
module.exports = multerUpload