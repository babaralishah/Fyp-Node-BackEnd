const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otpcode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OtpCode = mongoose.model('otpcode', codeSchema);
module.exports = OtpCode;