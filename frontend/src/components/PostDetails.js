import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PostDetails = ({ post }) => {
  const { dispatch } = usePostsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch("/api/posts" + post._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: "DELETE_POST", payload: json})
    }
  }
  return (
    <div className="post-details">
      <h4>{post.title}</h4>
      <p><strong></strong></p>
      
    </div>
  )
}

export default PostDetails;