var fonts;
var h1Elements;
var socket;
var messages;
var field;
var sendButton;
var content;
var header;


// function getRandomFont() {
//         var randomNumber = Math.floor(Math.random()*(fonts.length));
//         // console.log(fonts[randomNumber]);
//         return fonts[randomNumber];
//     }


function change(a, type) {
        // var randomFont = getRandomFont();
        var currentFont = a.innerHTML;
        // console.log("type " + type);
        if(type=="header"){
            // console.log("current " + currentFont);
            for(h in h1Elements) {
                if(h1Elements[h] instanceof Element) {
                    h1Elements[h].style.fontFamily=currentFont;
                }
            }
        }
        if(type=="header2"){
            // console.log("current " + currentFont);
            for(h in h2Elements) {
                if(h2Elements[h] instanceof Element) {
                    h2Elements[h].style.fontFamily=currentFont;
                }
            }
        }
        if(type=="para"){
            // console.log("para only");
            // console.log("pElements " + pElements[0]);
            for(p in pElements){
                if(pElements[p] instanceof Element) {
                    console.log(p);
                    pElements[p].style.fontFamily=currentFont;
                }
            }
        }
        
        
        socket.emit('div-change', { currentFont: currentFont, type: type });
    }

/*
*generates all fonts
*header
*p
*/
function generateFonts(){
        for(font in fonts){
            var a = document.createElement('a');
            var aText = document.createTextNode(fonts[font]);
            a.appendChild(aText);
            a.href = "#";
            a.setAttribute('onclick', 'change(this, "header");');
            header.appendChild(a);
        }
        for(font in fonts){
            var a = document.createElement('a');
            var aText = document.createTextNode(fonts[font]);
            a.appendChild(aText);
            a.href = "#";
            a.setAttribute('onclick', 'change(this, "header2");');
            header2.appendChild(a);
        }
        for(font in fonts){
            var b = document.createElement('a');
            var bText = document.createTextNode(fonts[font]);
            b.appendChild(bText);
            b.href = "#";
            b.setAttribute('onclick', 'change(this, "para");');
            para.appendChild(b);
        }
    }
 


window.onload = function() {
 
    messages = [];
    socket = io.connect('10.24.25.63:3700');
    field = document.getElementById("field");
    sendButton = document.getElementById("send");
    content = document.getElementById("content");
    fonts=['Montserrat', 'Georgia', "Times New Roman"];
    h1Elements=document.querySelectorAll('h1');
    h2Elements=document.querySelectorAll('h2');
    pElements=document.querySelectorAll('p');
    header=document.getElementById("header");
    header2=document.getElementById("header2");
    para=document.getElementById("para");

    generateFonts();
   
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    socket.on('div-change', function (data) {
        // console.log(data.currentFont);
        console.log(data.type);
        if(data.type=="header"){
             for(h in h1Elements) {
                if(h1Elements[h] instanceof Element) {
                    h1Elements[h].style.fontFamily=data.currentFont;
                }
            }
        }
        if(data.type=="header2"){
             for(h in h2Elements) {
                if(h2Elements[h] instanceof Element) {
                    h2Elements[h].style.fontFamily=data.currentFont;
                }
            }
        }
        if(data.type=="para"){
            for(p in pElements) {
                if(pElements[p] instanceof Element) {
                    pElements[p].style.fontFamily=data.currentFont;
                }
            }
        }
           
    });


    //returns a random font
    sendButton.onclick = function() {
        console.log(sendButton);
        var text = field.value;
        socket.emit('send', { message: text });
        field.value="";
    };



    
        //header font has to change
}
