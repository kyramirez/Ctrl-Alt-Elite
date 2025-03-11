import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    pwd: {
      type: String,
      required: true,
    },
  },
  { collection: "users" },
);

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    images: {
      type: [{ type: String }],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    expiresAt: {
      type: Date,
      default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  },
  { collection: "listings" },
);

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "messages" },
);

const User = mongoose.model("User", UserSchema);
const Listing = mongoose.model("Listing", ListingSchema);
const Message = mongoose.model("Message", MessageSchema);

export { User, Listing, Message };
