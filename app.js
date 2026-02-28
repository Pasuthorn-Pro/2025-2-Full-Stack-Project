require("dotenv").config();

const express = require("express");
const app = express();

// ===== config =====
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // ✅ รับค่าจาก <form>

// ===== mock data (in-memory) =====
let packages = [
  { id: 1, package_name: "Student", description: "นักเรียน/นักศึกษา", price: 899, session_count: 20, duration_days: 30, is_active: true },
  { id: 2, package_name: "Monthly", description: "รายเดือน", price: 1299, session_count: 30, duration_days: 30, is_active: true },
  { id: 3, package_name: "VIP", description: "พรีเมียม", price: 2999, session_count: 60, duration_days: 90, is_active: true },
];

const nextId = () => (packages.length ? Math.max(...packages.map(p => p.id)) + 1 : 1);
const toBool = (v) => v === "on" || v === "true" || v === true;

// ===== routes =====
app.get("/", (req, res) => res.redirect("/packages"));

// List + Search
app.get("/packages", (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  const filtered = q
    ? packages.filter(p =>
        (p.package_name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      )
    : packages;

  res.render("packages/index", { packages: filtered, q });
});

// New form
app.get("/packages/new", (req, res) => {
  res.render("packages/new");
});

// Create
app.post("/packages", (req, res) => {
  const pkg = {
    id: nextId(),
    package_name: (req.body.package_name || "").trim(),
    description: (req.body.description || "").trim(),
    price: Number(req.body.price || 0),
    session_count: Number(req.body.session_count || 0),
    duration_days: req.body.duration_days ? Number(req.body.duration_days) : null,
    is_active: toBool(req.body.is_active),
  };

  // validation แบบง่าย
  if (!pkg.package_name || pkg.price < 0 || pkg.session_count < 1) {
    return res.status(400).send("Invalid package data");
  }

  packages.push(pkg);
  res.redirect("/packages");
});

// Show
app.get("/packages/:id", (req, res) => {
  const pkg = packages.find(p => p.id == req.params.id);
  if (!pkg) return res.status(404).send("Package not found");
  res.render("packages/show", { pkg });
});

// Edit form
app.get("/packages/:id/edit", (req, res) => {
  const pkg = packages.find(p => p.id == req.params.id);
  if (!pkg) return res.status(404).send("Package not found");
  res.render("packages/edit", { pkg });
});

// Update
app.post("/packages/:id/update", (req, res) => {
  const idx = packages.findIndex(p => p.id == req.params.id);
  if (idx === -1) return res.status(404).send("Package not found");

  const updated = {
    ...packages[idx],
    package_name: (req.body.package_name || "").trim(),
    description: (req.body.description || "").trim(),
    price: Number(req.body.price || 0),
    session_count: Number(req.body.session_count || 0),
    duration_days: req.body.duration_days ? Number(req.body.duration_days) : null,
    is_active: toBool(req.body.is_active),
  };

  if (!updated.package_name || updated.price < 0 || updated.session_count < 1) {
    return res.status(400).send("Invalid package data");
  }

  packages[idx] = updated;
  res.redirect("/packages");
});

// Delete
app.post("/packages/:id/delete", (req, res) => {
  packages = packages.filter(p => p.id != req.params.id);
  res.redirect("/packages");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));