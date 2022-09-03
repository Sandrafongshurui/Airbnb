//const listingsJson = require("./listings.json");
const listingsJson = require("./data.json");
const listingModel = require("../../models/listing");

const createListings = async () => {
    await listingModel.deleteMany({})
    await listingModel.create(listingsJson);

    console.log(`Created listingss`);
};

// const addCreatedByField = async () => {
//     await listingModel.updateMany(
//         {}, 
//         { $unset: { address : {address : 1} }},
//         { new: true }
//     )
// }
// console.log("addCreatedByField")
// };

const switchFields = (arr) => {
    arr.forEach(element => {
      let street = element.address.street
      let country = element.address.country
      let longtitude= element.address.location.coordinates[0]//long
      let latitude = element.address.location.coordinates[1]//lat
      let image = element.images[0].picture_url
    
      element.street = street
      element.country = country
      element.longtitude= longtitude
      element.latitude= latitude
      element.images_url.push(image) 
  
      //remove unwanted fields
      delete element.address
      delete element.images
    });
  
    createListings() 
  };
  
  //switchFields(listingsJson);


module.exports = switchFields(listingsJson);;
