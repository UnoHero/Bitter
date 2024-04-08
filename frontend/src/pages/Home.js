import React, { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext"
import styled from "styled-components";
import { Link } from "react-router-dom";

// pages and components
import Header from "../components/Header"
import Blog from "../components/Blog"
import PostDetails from "../components/PostDetails"

const HelpBox = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: center;

  a {
    color: #333;
    text-decoration: none;
  }
`

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

      <HelpBox>
        <Link to="/help">Help</Link>
      </HelpBox>
      
    </div>
  )
}

export default Home;