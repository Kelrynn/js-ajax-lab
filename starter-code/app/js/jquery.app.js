$(function() {

const CATS_API = 'https://ga-cat-rescue.herokuapp.com/api/cats/';
let cats = getCats();

class Cat {
	constructor(name, note, image, id){
		this.name = name;
		this.note = note;
		this.image = image;
		this.id = id;
	}

	toString(){
		return `${this.name} - ${this.note}`;
	}
}

function getCats(){
	var cats = [];
	let ajax = $.ajax({
		url: CATS_API,
		type: 'GET',
	})
	.done(function() {
		let tempArray = JSON.parse(ajax.responseText);
		tempArray.forEach((ele) => {cats.push(new Cat(ele.name,ele.note,ele.image,ele.id))});
		printCats(); 
	});

	return cats;
	
};

function printCats(){
	let ul = $('#cats');
	ul.empty();
	cats.forEach((element) => {
		if (element.image != undefined){
			var li = $(`<li cat-id='${element.id}'>`).html(`<img src="${element.image}">`+ element.toString());
		}else {
			var li = $(`<li cat-id='${element.id}'>`).html(element.toString());
		}
		ul.prepend(li);
	});
}



function addCat(){
	let name = $('#cat-name').val();
	let note = $('#cat-note').val();
	let newCat = new Cat(name,note);
	cats.push(newCat);

	let ajax = $.ajax({
		url: CATS_API,
		type: 'POST',
		data: JSON.stringify(newCat)
	})
	.done(function() {
		console.log("success post");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
};

$('input').eq(1).click(function(event) {
	event.preventDefault();
	addCat();
	cats = getCats();
	printCats();
});


});