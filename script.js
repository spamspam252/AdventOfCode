function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var temp = "";
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                var allText = rawFile.responseText;
                temp = allText;
            }
        }
    };
    rawFile.send(null);
    return temp;
}

function day1a(text){
    var result = 0;
    for(var i = 0; i < text.length; i ++){
        if(text[i] === "(") result++;
        else result--;
    }
    return result;
}


function day1b(text){
    var result = 0;
    for(var i = 0; i < text.length; i++){
        if(text[i] === "(") result++;
        else result--;
        if(result === -1) break;
    }
    // alert(i);
    return i+1;
}


window.onload = function(){
    var fileUrl = "input.txt";
    var text =  "";
    text = readTextFile(fileUrl);
    document.getElementById("output").innerHTML = day1b(text).toString(); 
};