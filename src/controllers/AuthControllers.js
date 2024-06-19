import { useState } from "react"
import { signIn } from "next-auth/react"

const AuthControllers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const HandleSignIn = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (username === "" || password === "") {
            alert('Masih ada form yang kosong!')
            setIsLoading(false)
        } else {
            signIn('credentials', { username, password, redirect: false })
                .then(async res => {
                    if (res.error) {
                        alert('username atau password anda tidak sesuai!')
                    } else window.location.href = '/dashboard'

                    setIsLoading(false)
                })
        }
    }

    return {
        username, setUsername, password, setPassword,
        HandleSignIn
    }
}

export default AuthControllers;