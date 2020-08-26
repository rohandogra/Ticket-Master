const Tickets = require("../models/ticket");

//* Post Tickets
module.exports.create = (req, res) => {
  const body = req.body;
  const userId = req.decoded._id;
  const tickets = new Tickets({
    ...body,
    code: `Code-${req.body.code}`,
    userId: userId,
  });
  tickets
    .save()
    .then((ticket) => {
      res.status(200).send(ticket);
    })
    .catch((err) => res.status(500).send(err));
};
//* Get Tickets
module.exports.show = (req, res) => {
  // const query = req.query.tags;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10,
  };

  const userId = req.decoded._id;

  Tickets.find({ userId: { $in: [userId] } })
    .populate("customerId")
    .populate("departmentId")
    .populate({
      path: "employeesIds",
      model: "Employees",
      populate: {
        path: "department",
        model: "Department",
      },
    })
    .sort({ createdAt: "asc" })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .then((ticket) => res.status(200).send(ticket))
    .catch((err) => res.status(500).send(err));
};

module.exports.showID = (req, res) => {
  const id = req.params.id;
  Tickets.findById(id)
    .populate("customerId")
    .populate("departmentId")
    .populate("employeesIds")
    .then((ticket) => res.status(200).send(ticket))
    .catch((err) => res.status(500).send(err));
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Tickets.findByIdAndUpdate(id, body, { new: true })
    .then((ticket) => {
      res.status(200).send(ticket);
    })
    .catch((err) => res.status(500).send(err));
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Tickets.findByIdAndDelete(id)
    .then((ticket) => {
      res.status(200).send(ticket);
    })
    .catch((err) => res.status(500).send(err));
};
