import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useAuthContext } from "../hooks/useAuthContext";

import Header from "../components/Header";

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

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PostItem = styled.li`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isUserPost ? "#f0f0f0" : "inherit")};
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://10.12.3.172/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      // Filter posts by the logged-in user's username
      const userPosts = data.filter((post) => post.author === user.userName);
      setPosts(userPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://10.12.3.172/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title: newTitle,
          body: newPost,
          author: user.userName,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add new post");
      }
      fetchPosts();
      setNewTitle("");
      setNewPost("");
    } catch (error) {
      console.error("Error adding new post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://10.12.3.172/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <ProfileContainer>
          <h2>My Posts</h2>
          <PostForm onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
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
              <PostItem
                key={post._id}
              >
                <PostInfo>
                  <div>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                  </div>
                  <div>
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                    {post.author === user.userName && (
                      <DeleteButton onClick={() => handleDelete(post._id)}>
                        Delete
                      </DeleteButton>
                    )}
                  </div>
                </PostInfo>
              </PostItem>
            ))}
          </ul>
        </ProfileContainer>
      </Container>
    </>
  );
};

export default Profile;
