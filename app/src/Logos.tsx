import React from 'react';
import Logo from './Logo';
import './Logos.css';

const Logos: React.FC = () => {
    return (
        <div className="logos">
            <Logo />
            <Logo />
            <Logo />
        </div>
    );
};

export default Logos;
