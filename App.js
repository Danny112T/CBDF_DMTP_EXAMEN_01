const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let reservaciones = [
  {
    id: 1,
    fechaLlegada: "2023-01-09",
    fechaSalida: "2023-01-14",
    nombre: "Marlene Rosales",
    tipoHabitacion: "simple",
  },
  {
    id: 2,
    fechaLlegada: "2023-02-11",
    fechaSalida: "2023-02-13",
    nombre: "Daniel Tovar",
    tipoHabitacion: "doble",
  },
  {
    id: 3,
    fechaLlegada: "2023-03-08",
    fechaSalida: "2023-03-19",
    nombre: "Claudio Marquez",
    tipoHabitacion: "suite",
  },
  {
    id: 4,
    fechaLlegada: "2023-12-17",
    fechaSalida: "2023-12-22",
    nombre: "Cinthia Blas",
    tipoHabitacion: "suite",
  },
  {
    id: 5,
    fechaLlegada: "2023-12-21",
    fechaSalida: "2023-12-27",
    nombre: "Isaac Lopez",
    tipoHabitacion: "simple",
  },
  {
    id: 6,
    fechaLlegada: "2023-04-30",
    fechaSalida: "2023-05-05",
    nombre: "Sabrina Gonzalez",
    tipoHabitacion: "doble",
  },
  {
    id: 7,
    fechaLlegada: "2023-05-27",
    fechaSalida: "2023-06-05",
    nombre: "Adriana Morquecho",
    tipoHabitacion: "suite",
  },
  {
    id: 8,
    fechaLlegada: "2023-10-20",
    fechaSalida: "2021-10-05",
    nombre: "Fernando de Lara",
    tipoHabitacion: "suite",
  },
  {
    id: 9,
    fechaLlegada: "2023-10-10",
    fechaSalida: "2023-10-15",
    nombre: "Galilea Guevara",
    tipoHabitacion: "simple",
  },
  {
    id: 10,
    fechaLlegada: "2023-12-22",
    fechaSalida: "2023-12-30",
    nombre: "Karla Felix",
    tipoHabitacion: "suite",
  },
];

app.get('/Reservaciones/', (req, res) => {
    if (reservaciones.length>0){
        res.status(200).json({
            estado:1,
            mensaje:"Reservaciones encontradas",
            reservaciones: reservaciones
        })
    } else {
        res.status(404).json({
            estado: 0,
            message: "No existen reservaciones"});
            reservaciones: null
    }
});

app.get("/Reservaciones/:id", (req, res) => {
    const id = req.params.id;
    const reservacion = reservaciones.find(reservacion => reservacion.id == id);

    if (reservacion) {
        res.status(200).json({
            estado: 1,
            mensaje: "Reservacion encontrada",
            reservacion: reservacion,
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Reservacion no encontrada",
            reservacion: null,
        })
    }
});

app.post("/Reservaciones/", (req, res) => {
  const { fechaLlegada, fechaSalida, nombre, tipoHabitacion } = req.body;
  const id = reservaciones.length + 1;
  if (
    fechaLlegada == undefined ||
    fechaSalida == undefined ||
    nombre == undefined ||
    tipoHabitacion == undefined
  ) {
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan datos en la solicitud",
      reservacion: null,
    });
  } else if (
    fechaLlegada > fechaSalida ||
    (tipoHabitacion !== "suite" &&
      tipoHabitacion !== "doble" &&
      tipoHabitacion !== "simple")
  ) {
    res.status(404).json({
      estado: 0,
      mensaje:
        "No se pudo crear la reservación debido a que los datos son incorrectos",
      reservacion: null,
    });
  } else {
    const reservacion = {
      id: id,
      fechaLlegada: fechaLlegada,
      fechaSalida: fechaSalida,
      nombre: nombre,
      tipoHabitacion: tipoHabitacion,
    };
    const longitudInicial = reservaciones.length;
    reservaciones.push(reservacion);
    if (reservaciones.length > longitudInicial) {
      res.status(200).json({
        estado: 1,
        mensaje: "Reservación creada",
        reservacion: reservacion,
      });
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Error en el servidor",
        reservacion: null,
      });
    }
  }
});

app.put("/Reservaciones/:id", (req, res) => {
    const {id} = req.params;
    const { fechaLlegada, fechaSalida, nombre, tipoHabitacion } = req.body;
    if (fechaLlegada==undefined || fechaSalida==undefined || nombre==undefined || tipoHabitacion==undefined){
        res.status(400).json({
            estado:0,
            mensaje:"Faltan datos en la solicitud",
            reservacion: null
        })
    } else if (fechaLlegada > fechaSalida || (tipoHabitacion !== "suite" && tipoHabitacion !== "doble" && tipoHabitacion !== "simple")){
        res.status(404).json({
            estado:0,
            mensaje:"No se pudo actualizar la reservación debido a que los datos no son validos",
            reservacion: null
        })
    } else {
        const reservacion = reservaciones.find(
          (reservacion) => reservacion.id == id
        );
        if (reservacion) {
          reservacion.fechaLlegada = fechaLlegada;
          reservacion.fechaSalida = fechaSalida;
          reservacion.nombre = nombre;
          reservacion.tipoHabitacion = tipoHabitacion;
          res.status(200).json({
            estado: 1,
            mensaje: "Reservacion actualizada",
            reservacion: reservacion,
          });
        }
    }
});

app.delete("/Reservaciones/:id", (req, res) => {
    const {id} = req.params;
    const reservacion = reservaciones.find(reservacion => reservacion.id == id);
    if(reservacion){
        const index = reservaciones.indexOf(reservacion);
        reservaciones.splice(index,1);
        res.status(200).json({
            estado:1,
            mensaje:"Resrevacion eliminada",
            reservacion: reservacion
        })
    } else {
        res.status(404).json({
            estado:0,
            mensaje:"Reservacion no encontrada",
            reservacion: null
        })
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});