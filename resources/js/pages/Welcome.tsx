import { Link, router, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { articles, auth } = usePage().props;

    return (
        <div className="mx-auto min-h-screen bg-white p-6 text-black">
            {auth ? (
                <div className="flex justify-between p-5">
                    <h1 className="text-4xl">Bonjour {auth.name}</h1>
                    <button onClick={() => router.post('/logout')} className="cursor-pointer rounded bg-red-500 p-3 text-white">
                        Déconnexion
                    </button>
                </div>
            ) : (
                <div className="flex justify-end gap-3 p-5">
                    <Link href="/login">
                        <button className="cursor-pointer rounded bg-gray-700 p-3 text-white">Connexion</button>
                    </Link>
                    <Link href="/register">
                        <button className="cursor-pointer rounded bg-gray-700 p-3 text-white">Inscription</button>
                    </Link>
                </div>
            )}

            <h2 className="mb-6 text-3xl font-bold">Articles</h2>
            {articles.length === 0 ? (
                <p>Aucun article trouvé.</p>
            ) : (
                <ul className="space-y-4">
                    {articles.map((article) => (
                        <li key={article.id} className="rounded border p-4 shadow-sm">
                            <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
                            <p className="mb-2">{article.content}</p>
                            <p className="text-sm text-gray-600">
                                Catégorie : {article.category?.name || 'Aucune'} | Tags :{' '}
                                {article.tags.length > 0 ? article.tags.map((tag) => tag.name).join(', ') : 'Aucun'}
                            </p>
                            <p className="text-sm text-gray-500">Par : {article.user?.name || 'Anonyme'}</p>
                            <p className="text-sm text-gray-500">Likes : {article.likes?.length || 0}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
