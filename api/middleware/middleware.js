const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date();

  console.log(
    `[${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}] ${req.method} to ${req.url}`
  );

  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id)
    .then(user => {
      if(user) {
        console.log(user)
        req.user = user
        next()
      } else {
        next({ message: 'user not found', status: 404})
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};