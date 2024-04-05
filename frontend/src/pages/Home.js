import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";

// pages and components
import Header from "../components/Header"
import Blog from "../components/Blog"

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Blog />
    </div>
  )
}