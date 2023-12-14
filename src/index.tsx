import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { SubscriptionForm } from "./SubscriptionForm";
import "./styles/Common.css";
import "./styles/SubscriptionForm.css";
import "./styles/AboutappBlock.css";
import "./styles/PostCardBlock.css";


const domNode = document.getElementById('subscribe');
const root = createRoot(domNode);
root.render(
    <StrictMode>
        <SubscriptionForm />
    </StrictMode>
);

