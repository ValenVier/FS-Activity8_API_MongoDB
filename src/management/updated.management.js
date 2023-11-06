function updatedObject(previous, body) {
    let record = {};
    for (let element in body){
        record[element] = `${previous[element]} -> ${body[element]}`;
    }
    return record;
}

module.exports = { updatedObject }