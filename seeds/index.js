const mongoose = require("mongoose");
const cities = require("./cities");
const Schools = require("../models/schools");

mongoose.connect("mongodb://127.0.0.1:27017/rate-school");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const seedDB = async () => {
  await Schools.deleteMany({});
  for (let i = 0; i < cities.length; i++) {
    const school = new Schools({
      user: "6441c03e50b1e92549360ed7",
      title: `${cities[i].name}`,
      location: `${cities[i].city}, ${cities[i].province}`,
      geometry: {
        type: "Point",
        coordinates: [cities[i].longitude, cities[i].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dgvo7fdpo/image/upload/v1682576220/school_svbvo5.jpg",
          filename: "School/a3iydjgf0cjovdwhetlw",
        },
      ],
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione asperiores id debitis, quam rerum aliquid sit dolore neque reiciendis voluptate animi suscipit porro est quae obcaecati quaerat corrupti, quia distinctio!",
    });
    await school.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
