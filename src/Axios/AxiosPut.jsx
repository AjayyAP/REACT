import axios from "axios";
import React, { useState } from "react";

const AxiosPut = () => {
    const [userId, setUserId] = useState("");
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!userId || !newName || !newEmail) {
            setMessage("Please fill out all fields");
            return;
        }

        const updateData = { name: newName, email: newEmail };

        try {
            const response = await axios.put(
                `https://jsonplaceholder.typicode.com/users/${userId}`,
                updateData
            );

            console.log(response.data);
            setMessage("User updated successfully!");
        } catch (error) {
            console.error(error);
            setMessage("Error updating user");
        }
    };

    return (
        <div>
            <h2>Update User</h2>

            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="User ID to update"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="New name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <br /><br />

                <input
                    type="email"
                    placeholder="New email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <br /><br />

                <button type="submit">Submit</button>
            </form>

            <p>{message}</p>
        </div>
    );
};

export default AxiosPut;
