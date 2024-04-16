
namespace my.person;
using { managed } from '@sap/cds/common';


entity Person: managed {
    key ID: Integer;
    name: String(50);
    lastName: String(50);
    email: String(50); 
    password: String(20);
    age: Integer;
}


