import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProfileContainer = styled.div`
  width: 80%;
  max-width: 600px;
  border: 2px solid #ccc;
  border-radius: 15px;
  padding: 20px;
`;

const PostForm = styled.form`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    // Fetch user's posts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: newPost }), // Assuming only 'body' is required for a new post
      });
      if (!response.ok) {
        throw new Error("Failed to add new post");
      }
      // After successfully adding the new post, fetch user's posts again to update the list
      fetchPosts();
      // Clear the textarea after submission
      setNewPost("");
    } catch (error) {
      console.error("Error adding new post:", error);
    }
  };

  return (
    <Container>
      <ProfileContainer>
        <h2>My Profile</h2>
        <PostForm onSubmit={handleSubmit}>
          <TextArea
            placeholder="Write a new post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button type="submit">Post</Button>
        </PostForm>
        <h3>My Posts</h3>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </ProfileContainer>
    </Container>
  );
};

export default Profile;
