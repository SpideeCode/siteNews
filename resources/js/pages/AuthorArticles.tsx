import Nav from '@/Pages/Nav';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthorArticles({ articles, categories, tags }) {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        title: '',
        content: '',
        category_id: '',
        tag_input: '',
        selectedTags: [],
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleTagInput = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const tag = form.tag_input.trim().replace(/^#/, '');
            if (tag && !form.selectedTags.includes(tag)) {
                setForm((prev) => ({
                    ...prev,
                    selectedTags: [...prev.selectedTags, tag],
                    tag_input: '',
                }));
            }
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setForm((prev) => ({
            ...prev,
            selectedTags: prev.selectedTags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            '/articles',
            {
                title: form.title,
                content: form.content,
                category_id: form.category_id,
                tags: form.selectedTags,
            },
            {
                onSuccess: () => {
                    setShowModal(false);
                    setForm({
                        title: '',
                        content: '',
                        category_id: '',
                        tag_input: '',
                        selectedTags: [],
                    });
                },
            },
        );
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <Nav />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Mes articles</h1>
                    <Link href="/articles/create" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        + Créer un article
                    </Link>
                </div>

                {articles.length === 0 ? (
                    <p className="text-gray-700">Vous n’avez encore publié aucun article.</p>
                ) : (
                    <ul className="space-y-4">
                        {articles.map((article) => (
                            <li key={article.id} className="rounded border p-4 shadow-sm">
                                <h2 className="text-xl font-semibold">{article.title}</h2>
                                <p className="text-gray-700">{article.content}</p>
                                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                                    <span>Catégorie : {article.category?.name ?? 'Aucune'}</span>
                                    <span>Tags : {article.tags?.map((t) => t.name).join(', ') || 'Aucun'}</span>
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <Link href={`/articles/${article.id}/edit`} className="text-blue-600 hover:underline">
                                        ✏️ Modifier
                                    </Link>
                                    <button onClick={() => router.delete(`/articles/${article.id}`)} className="text-red-600 hover:underline">
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="relative w-full max-w-lg rounded-lg bg-white p-6 text-black shadow-lg">
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black">
                            ✖
                        </button>

                        <h2 className="mb-4 text-xl font-bold">Créer un article</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Titre</label>
                                <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full rounded border p-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Contenu</label>
                                <textarea
                                    name="content"
                                    value={form.content}
                                    onChange={handleChange}
                                    className="w-full rounded border p-2"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Catégorie</label>
                                <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full rounded border p-2">
                                    <option value="">-- Choisir une catégorie --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Tags</label>
                                <input
                                    type="text"
                                    name="tag_input"
                                    value={form.tag_input}
                                    onChange={handleChange}
                                    onKeyDown={handleTagInput}
                                    placeholder="#ajouter un tag"
                                    className="w-full rounded border p-2"
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {form.selectedTags.map((tag) => (
                                        <span key={tag} className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm">
                                            #{tag}
                                            <button onClick={() => handleRemoveTag(tag)} className="ml-1 font-bold text-red-500">
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                                    Publier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
