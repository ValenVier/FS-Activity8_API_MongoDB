/**
 * 
 * @param {Object} previous -> El inmueble (objeto) antes de modificar
 * @param {object} body -> Datos del body de la petición con la información a actualizar
 * @returns -> objeto con los datos previos y actuales
 */
function updatedObject(previous, body) {
    let record = {};
    for (let element in body){
        record[element] = `${previous[element]} -> ${body[element]}`;
    }
    return record;
}

module.exports = { updatedObject }