import axios from 'axios';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebase.init';

const instance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

instance.interceptors.request.use(async (config) => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
});

export default instance;
