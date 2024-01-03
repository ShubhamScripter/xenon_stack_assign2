import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
    },
    issue: {
      type: String,
      required: true,
      min: 5,
    },
    contact: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
