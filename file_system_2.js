#!/usr/bin/env node

let fs = require("fs");
// for input...
let inputArr = process.argv.slice(2);

let optionArr = [];
let fileArr = [];

/// for option identification

for(let i = 0; i < inputArr.length; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionArr.push(inputArr[i]);
    }

    else {
        fileArr.push(inputArr[i]);
    }
}
let isBothPresent = optionArr.includes("-b")&& optionArr.includes("-n");
if(isBothPresent){
    console.log("-n & -b both should not present");
    return;
}

//if the file not exist
for(let i = 0; i < fileArr.length; i++){
    if(fs.existsSync(fileArr[i]) == false){
        console.log(`${fileArr[i]} is not present`);
        return;
    }
}
// for reading content
let content = "";
for(let i = 0; i < fileArr.length; i++){
    let bufferContent = fs.readFileSync(fileArr[i]);
    content+=bufferContent+"\r\n";
}

let  contentArr = content.split("\r\n");

let isPresent = optionArr.includes("-s");
if(isPresent == true){
    for(let i = 1; i < contentArr.length; i++){
        if(contentArr[i] == ""&& contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        else if(contentArr[i] == ""&& contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }

// console.log(contentArr);

    let tempArr = []
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }

    }

    contentArr = tempArr;



//     console.log("`````````````````");
//     console.log(contentArr.join("\n"));
 }


let isNPresent = optionArr.includes("-n");

if(isNPresent == true){
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}

// console.log(contentArr.join("\n"));

let isBPresent = optionArr.includes("-b");

if(isBPresent == true){
    let counter = 1;
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i]!=""){
        contentArr[i] = `${counter} ${contentArr[i]}`;
        counter++;
        }
    }
}

console.log(contentArr.join("\n"));

// for keeping global npm init -y