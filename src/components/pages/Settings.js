'use client'

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function SettingsComponent() {
    const [menu, setMenu] = useState('profile')
    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Settings</span>
            </div>
            <div className="container row-md gap-3">
                <div className="card row-column flex-grow gap-2 align-md-self-start">
                    <button type="button" className="btn btn-light" onClick={() => setMenu('account')}>Account</button>
                </div>
                {AccountCard()}
            </div>
        </>
    )
}

const AccountCard = () => {
    return (
        <div className="card row-column flex-grow-3 align-md-self-start gap-2">
            <h2>Account</h2>
            <hr />
            <div>
                <button type="button" className="btn btn-danger" onClick={() => signOut()}>Logout</button>
            </div>
        </div>
    )
}