let mode = "";
var x;
const gridContainer = document.querySelector(".container");
const cWidth = 500;
const cHeight = 500;
const allButton = document.querySelector('.buttons')
gridContainer.style.width = cWidth;
gridContainer.style.height = cHeight;


function createGrid(x){
	mode = "black";
	gridContainer.style.setProperty('--grid-rows', x);
	gridContainer.style.setProperty('--grid-cols', x);
	for(let i=0;i<x;i++){
		for(let k=0;k<x;k++){
			let grid = document.createElement('div');
			grid.classList.add('gridBox');
			grid.style.height = (cHeight/x) + "px";
			grid.style.widtht = (cWidth/x) + "px";
			grid.addEventListener('mouseover', paint);
			gridContainer.appendChild(grid);
		}
	}
}	

function rainbow(){
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	const color = `rgb(${red}, ${green}, ${blue})`;
	mode = "random";
	return color;
}

function paint(e){
		if (mode === "random"){
			e.target.style.backgroundColor = rainbow();
		}else if (mode === "white"){
			e.target.style.backgroundColor = eraseGrid();
		}else{
			e.target.style.backgroundColor = "black";
		}
}

function resizeGrid(){
  let x = prompt("Please enter the number of grids you want on each side:");
  gridContainer.innerHTML = "";
  createGrid(x);  
}


function resetGrid(){
	let allGrid = document.querySelectorAll('.gridBox');
	allGrid.forEach(grid =>{
		grid.style.backgroundColor = "white"});
}

function eraseGrid(){
	mode = "white";
	return "white";
}

function blackGrid(){
	mode = "black";
}
createGrid(9);


