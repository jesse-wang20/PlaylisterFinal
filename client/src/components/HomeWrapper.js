import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import AuthContext from '../auth'
import WelcomeScreen from './WelcomeScreen';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);

    if (auth.loggedIn)
        return <HomeScreen />
    else
        return <WelcomeScreen />
}