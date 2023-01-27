const http = require('http')

const server = http.createServer((peticion, respuesta)=>{
    // console.log(peticion)
    respuesta.end('Hola a la primera app server')
})

server.listen(8080,err =>{

    console.log('Escuchando en el puerto 8080' )
})
