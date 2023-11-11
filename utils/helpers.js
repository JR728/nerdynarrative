const moment = require('moment');

module.exports = {
  // Example helper function to format dates using Moment.js
  formatDate: function (date) {
    return moment(date).format('MMMM DD, YYYY [at] hh:mm A');
  },

};
