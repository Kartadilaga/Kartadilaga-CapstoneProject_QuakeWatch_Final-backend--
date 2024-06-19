'use client'
import AuthControllers from "@/controllers/AuthControllers"

export default function Login() {
    const {
        username, setUsername, password, setPassword,
        HandleSignIn
    } = AuthControllers()
    return (
        <div className="container w-25 centered">
            <div className="card row-column gap-3">
                <h1 className="text-center">LOGIN</h1>
                <hr />
                <form onSubmit={HandleSignIn} className="row-column gap-3">
                    <input type="text" className="form-ctrl" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" className="form-ctrl" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                </form>
            </div>
        </div>
    )
}