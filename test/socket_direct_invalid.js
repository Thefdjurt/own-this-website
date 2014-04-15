// NOTE: We'll have to make new socket connections to avoid disconnecting

var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:8000';

var namesBadType = [4, undefined, null, {}, [], new Error]; // will the error work?
var namesBadLength = ['13 CHARACTERS', 'BROKENWHEELBARROW', 'F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905F3EDF440E76CA97E78D7BAF527D9ADA4C25AAAEC1A0262C4273461AAD0C85905'];
var nameBadCaps = 'aLt CaPs';
var nameCurrentKing = 'NOBODY';

// send too fast

var options ={
  transports: ['websocket'],
  'force new connection': true
};

describe("Chat Server",function(){

});

it('Should log an error when non-string names are passed', function(done){
  var client1 = io.connect(socketURL, options);

  client1.on('connect', function(data){
    client1.emit('connection name', chatUser1);

    /* Since first client is connected, we connect
    the second client. */
    var client2 = io.connect(socketURL, options);

    client2.on('connect', function(data){
      client2.emit('connection name', chatUser2);
    });

    client2.on('new user', function(usersName){
      usersName.should.equal(chatUser2.name + " has joined.");
      client2.disconnect();
    });

  });

  var numUsers = 0;
  client1.on('new user', function(usersName){
    numUsers += 1;

    if(numUsers === 2){
      usersName.should.equal(chatUser2.name + " has joined.");
      client1.disconnect();
      done();
    }
  });
});

// For each, check messages and returns

// TODO: Test disconnects
