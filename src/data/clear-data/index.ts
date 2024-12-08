import { exit } from "node:process"; 
import db from "../../config/db"; 

//Cada vez que finalize nuestros test nos va a limpioar la base de datos
const clearDB = async () => {
  try {
    await db.sync({force: true})
    console.log("Datos eliminados correctamente")
    exit()
  } catch (error) {
    console.log(error)
    exit(1)
  }
};

if(process.argv[2] === "--clear") {
    clearDB()
}

