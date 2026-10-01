// controllers\externo.controller.js
export const obtenerClima = async (req, res) => {
    try {
    
        const lat = req.query.latitud
        const lon = req.query.longitud

        const respuestaExterna = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)

        if(!respuestaExterna.ok) {
            throw new Error(`La API externa fallo con status: ${respuestaExterna.status}`); 
        }

        const datoClima = await respuestaExterna.json();

        res.status(200).json({
            mensaje: 'Datos obtenidos de terceros',
            temperaturaClima: datoClima.current_weather.temperature,
            latitud: lat,
            longitud: lon
        });

    } catch(error) {
        res.status(502).json({ message: 'Bad Gateway: Error al comunicarse con el servidor' });
    }
}