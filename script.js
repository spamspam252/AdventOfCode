function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var temp = "";
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
                temp = allText;
            }
        }
    };
    rawFile.send(null);
    return temp;
}

// function day1a(text) {
//     var result = 0;
//     for (var i = 0; i < text.length; i++) {
//         if (text[i] === "(") result++;
//         else result--;
//     }
//     return result;
// }


// function day1b(text) {
//     var result = 0;
//     for (var i = 0; i < text.length; i++) {
//         if (text[i] === "(") result++;
//         else result--;
//         if (result === -1) break;
//     }
//     return i + 1;
// }

function day2a(text) {
    var result = 0;
    var lines = text.split('\n');
    var arr = new Array(3);
    var line;
    
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        // console.log(line);
        arr = line.split("x");
        
        result += 2 * (arr[0] * arr[1] + arr[1] * arr[2] + arr[0] * arr[2]);
        result+= Math.min(arr[0] * arr[1],arr[1] * arr[2],arr[0] * arr[2]);
    }
    return result;
}


function day2b(text){
    var result = 0;
    var lines = text.split('\n');
    var arr = new Array(3);
    var ribbon, bow;
    for(var i = 0; i < lines.length; i++){
        arr = lines[i].split('x').sort(function(a, b){return a-b});
        console.log(arr[0] + "," + arr[1] + "," + arr[2]);
        ribbon = 2 * arr[0] + 2*arr[1];
        console.log(ribbon);
        bow = arr[0]*arr[1]*arr[2];
        console.log(bow);
        result += (ribbon + bow);
    }
    return result;
}

window.onload = function () {
    var fileUrl = "input.txt";
    var text = "";
    text = readTextFile(fileUrl);
    document.getElementById("output").innerHTML = day2b(text).toString();
};