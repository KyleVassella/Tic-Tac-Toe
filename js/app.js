//Change class names around to meet requirements
//Don't clear the name values each time. Only replace if a new value is given. 
//Have a 'swap' button for player 1 and player 2 after the game
//Display the names in the inputs 
//Do you really need to change name every time? Well, high probability people will alternate between who goes first. So if you include it, state that its optional and only remove names if the new input is given value. 

"use strict";

var $box = $('.box');
var $player1 = $('#player1');
var $player2 = $('#player2');
var $player1Input = $('.player-1-name');	// is caching these necessary?
var $player2Input = $('.player-2-name');
var current1Input;
var current2Input;

var boxArray = $($box).toArray();
var input1Array = $($player1Input).toArray();
var input2Array = $($player2Input).toArray();

function clearInputs() {
	for (var i=0;i<input1Array.length;i++) {
		$(input1Array[i]).val('');
		$(input2Array[i]).val('');
	}
}

function isClickedO(indices) {
	return indices.every(function(element){return $(boxArray[element]).hasClass('o-clicked');});
}

function isClickedX(indices) {
	return indices.every(function(element){return $(boxArray[element]).hasClass('x-clicked');});
}

function isClicked(indices) {
	return indices.every(function(element){return $(boxArray[element]).hasClass('clicked');});
}


$('.button').click(function(){
    $('#board').show();
	$('#start').hide();
	$('#win-one').hide();
	$('#win-two').hide();
	$('#tie').hide();
	$box.removeClass('x-clicked o-clicked clicked');
	$box.css({'background-image':'none','background-color':'#EFEFEF'});
	$player1.addClass('active');
	$player2.removeClass('active');
	$('.player-1-name-display').empty();
	$('.player-2-name-display').empty();
	$('.winner-name').empty();	// removes the appended winner's name from #win-one and #win-two 
	for (var i=0;i<3;i++) {
		if ($(input1Array[i]).val()) {
			current1Input = $(input1Array[i]).val();		//asigning a 'current1Input' variable allows me to avoid using a for loop w/ condidional statement here
			$('.player-1-name-display').append(current1Input);
		}
		if ($(input2Array[i]).val()) {
			current2Input = $(input2Array[i]).val();
			$('.player-2-name-display').append(current2Input);
		}
	}
});

$box.click(function(){
	var self = $(this);
	if ($('#player1').hasClass("active") && !self.hasClass('x-clicked') && !self.hasClass('o-clicked') && !self.hasClass('clicked') ) {			// second condition prevents multiple svg being appended to same <li> // why does 'this' (without attaching it to a variable) result in text being appended and not the svg?
		
		$player1.toggleClass("active");
		$player2.toggleClass("active");
		self.css({"background-image":"(url:'media/o.svg')", "background-color":"#ffa000"});
		self.addClass("o-clicked");
		self.addClass("clicked");
	} else if ($('#player2').hasClass("active") && !self.hasClass('x-clicked') && !self.hasClass('o-clicked') && !self.hasClass('clicked') ) {
		$player1.toggleClass("active");
		$player2.toggleClass("active");
		self.css({"background-image":"url('media/x.svg')","background-color":"#3b89c1"});
		self.addClass("x-clicked");
		self.addClass("clicked");
		
	}
	if (isClickedO([0, 1, 2]) || isClickedO([3, 4, 5]) || isClickedO([6, 7, 8]) || isClickedO([0, 3, 6]) || isClickedO([1, 4, 7]) || isClickedO([2, 5, 8]) || isClickedO([0, 4, 8]) || isClickedO([2, 4, 6])) {
			setTimeout(function(){
				$('.winner-name').append(current1Input);
				current1Input = '';		// this clears the current turn name, not the winner name
				current2Input = '';
				clearInputs();			// clears the winner name, not the turn name. At this point both are needed with the way your code is written.
				$('#win-one').show();
			}, 135);
		} else if (isClickedX([0, 1, 2]) || isClickedX([3, 4, 5]) || isClickedX([6, 7, 8]) || isClickedX([0, 3, 6]) || isClickedX([1, 4, 7]) || isClickedX([2, 5, 8]) || isClickedX([0, 4, 8]) || isClickedX([2, 4, 6])) {
			setTimeout(function(){
				$('.winner-name').append(current2Input);
				current1Input = '';
				current2Input = '';
				clearInputs();	
				$('#win-two').show();
			}, 135);
		} else if(isClicked([0, 1, 2, 3, 4, 5, 6, 7, 8])){
			setTimeout(function(){
				current1Input = '';
				current2Input = '';
				clearInputs();	
				$('#tie').show();
			}, 135);
		}
});

$($box).hover(function() {
	var self = $(this);
	if ($player1.hasClass("active") && (!self.hasClass('x-clicked') && !self.hasClass('o-clicked'))) {
		self.css("background-image", "url('media/o.svg')");
	} else if ($player2.hasClass("active") && (!self.hasClass('x-clicked') && !self.hasClass('o-clicked'))) {					// cut this to an if else when you're sure you won't need this
		self.css("background-image", "url('media/x.svg')");
	}
}, function() {		// remove the temporary hover background-image if square is not clicked. 
	var self = $(this);
	if (!self.hasClass('x-clicked') && !self.hasClass('o-clicked')) {
	self.css("background-image", "none");
	}
});



