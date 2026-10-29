const AdminUsersListItem = ({ user, onClick }) => {
    const { name, email, role, isActive } = user
    return (
        <tr className="group cursor-pointer" onClick={onClick}>
            <td className="border-b p-4 group-hover:bg-slate-300">{name}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">{email}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">{role}</td>
            <td className="border-b p-4 group-hover:bg-slate-300">
                <span
                    className={`${isActive ? 'bg-emerald-300' : 'bg-red-300 text-red-600'} rounded p-2`}
                >
                    {isActive ? 'Ativo' : 'Inativo'}
                </span>
            </td>
        </tr>
    )
}
export default AdminUsersListItem
