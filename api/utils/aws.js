const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3();

AWS.config.update({
    region: process.env.AWS_S3_REGION,
    correctClockSkew: true
})

const uploadImage = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'linkup-bucket',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
}).single("image");

const deleteImages = (images) => {
    if (images.length) {
        images.forEach( async(image) => {
            const imageKey = image.url.split('/');
            const imageKeyUnencoded = imageKey[imageKey.length - 1]
            const key = decodeURI(imageKeyUnencoded)
            const params = {
                Bucket: "linkup-bucket",
                Key: key
            }
            await s3.deleteObject(params).promise();
        })
    }
}



module.exports = { uploadImage, deleteImages };
