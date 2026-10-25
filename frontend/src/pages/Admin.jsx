import { useCallback, useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { api } from '../services/api'
import { AuthContext } from '../contexts/AuthContext'
import { CircleCheck, UserRoundPlusIcon, X } from 'lucide-react'
import AdminUsersListItem from '../components/AdminUsersListItem'

import CreateUserForm from '../components/CreateUserForm'

const Admin = () => {
    const { user } = useContext(AuthContext)
    const [company, setCompany] = useState('')
    const [usersList, setUsersList] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const loadUsersList = useCallback(async () => {
        try {
            const { data } = await api.get('/users/admin/listUsers')
            setUsersList(data)
        } catch (error) {
            console.log(`Erro ao buscar usuários: ${error}`)
        }
    }, [])

    const handleUserCreated = async () => {
        await loadUsersList()
        setShowForm(false)
        setSuccessMessage('Usuário cadastrado com sucesso.')
    }

    useEffect(() => {
        const getUserCompany = async (companyId) => {
            try {
                const { data } = await api.get(`/companies/${companyId}`)

                setCompany(data)
            } catch (error) {
                console.log(`Deu algum erro: ${error}`)
            }
        }

        getUserCompany(user.companyId)
        loadUsersList()
    }, [loadUsersList, user.companyId])

    useEffect(() => {
        if (!successMessage) return

        const timeoutId = setTimeout(() => {
            setSuccessMessage('')
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [successMessage])

    return (
        <>
            <section className="flex min-h-screen w-full justify-center bg-(--main-bg) font-sans">
                <Sidebar />
                <section className="flex h-screen w-full flex-col items-center justify-between p-30 text-2xl">
                    {showForm && (
                        <CreateUserForm
                            company={company}
                            closeForm={() => setShowForm(false)}
                            onCreated={handleUserCreated}
                        />
                    )}
                    {successMessage && (
                        <div
                            role="status"
                            className="fixed top-6 right-6 z-70 flex w-full max-w-sm items-start gap-3 rounded-xl border-2 border-emerald-800 bg-emerald-50 p-4 text-emerald-950 shadow-2xl"
                        >
                            <CircleCheck className="mt-0.5 shrink-0 text-emerald-700" size={24} />

                            <div className="flex-1">
                                <p className="font-bold">Cadastro concluído</p>
                                <p className="text-sm">Usuário cadastrado com sucesso.</p>
                            </div>

                            <button
                                type="button"
                                aria-label="Fechar mensagem"
                                className="cursor-pointer text-emerald-800 hover:opacity-60"
                                onClick={() => setSuccessMessage('')}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                    <section className="flex h-25 w-3/4 items-center justify-between rounded-xl border-2 border-(--menu-color) p-8">
                        <h1>
                            Usuarios Cadastrados -
                            <span className="rounded bg-(--menu-color) p-2 font-bold text-(--main-bg)">
                                {company.name}
                            </span>
                        </h1>
                        <button
                            type="button"
                            className="flex h-fit w-fit cursor-pointer flex-row rounded bg-(--menu-color) p-2 text-center text-(--main-bg) transition-colors duration-300 ease-in-out hover:border-2 hover:bg-stone-500"
                            onClick={() => setShowForm((visible) => !visible)}
                        >
                            <UserRoundPlusIcon />
                            Novo Usuario
                        </button>
                    </section>
                    <section className="mt-10 h-full w-3/4 rounded-xl border-2 border-(--menu-color)">
                        <section className="flex h-fit max-h-5/6 w-full items-start overflow-y-auto rounded-xl border bg-olive-300 text-center">
                            <table className="w-full table-fixed border-collapse border-spacing-x-4 border-spacing-y-2">
                                <thead>
                                    <tr>
                                        <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                            <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                                Nome
                                            </div>
                                        </th>
                                        <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                            <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                                Email
                                            </div>
                                        </th>
                                        <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                            <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                                Funcao
                                            </div>
                                        </th>
                                        <th className="sticky top-0 z-10 bg-olive-300 px-4">
                                            <div className="rounded-2xl border-2 border-stone-400 bg-white py-2 shadow-md">
                                                Status
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.length
                                        ? usersList.map((user) => {
                                              return (
                                                  <AdminUsersListItem key={user.key} user={user} />
                                              )
                                          })
                                        : 'Nenhum usuario cadastrado'}
                                </tbody>
                            </table>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Admin
