import React, { useState, useEffect, useRef } from 'react';

const ChatComp = ({ day, inputRef, setCounter, counter }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSend = () => {

    
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
            setLoading(true); // Set loading to true when sending a message

            // Simulate sending a message and getting a response
            fetch('https://hackathon.mesh-uat.ucl.ac.uk/pma/v0.2/chatai/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "response": "",
                    "counter": counter,
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
                    setMessages(prevMessages => [...prevMessages, data.response]);
                    setLoading(false); // Set loading to false after receiving the response
                    
                    
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    setLoading(false); // Set loading to false in case of error
                    setCounter(prevCounter => prevCounter + 1); 

                });
                // setState(function(prevCount) {
                //     return (prevCount + 1);
                // })
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
        fetch('https://hackathon.mesh-uat.ucl.ac.uk/pma/v0.2/chatai/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "response": "`Good afternoon",
                "counter": counter,
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
                setMessages([data.response]);
                setLoading(false); // Set loading to false after receiving the response
                setCounter(prevCounter => prevCounter + 1); 
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false); // Set loading to false in case of error
               
            });

    }, [day, counter]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Focus the input element when the component mounts
        }
    }, [inputRef]);

    return (
        <div className="flex flex-col absolute bottom-0 right-0 left-0">
            <div className={`flex-grow p-4 max-w-md ml-auto ${messages.length === 0 ? 'hidden' : 'flex flex-col-reverse'}`}>
                <div className="space-y-2 max-h-96 overflow-y-auto flex flex-col-reverse">
                    {messages.map((message, index) => (
                        <div key={index} className="p-2 bg-gray-100 rounded self-end mb-2">
                            {message}
                        </div>
                    ))}
                    {loading && (
                        <div className="p-2 bg-gray-100 rounded self-end mb-2">
                            Loading...
                        </div>
                    )}
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
                        ref={inputRef}
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