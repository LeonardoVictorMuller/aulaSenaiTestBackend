import { Pool } from "pg";
export async function connect(){

    if(global.connection){
        return global.connection.connect();
    }

    const pool = new Pool({
        connectionString : process.env.CONNECTION_STRING,
    });
    const client = await pool.connect();
    console.log("Criou o pool de conexão");

    const res = await client.query("SELECT NOW()")
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}
export async function palavraRandom(){
    const client = await connect();
    const res = await client.query(
        `
            UPDATE REPOSITORIO 
            SET INATIVA = NOW() 
            WHERE ID_PALAVRA = (
                SELECT ID_PALAVRA 
                FROM REPOSITORIO 
                WHERE INATIVA IS NULL 
                ORDER BY RANDOM() 
                LIMIT 1
            )
            RETURNING PALAVRA, DICA;
        `
    );
    return res.rows;
}

connect();