var fps = 16;
var screen_width = window.innerWidth;
var screen_height = window.innerHeight;

var canvas = document.getElementById('canvas');
canvas.width = screen_width;
canvas.height = screen_height;
var ctx = canvas.getContext('2d');



class ChanceCommunityChest{ //consider inheritance for this with a parent CardDeck class
	constructor(card_type){
		this.card_type = card_type;
		this.cards = this.getCardList();
		this.width = 180;
		this.height = 100;
	}

	getCardList(){
		return ["hello", "world"];
	}

	show(){
		ctx.save()

		if (this.card_type == "community_chest"){
			ctx.rotate(Math.PI/4);
			ctx.translate(screen_width/2, 0);

			ctx.fillStyle = 'blue';
			ctx.fillRect(50, 50, this.width, this.height);
		}
		else if (this.card_type == "chance"){
			ctx.rotate(Math.PI/4);
			ctx.translate(screen_width/2, -screen_height/3.2);

			ctx.fillStyle = 'red';
			ctx.fillRect(50, 50, this.width, this.height);
		}
		

		ctx.restore()
	}
}

class PlayerProfile{
	constructor(player_name, player_number){
		this.player_name = player_name;
		this.cash = 1500;
		this.player_number = player_number;
		this.width = 0.6*screen_width;
		this.height = 0.15*screen_height;
		this.coords = this.getCoords();
	}
	show(){
		ctx.save();
		if(this.player_number == 2){
			ctx.translate(screen_width,0);
			ctx.rotate(Math.PI/2);
		}
		else if(this.player_number == 3){
			ctx.translate(screen_width,screen_height);
			ctx.rotate(Math.PI);
		}
		else if(this.player_number == 4){
			ctx.translate(0, screen_height);
			ctx.rotate(1.5*Math.PI);
		}

		ctx.fillStyle = 'black'
		ctx.fillRect(this.coords[0], this.coords[1], this.width, this.height);

		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.fillText(this.player_name, this.coords[0]+10, this.coords[1]+30);
		ctx.fillText(this.cash, this.coords[0]+10, this.coords[1]+70)
		ctx.restore()
	}

	getCoords(){
		return [200, 550]
	}
}

function initialize(){
	ctx.fillStyle = 'green';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//LOOP THIS!!
	// player_1 = new PlayerProfile("Karthick", 1);
	// player_1.show();
	// player_2 = new PlayerProfile("Niraj", 2);
	// player_2.show();
	// player_3 = new PlayerProfile("Alex", 3);
	// player_3.show();
	// player_4 = new PlayerProfile("Carson", 4);
	// player_4.show();

	// community_chest = new ChanceCommunityChest("community_chest");
	// community_chest.show();

	// chance = new ChanceCommunityChest("chance");
	// chance.show();
}

initialize();