import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Nav from './Nav';

export default function WebmasterManage() {
  const { categories, tags } = usePage().props;

  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  const addCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    router.post('/categories', { name: newCategory }, {
      onSuccess: () => setNewCategory(''),
    });
  };

  const addTag = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    router.post('/tags', { name: newTag }, {
      onSuccess: () => setNewTag(''),
    });
  };

  const deleteCategory = (id) => {
    if (!confirm('Confirmer la suppression de cette catégorie ?')) return;
    router.delete(`/categories/${id}`);
  };

  const deleteTag = (id) => {
    if (!confirm('Confirmer la suppression de ce tag ?')) return;
    router.delete(`/tags/${id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />
      <div className="max-w-4xl mx-auto p-6 space-y-10">
        <h1 className="text-3xl font-bold mb-6">Gestion des catégories et tags</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Catégories</h2>

          <form onSubmit={addCategory} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Nouvelle catégorie"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="flex-grow border rounded p-2"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Ajouter
            </button>
          </form>

          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat.id} className="flex justify-between items-center border p-2 rounded">
                <span>{cat.name}</span>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>

          <form onSubmit={addTag} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Nouveau tag"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              className="flex-grow border rounded p-2"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Ajouter
            </button>
          </form>

          <ul className="space-y-2">
            {tags.map(tag => (
              <li key={tag.id} className="flex justify-between items-center border p-2 rounded">
                <span>#{tag.name}</span>
                <button
                  onClick={() => deleteTag(tag.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
