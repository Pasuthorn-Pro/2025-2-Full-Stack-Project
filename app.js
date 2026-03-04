require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./models");

// ===== Middleware =====
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const toBool = (v) => v === "true" || v === "on" || v === true;
const toInt = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
};

// ===== Routes =====
app.get("/", (req, res) => res.redirect("/packages"));

// LIST + SEARCH
app.get("/packages", async (req, res) => {
  const q = (req.query.q || "").trim();
  const { Op } = db.Sequelize;

  const where = q
    ? {
        [Op.or]: [
          { package_name: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
        ],
      }
    : {};

  const packages = await db.Package.findAll({
    where,
    order: [["id", "DESC"]],
  });

  res.render("packages/index", { packages, q });
});

// NEW
app.get("/packages/new", (req, res) => {
  res.render("packages/new");
});

// CREATE
app.post("/packages", async (req, res) => {
  const payload = {
    package_name: (req.body.package_name || "").trim(),
    description: (req.body.description || "").trim() || null,
    price: toInt(req.body.price, 0),
    session_count: toInt(req.body.session_count, 1),
    duration_days: req.body.duration_days ? toInt(req.body.duration_days, null) : null,
    is_active: toBool(req.body.is_active),
  };

  if (!payload.package_name) return res.status(400).send("package_name is required");
  if (payload.price < 0) return res.status(400).send("price must be >= 0");
  if (payload.session_count < 1) return res.status(400).send("session_count must be >= 1");

  try {
    await db.Package.create(payload);
    return res.redirect("/packages");
  } catch (err) {
    // ชน unique ชื่อซ้ำ
    return res.status(400).send(err.message);
  }
});

// SHOW
app.get("/packages/:id", async (req, res) => {
  const pkg = await db.Package.findByPk(req.params.id);
  if (!pkg) return res.status(404).send("Package not found");
  res.render("packages/show", { pkg });
});

// EDIT
app.get("/packages/:id/edit", async (req, res) => {
  const pkg = await db.Package.findByPk(req.params.id);
  if (!pkg) return res.status(404).send("Package not found");
  res.render("packages/edit", { pkg });
});

// UPDATE
app.post("/packages/:id/update", async (req, res) => {
  const pkg = await db.Package.findByPk(req.params.id);
  if (!pkg) return res.status(404).send("Package not found");

  const payload = {
    package_name: (req.body.package_name || "").trim(),
    description: (req.body.description || "").trim() || null,
    price: toInt(req.body.price, 0),
    session_count: toInt(req.body.session_count, 1),
    duration_days: req.body.duration_days ? toInt(req.body.duration_days, null) : null,
    is_active: toBool(req.body.is_active),
  };

  if (!payload.package_name) return res.status(400).send("package_name is required");
  if (payload.price < 0) return res.status(400).send("price must be >= 0");
  if (payload.session_count < 1) return res.status(400).send("session_count must be >= 1");

  try {
    await pkg.update(payload);
    return res.redirect("/packages");
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

// DELETE
app.post("/packages/:id/delete", async (req, res) => {
  const pkg = await db.Package.findByPk(req.params.id);
  if (!pkg) return res.status(404).send("Package not found");

  await pkg.destroy();
  res.redirect("/packages");
});

// ===== Start =====
(async () => {
  await db.sequelize.authenticate();
  app.listen(port, () => console.log(`http://localhost:${port}`));
})();