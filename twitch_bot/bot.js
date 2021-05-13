const tmi = require('tmi.js');
const fs = require('fs');


// Define configuration options
const opts = {
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'thebottomlessteamug',
        password: 'oauth:cc5xmx935scxsjoqnpsrazfxe7biwn'
    },
    channels: [
        'thematchyman'
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

//Dice Roll
function rollDice() {
    const sides = 6;
    result = Math.floor(Math.random() * sides) + 1;
    return `You rolled a ${result}`;
}

// 8 Ball Function
function ball() {
    const sides = 8;
    const result = Math.floor(Math.random() * sides) + 1;

    switch (result) {
        case 1:
            return 'As I see it, yes';
            break
        case 2:
            return 'Ask again later'
            break
        case 3:
            return 'Better not tell you now';
            break
        case 4:
            return 'Cannot predict now';
            break
        case 5:
            return 'Concentrate and ask again';
            break
        case 6:
            return 'Dont count on it';
            break
        case 7:
            return 'It is certain';
            break
        case 8:
            return 'It is decidedly so';
            break
        default:
            return result;

    }
}

//Shoutout message
function shoutout(msg) {
    result = msg.slice(4, msg.length);
    return `Hey you, go checkout @${result} at www.twitch.tv/${result}`;
}

//Crying Message
function icri() {
    return "i cri inside everytime too"
}
//Stat Roller for DnD 
function dndstatroller() {
    results = []
    while (results.length < 6) {
        x = Math.floor(Math.random() * 18) + 1;
        if (x > 8) {
            results.push(x);
        }
    }
    return results;
}

function nameRandomiser() {
    try {
        const first_names = fs.readFileSync('first_names.txt', 'utf8').split('\n')
        const last_names = fs.readFileSync('last_names.txt', 'utf8').split('\n')
        x = Math.floor(Math.random() * first_names.length + 1)
        y = Math.floor(Math.random() * last_names.length + 1)
        return `Random Name: ${first_names[x]} ${last_names[y]}`

    } catch (err) {
        console.error(err)
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}



///This is for commands
client.on('message', (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'echo') {
        client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
    }
    //8 Ball command
    if (command === 'ball') {
        client.say(channel, `@${tags.username}, ${ball()}`);
    }
    //I cri everytime
    if (command === 'cry') {
        client.say(channel, icri());
    }
    //Dice command
    if (command === 'dice') {
        client.say(channel, rollDice());
    }
    //Shoutout Command
    if (command === 'so' && tags.mod == true) {
        client.say(channel, shoutout(message));
    }
    if (command === 'dnd') {
        result = dndstatroller()
        stats = ["Dex", "Str", "Con", "Wis", "Cha", "Int"]
        toSay = `Results: `
        for (i = 0; i < results.length; i++) {
            toSay = toSay + `${stats[i]}: ${result[i]}, `
        }
        //console.log(toSay);
        client.say(channel, toSay);
    }
    if (command === 'name') {
        client.say(channel, nameRandomiser())
    }
});



// Other random things
client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if (self) return;

    if (message.toLowerCase() === '!hello') {
        // "@alca, heya!"
        client.say(channel, `@${tags.username}, heya!`);
    }
});















// Follower to channel
client.on("follower", (channel, username) => {
    client.say(channel, `${username} Thanks for following!`)
});

// Sub to channel
client.on("subscription", (channel, username, method, message, userstate) => {
    client.say(channel, `${username} Thanks for subscribing, enjoy the tea and emotes matchy1Tea`);
});

//Resub to channel
client.on("resub", (channel, username, months, message, userstate, methods) => {
    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
    client.say(channel, `${username} Thanks for resubscribing for ${cumulativeMonths} months enjoy more tea`);
});
// Gifted sub to channel

client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    let senderCount = ~~userstate["msg-param-sender-count"];
    client.say(channel, `Thanks to ${username} for gifing a sub to ${recipient}, enjoy your tea and emotes`)
});

client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
    let senderCount = ~~userstate["msg-param-sender-count"];
    client.say(channel, `${username} has gifted ${numbOfSubs} to the channel, enjoy your tea and emotes`)
});
// Cheer to channel
client.on("cheer", (channel, userstate, message) => {
    client.say(channel, `${username} has cheered ${userstate.bits} Pog`)
});

// Host from user
client.on("hosted", (channel, username, viewers, autohost) => {
    client.say(channel, `${username} has hosted the channel for ${viewers} grab yourself a cup of tea and enjoy the stream`);
});

// Raid from user
client.on("raided", (channel, username, viewers) => {
    client.say(channel, `${username} is raiding the channel with ${viewers} viewers, the kettle has boiled plenty of tea for everone!`);
    client.say(channel, `Go follow ${username} at twitch.tv/${username}`);
});

// Continuing gift sub recieved
client.on("anongiftpaidupgrade", (channel, username, userstate) => {
    client.say(channel, `${username} is continuing their sub to the channel, Thank you very much`);
});