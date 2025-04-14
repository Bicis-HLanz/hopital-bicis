import React from 'react';
import styles from './AppHeader.module.css';
const AppHeader: React.FC = () => {
    return (
        <header className={styles["app-header"]}>
            <h1>App Header</h1>
        </header>
    );
};

export default AppHeader;