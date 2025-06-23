import { Link, router, usePage } from '@inertiajs/react';

export default function Nav() {
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    if (!auth || !auth.id) {
        return (
            <nav className="flex justify-end gap-4 bg-gray-800 px-6 py-4 text-white">
                <Link href="/login">
                    <button className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">Connexion</button>
                </Link>
                <Link href="/register">
                    <button className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">Inscription</button>
                </Link>
            </nav>
        );
    }

    const role = auth.role;

    return (
        <nav className="flex flex-wrap items-center justify-between bg-gray-800 px-6 py-4 text-white">
            <div className="text-xl font-bold">Mon Site</div>

            <div className="flex items-center gap-4">
                <Link href="/" className="hover:underline">
                    Accueil
                </Link>

                {(role === 'auteur' || role === 'webmaster' || role === 'admin') && (
                    <Link href="/mes-articles" className="hover:underline">
                        Mes articles
                    </Link>
                )}

                {(role === 'webmaster' || role === 'admin') && (
                    <Link href="/webmaster/manage" className="hover:underline">
                        Gestion Webmaster
                    </Link>
                )}

                {role === 'admin' && (
                    <>
                        <Link href="/admin/dashboard" className="hover:underline">
                            Dashboard Admin
                        </Link>
                        <Link href="/users" className="hover:underline">Utilisateurs</Link>

                    </>
                )}

                <button onClick={handleLogout} className="ml-4 rounded bg-red-500 px-4 py-2 hover:bg-red-600">
                    Déconnexion
                </button>
            </div>
        </nav>
    );
}
