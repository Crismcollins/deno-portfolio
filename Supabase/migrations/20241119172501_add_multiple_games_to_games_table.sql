CREATE OR REPLACE FUNCTION add_multiple_games_to_games_table()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'Snake & Blocks' AND language = 'es'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            '1',
            'Snake & Blocks',
            '{"id":"b989d4f7-3d6e-4f72-9754-7323349fe3a8","name":"snakeblocks.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/snakeblocks.png"}',
            '{"id":"8df8efdc-a79a-4fb6-97ab-f8e12bfc5be8","name":"background-snakeblocks__1_.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-snakeblocks__1_.png"}',
            'https://www.youtube.com/embed/7cuV5Dn6NR8',
            null,
            null,
            null,
            '2021-02-26 00:00:00+00',
            'es',
            'Juega a Snake y completa un rompecabezas al mismo tiempo, ¿podrás hacerlo? Acompaña a Snoodle en su largo viaje alrededor del mundo, caminando y superando diferentes obstáculos, trampas y acertijos.'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'SodaPop Game' AND language = 'es'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            '1',
            'SodaPop Game',
            '{"id":"322b0ada-1bdb-428f-a609-ab8c0f09b276","name":"sodapop.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/sodapop.png"}',
            '{"id":"7065a6ee-2de7-4439-812d-4d7f949d8309","name":"background-sodapop.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-sodapop.png"}',
            'https://www.youtube.com/embed/wYi5JdVHhqA',
            'https://cris.gamelab.cl/direct/direct/es',
            null,
            null,
            '2021-06-01 00:00:00+00',
            'es',
            'SodaPop Game es un juego web multijugador que simula la producción de una fábrica embotelladora que produce una marca de refresco para clientes y empresas. Los profesores pueden crear una sesión en vivo para jugar con sus cursos en clase, donde pueden crear y formar grupos con sus alumnos.'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'Rock Paper & Scissor Duel!' AND language = 'es'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            '1',
            'Rock Paper & Scissor Duel!',
            '{"id":"03bd3717-3719-483d-bbe8-7b445c7717fb","name":"rpsduel.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/rpsduel.png"}',
            '{"id":"29f63a24-89dc-4a0d-b79c-c674634e99a1","name":"background-rpsduel.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-rpsduel.png"}',
            'https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/RSA_duel.mp4',
            null,
            null,
            'https://play.google.com/store/apps/details?id=com.ClassBitGames.RockPaperScissorDuel&hl=es_CL',
            '2023-03-29 00:00:00+00',
            'es',
            '¿En busca de un desafío?
¿Aburrido con tiempo libre?
¿Cansado de buscar un juego entretenido?

¡Has entrado a la ficha correcta!

Con este juego de piedra papel y tijeras podrás enfrentarte en un duelo 1v1 contra la IA, donde deberás demostrar tu destreza y habilidades más increíbles dentro del juego.

Todos sabemos que ganar 1 o 2 partidas no es suficiente cuando se trata de piedra papel y tijeras, siempre queremos la revancha si perdemos y no queremos jugar más si ganamos. Nos burlamos de nuestro contrincante cuando ganamos y nos enojamos cuando perdemos.

Por eso vamos a retar a "la roca IA" a un duelo 1v1 con sistema de puntuación de juegos y sets para ver realmente de que estas hecho.

Puedes jugar al mejor de 1, 3 o 5 sets de 3 o 5 juegos cada uno.

ADVERTENCIA: No apto para cobardes. Esta IA no pudo ser derrotada ni con el salto más alto de mario bros.

¿Podrás vencer a la poderosísima "la roca IA"? Pronto lo sabremos...'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'Meydey' AND language = 'es'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            "1",
            'Meydey',
            '{"id":"f5f23acb-0aa8-40a9-82d7-d7e3ad62275c","name":"Meydey.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/Meydey.png"}',
            '{"id":"489b10d0-1302-427e-9aca-25583ac295d0","name":"background-meydey.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-meydey.png"}',
            null,
            null,
            'https://apps.apple.com/cl/app/meydey/id6479819248',
            'https://play.google.com/store/apps/details?id=com.meydeymobile&hl=es_CL',
            '2024-03-09 00:00:00+00',
            'es',
            'Profesionales de la salud a domicilio o en sus consultas, conectados a través de georeferenciación para usar tu tiempo de la mejor manera.

- Agenda una consulta con profesionales de la salud de la manera que prefieras.
- Infórmate tanto de los profesionales como de los pacientes, en todo momento, revisando su historial y calificación, cómo su ubicación.
- Accede a tu ficha médica.'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'Snake & Blocks' AND language = 'en'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            '2',
            'Snake & Blocks',
            '{"id":"b989d4f7-3d6e-4f72-9754-7323349fe3a8","name":"snakeblocks.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/snakeblocks.png"}',
            '{"id":"8df8efdc-a79a-4fb6-97ab-f8e12bfc5be8","name":"background-snakeblocks__1_.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-snakeblocks__1_.png"}',
            'https://www.youtube.com/embed/7cuV5Dn6NR8',
            null,
            null,
            null,
            '2021-02-26 00:00:00+00',
            'en',
            'Play Snake and complete a puzzle at the same time—can you do it? Join Snoodle on his long journey around the world, walking and overcoming various obstacles, traps, and puzzles.'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'SodaPop Game' AND language = 'en'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            '2',
            'SodaPop Game',
            '{"id":"322b0ada-1bdb-428f-a609-ab8c0f09b276","name":"sodapop.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/sodapop.png"}',
            '{"id":"7065a6ee-2de7-4439-812d-4d7f949d8309","name":"background-sodapop.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-sodapop.png"}',
            'https://www.youtube.com/embed/ieL19vwpjIg',
            'https://cris.gamelab.cl/direct/direct/en',
            null,
            null,
            '2021-06-01 00:00:00+00',
            'en',
            'SodaPop Game is a multiplayer web game that simulates the production of a bottling factory that manufactures a soda brand for customers and businesses. Teachers can create a live session to play with their classes, where they can create and organize groups with their students.'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'Rock Paper & Scissor Duel!' AND language = 'en'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            '2',
            'Rock Paper & Scissor Duel!',
            '{"id":"03bd3717-3719-483d-bbe8-7b445c7717fb","name":"rpsduel.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/rpsduel.png"}',
            '{"id":"29f63a24-89dc-4a0d-b79c-c674634e99a1","name":"background-rpsduel.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-rpsduel.png"}',
            'https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/RSA_duel.mp4',
            null,
            null,
            'https://play.google.com/store/apps/details?id=com.ClassBitGames.RockPaperScissorDuel&hl=es_CL',
            '2023-03-29 00:00:00+00',
            'en',
            'Looking for a challenge?
Bored with free time?
Tired of searching for an entertaining game?

You''ve come to the right place!

With this rock-paper-scissors game, you can face off in a 1v1 duel against the AI, where you’ll need to showcase your skill and incredible in-game abilities.

We all know that winning 1 or 2 matches isn’t enough when it comes to rock-paper-scissors—we always want a rematch if we lose, and we stop playing if we win. We mock our opponent when we win and get frustrated when we lose.

That’s why we’re challenging “The Rock AI” to a 1v1 duel with a scoring system for games and sets to see what you’re really made of.

You can play best of 1, 3, or 5 sets, with each set having 3 or 5 games.

WARNING: Not for the faint-hearted. This AI couldn''t be beaten, not even with Mario Bros. highest jump.

Can you defeat the mighty "The Rock AI"? We''ll find out soon...'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM games
        WHERE name = 'Meydey' AND language = 'en'
    ) THEN
        INSERT INTO games 
        (user_id, name, image, background, video, link, ios_link, android_link, date_release, language, description)
        VALUES 
        (
            '2',
            'Meydey',
            '{"id":"f5f23acb-0aa8-40a9-82d7-d7e3ad62275c","name":"Meydey.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/Meydey.png"}',
            '{"id":"489b10d0-1302-427e-9aca-25583ac295d0","name":"background-meydey.png","url":"https://jdhdxwikqtgoypffioag.supabase.co/storage/v1/object/public/portfolio-storage/images/background-meydey.png"}',
            null,
            null,
            'https://apps.apple.com/cl/app/meydey/id6479819248',
            'https://play.google.com/store/apps/details?id=com.meydeymobile&hl=es_CL',
            '2024-03-09 00:00:00+00',
            'en',
            'Health professionals at home or in their offices, connected through georeferencing to make the best use of your time.

Schedule a consultation with health professionals in the way you prefer.
Stay informed about both professionals and patients at all times, reviewing their history and rating, as well as their location.
Access your medical record.'
        );
    END IF;
END $$;
