import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Nav from '../Nav';

function Register() {
    const [values, setValues] = useState({
        name: '',
        date: '',
        age: 0,
        email: '',
        password: '',
        password_confirmation: '',
        role: 'lecteur',
    });

    const inscription = (e) => {
        e.preventDefault();
        console.log(values);
        router.post('/register', values);
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <form onSubmit={inscription} className="mx-auto flex w-1/2 flex-col gap-3 pt-5">
                <div className="flex w-full flex-col">
                    <label htmlFor="">Nom</label>
                    <input
                        type="text"
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                        className="rounded border p-2"
                        placeholder="Test"
                    />
                </div>
                <div className="flex w-full flex-col">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        className="rounded border p-2"
                        placeholder="test@mail.com"
                    />
                </div>
                <div className="flex w-full flex-col">
                    <label htmlFor="">Mot de passe</label>
                    <input
                        type="password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        className="rounded border p-2"
                        placeholder="mdp min. 8 caractères"
                    />
                </div>
                <div className="flex w-full flex-col">
                    <label htmlFor="">Confirmation de mot de passe</label>
                    <input
                        type="password"
                        onChange={(e) => setValues({ ...values, password_confirmation: e.target.value })}
                        className="rounded border p-2"
                    />
                </div>
                <div className="flex w-full flex-col">
                    <label htmlFor="">Rôle</label>
                    <select
                        onChange={(e) => setValues({ ...values, role: e.target.value })}
                        value={values.role}
                        required 
                        className="rounded border p-2"
                    >
                        <option value="">-- Choisir un rôle --</option>
                        <option value="lecteur">Lecteur</option>
                        <option value="auteur">Auteur</option>
                    </select>
                </div>

                <div className="w-full">
                    <button type="submit" className="w-full cursor-pointer rounded bg-gray-700 p-2 text-white hover:bg-gray-500">
                        Inscription
                    </button>
                </div>
                <button>
                    Vous avez déjà un compte ?{' '}
                    <Link href="/login" className="cursor-pointer text-blue-500 hover:text-blue-400">
                        Connexion
                    </Link>
                </button>
            </form>
        </div>
    );
}

export default Register;
