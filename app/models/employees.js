const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: (err) => {
        return console.log(err);
      },
    },
  },
  mobile: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Empolyees = mongoose.model("Employees", employeeSchema);

module.exports = Empolyees;
