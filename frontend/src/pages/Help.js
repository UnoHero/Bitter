import React, { useState } from "react";
import styled from "styled-components";

import Header from "../components/Header";

import HomePage from "../img/HomePage.png";
import YourPosts from "../img/YourPosts.png";
import LogInn from "../img/LogInn.png";
import SignUp from "../img/SignUp.png";

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GuideImage = styled.img`
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ExpandedImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExpandedImage = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

const Help = () => {
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (  
    <>
      <Header />
      <GuideContainer>
        <h2>Welcome to Bitter User Guide</h2>
        <h3>Home Page</h3>
        <GuideImage src={HomePage} alt="Home Page" onClick={() => handleImageClick(HomePage)} />
        <p>
          <strong>1. Header:</strong> The header section contains navigation links to various parts of the website.
        </p>
        <p>
          <strong>2. Posts:</strong> Scroll through the posts displayed on the home page. Each post typically contains a title, author, date, and content.
        </p>
        <p>
          <strong>3. Navigation:</strong> Use the navigation links in the header to explore different sections of the blog.
        </p>

        {/* Repeat the same pattern for other images */}
        {/* Your Posts */}
        <h3>Your Posts</h3>
        <GuideImage src={YourPosts} alt="Your Posts" onClick={() => handleImageClick(YourPosts)} />
        <p>
          <strong>1. Your Posts:</strong> Once logged in, you can access your own posts. This section displays all the posts authored by you.
        </p>
        <p>
          <strong>2. Delete:</strong> You have the option to delete your posts. Click on the corresponding buttons to perform these actions.
        </p>

        {/* Login Page */}
        <h3>Login Page</h3>
        <GuideImage src={LogInn} alt="Login Page" onClick={() => handleImageClick(LogInn)} />
        <p>
          <strong>1. Login:</strong> If you're a registered user, you can log in using your credentials. Enter your username and password to access your account.
        </p>
        <p>
          <strong>2. Sign Up:</strong> If you're new to the blog, you can sign up for an account. Click on the "Sign Up" link to create a new account.
        </p>

        {/* Sign Up Page */}
        <h3>Sign Up Page</h3>
        <GuideImage src={SignUp} alt="Sign Up Page" onClick={() => handleImageClick(SignUp)} />
        <p>
          <strong>1. Sign Up Form:</strong> Fill out the required information to create a new account. Provide a username, email, and password to register.
        </p>
        <p>
          <strong>2. Already have an account?</strong> If you already have an account, you can navigate back to the login page using the provided link.
        </p>

        {/* Expanded Image */}
        {expandedImage && (
          <ExpandedImageContainer onClick={handleCloseExpandedImage}>
            <ExpandedImage src={expandedImage} alt="Expanded Image" />
          </ExpandedImageContainer>
        )}
      </GuideContainer>
    </>
  );
}

export default Help;
