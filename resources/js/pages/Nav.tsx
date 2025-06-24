import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Nav() {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const role = auth?.role;

    return (
        <nav className="bg-gray-800 text-white">
            <div className=" px-6 py-4 flex items-center justify-between">
                <div className="text-xl font-bold">Mon Site</div>

                {/* Burger button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/" className="hover:underline">Accueil</Link>

                    {auth && (role === 'auteur' || role === 'webmaster' || role === 'admin') && (
                        <Link href="/mes-articles" className="hover:underline">Mes articles</Link>
                    )}

                    {auth && (role === 'webmaster' || role === 'admin') && (
                        <Link href="/webmaster/manage" className="hover:underline">Gestion Webmaster</Link>
                    )}

                    {auth && role === 'admin' && (
                        <>
                            <Link href="/admin/dashboard" className="hover:underline">Dashboard Admin</Link>
                            <Link href="/users" className="hover:underline">Utilisateurs</Link>
                        </>
                    )}

                    {auth ? (
                        <button onClick={handleLogout} className="ml-4 rounded bg-red-500 px-4 py-2 hover:bg-red-600">
                            Déconnexion
                        </button>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">Connexion</button>
                            </Link>
                            <Link href="/register">
                                <button className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">Inscription</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4 space-y-2">
                    <Link href="/" className="block hover:underline">Accueil</Link>

                    {auth && (role === 'auteur' || role === 'webmaster' || role === 'admin') && (
                        <Link href="/mes-articles" className="block hover:underline">Mes articles</Link>
                    )}

                    {auth && (role === 'webmaster' || role === 'admin') && (
                        <Link href="/webmaster/manage" className="block hover:underline">Gestion Webmaster</Link>
                    )}

                    {auth && role === 'admin' && (
                        <>
                            <Link href="/admin/dashboard" className="block hover:underline">Dashboard Admin</Link>
                            <Link href="/users" className="block hover:underline">Utilisateurs</Link>
                        </>
                    )}

                    {auth ? (
                        <button onClick={handleLogout} className="w-full rounded bg-red-500 px-4 py-2 hover:bg-red-600">
                            Déconnexion
                        </button>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="w-full rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">Connexion</button>
                            </Link>
                            <Link href="/register">
                                <button className="w-full rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">Inscription</button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
