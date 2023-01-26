import { createContext, useContext, useMemo, useState } from "react"

export const initialValues = {
    authData: {
      session: null
    },
    setAuthData: () => { }
}

interface AuthData {
    session: any
}
interface AuthContextType {
    authData: AuthData
    setAuthData: (authData: AuthData) => void
}

const AuthContext = createContext<AuthContextType>(initialValues)

export function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {

    const [authData, setAuthData] = useState<AuthData>(initialValues.authData)

    const value = useMemo(() => ({
        authData, setAuthData
    }), [authData])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

