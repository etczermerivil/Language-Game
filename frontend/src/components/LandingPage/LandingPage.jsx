import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles.landingContainer}>
            <h1 className={styles.landingTitle}>Word Pallete</h1>
            <p className={styles.landingText}> Color Your World with Language. </p>
        </div>

    );
}

export default LandingPage;
