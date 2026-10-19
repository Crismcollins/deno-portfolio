CREATE TABLE IF NOT EXISTS cv_configs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    sections_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    title VARCHAR(255),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cv_configs_user_id ON cv_configs(user_id);

CREATE OR REPLACE FUNCTION add_cv_configs_table()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- Tabla creada arriba; esta función permite ejecutar la migración por rpc si se desea.
    NULL;
END $$;

SELECT add_cv_configs_table();
