import {useState} from 'react';

export const RoundedBox = ({ children }) => {
    return (
        <div className="flex justify-center size-4 rounded-lg border-4 border-opacity-60 border-gray-300 gap-4 bg-black text-white group">
            {children}
        </div>
    );
};
