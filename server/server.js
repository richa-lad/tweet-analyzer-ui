const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
let port = process.env.PORT || 3001;
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
};

// gets information on one user
const userURL = (username) => {
  let baseURL = `https://api.twitter.com/2/users/by?usernames=${username}&user.fields=id,name,username,profile_image_url`;
  let userURL = new URL(baseURL);
  return userURL;
};

// gets tweets of a user
const tweetssURL = (username) => {
  let baseURL = `https://api.twitter.com/2/users/by?usernames=${username}&tweet.fields=id,text`;
  let tweetsURL = new URL(baseURL);
  return tweetsURL;
};

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

app.get("/api/welcome", (req, res) => {
  const response = [
    {
      title: "What does the RHOBH Text Analyser do?",
      content: "The Real Housewives of Beverly Hills Tweet Analyser (RHOBH-TA for short) uses your twitter handle to ingest your most recent tweets. Using a pre-trained Natural Language (NL) Machine Learning (ML) model, your tweets are analysed and compared to the tweets of some of your favourite Real Housewives. There are nine housewives in total - you'll be told which housewife you're most like, as well as the next top four."
    },
    {
      title: "How Does RHOBH-TA Work?",
      content: "Using the TwitterAPI, the tweets of 9 different housewives (Lisa Rinna, Sutton Stracke, Garcelle Beauvais, Kyle Richards, Denise Richards, Yolanda Hadid, Erika Jayne, Dorit Kemsley, and Crystal Minkoff) were collected. Attributes about these tweets such as the number of likes and retweets they received, whether or not it was a quote tweet, and how many views it received, were also collected. Tweets were vectorised using the Keras Tokenizer, and a Neural Network was constructed (also using Keras) which combines these vectorised tweets with the other features previosly mentioned. Once trained, the weights were saved so that they could be loaded again for prediction. Using FastAPI, an endpoint is provided that accepts the user's Twitter handle, loads the pre-trained model weights, and makes a prediciton for each of the user's most recent tweets. The housewife they are most like is defined as the most commonly classified housewife. The front-end has been built using ReactJS."
    },
  ];

  res.send(response);
});

let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

app.get("/api/housewivesInfo", (req, res) => {
  const response = {
    lisarinna : {
      name: "Lisa Rinna",
      bio: lorem,
    },
    KyleRichards: {
      name: "Kyle Richards",
      bio: lorem,
    },
    erikajayne: {
      name: "Erika Jayne",
      bio: lorem,
    },
    GarcelleB: {
      name: "Garcelle Beauvais",
      bio: lorem,
    },
    doritkemsley1: {
      name: "Dorit Kemsley",
      bio: lorem,
    },
    crystalsminkoff: {
      name: "Crystal Minkoff",
      bio: lorem,
    },
    DENISE_RICHARDS: {
      name: "Denise Richards",
      bio: lorem,
    },
    SuttonBStracke: {
      name: "Sutton Stracke",
      bio: lorem,
    },
    YolandaHadid: {
      name: "Yolanda Hadid",
      bio: lorem,
    },
  };

  res.send(response);
});

console.log("NODE_ENV is", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
