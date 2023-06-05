import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './List.module.css';

export default function List() {
    const linkRefs = useRef([]);
    const currentIndexRef = useRef(-1);
    const hasStarted = useRef(false);

    const products = [
        { name: 'iphone' },
        { name: 'Macbook' },
        { name: 'Apple Watch' },
        { name: 'Apple TV' },
    ];

    const handleClick = evt => {
        evt.preventDefault();
        const element = document.getElementById('iphone');
        element.focus();
    };

    useEffect(() => {
        const handleKeyDown = evt => {
            const { key } = evt;
            const linkItems = linkRefs.current;

            if (key === 'ArrowDown' || key === 'ArrowUp') {
                evt.preventDefault();
                let newIndex;
                if (key === 'ArrowOwn') {
                    if (!hasStarted.current) {
                        hasStarted.current = true;
                        newIndex = 0;
                    } else {
                        newIndex = currentIndexRef.current + 1;
                        if (newIndex >= linkItems.length) {
                            newIndex = 0;
                        }
                    }
                } else if (key === 'ArrowUp') {
                    if (!hasStarted.current) {
                        hasStarted.current = true;
                        newIndex = linkItems.length - 1;
                    } else {
                        newIndex = currentIndexRef.current - 1;
                        if (newIndex < 0) {
                            newIndex = linkItems.length - 1;
                        }
                    }
                }

                if (linkItems[newIndex]) {
                    setTimeout(() => {
                        linkItems[newIndex].focus();
                    }, 0);
                    currentIndexRef.current = newIndex;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <ul className={styles.list}>
            <li>
                <button onClick={handleClick}>Focus Test</button>
            </li>
            {products.map(product => (
                <li key={product.name}>
                    <NavLink
                        to='#'
                        id={product.name}
                        className={styles.navlink}>
                        <div className={styles['navlink-text__wrapper']}>
                            {product.name}
                        </div>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}
