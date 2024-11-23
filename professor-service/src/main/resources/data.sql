--SUBJECTS:
    INSERT INTO subject (name)
    VALUES ('Big Data'), ('Tópicos Avançados em Programação'), ('Banco de Dados II'), ('Lógica de Prog. e Algoritmos'), 
    ('Arquitetura de Software'), ('Governança de TI'), ('Racicínio Lógico'), ('Compiladores'), ('Projeto Final');

--PROFESSORS
    --ELTON:
        INSERT INTO professor (name)
        VALUES ('Elton Figueiredo da Silva');
        INSERT INTO professor_subject (professor_id, subject_id)
        VALUES (1, 4), (1, 2), (1, 9);

    --FERNANDO:
        INSERT INTO professor (name)
        VALUES ('Fernando Cézar Reis Borges');
        INSERT INTO professor_subject (professor_id, subject_id)
        VALUES (2, 4), (2, 5), (2, 6);

    --EVERTON:
        INSERT INTO professor (name)
        VALUES ('Everton Mendonça de Jesus');
        INSERT INTO professor_subject (professor_id, subject_id)
        VALUES (3, 1), (3, 3), (3, 5);