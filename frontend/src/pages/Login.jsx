import axios from 'axios'
import { useState } from 'react'
import jordText from '../assets/jord_text.png'
import jordTree from '../assets/jord_tree.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                email,
                password,
            })

            response.data ? navigate('/dashboard') : null
        } catch (error) {
            console.error(`Deu algum erro ${error}`)

            const errorMessage = error.response?.data?.message || 'Erro ao conectar com o servidor.'
            setError(errorMessage)
        }
    }

    return (
        <>
            <section className="flex min-h-screen w-full flex-col bg-(--main-bg) lg:flex-row">
                <section className="hidden flex-col items-center justify-center space-y-10 bg-(--menu-color) p-8 lg:flex lg:w-7/12">
                    <img
                        src={jordTree}
                        alt="Jord Sentinel Brand Logo"
                        className="h-auto max-w-[50%] object-contain"
                    />
                    <p className="text-center font-[Manufacturing_Consent] text-5xl font-medium text-(--main-bg) italic">
                        Da raiz dos dados às ramificações da decisão
                    </p>
                </section>
                <section className="flex flex-1 flex-col items-center justify-center p-4">
                    <form
                        className="flex w-full max-w-lg flex-col items-center rounded-2xl border-4 border-[#112016] bg-transparent p-6 text-5xl"
                        onSubmit={handleSubmit}
                    >
                        <img
                            src={jordText}
                            alt=""
                            className="mb-8 h-auto w-full max-w-70 rounded-2xl object-contain"
                        />

                        <section className="flex w-full flex-col gap-4">
                            <label
                                htmlFor="email"
                                className="w-full text-left text-4xl text-[#112016]"
                            >
                                Login:
                            </label>
                            <input
                                className="w-full rounded-2xl border border-emerald-800 p-2 text-center text-3xl"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Digite seu email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label
                                htmlFor="password"
                                className="w-full text-left text-4xl text-[#112016]"
                            >
                                Senha:
                            </label>
                            <input
                                className="w-full rounded-2xl border border-emerald-800 p-2 text-center text-3xl"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Digite sua senha"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && (
                                <section className="mt-6 w-full animate-pulse rounded-xl border border-red-400 bg-red-100 p-3 text-center text-2xl font-medium text-red-700">
                                    {error}
                                </section>
                            )}

                            <button
                                type="submit"
                                className="mt-8 w-full cursor-pointer rounded-2xl border-[#112016] bg-(--menu-color) p-4 text-3xl text-white hover:border-2 hover:bg-stone-500"
                            >
                                Entrar
                            </button>
                        </section>
                    </form>
                </section>
            </section>
        </>
    )
}

export default Login
