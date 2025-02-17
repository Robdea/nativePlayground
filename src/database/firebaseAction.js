import { useEffect, useState } from "react";
import { auth, app, db } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { restoreAuthState, persistAuthState } from "./firebaseConfig";
import { restoreUserInfo, persistenUserInfo } from "./firebaseConfig";
export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const persistAuthState = async (userData) => {
        try {
            if (userData) {
                await AsyncStorage.setItem('authUser', JSON.stringify({
                    uid: userData.uid,
                    email: userData.email,
                }));
            } else {
                await AsyncStorage.removeItem('authUser');
            }
        } catch (error) {
            console.error('Error al persistir el estado:', error);
        }
    };

    const restoreAuthState = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('authUser');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Error al restaurar el estado:', error);
        }
         finally {
            setLoading(false);
        }
    };

    useEffect(() =>{
        restoreAuthState();

        const unsubscribe = onAuthStateChanged(auth, async (user) =>{
            if(user){
                setUser(user)
                await persistAuthState(user)
            }else{
                setUser(null);
                await persistAuthState(null)
            }
            // setUser(user)
            setLoading(false)
        })

        return () => unsubscribe();
    },[]);

    return {user, loading};
};

export function getInfoUser() {
    const [userInfo, setUserInfo] = useState(null)

    const {user, loading} = useAuth()

    useEffect(()=>{
        restoreUserInfo(setUserInfo)

        const fetUserInfo = async () =>{
            // if the user is null
            if (loading || !user) return;
            
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap =  await getDoc(docRef)
                

                if(docSnap.exists()){
                    setUserInfo(docSnap.data())
                    const userData = docSnap.data();
                    await  persistenUserInfo(userData)
                    console.log("Se ha encontrado: ", docSnap.data())
                }
                else{
                    setUserInfo(null);
                    await persistenUserInfo(null)
                    console.log("No se ha encontrado")
                }   
            } catch (error) {
                console.error(error);
            }
        }
        // invok the function
        fetUserInfo()
    }, [user, loading])
    return {userInfo, loading}
};


