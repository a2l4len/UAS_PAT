//sambungan ke database
var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var app = express();
const { json } = require('body-parser');
const session = require('express-session');
let i = 0;

app.use(bodyparser.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'uas_pat'
});
connection.connect(function(err){
    if (err) throw err;
    console.log("MySQL connected.....");
});

//baca data dari database
//while (i == 1){
app.get('/TempatTersedia', function(req,res){
    console.log('Menerima GET request /TempatTersedia');
    let sql = "SELECT * FROM daftar_hotel";
    let query = connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});
//}

app.get('/TanggalTersedia', function(req,res){
    console.log('Menerima GET request /TanggalTersedia');
    let sql = "SELECT * FROM daftar_tanggal_sedia";
    let query = connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.get('/daftarkamar', function(req,res){
    console.log('Menerima GET request /daftarkamar');
    let sql = "SELECT * FROM daftar_kamar_sedia";
    let query = connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.get('/databooking', function(req,res){
    console.log('Menerima GET request /databooking');
    let sql = "SELECT * FROM data_booking";
    let query = connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.get('/daftarmember', function(req,res){
    console.log('Menerima GET request /daftarmember');
    let sql = "SELECT * FROM member";
    let query = connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.get('/daftarmemberadmin', function(req,res){
    console.log('Menerima GET request /daftarmemberadmin');
    let sql = "SELECT * FROM member_admin";
    let query = connection.query(sql,function(err,result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

//login
app.post('/loginreq',function(req,res){
    
    console.log("Got a POST request");
        // let data = {Username: req.body.nama, Password : req.body.pass};
        // console.log("Got a Post request data="+JSON.stringify(data));
        let EmailAddress = {EmailAddress: req.body.EmailAddress};
        json.getString
        console.log("Got a Post request data="+JSON.stringify(EmailAddress.EmailAddress));
        let Password = {Password: req.body.Password};
    console.log("Got a Post request data="+JSON.stringify(Password.Password));
        let sql = "SELECT ID_Member,nama FROM member WHERE Email ='"+EmailAddress.EmailAddress+"' AND Password = '"+Password.Password+"'";
        console.log(sql)
        let query = connection.query(sql,(err,result)=>{
            console.log(JSON.stringify(
                {"status" : 200, "error" : null, "response" : result}
                ));
                if(result !=""){
                    res.send("Login Berhasil")
                    //res.send(result)
                }
                else{
                    res.send("Login Gagal")}
                
            });
    
});

//login admin
app.post('/loginadminreq',function(req,res){
    
    console.log("Got a POST request");
        // let data = {Username: req.body.nama, Password : req.body.pass};
        // console.log("Got a Post request data="+JSON.stringify(data));
        let EmailAddress = {EmailAddress: req.body.EmailAddress};
        json.getString
        console.log("Got a Post request data="+JSON.stringify(EmailAddress.EmailAddress));
        let Password = {Password: req.body.Password};
    console.log("Got a Post request data="+JSON.stringify(Password.Password));
        let sql = "SELECT ID_Admin,Nama FROM member_admin WHERE Email ='"+EmailAddress.EmailAddress+"' AND Password = '"+Password.Password+"'";
        console.log(sql)
        let query = connection.query(sql,(err,result)=>{
            console.log(JSON.stringify(
                {"status" : 200, "error" : null, "response" : result}
                ));
                if(result !=""){
                    res.send(result)}

                else{
                    res.send("Login Gagal")}
                
            });
});

//melakukan approve
app.put('/approve',function(req,res){
    console.log("Got a update request");
        let idbook = {idbook: req.body.idbook};
        json.getString
        console.log("Got a update request data="+JSON.stringify(idbook.idbook));
        let check = "SELECT ID_Booking FROM data_booking WHERE ID_Booking='"+idbook.idbook+"'";
        let checker = connection.query(check,(err,result)=>{
            console.log(JSON.stringify(
                {"status" : 200, "error" : null, "response" : result}
            ));
            console.log(result);
            if(result != ""){
                let sql = "UPDATE data_booking SET Status_Booking = 'Approved' WHERE ID_Booking ='"+idbook.idbook+"'";
                                let query = connection.query(sql,(err,resultdata_booking)=>{
                                console.log(JSON.stringify(
                                    {"status" : 200, "error" : null, "response" : "Perubahan Berhasil"}
                                    ));
                                    res.send("Perubahan Berhasil");
                                });
            }
            else{
                res.send("Perubahan Tidak Berhasil");
            }
        });
});

//melakukan unapproved
app.put('/unapprove',function(req,res){
    console.log("Got a update request");
        let idbook = {idbook: req.body.idbook};
        json.getString
        console.log("Got a update request data="+JSON.stringify(idbook.idbook));
        let check = "SELECT ID_Booking FROM data_booking WHERE ID_Booking='"+idbook.idbook+"'";
        let checker = connection.query(check,(err,result)=>{
            console.log(JSON.stringify(
                {"status" : 200, "error" : null, "response" : result}
            ));
            console.log(result);
            if(result != ""){
                let sql = "UPDATE data_booking SET Status_Booking = 'Unapproved' WHERE ID_Booking ='"+idbook.idbook+"'";
                                let query = connection.query(sql,(err,resultdata_booking)=>{
                                console.log(JSON.stringify(
                                    {"status" : 200, "error" : null, "response" : "Perubahan Berhasil"}
                                    ));
                                    res.send("Perubahan Berhasil");
                                });
            }
            else{
                res.send("Perubahan Tidak Berhasil");
            }
        });
});

//melakukan booking
app.post('/booking',function(req,res){
    console.log("Booking")
    let EmailAddress = {EmailAddress: req.body.EmailAddress};
    json.getString
    console.log("Got a Post request data="+JSON.stringify(EmailAddress.EmailAddress));
    let nama = {nama: req.body.nama};
    console.log("Got a Post request data="+JSON.stringify(nama.nama));
    let TanggalTersedia = {TanggalTersedia: req.body.TanggalTersedia};
    console.log("Got a Post request data="+JSON.stringify(TanggalTersedia.TanggalTersedia));
    let TempatTersedia = {TempatTersedia: req.body.TempatTersedia};
    console.log("Got a Post request data="+JSON.stringify(TempatTersedia.TempatTersedia));
    let lokasiHotel = {lokasiHotel: req.body.lokasiHotel};
    console.log("Got a Post request data="+JSON.stringify(lokasiHotel.lokasiHotel));
    let kamar = {kamar: req.body.kamar};
    console.log("Got a Post request data="+JSON.stringify(kamar.kamar));
/*
    let sql = "INSERT INTO data_booking(Email,Tanggal_DiBooking,Hotel_DiBooking,Lokasi_Hotel) VALUES('"+EmailAddress.EmailAddress+"','"+TanggalTersedia.TanggalTersedia+"','"+TempatTersedia.TempatTersedia+"','"+lokasiHotel.lokasiHotel+"')";
    let query = connection.query(sql,(err,result)=>{
        console.log(JSON.stringify(
        {"status" : 200, "error" : null, "response" : result}
        ));
        if(result !=""){
            res.send("Berhasil Booking")}

        else{
            res.send("Gagal Booking")} */
    
    let check = "SELECT Nama FROM member WHERE Email ='"+EmailAddress.EmailAddress+"'";

    let checker = connection.query(check,(err,resultcheck)=>{
        console.log(JSON.stringify(
            {"status" : 200, "error" : null, "response" : resultcheck}
            ));
            console.log(resultcheck);
            if (resultcheck != ""){
                let checkTempat = "SELECT Nama_Hotel,Tempat_Hotel FROM daftar_hotel WHERE Nama_Hotel ='"+TempatTersedia.TempatTersedia+"' AND Tempat_Hotel = '"+lokasiHotel.lokasiHotel+"'";
                let checkertempat = connection.query(checkTempat,(err,result)=>{
                console.log(JSON.stringify(
                {"status" : 200, "error" : null, "response" : result}
                ));
                console.log(result);
                if (result != ""){
                    let checkkamar = "SELECT Jenis FROM daftar_kamar_sedia WHERE Tanggal ='"+kamar.kamar+"'";
                    let checkerkamar = connection.query(checkkamar,(err,resultkamar)=>{
                    console.log(JSON.stringify(
                        {"status" : 200, "error" : null, "response" : resultkamar}
                    ));
                    console.log(resultkamar);
                    if(resultkamar!=""){
                        // let checktanggal = "SELECT Tanggal FROM daftar_tanggal_sedia WHERE Tanggal ='"+TanggalTersedia.TanggalTersedia+"'";
                        // let checkertanggal = connection.query(checktanggal,(err,resulttanggal)=>{
                            // console.log(JSON.stringify(
                            // {"status" : 200, "error" : null, "response" : resulttanggal}
                            // ));
                            // console.log(resulttanggal);
                            // if (resulttanggal != ""){
                                let sql = "INSERT INTO data_booking(Email,Tanggal_DiBooking,Hotel_DiBooking,Kamar_DiBooking,Nama,Lokasi_Hotel) VALUES('"+EmailAddress.EmailAddress+"','"+TanggalTersedia.TanggalTersedia+"','"+TempatTersedia.TempatTersedia+"','"+kamar.kamar+"','"+nama.nama+"','"+lokasiHotel.lokasiHotel+"')";
                                let query = connection.query(sql,(err,resultdata_booking)=>{
                                console.log(JSON.stringify(
                                    {"status" : 200, "error" : null, "response" : "Booking Berhasil"}
                                    ));
                                    res.send("Booking Berhasil");
                                });
                            // }
                            // else {
                            //     res.send("Tanggal Salah");
                            // }
                        // });
                    }
                    else{
                        res.send("Kamar yang Dipilih Salah");
                    }  
                    });
                }
                else {
                    res.send("Hotel Salah");
                }
            });
        
        }
    else {
        res.send(resultcheck);
    }  
    });

    
});
//});

//sambung ke port server
var server = app.listen(7000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Express app listening at http://%s:%s", host,port);
});
