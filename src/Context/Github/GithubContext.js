import {createContext, useReducer} from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext('')
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos:[]
  }

  const [state, dispatch] =useReducer(githubReducer,initialState)
  
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text
    })
    setLoading()
    await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    }).then(res => res.json()).then(
      (result) => {
        dispatch({
          type:'GET_USERS',
          payload: result.items
        });
      }
    )
  }

  const getUserRepos = async (login) => {
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 50
    })
    setLoading()
    await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    }).then(res => res.json()).then(
      (result) => {
        dispatch({
          type:'GET_REPOS',
          payload: result
        });
      }
    )
  }

  const getUser = async (login) => {
    setLoading()
    await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    }).then(res => res.json()).then(
      (result) => {
        dispatch({
          type:'GET_USER',
          payload: result
        });
      }, (error) => {
        window.location ='/notfound'
      }
    )
  }
  
  const clearUsers = () => {
    dispatch({
      type:'CLEAR_USERS'
    });
  }

  const setLoading = () => {
    dispatch({
      type:'SET_ISLOADED'
    });
  }

  return (
    <GithubContext.Provider value={{
      users: state.users,
      user: state.user,
      repos:state.repos,
      loading:state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
