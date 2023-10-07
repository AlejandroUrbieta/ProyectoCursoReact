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

  agregarAmigo(amigo) {
    this.amigos.push(amigo);
  }

  eliminarAmigo(amigo) {
    const indice = this.amigos.indexOf(amigo);
    if (indice !== -1) {
      this.amigos.splice(indice, 1);
    }
  }

  agregarPublicacion(publicacion) {
    this.publicaciones.push(publicacion);
  }

  modificarPublicacion(indice, nuevaPublicacion) {
    if (indice >= 0 && indice < this.publicaciones.length) {
      this.publicaciones[indice] = nuevaPublicacion;
    }
  }

  eliminarPublicacion(indice) {
    if (indice >= 0 && indice < this.publicaciones.length) {
      this.publicaciones.splice(indice, 1);
    }
  }
}

class Publicacion {
  constructor(texto) {
    this.texto = texto;
    this.likes = 0;
    this.comentarios = [];
  }

  darLike() {
    this.likes++;
  }

  agregarComentario(comentario) {
    this.comentarios.push(comentario);
  }
}

const usuarios = [];

function buscarUsuarioPorId(id) {
  return usuarios.find(usuario => usuario.id_usuario === id);
}

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


function main() {
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

    switch (opcion) {
      case 1:
        // Agregar Usuario
        const id_usuario = prompt("Ingrese ID del usuario:");
        const nombre = prompt("Ingrese Nombre:");
        const edad = parseInt(prompt("Ingrese Edad:"));
        const ciudad = prompt("Ingrese Ciudad:");
        const profesion = prompt("Ingrese Profesión:");
        const nuevoUsuario = new Usuario(id_usuario, nombre, edad, ciudad, profesion);
        usuarios.push(nuevoUsuario);
        break;

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

      case 4:
        // Dar Like a Publicación
        const idLike = prompt("Ingrese ID del usuario:");
        const like = buscarUsuarioPorId(idLike);

        if (like) {
          const indicePublicacion = parseInt(prompt("Ingrese el índice de la publicación a dar like:"))-1;
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
      case 6:
        // Modificar Publicación
        const idUsuarioModificar = prompt("Ingrese ID del usuario:");
        const usuarioAModificar = buscarUsuarioPorId(idUsuarioModificar);
        if (usuarioAModificar) {
          const indiceModificar = parseInt(prompt("Ingrese el índice de la publicación a modificar:")-1);
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

      case 7:
          // Eliminar Publicación
          const idUsuarioAEliminarPublicacion = prompt("Ingrese ID del usuario:");
          const UsuarioAEliminarPublicacion = buscarUsuarioPorId(idUsuarioAEliminarPublicacion);
        
          if (UsuarioAEliminarPublicacion) {
            const indiceEliminar = parseInt(prompt("Ingrese el índice de la publicación a eliminar:"))-1;
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
          case 8:
          // Eliminar Amigo
            const idUsuarioEliminarAmigo = prompt("Ingrese ID del usuario:");
            const UsuarioEliminarAmigo = buscarUsuarioPorId(idUsuarioEliminarAmigo);
            if (UsuarioEliminarAmigo) {
              const idAmigoEliminar = parseInt(prompt("Ingrese ID del amigo a eliminar:"))-1;
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