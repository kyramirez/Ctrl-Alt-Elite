import { Listing } from "../models/user.js";

function getListings() {
  return Listing.find({});
}

function findListingById(id) {
  return Listing.findById(id);
}

function updateListingById(id, updatedData) {
  return Listing.findByIdAndUpdate(id, updatedData, { new: true });
}

function addListing(listingData) {
  const newListing = new Listing(listingData);
  return newListing.save();
}

export default {
  getListings,
  findListingById,
  updateListingById,
  addListing,
};
