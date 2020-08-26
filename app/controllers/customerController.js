const Customer = require('../models/customers');

//* create customer
module.exports.create = (req, res) => {
  const body = req.body;
  const userId = req.decoded._id;
  const customer = new Customer({
    name: body.name,
    userId: userId,
    email: body.email,
    mobile: body.mobile,
  });
  customer
    .save()
    // .populate(userId)
    .then((customer) => {
      res.status(200).send(customer);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//* list
module.exports.list = (req, res) => {
  const user = req.decoded._id;
  Customer.find({ userId: { $in: [user] } })
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
};

//* show
module.exports.show = (req, res) => {
  const id = req.params.id;
  Customer.findById(id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//* delete customer
module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Customer.findByIdAndDelete(id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//* update customer
module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Customer.findByIdAndUpdate(id, body, { new: true })
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
};
