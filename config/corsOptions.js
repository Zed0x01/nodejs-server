const whiteList = [
  "www.google.com",
  "localhost:3500",
  "https://admin-dashboard-six-ruby.vercel.app/",
  "https://www.postman.com",
];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOption;
