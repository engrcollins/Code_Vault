window.onload = function(){
	function setDate() {
		const now = new Date();
		const mm = now.getMonth();
		const dd = now.getDay();
		const dt = now.getDate();
		const yyyy = now.getFullYear();
		const secs = now.getSeconds();
		const mins = now.getMinutes();
		const hrs = now.getHours();
		const monthName = [
			'January','February','March','April',
			'May','June','July','August','September',
			'October','November','December'
		];
		const dayName = [ 'Sunday', 'Monday', 'Tuesday',
			'Wednesday', 'Thursday', 'Friday',
			'Saturday'
		];
		
		var hours ="";
		var minutes="";
		var seconds="";

		var month="";
		var day="";
		var date="";
		var year="";
		var meridian ="";
		if (hrs > 12) {
			hours = hrs - 12;
			meridian = "pm";	
		} else {
			hours = hrs;
			if(hours == 12){
			  meridian = "pm";
			}else{
			  meridian = "am";
			}
		}

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (secs < 10) {
			seconds = '0' + secs;
		} else {
			seconds = secs;
		}
		
		if (mins < 10) {
			minutes= '0' + mins;
		} else {
			minutes = mins;
		}
		month = monthName[mm];
		day = dayName[dd];
		date = dt;
		year = yyyy;
		const presentDate = document.querySelector('.date');
		//present.innerHTML = 
		presentDate.innerHTML = `Date: ${day}, ${date} ${month} ${year}. | Time: ${hours}:${minutes}:${seconds}${meridian}`;
		//dt +" " +month +" " +year". | Time
	}
	setInterval(setDate,1000);
}


var pageMenu;
var title
var title_description;
var tab;
var i;
var myTarget;

function changeActive(){
	if (!myTarget.hasClass('active')){
		allTarget.removeClass('active')
		myTarget.addClass('active')
	}
}

function reloadPage(){
	pageMenu.click(function(e){
		e.preventDefault();
		location.reload();
	});
}

//Append all page elements
function makeItRain() {
	$(document).ready(function(){
		pageMenu.click(function(){
			myTarget=$(pageMenu)
			allTarget = $('.topic-pill')
			changeActive()
			$('.intro').click(function(e){
				e.preventDefault();
				location.reload();
			});
			$('.rightSide').empty();
			pageMenu.addClass('active')
			$('.rightSide').append(`<h3 id='title'>${title}</h3>`);
			$('.rightSide').append(`<p>${title_description}</p>`);
			$('.rightSide').append(`<div class='content'></div>`);
			$('.content').append(`<div class='indicator'></div>`);
			$('.indicator').append(`<h4>${tab}</h4>`);
			$('.indicator').append(`<p>${instruction}</p>`);
			$('.content').append("<div class='row' id='contentRow'></div>");
			$('#contentRow').append("<div class='contentLeft'></div>");
			$('.contentLeft').append(`<label for="process">Number:	.</label>`, `<input id="number" name="process" type="text" placeholder="Input your number"/>`, "<br>", `<button class="btn btn-primary" type="submit" onclick="return process()">Submit</button>`, `<h3>Result</h3>`, `<p class="output" id="output"></p>`);
			$('#contentRow').append(`<div class="contentRight" id="rightContent"></div>`);
		});
	});
}

//Run the process when input is submitted
function process(){
	var graphic = document.getElementById('rightContent')
    var output = document.getElementById('output')
    var result = document.createElement('h4')
	var graphicImage = document.createElement('img')
	myTarget = ""
    while(graphic.firstChild){
      graphic.removeChild(graphic.firstChild)
	}
	while (output.firstChild) {
			output.removeChild(output.firstChild)
	}
    var num = $('#number').val();
    if (isNaN(num) || num == "") {
		graphicImage.src = "../materials/lion-pointing-left.jpg"
		graphic.appendChild(graphicImage)
		result.setAttribute('class', 'result')
        result.style.color = 'red'
		output.appendChild(result)
		$('.result').append(`<p>Oooops!! A valid number must be provided</p>`)
    }else{
		identity = pageMenu.text()
		switch (identity){
			case 'Parity':
				graphicImage.src = "../materials/gear-loading.gif"
				graphic.appendChild(graphicImage)
				setTimeout(() => {
					graphic.removeChild(graphicImage)
					result.setAttribute('class', 'result')
					output.appendChild(result)
					if (num % 2 == 0) {
						$('.result').append(`<p>${num} is an even number</p>`)
					} else {
						$('.result').append(`<p>${num} is an odd number</p>`)
					}
					
				}, 1500);  
				break;

			case 'Prime Number and Factor':
				graphicImage.src = "../materials/gear-loading.gif"
				graphic.appendChild(graphicImage)
				setTimeout(() => {
					var dividend = num;
					graphic.removeChild(graphicImage)
					result.setAttribute('class', 'result')
					output.appendChild(result)
					if ($('#number-but').hasClass('active')){	
						console.log(isPrime(1));		
						if(isPrime(num)){
							$('.result').append(`<p>${num} is a prime number</p>`)
						}else{
							$('.result').append(`<p>${num} is <span style="color:red">NOT</span> a prime number</p>`)
						}
						function isPrime(number){
							if(number == 1){
								return false;
							} else if (number == 2) {
								return true;
							}else{
								for(let i = 2; i < number; i++){
									if (dividend % i == 0){
										return false
									}
								}
								return true
							}
						}				
					}
					if ($('#factor-but').hasClass('active')){
						var factors = [], i;
							for (i = 2; i <= num; i++) {
								while ((dividend % i) === 0) {
									factors.push(i);
									dividend /= i;
								}
							}
							$('.result').append(`<p>The prime factors of ${num} are ${factors}</p>`)
					}
				}, 1500);
				break;

			case 'Factorial':
				graphicImage.src = "../materials/gear-loading.gif"
        		graphic.appendChild(graphicImage)
        	    setTimeout(() => {
						y = factorialize(num);
            			graphic.removeChild(graphicImage)
						result.setAttribute('class', 'result')
						output.appendChild(result)
						console.log(y)
						$('.result').append(`<p>The factorial of ${num} is ${y}</p>`)
				},1500);  
	
			default: $('.result').append(`<p>internal error<p>`)
		}
	}
}
//endProcess

//Each topic with a function that runs when the menu topic is clicked
//Parity
function Parity(){
	pageMenu = $('.parity');
	title = 'Parity';
	title_description = "Parity is the property of an integer's inclusion in one of two categories: even or odd. An integer is even if it is divisible by two and odd if it is not even. A formal definition of an even number is that it is an integer of the form n = 2k, where k is an integer; it can then be shown that an odd number is an integer of the form n = 2k + 1 (or alternately, 2k - 1). It is important to realize that the above definition of parity applies only to integer numbers, hence it cannot be applied to numbers like 1/2 or 4.201. The sets of even and odd numbers can be defined as following: <or> <li>Even = {2k : k ε Z}</li> <li>Odd ={2k+1 : k ε Z}</li> </or>. <br>The even numbers form an ideal in the ring of integers, but the odd numbers do not — this is clear from the fact that the identity element for addition, zero, is an element of the even numbers only. An integer is even if it is congruent to 0 modulo this ideal, in other words if it is congruent to 0 modulo 2, and odd if it is congruent to 1 modulo 2.<br>All prime numbers are odd, with one exception: the prime number 2. All known perfect numbers are even; it is unknown whether any odd perfect numbers exist. <br> Goldbach's conjecture states that every even integer greater than 2 can be represented as a sum of two prime numbers. Modern computer calculations have shown this conjecture to be true for integers up to at least 4 × 1018, but still no general proof has been found.";
	tab = "";
	instruction = "To find if a number is even or odd, input the number and click the submit button below."
	makeItRain();
}

//Factorial
function factorialize(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
}
function Factorial(){
	pageMenu = $('.factorial');
	title = 'Factorial';
	title_description = "A factorial is a mathematical function that multiplies every number below it. It is the product of all positive integers less than or equal to a given positive integer and denoted by that integer and an exclamation point."
	tab = "";
	instruction = "To find the factorial of a number, input the number and click the factorial button below."
	makeItRain();
}

//Prime Number & Prime Factor
function Prime(){
	pageMenu = $('.prime');
	title = 'Prime Number and Factor';
	title_description = "<b>Prime Number</b>: This is a natural number(greater than 1)that is completely divisible by only 1 and itself. That is, it has just 2 factors viz; 1 and itself. E.g: 2, 3, 5, 7, 11, 23, 29, 61 e.t.c. <br> <b>Prime Factorisation</b>: This is deducing the <b>prime numbers</b> that will multiply together to make a new natural number. Hence the prime numbers are prime factors of the natural number. For any number, there is only one, unique set of prime factors. E.g the prime factors of 42 are 2, 3, and 7."
	tab = "<button class='btn btn-default active' id='number-but'>Prime Number</button> <button class='btn btn-default' id='factor-but'>Prime Factor</button>";
	instruction = "To find if a number is prime, input the number and click the submit button below."
	makeItRain();
	$(document).ready(function(){
		$('#number-but').click(function(){
			instruction = "To find if a number is prime, input the number and click the submit button below."
			myTarget=$('#number-but')
			allTarget = $('.btn-default')
			changeActive()
			$('.indicator p').text(instruction);
		});
		$('#factor-but').click(function(){
			instruction = "To find the prime factors of a number, input the number and click the submit button below."
			myTarget=$('#factor-but')
			allTarget=$('.btn-default')
			changeActive()
			$('.indicator p').text(instruction);
			myTarget
		})
	})
}