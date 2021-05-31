import { useQuery } from '@apollo/client';
import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import { FETCH_POSTS_QUERY } from './graphql';


function EditRoute({component: Component, ...rest}){
    const {user } = useContext(AuthContext);
    const {
        loading,
        error,
        data
      } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    console.log(data.getPosts);
  }
  if (loading) return <p>Loading...</p>;
  else{
      const post = data.getPosts.find(post => post.userid === user.id)
  
    return (
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to={`/posts/${post.userid}`}/>: <Component { ...props}/>
            }
            />
    )
        }
}

export default EditRoute;

