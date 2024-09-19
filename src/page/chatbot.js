import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatComponent from '../component/chatComp.js';
import { Link } from "react-router-dom";

const Chatbot = () => {
    const navigate = useNavigate();
    const [day, setDay] = useState(1);
    const inputRef = useRef(null); // Create a ref for the input element

    const handleNextDay = () => {
        setDay(prevDay => prevDay + 1);
        if (inputRef.current) {
            inputRef.current.focus(); // Focus the input element when the day changes
        }
    };

    return (
        <div className="p-4">
            <div className="flex items-center space-x-4">
                <p>
                    Day : {day}
                </p>
                <button
                    onClick={handleNextDay}
                    className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
                >
                    Next Day
                </button>
            </div>
            <div 
            >
                <Link to ="/stats">
                <button className="mt-4 bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded">
                   Statistical Summary
                </button>
                </Link>
            </div>
            <ChatComponent day={day} inputRef={inputRef} /> {/* Pass the ref to ChatComponent */}
        </div>
    );
};

export default Chatbot;