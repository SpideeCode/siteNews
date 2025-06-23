import { usePage, Link, router } from "@inertiajs/react";

function Welcome() {

    const { auth } = usePage().props

    const déconnecte = () => {
        router.post('/logout')
    }

    return(
        <div className="bg-white min-h-screen text-black">
            {auth.user ? (
                <div className="flex justify-between p-5">
                    <h1 className="text-4xl">Bonjour {auth.user.name}</h1>
                    <button onClick={déconnecte} className="p-3 bg-red-500 text-white rounded cursor-pointer">Déconnexion</button>
                </div>
            ) : (
                <div className="flex justify-end gap-3 p-5">
                    <Link href="/login">
                        <button className="p-3 bg-gray-700 text-white rounded cursor-pointer">Connexion</button>
                    </Link>
                    <Link href="/register">
                        <button className="p-3 bg-gray-700 text-white rounded cursor-pointer">Inscription</button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Welcome;