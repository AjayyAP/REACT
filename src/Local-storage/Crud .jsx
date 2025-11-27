import React, { useEffect, useState } from 'react';
import './crud.css';

const Crud = () => {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        age: ''
    });

    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Load users from localStorage on first render
    useEffect(() => {
        const stored = localStorage.getItem('users');
        if (stored) {
            try {
                setUsers(JSON.parse(stored));
            } catch {
                console.error("Corrupted localStorage data. Resetting...");
                localStorage.removeItem("users");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save users whenever they change after initial load
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, [users, isLoaded]);


    // Form input handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error on typing
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };


    // Validation logic
    const validate = () => {
        const newErrors = {};
        const { name, email, age } = formData;

        if (!name.trim()) newErrors.name = "Name is required";
        else if (!/^[A-Za-z\s]*$/.test(name)) newErrors.name = "Only alphabets allowed";

        if (!email) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";
        else if (!editMode && users.some(u => u.email === email))
            newErrors.email = "Email already exists";

        if (!age) newErrors.age = "Age is required";
        else if (isNaN(age) || age < 1 || age > 120)
            newErrors.age = "Age must be between 1 and 120";

        return newErrors;
    };


    // Add or Update User
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (editMode) {
            setUsers(users.map(u =>
                u.id === formData.id
                    ? { ...formData, age: Number(formData.age) }
                    : u
            ));
            setEditMode(false);
        } else {
            const newUser = {
                ...formData,
                id: Date.now().toString(),
                age: Number(formData.age)
            };
            setUsers([...users, newUser]);
        }

        // Reset form
        setFormData({ id: '', name: '', email: '', age: '' });
        setErrors({});
    };


    // Edit user
    const handleEdit = (user) => {
        setFormData(user);
        setEditMode(true);
    };


    // Cancel edit
    const handleCancel = () => {
        setFormData({ id: '', name: '', email: '', age: '' });
        setEditMode(false);
        setErrors({});
    };


    // Delete one user
    const handleDelete = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };


    // Clear all users
    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
            setUsers([]);
            localStorage.removeItem("users");
            handleCancel();
        }
    };


    return (
        <div className="formnew">
            <h1>React CRUD Application</h1>

            <form onSubmit={handleSubmit}>

                {/* Name */}
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Name"
                        onChange={handleChange}
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                {/* Age */}
                <div>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        placeholder="Age"
                        onChange={handleChange}
                    />
                    {errors.age && <p>{errors.age}</p>}
                </div>

                <button type="submit">
                    {editMode ? "Update User" : "Add User"}
                </button>

                {editMode && (
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                )}
            </form>



            <div className="user-list-header">
                <h2>User List</h2>
                {users.length > 0 && (
                    <button
                        className="danger"
                        onClick={handleClearAll}
                    >
                        Clear All Data
                    </button>
                )}
            </div>


            {/* Table */}
            <div className="table-container">
                {users.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <button type="button" onClick={() => handleEdit(user)}>
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="danger"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Users Added Yet</p>
                )}
            </div>
        </div>
    );
};

export default Crud;
