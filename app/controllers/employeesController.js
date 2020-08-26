const Employees = require("../models/employees");

module.exports.create = (req, res) => {
  const body = req.body;
  const userId = req.decoded._id;
  const employees = new Employees({ ...body, userId: userId });
  employees
    .save()
    .then((employee) => res.status(200).send(employee))
    .catch((err) => res.status(500).send(err));
};

//* Get Employees

module.exports.show = (req, res) => {
  const userId = req.decoded._id;
  Employees.find({ userId: { $in: [userId] } })
    .populate("department")
    .then((employee) => res.status(200).send(employee))
    .catch((err) => res.status(500).send(err));
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Employees.findByIdAndDelete(id)
    .then((employee) => res.status(200).send(employee))
    .catch((err) => res.status(500).send(err));
};

module.exports.showId = (req, res) => {
  const id = req.params.id;
  Employees.findById(id)
    .populate("department")
    .then((employee) => {
      res.status(200).send(employee);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Employees.findByIdAndUpdate(id, body, { new: true })
    .then((employee) => res.status(200).send(employee))
    .catch((err) => res.status(500).send(err));
};
