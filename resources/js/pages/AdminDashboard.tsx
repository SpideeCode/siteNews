import { usePage } from '@inertiajs/react';
import Nav from './Nav';

export default function AdminDashboard() {
  const { stats } = usePage().props;

  return (
   
    <div className="min-h-screen bg-white text-black p-6">
         <Nav />
      <h1 className="text-3xl font-bold mb-6">📊 Tableau de bord Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Utilisateurs" count={stats.users} />
        <StatCard title="Articles" count={stats.articles} />
        <StatCard title="Commentaires" count={stats.comments} />
        <StatCard title="Catégories" count={stats.categories} />
        <StatCard title="Tags" count={stats.tags} />
      </div>
    </div>
  );
}

function StatCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
