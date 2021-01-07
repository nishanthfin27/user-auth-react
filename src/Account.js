import React,{useEffect, useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import { Paper } from '@material-ui/core'

const Account = (props) => {

    const [userDetails, setUserDetails] = useState({})
    const history = useHistory()

    const data = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        if(data) {
            axios.get('https://dct-user-auth.herokuapp.com/users/account',{
            headers: { 'x-auth' : data.token}
            })
            .then((response) => {
                const result = response.data
                setUserDetails(result)
            })
            .catch((err) => {
                alert(err.message)
            })
        } else {
            history.push("/login")
            swal("you need to login first")
        }
    },[])

    return (
        <div className='detailsDiv'>
            <Paper elevation={3}>
                <h2>Username - {userDetails.username && userDetails.username}</h2>
                <h2>Email - {userDetails.email && userDetails.email}</h2>
                <h2>Join Date - {userDetails.createdAt && userDetails.createdAt.slice(0,10)}</h2>
            </Paper>
        </div>
    )
}

export default Account
