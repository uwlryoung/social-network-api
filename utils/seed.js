const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { db } = require('../models/User');

const reactions = [
  {
      reactionBody: "I totally agree!",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "Interesting point of view.",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "I'm not sure about that...",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "You're spot on!",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "I have a different perspective.",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "Nope. Just nope!",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "This is the most fabulous idea!",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "I mean... that's an understatement",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "Can it be true? It must be true!",
      createdAt: new Date().toISOString().split("T")[0]
  },
  {
      reactionBody: "Whatevs.",
      createdAt: new Date().toISOString().split("T")[0]
  }
];

const thoughts = [
  {
      thoughtText: "This is a random thought #1.",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "Just thinking about life and stuff...",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "Technology is amazing! #TechGeek",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "Nature walks are so relaxing.",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "Music is my escape from reality.",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "This is a random thought #2.",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "I think the world is actually large, not small.",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "Birds are real. Put a bird on it",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  },
  {
      thoughtText: "I walk a lonely road. Do you walk it too?",
      createdAt: new Date().toISOString().split("T")[0],
      username:""

  },
  {
      thoughtText: "Try as I may, I cannot convince my cat to pay my bills.",
      createdAt: new Date().toISOString().split("T")[0],
      username:""
  }
];

const users = [
  {
    username: "CoolCat123",
    email: "john.doe@example.com",
  },
  {
    username: "GamerGirl27",
    email: "jane.smith@gmail.com",
  },
  {
    username: "TechGeek99",
    email: "bob.johnson@hotmail.com",
  },
  {
    username: "NatureLover42",
    email: "emily.wilson@yahoo.com",
  },
  {
    username: "MusicManiac55",
    email: "david.anderson@outlook.com",
  },
  {
    username: "PizzaLover88",
    email: "susan.brown@aol.com",
  },
  {
    username: "AdventureSeeker71",
    email: "mark.williams@example.org",
  },
  {
    username: "Bookworm123",
    email: "linda.jones@gmail.com",
  },
  {
    username: "FitnessFanatic36",
    email: "james.miller@yahoo.com",
  },
  {
    username: "FoodieGuru67",
    email: "sarah.davis@hotmail.com",
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

  // Add users to the collection and await the results
  const userList = await User.collection.insertMany(users);
  for (let thought in thoughts){
    thought.username = userList[Math.floor(Math.random() * userList.length)].username;
  }

  // Add thoughts to the collection and await the results
  const thoughtList = await Thought.collection.insertMany(thoughts);
    // .then(Thought.collection.insertMany(reactions));
  // Thought.collection.insertMany(reactions);
  // await thought
  // for (let thought in thoughtList){
  //   const user = userList.find(u => u.username === thought.username);
  //   user.thoughts.push(thought._id);
  //   await user.save();
  // }

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});


