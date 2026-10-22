import { pool, PostgresClient } from '../../../database/postgres/client.js'

export class PostgresAnalysisRepository {
    async create(createAnalysisParams) {
        const client = await pool.connect()

        try {
            await client.query('BEGIN')

            await client.query(
                'INSERT INTO analyses (id, company_id, user_id, analysis_status, car_code, property_area, property_city, property_state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
                [
                    createAnalysisParams.id,
                    createAnalysisParams.companyId,
                    createAnalysisParams.userId,
                    createAnalysisParams.status,
                    createAnalysisParams.carCode,
                    createAnalysisParams.area,
                    createAnalysisParams.city,
                    createAnalysisParams.state,
                ]
            )

            if (createAnalysisParams.restrictions) {
                for (const restriction of createAnalysisParams.restrictions) {
                    await client.query(
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

            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            await client.release()
        }

        const analysis = await PostgresClient.query(
            'SELECT * FROM analyses a LEFT JOIN analyses_findings f on a.id = f.analysis_id WHERE a.id = $1',
            [createAnalysisParams.id]
        )

        return analysis
    }

    async listByCompanyId(companyId) {
        const analysesList = await PostgresClient.query(
            'SELECT id, user_id, analysis_status, car_code, property_city, property_state, property_area, created_at FROM analyses WHERE company_id = $1',
            [companyId]
        )

        return analysesList
    }
}
