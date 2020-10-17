import React, { useCallback, useEffect, useState, useRef } from 'react';
import './Simulator.css';
import Vote from './Vote';
import gsap from 'gsap';
import './Winner';
import Winner from './Winner';

const resultsEmulation = [
    [0, 0, 0],
    [58, 42, 0],
    [53, 47, 0],
    [55, 45, 0],
    [53, 47, 0],
    [50, 50, 0],
    [49, 51, 0],
    [46, 54, 0],
    [47, 53, 0],
    [49, 51, 0],
    [51, 49, 0],
    [55, 45, 0],
    [61, 39, 0],
    [63, 37, 0],
    [67, 33, 0],
    [72, 28, 0],
    [69, 31, 0],
    [67, 33, 0],
    [65, 35, 0],
    [64, 36, 0],
    [62, 38, 0],
    [59, 41, 0],
    [56, 44, 0],
    [55, 45, 0],
    [57, 43, 0],
    [52, 48, 0],
    [49, 51, 0],
    [48, 52, 0],
    [51, 49, 0],
    [55, 45, 0],
    [53, 47, 0],
    [52, 48, 0],
    [49, 51, 0],
    [48, 52, 0],
    [53, 47, 0],
    [55, 45, 0],
    [52, 48, 0],
    [51, 47, 2],
    [49, 45, 6],
    [46, 42, 12],
    [44, 40, 16],
    [42, 38, 20],
    [40, 36, 24],
    [36, 33, 31],
    [32, 30, 38],
    [28, 26, 46],
    [23, 22, 55],
    [17, 17, 66],
    [11, 12, 77],
    [6, 6, 88],
    [0, 0, 100],
];

const useDaysCounter = () => {
    const [daysLeft, setDaysLeft] = useState(resultsEmulation.length - 1);
    const [isRunning, setIsRunning] = useState(false);

    const run = useCallback(() => setIsRunning(true), [setIsRunning]);
    const pause = useCallback(() => setIsRunning(false), [setIsRunning]);

    useEffect(() => {
        if (!isRunning || daysLeft === 0) {
            return;
        }

        const changeTimeoutId = setTimeout(() => {
            setDaysLeft((dL) => dL - 1);
        }, 100);

        return () => {
            clearTimeout(changeTimeoutId);
        };
    }, [daysLeft, setDaysLeft, isRunning]);

    const currentResults = resultsEmulation[resultsEmulation.length - daysLeft - 1];

    return {
        currentResults,
        daysLeft,
        run,
        pause,
    };
};

const useSimulator = (
    invitationRef: React.RefObject<HTMLDivElement>,
    graphRef: React.RefObject<HTMLDivElement>,
    gopVoteRef: React.RefObject<HTMLDivElement>,
    annoncementRef: React.RefObject<HTMLDivElement>,
    onShowWinner: () => void
) => {
    const animationRef = useRef<gsap.core.Timeline>();

    const { currentResults, daysLeft, run: runDaysCounter, pause: pauseDaysCounter } = useDaysCounter();

    useEffect(() => {
        if (
            !invitationRef.current ||
            !graphRef.current ||
            !annoncementRef.current ||
            !gopVoteRef.current ||
            !!animationRef.current
        ) {
            return;
        }

        animationRef.current = gsap
            .timeline()
            .to(invitationRef.current, {
                duration: 0.6,
                opacity: 0,
                scale: 1.5,
                transformOrigin: 'center',
                onComplete: () => {
                    gsap.set(invitationRef.current, { display: 'none' });
                },
                ease: '',
            })
            .from(graphRef.current, {
                delay: 0.3,
                duration: 0.6,
                opacity: 0,
                scale: 1.5,
                transformOrigin: 'center',
                display: 'none',
                onComplete: () => {
                    !!animationRef.current && animationRef.current.pause();
                    setTimeout(() => runDaysCounter(), 300);
                },
            })
            .from(annoncementRef.current, {
                display: 'none',
                opacity: 0,
                scale: 1.3,
                transformOrigin: 'center',
                duration: 0.6,
            })
            .to(annoncementRef.current, {
                delay: 2,
                opacity: 0,
                display: 'none',
                scale: 1.3,
                transformOrigin: 'center',
                duration: 0.6,
            })
            .from(gopVoteRef.current, {
                opacity: 0,
                duration: 0.6,
                scale: 1.5,
                transformOrigin: 'center',
                display: 'none',
                ease: 'power4.in',
                onComplete: () => {
                    !!animationRef.current && animationRef.current.pause();
                    setTimeout(() => runDaysCounter(), 300);
                },
            })
            .pause();
    }, [invitationRef, graphRef, gopVoteRef, annoncementRef, animationRef, runDaysCounter]);

    useEffect(() => {
        if (daysLeft !== 15 || !animationRef.current) {
            return;
        }
        pauseDaysCounter();
        animationRef.current.resume();
    }, [daysLeft, animationRef, pauseDaysCounter]);

    useEffect(() => {
        if (daysLeft !== 0) {
            return;
        }

        const winnerTimeoutId = setTimeout(() => {
            onShowWinner();
        }, 300);
        return () => {
            clearTimeout(winnerTimeoutId);
        };
    }, [daysLeft, onShowWinner]);

    const startSimulator = useCallback(() => !!animationRef.current && animationRef.current.resume(), [animationRef]);

    return { startSimulator, currentResults, daysLeft };
};

const Simulator: React.FC = () => {
    const invitationRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<HTMLDivElement>(null);
    const gopVoteRef = useRef<HTMLDivElement>(null);
    const announcementRef = useRef<HTMLDivElement>(null);

    const [showWinner, setShowWinner] = useState(false);
    const onShowWinner = useCallback(() => setShowWinner(true), [setShowWinner]);

    const { startSimulator, currentResults, daysLeft } = useSimulator(
        invitationRef,
        graphRef,
        gopVoteRef,
        announcementRef,
        onShowWinner
    );

    return (
        <>
            <div className='simulator-wrapper'>
                <div className='simulator-invitation' ref={invitationRef}>
                    <p className='simulator-invitation__text'>
                        Click and see what happened during this year's elections...
                    </p>
                    <button className='simulator-invitation__button' onClick={startSimulator}>
                        Show votes in time lapse
                    </button>
                </div>

                <div className='simulator-graph' ref={graphRef}>
                    <h2 className='simulator-graph__title'>Live voting results (days left: {daysLeft})</h2>

                    <Vote label='Donald Trump' percent={currentResults[0]} />
                    <Vote label='Joe Biden' percent={currentResults[1]} />
                    <Vote label='$GoP - Game of Presidents' percent={currentResults[2]} ref={gopVoteRef} />
                </div>

                <div className='simulator-new-candidate' ref={announcementRef}>
                    <h3 className='simulator-new-candidate__title'>Announcement!</h3>
                    <p className='simulator-new-candidate__text'>
                        Looks like we have another candidate joining the race!
                    </p>
                </div>
            </div>
            
            {showWinner && <Winner />}
        </>
    );
};

export default Simulator;
