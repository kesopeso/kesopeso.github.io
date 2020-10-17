import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import logoSrc from './gop.jpg';
import './Winner.css';
import classNames from 'classnames';

const Winner: React.FC = () => {
    const [isWinnerVisible, setIsWinnerVisible] = useState(false);
    const [widthHeight, setWidthHeight] = useState<number[]>();

    useEffect(() => {
        const evtListener = () => {
            setWidthHeight([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', evtListener);
        evtListener();

        return () => {
            window.removeEventListener('resize', evtListener);
        };
    }, [setWidthHeight]);

    useEffect(() => {
        if (isWinnerVisible) {
            return;
        }
        const showWinnerTimeoutId = setTimeout(() => {
            setIsWinnerVisible(true);
        }, 500);

        return () => {
            clearTimeout(showWinnerTimeoutId);
        };
    }, [isWinnerVisible, setIsWinnerVisible]);

    if (!widthHeight) {
        return null;
    }

    const winnerClasses = classNames('winner', {
        'winner--visible': isWinnerVisible,
    });

    return (
        <>
            <Confetti width={widthHeight[0]} height={widthHeight[1]} />
            <div className={winnerClasses}>
                <p className='winner__announcement'>And the winner is...</p>
                <img className='winner__image' src={logoSrc} alt='$GoP - Game of Presidents' />
            </div>
        </>
    );
};

export default Winner;
