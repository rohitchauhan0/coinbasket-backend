
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fs = require('fs').promises;

exports.uploadImageToS3 = async (imageFile) => {
  try {
    const imageData = await fs.readFile(imageFile.tempFilePath);
  
    const key = `${uuidv4()}-${imageFile.name}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: imageData,
      ContentType: imageFile.mimetype,
      ACL: 'public-read',
    };
  
    const data = await s3.upload(params).promise();
    const imageUrl = data.Location;
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw error;
  }
};

exports.deleteImageFromS3 = async (imageUrl) => {
  const key = imageUrl.split('/').pop();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`Image ${key} deleted successfully from S3`);
  } catch (error) {
    console.error('Error deleting image from S3:', error);
    throw error;
  }
};





