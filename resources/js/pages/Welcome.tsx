import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Nav from './Nav';

export default function Welcome() {
  const { articles, auth } = usePage().props;
  const [commentTexts, setCommentTexts] = useState({}); // pour stocker les commentaires en cours par article

  const handleCommentChange = (articleId, value) => {
    setCommentTexts(prev => ({ ...prev, [articleId]: value }));
  };

  const handleCommentSubmit = (articleId) => {
    const content = commentTexts[articleId]?.trim();
    if (!content) return;

    router.post('/comments', {
      article_id: articleId,
      content: content
    }, {
      onSuccess: () => setCommentTexts(prev => ({ ...prev, [articleId]: '' })),
    });
  };

  const handleLikeToggle = (article) => {
    if (!auth) return;

    const likedByUser = article.likes.some(like => like.user_id === auth.id);
    if (likedByUser) {
      const like = article.likes.find(like => like.user_id === auth.id);
      router.delete(`/likes/${like.id}`);
    } else {
      router.post('/likes', { article_id: article.id });
    }
  };

  return (
    <div className="mx-auto min-h-screen bg-white p-6 text-black">
      <Nav />

      <h2 className="mb-6 text-3xl font-bold">Articles</h2>

      {articles.length === 0 ? (
        <p>Aucun article trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map(article => {
            const likedByUser = auth && article.likes.some(like => like.user_id === auth.id);

            return (
              <li key={article.id} className="rounded border p-4 shadow-sm">
                <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
                <p className="mb-2">{article.content}</p>
                <p className="text-sm text-gray-600">
                  Catégorie : {article.category?.name || 'Aucune'} | Tags :{' '}
                  {article.tags.length > 0 ? article.tags.map(tag => tag.name).join(', ') : 'Aucun'}
                </p>
                <p className="text-sm text-gray-500">Par : {article.user?.name || 'Anonyme'}</p>

                <button
                  onClick={() => handleLikeToggle(article)}
                  className={`mt-2 rounded px-3 py-1 ${likedByUser ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {likedByUser ? '❤️ Unlike' : '🤍 Like'} ({article.likes.length})
                </button>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Commentaires</h4>
                  <ul className="mb-2 max-h-40 overflow-y-auto">
                    {(article.comments || []).map(comment => (
                      <li key={comment.id} className="mb-1 border-b pb-1">
                        <strong>{comment.user.name}:</strong> {comment.content}
                      </li>
                    ))}
                  </ul>

                  {auth ? (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleCommentSubmit(article.id);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={commentTexts[article.id] || ''}
                        onChange={e => handleCommentChange(article.id, e.target.value)}
                        placeholder="Ajouter un commentaire"
                        className="flex-grow border p-2 rounded"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
                      >
                        Envoyer
                      </button>
                    </form>
                  ) : (
                    <p className="italic text-gray-500">Connectez-vous pour commenter.</p>
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
