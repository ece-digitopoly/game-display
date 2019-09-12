// Setting up Globals
const FPS = 16;
const screen_width = window.innerWidth > 1280 ? 1280 : window.innerWidth
const screen_height = window.innerHeight > 1024 ? 1024 : window.innerHeight
const LIGHT_FONT = 'JosefinSans-Light';
const BOLD_FONT = 'JosefinSans-Bold';
const REGULAR_FONT = 'JosefinSans-Regular';

var players = new Array();

var regFont = new FontFace(REGULAR_FONT, 'url(public/fonts/JosefinSans-Regular.ttf)');  
regFont.load().then(function(font){  
    console.log("Loaded font!")
   document.fonts.add(font);  
}); 

var canvas = document.getElementById('canvas');
canvas.width = screen_width;
canvas.height = screen_height;
var ctx = canvas.getContext('2d');

console.log(screen_width, screen_height);


function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == 'undefined') {
	  stroke = true;
	}
	if (typeof radius === 'undefined') {
	  radius = 5;
	}
	if (typeof radius === 'number') {
	  radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else {
	  var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
	  for (var side in defaultRadius) {
		radius[side] = radius[side] || defaultRadius[side];
	  }
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
	  ctx.fill();
	}
	if (stroke) {
	  ctx.stroke();
	}
  
  }


class Coords{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}
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

class Property{
	constructor(position, owner){
		this.name = PROPERTY_DATA[position].name
		this.position = position;
		this.prices = [0, 0, 0, 0, 0, 0];//PROPERTY_DATA[position].prices;
		this.color = PROPERTY_DATA[position].color;
		this.owner = owner
		this.num_houses = 0
		this.num_hotels = 0
		this.current_rent = this.prices[0]
		this.mortgaged = false;
		this.subtype = PROPERTY_DATA[position].subtype;
		this.mortgage_price = PROPERTY_DATA[position].mortgage_price;
	}

	showSmall(offset){
		var width = 0.065*screen_width;
		var height = 0.12*screen_height;
		var small_coords = new Coords(this.owner.coords.x + this.owner.width - width - 10 - offset*12, this.owner.coords.y+13);
		
		// White Outline
		ctx.fillStyle = 'white';
		if(this.mortgaged){
			ctx.fillStyle = 'gray';
		}
		ctx.strokeStyle = 'black'
		ctx.fillRect(small_coords.x, small_coords.y, width, height);
		ctx.strokeRect(small_coords.x, small_coords.y, width, height);
		if(this.subtype == "Regular"){
			//Color Strip
			ctx.fillStyle = this.color;
			ctx.fillRect(small_coords.x+2, small_coords.y+2, width-4, 0.03*screen_height);

			//Text on Strip
			ctx.textAlign = 'center';
			ctx.font = `8px "${REGULAR_FONT}"`;
			ctx.fillStyle = "white";
			ctx.fillText("TITLE DEED", small_coords.x+42, small_coords.y+12);

			ctx.font = `8px "${LIGHT_FONT}"`;
			ctx.fillStyle = "white";
			ctx.fillText(this.name, small_coords.x+42, small_coords.y+22);

			if(this.mortgaged){
				ctx.font = `12px "${LIGHT_FONT}"`;
				ctx.fillStyle = "black";
				ctx.fillText("MORTGAGED", small_coords.x+42, small_coords.y+42);
			}
			else{
				//Text Below Strip
				ctx.font = `12px "${LIGHT_FONT}"`;
				ctx.fillStyle = "black";
				ctx.fillText("Rent: "+this.current_rent, small_coords.x+42, small_coords.y+42);
				ctx.fillText("Houses: "+this.num_houses, small_coords.x+42, small_coords.y+54);
				ctx.fillText("Hotels: "+this.num_hotels, small_coords.x+42, small_coords.y+66);
				ctx.fillText("To Mortgage: ", small_coords.x+42, small_coords.y+78);
				ctx.fillText(this.mortgage_price, small_coords.x+42, small_coords.y+90);
			}
		}
	}
}
class PlayerProfile{
	constructor(player_name, player_number){
		this.player_name = player_name;
		this.player_number = player_number;

		this.is_current_turn = false;
		this.position = 0;
		this.properties = new Array();
		this.cash = 1500;
		this.is_bankrupt = false;
		this.in_jail = false;
		this.width = 0.6*screen_width;
		this.height = 0.15*screen_height;
		this.coords = new Coords(0.2*screen_width, 0.8*screen_height)
	}
	show(){
		ctx.save();

		//Rounded BG Box
		ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; 
		roundRect(ctx, this.coords.x, this.coords.y, this.width, this.height, 10, true, false);

		//Player Title
		ctx.font = `30px "${REGULAR_FONT}"`;
		ctx.fillStyle = "white";
		ctx.fillText(this.player_name, this.coords.x+20, this.coords.y+30);

		//Player Money
		ctx.font = `50px "${REGULAR_FONT}"`;
		ctx.fillStyle = "white";
		ctx.fillText('$'+this.cash, this.coords.x+140, this.coords.y+80);

		this.showProperties();

		ctx.restore()
	}

	showProperties(){
		for(var i = 0; i < this.properties.length; i++){
			this.properties[i].showSmall(i);
		}
	}

	changeActivePropertyLeft(){
		var temp = this.properties.pop()
		this.properties.unshift(temp);
	}
}

function update(){
	ctx.fillStyle = '#e35cff'
	ctx.fillRect(0, 0, screen_width, screen_height);

	for(var i = 0; i < players.length; i++){
		players[i].show();
	}
	
}
function initialize(){
	ctx.fillStyle = '#e35cff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	player_1 = new PlayerProfile("CAR", 1);
	

	prop1 = new Property(1, player_1);
	prop1.mortgaged = true;
	prop2 = new Property(6, player_1);
	player_1.properties.push(prop1);
	player_1.properties.push(prop2);
	players.push(player_1)
	setInterval(update, 1000/FPS);
	setInterval(function(){
		player_1.changeActivePropertyLeft();
	}, 1000)

	setTimeout(function(){
		prop3 = new Property(3, player_1);
		player_1.properties.push(prop3)
	}, 5000);


	
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

