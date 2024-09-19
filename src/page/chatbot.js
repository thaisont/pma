import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatComponent from '../component/chatComp.js';

const Chatbot = () => {
    const navigate = useNavigate();
    const [day, setDay] = useState(1);

    const handleNextDay = () => {
        setDay(prevDay => prevDay + 1);
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
            <ChatComponent day={day} />
        </div>
    );
};

export default Chatbot;