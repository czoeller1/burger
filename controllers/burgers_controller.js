const express = require("express");
const burgers = require("../models/burger.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/index");
});

router.get("/index", (req, res) => {
  burgers.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burgers.insertOne(["name"], [req.body.name], (result) => {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", (req, res) => {
  //console.log("PUT");
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  burgers.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

module.exports = router;
