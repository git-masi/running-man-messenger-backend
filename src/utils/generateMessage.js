const moment = require("moment");

module.exports = (name, text) => ({
  name,
  text,
  createdAt: moment(Date.now()).format("MMM Do h:mm A"),
});
