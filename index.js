const express = require ( 'express' );
require('dotenv').config();
const path = require('path');
const hbs = require ('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();
const PORT =  process.env.PORT || 8080; 



//Conexión a la base de datos

const conexion= mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

conexion.connect((err) => {
    if (err) {
        console.error (`Error en la conexión: ${err,stack}`)
        return; 
}
        /* console.log(`Conectado a la Base de datos ${process.env.DATABASE}`); */
})

conexion.connect();

//Configurar Middelwares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//Configuración del motor de plantillas
app.set('view engine', 'hbs');
app.set ('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res, next) => {
    res.render('index', {
        titulo: 'Bienvenido a la App',
    })
})

app.get('/formulario', (req, res, next) => {
    res.render('formulario')
})

app.post('/formulario', (req, res, next) => {
    // Asignación de datos a las variables enviadas
    //  let nombre = req.body.nombre;
    //  let provincia = req.body.provincia;
    //  let email = req.body.email;

    // Desestructuración de datos
    const { nombre, provincia, email } = req.body;

    /* console.log (nombre, provincia, email); */

    if (nombre == '' || email == '' || provincia == 'Seleccioná tu provincia') {
        let validacion = 'Rellene los campos correctamente';
        res.render('formulario', {
            validacion,
            titulo: 'Ups! Parece que falta algo'
        })
        
    } else {
        let datos = {
            nombre: nombre,
            email: email,
            provincia: provincia
        };
    
    let sql= 'INSERT INTO y8s8duza2lox2u7m.suscriptores SET?';
    
        conexion.query(sql, datos, (err, res) => {
            if (err) throw err;
    
        })
    
        res.render('formulario', {
            titulo: '¡Recibimos tus datos! Bienvenid@ a nuestra comunidad',
            });
            
    }
    });


app.get('/productos', (req, res, next) => {
    res.render('productos')
})

app.get('/contacto', (req, res, next) => {
    res.render('contacto')
})

app.post('/contacto', (req, res, next) => { 
    const{ nombre, email, texto } = req.body;


    if (nombre == '' || email == '' || texto == '') {
        let validacion = 'Rellene los campos correctamente';
        res.render('contacto', {
            validacion,
            titulo: 'Ups! Parece que falta algo'
        })
        
    } else {
        console.log(nombre);
        console.log(email);
        console.log(texto);

        async function envioMail () {

            let transporter = nodemailer.createTransport ({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.USEREMAIL,
                    pass: process.env.PASS
                }
            });

            let envio = await transporter.sendMail({
                from: process.env.USEREMAIL,
                to: `${email}`,
                subject: 'Recibimos tu mensaje',
                html: `Gracias por contactarte con nosotros, a la brevedad un equipo de MOMO Tostadores se comunicará con vos. <br> 
                Saludos <br>
                MOMO TOSTADORES`
            })
        }

        res.render ('contacto', {
            titulo: 'Recibimos tu mensaje. Responderemos a la brevedad'
        });
        envioMail(); 
    }
});



app.get('/index', (req, res, next) => {
    res.render('index')
})

app.get('/cajas', (req, res, next) => {
    res.render('cajas')
})


app.get('/main', (req, res, next) => {
    res.render('main')
})


app.listen (PORT, () => {
    /* console.log(`El servidores está trabajando en el puerto ${PORT}`); */
});

