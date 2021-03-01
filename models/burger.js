const orm = require("../config/orm.js");

const burger = {
  selectAll(cb) {
    orm.selectAll("burgers", cb);
  },
  insertOne(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, cb);
  },
  updateOne(colVals, condition, cb) {
    orm.updateOne("burgers", colVals, condition, cb);
  },
};

module.exports = burger;
