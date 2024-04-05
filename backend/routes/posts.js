const express = require('express')

const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// GET all posts
router.get("/", getPosts)

// POST a new post
router.post("/", createPost)

// require auth
router.use(requireAuth)

// Get a single post
router.get("/:id", getPost)



// DELETE a workout
router.delete("/:id", deletePost)

// UPDATE a workout
router.patch("/:id", updatePost)

module.exports = router;