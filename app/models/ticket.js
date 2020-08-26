const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  employeesIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isResolved: {
    type: Boolean,
    required: true,
    default: false,
  },
  code: {
    type: String,
    minlength: 3,
    // maxlength: 3,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Tickets = mongoose.model("Tickets", ticketSchema);

module.exports = Tickets;
