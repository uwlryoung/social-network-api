const connection = require('../config/connection');
const { User, Thought } = require('../models');

const reactions = [
  {
      reactionId: 1,
      reactionBody: "I totally agree!",
      username: "PizzaLover88",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionId: 2,
      reactionBody: "Interesting point of view.",
      username: "AdventureSeeker71",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionId: 3,
      reactionBody: "I'm not sure about that...",
      username: "Bookworm123",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionId: 4,
      reactionBody: "You're spot on!",
      username: "FitnessFanatic36",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionId: 5,
      reactionBody: "I have a different perspective.",
      username: "FoodieGuru67",
      createdAt: new Date().toISOString().split("T")[0]
  }
];

const thoughts = [
  {
      thoughtText: "This is a random thought #1.",
      createdAt: new Date().toISOString().split("T")[0],
      username: "CoolCat123",
      reactions: [reactions[0], reactions[1]]
  },
  {
      thoughtText: "Just thinking about life and stuff...",
      createdAt: new Date().toISOString().split("T")[0],
      username: "GamerGirl27",
      reactions: [reactions[2], reactions[3]]
  },
  {
      thoughtText: "Technology is amazing! #TechGeek",
      createdAt: new Date().toISOString().split("T")[0],
      username: "TechGeek99",
      reactions: [reactions[4]]
  },
  {
      thoughtText: "Nature walks are so relaxing.",
      createdAt: new Date().toISOString().split("T")[0],
      username: "NatureLover42",
      reactions: []

  },
  {
      thoughtText: "Music is my escape from reality.",
      createdAt: new Date().toISOString().split("T")[0],
      username: "MusicManiac55",
      reactions: [reactions[2], reactions[4]]
  }
];

const users = [
  {
    username: "CoolCat123",
    email: "john.doe@example.com",
    thoughts: thoughts.filter(thought => thought.username === "CoolCat123").map(thought => ({
      thoughtText: thought.thoughtText,
      createdAt: new Date().toISOString().split("T")[0],
      username: thought.username
    })),
    friends: ["FoodieGuru67", "MusicManiac55", "GamerGirl27"]
  },
  {
    username: "GamerGirl27",
    email: "jane.smith@gmail.com",
    thoughts: thoughts.filter(thought => thought.username === "GamerGirl27").map(thought => ({
      thoughtText: thought.thoughtText,
      createdAt: new Date().toISOString().split("T")[0],
      username: thought.username
    })),
    friends: ["CoolCat123", "TechGeek99"]
  },
  {
    username: "TechGeek99",
    email: "bob.johnson@hotmail.com",
    thoughts: thoughts.filter(thought => thought.username === "TechGeek99").map(thought => ({
      thoughtText: thought.thoughtText,
      createdAt: new Date().toISOString().split("T")[0],
      username: thought.username
    })),
    friends: ["GamerGirl27", "CoolCat123", "NatureLover42"]
  },
  {
    username: "NatureLover42",
    email: "emily.wilson@yahoo.com",
    thoughts: thoughts.filter(thought => thought.username === "NatureLover42").map(thought => ({
      thoughtText: thought.thoughtText,
      createdAt: new Date().toISOString().split("T")[0],
      username: thought.username
    })),
    friends: ["AdventureSeeker71"]
  },
  {
    username: "MusicManiac55",
    email: "david.anderson@outlook.com",
    thoughts: [],
    friends: ["CoolCat123", "GamerGirl27", "PizzaLover88"]
  },
  {
    username: "PizzaLover88",
    email: "susan.brown@aol.com",
    thoughts: [],
    friends: []
  },
  {
    username: "AdventureSeeker71",
    email: "mark.williams@example.org",
    thoughts: thoughts.filter(thought => thought.username === "AdventureSeeker71").map(thought => ({
      thoughtText: thought.thoughtText,
      createdAt: new Date().toISOString().split("T")[0],
      username: thought.username
    })),
    friends: ["PizzaLover88", "NatureLover42", "Bookworm123"]
  },
  {
    username: "Bookworm123",
    email: "linda.jones@gmail.com",
    thoughts: [],
    friends: ["AdventureSeeker71", "TechGeek99"]
  },
  {
    username: "FitnessFanatic36",
    email: "james.miller@yahoo.com",
    thoughts: [],
    friends: ["Bookworm123", "NatureLover42", "GamerGirl27"]
  },
  {
    username: "FoodieGuru67",
    email: "sarah.davis@hotmail.com",
    thoughts: [],
    friends: ["CoolCat123"]
  }
];

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }


  // // Create empty array to hold the students
  // const students = [];

  // // Loop 20 times -- add students to the students array
  // for (let i = 0; i < 20; i++) {
  //   // Get some random assignment objects using a helper function that we imported from ./data
  //   const assignments = getRandomAssignments(20);

  //   const fullName = getRandomName();
  //   const first = fullName.split(' ')[0];
  //   const last = fullName.split(' ')[1];
  //   const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

  //   students.push({
  //     first,
  //     last,
  //     github,
  //     assignments,
  //   });
  // }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts);

  // Add courses to the collection and await the results
  // await Course.collection.insertOne({
  //   courseName: 'UCLA',
  //   inPerson: false,
  //   students: [...students],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});


// const users = [
//   {
//       username: "CoolCat123",
//       email: "john.doe@example.com",
//       thoughts: [
//         {
//             thoughtText: "This is a random thought #1.",
//             createdAt: new Date().toISOString().split("T")[0],
//             username: "CoolCat123"
//         },
//         {
//             thoughtText: "Just thinking about life and stuff...",
//             createdAt: new Date().toISOString().split("T")[0],
//             username: "CoolCat123"
//         },
//       ],
//       friends: ["FoodieGuru67","MusicManiac55", "GamerGirl27" ]
//   },
// ];



// // Get a random item given an array
// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // Gets a random full name
// const getRandomName = () =>
//   `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// // Function to generate random assignments that we can add to student object.
// const getRandomAssignments = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       assignmentName: getRandomArrItem(appDescriptions),
//       score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
//     });
//   }
//   return results;
// };

// // Export the functions for use in seed.js
// module.exports = { getRandomName, getRandomAssignments };
