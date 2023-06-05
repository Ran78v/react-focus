import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderBar.module.css';
import ChevronDownIcon from '../Icons/ChevronDown/ChevronDown';

export default function HeaderBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navLinkRefs = useRef([]);
    const currentIndexRef = useRef(-1);
    const hasStarted = useRef(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    const toggleDropdown = evt => {
        evt.preventDefault();
        setIsDropdownOpen(prevState => {
            if (!prevState) {
                currentIndexRef.current = 0; // Set current index to 0 when opening the dropdown
            }
            return !prevState;
        });
    };

    useEffect(() => {
        const handleKeyDown = event => {
            const { key } = event;
            const navItems = navLinkRefs.current;

            if (isDropdownOpen && (key === 'ArrowDown' || key === 'ArrowUp')) {
                event.preventDefault();

                let newIndex;
                if (key === 'ArrowDown') {
                    if (!hasStarted.current) {
                        hasStarted.current = true;
                        newIndex = 0;
                    } else {
                        newIndex = currentIndexRef.current + 1;
                        if (newIndex >= navItems.length) {
                            newIndex = 0;
                        }
                    }
                } else if (key === 'ArrowUp') {
                    if (!hasStarted.current) {
                        hasStarted.current = true;
                        newIndex = navItems.length - 1;
                    } else {
                        newIndex = currentIndexRef.current - 1;
                        if (newIndex < 0) {
                            newIndex = navItems.length - 1;
                        }
                    }
                }

                if (navItems[newIndex]) {
                    setTimeout(() => {
                        navItems[newIndex].focus();
                    }, 0);
                    currentIndexRef.current = newIndex;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isDropdownOpen]);

    const renderedNavLinks = navLinks.map((link, index) => (
        <li key={index}>
            <NavLink
                ref={ref => (navLinkRefs.current[index] = ref)}
                to={link.path}
                className={styles['dropdown-navlink']}>
                {link.label}
            </NavLink>
        </li>
    ));

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.list}>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navlink} ${styles['navlink--active']}`
                                        : styles.navlink
                                }
                                ref={ref => (navLinkRefs.current[index] = ref)}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={toggleDropdown}
                            className={styles['dropdown-button-toggle']}>
                            Toggle Dropdown
                            <ChevronDownIcon />
                        </button>
                        {isDropdownOpen && (
                            <section className={styles['dropdown-section']}>
                                <ul>{renderedNavLinks}</ul>
                            </section>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
