import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Nav from './Nav';
import SearchFilter from './SearchFilter';

export default function Welcome() {
    const { articlesByCategory, auth } = usePage().props;
    const [commentTexts, setCommentTexts] = useState({});
    const allArticles = Object.values(articlesByCategory).flat();
    const [filteredArticles, setFilteredArticles] = useState(allArticles);

    useEffect(() => {
        setFilteredArticles(allArticles);
    }, [articlesByCategory]);

    const handleCommentChange = (articleId, value) => {
        setCommentTexts((prev) => ({ ...prev, [articleId]: value }));
    };

    const handleCommentSubmit = (articleId) => {
        const content = commentTexts[articleId]?.trim();
        if (!content) return;

        router.post(
            '/comments',
            { article_id: articleId, content },
            {
                onSuccess: () => setCommentTexts((prev) => ({ ...prev, [articleId]: '' })),
            },
        );
    };

    const handleLikeToggle = (article) => {
        
        if (!auth) return;
        const like = article.likes.find((like) => like.user_id === auth.id);
        if (like) {
            router.delete(`/likes/${like.id}`);
        } else {
            router.post('/likes', { article_id: article.id });
        }
    };

    const handleDelete = (articleId) => {
        if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;
        router.delete(`/articles/${articleId}`);
    };

    const grouped = filteredArticles.reduce((acc, article) => {
        const cat = article.category?.name || 'Sans catégorie';
        acc[cat] = acc[cat] || [];
        acc[cat].push(article);
        return acc;
    }, {});

    return (
    <div className="min-h-screen bg-white text-black">
        <Nav />
        <div className="mx-auto p-6">
            <h2 className="font-bold text-3xl mb-6">Articles par catégorie</h2>

            <SearchFilter articles={allArticles} onFilter={setFilteredArticles} />

            {Object.keys(grouped).map((categoryName) => (
                <section key={categoryName} className="mb-12">
                    <h3 className="mb-4 border-b border-gray-300 pb-2 text-2xl font-semibold">{categoryName}</h3>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {grouped[categoryName].map((article) => {
                            const likedByUser = auth && article.likes.some((like) => like.user_id === auth.id);

                            return (
                                <div
                                    key={article.id}
                                    className="flex flex-col justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
                                    style={{ minHeight: '420px' }}
                                >
                                    {/* Boutons modifier/supprimer pour admin et webmaster */}
                                    {['admin', 'webmaster'].includes(auth?.role) && (
                                        <div className="mb-2 flex justify-end gap-2">
                                            <button
                                                onClick={() => router.get(`/articles/${article.id}/edit`)}
                                                className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article.id)}
                                                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex-grow">
                                        <h4 className="mb-1 text-lg font-bold text-gray-900">{article.title}</h4>
                                        <p className="line-clamp-4 text-sm text-gray-800">{article.content}</p>
                                    </div>

                                    <div className="mt-2 text-xs text-gray-600">
                                        <p>
                                            Par : <span className="font-medium">{article.user?.name || 'Anonyme'}</span>
                                        </p>
                                        <p>
                                            Tags :{' '}
                                            {article.tags.length > 0
                                                ? article.tags.map((tag) => tag.name).join(', ')
                                                : 'Aucun'}
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <button
                                            onClick={() => handleLikeToggle(article)}
                                            className={`w-full rounded px-4 py-1 text-sm font-medium transition ${
                                                likedByUser
                                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                                    : 'bg-gray-200 text-black hover:bg-gray-300'
                                            }`}
                                        >
                                            {likedByUser ? '❤️ Unlike' : '🤍 Like'} ({article.likes.length})
                                        </button>
                                    </div>

                                    <div className="mt-3 rounded bg-gray-100 p-3 text-sm">
                                        <h5 className="mb-1 font-semibold text-gray-700">Dernier commentaire</h5>
                                        {article.latest_comment ? (
                                            <>
                                                <p className="italic">"{article.latest_comment.content}"</p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    — {article.latest_comment.user?.name || 'Anonyme'}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-gray-400 italic">Aucun commentaire pour le moment.</p>
                                        )}
                                    </div>

                                    {auth ? (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleCommentSubmit(article.id);
                                            }}
                                            className="mt-3 flex gap-2"
                                        >
                                            <input
                                                type="text"
                                                value={commentTexts[article.id] || ''}
                                                onChange={(e) => handleCommentChange(article.id, e.target.value)}
                                                placeholder="Ajouter un commentaire"
                                                className="flex-grow rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                            />
                                            <button
                                                type="submit"
                                                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                                            >
                                                Envoyer
                                            </button>
                                        </form>
                                    ) : (
                                        <p className="mt-2 text-sm text-gray-500 italic">Connectez-vous pour commenter.</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
        </div>
    </div>
);

}
