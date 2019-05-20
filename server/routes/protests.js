const express = require("express");
const { isLoggedIn } = require("../middlewares");
const mongoose = require("mongoose");
const Protest = require("../models/Protest");

const router = express.Router();

// /api/data	    GET
// /api/data	    POST
// /api/data/:id	GET
// /api/data/:id	PUT
// /api/data/:id	DELETE

// GET all protests
router.get("/", (req, res, next) => {
  Protest.find()
    .then(protests => {
      res.json(protests);
    })
    .catch(err => next(err));
});

// POST a new protest
router.post("/", (req, res, next) => {
  Protest.create(req.body)
    .then(protest => {
      res.json({
        success: true,
        protest
      });
    })
    .catch(err => next(err));
});

// GET one protest
router.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Protest.findById(req.params.id)
    .then(protest => {
      res.status(200).json(protest);
    })
    .catch(err => next(err));
});

// PUT one protest
router.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Protest.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Protest with ${req.params.id} is updated successfully.`
      });
    })
    .catch(err => next(err));
});

// DELETE one protest
router.delete("/:id", isLoggedIn, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Protest.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Protest with ${req.params.id} is removed successfully.`
      });
    })
    .catch(err => next(err));
});

module.exports = router;
