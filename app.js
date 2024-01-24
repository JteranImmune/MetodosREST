const express = require('express');
const personas = require('./arrayPersonas')
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/personas', function(request, response){
    response.send(personas);
})

app.post('/agregar', function(request, response){

    let {nombre, apellido, edad} = request.body;

    if (nombre && apellido && edad) {

        personas.push({nombre, apellido, edad});
        response.send(personas);

        } else{
            response.send(`Faltan datos`)
        };
    
});

app.put('/modificar', function(request, response){

    let index = personas.findIndex((persona) => persona.nombre === request.body.nombre);

    console.log(request.body);

    if(index < 0){
        response.send('El nombre ' + request.body.nombre + ' no existe');
    }else{
        personas[index].apellido = request.body.apellido;
        personas[index].edad = request.body.edad;
        response.send(`${request.body.nombre} se actualizó`);
    }
    
});

app.delete('/eliminar', function(request, response){

    let index = personas.findIndex((persona) => persona.nombre === request.body.nombre);

    console.log(request.body);

    if(index < 0){
        response.send('El nombre ' + request.body.nombre + ' no existe');
    }else{
        personas.splice(1, 1);
        personas[index].edad = request.body.edad;
        response.send(`${request.body.nombre} se borró`);
    }
    
});


app.listen(process.env.PORT || 3000, (e) =>{
    e
    ? console.log(`Error en servidor: ${e}`)
    : console.log("Servidor andando!");
});