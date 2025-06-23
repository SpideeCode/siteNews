import { useState } from 'react';
import { router } from '@inertiajs/react';
import Nav from './Nav';

export default function EditArticle({ article, categories, tags }) {
  const [form, setForm] = useState({
    title: article.title || '',
    content: article.content || '',
    category_id: article.category_id || '',
    selectedTags: article.tags?.map((tag) => tag.id) || [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTagToggle = (tagId) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedTags.includes(tagId);
      return {
        ...prev,
        selectedTags: alreadySelected
          ? prev.selectedTags.filter((id) => id !== tagId)
          : [...prev.selectedTags, tagId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(`/articles/${article.id}`, {
      title: form.title,
      content: form.content,
      category_id: form.category_id,
      tags: form.selectedTags,
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Modifier l'article</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Titre</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Contenu</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={5}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Catégorie</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Choisir une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.selectedTags.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  <span>#{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
