import { ReactNode, useContext } from "react";
import { createContext } from "react"
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType|undefined>(undefined);

export const GlobalProvider = ({ children }: {children: ReactNode}) => {

    const {data: user,
        loading,
        refetch
    } = useAppwrite({fn: getCurrentUser});

    const isLoggedIn = !!user;
    return(
        <GlobalContext.Provider value={{isLoggedIn, user, loading, refetch}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("UseGlobalContext must be used within a globalProvider")
    }
    return context;
}

export default GlobalProvider;