const dayjs = require('dayjs');
const fs = require('node:fs/promises');

//Registramos las eliminaciones y las actualizaciones
async function recordLog(method, inmueble) {
    try {
        const linea = `[${dayjs().format('DD/MM/YYYY HH:mm:ss')}] Método:${method},\n${JSON.stringify(inmueble)}\n\n`;
        method === "DELETE" ? await fs.appendFile('./src/logs/deletedRecords.log', linea) : await fs.appendFile('./src/logs/updatedRecords.log', linea); 
        return;
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

module.exports = { recordLog }