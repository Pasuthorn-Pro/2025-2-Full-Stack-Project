require("dotenv").config();

const express = require("express");
const app = express();

const packages = [
  { id:1, package_name:"Student", price:899, session_count:20, is_active:true },
  { id:2, package_name:"Monthly", price:1299, session_count:30, is_active:true },
  { id:3, package_name:"VIP", price:2999, session_count:60, is_active:true }
];

app.set("view engine", "ejs");
app.use(express.static("public"));

// 🌐 routes
app.get("/packages", (req, res) => {
  const q = req.query.q || "";

  res.render("packages/index", {
    packages,
    q
  });
});

app.get("/packages/new", (req, res) => {
  res.render("packages/new");
});

//เอาไว้เชื่อมตอนทำงานจริง
//const q = req.query.q || "";
//res.render("packages/index", { packages, q });
//

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});