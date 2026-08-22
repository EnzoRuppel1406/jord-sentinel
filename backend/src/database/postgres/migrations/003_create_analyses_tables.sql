DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'analysis_status_type') THEN
        CREATE TYPE analysis_status_type AS ENUM ('free', 'conditional', 'restricted');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS analyses (
    id UUID PRIMARY KEY,
    company_id UUID REFERENCES companies(id) ON DELETE RESTRICT,
    user_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    analysis_status analysis_status_type NOT NULL,
    car_code CHAR(43) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL default NOW(),

    CONSTRAINT car_code_exact_length CHECK (length(trim(car_code)) = 43)
);

CREATE TABLE IF NOT EXISTS analyses_findings (
    id UUID PRIMARY KEY,
    analysis_id UUID REFERENCES analyses(id) ON DELETE RESTRICT,
    restriction_type VARCHAR(80) NOT NULL,
    overlay_area NUMERIC(10, 2) NOT NULL,
    details JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);