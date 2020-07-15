require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const cookieParser = require("cookie-parser");
const db = require("./db");
const jwt = require("jsonwebtoken");

const server = createServer();
server.express.use(cookieParser());
//decode the JWT so w can get the user on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    console.log(req.cookies);
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    console.log(userId);
    //put the userId on to the request for future request to access
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (deets) => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
