import { PostgresClient } from '../../database/postgres/client.js'

export class PostgresAnalysisRepository {
    async create(createAnalysisParams) {
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

        const analysis = await PostgresClient.query('SELECT * FROM analyses WHERE id = $1', [
            createAnalysisParams.id,
        ])

        return analysis
    }
}
