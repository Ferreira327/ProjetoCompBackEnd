import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import mailconfig from '../../config/mail.js'

const transport = nodemailer.createTransport({
    host:mailconfig.host,
    port:mailconfig.port,
    auth:mailconfig.auth

})

transport.use('compile', hbs({
    viewEngine:{
            extName: '.hbs',
            partialsDir: './src/resources/mail',
            layoutsDir: './src/resources/mail',
            defaultLayout: null
        },
        
        viewPath: path.resolve('./src/resources/mail'),
        extName: '.html'
    }))

    export default transport;