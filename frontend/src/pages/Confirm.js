import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory } from 'react-router';
import { Button, Form } from "semantic-ui-react";
import { FETCH_USER } from "../util/graphql";




function Confirm(props) {

    const token = props.match.params.token;
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const { loading, error, data } = useQuery(FETCH_USER,{
        variables:{
            userid: user.id
        }
    });
    const [confirmEmail] = useMutation(CONFIRM_EMAIL,
        {variables: {
            token
        }}
    )
    if(loading) return <div>Loading data</div>; 
    if(user && data.getUser.confirmed == true){
        let path = `/`; 
        history.push(path);
        
    }else if (data.getUser.confirmed == false){
        console.log(token);
    }
    console.log(token);
    return(
        <Button onClick={confirmEmail} >Add Todo</Button>
    )
}


const CONFIRM_EMAIL=gql `
mutation Confirm($token: String!){
  confirmEmail(token: $token)
  {
    username
    id
  }
}

`
export default Confirm;
