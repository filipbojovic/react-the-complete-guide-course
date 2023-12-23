import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from '../components/MainNavigation'

const RootLayout = () => {
    
    // const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;