import React from 'react';
import { Link } from "react-router-dom";

const Card = ({ name, department, occupation, age, description, gender, imageUrl }) => {


    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-6 bg-white transform transition-all duration-300 hover:scale-105">
            {imageUrl && (
                <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    src={imageUrl}
                    alt={`${name}'s profile`}
                />
            )}
            <div className="p-4">
                <div className=" mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          
                    <p className="text-gray-500">{department}</p>
                    <p className="text-gray-500">{occupation} </p>
                </div>
                <Link to="/chatbot">
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Card;
