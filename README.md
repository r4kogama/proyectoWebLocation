# Proyecto Web Location

Proyecto final de curso front-end Angular CIFO violeta, al final de todo el documento esta disponible la apk para la descarga.

`Version beta.`

Link to version web:
[Web](https://r4kogama.github.io/proyectoWebLocation/)


# Justificacion del proyecto

## De que trata?

HYlyf que son las siglas de `Have you lost you friends?` la idea surge sobre la necesidad de solucionar un problema habitual de localizacion entre usuarios, en este caso entre grupo de usuarios cercanos entre si. 

Dicha idea trata de proporcionar una aplicacion web donde los usuarios puedan geolocalizarse entre ellos. Es decir, generando un grupo cerrado de amigos, cada uno de ellos pueda mostrar su localizacion en el mapa, en un pequeño radio en el mapa, no se trata que sea global sino cercano.
Como resultado muestre todas las ubicaciones de los usuarios a la vez en el mapa.

Resumiendo, es proporcionar al usuario una manera de no perder de vista a sus allegados y no perder el tiempo buscando y preguntando.




## Diagrama de la web

Este seria el diagrama de flujo de la pagina web, de las acciones mas relevantes

![flux Picture](https://i.imgur.com/XIq9XS6.png)

El `landing page` consta de una página principal estática con un menú principal que redirige  a 4 páginas  distintas :
_Inicio: dirige a página de login y de registro de usuario
_Geolocation: dirige a la página de localizacion, donde muestra si el usuario esta logeado su geolocalizacion y de su grupo de usuarios cercanos.
_faqs:  pagina de preguntas frecuentes 
_contacto:  pagina de contacto con email
_about:  pagina de descripcion de la empresa
_terms:  pagina de terminos legales



Consta de una página `perfil de usuario`
El perfil de cuenta muestra un dashboard con distintas secciones  donde muestran datos basicos de solo lectura del usuario, localizacines, modificar sus datos...
Todo se ejecuta en la misma pagina como un DASHBOARD ver datos de perfil, modificar,  notificaciones...

Pagina de `geolocalizacion`
Si el usuario no esta registrado muestra un mapa generico con una localizacion ficticia, si el usuario esta logeado, muestra su localizacion en el mapa  y del grupo de usuarios que esten alrededor.


## Wireframes

A continuacion, se muestra los wireframe de baja calidad que dan una idea de como  funcionaria la web

Landing page

[Home](https://i.imgur.com/QvWWEYx.png)



Pagina de login

[Login](https://i.imgur.com/Ayyww8X.png)



Pagina de formulario de registro

[Formulario de registro](https://i.imgur.com/jQH2rIV.png)



Pagina de perfil de usuario con el dashboard

[profile](https://i.imgur.com/cIcsXC3.png)



Navegacion en el dashboard a la seccion de edicion de perfil

[edit](https://i.imgur.com/LkemkmW.png)



Navegacion en el dashboard a la seccion de historial de localizaciones in situ

[locations](https://i.imgur.com/R8K4lTA.png)


Pagina de geolocalizacion

[Geolocation](https://i.imgur.com/T9v54g3.png)



## Tecnologias usadas para el proyecto

- Framework Angular
- Material design
- Ionic



## Plataforma Firebase

Todo el back-end esta gestionado con firebase
[link to firebase](https://firebase.google.com/)



## Kanban de Historias de Usuario

Creado en Trello

[Link to trello](https://trello.com/b/8HnYf22w/proyecto-web-angular)


## Logo de la app

![logo](https://i.imgur.com/ysNctfO.png)


## Team members

Consta de un solo de desarrollador que se encarga tanto del diseño, el desarrollo front-end y la gestion del back-end.

```javascript
  let developer = 'Raul garcia martinez'
```


# APP mobile
### Prodas encontrar la apk atraves de este link

[link to 4shared](https://www.4shared.com/mobile/lyNqzuCyiq/app-Hylyf.html)



