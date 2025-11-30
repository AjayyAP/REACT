import axios from 'axios';
import React, { useState } from 'react'

const AxiosDelete = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const handlDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
            console.log(response);
            setMessage(`User ID ${userId} deleted succrssfully`)
        } catch (error) {
            console.log(error);
            setMessage("Error deleting user")
        }
    }
    return (
        <div>
            <h2>Delete User</h2>
            <form onSubmit={handlDelete}>
                <input type="text"
                    placeholder='User ID'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)} /> <br /> <br />
                <button type='submit'>Delete</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default AxiosDelete