import { User } from "../models/user.js";

function getUsers(name) {
  let promise;
  if (name === undefined) {
    promise = User.find({});
  } else {
    promise = findUserByName(name);
  }
  return promise;
}

function addUser(user) {
  const userToAdd = new User(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return User.find({ name: name });
}

function findUserById(id) {
  return User.findById(id);
}

function delUserById(id) {
  return User.deleteOne({ _id: id });
}

export default {
  addUser,
  getUsers,
  findUserById,
  delUserById,
};
