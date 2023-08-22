const googleAPI = require('googleapis');
const { GOOGLE_API_KEY, SEARCH_ENGINE_ID } = require('../../config/config.js');

const customSearch = googleAPI.google.customsearch("v1");

async function getMapImage(mapName) {
  console.log("Searching new rl map img")
  return "https://static.wikia.nocookie.net/rocketleague/images/e/e1/Champions_Field_arena_preview.png" // for tests
  let res = {};
  try {
    res = await customSearch.cse.list({
      auth: GOOGLE_API_KEY,
      cx: SEARCH_ENGINE_ID,
      searchType: "image",
      q: `${mapName} rocket league map`,
      num: 1,
    });
    const mapImage = res.data.items[0].link
    return mapImage.substring(0, (mapImage.indexOf('.png') || mapImage.indexOf('.jpg')) + 4);
  } catch (err) {
    console.log(`Error setting new map image: ${err}`);
  }
}

module.exports = {
  getMapImage
};
