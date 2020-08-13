const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "root ";
let _helper = require("discord_helper");
const helper = new _helper(client);
const pred = "639442965571436544";

client.on('ready', () => {
    console.log('Bot has been summoned');
    helper.setPrefix(["root ", "."]);
    helper.registerCommand(["ping"],function(message = new discord.Message(), args = []) {
        let before = Date.now()
        message.channel.send("Performing ping...").then(msgSent => {
            msgSent.edit(`Done!\nOperation timeout: ${Date.now()-before}ms\nPing to Discord: ${client.ws.ping}ms.`)
})
      })
    
    helper.registerCommand(["ban"],function(message = new discord.message(), args = []) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You do not have sufficient permissions to perform this command.");
        let member = message.mentions.members.first()||message.guild.members.resolve(args[0])
        if (!member) return message.reply("Please mention someone or give me their ID.")
        let reason = "No reason"
        if (args.slice(1)[0]) reason = args.slice(1).join(" ")
        member.ban({reason: `Banned by ${message.author.tag} | ${reason}`})
        message.channel.send("Banned that skid.")
    })

    helper.registerCommand(["kick"],function(message = new discord.message(), args = []) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You do not have sufficient permissions to perform this command.");
        let member = message.mentions.members.first()||message.guild.members.resolve(args[0])
        if (!member) return message.reply("Please mention someone or give me their ID.")
        let reason = "No reason"
        if (args.slice(1)[0]) reason = args.slice(1).join(" ")
        member.kick({reason: `Kicked by ${message.author.tag} | ${reason}`})
        message.channel.send("Kicked that skid.")
    })

    helper.registerCommand(["fuckyou"],function(message = new discord.message(), args = []) {
        message.channel.send("I cri now ;(")
    })

    helper.registerCommand(["loveyou"],function(message = new discord.message(), args = []) {
        message.channel.send("Love you too :heart:")
    })

    helper.registerCommand(["avatar", "av"],function(message = new discord.message(), args = []) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
    
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    })

    helper.registerCommand(["succ"],function(message = new discord.message(), args = []) {
        message.channel.send("https://media1.tenor.com/images/66c06bddaa7b5ab1807387e95302542e/tenor.gif?itemid=13172811")
    })

    helper.registerCommand(["say"],function(message = new discord.message(), args = []) {
        let MSG = args.join(" ")
        if(!MSG)return message.channel.send("You did not type anything to say.")
        while(MSG.toLowerCase().includes("@everyone") || MSG.toLowerCase().includes("@here")) {
          MSG = MSG.replace("@everyone","haha no.").replace("@here","haha no.")
        }
        message.channel.send(MSG)
        message.delete()
    });
    
    helper.registerCommand(["eval"],function(message = new discord.message(), args = []) {
        if (message.author.id != pred) return message.reply("haha no.")
        let cmd = args.join(" ")
        try {
            let result = eval(cmd)
            message.reply("Done! Result: `"+result+"`")
        } catch (err) {
            message.reply("Failed to run command. Stacktrace:\n"+err.toString().split("\n").join("\n  "))
}
    })
    
    helper.registerCommand(["clear", "purge"],function(message = new discord.message(), args = []) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have sufficient permissions to perform the command.");
        if(!args[0]) return message.channel.send("You have to specify a number of messages to delete.")
        message.channel.bulkDelete(args[0])
    });
    helper.registerCommand(["help"],function(message = new discord.message(), args = []) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Commands")
            .setAuthor(message.author.username)
            .setFooter("Help me")
            .setColor('#00AAFF')
            .addFields({
                name: "***Moderation Commands***",
                value: "Moderate your server."
            })
            .addFields({
                name: "ban",
                value : "Bans a user. Usage: ``root ban {user}``"
            })
            .addFields({
                name: "kick",
                value: "Kicks a user. Usage: ``root kick {user}``"
            })
            .addFields({
                name: "purge",
                value: "purges messages. Usage: ``root purge {number}``"
            })
            .addFields({
                name: "***Fun/Utility Commands***",
                value: "Useful.. sometimes..."
            })
            .addFields({
                name: "succ",
                value: "FBI OPEN UP"
            })
            .addFields({
                name: "loveyou",
                value: "Love the bot."
            })
            .addFields({
                name: "fuckyou",
                value: "Insult the bot (dont >:( )"
            })
            .addFields({
                name: "say",
                value: "Make the bot say something."
            })
            .addFields({
                name: "ping",
                value: "Check the bots latency."
            })
            .addFields({
                name: "av/avatar",
                value: "Get the avatar of a user."
            })
        message.author.send(embed)
    });
    helper.registerCommand(["ddos"],function(message = new discord.message(), args = []) {})

});
client.login(process.env.DISCORD_TOKEN)
