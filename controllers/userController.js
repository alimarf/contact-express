const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  try {
    const newUser = new User({ username, email, password, phone, address });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const total = await User.countDocuments();

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("-password -__v");

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      statusCode: 200,
      message: "Response Success",
      data: users,
      pagination: {
        totalItems: total,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password, phone, address },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
