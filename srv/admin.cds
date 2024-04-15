using { my.usuario as my } from '../db/schemaUser';

service userService @(
    impl: './service-admin'
){
    entity User as projection on my.User;
}