const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const { restart } = require('nodemon');


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

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
    Users.update(req.params.id, req.body)
      .then(updatedUser => {
        res.status(200).json(updatedUser)
      })
      .catch(next)
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

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  const { id } = req.params;

  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
    req.body.user_id = req.params.id

    Posts.insert(req.body)
      .then(newPost => {
        res.status(200).json(newPost)
      })
      .catch(next)
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