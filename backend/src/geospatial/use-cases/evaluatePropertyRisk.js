export class EvaluatePropertyRiskUseCase {
    async execute(property, restrictions) {
        let score = 0
        const assessments = []

        if (property.status === 'CA' || property.status === 'SU') {
            score = score + 80
        }

        const overlappingRestrictions = Object.entries(restrictions).flatMap(
            ([source, findings]) =>
                Array.isArray(findings)
                    ? findings
                          .filter((finding) => finding.overlaps_property === true)
                          .map((finding) => ({
                              ...finding,
                              source: finding.source ?? source,
                          }))
                    : []
        )

        if (overlappingRestrictions.length > 0) {
            for (const finding of overlappingRestrictions) {
                switch (finding.source) {
                    case 'Ibama':
                        if (finding.sit_desmate === 'D') {
                            score = score + 90
                            assessments.push({
                                restrictionType: 'ibama',
                                score: 90,
                                level: 'alto',
                                description:
                                    'Sobreposição com Embargo classificado pelo Ibama como relacionado a desmatamento ou queimada.',
                                legalReference: 'MCR-2-9-10',
                                overlapArea: finding.overlap_area,
                            })
                        } else if (finding.sit_desmate === 'N') {
                            score = score + 45
                            assessments.push({
                                restrictionType: 'ibama',
                                score: 45,
                                level: 'moderado',
                                description:
                                    'Sobreposição com embargo do Ibama do Tipo N. O código N não atende ao critério específico de uso econômico de área desmatada ilegalmente do MCR 2-9-10.',
                                legalReference: 'MCR-2-9-10',
                                overlapArea: finding.overlap_area,
                            })
                        } else {
                            score = score + 90
                            assessments.push({
                                restrictionType: 'ibama',
                                score: 90,
                                level: 'alto',
                                description:
                                    'Código de situação do embargo ausente ou desconhecido.',
                                legalReference: 'MCR 2-9-10',
                                overlapArea: finding.overlap_area,
                            })
                        }

                        break
                    case 'CNUC':
                        if (finding.pl_manejo === 'Sim') {
                            score = score + 40
                            assessments.push({
                                restrictionType: 'cnuc',
                                score: 40,
                                level: 'moderado',
                                description:
                                    'Sobreposição com Unidade de Conservação que possui Plano de Manejo. Deve-se estar em conformidade da atividade com o plano de manejo.',
                                legalReference: 'MCR-2-9-5 e MCR-2-9-6',
                                overlapArea: finding.overlap_area,
                            })
                        } else if (finding.pl_manejo !== 'Sim') {
                            score = score + 70
                            assessments.push({
                                restrictionType: 'cnuc',
                                score: 70,
                                level: 'alto',
                                description:
                                    'Sobreposição com Unidade de Conservação sem Plano de Manejo informado. Condições especiais podem se aplicar a UC.',
                                legalReference: 'MCR-2-9-5, MCR-2-9-5-A e MCR-2-9-6',
                                overlapArea: finding.overlap_area,
                            })
                        }
                        break
                    case 'FUNAI':
                        if (
                            finding.fase_ti === 'Regularizada' ||
                            finding.fase_ti === 'Homologada'
                        ) {
                            score = score + 80
                            assessments.push({
                                restrictionType: 'funai',
                                score: 80,
                                level: 'alto',
                                description:
                                    'Sobreposição com terra indígena em fase abrangida pelo critério do MCR.',
                                legalReference: 'MCR-2-9-7',
                                overlapArea: finding.overlap_area,
                            })
                        } else {
                            score = score + 20
                            assessments.push({
                                restrictionType: 'funai',
                                score: 20,
                                level: 'baixo',
                                description:
                                    'Sobreposição com terra indígena em fase que não corresponde às situações pontuadas para este critério no MCR.',
                                legalReference: 'MCR-2-9-7',
                                overlapArea: finding.overlap_area,
                            })
                        }
                        break
                    case 'CNFP':
                        if (finding.tipo !== 'TIPO B') {
                            score = score + 0
                            assessments.push({
                                restrictionType: 'cnfp',
                                score: 0,
                                level: 'baixo',
                                description:
                                    'A área sobreposta não é Floresta Pública Tipo B, que é o tipo abrangido pelo critério considerado no MCR.',
                                legalReference: 'MCR 2-9-14 e 15',
                                overlapArea: finding.overlap_area,
                            })
                        } else if (property.fiscalModules > 15) {
                            score = score + 60
                            assessments.push({
                                restrictionType: 'cnfp',
                                score: 60,
                                level: 'moderado',
                                description:
                                    'Sobreposição com Floresta Pública Tipo B. O imóvel tem mais de 15 módulos fiscais',
                                legalReference: 'MCR 2-9-14 e 15',
                                overlapArea: finding.overlap_area,
                            })
                        } else if (property.fiscalModules <= 15) {
                            score = score + 20
                            assessments.push({
                                restrictionType: 'cnfp',
                                score: 20,
                                level: 'baixo',
                                description:
                                    'Sobreposição com Floresta Pública Tipo B. O imóvel tem até 15 módulos fiscais',
                                legalReference: 'MCR 2-9-14 e 15',
                                overlapArea: finding.overlap_area,
                            })
                        }
                        break
                    case 'PRODES':
                        score = score + 0
                        assessments.push({
                            restrictionType: 'prodes',
                            score: 0,
                            level: 'baixo',
                            description:
                                'Supressão detectada pela base PRODES após 31 de julho de 2019. O início da verificação para fins do MCR depende da faixa de módulos fiscais e do cronograma aplicável.',
                            legalReference: 'MCR 2-9-17 e 18',
                            imageDate: finding.image_date,
                            overlapArea: finding.overlap_area,
                        })
                        break
                }
            }
        }

        const riskLevel = score < 20 ? 'Baixo' : score < 50 ? 'Moderado' : 'Alto'

        return { score, riskLevel, assessments }
    }
}
