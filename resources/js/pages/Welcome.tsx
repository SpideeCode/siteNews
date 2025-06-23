import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Nav from './Nav';

export default function Welcome() {
    const { articles, auth } = usePage().props;
    const [commentTexts, setCommentTexts] = useState({});

    const handleCommentChange = (articleId, value) => {
        setCommentTexts((prev) => ({ ...prev, [articleId]: value }));
    };

    const handleCommentSubmit = (articleId) => {
        const content = commentTexts[articleId]?.trim();
        if (!content) return;

        router.post(
            '/comments',
            {
                article_id: articleId,
                content: content,
            },
            {
                onSuccess: () => setCommentTexts((prev) => ({ ...prev, [articleId]: '' })),
            },
        );
    };

    const handleLikeToggle = (article) => {
        if (!auth) return;

        const like = article.likes.find((like) => like.user_id === auth.id);
        console.log('Like trouvé :', like);
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

    return (
        <div className="mx-auto min-h-screen bg-white p-6 text-black">
            <Nav />

            <h2 className="mb-6 text-3xl font-bold">Articles</h2>

            {articles.length === 0 ? (
                <p>Aucun article trouvé.</p>
            ) : (
                <ul className="space-y-4">
                    {articles.map((article) => {
                        const likedByUser = auth && article.likes.some((like) => like.user_id === auth.id);

                        return (
                            <li key={article.id} className="rounded border p-4 shadow-sm">
                                {auth?.role === 'webmaster' && (
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="top-2 right-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                    >
                                        Supprimer
                                    </button>
                                )}
                                <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
                                <p className="mb-2">{article.content}</p>
                                <p className="text-sm text-gray-600">
                                    Catégorie : {article.category?.name || 'Aucune'} | Tags :{' '}
                                    {article.tags.length > 0 ? article.tags.map((tag) => tag.name).join(', ') : 'Aucun'}
                                </p>
                                <p className="text-sm text-gray-500">Par : {article.user?.name || 'Anonyme'}</p>

                                <button
                                    onClick={() => handleLikeToggle(article)}
                                    className={`mt-2 rounded px-3 py-1 ${likedByUser ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
                                >
                                    {likedByUser ? '❤️ Unlike' : '🤍 Like'} ({article.likes.length})
                                </button>

                                <div className="mt-4">
                                    <h4 className="mb-2 font-semibold">Dernier commentaire</h4>

                                    {article.latest_comment ? (
                                        <div className="mb-2 rounded bg-gray-100 p-2">
                                            <p className="text-sm italic">"{article.latest_comment.content}"</p>
                                            <p className="text-xs text-gray-500">— {article.latest_comment.user?.name || 'Anonyme'}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">Aucun commentaire pour le moment.</p>
                                    )}

                                    {auth ? (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleCommentSubmit(article.id);
                                            }}
                                            className="flex gap-2"
                                        >
                                            <input
                                                type="text"
                                                value={commentTexts[article.id] || ''}
                                                onChange={(e) => handleCommentChange(article.id, e.target.value)}
                                                placeholder="Ajouter un commentaire"
                                                className="flex-grow rounded border p-2"
                                            />
                                            <button type="submit" className="rounded bg-blue-600 px-4 text-white hover:bg-blue-700">
                                                Envoyer
                                            </button>
                                        </form>
                                    ) : (
                                        <p className="text-gray-500 italic">Connectez-vous pour commenter.</p>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
