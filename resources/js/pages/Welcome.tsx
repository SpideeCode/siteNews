import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Nav from './Nav';

export default function Welcome() {
  const { articlesByCategory, auth } = usePage().props;
  const [commentTexts, setCommentTexts] = useState({});

  const handleCommentChange = (articleId, value) => {
    setCommentTexts((prev) => ({ ...prev, [articleId]: value }));
  };

  const handleCommentSubmit = (articleId) => {
    const content = commentTexts[articleId]?.trim();
    if (!content) return;

    router.post('/comments', { article_id: articleId, content }, {
      onSuccess: () => setCommentTexts((prev) => ({ ...prev, [articleId]: '' })),
    });
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

  return (
    <div className="mx-auto min-h-screen bg-white p-6 text-black">
      <Nav />
      <h2 className="mb-6 text-3xl font-bold">Articles par catégorie</h2>

      {Object.keys(articlesByCategory).map((categoryName) => (
        <section key={categoryName} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">{categoryName}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articlesByCategory[categoryName].map((article) => {
              const likedByUser = auth && article.likes.some((like) => like.user_id === auth.id);

              return (
                <div
                  key={article.id}
                  className="flex flex-col justify-between rounded-lg border border-gray-300 bg-white shadow-sm p-4"
                  style={{ minHeight: '420px' }}
                >
                  {/* Supprimer */}
                  {auth?.role === 'webmaster' && (
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}

                  {/* Titre + contenu */}
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{article.title}</h4>
                    <p className="text-sm text-gray-800 line-clamp-4">{article.content}</p>
                  </div>

                  {/* Infos auteur / tags */}
                  <div className="text-xs text-gray-600 mt-2">
                    <p>Par : <span className="font-medium">{article.user?.name || 'Anonyme'}</span></p>
                    <p>Tags : {article.tags.length > 0 ? article.tags.map(tag => tag.name).join(', ') : 'Aucun'}</p>
                  </div>

                  {/* Like bouton */}
                  <div className="mt-3">
                    <button
                      onClick={() => handleLikeToggle(article)}
                      className={`rounded px-4 py-1 text-sm font-medium w-full transition ${
                        likedByUser ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-black hover:bg-gray-300'
                      }`}
                    >
                      {likedByUser ? '❤️ Unlike' : '🤍 Like'} ({article.likes.length})
                    </button>
                  </div>

                  {/* Dernier commentaire */}
                  <div className="bg-gray-100 rounded p-3 mt-3 text-sm">
                    <h5 className="font-semibold text-gray-700 mb-1">Dernier commentaire</h5>
                    {article.latest_comment ? (
                      <>
                        <p className="italic">"{article.latest_comment.content}"</p>
                        <p className="text-xs text-gray-500 mt-1">— {article.latest_comment.user?.name || 'Anonyme'}</p>
                      </>
                    ) : (
                      <p className="italic text-gray-400">Aucun commentaire pour le moment.</p>
                    )}
                  </div>

                  {/* Formulaire commentaire */}
                  {auth ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCommentSubmit(article.id);
                      }}
                      className="flex gap-2 mt-3"
                    >
                      <input
                        type="text"
                        value={commentTexts[article.id] || ''}
                        onChange={(e) => handleCommentChange(article.id, e.target.value)}
                        placeholder="Ajouter un commentaire"
                        className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Envoyer
                      </button>
                    </form>
                  ) : (
                    <p className="text-sm text-gray-500 italic mt-2">Connectez-vous pour commenter.</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
