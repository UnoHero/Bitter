import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (userName, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch ("http://10.12.3.172/api/user/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ userName, password }) 
    })
    console.log(response.json);
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json))

      // update the auth context
      dispatch({type: "LOGIN", payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error}
}