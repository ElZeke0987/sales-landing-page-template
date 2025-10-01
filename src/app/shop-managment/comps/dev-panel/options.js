"use client"
export default function Options() {

    async function logout() {
        await fetch('/api/logout-admin', {
            method: 'POST'
        });
        window.location.reload();
    }
    return <div>Option
        <button onClick={logout}>Logout</button>
    </div>;
}