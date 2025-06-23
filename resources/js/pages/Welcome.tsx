import { usePage, Link, router } from "@inertiajs/react";

export default function Welcome() {
  const { articles, auth } = usePage().props;


  return (
    <div className="bg-white min-h-screen text-black p-6  mx-auto">
      {auth?.user ? (
        <div className="flex justify-between p-5">
          <h1 className="text-4xl">Bonjour {auth.user.name}</h1>
          <button onClick={() => router.post('/logout')} className="p-3 bg-red-500 text-white rounded cursor-pointer">Déconnexion</button>
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

      <h2 className="text-3xl font-bold mb-6">Articles</h2>
      {articles.length === 0 ? (
        <p>Aucun article trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="border rounded p-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="mb-2">{article.content}</p>
              <p className="text-sm text-gray-600">
                Catégorie : {article.category?.name || "Aucune"} | Tags :{" "}
                {article.tags.length > 0 ? article.tags.map(tag => tag.name).join(", ") : "Aucun"}
              </p>
              <p className="text-sm text-gray-500">Par : {article.user?.name || "Anonyme"}</p>
              <p className="text-sm text-gray-500">Likes : {article.likes?.length || 0}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
