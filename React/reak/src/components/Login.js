import React, { useState, useEffect } from "react";
const Login = () => {
    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                name="email"
                required />

            <input
                type="password"
                placeholder="Password"
                name="password"
                required />
        </div>
    );
}

export default Login;