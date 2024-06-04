const router = require("express").Router();

const { db } = require("../db/db.js");

/**
 * @route   POST /user
 * @desc    Register a new user
 */
router.post("/", async (req, res) => {
  data = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({
      message: "Incorrect data",
    });
  }

  if (await db.getUserByEmail(data.email)) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const user_id = await db.createUser(data.email, data.password);
  if (user_id) {
    res.status(201).send({
      message: "User created successfully",
      user_id: user_id,
    });
  } else {
    res.status(400).json({ message: "Something went wrong..." });
  }
});

/**
 * @route   GET /user
 * @desc    Return user by id
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Incorrect id",
    });
  }
  let user = await db.getUser(id);

  if (user) {
    res.status(201).send({ user });
  } else {
    res.status(403).json({ message: "User not found or incorrect uuid" });
  }
});

/**
 * @route   PUR /user
 * @desc    Update a user data
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  data = req.body;

  if (Object.keys(data).length === 0 && data.constructor === Object) {
    return res.status(400).json({
      message: "Incorrect data",
    });
  }

  if (await db.getUser(id)) {
    await db.updateUser(id, data);

    res.status(201).send({ message: "User updated successfully", user_id: id });
  } else {
    res.status(403).send({ message: "User not found" });
  }
});

/**
 * @route   DELETE /user
 * @desc    Delete a user
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "No id found",
    });
  }

  let user = await db.getUser(id);

  if (user) {
    await db.deleteUser(id);

    res.status(201).send({ message: "User deleted successfully", user_id: id });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
