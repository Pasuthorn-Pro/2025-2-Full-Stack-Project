const express = require("express");
const app = express();
const path = require("path");
const db = require("./models");

const port = process.env.PORT || 3000;

/* models */
const { Member, Package, Class, Enrollment } = require("./models");

/* ===== Middleware ===== */
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* ================= MEMBERS ================= */

// index
app.get("/members", async (req,res)=>{
  const members = await Member.findAll();
  res.render("members/index",{members});
});

// new
app.get("/members/new",(req,res)=>{
  res.render("members/new");
});

// create
app.post("/members", async (req,res)=>{
  await Member.create(req.body);
  res.redirect("/members");
});

// show
app.get("/members/:id", async (req,res)=>{
  const member = await Member.findByPk(req.params.id);
  res.render("members/show",{member});
});

// edit
app.get("/members/:id/edit", async (req,res)=>{
  const member = await Member.findByPk(req.params.id);
  res.render("members/edit",{member});
});

// update
app.post("/members/:id", async (req,res)=>{
  const member = await Member.findByPk(req.params.id);
  await member.update(req.body);
  res.redirect("/members");
});

// delete
app.post("/members/:id/delete", async (req,res)=>{
  const member = await Member.findByPk(req.params.id);
  await member.destroy();
  res.redirect("/members");
});

/* ================= PACKAGES ================= */

// index
app.get("/packages", async (req,res)=>{
  const packages = await Package.findAll();
  res.render("packages/index",{packages});
});

// new
app.get("/packages/new",(req,res)=>{
  res.render("packages/new");
});

// create
app.post("/packages", async (req,res)=>{
  await Package.create(req.body);
  res.redirect("/packages");
});

// show
app.get("/packages/:id", async (req,res)=>{
  const package = await Package.findByPk(req.params.id);
  res.render("packages/show",{package});
});

// edit
app.get("/packages/:id/edit", async (req,res)=>{
  const package = await Package.findByPk(req.params.id);
  res.render("packages/edit",{package});
});

// update
app.post("/packages/:id", async (req,res)=>{
  const package = await Package.findByPk(req.params.id);
  await package.update(req.body);
  res.redirect("/packages");
});

// delete
app.post("/packages/:id/delete", async (req,res)=>{
  const package = await Package.findByPk(req.params.id);
  await package.destroy();
  res.redirect("/packages");
});

/* ================= CLASSES ================= */

app.get("/classes", async (req,res)=>{
  const classes = await Class.findAll();
  res.render("classes/index",{classes});
});

app.get("/classes/new",(req,res)=>{
  res.render("classes/new");
});

app.post("/classes", async (req,res)=>{
  await Class.create(req.body);
  res.redirect("/classes");
});

app.get("/classes/:id", async (req,res)=>{
  const classItem = await Class.findByPk(req.params.id);
  res.render("classes/show",{classItem});
});

app.get("/classes/:id/edit", async (req,res)=>{
  const classItem = await Class.findByPk(req.params.id);
  res.render("classes/edit",{classItem});
});

app.post("/classes/:id", async (req,res)=>{
  const classItem = await Class.findByPk(req.params.id);
  await classItem.update(req.body);
  res.redirect("/classes");
});

app.post("/classes/:id/delete", async (req,res)=>{
  const classItem = await Class.findByPk(req.params.id);
  await classItem.destroy();
  res.redirect("/classes");
});

/* ================= ENROLLMENTS ================= */

app.get("/enrollments", async (req,res)=>{
  const enrollments = await Enrollment.findAll({
    include:[Member,Class]
  });
  res.render("enrollments/index",{enrollments});
});

app.get("/enrollments/new", async (req,res)=>{
  const members = await Member.findAll();
  const classes = await Class.findAll();
  res.render("enrollments/new",{members,classes});
});

app.post("/enrollments", async (req,res)=>{
  await Enrollment.create(req.body);
  res.redirect("/enrollments");
});

app.post("/enrollments/:id/delete", async (req,res)=>{
  const enrollment = await Enrollment.findByPk(req.params.id);
  await enrollment.destroy();
  res.redirect("/enrollments");
});

/* ================= REPORTS ================= */

// members in class
app.get("/reports/members-in-class", async (req,res)=>{
  const classes = await Class.findAll({
    include:{
      model: Enrollment,
      include: Member
    }
  });

  res.render("reports/members-in-class",{classes});
});

// member payments
app.get("/reports/member-payments", async (req,res)=>{
  const members = await Member.findAll({
    include: Package
  });

  res.render("reports/member-payments",{members});
});

/* ================= DASHBOARD ================= */
app.get("/", async (req,res) => {
  try {
    const memberCount = await db.Member.count();
    const classCount = await db.Class.count();
    const packageCount = await db.Package.count();
    const enrollmentCount = await db.Enrollment.count();

    res.render("dashboard",{ memberCount, classCount, packageCount, enrollmentCount });
  } catch (err) {
    console.log("REAL ERROR:", err?.name, err?.message);
    console.log("SQLITE MSG:", err?.parent?.message);
    console.log("SQL:", err?.sql);
    res.status(500).send(err?.parent?.message || err?.message);
  }
});

// ===== Start =====
(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync(); 
    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (err) {
    console.log("STARTUP ERROR:", err?.name, err?.message);
    console.log("SQLITE:", err?.parent?.message);
    console.log("SQL:", err?.sql);
    process.exit(1);
  }
})();