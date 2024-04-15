using { my.usuario as my } from '../db/schemaUser';

service userService {
    entity User as projection on my.User;
}
