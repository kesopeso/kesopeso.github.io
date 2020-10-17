import React from 'react';
import Logo from './Logo';
import logoOneSrc from './gop-logo-1.jpg';

const Logos: React.FC = () => {
    return (
        <div className="logos">
            <Logo src={logoOneSrc} description="My version of $GoP logo" />
            <Logo />
        </div>
    );
};

export default Logos;
