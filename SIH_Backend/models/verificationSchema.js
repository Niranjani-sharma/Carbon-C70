const verificationSchema = {
  name: String,
  email: String,
  goal: String,
  verificationPhoto: String, // This will store the image URL or base64 data
  userId: String, // This will be filled automatically
};

export default verificationSchema;