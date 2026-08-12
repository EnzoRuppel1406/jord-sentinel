import axios from 'axios'
import { useState } from 'react'
import jordText from '../assets/jord_text.png'
import jordTree from '../assets/jord_tree.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                email,
                password,
            })

            console.log(response)
        } catch (error) {
            console.error(`Deu algum erro ${error}`)
        }
    }

    return (
        <>
            <section className="w-screed flex max-h-screen min-h-screen max-w-screen flex-row bg-[#dad2bf]">
                <section className="flex max-w-4/6 flex-col items-center justify-center space-y-10 bg-[#213A29]">
                    <img src={jordTree} alt="Jord Sentinel Brand Logo" className="h-1/2 w-1/2" />
                    <p className="text-center font-[Manufacturing_Consent] text-5xl font-medium text-[#dad2bf] italic">
                        Da raiz dos dados às ramificações da decisão
                    </p>
                </section>
                <section className="flex min-h-screen min-w-1/2 flex-col items-center justify-center">
                    <form
                        className="flex max-h-3/4 min-h-1/2 min-w-3/4 flex-col items-center justify-center gap-8 rounded-2xl border-4 border-[#112016] p-4 text-5xl"
                        onSubmit={handleSubmit}
                    >
                        <img src={jordText} alt="" className="top-1.5 max-h-2/5 rounded-2xl" />
                        <label htmlFor="email" className="w-2xl text-left">
                            Login:
                        </label>
                        <input
                            className="w-2xl rounded-2xl border border-r border-emerald-800 text-center"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Digite seu email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="password" className="w-2xl text-left">
                            Senha:
                        </label>
                        <input
                            className="w-2xl rounded-2xl border border-r border-emerald-800 text-center"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Digite sua senha"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="w-2xl rounded-2xl border-[#112016] bg-[#213A29] p-4 text-white hover:border-2 hover:bg-stone-500"
                        >
                            Entrar
                        </button>
                    </form>
                </section>
            </section>
        </>
    )
}

export default Login
