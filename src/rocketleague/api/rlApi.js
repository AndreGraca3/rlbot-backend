const googleAPI = require("googleapis");
const { GOOGLE_API_KEY, SEARCH_ENGINE_ID } = require("../../config/config.js");

const customSearch = googleAPI.google.customsearch("v1");

async function getMapImage(mapName) {
  if (!mapName || typeof mapName !== "string") {
    throw new Error("Invalid map name");
  }

  console.log("Searching new map image for " + mapName);

  try {
    const res = await customSearch.cse.list({
      auth: GOOGLE_API_KEY,
      cx: SEARCH_ENGINE_ID,
      searchType: "image",
      q: `${mapName} rocket league map`,
      num: 1,
    });

    if (res.data.items && res.data.items.length > 0) {
      const mapImage = res.data.items[0].link;
      const imageExtensions = [".png", ".jpg"];

      let idx = -1;
      for (const ext of imageExtensions) {
        const extIdx = mapImage.lastIndexOf(ext);
        if (extIdx > idx) {
          idx = extIdx;
        }
      }

      if (idx !== -1) {
        return mapImage.substring(0, idx + 4);
      } else {
        throw new Error("Invalid image link");
      }
    } else {
      throw new Error("No image found");
    }
  } catch (err) {
    console.error(`Error setting new map image: ${err}`);
  }
}

module.exports = {
  getMapImage,
};
