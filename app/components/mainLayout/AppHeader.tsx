import React from 'react';
import styles from './AppHeader.module.css';
import Link from 'next/link';
const AppHeader: React.FC = () => {
    return (
        <header className={styles["app-header"]}>
            <Link href="/">
                <h1>App Header</h1>
            </Link>
        </header>
    );
};

export default AppHeader;