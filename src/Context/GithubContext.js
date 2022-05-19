import {createContext, useState} from 'react'

const GithubContext = createContext('')
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
export const GithubProvider = ({children}) => {
  const [users, setUsers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  
  const fetchUsers = async () => {
    await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    }).then(res => res.json()).then(
      (result) => {
        setIsLoaded(true);
        setUsers(result)
      },
      (error) => {
        console.log(error)
        setIsLoaded(true);
      }
    )
  }
  
  return (
    <GithubContext.Provider value={{
      users,
      isLoaded,
      fetchUsers
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
