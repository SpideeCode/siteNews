import React from "react";
import { usePage } from "@inertiajs/react";

export default function ArticlesList() {
 
  const { articles } = usePage().props;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Liste des Articles</h1>
      {articles.length === 0 ? (
        <p>Aucun article trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="border rounded p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="mb-2">{article.content}</p>
              <p className="text-sm text-gray-600">
                Catégorie : {article.category?.name || "Aucune"} | Tags :{" "}
                {article.tags.length > 0
                  ? article.tags.map((tag) => tag.name).join(", ")
                  : "Aucun"}
              </p>
              <p className="text-sm text-gray-500">
                Par : {article.user?.name || "Anonyme"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
