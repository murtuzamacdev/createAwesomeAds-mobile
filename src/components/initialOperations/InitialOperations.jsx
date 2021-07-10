import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/analytics";
import GAEvents from '../../configs/GA_events.json';

const InitialOperations = () => {
    const history = useHistory();

    useEffect(() => {

        // Initiate firebase as the first thing :)
        const _initFirebase = async (params) => {
            await initFirebase();

            // Listen to route change event and do stuff...
            history.listen(() => {
                firebase.analytics().logEvent(GAEvents.screen_view.title, { 
                    [GAEvents.screen_view.params.screen_name]: window.location.pathname 
                });
            });
        }
        _initFirebase();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const initFirebase = () => {
        var firebaseConfig = { 
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    return (null);
}

export default InitialOperations;