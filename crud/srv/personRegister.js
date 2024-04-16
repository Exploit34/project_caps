
//   module.exports =  (srv) => {
//     const { Person } = cds.entities('my.person')

//     srv.on('READ', 'Person', async (req) => {
//         try {
//             return await cds.transaction(req).run(SELECT.from(Person))
//         } catch (error) {
//             console.log("ERROR", error);
//         }
//     })

//     srv.on('CREATE', 'Person', async (req) => {
//         const newPersonData = req.data; // Obtener los datos de la nueva persona
//         try {
//             // Insertar la nueva persona en la entidad "Person"
//             return await cds.transaction(req).run(INSERT.into(Person).entries(newPersonData));
//             // return `¡Persona creada exitosamente!`;
//         } catch (error) {
//             console.error("ERROR", error);
//             return `Error al crear la persona: ${error.message}`;
//         }
//     });

// }



    // srv.on('CREATE', 'Person', async (req) => {
    //     const newSapCap = req.data;
    //     try {
    //         return await cds.transaction(req).run(INSERT.into(Person).entries(newSapCap))
    //     } catch (error) {
    //         console.log("ERROR", error);
    //     }
    // })
    // INSERT.into(SapCaps).entries(newSapCap)

// srv.before ('CREATE', 'Orders', async (req) => {
//     const order = req.data
//     if (!order.amount || order.amount <= 0)  return req.error (400, 'Order at least 1 book')
//     const tx = cds.transaction(req)
//     const affectedRows = await tx.run (
//       UPDATE (Books)
//         .set   ({ stock: {'-=': order.amount}})
//         .where ({ stock: {'>=': order.amount},/*and*/ ID: order.book_ID})
//     )
//     if (affectedRows === 0)  req.error (409, "Sold out, sorry")
//   })


// module.exports = (srv) => {

//     // Reply mock data for Books...
//     srv.on ('READ', 'Person', ()=>[
//       { ID:201, name:'ANA', lastName:"101", email:"101", password:"12345", age:12 },
//       { ID:251, name:'JHON', lastName:"150", email:"101", password:"12345", age:12 },
//       { ID:252, name:'LUIS', lastName:"150", email:"101", password:"12345", age:555 },
//       { ID:271, name:'LUZ', lastName:"170", email:"101", password:"12345", age:222 },
//     ])
   
//    }
   