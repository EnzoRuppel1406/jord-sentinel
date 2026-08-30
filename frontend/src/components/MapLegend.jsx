const MapLegend = () => {
    return (
        <section className="text-md absolute bottom-4 left-4 z-1000 w-64 rounded-xl border border-slate-900 bg-indigo-100 p-4 text-black shadow-md">
            <strong className="text-md mr-auto mb-2 ml-auto block w-fit rounded-md bg-(--menu-color) p-2 text-center font-semibold tracking-wider text-indigo-50 uppercase">
                Legenda
            </strong>
            <ul className="space-y-2 text-lg">
                <li>
                    <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-[#FFEB4F]"></span>
                    <span>CAR</span>
                </li>

                <li>
                    <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-[#9E0202]"></span>
                    <span>Embargo Ibama</span>
                </li>

                <li>
                    <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-[#7203AD]"></span>
                    <span>Terra Indígena</span>
                </li>

                <li>
                    <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-[#13077D]"></span>
                    <span>Unidade de Conservação</span>
                </li>

                <li>
                    <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-[#59FA48]"></span>
                    <span>Floresta Pública</span>
                </li>

                <li>
                    <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-[#380E00]"></span>
                    <span>Quilombo</span>
                </li>

                <li>
                    <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-[#ddd]"></span>
                    <span>PRODES</span>
                </li>
            </ul>
        </section>
    )
}

export default MapLegend
