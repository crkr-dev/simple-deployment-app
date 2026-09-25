import { useEffect, useState } from "react";

const API_URL = "/api";

function App() {
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users`);

            const data = await response.json();

            setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to create user");
                return;
            }

            setMessage("User created successfully!");

            setName("");
            setEmail("");

            fetchUsers();

        } catch (error) {
            console.error("Create user error:", error);
            setMessage("Something went wrong");
        }
    };

    return (
        <div>
            <h1>User Management</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <br />

                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Email</label>
                    <br />

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Add User
                </button>
            </form>

            <p>{message}</p>

            <hr />

            <h2>Users</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                users.map((user) => (
                    <div key={user._id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;