import React, { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext"

// pages and components
import Header from "../components/Header"
import Blog from "../components/Blog"
import PostDetails from "../components/PostDetails"

const Home = () => {
  const { posts, dispatch } = usePostsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_POSTS', payload: json })
      }
    }

    if (user) {
      fetchPosts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="posts">
        <Header />
          
        {posts && posts.map((post) => (
          <PostDetails key={post._id} post={post} />
        ))}
      </div>

      <Blog />
    </div>
  )
}

export default Home;