import { Link, router, usePage } from '@inertiajs/react';

export default function Nav() {
  const { auth } = usePage().props;

  const handleLogout = () => {
    router.post('/logout');
  };

  if (!auth) {
    return (
      <nav className="flex justify-end gap-4 bg-gray-800 text-white px-6 py-4">
        <Link href="/login">
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Connexion</button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Inscription</button>
        </Link>
      </nav>
    );
  }

  const role = auth.role;

  return (
    <nav className="flex flex-wrap justify-between items-center bg-gray-800 text-white px-6 py-4">
      <div className="text-xl font-bold">📰 Mon Site</div>

      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:underline">Accueil</Link>

        {(role === 'auteur' || role === 'webmaster' || role === 'admin') && (
          <>
            <Link href="/mes-articles" className="hover:underline">Mes articles</Link>
          </>
        )}

        {(role === 'webmaster' || role === 'admin') && (
          <>
            <Link href="/categories" className="hover:underline">Catégories</Link>
            <Link href="/tags" className="hover:underline">Tags</Link>
          </>
        )}

        {role === 'admin' && (
          <Link href="/admin/users" className="hover:underline">Utilisateurs</Link>
        )}

        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
