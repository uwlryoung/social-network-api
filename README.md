# Social Network API
![License](https://img.shields.io/badge/License-MIT_License-blue.svg)
  
  ## Description
  A backend database for a social network where you can add/update/delete users, add/update/delete user thoughts, add/delete thought reactions, and add/remove users as friends. 
  
  ## Table of Contents 
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [How to Contribute](#how-to-contribute)
  - [License](#license)
  - [How to Test](#how-to-test)
  - [Questions](#questions)
  - [Challenges and Future Improvements](#challenges-and-future-improvements)

  ## Installation
  - Clone or fork from github. See [github](#questions). 
  - Install [MongoDB](https://www.mongodb.com/). (Recommended: install [MongDB Compass](https://www.mongodb.com/products/tools/compass), as well, to interact with the database locally).
  - Install an API interface, such as [Insomnia](https://insomnia.rest/) to interact with the database (making HTTP requests).
  - Run `npm i` in a terminal in the root folder of the project to install all required dependencies ([Express](https://expressjs.com/), [Mongoose](https://mongoosejs.com/), [Nodemon](https://www.npmjs.com/package/nodemon))

  ## Usage
  1. Start the server and create the database by running `npm run dev` in a terminal in the root folder of the project. 
  
  2. Add data (users, thoughts, reactions, friend connections) to the database by using an API interface and making HTTP requests.

  Note: There is a seed.js file in the repository, but it is currently not working. You will have to add your own information little by little making HTTP requests. 

  See [video demonstration](https://drive.google.com/file/d/1yClFN_xV6OSxzsJaP1MMUgwoIu71O0rx/view?usp=drive_link) for all possible HTTP requests. 

  ### HTTP Routes
  **GET Routes**
  - All users: `.../api/users`
  - Single user: `.../api/users/:userId`
  - All thoughts: `.../api/thoughts`
  - Single thought: `.../api/thoughts/:thoughtId`

  **POST Routes**
  - Create user: `.../api/users`
  
    Example Request Body:
    
        {
          "username": "user123"
          "email": "user123@gmail.com"
        }
  - Create thought: `.../api/thoughts`
  
    Example Request Body:
    
        {
          "thoughtText": "Sample Text!",
          "username": "user123",
          "userId": "6511872b31b377e1d44a4640"
        }
  - Create reaction: `.../api/thoughts/:thoughtId/reactions`
  
    Example Request Body:
    
        {
          "reactionBody": "Reaction Text!",
          "username": "test123"
        }
  - Add Friend: `.../api/:userId/friends/:friendId`
    - Note: This adds both user and friend to each other's friend lists. No request body needed.

  **PUT Routes**
  - Update User: `.../api/users/:userId`
    
    Example Request Body:
    
        {
          "username": "user321",
          "email": "user321@yahoo.com"
        }
    - Note: If you only want to change one field, leave it out of the request (e.g., if you only want to change the username, leave out the 'email' field)
  - Update Thought: `.../api/thoughts/:thoughtId`

    Example Request Body: 

        {
          "thoughtText": "This is a thought"
        }
  **DELETE Routes**
  - Delete user: `.../api/users/:userId`
  - Delete thought: `.../api/thoughts/:thoughtId`
  - Delete Reaction: `.../api/thoughts/:thoughtId/reactions`
    
    Example Request Body: 

        {
          "reactionId": "a183mn3ad83al331"
        }
  - Remove Friend `.../api/:userId/friends/:friendId`
    -  Note: This removes both user and friend from each other's friend lists. No request body needed.

  ## Credits
  N/A

  ## How to Contribute
  Fork the project and add changes. All changes will be approved. 

   ## How to Test
  Start the server and run many different [HTTP Requests](#http-routes). 

  ## License 
  Social Network API is covered under the MIT License.

  ## Questions
  [GitHub Profile](https://github.com/uwlryoung)

  If you have any questions, feel free to email uwlryoung@gmail.com

  ## Challenges and Future Improvements 
  - When updating a user's username, it automatically changes all the thoughts' username field to the updated username (it currently keeps the old username).
  - Add a 'followers' section, which is like friends, except it's only one way (that is, you can follow a user, but they don't have to follow you back).   
  - Make a functioning seed.js file so developers can test the database immediately rather than adding info little by little.