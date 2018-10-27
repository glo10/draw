(function(){
    var draw = null;
    var eraser = false;
    var hidePanel = true;
    var enCours = false;
    var divPanel = document.querySelector('.palette');
    var panel = document.querySelector('span');
    var myCanvas = document.getElementById('dessin');
    var pen = myCanvas.getContext('2d');
    var msg = document.getElementById('msg');
    var saisirText = 'Veuillez saisir votre texte';

    myCanvas.style.backgroundColor='white';
    /**
    *@desc @params get id element and change parent css properties
    *@param elt String 
    *@param id1 String 
    *@param id2 String 
    *@param id3 String 
    */
    function colorParent(elt,id1, id2, id3){
        elt = document.getElementById(elt);
        elt.parentNode.style.color="rgba(237,28,36,0.8)"; 
        document.getElementById(id1).parentNode.style.color = "";
        document.getElementById(id2).parentNode.style.color = "";
        document.getElementById(id3).parentNode.style.color = "";
    }

    /**
    *desc 
    *@param String
    */
    function newMsg(myMsg){
        msg.innerHTML="";
        msg.innerHTML = '<span>' + myMsg + '</span>';
    }

    /*'<span>Couleur en cours d\'utilisation : ' + '<span style = "padding:5px 13.5px; border-radius:4px;border:1px solid black;background:' + evt.target.style.backgroundColor + ';"></span></span>'; */

    /*
    *@desc Create a range of panel colours
    */
    function showPanel(){
        if(hidePanel){
            divPanel.style.display='block';
            newMsg('Veuillez Cliquer sur une couleur pour dessiner');
            hidePanel=false;// in order to don't recreate a new panel if it's already exist
        }
    }

    document.getElementById('textSize').addEventListener('change',function(e){
        switch(e.target.value){
            case 'bold 8px arial':
                pen.font = textSize.value;
            break;
            case 'bold 10px arial':
                pen.font = textSize.value;
            break;
            case 'bold 14px arial':
                pen.font = textSize.value;
            break;
            case ' bold 16px arial':
                pen.font = textSize.value;
            break;
            case 'bold 20px arial':
                pen.font = textSize.value;
            break;
        }
    });

    document.querySelector('#text').addEventListener('click',function(e){
        myCanvas.style.cursor='url(../images/text.png) 0 16, auto';
        newMsg("Choisissez une couleur et ensuite cliquer sur l'emplacement souhaité en faisant en déplaçant la souris legèrement dans une direction, par défaut couleur noire!");
        colorParent('text','pencil','bucket','eraser');
        divPanel.style.display="block";
        return draw = 'text';
    });

    document.getElementById('pencil').addEventListener('click',function(e){
        showPanel();
        newMsg("Veuillez choisir une couleur pour commencer à dessiner, par défault couleur noir");
        colorParent('pencil','text','bucket','eraser');
        myCanvas.style.cursor='url(../images/pencil2.png) 0 16,auto';
        divPanel.style.display="block";
        return draw = 'pencil';
    });

    document.getElementById('bucket').addEventListener('click',function(evt){
        showPanel();
        newMsg("Veuillez choisir une couleur pour commencer à dessiner, remplissage circulaire,par défault couleur noir");
        colorParent('bucket','pencil','text','eraser');
        myCanvas.style.cursor='url(../images/fill.png) 0 16, auto';
        divPanel.style.display="block";
        //pen.strokeStyle = myCanvas.style.backgroundColor;
        return draw = "bucket";
    });

    document.querySelector('#eraser').addEventListener('click',function(){
        divPanel.style.display='none';
        myCanvas.style.cursor = 'url(../images/eraser2.png) 0 16, auto';
        newMsg("Gommage en cours, attention la gomme utilise le remplissage du dernier outil(crayon => gommage linéaire, pot => gommage circulaire et texte => gommage désactivé)");
        colorParent('eraser','pencil','text','bucket');
        return eraser=true;
    });

    document.getElementById('dimension').addEventListener('change', function(evt){
        var result = confirm('Attention si vous changez de dimension en cours de travail, votre dessin ne sera pas conservé si vous ne l\'avait pas sauvegardé au préalable');
        if(result){
            switch(evt.target.value){
                case 'xSmall':
                    myCanvas.setAttribute('width',300);
                    myCanvas.setAttribute('height',300);
                break;
                case 'small':
                    myCanvas.setAttribute('width',600);
                    myCanvas.setAttribute('height',600);
                break;
                case 'medium':
                    myCanvas.setAttribute('width',800);
                    myCanvas.setAttribute('height',800);
                break;
                case 'large':
                    myCanvas.setAttribute('width',1000);
                    myCanvas.setAttribute('height',1000);
                break;
                case 'xLarge':
                    myCanvas.setAttribute('width',1200);
                    myCanvas.setAttribute('height',1200);
                break;
                default:
                    myCanvas.setAttribute('width',400);
                    myCanvas.setAttribute('height',300);
            }
        }
    });

    function getColor(evt){
        var colorUse ='Couleur en cours d\'utilisation : ' + '<span style = "padding:5px 13.5px; margin:0px 5px;border-radius:4px;border:1px solid black;background:' + evt.target.style.backgroundColor + ';"></span>'; 
        return colorUse;
    }

    function createPanel(){
        for(var i=0; i<19; i++){
            var span = document.createElement('span');
            span.addEventListener('click',function(evt){
                if(evt.type=='click'){
                    pen.strokeStyle = evt.target.style.backgroundColor;
                    pen.fillStyle = evt.target.style.backgroundColor;
                    msg.innerHTML ="";
                    msg.innerHTML = getColor(evt);
                   
                }
            });

            function myColor(){
            var colorRgb =  Math.floor((Math.random() * 256)) + ',' +  Math.floor((Math.random() * 256)) + ',' +  Math.floor((Math.random() * 256)) ;  
            return colorRgb ;
            }

            span.style.backgroundColor ='rgb(' + myColor() + ')';
            divPanel.appendChild(span);
        }
    }

    createPanel();

    document.getElementById('back').addEventListener('change',function(e){
        switch(e.target.value){
            case 'red':
                myCanvas.style.backgroundColor = 'rgb(237,28,36)';
            break;
            case 'purple':
                myCanvas.style.backgroundColor = 'rgb(50,28,146)';
            break;
            case 'green':
                myCanvas.style.backgroundColor = 'rgb(77,188,36)';
            break;
            case 'orange':
                myCanvas.style.backgroundColor = 'rgb(245,108,36)';
            break;
            case 'gray':
                myCanvas.style.backgroundColor = 'rgb(80,80,80)';
            break;
            case 'white':
                myCanvas.style.backgroundColor = 'rgb(255,255,255)';
            break;
        }
    });


    document.getElementById('erase').addEventListener('click',function(){
        pen.clearRect(0,0,myCanvas.width, myCanvas.height);
    });


    myCanvas.addEventListener('mousedown',function(evt){
        enCours=true;// Activ mode Drawing
        pen.beginPath();
        pen.moveTo(evt.offsetX,evt.offsetY);
    });

    myCanvas.addEventListener('mousemove',function(e){
        if(enCours){
            if(draw == 'text'){
                showPanel();
                    newMsg("Pour resaisir du texte, cliquez à nouveau sur l'outil texte");
                pen.fillText(prompt(saisirText), e.offsetX,e.offsetY);
                pen.fill();
                draw = null;   
            }
            /*else if(draw == 'figuresGeo'){
                switch(e.target.value){
                    case 'rectangle':
                        pen.fillRect(e.offsetX,e.offsetY,150,100);
                    break;
                    case 'carree':
                        pen.fillRect(e.offsetX,e.offsetY,150,150);
                    break;
                    case 'arcCercle':
                        pen.arc(e.offsetX,e.offsetY,50,0,Math.PI);
                    break;
                    case 'cercle':
                        pen.arc(e.offsetX,e.offsetY,50,0,2*Math.PI);
                    break;
                }
                return eraser = false;
            }*/
            else if(draw == 'bucket'){
                if(eraser == true){
                    pen.fillStyle = myCanvas.style.backgroundColor;
                    pen.lineTo(e.offsetX,e.offsetY);
                    pen.stroke();
                    return eraser = false;
                }
                else{
                    pen.lineTo(e.offsetX,e.offsetY);
                    pen.fill();
                }   
            }
            else if(draw == 'pencil'){
                if(eraser == true){
                    pen.strokeStyle = myCanvas.style.backgroundColor;
                    pen.lineTo(e.offsetX,e.offsetY);
                    pen.stroke();
                    return eraser = false;
                }
                else{
                    pen.lineTo(e.offsetX,e.offsetY);
                    pen.stroke();              
                }
            }
        }
    });

    myCanvas.addEventListener('mouseup',function(){
        enCours = false; //  Cancel drawing mode
        pen.closePath();
    });

    myCanvas.addEventListener('mouseout',function(){
        enCours = false;
    });

    document.getElementById('penWeight').addEventListener('change',function(e){
        pen.lineWidth = e.target.value;
        newMsg(' Taille du stylot : ' + e.target.value + 'px');
    });

    document.getElementById('renew').addEventListener('click',function(e){if(!hidePanel){
        divPanel.innerHTML="";
        createPanel();
        }
        else{
            e.preventDefault();
            newMsg("Veuillez cliquer sur l'outil crayon ou Pot de peinture pour faire apparaitre la palette de couleur et recliquez sur le bouton 'Nouvelle Palette'</span>");
        }
        
    });

    document.getElementById('save').addEventListener('click',function(){
        var nomDessin = prompt('Nom du dessin à sauvegarder ', 'nom_dessin');
        if(nomDessin){
            localStorage.setItem(nomDessin, myCanvas.toDataURL());
            alert('Image du nom : ' + nomDessin + ' a été sauvé');
        }
    });

    document.getElementById('read').addEventListener('click',function(){
            var dessin_charger = prompt('Nom du dessin à ouvrir','mon_dessin');
            var img = new Image;
            img.onload = function(){
                pen.drawImage(img, 0, 0);
            };

            img.src = localStorage.getItem(dessin_charger);
    });

})();