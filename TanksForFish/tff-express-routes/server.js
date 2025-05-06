"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import{searchPhotos} from './pexelAPI.js';

app.get('/api/pexels', async (req, res) => {
  const query = req.query.query || 'aquariums'; // default to 'aquariums'

  try {
    const result = await searchPexels(query, 1); // one image

    // photo info 
    const trimmedPhotos = result.map(photo => ({
      id: photo.id,
      alt: photo.alt,
      src: photo.src.medium,
      full: photo.src.original,
      photographer: photo.photographer,
      photographer_url: photo.photographer_url
    }));

    res.json(trimmedPhotos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});


//auth
const session = require('express-session');
const passport = require('passport');
require("./auth/passport");
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const ejs = require("ejs")
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const adminRoutes = require("./routes/admin.route");
const productRoutes = require("./routes/tff.route");
const cartRoutes = require("./routes/cart.route");
const authRoutes = require("./auth/auth.route");

const { db_close } = require("./models/db-conn");

app.use("/products", productRoutes);
app.use("/admin", adminRoutes);
app.use('/auth', authRoutes);
app.use("/cart", cartRoutes);

const tffController = require("./controllers/tff.controller");

app.get("/home", tffController.home);

app.get("/", (req, res) => {
  req.session.returnTo = req.originalUrl;
  res.render("home", { title: 'Home Page', user: req.user });
});
app.get("/home", (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.user 
  });
});
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.")
  })
}