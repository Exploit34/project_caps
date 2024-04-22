

// namespace my.person;

// using {managed} from '@sap/cds/common';

// service Persona {

//     entity Person: managed {
//     key ID: Integer;
//     name: String(50);
//     lastName: String(50);
//     email : String(50); 
//     password: String(20);
//     age: Integer
// }

// }


using my.person as myPerson from '../db/person';


// service person{
//     entity Person as projection on myPerson.Person;   

// }
service person @(
    impl:'./personRegister'
)
{
    entity Person as projection on myPerson.Person;   

}