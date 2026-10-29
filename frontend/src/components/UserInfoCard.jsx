import { SquareX } from 'lucide-react'
import { useState } from 'react'
import validator from 'validator'
import { api } from '../services/api'

const UserInfoCard = ({ admin, user, closeCard, onUpdated }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user.name ?? '')
    const [email, setEmail] = useState(user.email ?? '')
    const [role, setRole] = useState(user.role ?? '')
    const [isActive, setIsActive] = useState(user.isActive ?? false)
    const [isSaving, setIsSaving] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [showValidation, setShowValidation] = useState(false)
    const [pendingAction, setPendingAction] = useState(null)

    const [validationPassword, setValidationPassword] = useState('')

    const validateAdminInputs = () => {
        const newErrors = {}

        if (!validationPassword.trim()) {
            newErrors.validationPassword = 'Informe a senha.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateInputs = () => {
        const newErrors = {}

        if (!name.trim()) {
            newErrors.name = 'Informe o nome.'
        }

        if (!email.trim()) {
            newErrors.email = 'Informe o e-mail.'
        } else if (!validator.isEmail(email)) {
            newErrors.email = 'O e-mail nao e valido'
        }

        if (!role) {
            newErrors.role = 'Selecione uma função.'
        }

        if (password.trim() && password.trim().length < 8) {
            newErrors.password = 'A senha deve conter pelo menos 8 caracteres'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const cancelValidation = () => {
        setValidationPassword('')
        setShowValidation(false)
    }

    const validateAdminUser = async () => {
        setErrorMessage('')
        if (!validateAdminInputs()) {
            return false
        }

        try {
            await api.post('/users/admin/validate-credentials', { password: validationPassword })
            return true
        } catch (error) {
            setErrorMessage(error.response?.data?.message ?? 'Senha incorreta. Tente novamente.')
            return false
        }
    }

    const changeUserActivationStatus = async () => {
        try {
            setIsSaving(true)

            isActive
                ? await api.delete(`/users/admin/deactivate/${user.key}`)
                : await api.put(`users/admin/activate/${user.key}`)

            return true
        } catch (error) {
            console.error('Status:', error.response?.status)
            console.error('Resposta do backend:', error.response?.data)
            console.error('Erro completo:', error)
            setErrorMessage(
                error.response?.data?.message ??
                    'Não foi possível atualizar os dados do usuário. Tente novamente.'
            )
            return false
        } finally {
            setIsSaving(false)
        }
    }

    const cancelEditing = () => {
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
        setPassword('')
        setIsEditing(false)
    }

    const handleEditSubmit = (event) => {
        event.preventDefault()
        setErrorMessage('')

        if (!validateInputs()) {
            return
        }

        setPendingAction('edit')
        setShowValidation(true)
    }

    const saveUserChanges = async () => {
        try {
            setIsSaving(true)

            const updateData = {
                name: name.trim(),
                email: email.trim(),
                role,
            }

            if (password.trim()) {
                updateData.password = password
            }
            await api.put(`/users/admin/update/${user.key}`, updateData)

            return true
        } catch (error) {
            console.error('Status:', error.response?.status)
            console.error('Resposta do backend:', error.response?.data)
            console.error('Erro completo:', error)
            setErrorMessage(
                error.response?.data?.message ??
                    'Não foi possível atualizar os dados do usuário. Tente novamente.'
            )
            return false
        } finally {
            setIsSaving(false)
        }
    }

    const confirmAdminAction = async () => {
        const adminIsValidated = await validateAdminUser()

        if (!adminIsValidated) return

        let actionSucceeded = false

        if (pendingAction === 'status') {
            actionSucceeded = await changeUserActivationStatus()
        }

        if (pendingAction === 'edit') {
            actionSucceeded = await saveUserChanges()
        }

        if (!actionSucceeded) return

        await onUpdated()
    }

    return (
        <section className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            {showValidation && (
                <section className="fixed inset-0 z-60 flex items-center justify-center bg-black/30 p-4">
                    <section className="fixed flex h-fit w-md flex-col gap-3 self-center rounded bg-(--main-bg) p-5">
                        {errorMessage && (
                            <p
                                role="alert"
                                className="rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-800"
                            >
                                {errorMessage}
                            </p>
                        )}

                        <div className="rounded-xl border border-stone-300 bg-white/70 p-4">
                            <dt className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                                Nome
                            </dt>
                            <dd className="font-medium wrap-break-word text-(--menu-color)">
                                {admin.name}
                            </dd>
                        </div>

                        <div className="rounded-xl border border-stone-300 bg-white/70 p-4">
                            <dt className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                                Senha
                            </dt>

                            <input
                                id="validate-password"
                                name="password"
                                type="password"
                                value={validationPassword}
                                onChange={(event) => setValidationPassword(event.target.value)}

                                className="w-full rounded-xl border-0 bg-black/5 p-3 text-xl outline-none focus:border-2 focus:border-emerald-600"
                            />

                            {errors.validationPassword && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.validationPassword}
                                </p>
                            )}
                        </div>

                        <div className="mt-2 flex w-full items-center justify-around gap-5">
                            <button
                                type="button"
                                className="cursor-pointer rounded-xl border border-red-500 bg-red-50 px-5 py-3 text-red-400 transition-colors duration-200 hover:bg-red-300 hover:text-red-900"
                                onClick={cancelValidation}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer rounded-xl border border-(--menu-color) px-5 py-3 text-(--menu-color) transition-colors hover:bg-stone-200"
                                onClick={confirmAdminAction}
                            >
                                Confirmar
                            </button>
                        </div>
                    </section>
                </section>
            )}
            <section className="flex w-full max-w-xl flex-col rounded-2xl border-2 border-(--menu-color) bg-(--main-bg) p-6 shadow-2xl">
                <h1 className="mb-5 flex w-full items-center justify-between rounded bg-(--menu-color) p-4 text-center font-bold text-(--main-bg)">
                    Dados do funcionário - {user.name}
                    <button
                        type="button"
                        className="cursor-pointer transition-colors duration-300 ease-in-out hover:opacity-50"
                        onClick={closeCard}
                    >
                        <SquareX size={40} />
                    </button>
                </h1>
                {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="edit-name"
                                className="mb-1 block font-semibold text-(--menu-color)"
                            >
                                Nome
                            </label>
                            <input
                                id="edit-name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="w-full rounded-xl border border-emerald-800 bg-white p-3 outline-none focus:border-2 focus:border-emerald-600"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-700">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="edit-email"
                                className="mb-1 block font-semibold text-(--menu-color)"
                            >
                                E-mail
                            </label>
                            <input
                                id="edit-email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full rounded-xl border border-emerald-800 bg-white p-3 outline-none focus:border-2 focus:border-emerald-600"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-700">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="edit-role"
                                className="mb-1 block font-semibold text-(--menu-color)"
                            >
                                Função
                            </label>
                            <select
                                id="edit-role"
                                name="role"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                className="w-full cursor-pointer rounded-xl border border-emerald-800 bg-white p-3 outline-none focus:border-2 focus:border-emerald-600"
                            >
                                <option value="">Selecione uma função</option>
                                <option value="Analista">Analista</option>
                                <option value="Admin">Administrador</option>
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-700">{errors.role}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="edit-password"
                                className="mb-1 block font-semibold text-(--menu-color)"
                            >
                                Nova senha
                                <span className="font-normal text-stone-500">(opcional)</span>
                            </label>
                            <input
                                id="edit-password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Deixe em branco para manter a senha atual"
                                className="w-full rounded-xl border border-emerald-800 bg-white p-3 outline-none focus:border-2 focus:border-emerald-600"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-700">{errors.password}</p>
                            )}
                        </div>

                        {errorMessage && (
                            <p
                                role="alert"
                                className="rounded-lg border border-red-300 bg-red-100 p-3 text-sm text-red-800"
                            >
                                {errorMessage}
                            </p>
                        )}

                        <footer className="flex justify-end gap-3 border-t border-stone-300 pt-4">
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="cursor-pointer rounded-xl border border-(--menu-color) px-5 py-3 text-(--menu-color) transition-colors hover:bg-stone-200"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="cursor-pointer rounded-xl bg-(--menu-color) px-5 py-3 text-(--main-bg) transition-colors hover:bg-stone-500 disabled:cursor-wait disabled:opacity-70"
                            >
                                {isSaving ? 'Salvando...' : 'Salvar alterações'}
                            </button>
                        </footer>
                    </form>
                ) : (
                    <>
                        <dl className="grid grid-cols-1 gap-3">
                            <div className="rounded-xl border border-stone-300 bg-white/70 p-4">
                                <dt className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                                    Nome
                                </dt>
                                <dd className="font-medium wrap-break-word text-(--menu-color)">
                                    {name}
                                </dd>
                            </div>

                            <div className="rounded-xl border border-stone-300 bg-white/70 p-4">
                                <dt className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                                    E-mail
                                </dt>
                                <dd className="font-medium wrap-break-word text-(--menu-color)">
                                    {email}
                                </dd>
                            </div>

                            <div className="rounded-xl border border-stone-300 bg-white/70 p-4">
                                <dt className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                                    Função
                                </dt>
                                <dd className="font-medium wrap-break-word text-(--menu-color)">
                                    {role}
                                </dd>
                            </div>

                            <div className="rounded-xl border border-stone-300 bg-white/70 p-4">
                                <dt className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                                    Status
                                </dt>
                                <dd className="font-medium wrap-break-word text-(--menu-color)">
                                    {isActive ? 'Ativo' : 'Inativo'}
                                </dd>
                            </div>
                        </dl>

                        <footer className="mt-6 flex justify-end gap-3 border-t border-stone-300 pt-4">
                            <button
                                type="button"
                                className="cursor-pointer rounded-xl border border-(--menu-color) px-5 py-3 text-(--menu-color) transition-colors hover:bg-stone-200"
                                onClick={() => setIsEditing(true)}
                            >
                                Editar dados
                            </button>
                            <button
                                type="button"
                                className={`cursor-pointer rounded-xl border transition-colors duration-200 ${isActive ? 'border-red-500 bg-red-50 text-red-400 hover:bg-red-300 hover:text-red-900' : 'border-(--menu-color) bg-emerald-50 text-(--menu-color) hover:bg-stone-200'} px-5 py-3 transition-colors`}
                                onClick={() => {
                                    setPendingAction('status')
                                    setShowValidation(true)
                                }}
                                disabled={isSaving}
                            >
                                {isSaving
                                    ? 'Salvando...'
                                    : isActive
                                      ? 'Desativar usuario'
                                      : 'Ativar usuario'}
                            </button>
                        </footer>
                    </>
                )}
            </section>
        </section>
    )
}

export default UserInfoCard
