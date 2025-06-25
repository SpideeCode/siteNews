import { router, Link } from "@inertiajs/react";
import { useState } from "react";
import Nav from "../Nav";

function Login() {

    const [values, setValues] = useState({
        email: "",
        password: "",
        remember: false
    })

    const connexion = (e) => {
        e.preventDefault()
        router.post('/login', values)
    }

    return(
        <div className="bg-white min-h-screen text-black">
            <form onSubmit={connexion} className="w-1/2 mx-auto pt-5 flex flex-col gap-3">
                <div className="w-full flex flex-col">
                    <label htmlFor="">Email</label>
                    <input type="email" onChange={(e) => setValues({...values, email: e.target.value})} className="border rounded p-2" placeholder="test@mail.com" />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="">Mot de passe</label>
                    <input type="password" onChange={(e) => setValues({...values, password: e.target.value})} className="border rounded p-2" />
                </div>
                <div className="w-full flex gap-3">
                    <label htmlFor="">Se souvenir de moi</label>
                    <input type="checkbox" checked={values.remember} onChange={(e) => setValues({...values, remember: !values.remember})} />
                </div>
                <div className="w-full">
                    <button type="submit" className="w-full bg-gray-700 text-white rounded p-2 cursor-pointer hover:bg-gray-500">Connexion</button>
                </div>
                <button>Vous n'avez pas de compte ? <Link href="/register" className="text-blue-500 cursor-pointer hover:text-blue-400">Inscription</Link></button>
            </form>
        </div>
    )
}

export default Login;