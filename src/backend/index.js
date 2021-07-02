
//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var utils = require('./mysql-connector');


// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Ejercicio 3
var datos = require('./datos.json');



//Ejercicio 4
app.get('/devices/', function(req, res) {
    //res.send(datos);
    res.json(datos);
});

//Ejercicio 5
//Espera una consulta al endpoint EJ /devices/1
//Parámetro id = el id del dispositivo a buscar
// devuelve el dispositivo con el id que viene del parametro
app.get('/devices/:id', function(req, res) {
    let datosFiltrados = datos.filter(item => item.id == req.params.id);
    res.json(datosFiltrados[0]);
});

//Ejercicio 6
//Espera recibir {id:1,state:1/0} , impacta el cambio y lo devuelve
app.post('/devices/', function(req, res) {
    let datosFiltrados = datos.filter(item => item.id == req.body.id);
    if (datosFiltrados.length > 0) {
        datosFiltrados[0].state = req.body.state;
    }
    //res.json(datosFiltrados);
    res.send("Todo ok");
});

//Agregar dispositivos
//Espera recibir la informacion del form del modal, impacta el cambio en datos.
app.get('/devices_add', function(req, res) {
    res.sendFile('/home/node/app/static/index.html')
});

app.post('/devices_add', function(req, res) {

    var newData = {
        'id':datos.length+1,
        'name':req.body.nombreDispositivo,
        'description':req.body.descripcionDispositivo,
        'state':0,
        'type':req.body.tipoDispositivo
    };

    datos.push(newData);

    console.log("Datos Cargados");

    res.sendFile('/home/node/app/static/index.html')
});

//Eliminar dispositivos
//Espera recibir la informacion del id del dispositivo, impacta el cambio en datos.
app.get('/devices/delete/:id', function(req, res) {
    
    let id = req.params.id;
    let datosSinId = datos.filter(item => item.id != id);
    datos = datosSinId

    let initId = 1;
    datos.forEach(element => {
        element.id = initId;
        initId += 1;
    });

    console.log('Se elimino el Dispositivo satisfactoriamente el id ', id)
    console.log(datos)
    res.send('Se elimino el Dispositivo satisfactoriamente, vuelve a introducir la url inicial para visualizar el cambio.')
});

//Editar dispositivos
//Espera recibir la informacion del form del modal, impacta el cambio en datos.
app.get('/devices/edit', function(req, res) {
    console.log(req.body.id)
    let datosFiltrados = datos.filter(item => item.id == req.body.id);
    res.json(datosFiltrados[0])
    /*
    console.log(datosFiltrados);
    console.log('Vista del primer elemento abajo');
    console.log(datosFiltrados[0]);
    
    res.json(datosFiltrados[0])
    */
});

app.get('/devices_add', function(req, res) {
    //let name = req.body.name;
    //let description = req.body.description;
    //let tipo = req.body.tipo

    res.sendFile('/home/node/app/static/index.html')

});


//=======[ Main module code ]==================================================
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================