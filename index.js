const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');
// const nodemailer = require('nodemailer');//npm install nodemailer
// const readline = require('readline');


async function run() {
  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('Bien! WhatsApp conectado.');
  });

  await client.initialize();


  
function cumprimentar() {
  const dataAtual = new Date();
  const hora = dataAtual.getHours();

  let saudacao;

  if (hora >= 6 && hora < 12) {
    saudacao = "Buenos dias!";
  } else if (hora >= 12 && hora < 17) {
    saudacao = "Buenas tardes!";
  } else {
    saudacao = "Buenas noches!";
  }

  return saudacao;
}



  const delay = ms => new Promise(res => setTimeout(res, ms));

  

  client.on('message', msg => {
    if(msg.body === 'Hola') {
      client.sendMessage(msg.from,'por favor selecciona una opcion para continuar:\n\n 1. saludo\n 2. Optener la hora y fecha actual');
    } else if(msg.body=== '1.'){
      client.sendMessage(msg.from,cumprimentar())
    } else if (msg.body=== '2.'){
      client.sendMessage(msg.from, Date().toLocaleString() )
    }

  
  });
  
  function waitForResponse() {
    return new Promise((resolve, reject) => {
      client.on('message', async msg => {
        if (msg.from.endsWith('@c.us')) {
          resolve(msg);
        }
      });
    });
  }
}  
run().catch(err => console.error(err));
