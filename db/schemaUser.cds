namespace my.usuario;

entity User {
    key ID: Integer;
    nombre: String(30);
    apellido: String(30);
    correo: String(50);
    password: String(15)
}