const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");

const JWT_SECRET = "randomnumber";

const mongoUrl =
  "mongodb+srv://Lawrence:wwwqe123@cluster0.sbj7x.mongodb.net/recipesUserDB";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userModel");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const username = email.split("@")[0];

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    await User.create({
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok", username: username });
  } catch (error) {
    res.send({ status: "error", error: "InvAlid Account or Password"  });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const username = email.split("@")[0];

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 10,
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token, username: username });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

// app.post("/userData", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user == "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }

//     const useremail = user.email;
//     User.findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) {}
// });

app.listen(8080, () => {
  console.log("Server Started");
});

// app.post("/forgot-password", async (req, res) => {
//     const { email } = req.body;
//     try {
//       const oldUser = await User.findOne({ email });
//       if (!oldUser) {
//         return res.json({ status: "User Not Exists!!" });
//       }
//       const secret = JWT_SECRET + oldUser.password;
//       const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//         expiresIn: "5m",
//       });
//       const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
//       var transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "adarsh438tcsckandivali@gmail.com",
//           pass: "rmdklolcsmswvyfw",
//         },
//       });

//       var mailOptions = {
//         from: "youremail@gmail.com",
//         to: "thedebugarena@gmail.com",
//         subject: "Password Reset",
//         text: link,
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//         }
//       });
//       console.log(link);
//     } catch (error) {}
//   });

//   app.get("/reset-password/:id/:token", async (req, res) => {
//     const { id, token } = req.params;
//     console.log(req.params);
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     try {
//       const verify = jwt.verify(token, secret);
//       res.render("index", { email: verify.email, status: "Not Verified" });
//     } catch (error) {
//       console.log(error);
//       res.send("Not Verified");
//     }
//   });

//   app.post("/reset-password/:id/:token", async (req, res) => {
//     const { id, token } = req.params;
//     const { password } = req.body;

//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     try {
//       const verify = jwt.verify(token, secret);
//       const encryptedPassword = await bcrypt.hash(password, 10);
//       await User.updateOne(
//         {
//           _id: id,
//         },
//         {
//           $set: {
//             password: encryptedPassword,
//           },
//         }
//       );

//       res.render("index", { email: verify.email, status: "verified" });
//     } catch (error) {
//       console.log(error);
//       res.json({ status: "Something Went Wrong" });
//     }
//   });
