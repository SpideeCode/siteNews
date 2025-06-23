import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Nav from './Nav';

export default function Users() {
  const { users } = usePage().props;
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'lecteur',
  });
  const [editRole, setEditRole] = useState<{ [key: number]: string }>({});

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/users', newUser, {
      onSuccess: () => setNewUser({ name: '', email: '', password: '', role: 'lecteur' }),
    });
  };

  const handleRoleChange = (userId: number, role: string) => {
    setEditRole((prev) => ({ ...prev, [userId]: role }));

    router.post(`/users/${userId}/update-role`, { role }, {
      preserveScroll: true,
    });
  };

  const handleDeleteUser = (userId: number) => {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    router.delete(`/users/${userId}`);
  };

  return (
    <div className=" mx-auto p-6 text-black bg-white min-h-screen">
        <Nav />
      <h1 className="mb-6 text-3xl font-bold">Gestion des utilisateurs</h1>

      <form onSubmit={handleCreateUser} className="mb-8 border border-gray-300 rounded p-4 bg-gray-50">
        <h2 className="mb-4 text-xl font-semibold">Créer un nouvel utilisateur</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={newUser.name}
            onChange={handleNewUserChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleNewUserChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={newUser.password}
            onChange={handleNewUserChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400"
            required
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleNewUserChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400"
            required
          >
            <option value="lecteur">Lecteur</option>
            <option value="auteur">Auteur</option>
            <option value="webmaster">Webmaster</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 rounded bg-black text-white px-6 py-2 hover:bg-gray-900 transition"
        >
          Créer
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Rôle</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={editRole[user.id] ?? user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-gray-400"
                >
                  <option value="lecteur">Lecteur</option>
                  <option value="auteur">Auteur</option>
                  <option value="webmaster">Webmaster</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="rounded bg-red-600 text-white px-3 py-1 hover:bg-red-700"
                  type="button"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
