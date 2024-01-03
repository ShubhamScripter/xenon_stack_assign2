import Contact from "../models/Contact.js";

/* CREATE */
export const createContact = async (req, res) => {
  try {
    const { issue, email, contact } = req.body;
    const newPost = new Contact({
      issue,
      email,
      contact,
    });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
