
  module.exports =  (srv) => { 
    const { Person } = cds.entities('my.person')

    // srv.on('READ', 'Person', async (req) => { //acá me sirve con comillas
    //     try {
    //         return await cds.transaction(req).run(SELECT.from(Person))
    //     } catch (error) {
    //         console.log("ERROR", error);
    //         req.error(500, "Ocurrió un error en el server", error)
    //     }
    // })

    // srv.on('READ', 'Person', async (req) => {
    //     const {ID} = req.params;
    //     console.log("type of", typeof ID);
    //     let id = parseInt(ID)
    //     try {
    //         await run(SELECT.from(Person).where({ID:id}))
    //     } catch (error) {
    //         req.error(500, "Error obteniendo a la persona por ID", error)
    //     }
    // })

    srv.before('DELETE', Person, async (req) => {
        const {ID} = req.params;

        try {
            await cds.transaction(req).run(DELETE.from(Person).where({ID}))
            // req.info("Eliminado con éxito")
        } catch (error) {
            req.error(500, "Error obteniendo eliminando a la persona", error)
        }
    })

    srv.on('UPDATE', Person, async (req) => {

        const newPersonUpdate = req.data
        let {ID} = req.params;

        try {
            let result = await cds.transaction(req).run(SELECT.from(Person).where({ID}))
            if (result) {
                await cds.transaction(req).run(UPDATE.from(Person).set(newPersonUpdate).where({ID}))                
            } else {
                req.error(404, "No se encuentra en el sistema")
            }

        } catch (error) {
            req.error(500, "Error actualizando a la persona");
        }
    })

    srv.on('CREATE', Person, async (req) => { //sin comillas sirve :'
        try {
            const newPersonData = req.data; // Obtener los datos de la nueva persona
            // newPersonData.ID = 444
            console.log("WWWW", newPersonData)
            let result = await cds.transaction(req).run(SELECT.from(Person).where({email: newPersonData.email}))

            if (result.length == 0) {
                
                if (newPersonData.age <= 0) {
                    return req.error(400, "the age must be greater than 0")
                }
                let transaction= await cds.transaction(req).run(INSERT.into(Person).entries(newPersonData));
                if (transaction === 0) {
                    req.error (500, "hubo un error :(")
                }
        } else {
            req.error(500, "YA EXISTES AQUI")
        }

            // req.info(200, `¡Persona creada exitosamente!`);
        } catch (error) {
            console.error("ERROR", error);
            req.error(500, "Error al crear la persona", error.message)
        }
    });

}


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
   