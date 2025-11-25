import React, { useEffect, useState } from 'react'
import './crud.css'

const Crud = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        age: ''
    })

    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("users");
        if (stored) {
            try {
                const parsedUser = JSON.parse(stored);
                setUsers(parsedUser)

            }
            catch (error) {
                console.log('error parsing data', error);
                localStorage.removeItem("users");//clear corrupt data

            }
        }
        setIsLoaded(true);

    }, [])

    // save users to local storage (whenever user changes. only after initial load)

    useEffect(() => {
        if (isLoaded) {    // only save after initial load is compeleted
            localStorage.setItem("users", JSON.stringify(users))

        }
    }, [users, isLoaded])

    const handleChange = (e) => {
        const { name, value } = e.target; //called every time a user types or changes a form field.

        setFormData(prev => ({
            ...prev,//uses spread operator to keep  other values unchanged
            [name]: value  //update formdata using the input's name as key & the value as the new value
        }))


    }

    const validate = () => {
        const newErrors = {};

        const { name, email, age } = formData;

        if (!name.trim()) newErrors.name = "Name is required!";
        else if (!/^[A-Za-z\s]*$/.test(name)) newErrors.name = "Name should only contain alphabets";

        if (!email) newErrors.email = "Email is required!";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Email is invalid";

        if (!age) newErrors.age = "Age is required!";
        else if (isNaN(age) || age < 1 || age > 120) newErrors.age = "Age must be between 1 and 120";

        return newErrors;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (editMode) {
            setUsers(users.map(user => user.id === formData.id ? formData : user));
            setEditMode(false);
        } else {
            const newUser = { ...formData, id: Date.now().toString() }
            setUsers([...users, newUser])
        }
        setFormData({
            id: '',
            name: '',
            email: '',
            age: ''
        });
        setErrors({});


    }


    return (
        <div className='formnew'>
            <h1>React - Crud</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text"
                        name='name'
                        value={formData.name}
                        placeholder='Name'
                        onChange={handleChange}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                {/* email */}


                <div>
                    <input type="Email"
                        name='email'
                        value={formData.email}
                        placeholder='email'
                        onChange={handleChange} />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                {/* age */}
                <div>
                    <input type="number"
                        name='age'
                        value={formData.age}
                        placeholder=' Your age'
                        onChange={handleChange} />
                    {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
                </div>

                <button type='submit'>{editMode ? 'update User' : 'Add User'}</button>
                {editMode && (
                    <button type='button'
                        style={{ marginLeft: '10px' }}>
                        cancel
                    </button>
                )}
            </form>

            {/* table design */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
            }}>
                <h2>User List</h2>
                {users.length > 0 && (
                    <button
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginLeft: '30px'
                        }}>
                        clear all data
                    </button>
                )}

            </div>
            {/* table design */}
            {users.length > 0 ? (
                <table>
                    <thead>
                        <>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>actions</th>
                        </>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button>Edit</button>
                                    <button style={{ marginLeft: '10px' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            ) : (
                <p> no user added yet</p>

            )}


        </div>
    )
}

export default Crud