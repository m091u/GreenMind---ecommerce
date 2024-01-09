const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    match: [
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
      "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    ],
  },
  name: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dejhw7aug/image/upload/v1696346771/readCycle-gallery/avatar1_cjxa2p.png",
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  //   required: true,
  // },
  favourites: {
    type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },

  cart: [
    {
      _id: false,
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

module.exports = model("User", userSchema);
