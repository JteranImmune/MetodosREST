
let pedirPersonas = () => {

    let tablaPersonas = document.getElementById('tablaPersonas');

    return fetch('/personas').then((res) => res.json()).then((personas) =>{
        
        console.log(personas);

        for(let i = 0; i < personas.length; i++){

                const persona = personas[i];

                let row = document.createElement('tr');
                let nameCell = document.createElement('td');
                let lastNameCell = document.createElement('td');
                let ageCell = document.createElement('td');

                nameCell.textContent= persona.nombre;
                lastNameCell.textContent= persona.apellido;
                ageCell.textContent= persona.edad;

                row.append(nameCell,lastNameCell,ageCell);
                tablaPersonas.append(row);
            }
        });
    
}

pedirPersonas()

let agregarPersonas = () => {

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    let tablaPersonas = document.getElementById('tablaPersonas');

    let persona = {
            nombre,
            apellido,
            edad
        }

    return fetch('/agregar', {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
                    nombre,
                    apellido,
                    edad
                })})
        .then((res) => res.json()).then((persona) => {

            console.log(persona);
        
            if (nombre == "" || apellido == "" || isNaN(parseInt(edad))){

                alert("Todos los campos son obligatorios");
                return false;

            }else{

                let row = document.createElement('tr');
                let nameCell = document.createElement('td');
                let lastNameCell = document.createElement('td');
                let ageCell = document.createElement('td');
    
                nameCell.textContent = persona[persona.length - 1].nombre;
                lastNameCell.textContent = persona[persona.length - 1].apellido;
                ageCell.textContent = persona[persona.length - 1].edad;
    
                row.append(nameCell,lastNameCell,ageCell);
                tablaPersonas.append(row);
            }
    });

}

