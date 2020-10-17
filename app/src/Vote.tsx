import React, { useEffect, useRef } from 'react';
import './Vote.css';
import gsap from 'gsap';

export interface VoteProps {
    label: string;
    percent: number;
}

const useProgressAnimation = (progressBarRef: React.RefObject<HTMLDivElement>) => {
    const animationRef = useRef<gsap.core.Tween>();

    useEffect(() => {
        if (!progressBarRef.current || !!animationRef.current) {
            return;
        }

        animationRef.current = gsap.to(progressBarRef.current, {
            duration: 100,
            backgroundColor: 'green',
            paused: true,
        });
    }, [progressBarRef, animationRef]);

    return animationRef;
};

const useUpdateProgress = (percent: number, animationRef: React.MutableRefObject<gsap.core.Tween | undefined>) => {
    useEffect(() => {
        if (!animationRef.current) {
            return;
        }
        animationRef.current.seek(percent);
    }, [percent, animationRef]);
};

const Vote = React.forwardRef<HTMLDivElement, VoteProps>(({ label, percent }, voteRef) => {
    const progressRef = useRef<HTMLDivElement>(null);
    const animationRef = useProgressAnimation(progressRef);
    useUpdateProgress(percent, animationRef);

    return (
        <div className='vote-wrapper' ref={voteRef}>
            <div className='vote'>
                <label className='vote-label'>{label}</label>
                <div className='vote-percent'>
                    <div
                        ref={progressRef}
                        className='vote-percent__progress'
                        style={{ width: `${percent === 0 ? 1 : percent}%`, background: 'red' }}
                    />
                </div>
            </div>
        </div>
    );
});

export default Vote;
