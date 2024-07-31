const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvjjzsilz",
  api_key: "429616765262767",
  api_secret: "IeJEnUVczERLFF5eOFiS18kenIE",
});
module.exports = {
  cloudinary_js_config: cloudinary,
};
