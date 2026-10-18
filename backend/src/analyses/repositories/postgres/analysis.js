import { PostgresClient } from '../../../database/postgres/client.js'

export class PostgresAnalysisRepository {
    async create(createAnalysisParams) {
        try {
            await PostgresClient.query('BEGIN')

            await PostgresClient.query(
                'INSERT INTO analyses (id, company_id, user_id, analysis_status, car_code) VALUES ($1, $2, $3, $4, $5);',
                [
                    createAnalysisParams.id,
                    createAnalysisParams.companyId,
                    createAnalysisParams.userId,
                    createAnalysisParams.status,
                    createAnalysisParams.carCode,
                ]
            )

            if (createAnalysisParams.restrictions) {
                for (const restriction of createAnalysisParams.restrictions) {
                    await PostgresClient.query(
                        'INSERT INTO analyses_findings (id, analysis_id, restriction_type, overlay_area, details) VALUES ($1, $2, $3, $4, $5)',
                        [
                            restriction.id,
                            restriction.analysisId,
                            restriction.restrictionType,
                            restriction.area,
                            restriction.details,
                        ]
                    )
                }
            }

            await PostgresClient.query('COMMIT')
        } catch (error) {
            await PostgresClient.query('ROLLBACK')
            throw error
        }

        const analysis = await PostgresClient.query(
            'SELECT * FROM analyses a LEFT JOIN analyses_findings f on a.id = f.analysis_id WHERE a.id = $1',
            [createAnalysisParams.id]
        )

        return analysis
    }

    async listByCompanyId(companyId) {
        const analysesList = await PostgresClient.query(
            'SELECT id, user_id, analysis_status, car_code, created_at FROM analyses WHERE company_id = $1',
            [companyId]
        )

        return analysesList
    }
}
