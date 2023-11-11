## Rutas

    GET /api/inmuebles
        - Recupera todos lod inmuebles de la base de datos

    POST /api/inmuebles
        - Crea un nuevo inmueble en la BD 

    PUT /api/inmuebles/:inmuebleId
        - Recibe en el body los datos a modificar del inmueble que coincida con el ID recibido en la URL

    DELETE /api/inmuebles/:inmuebleId
        - Borra el inmueble que coincida con el ID recibido en la URL