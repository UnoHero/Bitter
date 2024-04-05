const Post = require('../models/postModel')
const mongoose = require('mongoose')

// get all post
const getPosts = async (req, res) => {
  const user_id = req.user.user_id

  const posts = await Post.find({user_id}).sort({createdAt: -1})

  res.status(200).json(posts)
}

// get a single post
const getPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "No such post"})
  }

  const post = await Post.findById(id)

  if (!post){
    return res.status(400).json({ error: 'No such post found' })
  }

  res.status(200).json(post)
}

// create new post
const createPost = async (req, res) => {
  const { title, author, body } = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push("title")
  }
  if(!author) {
    emptyFields.push("author")
  }
  if(!body) {
    emptyFields.push("body")
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields })
  }

  // add doc to DB
  try {
    const post = await Post.create({title, author, body})
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// deleta a post
const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such post"})
  }

  const post = await Post.findOneAndDelete({_id: id})

  if (!post) {
    return res.status(400).json({error: "No such post"})
  }

  res.status(200).json(post)
}

// update a post
const updatePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such post"})
  }

  const post = await Post.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!post) {
    return res.status(400).json({error: "no Such post"})
  }

  res.status(200).json(post)
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
}