const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const dbFile = "données.db";
const db = new sqlite3.Database(dbFile);

const app = express();
app.use(cors());

db.serialize ( () => {
	db.run('CREATE TABLE IF NOT EXISTS planetes(planete_id INTEGER PRIMARY KEY AUTOINCREMENT, planete_name VARCHAR(50))');
	db.run('INSERT INTO planetes (planete_name) VALUES (?)', "Terre");
	db.run('INSERT INTO planetes (planete_name) VALUES (?)', "Namek");
	db.run('INSERT INTO planetes (planete_name) VALUES (?)', "Information non Connue");

	db.run('CREATE TABLE origines (origine_id INTEGER PRIMARY KEY AUTOINCREMENT, origine_name VARCHAR(50) UNIQUE)');
	db.run('INSERT INTO origines (origine_name) VALUES (?)', "Terrien");
	db.run('INSERT INTO origines (origine_name) VALUES (?)', "Namek");
	db.run('INSERT INTO origines (origine_name) VALUES (?)', "Saiyen");

	db.run('CREATE TABLE personnages (personnage_id INTEGER PRIMARY KEY AUTOINCREMENT, personnage_name VARCHAR(50) UNIQUE, personnage_img TEXT UNIQUE, planete_id INTEGER, origine_id INTEGER, FOREIGN KEY(planete_id) REFERENCES planetes(planete_id), FOREIGN KEY(origine_id) REFERENCES origines(origine_id))');
	db.run('INSERT INTO personnages (personnage_name, planete_id, origine_id, personnage_img) VALUES (?, ?, ?, ?)', "Sangoku", 1, 3, "Images/Sangoku.gif");
	db.run('INSERT INTO personnages (personnage_name, planete_id, origine_id, personnage_img) VALUES (?, ?, ?, ?)', "Krilin", 1, 1, "Images/Krilin.png");
	db.run('INSERT INTO personnages (personnage_name, planete_id, origine_id, personnage_img) VALUES (?, ?, ?, ?)', "Piccolo", 1, 2, "Images/Piccolo.png");
	db.run('INSERT INTO personnages (personnage_name, planete_id, origine_id, personnage_img) VALUES (?, ?, ?, ?)', "Dendé", 2, 2, "Images/Dendé.png");
	db.run('INSERT INTO personnages (personnage_name, planete_id, origine_id, personnage_img) VALUES (?, ?, ?, ?)', "Vegeta", 3, 3, "Images/Vegeta.png");

});

app.get('/', function(request, response) {
	db.all('SELECT * FROM personnages NATURAL JOIN planetes NATURAL JOIN origines ', function(error, data) {
		if (!error) response.send(data)
		else console.log(error);
	}); //WHERE origine_name != "Namek"

})

app.listen(3000, function (error) {
	if (!error) console.log("bonjour");
	else console.log(error);
})
