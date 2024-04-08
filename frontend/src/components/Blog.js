import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const BlogContainer = styled.div`
  border: 2px solid #ccc;
  border-radius: 15px;
  padding: 20px;
  max-height: 80vh; /* Set maximum height */
  overflow-y: auto; /* Add vertical scrollbar if content exceeds the height */
`;

const PostTitle = styled.h2`
`;

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://10.12.3.172/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        // Truncate post bodies to 100 characters
        const truncatedPosts = data.map(post => ({
          ...post,
          body: post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body
        }));
        setPosts(truncatedPosts.slice(0, 5));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <BlogContainer>
        <PostTitle>Newest Posts</PostTitle>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>Author: {post.author}</p>
              <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
              <hr />
            </li>
          ))}
        </ul>
      </BlogContainer>
    </Container>
  );
};

export default Blog;
