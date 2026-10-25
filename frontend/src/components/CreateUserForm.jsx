import { useState } from 'react'
import { ChevronDown, EyeClosed, EyeDashed, SquareX } from 'lucide-react'
import { api } from '../services/api'
import validator from 'validator'

const CreateUserForm = ({ company, closeForm, onCreated }) => {
    const [showRoles, setShowRoles] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')

    const roles = [
        { value: 'Analista', label: 'Analista' },
        { value: 'Admin', label: 'Administrador' },
    ]

    const validateForm = () => {
        const newErrors = {}

        if (!username.trim()) {
            newErrors.username = 'Informe o nome.'
        }

        if (!email.trim()) {
            newErrors.email = 'Informe o e-mail.'
        } else if (!validator.isEmail(email)) {
            newErrors.email = 'O e-mail nao e valido'
        }

        if (!role) {
            newErrors.role = 'Selecione uma função.'
        }

        if (!password) {
            newErrors.password = 'Informe a senha.'
        } else if (password.trim().length < 8) {
            newErrors.password = 'A senha deve conter pelo menos 8 caracteres'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleUserCreation = async (event) => {
        event.preventDefault()
        setErrorMessage('')

        if (!validateForm()) {
            return
        }

        setIsCreating(true)

        try {
            await api.post('/users/create', {
                company: company.name,
                role: role,
                name: username,
                email: email,
                password: password,
            })

            onCreated()
        } catch (error) {
            console.error('Status:', error.response?.status)
            console.error('Resposta do backend:', error.response?.data)
            console.error('Erro completo:', error)
            setErrorMessage(
                error.response?.data?.message ??
                    'Não foi possível cadastrar o usuário. Tente novamente.'
            )
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <section className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <form
                className="w-full max-w-fit rounded-2xl border-2 border-(--menu-color) bg-(--main-bg) p-6 shadow-2xl"
                onSubmit={handleUserCreation}
            >
                <h1 className="mb-5 flex items-center justify-between rounded bg-(--menu-color) p-4 text-center font-bold text-(--main-bg)">
                    Novo Usuario - {company.name}
                    <button
                        type="button"
                        className="cursor-pointer transition-colors duration-300 ease-in-out hover:opacity-50"
                        onClick={closeForm}
                    >
                        <SquareX size={40} />
                    </button>
                </h1>
                {errorMessage && (
                    <p
                        className={
                            'mb-4 rounded-lg border border-red-300 bg-red-100 p-3 text-base text-red-800'
                        }
                    >
                        {errorMessage}
                    </p>
                )}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="name"
                        className="mr-2 w-fit text-left text-3xl font-bold text-[#112016]"
                    >
                        Nome:
                    </label>
                    <span className="flex flex-col">
                        <input
                            className={`w-full rounded-2xl border p-2 text-3xl ${errors.username ? 'border-red-400' : 'border-emerald-800'}`}
                            placeholder="Digite o nome do usuario"
                            type="text"
                            name="name"
                            id="name"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-700">{errors.username}</p>
                        )}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="mr-2 w-fit text-left text-3xl font-bold text-[#112016]"
                    >
                        Email:
                    </label>
                    <input
                        className={`w-full rounded-2xl border p-2 text-3xl ${errors.email ? 'border-red-400' : 'border-emerald-800'}`}
                        placeholder="Digite o email do usuario"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className="mr-2 w-fit text-left text-3xl font-bold text-[#112016]"
                    >
                        Senha:
                    </label>

                    <div className="flex flex-col">
                        <div className="relative flex items-center justify-center">
                            <input
                                className={`w-full rounded-2xl border ${errors.password ? 'border-red-400' : 'border-emerald-800'} p-2 text-3xl`}
                                placeholder="Digite o email do usuario"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-5 cursor-pointer transition-colors duration-300 ease-in-out hover:opacity-50"
                                onClick={() => setShowPassword((visible) => !visible)}
                            >
                                {showPassword ? <EyeDashed /> : <EyeClosed />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-700">{errors.password}</p>
                        )}
                    </div>
                </div>

                <section className="relative w-full">
                    <label className="mr-2 w-fit text-left text-3xl font-bold text-[#112016]">
                        Função:
                    </label>

                    <button
                        type="button"
                        className={`flex w-full cursor-pointer items-center justify-between bg-(--menu-color) px-4 py-3 text-(--main-bg) transition-colors hover:bg-stone-500 ${
                            showRoles ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
                        }`}
                        onClick={() => setShowRoles((visible) => !visible)}
                    >
                        {roles.find((option) => option.value === role)?.label ??
                            'Selecione uma função'}
                        <ChevronDown size={20} />
                    </button>

                    {showRoles && (
                        <section className="absolute top-full left-0 z-20 w-full overflow-hidden rounded-b-2xl border-2 border-t-0 border-(--menu-color) bg-(--menu-color) text-(--main-bg) shadow-lg">
                            {roles.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className="block w-full cursor-pointer px-4 py-3 text-left hover:bg-stone-500"
                                    onClick={() => {
                                        setRole(option.value)
                                        setShowRoles(false)
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </section>
                    )}
                    {errors.role && <p className="mt-1 text-sm text-red-700">{errors.role}</p>}
                </section>
                <button
                    type="submit"
                    disabled={isCreating}
                    className="mt-8 w-full cursor-pointer rounded-2xl border-[#112016] bg-(--menu-color) p-4 text-3xl text-(--main-bg) hover:border-2 hover:bg-stone-500"
                >
                    {isCreating ? (
                        <span className="inline-flex items-center justify-center gap-2">
                            <span
                                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                                aria-hidden="true"
                            ></span>
                        </span>
                    ) : (
                        'Criar usuario'
                    )}
                </button>
            </form>
        </section>
    )
}

export default CreateUserForm
