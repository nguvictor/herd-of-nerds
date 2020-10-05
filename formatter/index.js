'use strict';

const fs = require('fs');
const path = require('path');

//let rawdata = fs.readFileSync('student.json');
//let student = JSON.parse(rawdata);
//console.log(student);
//Read folder name
//Iterate file and out put file format
//array of messages

function processChat(files,channelName){
    fs.appendFileSync('chatlog.txt', '#'+channelName + '\n', function (err) {
        if (err) return console.log(err);
    });

    files.forEach(function(messages){
        //grab message
        //write to file
        //console.log(messages);
        messages.forEach(function(message){
            if(message.user_profile != null)
                fs.appendFileSync('chatlog.txt', message.user_profile.name + ': '+ message.text + '\n', function (err) {
                    if (err) return console.log(err);
                });
        });
        
    });
    //console.log(file[0].user_profile);
}

function readDirectory(folderName){
    const directoryPath = path.join(__dirname, folderName);
    //passsing directoryPath and callback function
    const files = fs.readdirSync(directoryPath);
    return files;
}

const channels = readDirectory('history');
const chats = [];
channels.forEach(function (channel) {
    if(!channel.includes('.json'))
    {
        const chats = readDirectory('history/'+channel);
        const channelChat = []
        //read the chat file
        chats.forEach(function(chatPath){
            const filePath = path.join(__dirname,'history/'+channel+'/'+chatPath);
            //console.log(path.join(__dirname,'history/'+channel+'/'+chatPath));
            const chat = fs.readFileSync(filePath,{encoding:'utf8', flag:'r'});
            channelChat.push(JSON.parse(chat));
        });
        //console.log(channelChat);
        processChat(channelChat,channel);
        chats.push(chats);
    }
});

//console.log(chats);
/*
, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
            files.push(file);
            //console.log(directories);
        });
        //console.log(files);
        
    }
*/