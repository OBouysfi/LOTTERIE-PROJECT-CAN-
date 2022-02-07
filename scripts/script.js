var connect = ['admin','password'], equipes = [], nb = 0, nbr = 16, quart, demis, teams = [],gagnant,matchs = [], match_par_jour = 3, scores = [];
//equipes = ['A','Z','E','R','ZA','EA','AA','ZZ','EZ','ZR','ZE','RE','RR','RG','RS']
r(".ajouter_team").value = "Ajouter ("+nbr+")";

function r(t){
    return document.querySelector(t);
}
function connexion(){
    var pseudo = r('.pseudo').value, pass = r('.password').value;
    if(pass == connect[1] && pseudo == connect[0]){
        ok_connect();
    }
    else{
        err_connect();
    }
}
function err_connect(){
    r(".err.red").style.display = "inline-block";
    r(".err.red").innerHTML = "Nom d'utilisateur ou mdp incorrect.";
    console.log("Erreur");
}
function ok_connect(){
    next();
	r(".main .champs .champ").focus();

}
function vide(text){
    var a = 0;
    for(var i=0;i<text.length;i++){
        if(text[i] != " ")
            a++;
    }
    return a;
}
function removeSpecialChars(elt){
    var specialsChars = "\_\"\'\ \-\+\#\&\^\$\¤\*\£\!\/\:\;\.\?\,\µ\%\ù\¨\~\<\>\{\}\[\]\(\)\`\|\@\°\²\\", s = specialsChars.split("\\");
    var r = "";
    for(var i=0;i<elt.length;i++){
        if(!in_array(elt[i], specialsChars))
            r+=elt[i];
    }
    return r;
}
function add_team(){
    var equipe = removeSpecialChars(r('.champ.equipe').value.toUpperCase());
    if(vide(equipe) != 0){
        console.log(equipe);    
        if(!in_array(equipe, equipes)){
            equipes[equipes.length] = equipe;
            nb++;
            nbr--;
            add(equipe, nb);
//            r(".main .champs .champ").value = '';
            r(".ajouter_team").value = "Ajouter ("+nbr+")";
            if(nbr == 0){
                r(".main .champs .champ").style.display = 'none';
                r(".ajouter_team").style.width = "20vw";
                r(".ajouter_team").value = "FORMER LES POULES";
                r(".ajouter_team").setAttribute('onclick', 'poule()');
            }
        }
        else{
            alert("Déja existante");
        }
    }
    r(".main .champs .champ").focus();
	
}
function add(equipe, n){

    var div = document.createElement("div"), img = document.createElement("img"), h4 = document.createElement("h4"), btn = document.createElement("button");
    
    
    div.setAttribute("class", "equipe n"+n+" "+equipe);
    div.setAttribute("id", "equipe"+n);
    
    h4.innerHTML = equipe;
    btn.innerHTML="-"; 
    btn.setAttribute("onclick", "retirer('"+h4.innerHTML+"', '"+div.id+"')") ; 
    
    img.setAttribute("src", "images/"+equipe+".jpg");
    img.setAttribute("class", "drapeau");
    img.setAttribute("alt", equipe);
    
    if( n == 1)
        r(".equipe-list h2").innerHTML = "Liste des équipes";
        
    r(".equipes").appendChild(div);
    r("#"+div.id).appendChild(img);
    r("#"+div.id).appendChild(h4);
    r("#"+div.id).appendChild(btn);
}
function retirer(elt, elt2){
    remove(elt, equipes);
    r(".equipes").removeChild(r("#"+elt2));
    r(".main .champs .champ").focus();
    nbr++;
    r(".ajouter_team").value = "Ajouter ("+nbr+")";
    if(nbr >= 1){
            r(".main .champs .champ").style.display = 'inline-block';
            r(".ajouter_team").style.width = "10vw";
            r(".ajouter_team").value = "Ajouter ("+nbr+")";
            r(".ajouter_team").setAttribute('onclick', 'add_team()');
    }
}
function poule(){
    aff_rand();
	setTimeout(go_to, 10000, "page3");
	defile();
	c = setInterval(defile, 210);
}
function aff_rand(){
    var  div = document.createElement('div'), nombres , ta = [], n = 0;
	for(i=0;i<equipes.length;i++){
		ta[i] = equipes[i];
	}
	nombres = ta.length;
	for(i=0;i<nombres;i++){
        teams[i] = rand_and_remove(ta);
        console.log(teams[i]);
        var div = document.createElement("div"), img = document.createElement("img"), h4 = document.createElement("h4");

        div.setAttribute("class", "equipeP n"+i+" "+teams[i]);
        div.setAttribute("id", "equipeP"+i);
        //div.setAttribute("onclick", "selection('equipe n"+i+" "+teams[i]+"')");

        h4.innerHTML = teams[i];
        img.setAttribute("src", "images/"+teams[i]+".jpg");
        img.setAttribute("class", "drapeau");
        img.setAttribute("alt", teams[i]);
		n = (i%4)+1;
		console.log("n = "+n);
		console.log("i = "+i);
        r(".main2 .poule.zone"+n+" .pays").appendChild(div);
        r(".main2 .poule.zone"+n+" .pays #"+div.id).appendChild(img);
        r(".main2 .poule.zone"+n+" .pays #"+div.id).appendChild(h4);
	    
    }
}
function save(){
    for(var num=1;num<5;num++){
        var a = count('.zone'+num+" .selected");
        if(a!= 2){
            alert("La poule n°"+num+" n'a pas 2 équipes sélectionnées");
            break;
        }
        else{
         quart.shift(document.querySelectorAll('.zone'+num+' .selected').innerHTML);
        }
    }
}
function count(elt){
    return document.querySelectorAll(elt).length;
}
function gagne(num, journee, elt){
    var liste = r(".j"+journee+" .match"+num+" ."+elt).classList;
	console.log(".j"+journee+" .match"+num+" ."+elt)
	if(in_array('selected', liste)){
		r(".j"+journee+" .match"+num+" ."+elt).setAttribute("class", liste[0]+" "+liste[1]);
	}
	else{				
		r(".j"+journee+" .match"+num+" ."+elt).setAttribute("class", "eq "+elt+" selected");
	}	
	
}
function gagne2(num, journee, elt){
    var liste = r(".j"+journee+" .match"+num+" ."+elt).classList;
	console.log(".j"+journee+" .match"+num+" ."+elt)
	if(in_array('nul', liste)){
		console.log("Déja Nul");
		var a = 0, l = document.querySelectorAll(".j"+journee+" .match"+num+" .eq");
		console.log(li);
		for(var i=0;i<l.length;i++){
			l[i].setAttribute("class", l[i].classList);
		}
		console.log(li);
		r(".j"+journee+" .match"+num+" ."+elt).setAttribute("class", liste[0]+" "+liste[1]+" selected");
	}
	else{
		if(in_array('selected', liste)){
			console.log("Selected");
			r(".j"+journee+" .match"+num+" ."+elt).setAttribute("class", liste[0]+" "+liste[1]);
		}
		else{		
			var a = 0, l = document.querySelectorAll(".j"+journee+" .match"+num+" .eq");
			for(var i=0;i<l.length;i++){
				if(in_array('selected',l[i].classList)){
					a = 1;
				}
			}
			if(a==0)
			{
				console.log("Rien");
				r(".j"+journee+" .match"+num+" ."+elt).setAttribute("class", "eq "+elt+" selected");
			}
			else{
				console.log("Déjà Selected");
				for(var i=0;i<l.length;i++){
					l[i].setAttribute("class", "eq "+elt+" nul");
				}			
			}
		}
	}
	
}
function calendrier(){
	next();
	var a=0;
	//FORMATION DES MATCHS
	for(k=0;k<teams.length/4;k++){
		for(i=k*4;i<k*4+3;i++){
			for(j=i+1;j<k*4+4;j++){
				matchs[a++] = teams[i]+'-'+teams[j];
			}
		}
	}
	//MELANGE DES MATCHS
	matchs = melange(matchs);
	var  div = document.createElement('div'), nombres = matchs.length, n = nombres / match_par_jour,cpt=0;
    for(var i=0;i<n;i++){
		var div = document.createElement("div"), h1 = document.createElement("h1");
		div.setAttribute("class", "journee j"+i);
		h1.innerHTML = "Journée "+(i+1);
		r(".journees").appendChild(div);
		r(".j"+i).appendChild(h1);
		for(var j=0;j<match_par_jour;j++){
			var div2 = document.createElement("div"), eA= document.createElement("div"), eB = document.createElement("div"),imgA = document.createElement("img"), h4A = document.createElement("h4"),imgB = document.createElement("img"), h4B = document.createElement("h4");
			div2.setAttribute("class", "match match"+cpt);
			eA.setAttribute("onclick","gagne("+cpt+","+i+",'"+matchs[cpt].split('-')[0]+"')");
			eB.setAttribute("onclick","gagne("+cpt+","+i+",'"+matchs[cpt].split('-')[1]+"')");
			eA.setAttribute("class", "eq "+matchs[cpt].split('-')[0]);
			eB.setAttribute("class", "eq "+matchs[cpt].split('-')[1]);
			h4A.innerHTML = matchs[cpt].split('-')[0];
			h4B.innerHTML = matchs[cpt].split('-')[1];
			imgA.setAttribute("src", "images/"+matchs[cpt].split('-')[0]+".jpg");
			imgA.setAttribute("class", "drapeau");
			imgA.setAttribute("alt", matchs[cpt].split('-')[0]);
			imgB.setAttribute("src", "images/"+matchs[cpt].split('-')[1]+".jpg");
			imgB.setAttribute("class", "drapeau");
			imgB.setAttribute("alt", matchs[cpt].split('-')[1]);
			r(".j"+i).appendChild(div2);
			r(".j"+i+" .match"+cpt).appendChild(eB);
			r(".j"+i+" .match"+cpt).appendChild(eA);
			r(".j"+i+" .match"+cpt+" ."+matchs[cpt].split('-')[0]).appendChild(h4A);
			r(".j"+i+" .match"+cpt+" ."+matchs[cpt].split('-')[0]).appendChild(imgA);
			r(".j"+i+" .match"+cpt+" ."+matchs[cpt].split('-')[1]).appendChild(h4B);
			r(".j"+i+" .match"+cpt+" ."+matchs[cpt].split('-')[1]).appendChild(imgB);
			cpt++;
		}
		/*
		<div class="journee j1">
			<h1>Journée 1</h1>
			<div class="match match1"><div class="equipeA eq"></div> VS <div class="equipeB eq"></div> </div>
		</div>
		*/
	}
	
}
function huitième(){
	var lis = document.querySelectorAll(".eq"), qualifies = {}, err = 0;
	qualifies.nom = [];
	scores = [];
	for(var i=0;i<lis.length;i++){		
		var l = lis[i].classList;
		scores[i] = 0;
	}
	for(var i=0;i<lis.length;i+=2){
		var l = lis[i].classList, l2 = lis[i+1].classList;
		qualifies.nom[i+1] = l2[1];
		qualifies.nom[i] = l[1];		
		if(!in_array("selected", l) && !in_array("selected", l2)){
			alert("Tous les matchs n'ont pas été gérés.\nVous ne pouvez pas continuer...");
			document.querySelector(".eq."+l[1]).style.background = "pink";
			document.querySelector(".eq."+l2[1]).style.background = "pink";
			err = 1;
			break;
		}
		else{				
			a = position(qualifies.nom[i], equipes);
			b = position(qualifies.nom[i+1], equipes);
			if(in_array("selected", l) && !in_array("selected", l2)){
				if(a != -1)
					scores[a] += 3;
				else     
					scores[i] += 3;
			}
			else if(in_array("selected", l2) && !in_array("selected", l)){				
				if(b != -1)
					scores[b] += 3;
				else
					scores[i+1] += 3;
			}
			else if(in_array("selected", l2) && in_array("selected", l)){
				if(b != -1)
					scores[b] += 1;
				else
					scores[i+1] += 1;
				
				if(a != -1)
					scores[a] += 1;
				else
					scores[i+1] += 1;
			}
		}
	}
	console.log(scores);
	if(err == 0){
		next();
		affich_scores();
	}
}
function affich_scores(){
	var a=0, i=0, teams = [];
	
	for(i=0;i<equipes.length/2;i++)
		teams[i] = equipes[i];
	equipes = teams;
	i = 0;
	for(var j=0;j<4;j++){
		var jou = document.createElement("div"), h1 = document.createElement("h1");
		h1.innerHTML = "Journée "+(j+1);
		h1.setAttribute("class","h1");
		jou.setAttribute("class", "journee j"+j);
		r(".quarts .quarts").appendChild(jou);
		r(".quarts .quarts .journee.j"+j).appendChild(h1);
		var divA = document.createElement("div"),divB = document.createElement("div"), imgA = document.createElement("img"), h4A = document.createElement("h4"), imgB = document.createElement("img"), h4B = document.createElement("h4");
		divA.setAttribute("class", "j"+j+" equipeA eq "+equipes[i]);
		divB.setAttribute("class", "j"+j+" equipeB eq "+equipes[i+1]);
		divA.setAttribute("onclick","qualifie('j"+j+"', 'equipeA eq "+equipes[i]+"')");
		divB.setAttribute("onclick","qualifie('j"+j+"', 'equipeB eq "+equipes[i+1]+"')");
		h4A.innerHTML = equipes[i];
		h4B.innerHTML = equipes[i+1];
		imgA.setAttribute("src", "images/"+equipes[i]+".jpg");
		imgA.setAttribute("alt", equipes[i]);
		imgA.setAttribute("class", "drapeau");
		imgB.setAttribute("src", "images/"+equipes[i+1]+".jpg");
		imgB.setAttribute("alt", equipes[i+1]);
		imgB.setAttribute("class", "drapeau");
		r(".quarts .journee.j"+j).appendChild(divA);
		r(".quarts .journee.j"+j).appendChild(divB);
		r(".quarts .journee.j"+j+" .equipeA.eq."+equipes[i]).appendChild(h4A);
		r(".quarts .journee.j"+j+" .equipeA.eq."+equipes[i]).appendChild(imgA);
		r(".quarts .journee.j"+j+" .equipeB.eq."+equipes[i+1]).appendChild(h4B);
		r(".quarts .journee.j"+j+" .equipeB.eq."+equipes[i+1]).appendChild(imgB);
		console.log(i);
		console.log(equipes[i]+equipes[i+1]);
		i+=2;
	}

}
function qualifie(journee, classe){
	var j = document.querySelectorAll("."+journee+" .eq");
	for(var i=0;i<j.length;i++){
		j[i].removeAttribute("onclick");
	}
	r('.'+replace(' ', '.', classe)).setAttribute("class", classe+" selected");
	r('.'+replace(' ', '.', classe)).setAttribute("onclick", "disqualifie('"+journee+"', '"+classe+"')");
}
function disqualifie(journee, classe){
	var j = document.querySelectorAll("."+journee+" .eq");
	for(var i=0;i<j.length;i++){
		var list = j[i].classList, ch = "";
		for(k=0;k<list.length;k++){			
			if(k!=0)
			ch+=" "+list[k];
			else
			ch+=list[k];
		}
		j[i].setAttribute("onclick", "qualifie('"+journee+"', '"+ch+"')");
	}
	r('.'+replace(' ', '.', classe)).setAttribute("class", classe);
}
function quarts(){
	var lis = document.querySelectorAll(".quarts .quarts .eq"), qualifies = {}, err = 0,teams= [];
	qualifies.nom = [];
	c=0;
	for(var i=0;i<lis.length;i+=2){
		var l = lis[i].classList, l2 = lis[i+1].classList;
		qualifies.nom[i+1] = l2[2];
		qualifies.nom[i] = l[2];		
		if(!in_array("selected", l) && !in_array("selected", l2)){
			alert("Tous les matchs n'ont pas été gérés.\nVous ne pouvez pas continuer...");
			document.querySelector(".quarts .quarts .eq."+l[1]).style.background = "pink";
			document.querySelector(".quarts .quarts .eq."+l2[1]).style.background = "pink";
			err = 1;
			break;
		}
		else{				
			a = position(qualifies.nom[i], equipes);
			b = position(qualifies.nom[i+1], equipes);
			if(in_array("selected", l) && !in_array("selected", l2)){
				teams[c++] = qualifies.nom[i];
			}
			else if(in_array("selected", l2) && !in_array("selected", l)){				
				teams[c++] = qualifies.nom[i+1];
			}
		}
	}
	if(err == 0){
		next();
		equipes = teams;
		affich_demis();
	}
}
function qualifie2(c1, journee, classe){
	var j = document.querySelectorAll("."+journee+" .eq");
	for(var i=0;i<j.length;i++){
		j[i].removeAttribute("onclick");
	}
	r('.'+c1+' .'+replace(' ', '.', classe)).setAttribute("class", classe+" selected");
	r('.'+c1+' .'+replace(' ', '.', classe)).setAttribute("onclick", "disqualifie2('"+c1+"','"+journee+"', '"+classe+"')");
}
function disqualifie2(c1, journee, classe){
	var j = document.querySelectorAll("."+journee+" .eq");
	for(var i=0;i<j.length;i++){
		var list = j[i].classList, ch = "";
		for(k=0;k<list.length;k++){			
			if(k!=0)
			ch+=" "+list[k];
			else
			ch+=list[k];
		}
		j[i].setAttribute("onclick", "qualifie2('"+c1+"','"+journee+"', '"+ch+"')");
	}
	r('.'+c1+' .'+replace(' ', '.', classe)).setAttribute("class", classe);
}
function affich_demis(){
	var a=0, i=0, teams = [];
	for(var j=0;j<2;j++){
		var jou = document.createElement("div"), h1 = document.createElement("h1");
		h1.innerHTML = "Journée "+(j+1);
		h1.setAttribute("class","h1");
		jou.setAttribute("class", "journee j"+j);
		r(".demis .demis").appendChild(jou);
		r(".demis .demis .journee.j"+j).appendChild(h1);
		var divA = document.createElement("div"),divB = document.createElement("div"), imgA = document.createElement("img"), h4A = document.createElement("h4"), imgB = document.createElement("img"), h4B = document.createElement("h4");
		divA.setAttribute("class", "j"+j+" equipeA eq "+equipes[i]);
		divB.setAttribute("class", "j"+j+" equipeB eq "+equipes[i+1]);
		divA.setAttribute("onclick","qualifie2('demis','j"+j+"', 'equipeA eq "+equipes[i]+"')");
		divB.setAttribute("onclick","qualifie2('demis','j"+j+"', 'equipeB eq "+equipes[i+1]+"')");
		h4A.innerHTML = equipes[i];
		h4B.innerHTML = equipes[i+1];
		imgA.setAttribute("src", "images/"+equipes[i]+".jpg");
		imgA.setAttribute("alt", equipes[i]);
		imgA.setAttribute("class", "drapeau");
		imgB.setAttribute("src", "images/"+equipes[i+1]+".jpg");
		imgB.setAttribute("alt", equipes[i+1]);
		imgB.setAttribute("class", "drapeau");
		r(".demis .journee.j"+j).appendChild(divA);
		r(".demis .journee.j"+j).appendChild(divB);
		r(".demis .journee.j"+j+" .equipeA.eq."+equipes[i]).appendChild(h4A);
		r(".demis .journee.j"+j+" .equipeA.eq."+equipes[i]).appendChild(imgA);
		r(".demis .journee.j"+j+" .equipeB.eq."+equipes[i+1]).appendChild(h4B);
		r(".demis .journee.j"+j+" .equipeB.eq."+equipes[i+1]).appendChild(imgB);
		console.log(i);
		console.log(equipes[i]+equipes[i+1]);
		i+=2;
	}
}
function demis(){
	var lis = document.querySelectorAll(".demis .demis .eq"), qualifies = {}, err = 0,teams= [];
	qualifies.nom = [];
	c=0;
	for(var i=0;i<lis.length;i+=2){
		var l = lis[i].classList, l2 = lis[i+1].classList;
		qualifies.nom[i+1] = l2[2];
		qualifies.nom[i] = l[2];		
		if(!in_array("selected", l) && !in_array("selected", l2)){
			alert("Tous les matchs n'ont pas été gérés.\nVous ne pouvez pas continuer...");
			document.querySelector(".demis .demis .eq."+l[1]).style.background = "pink";
			document.querySelector(".demis .demis .eq."+l2[1]).style.background = "pink";
			err = 1;
			break;
		}
		else{				
			a = position(qualifies.nom[i], equipes);
			b = position(qualifies.nom[i+1], equipes);
			if(in_array("selected", l) && !in_array("selected", l2)){
				teams[c++] = qualifies.nom[i];
			}
			else if(in_array("selected", l2) && !in_array("selected", l)){				
				teams[c++] = qualifies.nom[i+1];
			}
		}
	}
	if(err == 0){
		next();
		equipes = teams;
		affich_finale();
	}
}
function affich_finale(){
	var a=0, i=0, teams = [], j=0;
	var jou = document.createElement("div"), h1 = document.createElement("h1");
	h1.innerHTML = "FINALE";
	h1.setAttribute("class","h1");
	jou.setAttribute("class", "journee j"+j);
	r(".finale .finale").appendChild(jou);
	r(".finale .finale .journee.j"+j).appendChild(h1);
	var divA = document.createElement("div"),divB = document.createElement("div"), imgA = document.createElement("img"), h4A = document.createElement("h4"), imgB = document.createElement("img"), h4B = document.createElement("h4");
	divA.setAttribute("class", "j"+j+" equipeA eq "+equipes[i]);
	divB.setAttribute("class", "j"+j+" equipeB eq "+equipes[i+1]);
	divA.setAttribute("onclick","qualifie2('finale','j"+j+"', 'equipeA eq "+equipes[i]+"')");
	divB.setAttribute("onclick","qualifie2('finale','j"+j+"', 'equipeB eq "+equipes[i+1]+"')");
	h4A.innerHTML = equipes[i];
	h4B.innerHTML = equipes[i+1];
	imgA.setAttribute("src", "images/"+equipes[i]+".jpg");
	imgA.setAttribute("alt", equipes[i]);
	imgA.setAttribute("class", "drapeau");
	imgB.setAttribute("src", "images/"+equipes[i+1]+".jpg");
	imgB.setAttribute("alt", equipes[i+1]);
	imgB.setAttribute("class", "drapeau");
	r(".finale .journee.j"+j).appendChild(divA);
	r(".finale .journee.j"+j).appendChild(divB);
	r(".finale .journee.j"+j+" .equipeA.eq."+equipes[i]).appendChild(h4A);
	r(".finale .journee.j"+j+" .equipeA.eq."+equipes[i]).appendChild(imgA);
	r(".finale .journee.j"+j+" .equipeB.eq."+equipes[i+1]).appendChild(h4B);
	r(".finale .journee.j"+j+" .equipeB.eq."+equipes[i+1]).appendChild(imgB);
	console.log(i);
	console.log(equipes[i]+equipes[i+1]);
}
function finale(){
	var lis = document.querySelectorAll(".finale .finale .eq"), qualifies = {}, err = 0,teams= [];
	qualifies.nom = [];
	c=0;
	for(var i=0;i<lis.length;i+=2){
		var l = lis[i].classList, l2 = lis[i+1].classList;
		qualifies.nom[i+1] = l2[2];
		qualifies.nom[i] = l[2];		
		if(!in_array("selected", l) && !in_array("selected", l2)){
			alert("Sélectionnez le gagnant.\nVous ne pouvez pas continuer...");
			document.querySelector(".finale .finale .eq."+l[1]).style.background = "pink";
			document.querySelector(".finale .finale .eq."+l2[1]).style.background = "pink";
			err = 1;
			break;
		}
		else{				
			a = position(qualifies.nom[i], equipes);
			b = position(qualifies.nom[i+1], equipes);
			if(in_array("selected", l) && !in_array("selected", l2)){
				teams[c++] = qualifies.nom[i];
			}
			else if(in_array("selected", l2) && !in_array("selected", l)){				
				teams[c++] = qualifies.nom[i+1];
			}
		}
	}
	if(err == 0){
		next();
		equipes = teams;
		affich_vainqueur();
	}
}
function affich_vainqueur(){
	var a=0, i=0, teams = [], j=0;
	var div = document.createElement("div"), img = document.createElement("img"), h1 = document.createElement("h1");
	div.setAttribute("class", "gagnant");
	h1.innerHTML = equipes;
	h1.setAttribute("class","h1-vainqueur");
	img.setAttribute("src", "images/"+equipes+".jpg");
	img.setAttribute("alt", equipes);
	img.setAttribute("class", "drapeau-vainqueur");	
	r(".vainqueur .vainqueur").appendChild(div);
	r(".vainqueur .vainqueur .gagnant").appendChild(img);
	r(".vainqueur .vainqueur .gagnant").appendChild(h1);
}
function rangement(tab){
	for(var i=0;i<tab.length;i++){
		for(var j=i;j<tab.length;j++){
			if(tab[i]<tab[j]){
				b = equipes[i];
				equipes[i] = equipes[j];
				equipes[j] = b;
				
				a = tab[i];
				tab[i] = tab[j];
				tab[j] = a;
			}
		}
	}
	return tab;
}
function supprbypos(a, tab){
	var i;
	for(i=a ; i<tab.length ; i++){
		tab[i] = tab[i+1];
	}
	tab.pop();
	return tab;
}		
function melange(ch){
	var ch2 = [], l = ch.length;
	for(i=0;i<l;i++){			
		var a=random(0, ch.length-1);
		ch2[i]=ch[a];
		ch = supprbypos(a, ch);
	}
	return ch2;
}		
function replace(c1, c2, elt){
    var classes = "";
    for(var i=0;i<elt.length;i++){
        if(elt[i] == c1)
            classes+= c2;
        else
            classes+=elt[i];
    }
    return classes
}
function rand_and_remove(elt){
    var longueur = elt.length, a,nombre;
    do{
         nombre = parseInt((Math.random().toFixed(1) * longueur));
    }while(elt[nombre] == null);

    a = elt[nombre];
    elt[nombre] = elt[longueur-1];
    elt[longueur-1] = a;
    elt.pop();
    return a;
}
function in_array(elt, tab){
    var a = 0;
    for(i=0;i<tab.length;i++)
        if(elt == tab[i])
            a = 1;
    return a;
}
function remove(elt, tab){
    var n = position(elt, tab);
    for(i=n;i<tab.length-1;i++){				
        tab[i] = tab[i+1];
    }
    tab.pop();
}
function position(elt, tab){
    var a = -1;
    for(i=0;i<tab.length;i++)
        if(elt == tab[i])
            a = i;
    return a;
}
function random(min, max){
    if(max <= min)
        return min;
    else
        return ((parseInt( Math.random() * 1000 ) + min) % (max - min +1) )+ min;
}