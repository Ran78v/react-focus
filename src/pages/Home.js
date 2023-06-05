import List from '../components/List/List';
import styles from './Home.module.css';

function HomePage() {
    return (
        <>
            <div className={styles.home}>
                <h1>Home Page</h1>
                <button className={styles.button}>Focus</button>
                <List />
            </div>
        </>
    );
}

export default HomePage;
