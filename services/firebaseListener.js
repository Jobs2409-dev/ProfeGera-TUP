// services\firebaseListener.js
import { dbFirestore } from "../config/firebase.js";

export const initListenerFirebase = (io) => {
    console.log("🦻 Node.js está escuchando Firebase Firestore...");

    dbFirestore.collection('alertas').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((cambio) => {
            if (cambio.type === 'added') {
                const nuevaAlerta = cambio.doc.data();
                console.log("Cambio en la nube de Google detectado: ", nuevaAlerta);

                // Emite el evento a través del objeto io recibido por parámetro
                io.emit('nueva_alerta_urgente', nuevaAlerta);
            }
        });
    });
};