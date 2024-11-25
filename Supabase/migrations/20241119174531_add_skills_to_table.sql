CREATE OR REPLACE FUNCTION add_skills_to_table()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'TypeScript' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('TypeScript', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'JavaScript' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('JavaScript', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'C#' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('C#', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Swift' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Swift', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'HTML' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('HTML', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'CSS' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('CSS', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'React Native' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('React Native', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Unity' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Unity', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'PhaserJS' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('PhaserJS', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'SwiftUI' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('SwiftUI', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'UIKit' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('UIKit', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'NextJS' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('NextJS', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'React' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('React', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Deno' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Deno', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'NodeJS' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('NodeJS', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Bootstrap' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Bootstrap', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Git' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Git', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'AWS' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('AWS', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Firebase' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Firebase', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Playfab' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Playfab', 'hard', null, 'both', 1);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM skills
        WHERE name = 'Adobe Illustrator' AND language = 'both'
    ) THEN
        INSERT INTO skills (name, type, image, language, user_id)
        VALUES ('Adobe Illustrator', 'hard', null, 'both', 1);
    END IF;
END;
$$;
