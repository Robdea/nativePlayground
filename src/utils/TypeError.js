
export function errorsLogin (typeError, setError) {
    switch (typeError) {
        case "auth/network-request-failed":
        setError("Por favor, verifica tu conexión a internet.");
          break;
        case "auth/invalid-email":
        setError("El formato del correo es incorrecto.");
          break;
        case "auth/user-not-found":
        setError("No existe una cuenta con este correo.");
          break;
        case "auth/invalid-credential":
            setError("La contraseña o el correo ingresado son incorrectos.");
        break;
        default:
        setError("Ha ocurrido un error. Inténtalo más tarde.");
          break;
      }
};
