const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(port, () => {
    console.log('Lắng nghe trên cổng http://localhost:3000');
});

const COMMON = require('./COMMON');
const uri = COMMON.uri;

const mongoose = require('mongoose');
const carModel = require('./carModel');
const apiMobile = require('./api');
app.use('/api', apiMobile);


app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    let cars = await carModel.find();

    console.log(cars);

    res.send(cars);
})

app.post('/add_xe', async (req, res) => {
    await mongoose.connect(uri);

    // let car = {
    //     ten: 'Xe3',
    //     nam: 2020,
    //     hang: "Mazda",
    //     gia: 1200 
    // }
    
    let car = req.body;

    let result = carModel.create(car);
    console.log(result);

    let cars = await carModel.find();
    res.send(cars);
})

app.delete('/delete', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.body;
    // Xử lý lỗi khi id không đúng
    await carModel.deleteOne({
        _id:id
    });

    let cars = await carModel.find();
    res.send(cars);
})

app.put('/update', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.body;
    let car = await carModel.findById(id); // tìm thông tin theo id
    let tenmoi = car.ten + " 2024";

    await carModel.updateOne({_id: id}, {ten: tenmoi});
    
    let xehoi = await carModel.find({});
    res.send(xehoi);

})