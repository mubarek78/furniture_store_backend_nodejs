const User = require("../models/User");
const {
  verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();