import { router, Link } from "@inertiajs/react";
import { useState } from "react";

function Register() {

    const [values, setValues] = useState({
        name: "",             
        date: "",
        age: 0,
        email: "",
        password: "",
        password_confirmation: ""
    })

    const inscription = (e) => {
        e.preventDefault()
        router.post('/register', values)
    }

    return(
        <div className="bg-white min-h-screen text-black">
            <form onSubmit={inscription} className="w-1/2 mx-auto pt-5 flex flex-col gap-3">
                <div className="w-full flex flex-col">
                    <label htmlFor="">Nom</label>
                    <input type="text" onChange={(e) => setValues({...values, name: e.target.value})} className="border rounded p-2" placeholder="Test" />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="">Email</label>
                    <input type="email" onChange={(e) => setValues({...values, email: e.target.value})} className="border rounded p-2" placeholder="test@mail.com" />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="">Mot de passe</label>
                    <input type="password" onChange={(e) => setValues({...values, password: e.target.value})} className="border rounded p-2" placeholder="mdp min. 8 caractères" />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="">Confirmation de mot de passe</label>
                    <input type="password" onChange={(e) => setValues({...values, password_confirmation: e.target.value})} className="border rounded p-2" />
                </div>
                <div className="w-full">
                    <button type="submit" className="w-full bg-gray-700 text-white rounded p-2 cursor-pointer hover:bg-gray-500">Inscription</button>
                </div>
                <button>Vous avez déjà un compte ? <Link href="/login" className="text-blue-500 cursor-pointer hover:text-blue-400">Connexion</Link></button>
            </form>
        </div>
    )
}

export default Register;