const mongoose = require("mongoose");
const User = require("./models/User");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const newUsers = [];
    for (let i = 1; i <= 10; i++) {
      newUsers.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: "123456",
        phone: faker.phone.number("08##########"),
        address: faker.address.streetAddress() + ", " + faker.address.city(),
      });
    }

    // Masukkan 10 data user baru ke koleksi `User`
    await User.insertMany(newUsers);

    console.log("10 random users have been added!");
    process.exit();
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

createUsers();
