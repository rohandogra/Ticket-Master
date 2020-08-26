const Department = require('../models/departments');

//* show departments
module.exports.show = (req, res) => {
  const userId = req.decoded._id;
  Department.find({ userId: { $in: [userId] } })
    .then((department) => {
      res.json(department);
    })
    .catch((err) => {
      console.log(err);
    });
};

//* show by id department
module.exports.showID = (req, res) => {
  const id = req.params.id;
  Department.findById(id)
    .then((department) => {
      if (department) {
        res.json(department);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//* create department
module.exports.create = (req, res) => {
  const body = req.body;
  const userId = req.decoded._id;
  const department = new Department({ name: body.name, userId });
  department
    .save()
    .then((department) => {
      res.status(200).send(department);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

//* delete departments
module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Department.findByIdAndDelete(id)
    .then((department) => {
      if (department) {
        res.json(department);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//* update department

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Department.findByIdAndUpdate(id, body, { new: true })
    .then((department) => {
      if (department) {
        res.json(department);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
