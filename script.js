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
        if (text[i] === '(') result++;
        else result--;
    }
    
    
    return result;
}


function day1b(text) {
    var result = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] === '(') result++;
        else result--;
        if (result === -1) break;
    }
    return i + 1;
}

function day2a(text) {
    function parseSize(line){
        var size = line.split('x');
        return {
            l: size[0],
            w: size[1],
            h: size[2],
        };
    }
    
    function cal(size){
        return{
            paper: 2 * (size.l * size.w + size.w * size.h + size.h * size.l),
            slack: Math.min(size.l*size.w, size.w*size.h, size.h*size.l),
            f : function(){
                return this.paper + this.slack;
            }
        }
    }
    
    var result = text.split('\n')
    .map(parseSize)
    .map(cal) 
    .reduce(function(inital,current){
        return inital + current.f();
        } 
    ,0);

    return result;
}


function day2b(text) {

    function parseSize(line){
        var size = line.split('x').sort(function(a,b){return a-b;});
        return {
            l: size[0],
            w: size[1],
            h: size[2],
        };
    }
    
    function cal(size){
        return{
            ribbon : 2 * size.l + 2 * size.w,
            bow : size.l * size.w * size.h,
            f : function(){
                return this.ribbon + this.bow;
            }
        }
    }
    
    var result = text.split('\n')
    .map(parseSize)
    .map(cal) 
    .reduce(function(inital,current){
        return inital + current.f(); // inital la tong
        } 
    ,0); // tong bat dau tu 0
    return result;
}

function day3a(text) {
function calc(supplierCnt) {
    var supplier = {},
        turnOrder = 0,
        houses = {
            '0:0': 0
        }

    // Prepare X suppliers
    for (var idx=0; idx < supplierCnt; idx++) {
        supplier[idx] = {
            x: 0,
            y: 0
        }
        // Every Supplier drops 1 gift at 0,0
        houses['0:0']++;
    }

    // Iterate over moveset and change x/y-coordinates of supplier X 
    for (var i=0; i<text.length; i++) {
        switch (text[i]) {
            case '^':
                supplier[turnOrder].y++;
            break;
            case '>':
                supplier[turnOrder].x++;
            break;
            case 'v':
                supplier[turnOrder].y--;
            break;
            case '<':
                supplier[turnOrder].x--;
            break;
        }

        // Unique index identifier
        var index = supplier[turnOrder].x+':'+supplier[turnOrder].y;
        houses[index] ? houses[index]++ : houses[index] = 1;

        // Increment or reset turnOrder for multi-supplier support
        turnOrder = ( turnOrder == Object.keys(supplier).length-1 ? 0 : turnOrder+1 );
    }
    return Object.keys(houses).length;
}
   
    return calc(1);
}


function day3b(text) {
    var result = 0;
    var map = createArray(999, 999);

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
    var i = 0;
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
    var i = 0;
    var temp = "";
    while (true) {
        temp = text.concat(i);
        temp = String(CryptoJS.MD5(temp));
        if (temp.match(/^000000/gi)) break;
        else i++;
    }
    return i;
}

function day5a(text) {
    // var temp = "ugknbfddgicrmopn";
    // console.log(temp.match(/(a|e|i|o|u)/g).length);
    var result = 0;
    // console.log(text);
    function aeiou(text) {
        // console.log("1 check");
        if (text.match(/(a|e|i|o|u)/g) != null)
            return text.match(/(a|e|i|o|u)/g).length >= 3;
        else return false;
    }
    function duplicate(text) {
        // console.log("2 check");
        return Boolean(text.match(/([a-z])\1+/g));
    }
    function naulty(text) {
        // console.log("3 check");
        return Boolean(text.match(/ab|cd|pq|xy/g));
    }
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        if (aeiou(lines[i])
            && !naulty(lines[i])
            && duplicate(lines[i])
            )
            result++;
        // console.log(lines[i]);
        // console.log("aeiou:" + aeiou(lines[i]));
        // console.log("dup: " + duplicate(lines[i]));
        // console.log("!naulty: " + naulty(lines[i]));
    }
    return result;
}

function day5b(text) {
    var result = 0;
    function pair(text) {
        return Boolean(text.match(/([a-z]{2}).*\1+/));
    }
    function repeat(text) {
        return Boolean(text.match(/([a-z]).\1+/));
    }
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        if (
            pair(lines[i])
            && repeat(lines[i])
            )
            result++;
        // console.log(lines[i]);
        // console.log("pair: " + pair(lines[i]));
        // console.log("repeat: " + repeat(lines[i]));
    }
    return result;
}


function day6a(text){
    
function parseCommand(text) {
  var parsed = text.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);
  return { 
    action : parsed[1], 
    start : {x:Math.min(parsed[2],parsed[4]), y:Math.min(parsed[3],parsed[5])}, 
    end : {x:Math.max(parsed[2],parsed[4]), y:Math.max(parsed[3],parsed[5])} }
}

function applyCommand(grid, command) {
  for( var x=command.start.x; x<=command.end.x; x++ ) {
    for( var y=command.start.y; y<=command.end.y; y++ ) {
      if (grid[x] == undefined) grid[x] = [];
      if (grid[x][y] == undefined) grid[x][y] = false;
      switch(command.action) {
        case "turn on":
          grid[x][y] = true;
          break;
        case "turn off":
          grid[x][y] = false;
          break;
        case "toggle":
          grid[x][y] = !grid[x][y];
          break;
      }
      
    }
  }
  return grid;
}
    var input= text.split('\n').filter(function(l){return l.length>0});
    
    var count = input
    .map(parseCommand)
    .reduce(applyCommand, []) // them array rong la argument dau tien cua applyCommand
    .reduce(function(count,row){
        return count + row.filter(function(l){return l}).length}
        ,0); // gan 0 la gia tri ban dau cua count
    
    return count;

}


function day6b(text){
    
function parseCommand(text) {
  var parsed = text.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);
  return { 
        action : parsed[1], 
        start : { x: Math.min(parsed[2],parsed[4]), y:Math.min(parsed[3],parsed[5])}, 
        end : { x: Math.max(parsed[2],parsed[4]), y:Math.max(parsed[3],parsed[5])} 
    }
}
function applyCommand2(grid, command) {
  for( var x=command.start.x; x<=command.end.x; x++ ) {
    for( var y=command.start.y; y<=command.end.y; y++ ) {
      if (grid[x] == undefined) grid[x] = [];
      if (grid[x][y] == undefined) grid[x][y] = 0;
      switch(command.action) {
        case "turn on":
          grid[x][y] += 1;
          break;
        case "turn off":
          if( grid[x][y] > 0) grid[x][y] -= 1;
          break;
        case "toggle":
          grid[x][y] += 2;
          break;
      }
    }
  }

  return grid;
}
    var input= text.split('\n').filter(function(l){return l.length>0});
    
    var count = input
    .map(parseCommand)
    .reduce(applyCommand2, []) 
    .reduce(function(intensity,row){
        return intensity + row.reduce(function(intensity,col){
            return intensity + col
        },0)
    },0);
    
    return count;

}

window.onload = function () {

    var fileUrl = "input.txt";
    var text = "";
    text = readTextFile(fileUrl);
    document.getElementById("output").innerHTML = day3a(text).toString();
    
    // var temp = [1,4,2,3].map(function(x){
    //     return x +10;
    // });
    // console.log(temp);
};
    