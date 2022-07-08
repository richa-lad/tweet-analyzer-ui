const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
let port = process.env.PORT || 3000;
const get = util.promisify(request.get);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;


// gets profile image and id of users
const usersURL = (usernames) => {
    let baseURL = `https://api.twitter.com/2/users/by?usernames=${usernames}&user.fields=id,profile_image_url`;
    let usersURL = new URL(baseURL);
    return usersURL;
} 

// gets information on one user
const userURL = (username) => {
    let baseURL = `https://api.twitter.com/2/users/by?usernames=${username}&user.fields=id,name,username,profile_image_url`;
    let userURL = new URL(baseURL);
    return userURL;
} 

// gets tweets of a user
const tweetssURL = (username) => {
    let baseURL = `https://api.twitter.com/2/users/by?usernames=${username}&tweet.fields=id,text`;
    let tweetsURL = new URL(baseURL);
    return tweetsURL;
} 


const authMessage = {
  title: "Could not authenticate",
  details: [
    `Please make sure your bearer token is correct. 
      If using Glitch, remix this app and add it to the .env file`,
  ],
  type: "https://developer.twitter.com/en/docs/authentication",
};


app.get("/api/users", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage);
  }
  const token = BEARER_TOKEN;
  const requestConfig = {
    url: usersURL(req.query.users),
    auth: {
      bearer: token,
    },
    json: true,
  };

  try {
    const response = await get(requestConfig);

    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.message);
      }
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

app.get("/api/user", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(400).send(authMessage);
  }

  const token = BEARER_TOKEN;
  const requestConfig = {
    url: userURL(req.query.username),
    auth: {
      bearer: token,
    },
    json: req.body,
  };

  try {
    const response = await get(requestConfig);

    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.message);
      }
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

app.get("/api/tweets", async (req, res) => {
    if (!BEARER_TOKEN) {
      res.status(400).send(authMessage);
    }
  
    const token = BEARER_TOKEN;
    const requestConfig = {
      url: tweetssURL(req.query.username),
      auth: {
        bearer: token,
      },
      json: req.body,
    };
  
    try {
      const response = await get(requestConfig);
  
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }
  
      res.send(response);
    } catch (e) {
      res.send(e);
    }
});

console.log("NODE_ENV is", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
}

server.listen(port, () => console.log(`Listening on port ${port}`));