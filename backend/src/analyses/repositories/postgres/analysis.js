import { pool, PostgresClient } from '../../../database/postgres/client.js'

export class PostgresAnalysisRepository {
    async create(createAnalysisParams) {
        const client = await pool.connect()

        try {
            await client.query('BEGIN')

            await client.query(
                `INSERT INTO analyses (
                id,
                company_id,
                user_id,
                car_status,
                car_code,
                property_area,
                property_city,
                property_state,
                risk_score,
                risk_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
                [
                    createAnalysisParams.id,
                    createAnalysisParams.companyId,
                    createAnalysisParams.userId,
                    createAnalysisParams.status,
                    createAnalysisParams.carCode,
                    createAnalysisParams.area,
                    createAnalysisParams.city,
                    createAnalysisParams.state,
                    createAnalysisParams.riskScore,
                    createAnalysisParams.riskLevel,
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
            `SELECT 
                a.id AS analysis_id,
                a.company_id,
                a.user_id,
                a.car_status,
                a.car_code,
                a.property_area,
                a.property_city,
                a.property_state,
                a.risk_score,
                a.risk_level,
                a.created_at,
                f.id AS finding_id,
                f.restriction_type,
                f.overlay_area,
                f.details
            FROM analyses a LEFT JOIN analyses_findings f on a.id = f.analysis_id WHERE a.id = $1`,
            [createAnalysisParams.id]
        )

        return analysis
    }

    async listByCompanyId(companyId) {
        const analysesList = await PostgresClient.query(
            `SELECT 
                id,
                user_id,
                car_status,
                car_code,
                property_city,
                property_state,
                property_area,
                risk_score,
                risk_level,
                created_at
            FROM analyses WHERE company_id = $1`,
            [companyId]
        )

        return analysesList
    }

    async summarizeByCompanyId(companyId) {
        const [totals] = await PostgresClient.query(
            `SELECT 
                (SELECT COUNT(*)
                FROM analyses
                WHERE company_id = $1) AS total_analyses,

                (SELECT COUNT(DISTINCT car_code)
                FROM analyses
                WHERE company_id = $1) AS total_properties,
                
                (SELECT COUNT(*)
                FROM analyses_findings f
                JOIN analyses a ON a.id = f.analysis_id
                WHERE a.company_id = $1) AS total_findings`,
            [companyId]
        )

        const totalFindingsByRestrictionType = await PostgresClient.query(
            `
            SELECT f.restriction_type, COUNT(*) AS total
            FROM analyses_findings f
            JOIN analyses a ON a.id = f.analysis_id
            WHERE a.company_id = $1
            GROUP BY f.restriction_type`,
            [companyId]
        )

        const summary = {
            totalAnalyses: Number(totals.total_analyses),
            totalProperties: Number(totals.total_properties),
            totalFindings: Number(totals.total_findings),
            findingsByRestriction: totalFindingsByRestrictionType.map((item) => ({
                restrictionType: item.restriction_type,
                total: Number(item.total),
            })),
        }

        return summary
    }
}
