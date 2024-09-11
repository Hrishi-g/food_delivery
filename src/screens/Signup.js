import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,[e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    location:user.location,
                }),
            });
            const json = await response.json();
            console.log(json);
            if(!json.success){
                alert("Enter valid Credentials");
            }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                        Current Location
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name='location'
                        value={user.location}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="m-3 btn btn-primary">
                    Submit
                </button>
                <Link to="/login" className="m-3 btn btn-danger">Already a User?</Link>
            </form>
        </div>
    );
}
