import { getAuth, sendEmailVerification, User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            setUser(authUser);
        });

        setUser(auth.currentUser);

        return () => {
            unsubscribe();
        }
    }, []);
    
    return user;
}