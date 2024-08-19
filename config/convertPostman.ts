import postmanToOpenApi from "postman-to-openapi";

const collections = ["ch6-synrgy-ansyarullah"];
const options = {
  defaultTag: "General",
  servers: [
    {
      url: "http://localhost:5000",
      description: "SYNRGY 7 Challenge 6 FSW 4 Ansyarullah",
    },
  ],
};

collections.forEach(async (collection) => {
  try {
    const collection_capitalize = collection.charAt(0) + collection.slice(1);

    const postmanCollection = `${__dirname.replace("config", "")}${collection_capitalize}.postman_collection.json`;

    const outputFile = `${__dirname.replace("config", "")}api-${collection}-docs.yaml`;

    await postmanToOpenApi(postmanCollection, outputFile, options);

    console.log(`Collection ${collection} berhasil diconvert.`);
  } catch (error) {
    console.log(error);
  }
});
