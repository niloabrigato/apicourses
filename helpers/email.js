import nodemailer from 'nodemailer'

export const emailRegistro =  async (datos) => {
    const { email, nombre, token } = datos
    
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "27a3ae1a3f8762",
          pass: "e0cf4b5ec6a482"
        }
      })

      // información del email

      const info = await transport.sendMail({
        from: '"APICOURSES - Administrador de Cursos" <cuentas@api-courses.com>',
        to: email,
        subject: "APICOURSES - comprueba tu cuenta",
        text: "Comprueba tu cuenta en APICOURSES",
        html: `<p>Hola ${ nombre } Comprueba tu cuenta en APICOURSES</p>
        <p>Tu cuenta ya está casi lista,solo debes comprobarla en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
      })
    
}

