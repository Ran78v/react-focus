import React, { useRef, useEffect, useState } from 'react';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItemRefs = useRef([]);

    useEffect(() => {
        const handleKeyDown = event => {
            const { key } = event;
            const navItems = navItemRefs.current;

            if (isOpen && (key === 'ArrowDown' || key === 'ArrowUp')) {
                event.preventDefault();
                const currentIndex = navItems.findIndex(
                    ref => ref === document.activeElement
                );

                if (currentIndex !== -1) {
                    const nextIndex =
                        key === 'ArrowDown'
                            ? (currentIndex + 1) % navItems.length
                            : (currentIndex - 1 + navItems.length) %
                              navItems.length;
                    navItems[nextIndex].current.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleDropdown}>Toggle Dropdown</button>
            {isOpen && (
                <ul>
                    <li ref={ref => (navItemRefs.current[0] = ref)}>Item 1</li>
                    <li ref={ref => (navItemRefs.current[1] = ref)}>Item 2</li>
                    <li ref={ref => (navItemRefs.current[2] = ref)}>Item 3</li>
                    <li ref={ref => (navItemRefs.current[3] = ref)}>Item 4</li>
                    <li ref={ref => (navItemRefs.current[4] = ref)}>Item 5</li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
