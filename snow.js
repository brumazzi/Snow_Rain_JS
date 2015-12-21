var width, height, l_or_r; // Variaveis de tamanho e direção do vento

l_or_r = parseInt(Math.random()*4)-2;
// Define a direção do vento + velocidade

// Gera uma posição aleatória para a caixa
function rand(){
	var box = document.getElementById("snow_box");
	return parseInt((Math.random()*box.clientWidth)+1);
}

// Incrementa o top para o floco descer
function increment_top(top,inc){
	var ntop = parseInt(top.replace("px",""));
	ntop += parseInt(inc);
	return ""+ntop+"px";
}

// Faz a comparação dos valores do top
function compare_top(top, val){
	var top = parseInt(top.replace("px",""));
	return (top <= val);
}

// seleciona a direção do vento a partir do mouse
/*function mouse_calculate(e){
	l_or_r = (parseInt(e.clientX) <= (width/2)) ? -(e.clientX%10) : e.clientX%10;
}*/

// Faz o deslocamento do floco
function wind(element){
	var pos = parseInt(element.style.left.replace("px",""));
	pos += l_or_r;
	return pos+"px";
}

// Se o floco chegar ao final da tela, ele e colocado do outro lado da tela
function no_out(element){
	pos = parseInt(element.style.left.replace("px",''));
	if(pos < -10)
		element.style.left = width+9+"px";
	else if(pos > width+10)
		element.style.left = -9+"px";
}

// Inicia a chuva de neve
function start_snow(flakes){
	var box = document.createElement("DIV"); // Cria a div dos flocos
	box.id = "snow_box";
	
	// coloca a div no body
	document.body.appendChild(box);
	//adiciona evento de mouse no body
	/*document.addEventListener("mousemove",function(event){
		mouse_calculate(event);
	});*/

	// Atualiza dados quando a janela tiver um novo tamanho
	document.onResize = function(){
		width = window.innerWidth;
		height = window.innerHeight;
	}
	document.onResize();
	var lines = []
	// Cria flocos e adiciona na div .snow_box
	for(var x=0;x<flakes;x+=1){
		var flake = document.createElement("SPAN");
		flake.style.top = -(rand()%1000)+"px";
		flake.style.left = rand()+"px";
		flake.className = "snow f"+(rand()%4+1);
		box.appendChild(flake);
		lines.push([flake,0]);
	}
	// cria função que executa em um intervalo de tempo
	var thread = setInterval(function(){
		for(var x=0;x<lines.length;x+=1){
			if(compare_top(lines[x][0].style.top,height-10)){
				// Faz o floco descer
				lines[x][0].style.top = increment_top(lines[x][0].style.top,3);
				//faz o floco se deslocar para o lado
				lines[x][0].style.left = wind(lines[x][0]);
				no_out(lines[x][0]); // Limite da tela
			}
			else{
				// reinicia o floco ao topo da tela
				if(lines[x][1] >= 25){
					lines[x][1] = 0;
					lines[x][0].style.top = -(rand()%1000)+"px";
					lines[x][0].style.left = rand()+"px";
				}else
					lines[x][1] += 1; // incremento de destruição do floco
			}

		}
	},50/*tempo de intervalo do método*/);
}

window.onload = function(){
	start_snow(120);
}
