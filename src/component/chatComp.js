import React, { useState, useEffect, useRef } from 'react';

const ChatComp = ({ day, inputRef, setCounter, counter }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const payload = {
        "messages": [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You are an assistant meant to help students at various universities mentally by learning about their situation based on questions and at the end providing helpful insights and recommendations based on the student's context and answers to your generated questions. This is John and his context is as follows:\nJohn Smith is a 20-year-old male embarking on his academic journey as a first-year student in the Department of Computer Science at University College London (UCL). His passion for technology and innovation drives him to excel in his studies, focusing on subjects such as algorithms, data structures, and software development. However, John's transition into university life has been fraught with challenges, both academic and personal, which have impacted his overall experience.\nAdjusting to the bustling and diverse environment of London has been particularly tough for John. Coming from a significantly different background, he struggles with accommodation issues and cultural differences, finding it hard to settle into the fast-paced life of the city. These personal struggles are compounded by his academic pressures, where the demanding curriculum occasionally overwhelms him. To add to his challenges, John recently faced a setback when his bike, which was his primary mode of transportation around the city, was stolen. This loss not only added a logistical problem but also a financial burden, as he now needs to explore alternative and potentially more expensive commuting options. Despite these obstacles, John is determined to persevere, drawing on his resilience and the support from university resources to navigate through his first year successfully."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Hello! This is the start of a new day."
                    }
                ]
            },
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": "Good morning! How are you feeling today?"
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "I am feeling a bit depressed since I got a low grade on one of my computer science courseworks and I do not know why."
                    }
                ]
            },
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": "Oh no! On a scale of 1 to 10, how important was the specific coursework and how much does it count towards your final year average?"
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "I would say 9. It was a very important coursework and as a result it will tank my final average by a lot and I will have to compensate by getting near perfect scores on my other courses."
                    }
                ]
            },
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": "Oh, I can understand your sadness. How many times per day do you go out with friends or to exercise?"
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "I rarely go out, almost never since I always read and do my homework. I would like to end this session here as well."
                    }
                ]
            },
            {
                "role": "assistant",
                "content": [
                    {
                        "type": "text",
                        "text": "Alright, no worries! Based on what you said the best course of action would be to go out more often, organise your tasks and study with flash cards for better learning."
                    }
                ]
            },

        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "max_tokens": 2000
    }

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
            setLoading(true); // Set loading to true when sending a message

            if (counter === 2) {
                messages += " I want to end this session."
            }

            payload.messages.push({
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "The user said: '" + messages + "', ask another relevant question to help you understand his mood unless he specifically says that he wishes to end the session"
                    }
                ]
            });

            // Simulate sending a message and getting a response
            fetch('https://hackathonaistu9861472187.openai.azure.com/openai/deployments/my-first-hackathon-gpt-4/chat/completions?api-version=2024-02-15-preview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "api-key": "9daef230c2df4e57806d6b3e4fd84dfe",
                    "Access-Control-Allow-Origin": "*",

                },
                body: JSON.stringify(
                    payload
                )
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    setMessages(prevMessages => [...prevMessages, data.choices[0].message.content]);
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

    // useEffect(() => {
    //     // Clear messages when day changes
    //     setMessages([]);

    //     // Fetch new data for the new day
    //     setLoading(true); // Set loading to true when starting the fetch
    //     fetch('https://hackathon.mesh-uat.ucl.ac.uk/pma/v0.2/chatai/', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "response": "`Good afternoon",
    //             "counter": counter,
    //             "day": day
    //         })
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok ' + response.statusText);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setMessages([data.response]);
    //             setLoading(false); // Set loading to false after receiving the response
    //             setCounter(prevCounter => prevCounter + 1);
    //         })
    //         .catch(error => {
    //             console.error('There was a problem with the fetch operation:', error);
    //             setLoading(false); // Set loading to false in case of error

    //         });

    // }, [day, counter]);

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