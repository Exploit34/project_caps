// import cds from '@sap/cds';

export default (srv) => {
    const { User } = srv.entities;

    srv.on('READ', User, async (req) => {
        try {
            const users = await cds.run(SELECT.from(User));
            return users;
        } catch (error) {
            req.error(500, 'Error al leer los datos', error);
        }
    });

    srv.before('CREATE', User, async (req) => {
        try {
            const datauser = req.data;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(datauser.correo)) return req.error(400, 'Formato de correo electrónico inválido');

            const existeData = await cds.run(
                SELECT.from(User).where({ correo: datauser.correo})
            );

            if (existeData.length > 0) return req.error(400, 'El correo electrónico ya existe');

            await cds.run(
                INSERT.into(User).entries(datauser)
            );

            req.info(201, 'Usuario creado exitosamente');
        } catch (error) {
            req.error(500, 'Error al crear al usario', error);
        }
    });

    srv.on('UPDATE', User, async (req) => {
        try {
            const datauser = req.data;
            const id = req.params[0].ID;
            await cds.run(
                UPDATE(User).set(datauser).where({ ID: id })
            );

            req.info(200, 'Usuario actualizado exitosamente');
        } catch (error) {
            req.error(500, 'Error al actualizar el usuario', error);
        }
    });

    srv.on('DELETE', User, async (req) => {
        try {
            const id = req.params[0].ID;

            await cds.run(
                DELETE.from(User).where({ ID: id })
            );

            req.info(200, 'Usuario eliminado exitosamente');
        } catch (error) {
            req.error(500, 'Error al actualizar el usuario'. error);
        }
    });
};

