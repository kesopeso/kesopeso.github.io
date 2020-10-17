import React from 'react';
import './Logo.css';

export interface LogoProps {
    src?: string;
    description?: string;
}

const Logo: React.FC<LogoProps> = ({ src, description }) => {
    const displayItem = !!src ? (
        <img src={src} className='logo__img' alt='logo' />
    ) : (
        <p className='logo__text'>To be done</p>
    );

    const titleText = description || 'Some Logo';

    return (
        <div className='logo-wrapper'>
            <div className='logo'>
                <h4 className='logo__title'>{titleText}</h4>
                <div className='logo__item'>{displayItem}</div>
            </div>
        </div>
    );
};

export default Logo;
