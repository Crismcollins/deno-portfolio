CREATE OR REPLACE FUNCTION add_education_to_table()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM educations
        WHERE title = 'Ingeniería informática' AND language = 'es'
    ) THEN
        INSERT INTO educations (user_id, title, institution, description, start_date, end_date, language, location, logo)
        VALUES ('1', 'Ingeniería informática', 'Universidad Tecnológica de Chile', null, '2015-03-09', '2019-03-29', 'es', 'Santiago, Chile', '{"id":"bf84b000-a3b4-458d-9952-c5794c1dea9d","name":"inacap_logo.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/inacap_logo.jpeg","type":"image"}');
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM educations
        WHERE title = 'Computer Science' AND language = 'en'
    ) THEN
        INSERT INTO educations (user_id, title, institution, description, start_date, end_date, language, location, logo)
        VALUES ('2', 'Computer Science', 'Universidad Tecnológica de Chile', null, '2015-03-09', '2019-03-29', 'en', 'Santiago, Chile', '{"id":"bf84b000-a3b4-458d-9952-c5794c1dea9d","name":"inacap_logo.jpeg","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/inacap_logo.jpeg","type":"image"}');
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM educations
        WHERE title = 'Curso de inglés B1+' AND language = 'es'
    ) THEN
        INSERT INTO educations (user_id, title, institution, description, start_date, end_date, language, location, logo)
        VALUES ('1', 'Curso de inglés B1+', 'EClass', null, '2020-12-09', '2021-03-09', 'es', 'Online', '{"id":"033cd7cc-8ab7-4e98-a9a8-622ee28c7683","name":"eClass-Logo.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/eClass-Logo.png","type":"image"}');
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM educations
        WHERE title = 'English course B1+' AND language = 'en'
    ) THEN
        INSERT INTO educations (user_id, title, institution, description, start_date, end_date, language, location, logo)
        VALUES ('2', 'English course B1+', 'EClass', null, '2020-12-09', '2021-03-09', 'en', 'Online', '{"id":"033cd7cc-8ab7-4e98-a9a8-622ee28c7683","name":"eClass-Logo.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/eClass-Logo.png","type":"image"}');
    END IF;
END $$;
