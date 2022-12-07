# apicourses
 Api de Cursos para diplomatura en desarrollo seguro

### HEADERS
Content-Type: application/json

## CREACION DE USUARIOS:
POST http://localhost:4000/usuarios
BODY 
{
    "nombre": "Nilo",
    "password": "123456",
    "email": "nabrigato@yahoo.com.ar"
}
RESPUESTA:
{
    "msg": "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta"
}

Crea el usuario y genera un token
Campo confirmado en false
Se envia link con el token a través de email para confirmar el usuario

## CONFIRMAR USUARIO VIA EMAIL POR TOKEN:
link con token provisto a través de email
GET http://localhost:4000/usuarios/confirmar/gnq7su6iiho1gjmtth3e
RESPUESTA:
{
    "msg": "Usuario confirmado correctamente"
}

El campo confirmado queda en true y se elimina el token

## AUTENTICACION DE USUARIO
POST http://localhost:4000/usuarios/login
BODY 
{
    "email": "nabrigato@yahoo.com.ar",
    "password": "123456"
}
RESPUESTA:
{
    "_id": "6390dcde227addb4b6d51a34",
    "nombre": "Nilo",
    "email": "nabrigato@yahoo.com.ar",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTBkY2RlMjI3YWRkYjRiNmQ1MWEzNCIsImlhdCI6MTY3MDQzOTY5MSwiZXhwIjoxNjczMDMxNjkxfQ.esYq0ECqysX44hYj59TLkk4_ex5-w9avAuoONu5ILuo"
}
Este token será usado para acceder a los recursos del usuario

## OBTENER PERFIL DE USUARIO ATENTICADO
POST http://localhost:4000/usuarios/perfil
AUTORIZATION
Type: Bearer Token 
Token: Obtenido en la utentiación
RESPUESTA:
{
    "_id": "6390dcde227addb4b6d51a34",
    "nombre": "Nilo",
    "email": "nabrigato@yahoo.com.ar"
}

## CREAR NUEVO CURSO
POST http://localhost:4000/courses
AUTORIZATION
Type: Bearer Token 
Token: Obtenido en la utentiación
BODY:
{
   "nombre": "Diplomatura Software Seguro",
   "descripcion": "Desarrollo de software seguro"
}
RESPUESTA:
{
    "nombre": "Diplomatura Software Seguro",
    "descripcion": "Desarrollo de software seguro",
    "_id": "6390e93a227addb4b6d51a3b",
    "creador": "6390dcde227addb4b6d51a34",
    "createdAt": "2022-12-07T19:27:54.487Z",
    "updatedAt": "2022-12-07T19:27:54.487Z",
    "__v": 0
}

## OBTENER CURSOS
GET http://localhost:4000/courses
AUTORIZATION
Type: Bearer Token 
Token: Obtenido en la utentiación

RESPUESTA:
[
	{
        "_id": "6390e93a227addb4b6d51a3b",
        "nombre": "Diplomatura Software Seguro",
        "descripcion": "Desarrollo de software seguro",
        "creador": "6390dcde227addb4b6d51a34",
        "createdAt": "2022-12-07T19:27:54.487Z",
        "updatedAt": "2022-12-07T19:27:54.487Z",
        "__v": 0
    }
]]

## OBTENER CURSO
GET http://localhost:4000/courses/6390e93a227addb4b6d51a3b
AUTORIZATION
Type: Bearer Token 
Token: Obtenido en la utentiación

RESPUESTA:
[
    {
        "_id": "6390e93a227addb4b6d51a3b",
        "nombre": "Diplomatura Software Seguro",
        "descripcion": "Desarrollo de software seguro",
        "creador": "6390dcde227addb4b6d51a34",
        "createdAt": "2022-12-07T19:27:54.487Z",
        "updatedAt": "2022-12-07T19:27:54.487Z",
        "__v": 0
    }
]

## ELIMINAR CURSO
GET http://localhost:4000/courses/6390e93a227addb4b6d51a3b
AUTORIZATION
Type: Bearer Token 
Token: Obtenido en la utentiación

RESPUESTA:
{
    "msg": "Curso eliminado correctamente"
}

## MODIFICAR CURSO
GET http://localhost:4000/courses/6390e93a227addb4b6d51a3b
AUTORIZATION
Type: Bearer Token 
Token: Obtenido en la utentiación
BODY:
{
   "nombre": "Diplomatura Desarrollo Seguro de App - 2da Edición",
   "descripcion": "Desarrollo de software seguro"
}

RESPUESTA:
{
    "nombre": "Diplomatura Software Seguro",
    "descripcion": "Desarrollo de software seguro",
    "_id": "6390e93a227addb4b6d51a3b",
    "creador": "6390dcde227addb4b6d51a34",
    "createdAt": "2022-12-07T19:27:54.487Z",
    "updatedAt": "2022-12-07T19:27:54.487Z",
    "__v": 1
}
