import { usePage } from '@inertiajs/react';

export default function ArticlesList() {
    const { articles } = usePage().props;

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Liste des Articles</h1>
            {articles.length === 0 ? (
                <p>Aucun article trouvé.</p>
            ) : (
                <ul className="space-y-4">
                    {articles.map((article) => (
                        <li key={article.id} className="rounded border p-4 shadow-sm">
                            <h2 className="mb-2 text-xl font-semibold">{article.title}</h2>
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
