"use strict";
const fetch = require('node-fetch');

function home(req, res, next) {
  // Initial visit: only show the form, no fish
  res.render("home", {
    title: "Home",
    user: req.user,
    fish: null,
    error: null
  });
}

async function searchFish(req, res) {
  const query = req.query.q?.toLowerCase().trim();

  if (!query) {
    return res.redirect("/home");
  }

  const url = `https://fish-species.p.rapidapi.com/fish_api/fish/${query}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'fish-species.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Fish not found: ${query}`);
    }

    const fishArray = await response.json();
    const fish = fishArray[0];

    // console.log("API response for fish:", JSON.stringify(fish, null, 2));
    res.render("home", {
      title: "Fish Search",
      user: req.user,
      fish,
      query,
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render("home", {
      title: "Fish Search",
      user: req.user,
      fish: null,
      error: `No data found for "${query}". Please try another fish name.`
    });
  }
}

module.exports = {
  home,
  searchFish
};
