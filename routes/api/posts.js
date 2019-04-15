const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Post = require("../../models/Post");

// Load Validation
const validatePostInput = require("../../validation/post");

// @route  GET api/posts/test
// @desc   Tests post route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route  POST api/posts
// @desc   Create Post route
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      // if any errors, send 400 status with errors
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      id: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
