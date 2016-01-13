/* global CryptoJS */

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

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function day1a(text) {
    var result = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] === "(") result++;
        else result--;
    }
    return result;
}


function day1b(text) {
    var result = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] === "(") result++;
        else result--;
        if (result === -1) break;
    }
    return i + 1;
}

function day2a(text) {
    var result = 0;
    var lines = text.split('\n');
    var arr = new Array(3);
    var line;

    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        // console.log(line);
        arr = line.split('x');

        result += 2 * (arr[0] * arr[1] + arr[1] * arr[2] + arr[0] * arr[2]);
        result += Math.min(arr[0] * arr[1], arr[1] * arr[2], arr[0] * arr[2]);
    }
    return result;
}


function day2b(text) {
    var result = 0;
    var lines = text.split('\n');
    var arr = new Array(3);
    var ribbon, bow;
    for (var i = 0; i < lines.length; i++) {
        arr = lines[i].split('x').sort(function (a, b) { return a - b; });
        // console.log(arr[0] + "," + arr[1] + "," + arr[2]);
        ribbon = 2 * arr[0] + 2 * arr[1];
        // console.log(ribbon);
        bow = arr[0] * arr[1] * arr[2];
        // console.log(bow);
        result += (ribbon + bow);
    }
    return result;
}

function day3a(text) {
    var result = 0;
    // var lines = text.split('\n');
    
    var map = createArray(999, 999);

    for (var temp = 0; temp < 999; temp++)
        for (var temp2 = 0; temp2 < 999; temp2++)
            map[temp][temp2] = 0;

    var i = 499, j = 499;
    map[i][j]++;
    for (var h = 0; h < text.length; h++) {
        switch (text[h]) {
            case '>':
                map[i][++j]++;
                break;
            case '<':
                map[i][--j]++;
                break;
            case 'v':
                map[++i][j]++;
                break;
            case '^':
                map[--i][j]++;
                break;
        }
    }

    for (temp = 0; temp < 999; temp++)
        for (temp2 = 0; temp2 < 999; temp2++)
            if (map[temp][temp2] > 0) result++;

    return result;
}


function day3b(text) {
    var result = 0;
    // var lines = text.split('\n');
    
    var map = createArray(999, 999);
    
    // var map = new Array(999);
    // for(var temp = 0; temp < 1000; temp++)
    //     map[temp] = new Array(999);
        
    for (var temp = 0; temp < 999; temp++)
        for (var temp2 = 0; temp2 < 999; temp2++)
            map[temp][temp2] = 0;

    var i = 499, j = 499;
    var x = 499, y = 499;
    map[i][j]++;
    for (var h = 0; h < text.length; h += 2) {
        switch (text[h]) {
            case '>':
                map[i][++j]++;
                break;
            case '<':
                map[i][--j]++;
                break;
            case 'v':
                map[++i][j]++;
                break;
            case '^':
                map[--i][j]++;
                break;
        }
        switch (text[h + 1]) {
            case '>':
                map[x][++y]++;
                break;
            case '<':
                map[x][--y]++;
                break;
            case 'v':
                map[++x][y]++;
                break;
            case '^':
                map[--x][y]++;
                break;
        }
    }

    for (temp = 0; temp < 999; temp++)
        for (temp2 = 0; temp2 < 999; temp2++)
            if (map[temp][temp2] > 0) result++;

    return result;
}

function day4a(text) {
    var i = 100000;
    var temp = "";
    while (true) {
        temp = text.concat(i);
        temp = String(CryptoJS.MD5(temp));
        if (temp.match(/^00000/gi)) break;
        else i++;
    }
    return i;
}
function day4b(text) {
    var i = 100000;
    var temp = "";
    while (true) {
        temp = text.concat(i);
        temp = String(CryptoJS.MD5(temp));
        if (temp.match(/^000000/gi)) break;
        else i++;
    }
    return i;
}


window.onload = function () {

    var fileUrl = "input.txt";
    var text = "";
    text = readTextFile(fileUrl);
    // document.getElementById("output").innerHTML = day4b(text).toString();
    // alert(CryptoJS.MD5("pqrstuv1048970"));

};