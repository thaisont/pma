import React, { useState, useEffect, useRef } from 'react';

const ChatComp = ({ day }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
            setLoading(true); 
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    useEffect(() => {
        // Clear messages when day changes
        setMessages([]);

        // Fetch new data for the new day
        setLoading(true); // Set loading to true when starting the fetch
        fetch('https://mywebsite.example/endpoint/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "response": "How are you",
                "counter": 0,
                "day": day
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
               
                setLoading(false); // Set loading to false when data is received
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false); // Set loading to false in case of an error
            });

    }, [day]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col absolute bottom-0 right-0 left-0">
            <div className={`flex-grow p-4 max-w-md ml-auto ${messages.length === 0 ? 'hidden' : 'flex flex-col-reverse'}`}>
                <div className="space-y-2 max-h-96 overflow-y-auto flex flex-col-reverse">
                    {messages.map((message, index) => (
                        <div key={index} className="p-2 bg-gray-100 rounded self-end mb-2">
                            {message}
                        </div>
                    ))}
                    {/* {loading && (
                        <div className="p-2 bg-gray-100 rounded self-end mb-2">
                            Loading...
                        </div>
                    )} */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="mt-auto p-4 bg-white shadow-md w-full">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-grow p-2 border rounded"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComp;