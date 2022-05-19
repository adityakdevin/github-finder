import React, {useContext, useEffect} from 'react'
import GithubContext from '../../Context/GithubContext';
import Spinner from '../Shared/Spinner';
import UserItem from './UserItem';

function UserResults() {
  const {users, isLoaded, fetchUsers} = useContext(GithubContext)
  useEffect(() => {
    fetchUsers()
  }, [])
  if (isLoaded) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {
          users.map((user) => (
            <UserItem key={user.id} user={user}/>
          ))
        }
      </div>
    )
  } else {
    return (
      <Spinner/>
    )
  }
  
}

export default UserResults
