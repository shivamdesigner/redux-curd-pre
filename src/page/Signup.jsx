import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authSlice";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.auth);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); dispatch(signupUser(formData)); };

    return (
        <div>
            <h2>Signup</h2>
            {success && <p>Signup successful! Please login.</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit" disabled={loading}>Signup</button>
            </form>
        </div>
    );
};

export default Signup;
