import * as SQLite from "expo-sqlite";


let db = null


export default async function initDatabase() {
    try {
        if(!db){
            db = await SQLite.openDatabaseAsync("natvPG.db")
        }

            // Crear la base de datos en local

        /* Aqui se esta usando ciertos campos para indicar si se ha llevado acabo la conexion con la otra base de datos
        tanto como: 
        - lastSync: Indica la ultima fecha de sincronizacion
        - isDeleted: Indica si el dato fue eliminado 
        - isSynced: Indica si se ha llevado a cabo la sincronizacion con la db firebase

        */
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
            userId TEXT PRIMARY KEY NOT NULL,
            username TEXT NOT NULL,
            email TEXT,
            lastSync DATETIME);
        
            CREATE TABLE IF NOT EXISTS projects (
            projectId TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            userId TEXT NOT NULL,
            dateCreated DATETIME NOT NULL,
            isSynced BOOLEAN DEFAULT FALSE, 
            isDeleted BOOLEAN DEFAULT FALSE, 
            lastSync DATETIME,
            FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS project_content (
            contentId TEXT PRIMARY KEY NOT NULL,
            projectId TEXT NOT NULL,
            html TEXT,
            css TEXT,
            js TEXT,
            isSynced BOOLEAN DEFAULT FALSE, 
            isDeleted BOOLEAN DEFAULT FALSE, 
            lastSync DATETIME,
            FOREIGN KEY (projectId) REFERENCES projects(projectId) ON DELETE CASCADE
            );
        `);
        console.log("Tablas creadas")

        if(db){
            console.log("Ya hay una bd")
        }

        return db

    } catch (err) {

        console.error("Error al crear las tablas ",err);
        return null
    }
};

const getDb = async () =>{
    if(!db) throw new Error("La base de datos no ha sido creada")
    return db
} 


/*En el registro se guardaran todos los datos, pero en el login se debe de hacer un select, para que los datos coicidan*/
export const insertUser = async  (uid, username, email) =>{
    try {
        const db = await getDb()

        await db.runAsync("INSERT INTO users (userId, username, email, lastSync) VALUES (?,?,?, datetime('now'))",
        [uid, username, email]
        )   
        console.log("Se inserto el usuario con exito")
    } catch (error) {
        console.error(error);
        
    }

}

export const selectUser = async (uid) =>{
    try {
        const db = await getDb()

        const result = await db.getFirstAsync("SELECT * FROM users WHERE userId=?",[uid])
        console.log(result)
        return result;
    } catch (error) {
        console.error(error);
        return null
    }
}

export const getAllProjects= async (uid)=>{
    try {
        const db = await getDb();

        const allProjects = await db.getAllAsync("SELECT * FROM projects where userId=?", [uid])
        console.log("aqui estan todos los proyectos: ", allProjects)
        return allProjects;

    } catch (error) {
        console.error(error);
    }
}

export const insertProject= async (projectId, nameProject, userId)=>{
    
    try {
        const db = await getDb();

        await db.runAsync("INSERT INTO projects (projectId, name, userId) VALUES (?,?,?,datetime('now'))", [projectId, nameProject, userId])
        
        console.log("Se ha creado el pryecto",)

    } catch (error) {
        console.error(error);
    }
}

export const deleteProject= async (projectId, userId)=>{
    try {
        const db = await getDb();
        await db.runAsync("DELETE FROM projects WHERE projectId=?, userId=?", [projectId, userId])
        console.log("Se ha eliminado el proyecto",)

    } catch (error) {
        console.error(error);
    }
}


export const createProject = () => {
    
}

export const saveCode = () => {
    
}

export const renameProject = () => {
    
}
