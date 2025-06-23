import { router } from '@inertiajs/react';
import { useState } from 'react';
import Nav from './Nav';

export default function CreateArticle({ categories, tags }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category_id: '',
    selectedTags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId) => {
    setForm((prev) => {
      const isSelected = prev.selectedTags.includes(tagId);
      let newSelectedTags;
      if (isSelected) {
        newSelectedTags = prev.selectedTags.filter((id) => id !== tagId);
      } else {
        newSelectedTags = [...prev.selectedTags, tagId];
      }
      return {
        ...prev,
        selectedTags: newSelectedTags,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/articles', {
      title: form.title,
      content: form.content,
      category_id: form.category_id,
      tags: form.selectedTags,
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />

      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Créer un article</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Titre</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Contenu</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full rounded border p-2"
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
              className="w-full rounded border p-2"
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
            <label className="mb-1 block font-medium">Tags</label>
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
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
