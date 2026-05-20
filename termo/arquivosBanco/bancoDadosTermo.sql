
CREATE TABLE REPOSITORIO(
	id_palavra serial PRIMARY KEY,
	palavra varchar(5) NOT NULL UNIQUE,
	dica varchar(300) NOT NULL UNIQUE
);

alter table repositorio add column INATIVA TIMESTAMP;

select * from repositorio

UPDATE REPOSITORIO
                    SET INATIVA  = NOW()
                    WHERE ID_PALAVRA = (SELECT ID_PALAVRA FROM REPOSITORIO WHERE INATIVA IS NULL ORDER BY RANDOM() LIMIT 1
                    )
                    RETURNING PALAVRA, dica;