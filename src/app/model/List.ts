import mongoose, { Schema, models, model } from "mongoose";

const LinkItemSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const LinkSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String },
  links: {
    type: [LinkItemSchema],
    default: [],
  },
});

const Link = models.Link || model("Link", LinkSchema);
export default Link;
