import axios, { Axios } from 'axios';
import React, { useState } from 'react'
import { Await } from 'react-router-dom';

const AxiosPost = () => {



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) {

            setMessage('Both field are required');
            return;

        }
        const userData = { name, email }
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/users', userData);

            console.log(res.data);
            setMessage("user submitted sucessfully")

        }
        catch (error) {
            console.error(error);
            setMessage("Error submitting user")
        }
    }


    return (
        <div>
            <h2> submit user</h2>
            <form onSubmit={handlesubmit}>

                {/* name */}

                <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                <br /> <br />

                {/* email */}

                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /> <br />

                {/* message */}


                <button type='submit'> submit</button>






            </form>
            <p>
                {message}
            </p>
        </div>
    )
}


export default AxiosPost
