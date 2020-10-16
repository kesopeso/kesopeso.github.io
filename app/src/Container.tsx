import React from 'react';
import './Container.css';
import classNames from 'classnames';

export enum ContainerBackground {
    PRIMARY,
    SECONDARY,
}

export interface ContainerProps {
    backgroundClass: ContainerBackground;
}

const Container: React.FC<ContainerProps> = ({ children, backgroundClass }) => {
    const containerBackgroundClasses = classNames('container__background', {
        'container__background--primary': backgroundClass === ContainerBackground.PRIMARY,
        'container__background--secondary': backgroundClass === ContainerBackground.SECONDARY,
    });

    return (
        <div className='container'>
            <div className={containerBackgroundClasses} />
            {children}
        </div>
    );
};

export default Container;
