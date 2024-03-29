const api = (route, is_classifier = false) => {
  if (!is_classifier) {
    return `/api/${route}`;
  } else {
    return `https://tweet-analyser-server.onrender.com/${route}`;
  }
};

const getWelcome = async () => {
  try {
    const welcomeNotes = await fetch(api("welcome"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return welcomeNotes.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getHousewivesInfo = async () => {
  try {
    const housewivesInfo = await fetch(api("housewivesInfo"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return housewivesInfo.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getUsers = async () => {
  try {
    const users = await fetch(api("users"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return users.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getUser = async (username) => {
  try {
    const user = await fetch(api(`user?username=${username}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return user.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getTweets = async (username) => {
  try {
    const tweets = await fetch(api(`/tweets?username=${username}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return tweets.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getSetup = async (username) => {
  try {
    const setup = await fetch(api("setup", true), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: username,
      }),
    });

    return setup.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getClassification = async (parameters) => {
  try {
    const classification = await fetch(api("classify", true), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(parameters),
    });

    return classification.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {
  getClassification,
  getHousewivesInfo,
  getTweets,
  getUser,
  getUsers,
  getWelcome,
  getSetup
};
