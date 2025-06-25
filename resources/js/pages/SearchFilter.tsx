import { useState, useEffect } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  category: { name: string } | null;
  tags: { name: string }[];
  user: { name: string } | null;
}

interface Props {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

export default function SearchFilter({ articles, onFilter }: Props) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const q = query.toLowerCase();

    const filtered = articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q) ||
        article.category?.name.toLowerCase().includes(q) ||
        article.user?.name.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.name.toLowerCase().includes(q))
      );
    });

    onFilter(filtered);
  }, [query, articles, onFilter]);

  return (
    <div className="my-6">
      <input
        type="text"
        placeholder="Recherche par titre, catégorie, tag ou auteur..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
