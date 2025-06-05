CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    company VARCHAR(255),
    language VARCHAR(5) CHECK (language IN ('en', 'es')),
    company_description TEXT,
    achievements TEXT,
    location VARCHAR(255),
    contact VARCHAR(255),
    logo TEXT
);


CREATE OR REPLACE FUNCTION add_job_to_table()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM jobs
        WHERE title = 'Líder Técnico Front-end' AND user_id = 1
    ) THEN
        INSERT INTO jobs (user_id, title, description, start_date, end_date, company, language, company_description, achievements, location, contact, logo)
        VALUES (
            1,
            'Líder Técnico Front-end', 
            '• Desarrollo de videojuegos y sitios web de manera rápida y fluída.
• Trabajar de manera colaborativa con diseñadores y testers para diseñar soluciones innovadoras y resolver problemas de manera metódica en los sistemas de producción.
• Dirección de equipos, planificación de tareas, reporte de avance de proyectos.', 
            '2021-03-09 00:00:00+00', 
            '2022-10-28 00:00:00+00', 
            'Gamelab Education', 
            'es', 
            'Proveedor líder de simuladores de gestión para la enseñanza entretenida
y eficaz. Facilitando a profesores la enseñanza de negocio.', 
            '• Ascenso a líder técnico front-end
            • Migración de tecnología a juego SodaPopGame', 
            'Santiago, Chile', 
            'Felipe Walker, CEO de Gamelab Education - +56985270398', 
            '{"id":"e21a8649-c95c-48d6-b423-b90b8d27ca42","name":"gamelab_chile_logo.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/gamelab_chile_logo.jpeg","type":"image"}'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM jobs
        WHERE title = 'Desarrollador mobile' AND user_id = 1
    ) THEN
        INSERT INTO jobs (user_id, title, description, start_date, end_date, company, language, company_description, achievements, location, contact, logo)
        VALUES (
            1,
            'Desarrollador mobile', 
            '• Diseño y desarrollo de aplicaciones móviles desde el concepto en base a metodologías de diseño de software.
• Diseño de interfaces de usuario.
• Toma de requerimientos y paso a producción.', 
            '2020-06-01 00:00:00+00', 
            '2024-09-12 00:00:00+00', 
            'Independiente', 
            'es', 
            'Desarrollo personal y como freelancer de aplicaciones móviles.', 
            null, 
            'Santiago, Chile', 
            null, 
            null
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM jobs
        WHERE title = 'Ingeniero de sistemas' AND user_id = 1
    ) THEN
        INSERT INTO jobs (user_id, title, description, start_date, end_date, company, language, company_description, achievements, location, contact, logo)
        VALUES (
            1,
            'Ingeniero de sistemas', 
            '• Desarrollo de interfaces web responsivas.
• Desarrollo de aplicaciones móviles para Android y iOS.
• Colaboración efectiva con diseñadores para garantizar una implementación coherente y visualmente atractiva.
• Dirigió el desarrollo de nuevas funcionalidades, mejorando la experiencia de usuario y acelerando desarrollos futuros.', 
            '2023-11-09 00:00:00+00', 
            '2024-09-10 00:00:00+00', 
            'Meydey', 
            'es', 
            'Meydey es una comunidad digital auto-gestionable, que facilita la conectividad
para la contratación de consultas de salud de manera amigable y cercana.', 
            '• Desarrollo y lanzamiento de app Meydey
            • Liderazgo de equipos de desarrollo. ',
            'Santiago, Chile', 
            'Mario Lavandero, ex CTO de Meydey - +56997765669', 
            '{"id":"82d3b714-445e-4f55-8fd5-6fcdf962bea8","name":"meydey_logo.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/meydey_logo.jpeg","type":"image"}'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM jobs
        WHERE title = 'Front-end Technical Leader' AND user_id = '2'
    ) THEN
        INSERT INTO jobs (user_id, title, description, start_date, end_date, company, language, company_description, achievements, location, contact, logo)
        VALUES (
            '2', 
            'Front-end Technical Leader', 
            '• Fast and smooth development of video games and websites.
• Collaborating with designers and testers to create innovative solutions and methodically solve problems in production systems.
• Team leadership, task planning, and project progress reporting.', 
            '2021-03-09 00:00:00+00', 
            '2022-10-28 00:00:00+00', 
            'Gamelab Education', 
            'en', 
            'Leading provider of management simulators for engaging and effective teaching. Enabling teachers to teach business.', 
            '• Promoted to front-end technical lead
            • Technology migration to SodaPopGame', 
            'Santiago, Chile', 
            'Felipe Walker, CEO of Gamelab Education - +56985270398', 
            '{"id":"e21a8649-c95c-48d6-b423-b90b8d27ca42","name":"gamelab_chile_logo.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/gamelab_chile_logo.jpeg","type":"image"}'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM jobs
        WHERE title = 'Mobile Developer' AND user_id = '2'
    ) THEN
        INSERT INTO jobs (user_id, title, description, start_date, end_date, company, language, company_description, achievements, location, contact, logo)
        VALUES (
            '2', 
            'Mobile Developer', 
            '• Design and development of mobile applications from concept using software design methodologies.
• User interface design.
• Requirements gathering and deployment to production.', 
            '2020-06-01 00:00:00+00', 
            '2024-09-12 00:00:00+00', 
            'Independent Worker', 
            'en', 
            'Personal development and as a freelance mobile application developer.', 
            null, 
            'Santiago, Chile', 
            null, 
            null
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM jobs
        WHERE title = 'Systems Engineer' AND user_id = '2'
    ) THEN
        INSERT INTO jobs (user_id, title, description, start_date, end_date, company, language, company_description, achievements, location, contact, logo)
        VALUES (
            '2', 
            'Systems Engineer', 
            '• Development of responsive web interfaces.
            • Development of mobile applications for Android and iOS.
            • Effective collaboration with designers to ensure a consistent and visually appealing implementation.
            • Lead the development of new features, enhancing the user experience and accelerating future developments.', 
            '2023-11-09 00:00:00+00', 
            '2024-09-10 00:00:00+00', 
            'Meydey', 
            'en', 
            'Meydey is a self-manageable digital community that facilitates connectivity for the booking of health consultations in a friendly and approachable manner.', 
            '• Development and launch of the Meydey app
            • Leadership of development teams ',
            'Santiago, Chile', 
            'Mario Lavandero, ex CTO of Meydey - +56997765669', 
            '{"id":"82d3b714-445e-4f55-8fd5-6fcdf962bea8","name":"meydey_logo.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/meydey_logo.jpeg","type":"image"}'
        );
    END IF;
END;
$$;

SELECT add_job_to_table();
