--SUBJECTS:
    INSERT INTO subject (name)
    VALUES ('Big Data'), ('Tópicos Avançados em Programação'), ('Banco de Dados II'), ('Lógica de Prog. e Algoritmos'), 
    ('Arquitetura de Software'), ('Governança de TI'), ('Racicínio Lógico'), ('Compiladores'), ('Projeto Final');

--PROFESSORS
    --FERNANDO:
        INSERT INTO professor (name)
        VALUES ('Fernando Cézar Reis Borges');
        INSERT INTO professor_subject (professor_id, subject_id)
        VALUES (1, 4), (1, 5), (1, 6);

        --OSVALDO
        INSERT INTO professor (name)
        VALUES ('Osvaldo Requião Mello');
        INSERT INTO professor_subject (professor_id, subject_id)
        VALUES (2, 7), (2, 8), (2, 9);

        --ELTON
        INSERT INTO professor (name)
        VALUES ('Elton Figueiredo da Silva');
        INSERT INTO professor_subject (professor_id, subject_id)
        VALUES (3, 4), (3, 2), (3, 9);

        --EVERTON
        INSERT INTO professor (name)
        VALUES ('Everton Mendonça de Jesus');
        INSERT INTO professor_subject (professor_id, subject_id)
        VALUES (4, 1), (4, 3), (4, 5);