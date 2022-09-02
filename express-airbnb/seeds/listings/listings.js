const listingsJson = require("./listings.json");
const listingModel = require("../../models/listing");

const createListings = async () => {
    await listingModel.deleteMany({})
    await listingModel.create(listingsJson);

    console.log(`Created listingss`);
};

// const addCreatedByField = async () => {
//     await listingModel.updateMany(
//         {}, 
//         { $set: { created_by: " "} },
//         { new: true }
//     )

// console.log("addCreatedByField")
// };

module.exports = createListings ();
