const express = require("express");

const { config } = require("./config");
const passport = require("passport");
const boom = require("@hapi/boom");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();

// body parser
app.use(express.json());
app.use(cookieParser());
//app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

//Basic Strategy
require("./utils/auth/strategies/basic");

app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate('basic', function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }
      const { token, ...user } = data;

      req.login(data, { session: false }, async function(error) {
        if (error) {
          next(error);
        }

        if(!config.dev){
          res.cookie("token", token, {
            httpOnly: true,
            secure: true
          });
        } else {
          res.cookie('token', token);
        }

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
  const { body: user } = req;
  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user,
    });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
});

app.get("/katarogus", async function (req, res, next) {
  console.log('hola')
});

app.post("/products", async function (req, res, next) {
  try {
    const { body: product } = req;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/products`,
      headers: { Authorization: `Bearer ${token}` },
      method: "post",
      data: product,
    });

    if (status !== 201) {
      return next(boom.badImplementation());
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete("/products/:productId", async function (req, res, next) {
  try {
    const { productId } = req.params;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/products/${productId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: "delete",
    });

    if (status !== 200) {
      return next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.listen(config.port, function () {
  console.log(`Listening on http://localhost/${config.port}`);
});
