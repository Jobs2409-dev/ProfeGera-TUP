// controllers/git.controller.js
export const obtenerResumenGit = async (req, res) => {
    try {

        const nombreUsuario = req.params.nombreUsuario;

        if(!nombreUsuario) {
            return res.status(400).json({
                mensaje: "El nombre de usaurio es requerido"
            });
        }

        const respuestaExterna = await fetch(`https://api.github.com/users/${nombreUsuario}`, {
            header: {
                'User-Agent': 'Node-App'
            }
    
        });

        if(!respuestaExterna.ok) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const datoGit = await respuestaExterna.json();

        res.status(200).json({
            nombreUsuario: datoGit.login,
            repositoriosPublicos: datoGit.public_repos,
            seguidores: datoGit.followers,
            urlPerfil: datoGit.html_url
        })

    } catch(error) {
        res.status(502).json({
            mensaje: "Bad Gateway: Erro al comunicarse con el servidor"
        })

    }
};