  class Usuario {
    constructor(id_usuario, nombre, edad, ciudad, profesion) {
      this.id_usuario = id_usuario;
      this.nombre = nombre;
      this.edad = edad;
      this.ciudad = ciudad;
      this.profesion = profesion;
      this.amigos = [];
      this.publicaciones = [];
    }

    //funcion que agrega un amigo
    agregarAmigo(amigo) {
      this.amigos.push(amigo);
    }

    //funcion que elimina un amigo de acuerdo al indice o id
    eliminarAmigo(amigo) {
      const indice = this.amigos.indexOf(amigo);
      if (indice !== -1) {
        this.amigos.splice(indice, 1);
      }
    }

    //funcion que agrega una publcacion
    agregarPublicacion(publicacion) {
      this.publicaciones.push(publicacion);
    }

    //funcion que agrega una publcacion de acuerdo al indice, y agrega texto nuevo
    modificarPublicacion(indice, nuevaPublicacion) {
      if (indice >= 0 && indice < this.publicaciones.length) {
        this.publicaciones[indice] = nuevaPublicacion;
      }
    }

    //funcion que elimina una publcacion de acuerdo al indice
    eliminarPublicacion(indice) {
      if (indice >= 0 && indice < this.publicaciones.length) {
        this.publicaciones.splice(indice, 1);
      }
    }
  }
  //clase Publicacion y su constructor
  class Publicacion {
    constructor(texto) {
      this.texto = texto;
      this.likes = 0;
    }
    //funcion dar like, y agrega un like mas
    darLike() {
      this.likes++;
    }

  }
  //Un array Usuarios con tipo de variable constante
  const usuarios = [];

  //funcion buscarUsuarioPorId, retorna el usuario que se buscaba
  function buscarUsuarioPorId(id) {
    return usuarios.find(usuario => usuario.id_usuario === id);
  }
  //funcion mostrarInformacionUsuario, pide el usuario como parametro y retorna los atributos del usuario y las publicaciones y likes si tiene
  function mostrarInformacionUsuario(usuario) {
    console.log("Información del usuario:");
    console.log("Nombre:", usuario.nombre);
    console.log("Edad:", usuario.edad);
    console.log("Ciudad:", usuario.ciudad);
    console.log("Profesión:", usuario.profesion);
    console.log("Cantidad de amigos:", usuario.amigos.length);
    console.log("Publicaciones:", usuario.publicaciones.length);
    if (usuario.publicaciones.length > 0) {
      usuario.publicaciones.forEach((publicacion, index) => {
        console.log("Publicación #" + (index + 1));
        console.log("Texto de la Publicación:", publicacion.texto);
        console.log("Likes:", publicacion.likes);
      });
    } else {
      console.log("El usuario no tiene publicaciones.");
    }
  }

  //funcion main, mientras que no sea la opcion 9, se continua con el siguiente while
  function main() {
    //un bucle while que tiene las principales funciones del programa
    while (true) {
      const opcion = parseInt(prompt(
        "Menú:\n" +
        "1. Agregar Usuario\n" +
        "2. Agregar Amigo\n" +
        "3. Agregar Publicación\n" +
        "4. Dar Like a Publicación\n" +
        "5. Buscar Usuario por ID\n" +
        "6. Modificar Publicación\n" +
        "7. Eliminar Publicación\n" +
        "8. Eliminar Amigo\n" +
        "9. Salir"
      ));
      //un bucle switch donde se ingresa una opcion, para ejecutar los metodos
      switch (opcion) {
        //Un case que agrega un nuevo usuario
        case 1:
          // Agregar Usuario
          const idUsuario = prompt("Ingrese ID del usuario:");
          const nombre = prompt("Ingrese Nombre:");
          const edad = parseInt(prompt("Ingrese Edad:"));
          const ciudad = prompt("Ingrese Ciudad:");
          const profesion = prompt("Ingrese Profesión:");
          const nuevoUsuario = new Usuario(idUsuario, nombre, edad, ciudad, profesion);
          usuarios.push(nuevoUsuario);
          break;
        //Un case que permite agregarse entre amigos a 2 usuarios, si se ingresa el id de 2 usuarios 
        case 2:
          // Agregar Amigo
          const id_usuario1 = prompt("Ingrese ID del primer usuario:");
          const id_usuario2 = prompt("Ingrese ID del segundo usuario:");
          const usuario1 = buscarUsuarioPorId(id_usuario1);
          const usuario2 = buscarUsuarioPorId(id_usuario2);

          if (usuario1 && usuario2) {
            usuario1.agregarAmigo(usuario2);
            usuario2.agregarAmigo(usuario1);
            console.log("Amigos agregados exitosamente.");
          } else {
            console.log("Uno o ambos usuarios no existen.");
          }
          break;
        //Un case que agrega una nueva publicacion, si se ingresa el id del usuario
        case 3:
          // Agregar Publicación
          const idUsuarioPubicacion = prompt("Ingrese ID del usuario:");
          const usuarioPublicacion = buscarUsuarioPorId(idUsuarioPubicacion);

          if (usuarioPublicacion) {
            const contenido_pub = prompt("Ingrese el contenido de la publicación:");
            const nuevaPublicacion = new Publicacion(contenido_pub);
            usuarioPublicacion.agregarPublicacion(nuevaPublicacion);
            console.log("Publicación agregada exitosamente.");
          } else {
            console.log("Usuario no encontrado.");
          }
          break;
        //Un case que permite dar like a una publicacion, si se ingresa el indice de la publicacion y el id del usuario
        case 4:
          // Dar Like a Publicación
          const idLike = prompt("Ingrese ID del usuario:");
          const like = buscarUsuarioPorId(idLike);

          if (like) {
            const indicePublicacion = parseInt(prompt("Ingrese el índice de la publicación a dar like:")) - 1;
            if (indicePublicacion >= 0 && indicePublicacion < like.publicaciones.length) {
              like.publicaciones[indicePublicacion].darLike();
              console.log("Like agregado exitosamente.");
            } else {
              console.log("Índice de publicación inválido.");
            }
          } else {
            console.log("Usuario no encontrado.");
          }
          break;




        //Un case que permite buscar usuario y mostrar detalles del usuario, sus publicaciones y likes.
        case 5:
          // Buscar Usuario por ID
          const idBusqueda = prompt("Ingrese ID del usuario a buscar:");
          const usuarioEncontrado = buscarUsuarioPorId(idBusqueda);
          if (usuarioEncontrado) {
            mostrarInformacionUsuario(usuarioEncontrado);
          } else {
            console.log("Usuario no encontrado.");
          }
          break;
        //Un case que permite modificar la publicacion ingresando id de un usuario y se agrega el nuevo texto
        case 6:
          // Modificar Publicación
          const idUsuarioModificar = prompt("Ingrese ID del usuario:");
          const usuarioAModificar = buscarUsuarioPorId(idUsuarioModificar);
          if (usuarioAModificar) {
            const indiceModificar = parseInt(prompt("Ingrese el índice de la publicación a modificar:") - 1);
            if (indiceModificar >= 0 && indiceModificar < usuarioAModificar.publicaciones.length) {
              const nuevoContenido = prompt("Ingrese el nuevo contenido de la publicación:");
              usuarioAModificar.modificarPublicacion(indiceModificar, nuevoContenido);
              console.log("Publicación modificada exitosamente.");
            } else {
              console.log("Índice de publicación inválido.");
            }
          } else {
            console.log("Usuario no encontrado.");
          }
          break;
        //Un case donde permite eliminar publicacion a partir del id del usuario y del indice de publicacion
        case 7:
          // Eliminar Publicación
          const idUsuarioAEliminarPublicacion = prompt("Ingrese ID del usuario:");
          const UsuarioAEliminarPublicacion = buscarUsuarioPorId(idUsuarioAEliminarPublicacion);

          if (UsuarioAEliminarPublicacion) {
            const indiceEliminar = parseInt(prompt("Ingrese el índice de la publicación a eliminar:")) - 1;
            if (indiceEliminar >= 0 && indiceEliminar < UsuarioAEliminarPublicacion.publicaciones.length) {
              UsuarioAEliminarPublicacion.eliminarPublicacion(indiceEliminar);
              console.log("Publicación eliminada exitosamente.");
            } else {
              console.log("Índice de publicación inválido.");
            }
          } else {
            console.log("Usuario no encontrado.");
          }
          break;
        //Un case que permite eliminar amigo a partir de ingresar el id del usuario y luego el id del amigo que se quiere eliminar
        case 8:
          // Eliminar Amigo
          const idUsuarioEliminarAmigo = prompt("Ingrese ID del usuario:");
          const UsuarioEliminarAmigo = buscarUsuarioPorId(idUsuarioEliminarAmigo);
          if (UsuarioEliminarAmigo) {
            const idAmigoEliminar = prompt("Ingrese ID del amigo a eliminar:");
            const amigoAEliminar = buscarUsuarioPorId(idAmigoEliminar);
            if (amigoAEliminar) {
              UsuarioEliminarAmigo.eliminarAmigo(amigoAEliminar);
              console.log("Amigo eliminado exitosamente.");
            } else {
              console.log("El amigo no existe.");
            }
          } else {
            console.log("Usuario no encontrado.");
          }
          break;
        //Un case que sale del programa
        case 9:
          // Salir
          console.log("Saliendo del programa.");
          return;

        default:
          console.log("Opción inválida.");
      }
    }
  }

  main();