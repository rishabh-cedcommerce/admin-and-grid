import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { TextField, Button, Card } from '@shopify/polaris';


function LogIn() {
    let navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");

    const handleUserNameChange = useCallback((newValue) => setUserName(newValue), []);
    const handlePasswordChange = useCallback((newValue) => setPass(newValue), []);

    const NavigateToDashboard=()=>navigate("/dashboard");

    function handleLogIn() {
        if (validate() == true) {
            fetch(`https://fbapi.sellernext.com/user/login?username=${userName}&password=${pass}`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA',
                    'Content-Type': 'application/json'
                },

            }).then((response) => response.json()).then((result) => {
                if (result.success == true) {
                    setUserName("");
                    setPass("");
                    localStorage.setItem("AuthToken", JSON.stringify(result.data.token));
                    // navigate("/dashboard");
                    NavigateToDashboard()
                }
                else {
                    console.log("Something went wrong!", result.message);
                }
            })
        }
        else {
            alert("Some fields are missing");
        }
    }

    function validate() {
        if (userName.length == 0 || pass.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <Card sectioned title="LogIn">
            <TextField
                label="Username"
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                autoComplete="email"
            />

            <TextField
                label="Password"
                type="password"
                value={pass}
                onChange={handlePasswordChange}
                autoComplete="password"
            />

            <Button onClick={handleLogIn}>LogIn</Button>

        </Card>
    );
}

export default LogIn;