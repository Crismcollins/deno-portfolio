CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(4) CHECK (type IN ('hard', 'soft')),
    image TEXT,
    language VARCHAR(5) CHECK (language IN ('en', 'es', 'both'))
);


CREATE OR REPLACE FUNCTION add_skills_to_table()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'TypeScript' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('TypeScript', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'JavaScript' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('JavaScript', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'C#' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('C#', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Swift' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Swift', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'HTML' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('HTML', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'CSS' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('CSS', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'React Native' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('React Native', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Unity' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Unity', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'PhaserJS' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('PhaserJS', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'SwiftUI' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('SwiftUI', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'UIKit' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('UIKit', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'NextJS' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('NextJS', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'React' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('React', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Deno' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Deno', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'NodeJS' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('NodeJS', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Bootstrap' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Bootstrap', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Git' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Git', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'AWS' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('AWS', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Firebase' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Firebase', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Playfab' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Playfab', 'hard', NULL, 'both', 1);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Adobe Illustrator' AND language = 'both') THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Adobe Illustrator', 'hard', NULL, 'both', 1);
    END IF;
END;
$$;

SELECT add_skills_to_table();
