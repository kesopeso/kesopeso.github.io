import React from 'react';
import { Pages } from './App';
import './Menu.css';
import logoSrc from './gop.jpg';
import classNames from 'classnames';

export interface MenuItemProps {
    href: string;
    text: string;
    page: Pages;
    active: boolean;
    onChange: (page: Pages) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, text, page, active, onChange }) => {
    const onItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, page: Pages) => {
        e.preventDefault();
        onChange(page);
    };

    const menuItemClasses = classNames('menu__item', {
        'menu__item--active': active,
    });

    return (
        <a href={href} className={menuItemClasses} onClick={(e) => onItemClick(e, page)}>
            {text}
        </a>
    );
};

export interface MenuProps {
    activePage: Pages;
    onChange: (page: Pages) => void;
}

const Menu: React.FC<MenuProps> = ({ activePage, onChange }) => {
    return (
        <div className='menu-wrapper'>
            <div className='header-logo'>
                <img
                    className='header-logo__img'
                    src={logoSrc}
                    title='$GoP - Game of Presidents'
                    alt='$GoP - Game of Presidents'
                />
                <h1 className='header-logo__title'>$GoP - Game of Presidents</h1>
            </div>

            <div className='menu'>
                <MenuItem
                    text='Calculator'
                    href='#calculator'
                    active={activePage === Pages.CALCULATOR}
                    page={Pages.CALCULATOR}
                    onChange={onChange}
                />
                <MenuItem
                    text='Simulator'
                    href='#simulator'
                    active={activePage === Pages.SIMULATOR}
                    page={Pages.SIMULATOR}
                    onChange={onChange}
                />
                <MenuItem
                    text='Logos'
                    href='#logos'
                    active={activePage === Pages.LOGOS}
                    page={Pages.LOGOS}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Menu;
