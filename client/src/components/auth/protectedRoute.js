import * as React from "react";
import { Redirect } from "react-router-dom";
import createBrowserHistory from 'history';

export default function ProtectedRoute({ accessToken, children }) {
    const history = require("history").createBrowserHistory()
    
    if (!accessToken) {
        return <Redirect to="/" />;
    }
    history.replace('/')
    return children;
};