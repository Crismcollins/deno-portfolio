CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    profession VARCHAR(255),
    alias VARCHAR(255),
    email VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    location VARCHAR(255),
    phone_number VARCHAR(255),
    image TEXT,
    about_me TEXT,
    study_title VARCHAR(255),
    language VARCHAR(5) CHECK (language IN ('en', 'es', 'both'))
);

CREATE OR REPLACE FUNCTION add_data_to_users_table()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM users
        WHERE email = 'cris.m.collins@gmail.com'
    ) THEN
        INSERT INTO users 
        (full_name, profession, alias, email, linkedin_url, image, about_me, study_title, language, location, phone_number, github_url)
        VALUES 
        ('Cristóbal Molina Collins',
        'Desarrollador de Aplicaciones Móviles y Videojuegos',
        'crismcollins',
        'cris.m.collins@gmail.com',
        'https://www.linkedin.com/in/cristobal-alejandro-molina-collins-b595a8140/',
        '{"id":"f3bb8c5f-dcc5-4ef3-8c1b-6919abfb0ee1","name":"cris.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/cris.jpeg"}',
        'Tengo una pasión innata por el desarrollo mobile, con una sólida formación académica y autodidacta en base a logros, además poseo una excelente capacidad de comunicación y trabajo en equipo.',
        'Ingeniero informático',
        'es',
        'Santiago, Chile',
        '+56989050986',
        'https://github.com/Crismcollins'
        );

        INSERT INTO users 
        (full_name, profession, alias, email, linkedin_url, image, about_me, study_title, language, location, phone_number, github_url)
        VALUES 
        ('Cristóbal Molina Collins', 
        'Mobile and Game Developer',
        'crismcollins',
        'cris.m.collins@gmail.com',
        'https://www.linkedin.com/in/cristobal-alejandro-molina-collins-b595a8140/',
        '{"id":"f3bb8c5f-dcc5-4ef3-8c1b-6919abfb0ee1","name":"cris.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/cris.jpeg"}',
        'I have an innate passion for mobile development, with a solid academic and self-taught background based on achievements, I also have excellent communication and teamwork skills.',
        'Computer Engineer',
        'en',
        'Santiago, Chile',
        '+56989050986',
        'https://github.com/Crismcollins'
        );
    END IF;
END $$;

SELECT add_data_to_users_table();
