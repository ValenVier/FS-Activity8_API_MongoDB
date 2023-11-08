const dayjs = require('dayjs');
const fs = require('node:fs/promises');

//Registramos las eliminaciones y las actualizaciones
/**
 * 
 * @param {string} method -> método de la petición
 * @param {object} inmueble -> Inmueble (objeto) a eliminar o actualizar
 * @returns -> void
 */
async function recordLog(method, inmueble) {
    try {
        const linea = `[${dayjs().format('DD/MM/YYYY HH:mm:ss')}] Método:${method},\n${JSON.stringify(inmueble)}\n\n`;
        method === "DELETE" ? await fs.appendFile('./src/logs/deletedRecords.log', linea) : await fs.appendFile('./src/logs/updatedRecords.log', linea); 
        return;
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

/**
 * 
 * @param {Object} req -> información de la request
 * @returns -> void
 */
async function mainLog(req) {
    try {
        const linea = `[${dayjs().format('DD/MM/YYYY HH:mm:ss')}] Método:${req.method}, URL:${req.url}\n`;
        await fs.appendFile('./src/logs/main.log', linea); //necesitamos esperar a que escriba la línea antes de ejecutar el resto de la función
        return;
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

module.exports = { recordLog, mainLog }