// buoc 1: cài đặt NodeJS
// bước 2: chạy example

const express = require('express')
const app = express()
const port = 3000

const expressHbs = require('express-handlebars');

const mongoose = require('mongoose');

const uri = 'mongodb+srv://tungmvph22660:8oz8QWq9Cy1Kbwza@cluster0.7evtk6n.mongodb.net/CP17305?retryWrites=true&w=majority';

const btModel = require('./baithoModel');
// namsx: 1975, tieude: 'Giai phong Dien Bien'

app.get('/tho', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let listThos = await btModel.find({});

  console.log(listThos);
  res.send(listThos);

})

app.get('/add_tho', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  const baitho = new btModel({
    tieude: 'bom roi',
    nam: 2003
  });

  baitho.tacgia = 'Tran Dang Khoa';

  let kq  = await baitho.save();

  console.log(kq);

  let listThos = await btModel.find();

  // btModel.updateMany({nam: 1975}, {nam: 1976})
  // btModel.updateOne()

  // btModel.deleteMany()
  // btModel.deleteOne()

  res.send(listThos);

})
// update
app.get('/udtho', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let ud = await btModel.updateOne({namsx: 44}, {namsx: 55});

  let listThos = await btModel.find({});

  console.log(listThos);
  res.send(listThos);
  

})
// xoa
app.get('/dele', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let ud = await btModel.deleteOne({namsx:22});

  let listThos = await btModel.find({});

  console.log(listThos);
  res.send(listThos);
  

})
app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  //defaultLayout: 'main',
  //layoutsDir: "views/layouts/",
}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );
// handlebars
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
})

app.get('/page2', (req, res) => {
  //res.render('home');
  res.render('page2', {layout: 'main', soA: 15, soB: 7, kq: 22});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

