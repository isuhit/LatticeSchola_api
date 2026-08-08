const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, "Reg number is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: { type: String, required: [true, "Phone is required"] },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female"],
    },
    // department: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Department",
    //   required: [true, "Department is required"],
    // },
    level: {
      type: Number,
      required: [true, "Level is required"],
      enum: [100, 200, 300, 400],
      default: 100
    },

    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Registered", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", StudentSchema);
