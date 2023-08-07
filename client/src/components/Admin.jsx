import { useEffect, useState } from 'react'
import '../styles/Admin.scss'

const AdminGranted = () => {
    return <h4>Admin permission granted</h4>
}

const AdminDenied = () => {
    return <h4>Admin permission denied</h4>
}

export default function Admin() {
    const [adminAccess, setAdminAccess] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setAdminAccess(false)
                return
            }
            const response = await fetch('http://localhost:4000/admin', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const { authorized } = await response.json()
            if (authorized) {
                setAdminAccess(true)
            } else {
                setAdminAccess(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="admin-page">
            <h3>Admin page</h3>
            {adminAccess ? <AdminGranted /> : <AdminDenied />}
        </div>
    )
}
