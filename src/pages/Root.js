import { Outlet } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar/HeaderBar';

function RootLayout() {
    return (
        <>
            <HeaderBar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
