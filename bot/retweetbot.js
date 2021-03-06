// Our Twitter library
const Twit = require("twit");

// We need to include our configuration file
const twit = new Twit(require("./config.js"));

// This is the URL of a search for the latest tweets on the '#PrioritizeFamilySponsorship' hashtag.
const mediaArtsSearch = { q: "#PrioritizeFamilySponsorship", count: 100, result_type: "recent" };

// This function finds the latest tweet with the PrioritizeFamilySponsorship hashtag and retweets.
const retweetLatest = () => {
  twit.get("search/tweets", mediaArtsSearch, (error, data) => {
    // log out any errors and responses
    console.log(error, data);
    // If our search request to the server had no errors...
    if (!error) {
      // ...then we grab the ID of the tweet we want to retweetwit...
      let retweetId = data.statuses[0].id_str;
      // ...and then we tell Twitter we want to retweet it!
      twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
        if (response) {
          console.log(
            "Success! Check your bot, it should have retweeted something."
          );
        }
        // If there was an error with our Twitter call, we print it out here.
        if (error) {
          console.log("There was an error with Twitter:", error);
        }
      });
    }
    // However, if our original search request had an error, we want to print it out here.
    else {
      console.log("There was an error with your hashtag search:", error);
    }
  });
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour/half thereafter. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 30);