import { GoogleGenerativeAI } from "@google/generative-ai";

const genIA = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generarTexto = async (req, res) => {
    try {

        const { pregunta } = req.body;

        if(!pregunta) {
            return res.status(400).json({mensaje: "Hay que preguntar algo."});
        }

        const modelo = genIA.getGenerativeModel({ model: "gemini-3.1-flash-lite" }); // modelo

        const promptFinal = `Eres un asistente técnico experto en Node.js, responde la pregunta de este usuario: ${pregunta}`; // prompt

        const resultadoIA = await modelo.generateContent(promptFinal);

        const textoGenerado = resultadoIA.response.text();

        res.status(200).json({ respuesta: textoGenerado });

    } catch(error) {
        console.error("Error en la API:", error);
        res.status(500).json({ mensaje: "Error al generar contenido por la IA." });
    }
}