const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
      .then(users => {
        res.status(200).json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.status(200).json(req.user)
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid <--! ValidateUser
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid <--! ValidateUser
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then((success) => {
      if(success) {
        res.status(200).json(req.user)
      } else {
        res.status(404).json('user with that specified id does not exist')
      }
    })
    .catch(next)

});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid <--! ValidateUser
});

router.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: 'gabecanyoureadmycodewhenitssuperbuncheduplikethis?'
  })
})

// do not forget to export the router
module.exports = router;