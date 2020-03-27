const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App!",
    name: "Ido Samet"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ido Samet"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Ido Samet",
    helpText: "this is a help message"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address"
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "You must provide a valid address"
        });
      } else {
        forecast(latitude, longitude, (error, data) => {
          error
            ? res.send({
                error: "You must provide a address"
              })
            : res.send({
                forecast: data,
                location,
                address: req.query.address
              });
        });
      }
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({ product: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Error Page",
    name: "Ido Samet",
    errorText: "Help Doc not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    name: "Ido Samet",
    errorText: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

// app.com
// app.com/help
// app.com/about
