import { useEffect, useState } from 'react'
import '../styles/Admin.scss'

const AdminGranted = () => {
    return <h4>Admin permission granted</h4>
}

const AdminDenied = () => {
    return <h4>Admin permission denied</h4>
}

export default function Admin({ sessionExpired, setSessionExpired }) {
    const [adminAccess, setAdminAccess] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const sessionToken = localStorage.getItem('sessionToken')
            if (!sessionToken) {
                setAdminAccess(false)
                return
            }
            const response = await fetch('http://localhost:4000/admin', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                },
            })
            const { authorized, tokenExpired } = await response.json()
            console.log(authorized, tokenExpired)
            if (authorized) {
                setAdminAccess(true)
            } else {
                setAdminAccess(false)
            }
            if (tokenExpired) {
                setSessionExpired(true)
            }
        }
        fetchData()
    }, [])

    if (sessionExpired) {
        return (
            <div className="admin-page">
                <h3>Admin page</h3>
                <h4>Sorry, the session has expired</h4>
            </div>
        )
    }

    return (
        <div className="admin-page">
            <h3>Admin page</h3>

            {adminAccess ? <AdminGranted /> : <AdminDenied />}
        </div>
    )
}
