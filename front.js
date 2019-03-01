$.get('http://localhost:3000/', function(response) {
	response.forEach(function(perso) {
		new Personnage(perso.personnage_name, perso.personnage_img, perso.planete_name, perso.origine_name);
	})
})

var personnages = [];

class Personnage {

	constructor(name, image, planete, origine) {
		this.name = name;
		this.image = image;
		this.planete = planete;
		this.origine = origine;
		this.parent = document.body;
		this.create();
		this.setAttr();
		this.append();
		this.fill();
		personnages.push(this);
	}

	create() {
		this.cadre = document.createElement('div');
		this.titre = document.createElement('h1');
		this.cadreIMG = document.createElement('div');
		this.img = document.createElement('img');
		this.plnt = document.createElement('h2');
		this.p1 = document.createElement('p');
		this.orgn = document.createElement('h2');
		this.p2 = document.createElement('p');
	}

	setAttr() {
		this.cadre.setAttribute("class", "cadre");
		this.cadreIMG.setAttribute("class", "cadreIMG");
		this.img.setAttribute("src", this.image);
	}

	append() {
		this.parent.appendChild(this.cadre);
		this.cadre.appendChild(this.titre);
		this.cadre.appendChild(this.cadreIMG);
		this.cadre.appendChild(this.plnt);
		this.cadre.appendChild(this.p1);
		this.cadre.appendChild(this.orgn);
		this.cadre.appendChild(this.p2);
		this.cadreIMG.appendChild(this.img);
	}

	fill() {
		this.titre.innerHTML = this.name;
		this.plnt.innerHTML = "Planete";
		this.p1.innerHTML = this.planete;
		this.orgn.innerHTML = "Origine";
		this.p2.innerHTML = this.origine;
	}
}