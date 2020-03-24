const Discord = require('discord.js');
const client = new Discord.Client();

const mysql = require('mysql');
const googleTrends = require('google-trends-api');
const fs = require('fs');

client.commands = new Discord.Collection();

var mess = "";
var listeid = "";
var emot = "";

var monnaie = "𝕭𝖎𝖙𝖊𝕮𝖔𝖎𝖓"
var p4j = true


var voiceconnect = ""
/*
//commandes
fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});
*/

require('events').EventEmitter.prototype._maxListeners = 100;








/*client.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;
  
    if (message.content === '/join') {
      // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voiceChannel) {
            console.log(message.member.voiceChannel)
            const connection = await message.member.voiceChannel.join();
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
});*/







//help
//ping
client.on("message", message =>{

    if(message.content === '!ping'){
        let début = Date.now();
        message.channel.send('Ping')
        .then((m) => m.edit(`Pong : **${Date.now() - début}**ms`));
    }

    if(message.content === "!helps"){
        if(message.member.roles.find(r => r.name === "【🔧】• Membre - STAFF") ){

            var emb = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle(`Voici les commande à la disposition du staff`)
                .setAuthor('NekShor')

                .addBlankField()

                .setDescription('Si vous avez un problème mp moi @NekShor#9573.')
                
                .addField('!ping', `Sert à voir si le bot est connecté et à voir son ping.`)
                
                .addField('!clear', `Entrez \"!clear\" plus un nombre entre 1 et 100 et le bot vas supprimer les dernier messages du channels`)
                
                .addField('!warn', `Pour warn les gens qui le méritent Syntaxe : !warn [mentionne le membre] "[raison]" , "[précision si besoin]"`)
                                                
                .addField('!kick', `Pour kick les gens qui le méritent Syntaxe : !kick [mentionne le membre] "[raison]" , "[précision si besoin]"`)
                
                .addField('!ban', `Pour ban les gens qui ont été très vilains Syntaxe : !ban [mentionne le membre] "[raison]"`)
                
                .addField('!tempmute', `Pour mute temporairement (cette commande peux mal fonctionner par moments) Syntaxe : !tempmute [mentionne le membre] [temp(s pour seconde, m = minutes, h = heures, d = jours)]"[raison]"`)
                                
                .addField('!history ', `Pour voir l'historique des gens Syntaxe : !hisrory [mentionne le membre]`)
                                
            message.channel.send(emb)

            var emb = new Discord.RichEmbed()
                .setColor('#0099ff')
                                
                .addField('Detection du chat', `Le bot envoie un message dans #alerte lorsqu'il détecte des mots vulgaires", c'est au modérateur d'aller voir dans le channel si il y'a vraiment un problème.`)
 
                .addField('!pts', `Permet d'ajouter des points à une faction : !pts [Saphir|Rubis|Emeraude|Amethyste] [nombre]`)

                .addField('!chef', `Permet de changer le chef d'une faction : !chef [Saphir|Rubis|Emeraude|Amethyste] [mentionne un membre]`)

                .addField('!coef', `Permet de voir et de changer le coef d'un membre voir le coef : !coef [mentionne un membre]\nchanger le coef : !coef [mentionne un membre] [nombre]`)

                .addField('!give', `Permet de give de la monnaie à un membre : !give [mentionne un membre] [nombre]`)


                message.channel.send(emb)

        }else{
            message.channel.send("Tu n'a pas la permission de consulter ceci.");
        }
        
    }else if(message.content.startsWith('!help')){

        var emb = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`Voici les commande à la disposition du staff`)
            .setAuthor('NekShor')

            .addBlankField()

            .setDescription('Si vous avez un problème mp moi @NekShor#9573.')
                
            .addField('!ping', `Sert à voir si le bot est connecté et à voir son ping.`)
                
            .addField('!banque', `Permet de voir son compte en banque`)
                
            .addField('!pay', `Permet de donner de l'argent à un autre jour : !pay [mentionne un membre] [nombre]`)
                                                
            .addField('!history', `Permet de connaitre l'historique de ses sanctions.`)
                
            .addField('!faction', `Permet de connaitre le nombre de points de toutes les factions`)
                
            .addField('!ticket', `Si jamais vous avez un problème faites !ticket et exposez nous votre problème, une fois résolue faites !ticket close`)
                                
            .addField('!p4start ', `Sert à jouer au puissance 4 avec un amis : !p4start [mentionne un membre]\n pour jouer ajoutez des reaction au messages dans le channel apparue, pour quitter réagissez par la crois.`)


            message.channel.send(emb)

    }

})


let prefix = "!"



//my SQL
//Console
client.on("message", function (message) {

    if(message.content.startsWith('!pts')){
        if(message.member.roles.find(r => r.name === "【💻】• Développeur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){
        
            var div = message.content.split(' ')

            if(!div[1]){
                div[1] = ""
            }

            if(!div[2] || !parseInt(div[2])){
                div[2] = 0
            }

            console.log("PTS " + div[2])
            
            var fac = div[1]

            if(fac === "Saphir" || fac === "Rubis" || fac === "Emeraude" || fac === "Améthyste"){
                
                var sql = "SELECT * FROM faction WHERE nom = '" + fac + "'"

                var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'NekShor',
                    password : 'NekShor27',
                    database : 'NewNation',
                    multipleStatements: true
        
                });

                connection.query(
                    sql,
                        function select(error, results, fields) {
                        if (error) {
                            console.log("---2.2.63---" + error + "ERREUR 1");
        
                            connection.end();
                            return;
                        }
                            
                        if ( results.length > 0 )  { 
                            var firstResult = results[0]

                            var newpoints = parseInt(div[2]) + parseInt(firstResult['points'])

                            var sql = "UPDATE faction SET points = '" + newpoints + "' WHERE nom = '" + firstResult['nom'] + "'"
            
                            connection.query(
                                sql
                            )
                        } else {
                        
        
                        }
                        connection.end();
                    }
                );

            }else{
                message.channel.send('Veuillez sélectionner une factions')
            }

        }
    }

    else if(message.content.startsWith('!chef')){
        if(message.member.roles.find(r => r.name === "【💻】• Développeur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){
        
            var div = message.content.split(' ')

            if(!div[1]){
                div[1] = ""
            }

            var fac = div[1]

            var mem = message.mentions.members.first()

            if(fac === "Saphir" || fac === "Rubis" || fac === "Emeraude" || fac === "Améthyste"){
               
                if(mem){

                    var chef = ""

                    if(fac === "Saphir"){
                        var chef = "☄️⚜️Chef Saphir ⚜️☄️"
                    }else if(fac === "Rubis"){
                        var chef = "⚔️⚜️Chef Rubis⚜️⚔️"

                    }else if(fac === "Emeraude"){
                        var chef = "🏹⚜️Chef Emeraude⚜️🏹"

                    }else{
                        var chef = "🔪⚜️Chef Améthyste⚜️🔪"

                    }

                    const mute = message.guild.roles.find('name', chef);
                    mem.addRole(mute)

                    var sql = "SELECT * FROM faction WHERE nom = '" + fac +"'"

                    var connection = mysql.createConnection({
                        host     : 'localhost',
                        user     : 'NekShor',
                        password : 'NekShor27',
                        database : 'NewNation',
                        multipleStatements: true
            
                    });
                    connection.query(
                        sql,
                            function select(error, results, fields) {
                            if (error) {
                                console.log("---2.2---" + error + "ERREUR 1");
            
                                connection.end();
                                return;
                            }
                                
                            if ( results.length > 0 )  { 
                                var firstResult = results[ 0 ];

                                const list = client.guilds.get("684688751762472962"); 
                                var u = list.members.find('id', firstResult['chef'])

                                const mute = message.guild.roles.find('name', chef);

                                u.removeRole(mute)

                                var sql = "UPDATE faction SET chef = '" + mem.user.id + "' WHERE nom = '" + fac + "'"
                                connection.query(
                                    sql
                                )
                
                            } else {
                        
                            }
                            connection.end();
                        }
                    );

                }else{
                    message.channel.send('Veuillez mentionner le nouveau chef')
                }

            }else{
                message.channel.send('Veuillez sélectionner une factions')
            }
        }
    }

    if(message.content.startsWith('!coef')){
        if(message.member.roles.find(r => r.name === "【💻】• Développeur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){

            var mem = message.mentions.members.first()

            var div = message.content.split(' ')

            console.log(parseInt(div[2]) + ' COEF')

            if(div[2]){
                if(`${parseInt(div[2])}` === "NaN"){

                }else{
                    var neww = div[2]

                    var sql = "UPDATE monnaie SET coef = " + neww + " WHERE membre = " + mem.user.id + ""

                    var connection = mysql.createConnection({
                        host     : 'localhost',
                        user     : 'NekShor',
                        password : 'NekShor27',
                        database : 'NewNation',
                        multipleStatements: true
            
                    });

                    connection.query(sql, (err, res) => {
                        if(err) throw err;
                        console.log("----21--" + err)

                        console.log("---3---" + 'Last insert ID:', res.insertId);
                    });

                    
                }
            }else if(mem){
                var id = mem.user.id
                console.log(id)
                var sql = "SELECT * FROM monnaie WHERE membre = '" + id + "'"

                var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'NekShor',
                    password : 'NekShor27',
                    database : 'NewNation',
                    multipleStatements: true
        
                });

                
        
        
                connection.query(
                    sql,
                    function select(error, results, fields) {
                    if (error) {
                        console.log("---2.2---" + error + "ERREUR 1");
    
                        connection.end();
                        return;
                    }
                        
                    if ( results.length > 0 )  { 
                        var firstResult = results[ 0 ];
                        message.channel.send("Le coef du membre est de " + firstResult['coef'] );
    
        
                    } else {
                        var quer = "INSERT INTO monnaie(membre, valeur, rank, coef) VALUE (" + useree + ", 100000, 100, 1)"
        
                        connection.query(quer, (err, res) => {
                            if(err) throw err;
                            console.log("----21--" + err)
    
                            console.log("---3---" + 'Last insert ID:', res.insertId);
                        });
        
                        message.channel.send("Tu as 100000 " + monnaie)
    
    
                    }
                        connection.end();
                    }
                );
            }else{
                message.channel.send('Commande non valide.')
            }

        }
    }
    mess = message

    if(message.content.startsWith('!')){
        client.channels.get("686009970092802079").send("``` ** Commande ** \nAuteur : " + message.member.user.username + "\nMessage : " + message.content + "```")

    }

    if(message.member.user.id === "684763229582393345" && message.channel.id !== "686009970092802079"){
        client.channels.get("686009970092802079").send("``` ** Réponses ** \nMessage : " + message.content + "```")

    }

    if(message.content.startsWith("!banque")){

        if(message.member.roles.find(r => r.name === "【🔧】• Modérateur en test") || message.member.roles.find(r => r.name === "【🚨】• Modérateur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){
            var useree = message.author.id; 

            var mem = message.mentions.members.first()
            var toi = "Tu as "
            if(mem !== undefined){

                var usereee = `${mem}` 
                var useree = usereee.substr(2, 18)
                toi = mem.user.username
            }

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });
    
            
         
            connection.connect(err =>{
                if(err) throw err;
                console.log("----20--" + err)

            });
    
            var selectQuery = 'SELECT * FROM monnaie WHERE membre = ' + mem.id + '';
    
            connection.query(
                selectQuery,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");

                    connection.end();
                    return;
                }
                    
                if ( results.length > 0 )  { 
                    var firstResult = results[ 0 ];
                    message.channel.send(toi + " as " + firstResult['valeur'] + " " + monnaie);

    
                } else {
                    var quer = "INSERT INTO monnaie(membre, valeur, rank, coef) VALUE (" + useree + ", 100000, 100, 1)"
    
                    connection.query(quer, (err, res) => {
                        if(err) throw err;
                        console.log("----21--" + err)

                        console.log("---3---" + 'Last insert ID:', res.insertId);
                    });
    
                    message.channel.send("Tu as 100000 " + monnaie)


                }
                    connection.end();
                }
            );
            
    



        }else{
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'NekShor',
            password : 'NekShor27',
            database : 'NewNation',
            multipleStatements: true

        });

        const useree = message.author.id; 
        
     
        connection.connect(err =>{
            if(err) throw err;
            console.log("----22--" + err)


        });

        var selectQuery = 'SELECT * FROM monnaie WHERE membre = ' + useree + '';

        connection.query(
            selectQuery,
            function select(error, results, fields) {
            if (error) {
                console.log("---4---" + error + "ERREUR 1");

                connection.end();
                return;
            }
                
            if ( results.length > 0 )  { 
                var firstResult = results[ 0 ];
                message.channel.send("Tu as " + firstResult['valeur'] + " " + monnaie);
                

            } else {
                var quer = "INSERT INTO monnaie(membre, valeur, rank, coef) VALUE (" + useree + ", 100000, 100, 1)"

                connection.query(quer, (err, res) => {
                    if(err) throw err;
                    console.log("----23--" + err)

                    console.log("---5---" + 'Last insert ID:', res.insertId);
                });

                message.channel.send("Tu as 100000 " + monnaie)
            }
                connection.end();
            }
        );
        }

    }else

    if(message.content.startsWith('!pay')){
        var part = message.content.split(' ')

        var dest = part[1].substr(3, 18)
        var somme = part[2]
        var donneur = message.author.id

        if(somme >= 0){
        if(dest && somme && donneur && client.users.get(dest)){
            var pseu = client.users.get(dest).username

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true

            });
            
            
            var verif = 'SELECT * FROM monnaie WHERE membre = ' + donneur + '';

            connection.query(
                verif,
                function select(error, results, fields) {
                    if (error) {
                        console.log("---6---" + error + "ERREUR 2");

                        connection.end();
                        return;
                    }
                        
                    if ( results.length > 0 )  { 
                        var firstResult = results[ 0 ];
                        

                        if(parseInt(firstResult['valeur']) >= parseInt(somme)){

                            var dfinal = parseInt(firstResult['valeur']) - parseInt(somme)

                            var moins = 'UPDATE monnaie SET valeur = ' + dfinal + ' WHERE membre = ' + donneur + ''

                            connection.query(moins, function (err, result) {

                                console.log("---7---" + result.affectedRows + " record(s) updated");
                                
                            });



                        }else{
                            message.reply("Vous n'avez pas asser d'argent")
                            somme = 0;
                        }

                    } else {
                        var quer = "INSERT INTO monnaie(membre, valeur, rank, coef) VALUE (" + useree + ", 100000, 100, 1)"

                        connection.query(quer, (err, res) => {
                            if(err) throw err;
                            console.log("----24--" + err)

                            console.log("---8---" + 'Last insert ID:', res.insertId);
                        });

                        message.channel.send("Tu as 100000 " + monnaie)
                    }
                }
            );

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true

            });

            var verifDest = "SELECT * FROM monnaie WHERE membre = " + dest + ""

            connection.query(verifDest, function (err, result, fields) {
            if (err) {
                console.log("---9---" + error + "ERREUR 3");
                connection.end();
                return;
            }
                                        
            if ( result.length > 0 )  { 
                var firstResult2 = result[ 0 ];
                                        
                var rfinal = parseInt(firstResult2['valeur']) + parseInt(somme)

                var plus = 'UPDATE monnaie SET valeur = ' + rfinal + ' WHERE membre = ' + dest + ''

                connection.query(plus, function (err, result) {

                });

                message.channel.send("@" + message.author.username + " à donné " + parseInt(somme) + " " + monnaie + " à " + pseu)
                
            } else {
                var quer = "INSERT INTO monnaie(membre, valeur, rank, coef) VALUE (" + dest + ", " + (parseInt(somme) + 100000) + ", 100, 1)"
                
                connection.query(quer, (err, res) => {
                    if(err) throw err;
                    console.log("----25--" + err)

                    console.log("---10---" + 'Last insert ID:', res.insertId);
                });
                
            }
        });

        }else{
            message.channel.send('Il y à eu un problème veuillez rentrer la bonne commande')
        }

        }else{
            message.channel.send('Bien tenté, mais non.')
        }

    }else

    if(message.content.startsWith('!give')){

        if(message.member.roles.find(r => r.name === "【💻】• Développeur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur") || message.member.roles.find(r => r.name === "【🎉】Animateur")){

            var part = message.content.split(' ')

            var dest = part[1].substr(3, 18)
            var somme = part[2]
            if(dest && somme && client.users.get(dest)){
                var pseu = client.users.get(dest).username

                var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'NekShor',
                    password : 'NekShor27',
                    database : 'NewNation',
                    multipleStatements: true

                });
                
                var sommeFinal;

                var quer = 'SELECT * FROM monnaie WHERE membre = ' + dest

                connection.query(
                    quer,
                    function select(error, results, fields) {
                        if (error) {
                            console.log("---11---" + error + "ERREUR 2");
                            connection.end();
                            return;
                        }
                            
                        if ( results.length > 0 )  { 
                            var firstResult = results[ 0 ];
                            sommeFinal = firstResult['valeur']

                            var giv = parseInt(sommeFinal) + parseInt(somme)
                            var give = 'UPDATE monnaie SET valeur = ' + giv + ' WHERE membre = ' + dest + ''

                            message.channel.send(somme + " 𝕭𝖎𝖙𝖊𝕮𝖔𝖎𝖓 ont été donné à " + pseu)

                            connection.query(give, function (err, result) {
                                                
                            });
                        } else {
    
                            message.channel.send('Cette personne n\'a pas de compte')
                          
                        }
    
                    }
                );
            

            }
        }else{
            message.channel.send("Tu n'a pas la permission d'effectuer cette commande.")
        }
    }

})


client.on('nitroBoost', (booster) => {
    client.channels.get('684703366798245908').send(`${booster} boosted the server!`)
    booster.addRole(booster.guild.roles.find(a => a.name === '💎Booster💎'))
})






//history
client.on("message", function (message) {

    if(message.content.startsWith('**Puissance 4**')){

        message.react('❌')
        message.react('✅')


        var chan = message.channel.id
            var mess = message.id

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });


            var sql = "INSERT INTO cache(chan, mess) VALUES(" + chan + "," + mess + ")"

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.3.1---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if ( results.length > 0 )  { 
                    
                } else {
                    
                }
                    connection.end();
                }
            );
    
    }
    
    if(message.content.startsWith('**Puissance 4**')){
        if(message.channel.name.startsWith('puissance-4')){

            var time = 500

            setTimeout(() => {
                message.react('1️⃣')

            }, 0*time);
            setTimeout(() => {
                message.react('2️⃣')

            }, 1*time);
            setTimeout(() => {
                message.react('3️⃣')

            }, 2*time);
            setTimeout(() => {
                message.react('4️⃣')

            }, 3*time);
            setTimeout(() => {
                message.react('5️⃣')

            }, 4*time);
            setTimeout(() => {
                message.react('6️⃣')

            }, 5*time);
            setTimeout(() => {
                message.react('7️⃣')

            }, 6*time);
            setTimeout(() => {
                message.react('❌')

            }, 7*time);

            var chan = message.channel.id
            var mess = message.id

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });


            var sql = "INSERT INTO cache(chan, mess) VALUES(" + chan + "," + mess + ")"

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.3.1---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if ( results.length > 0 )  { 
                    
                } else {
                    
                }
                    connection.end();
                }
            );
        }
    }


    if(message.content.startsWith('!p4start')){
        var j2 = message.mentions.members.first()
        var j1 = message.member
        var moneyj1 = ""
        var moneyj2 = ""



        var div = message.content.split(' ')
        var mise = ""

        var rand = Math.floor(Math.random() * Math.floor(1000000))


        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'NekShor',
            password : 'NekShor27',
            database : 'NewNation',
            multipleStatements: true

        });


        if(parseInt(div[2]) !== NaN && parseInt(div[2]) > 0){
            mise = parseInt(div[2])

            var sql = "SELECT * FROM monnaie WHERE membre = '" + j1.user.id + "' AND membre = '" + j2.user.id + "'"

            connection.query(
                sql,
                function select(error, results, fields) {
                    if ( results.length > 0 )  { 
                        var firstResult = results[0];
                    
                        if(results.length >= 2){
                            var seco = results[1]

                        }else{
                            var seco = results[0]

                        }

                        if(parseInt(firstResult['valeur']) > mise  && parseInt(seco['valeur']) > mise){

                            var chan = message.guild.createChannel(`Puissance 4 - ${rand}`, {
                                parent: "686987014012534897",
                                type: 'text',
                                permissionOverwrites: [
                                    {
                                        id: message.guild.id,
                                        allow: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: message.guild.id,
                                        deny: ['SEND_MESSAGES'],
                                    },
                                    {
                                        id: message.guild.id,
                                        deny: ['ADD_REACTIONS'],
                                    },
                                    {
                                        id: j1,
                                        allow: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: j1,
                                        allow: ['ADD_REACTIONS'],
                                    },
                                    {
                                        id: j2,
                                        allow: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: j2,
                                        allow: ['ADD_REACTIONS'],
                                    },
                                    {
                                        id: '684688751762472962',
                                        deny: ['SEND_MESSAGES'],
                                    },
                                ]
                                
                            })
                            .then(chan => 
                                chan.send("**Demande de defi**\n" + j2 + "\n Accepte tu de jouer au puissance 4 avec \n"+ j1 +"\n pour une valeur de \n" + mise + " " + monnaie)
                
                            )

                        }else{
                            message.reply("L'un de vous deux n'a pas asser d'argent")
                        }

                    }
                }
            );

        }else{
            mise = "casual"

            var chan = message.guild.createChannel(`Puissance 4 - ${rand}`, {
                parent: "686987014012534897",
                type: 'text',
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: message.guild.id,
                        deny: ['SEND_MESSAGES'],
                    },
                    {
                        id: message.guild.id,
                        deny: ['ADD_REACTIONS'],
                    },
                    {
                        id: j1,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: j1,
                        allow: ['ADD_REACTIONS'],
                    },
                    {
                        id: j2,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: j2,
                        allow: ['ADD_REACTIONS'],
                    },
                    {
                        id: '684688751762472962',
                        deny: ['SEND_MESSAGES'],
                    },
                ]
                
            })
            .then(chan => 
                chan.send("**Puissance 4**      `"+ mise +"`\n " + j1 + " 🔴 \n " + j2 + " 🟡👈\n  :one:  |   :two:  |   :three:  |   :four:  |   :five:  |   :six:  |   :seven: \n----------------------------------------------------\n  :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square: \n----------------------------------------------------\n  :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square: \n----------------------------------------------------\n  :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square: \n----------------------------------------------------\n  :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square: \n----------------------------------------------------\n  :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square:  |   :black_large_square: ")

            )
        }



        

            

       
    }

    

    if(message.channel.name === "【🎨】•art"){
        message.react('❤️')

    }

     
    if(message.content.startsWith('!history')){
        if(message.member.roles.find(r => r.name === "【🔧】• Modérateur en test") || message.member.roles.find(r => r.name === "【🚨】• Modérateur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){

            var div = message.content.split(' ')

            var auth = message.author.id
            if(div[1] !== ""){
                var idmember1 = `${message.mentions.members.first()}`
                var auth = idmember1.substr(2,18)

            }
            
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true

            });

            var histo = "SELECT * FROM moderation WHERE idmembre = '" + auth + "'";

            connection.query(
                histo,
                function select(error, results, fields) {
                    if (error) {
                        console.log("---12---" + error + "ERREUR 2");
                        connection.end();
                        return;
                    }
                        console.log('LOG ' + results.length)
                    if ( results.length > 0 )  { 
                        var firstResult = results[ 0 ];

                        

                        for(var i = 0; i< results.length; i++){
                            var resul = results[i]

                            var use = client.users.get(resul['idmembre'])
                            var emb = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setTitle(resul['sanction'])
                                .setAuthor(resul['membre'])
                                .setThumbnail(use.displayAvatarURL)

                                
                                .setDescription('Voici tes sanctions mécréant.')

                                .addField( 'Raison' ,  resul['raison'])
                                .addField( 'Precision' ,  resul['precisionsanction'])
                                .addField( 'Temp' ,  resul['tempsanction'])
                                .addField( 'Auteur' ,  resul['auteur'])

                                

                            message.channel.send(emb)
                        
                        }
                       
                    } else {

                        message.channel.send('Cette personne n\'a pas d\'historique.')
                      
                    }

                }
            );

           

        }else{
            var auth = message.author.id


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true

            });

            var histo = 'SELECT * FROM moderation WHERE idmembre = ' + auth + '';

            connection.query(
                histo,
                function select(error, results, fields) {
                    if (error) {
                        console.log("---13---" + error + "ERREUR 2");
                        connection.end();
                        return;
                    }
                        
                    if ( results.length > 0 )  { 
                        var firstResult = results[ 0 ];

                        

                        for(var i = 0; i< results.length-1; i++){
                            var resul = results[i]

                            var use = client.users.get(resul['idmembre'])
                            var emb = new Discord.RichEmbed()
                                .setColor('#0099ff')
                                .setTitle(resul['sanction'])
                                .setAuthor(resul['membre'])
                                .setThumbnail(use.displayAvatarURL)

                                
                                .setDescription('Voici tes sanctions mécréant.')

                                .addField( 'Raison' ,  resul['raison'])
                                .addField( 'Precision' ,  resul['precisionsanction'])
                                .addField( 'Temp' ,  resul['tempsanction'])
                                .addField( 'Auteur' ,  resul['auteur'])

                                

                            message.channel.send(emb)
                        
                        }
                       
                    } else {
                        message.channel.send('Votre historique est vide Bravo !')

                      
                    }

                }
            );

           

        }
    }

})


client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

    if(newMember.voiceChannel !== undefined){
        if(newMember.voiceChannel.id === "684702587072544778") {
            const mem = oldMember.guild.roles.find('name', `【🔧】• Modérateur en test`);
            const meme = oldMember.guild.roles.find('name', `【🚨】• Modérateur`);

            client.channels.get('686011037266214962').send('' + meme + ' , ' + mem + ', Il y\'a un support ! https://tenor.com/view/despicable-me-minion-siren-fireman-gif-3571124')
            setTimeout(() => {

                
            }, 3000);

        }   
    }

    if(newMember.voiceChannel !== undefined && newMember.voiceChannel.name !== "💤Dodo~~AFK~~Dodo💤"){
        if(!voiceconnect.includes(`'${newMember.user.id}`)){
            voiceconnect = voiceconnect + "'" + newMember.user.id
        }
    }else{
        voiceconnect = voiceconnect.replace(`'${newMember.user.id}` , "")
    }

    console.log(voiceconnect)

})

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'NekShor',
    password : 'NekShor27',
    database : 'NewNation',
    multipleStatements: true

});

//  
client.on("message", function (message) {

    var fac = ""

    if(message.content.startsWith('!faction')){
        var sql = "SELECT * FROM faction"

        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'NekShor',
            password : 'NekShor27',
            database : 'NewNation',
            multipleStatements: true
        
        });

        connection.query(
            sql,
            function select(error, results, fields) {
                if (error) {
                    console.log("---2.3---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 
                    
                    for(var i = 0 ; i < 4 ; i ++){
                        var resul = results[i]

                        fac += "**" + resul['nom'] + "**\n*" + resul['points'] + "*\n\n" 

                        
                    }
                   message.channel.send(fac)
                } else {
                    
                }
            }
        );
    }

    if(message.content.startsWith('!warn')){
        if(message.member.roles.find(r => r.name === "【🔧】• Modérateur en test") || message.member.roles.find(r => r.name === "【🚨】• Modérateur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){
            
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
            
            });
            
            var div = message.content.split('"')
            var div2 = div[0].split(' ')

            if(!div[1]){
                div[1] = ""
            }

            if(!div[3]){
                div[3] = ""
            }
            var raison = div[1];
            var precisionraison = div[3];
           
            var idmember1 = `${message.mentions.members.first()}`
            var idmember = idmember1.substr(2,18)
            var auteur = message.author.username
            

            if(idmember !== "defined"){
                var membre = client.users.get(`${idmember}`).username
                            
                    

                    var sql = { membre: membre, idmembre: idmember, sanction: "warn", raison: raison, precisionsanction: precisionraison, tempsanction: "-", datesanction: Date.now(), auteur: auteur, actifsanction: 'faux'};
                    var insert = "INSERT INTO moderation SET ?"
                    // connection.end()
                    var quer = connection.query(insert, sql, (err, res) => {
                        if(err) throw err;
                        console.log("----26--" + err)

                    });
                                          
                
                
                message.channel.send(membre + " à été warn pour " + raison + ".")

            }else{
                message.channel.send('Veuillez mentionner la personne.')

            }
        }else{
            message.channel.send('Vous n\'avez pas la permission de faire cette commande.')
        }
    }else
    
    if(message.content.startsWith('!kick')){
    
        if(message.guild.member(message.author).hasPermission('KICK_MEMBERS')){
            
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
            
            });
            
            const member = message.mentions.members.first();


            var div = message.content.split('"')
            var div2 = div[0].split(' ')
            if(!div[1]){
                div[1] = ""
            }

            if(!div[3]){
                div[3] = ""
            }
            var raison = div[1];
            var precisionraison = div[3];
           
            var idmember1 = `${message.mentions.members.first()}`
            var idmember = idmember1.substr(2,18)
            var auteur = message.author.username

            if(idmember !== "defined"){
                var membre = client.users.get(`${idmember}`).username
                
                var sql = "INSERT INTO moderation (membre,idmembre,sanction,raison,precisionsanction,temp,auteur,datesanction) VALUES ?";
            
                var sql = { membre: membre, idmembre: idmember, sanction: "kick", raison: raison, precisionsanction: precisionraison, tempsanction: "-", datesanction: Date.now(), auteur: auteur, actifsanction: 'faux'};
                var insert = "INSERT INTO moderation SET ?"
                    
                    var quer = connection.query(insert, sql, (err, res) => {
                        if(err) throw err;
                        console.log("----27--" + err)

                        console.log("---14---" + 'Last insert ID:', res.insertId);
                    });



                member.kick(member.id).then((member) => {
                    message.channel.send(member + " à été kick pour " + raison + ".")

                }).catch(() => {
                    message.channel.send("Cet personne ne peux etre kick");
                });

                

            }else{
                message.channel.send('Veuillez mentionner la personne.')

            }
      
      
      }else{
        message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande')
      }
    
    }else
    
    if(message.content.startsWith('!ban ')){
    
        if(message.guild.member(message.author).hasPermission('BAN_MEMBERS')){
            
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
            
            });
            
            const member = message.mentions.members.first();


            var div = message.content.split('"')
            var div2 = div[0].split(' ')
            if(!div[1]){
                div[1] = ""
            }

            if(!div[3]){
                div[3] = ""
            }
            var raison = div[1];
            var precisionraison = div[3];

            if(div2[2] !== ""){
                var temp = div2[2]

            }else{
                var temp = "-"
            }
           
            var idmember1 = `${message.mentions.members.first()}`
            var idmember = idmember1.substr(2,18)
            var auteur = message.author.username

            if(idmember !== "defined"){
                var membre = client.users.get(`${idmember}`).username
                
                var sql = "INSERT INTO moderation (membre,idmembre,sanction,raison,precisionsanction,temp,auteur,datesanction) VALUES ?";
            
                var sql = { membre: membre, idmembre: idmember, sanction: "ban", raison: raison, precisionsanction: precisionraison, tempsanction: temp, datesanction: Date.now(), auteur: auteur, actifsanction: 'vraie'};
                var insert = "INSERT INTO moderation SET ?"
                    
                    var quer = connection.query(insert, sql, (err, res) => {
                        if(err) throw err;
                        console.log("----28--" + err)

                        console.log("---15---" + 'Last insert ID:', res.insertId);
                    });


                //
                // member.ban(member.id).then((member) => {
                //     message.channel.send(member + " à été ban pour " + raison + "." + "https://thumbs.gfycat.com/AssuredAcrobaticAchillestang-size_restricted.gif")

                // }).catch(() => {
                //     message.channel.send("Cet personne ne peux etre bannis");
                // });
                //



                
                const mute = mess.guild.roles.find('name', `☠️Banned☠️`);
                const mem = mess.guild.roles.find('name', `🔇Muted🔇`);
                member.addRole(mute)
                member.removeRole(mem)
                
                

            }else{
                message.channel.send('Veuillez mentionner la personne.')

            }
      
      
      
        }else{
            message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande')
        }
    
    }else
    
    if(message.content.startsWith('!tempmute')){
    
        if(message.member.roles.find(r => r.name === "【🔧】• Modérateur en test") || message.member.roles.find(r => r.name === "【🚨】• Modérateur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){
            
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
            
            });
            
        const member = message.mentions.members.first();


        var div = message.content.split('"')
        var div2 = div[0].split(' ')
        if(!div[1]){
            div[1] = ""
        }

        if(!div[3]){
            div[3] = ""
        }
        var raison = div[1];
        var precisionraison = div[3];

        if(div2[2] !== ""){
            var temp = div2[2]

        }else{
            var temp = "-"
        }
       
        var idmember1 = `${message.mentions.members.first()}`
        var idmember = idmember1.substr(2,18)
        var auteur = message.author.username

        if(idmember !== "defined"){
            var membre = client.users.get(`${idmember}`).username
            
            var sql = "INSERT INTO moderation (membre,idmembre,sanction,raison,precisionsanction,temp,auteur,datesanction) VALUES ?";
        

            var sql = { membre: membre, idmembre: idmember, sanction: "mute", raison: raison, precisionsanction: precisionraison, tempsanction: temp, datesanction: Date.now(), auteur: auteur, actifsanction: 'vraie'};
            var insert = "INSERT INTO moderation SET ?"
                
                var quer = connection.query(insert, sql, (err, res) => {
                    if(err) throw err;
                    console.log("----29--" + err)

                    console.log("---16---" + 'Last insert ID:', res.insertId);
                });

                const usere = message.mentions.members.first();
                const mute = message.guild.roles.find('name', `🔇Muted🔇`);
                usere.addRole(mute)
            

        }else{
            message.channel.send('Veuillez mentionner la personne.')

        }
      
      }else{
        message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande')
      }
    
    }



})

var refresh = 300000;

setInterval(function (){    

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'NekShor',
        password : 'NekShor27',
        database : 'NewNation',
        multipleStatements: true
    
    });

    var selectQueryTrue = 'SELECT * FROM moderation WHERE actifsanction = "vraie"';

    connection.query(
        selectQueryTrue,
        function select(error, results, fields) {
            if (error) {
                console.log("---18---" + error)
                connection.end();
                return;
            }

            var fresult = results[0]
                    
            if(results.length > 0){ 

            
                for(let i=0;i <= results.length -1 ;i++){

                    var firstResult = results[i];
                    var id = firstResult['id']

                    var dateee = firstResult['datesanction'];

                    var temp = firstResult['tempsanction'];

                    var tempnbr = temp.substr(0, temp.length-1)
                    var fin;

                    if(temp.substr(temp.length-1, 1) === "s"){
                        fin = parseInt(dateee) + (parseInt(tempnbr)*1000);

                    }else if(temp.substr(temp.length-1, 1) === "m"){
                        fin = parseInt(dateee) + (parseInt(tempnbr)*1000*60);

                    }else if(temp.substr(temp.length-1, 1) === "h"){
                        fin = parseInt(dateee) + (parseInt(tempnbr)*1000*60*60);

                    }else if(temp.substr(temp.length-1, 1) === "d"){
                        fin = parseInt(dateee) + (parseInt(tempnbr)*1000*60*60*24);

                    }else if(temp.substr(temp.length-1, 1) === "M"){
                        fin = parseInt(dateee) + (parseInt(tempnbr)*1000*60*60*24*30);

                    }
                    const list = client.guilds.get("684688751762472962"); 


                    if(fin<Date.now()){

                        listeid = listeid + "|" + id + "|"

                        if(firstResult['sanction'] === "ban"){
                           
                            //

                            var u = list.members.find('id', firstResult['idmembre'])

                            const mute = mess.guild.roles.find('name', `Membre - Discord`);
                            const mem = mess.guild.roles.find('name', `🔇Muted🔇`);
                            u.addRole(mem)
                            u.removeRole(mute)
                            //

                        }else if(firstResult['sanction'] === "mute"){
                            if(mess){

                                                    
                                var u = list.members.find('id', firstResult['idmembre'])

                                const mute = mess.guild.roles.find('name', `🔇Muted🔇`);

                                u.removeRole(mute)
                            }
                        }

                    }

                }
            }else{
                    
            }
             connection.end();
        }
    );

    if(listeid !== ""){
        var divid = listeid.split('|')
        for(let i = 0; i<divid.length-1; i++){

            var idfor = divid[i]


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
            
            });
            var truee = "UPDATE moderation SET actifsanction = 'faux' WHERE id = '" + idfor + "'"
                        
            connection.query(truee, function select(error, results, fields) {
                if (error) {
                    console.log("---19---" + error)
                    return;
                }  
                connection.end();
               
                            
            });

        }

        listeid = ""
    }


    if(voiceconnect !== ""){
        var div = voiceconnect.split("'")

        for(var i = 0 ; i < div.length ; i++){


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
            
            });

            var sql = "SELECT * FROM monnaie WHERE membre = '" + div[i] + "'"

            connection.query(
                sql,
                    function select(error, results, fields) {
                        if (error) {
                            console.log("---2.3---" + error + "ERREUR 1");
                            connection.end();
                            return;
                        }
                            
                        if (results.length > 0){ 
                            
                            var firstResult = results[0]

                            var resul = firstResult['valeur']
                            var newmonnaie = parseInt(firstResult['valeur']) + (25 * parseInt(firstResult['coef']))

                            console.log(newmonnaie + " NewMonnaie")

                            /*var connection = mysql.createConnection({
                                host     : 'localhost',
                                user     : 'NekShor',
                                password : 'NekShor27',
                                database : 'NewNation',
                                multipleStatements: true
                            
                            });*/

                            var sql = "UPDATE monnaie SET valeur = '" + newmonnaie + "' WHERE membre = '" + firstResult["membre"] + "'"

                            connection.query(
                                sql,function select(error, results, fields) {
                                    console.log('checkk')
                                }
                            );

                        } else {
                        
                    }
                }
            );


        }
    }
        
    client.channels.get("686009970092802079").send("Refresh")

}, refresh);


client.on('messageReactionAdd', (reaction, user) => { 

    if(reaction.message.channel.id === "685202045040590876" || reaction.message.channel.id === "684802923079008437"){
        if(user.id !== "684763229582393345"){

            if(reaction.emoji.name === "♿"){
                /*reaction.message.author.send('Tu es tombé bien bas ...')*/
                user.send('Tu es tombé bien bas ...')
            }
            var messs = reaction.message.content
            var messss = messs.split('\n')

            for(var i = 3 ; i < messss.length -1; i++){
                var yeqr = messss[i]
                
                var div = yeqr.split(':')
                
                var emoteee = div[1].split(' ')
                var emoteeee = emoteee[1].split(',')
                
                if(reaction.emoji.name == emoteeee){
                    if(div[2] && div !== ""){
                        var prix = parseInt(div[2]) 

                        var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"

                        connection.query(
                            sql,
                            function select(error, results, fields) {
                            if (error) {
                                console.log("---2.4---" + error + "ERREUR 1");
                                connection.end();
                                return;
                            }
                                
                            if (results.length > 0){ 
                                var firstResult = results[0]

                                if(parseInt(firstResult['valeur']) >= prix){
                                    var roleee = div[0].split('__')
                                    var roleeee = roleee[0].split(' ')
                                    var roleeeee = roleeee[1].substr(3, 18)
            
                                    const list = client.guilds.get("684688751762472962"); 
            
                                    var u = list.members.find('id', user.id)
                                    var ro = reaction.message.guild.roles.find('id', roleeeee)
                                    
                                    u.addRole(ro)

                                    var sql = "UPDATE monnaie SET valeur = " + parseInt(firstResult['valeur']) - prix + " WHERE membre = '" + user.id + "'"

                                    reaction.remove(user)

                                }else{

                                }
                            } else {
                                message.channel.send("Il n'y à pas d'images pour le moment")  
                            }
                                connection.end();
                            }
                        );


                    }else{
                        var roleee = div[0].split('__')
                        if(roleee[0] !== ""){
                            var roleeee = roleee[0].split(' ')

                        }else{
                            var roleeee = roleee[1].split(' ')

                        }
                        var roleeeee = roleeee[1].substr(3, 18)

                        const list = client.guilds.get("684688751762472962"); 

                        var u = list.members.find('id', user.id)
                        var ro = reaction.message.guild.roles.find('id', roleeeee)
                        
                        u.addRole(ro)
                    }
                }
                
            }

        }
    }


    if(reaction.message.channel.name.startsWith('puissance-4')){

       
        if(user.id !== "684763229582393345" ){

            const list = client.guilds.get("684688751762472962"); 

            var u = list.members.find('id', user.id)



            reaction.remove(user)

            var div = reaction.message.content.split('\n')

            if(div[1].includes('👈')){
                // var joueurtout = div[1].substr(2,19)

                var joueurtout = div[1].replace('<', '').replace('>', '').replace('@', '').replace(' ', '').replace('!', '').replace('🔴', '').replace('🟡', '')

                // var autrej = div[2].substr(3,19)

                var autrej = div[2].replace('<', '').replace('>', '').replace('@', '').replace(' ', '').replace('!', '').replace('🔴', '').replace('🟡', '')

            }else{

                // var joueurtout = div[2].substr(3,19)

                var joueurtout = div[2].replace('<', '').replace('>', '').replace('@', '').replace(' ', '').replace('!', '').replace('🔴', '').replace('🟡', '')

                // var autrej = div[1].substr(2,19)

                var autrej = div[1].replace('<', '').replace('>', '').replace('@', '').replace(' ', '').replace('!', '').replace('🔴', '').replace('🟡', '')

            }

            if(joueurtout.startsWith('@')){
                var joueurtout = joueurtout.substr(1,18)

            }else{
                var joueurtout = joueurtout.substr(0,18)

            }

            

            if(autrej.startsWith('@')){
                var autrej = autrej.substr(1,18)

            }else{
                var autrej = autrej.substr(0,18)

            }


            if(joueurtout === user.id || autrej === user.id){
                if(reaction.emoji.name === "❌"){
                    reaction.message.channel.delete()
    
                }
            }

            
            if(joueurtout === user.id){
                if(reaction.emoji.name === "1️⃣"){
                    if(tourP4(1,p4j,reaction.message) === "err 01"){
                        reaction.message.channel.send('Erreur cette ligne esr pleine')
                    }else if(tourP4(1,p4j,reaction.message).startsWith('Gagner')){
                        reaction.message.channel.send('Bravo à <@' + autrej + '> tu as gagner !')
                    }else{
                        reaction.message.edit(tourP4(1,p4j,reaction.message))
                        p4j = !p4j

                    }

                }else if(reaction.emoji.name === "2️⃣"){
                    if(tourP4(2,p4j,reaction.message) === "err 01"){
                        reaction.message.channel.send('Erreur cette ligne esr pleine')
                    }else if(tourP4(1,p4j,reaction.message).startsWith('Gagner')){
                        reaction.message.channel.send('Bravo à <@' + autrej + '> tu as gagner !')
                    }else{
                        reaction.message.edit(tourP4(2,p4j,reaction.message))
                        p4j = !p4j

                    }

                }else if(reaction.emoji.name === "3️⃣"){
                    if(tourP4(3,p4j,reaction.message) === "err 01"){
                        reaction.message.channel.send('Erreur cette ligne esr pleine')
                    }else if(tourP4(1,p4j,reaction.message).startsWith('Gagner')){
                        reaction.message.channel.send('Bravo à <@' + autrej + '> tu as gagner !')
                    }else{
                        reaction.message.edit(tourP4(3,p4j,reaction.message))
                        p4j = !p4j

                    }

                }else if(reaction.emoji.name === "4️⃣"){
                    if(tourP4(4,p4j,reaction.message) === "err 01"){
                        reaction.message.channel.send('Erreur cette ligne esr pleine')
                    }else if(tourP4(1,p4j,reaction.message).startsWith('Gagner')){
                        reaction.message.channel.send('Bravo à <@' + autrej + '> tu as gagner !')
                    }else{
                        reaction.message.edit(tourP4(4,p4j,reaction.message))
                        p4j = !p4j

                    }

                }else if(reaction.emoji.name === "5️⃣"){
                    if(tourP4(5,p4j,reaction.message) === "err 01"){
                        reaction.message.channel.send('Erreur cette ligne esr pleine')
                    }else if(tourP4(1,p4j,reaction.message).startsWith('Gagner')){
                        reaction.message.channel.send('Bravo à <@' + autrej + '> tu as gagner !')
                    }else{
                        reaction.message.edit(tourP4(5,p4j,reaction.message))
                        p4j = !p4j

                    }

                }else if(reaction.emoji.name === "6️⃣"){
                    if(tourP4(6,p4j,reaction.message) === "err 01"){
                        reaction.message.channel.send('Erreur cette ligne esr pleine')
                    }else if(tourP4(1,p4j,reaction.message).startsWith('Gagner')){
                        reaction.message.channel.send('Bravo à <@' + autrej + '> tu as gagner !')
                    }else{
                        reaction.message.edit(tourP4(6,p4j,reaction.message))
                        p4j = !p4j

                    }

                }else if(reaction.emoji.name === "7️⃣"){
                    if(tourP4(7,p4j,reaction.message) === "err 01"){
                        reaction.message.channel.send('Erreur cette ligne esr pleine')
                    }else if(tourP4(1,p4j,reaction.message).startsWith('Gagner')){
                        reaction.message.channel.send('Bravo à <@' + autrej + '> tu as gagner !')
                    }else{
                        reaction.message.edit(tourP4(7,p4j,reaction.message))
                        p4j = !p4j

                    }

                }


            }else{
                reaction.message.channel.send("Ce n'est pas à ton tours")

            }
            
        }
    }
    if(reaction.message.channel.name === "【📐】•règles"){
        if(reaction.emoji.name === "✅"){
            var list = client.guilds.get("684688751762472962"); 
            var u = list.members.find('id', user.id)
                    
            var mute = reaction.message.guild.roles.find('name', `Membre - Discord`);
            u.addRole(mute)

            var mute = reaction.message.guild.roles.find('name', `🏳️Indépendant🏳️`);
            u.addRole(mute)

            var sql = "UPDATE monnaie SET faction = 'Indé' WHERE membre = '" + user.id + "'"

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
            
            });

            connection.query(
                sql)


            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                    if (error) {
                        console.log("---2.2---" + error + "ERREUR 1");

                        connection.end();
                        return;
                    }
                        
                    if ( results.length > 0 )  { 
                    } else {
                        var slq = "INSERT INTO monnaie(membre, valeur, rank, coef) VALUE (" + user.id + ", 100000, 100, 1)"

                        connection.query(slq, (err, res) => {
                            if(err) throw err;
                            console.log("----24--" + err)

                            console.log("---8---" + 'Last insert ID:', res.insertId);
                        });

                    }
                    connection.end();
                }
            );


        }
    }


    if(reaction.message.id === "688781142069215282"){
        if(reaction.emoji.name = "🕵️"){
            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 

                    var firstResult = results[0]

                    if(parseInt(firstResult['valeur']) >= 1000000){
                        var sql = "UPDATE monnaie SET valeur = '" + (parseInt(firstResult['valeur']) - 1000000) + "' WHERE membre = '" + user.id + "'"

                        connection.query(
                            sql,)

                            var list = client.guilds.get("684688751762472962"); 

                            var u = list.members.find('id', user.id)
                                    
                            var mute = reaction.message.guild.roles.find('name', `🕵️Spy🕵️`);
                            u.addRole(mute)
                    }else{
                        user.send("Tu n'a pas asser d'argent.")
                    }
                    
                } else {
                    
                }
                    connection.end();
                }
            );

        }

    }else if(reaction.message.id === "688781142069215282"){
        if(reaction.emoji.name = "✨"){
            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 

                    var firstResult = results[0]

                    if(parseInt(firstResult['valeur']) >= 1000000){
                        var sql = "UPDATE monnaie SET valeur = '" + (parseInt(firstResult['valeur']) - 1000000) + "' WHERE membre = '" + user.id + "'"

                        connection.query(
                            sql
                        )

                        var sql = "UPDATE monnaie SET coef = '1.5' WHERE membre = '" + user.id + "'"

                        connection.query(
                            sql
                        )

                        var list = client.guilds.get("684688751762472962"); 

                        var u = list.members.find('id', user.id)
                                    
                        var mute = reaction.message.guild.roles.find('name', `✨VIP✨`);
                        u.addRole(mute)
    
                    }else{
                        user.send("Tu n'a pas asser d'argent.")
                    }
                    
                } else {
                    
                }
                    connection.end();
                }
            );

        }

    }else if(reaction.message.id === "688784652605063234"){

        if(reaction.emoji.name === "emeraude"){
            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 

                    var firstResult = results[0]

                    if(parseInt(firstResult['valeur']) >= 100000){
                        var sql = "UPDATE monnaie SET valeur = '" + (parseInt(firstResult['valeur']) - 100000) + "' WHERE membre = '" + user.id + "'"
                        connection.query(
                            sql)

                            var list = client.guilds.get("684688751762472962"); 

                            var u = list.members.find('id', user.id)
                                    
                            var mute = reaction.message.guild.roles.find('name', `🏹Emeraude🏹`);
                            u.addRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `⚔️Rubis⚔️`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `🔪Améthyste🔪`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `☄️Saphir☄️`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `🏳️Indépendant🏳️`);
                            u.removeRole(mute)

                            var sql = "UPDATE monnaie SET faction = 'Emeraude' WHERE membre = '" + user.id + "'"

                            connection.query(
                                sql)

                    }else{
                        user.send("Tu n'a pas asser d'argent.")
                    }
                    
                } else {
                    
                }
                    connection.end();
                }
            );

        }else if(reaction.emoji.name === "amethyste"){
            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 

                    var firstResult = results[0]

                    if(parseInt(firstResult['valeur']) >= 100000){
                        var sql = "UPDATE monnaie SET valeur = '" + (parseInt(firstResult['valeur']) - 100000) + "' WHERE membre = '" + user.id + "'"
                        connection.query(
                            sql)

                            var list = client.guilds.get("684688751762472962"); 

                            var u = list.members.find('id', user.id)
                                    
                            var mute = reaction.message.guild.roles.find('name', `🏹Emeraude🏹`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `⚔️Rubis⚔️`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `🔪Améthyste🔪`);
                            u.addRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `☄️Saphir☄️`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `🏳️Indépendant🏳️`);
                            u.removeRole(mute)

                            var sql = "UPDATE monnaie SET faction = 'Améthyste' WHERE membre = '" + user.id + "'"

                            connection.query(
                                sql)

                    }else{
                        user.send("Tu n'a pas asser d'argent.")
                    }
                    
                } else {
                    
                }
                    connection.end();
                }
            );

        }else if(reaction.emoji.name === "rubis"){
            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 

                    var firstResult = results[0]

                    if(parseInt(firstResult['valeur']) >= 100000){
                        var sql = "UPDATE monnaie SET valeur = '" + (parseInt(firstResult['valeur']) - 100000) + "' WHERE membre = '" + user.id + "'"
                        connection.query(
                            sql)

                            
                            var list = client.guilds.get("684688751762472962"); 

                            var u = list.members.find('id', user.id)
                                    
                            var mute = reaction.message.guild.roles.find('name', `🏹Emeraude🏹`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `⚔️Rubis⚔️`);
                            u.addRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `🔪Améthyste🔪`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `☄️Saphir☄️`);
                            u.removeRole(mute)

                            var mute = reaction.message.guild.roles.find('name', `🏳️Indépendant🏳️`);
                            u.removeRole(mute)

                            var sql = "UPDATE monnaie SET faction = 'Rubis' WHERE membre = '" + user.id + "'"

                            connection.query(
                                sql)

                    }else{
                        user.send("Tu n'a pas asser d'argent.")
                    }
                    
                } else {
                    
                }
                    connection.end();
                }
            );

        }else if(reaction.emoji.name === "saphir"){
            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 

                    var firstResult = results[0]

                    if(parseInt(firstResult['valeur']) >= 100000){
                        var sql = "UPDATE monnaie SET valeur = '" + (parseInt(firstResult['valeur']) - 100000) + "' WHERE membre = '" + user.id + "'"
                        connection.query(
                            sql)

                        var list = client.guilds.get("684688751762472962"); 

                        var u = list.members.find('id', user.id)
                                    
                        var mute = reaction.message.guild.roles.find('name', `🏹Emeraude🏹`);
                        u.removeRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `⚔️Rubis⚔️`);
                        u.removeRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `🔪Améthyste🔪`);
                        u.removeRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `☄️Saphir☄️`);
                        u.addRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `🏳️Indépendant🏳️`);
                        u.removeRole(mute)

                        var sql = "UPDATE monnaie SET faction = 'Saphir' WHERE membre = '" + user.id + "'"

                        connection.query(
                            sql)


                    }else{
                        user.send("Tu n'a pas asser d'argent.")
                    }
                    
                } else {
                    
                }
                    connection.end();
                }
            );

        }else if(reaction.emoji.name === "🏳️"){
            var sql = "SELECT * FROM monnaie WHERE membre = '" + user.id + "'"


            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if (results.length > 0){ 

                    var firstResult = results[0]

                    if(parseInt(firstResult['valeur']) >= 0){
                        var sql = "UPDATE monnaie SET valeur = '" + (parseInt(firstResult['valeur']) - 0) + "' WHERE membre = '" + user.id + "'"
                        connection.query(
                            sql)

                        var list = client.guilds.get("684688751762472962"); 

                        var u = list.members.find('id', user.id)
                                    
                        var mute = reaction.message.guild.roles.find('name', `🏹Emeraude🏹`);
                        u.removeRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `⚔️Rubis⚔️`);
                        u.removeRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `🔪Améthyste🔪`);
                        u.removeRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `☄️Saphir☄️`);
                        u.removeRole(mute)

                        var mute = reaction.message.guild.roles.find('name', `🏳️Indépendant🏳️`);
                        u.addRole(mute)

                        var sql = "UPDATE monnaie SET faction = 'Indé' WHERE membre = '" + user.id + "'"

                            connection.query(
                                sql)
                    }
                    
                } else {
                    
                }
                    connection.end();
                }
            );

        }

    }

    

});

function tourP4(col, joueur, message){

    var div1 = message.content.split('-')
    var jr1 = ""
    var jr2 = ""

    var div = message.content.split('\n')


    var ligchiffre = div1[2].replace(/ /g, "").replace(/\n/g, "").replace(/🔴/g, ":red_circle:").replace(/🟡/g, ":yellow_circle:")
    var lig1 = div1[52].replace(/ /g, "").replace(/\n/g, "").replace(/🔴/g, ":red_circle:").replace(/🟡/g, ":yellow_circle:")
    var lig2 = div1[104].replace(/ /g, "").replace(/\n/g, "").replace(/🔴/g, ":red_circle:").replace(/🟡/g, ":yellow_circle:")
    var lig3 = div1[156].replace(/ /g, "").replace(/\n/g, "").replace(/🔴/g, ":red_circle:").replace(/🟡/g, ":yellow_circle:")
    var lig4 = div1[208].replace(/ /g, "").replace(/\n/g, "").replace(/🔴/g, ":red_circle:").replace(/🟡/g, ":yellow_circle:")
    var lig5 = div1[260].replace(/ /g, "").replace(/\n/g, "").replace(/🔴/g, ":red_circle:").replace(/🟡/g, ":yellow_circle:")

    var ligne1 = lig1.split('|')
    var ligne2 = lig2.split('|')
    var ligne3 = lig3.split('|')
    var ligne4 = lig4.split('|')
    var ligne5 = lig5.split('|')

    var col1 = ligne1[0] + ligne2[0] + ligne3[0] + ligne4[0] + ligne5[0]
    var col2 = ligne1[1] + ligne2[1] + ligne3[1] + ligne4[1] + ligne5[1]
    var col3 = ligne1[2] + ligne2[2] + ligne3[2] + ligne4[2] + ligne5[2]
    var col4 = ligne1[3] + ligne2[3] + ligne3[3] + ligne4[3] + ligne5[3]
    var col5 = ligne1[4] + ligne2[4] + ligne3[4] + ligne4[4] + ligne5[4]
    var col6 = ligne1[5] + ligne2[5] + ligne3[5] + ligne4[5] + ligne5[5]
    var col7 = ligne1[6] + ligne2[6] + ligne3[6] + ligne4[6] + ligne5[6]

    if(!lig1.includes(':black_large_square:')){
        setTimeout(() => {
            message.channel.delete();
        }, 2000);
        return "Toutes les cases sont remplie."
         
    }

    if(div[2].includes('👈')){
        joueur = "🟡"
        jr1 = "👈"
        jr2 = ""
    }else{
        joueur = "🔴"
        jr1 = ""
        jr2 = "👈"
    }

    if(lig1.includes(":red_circle:|:red_circle:|:red_circle:|:red_circle:") || lig1.includes(":yellow_circle:|:yellow_circle:|:yellow_circle:|:yellow_circle:") || lig2.includes(":red_circle:|:red_circle:|:red_circle:|:red_circle:") || lig2.includes(":yellow_circle:|:yellow_circle:|:yellow_circle:|:yellow_circle:") || lig3.includes(":red_circle:|:red_circle:|:red_circle:|:red_circle:") || lig3.includes(":yellow_circle:|:yellow_circle:|:yellow_circle:|:yellow_circle:") || lig4.includes(":red_circle:|:red_circle:|:red_circle:|:red_circle:") || lig4.includes(":yellow_circle:|:yellow_circle:|:yellow_circle:|:yellow_circle:") || lig5.includes(":red_circle:|:red_circle:|:red_circle:|:red_circle:") || lig5.includes(":yellow_circle:|:yellow_circle:|:yellow_circle:|:yellow_circle:")){

        return "Gagner horizontalement"
    }

    if(col1.includes(":red_circle::red_circle::red_circle::red_circle:") || col1.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || col2.includes(":red_circle::red_circle::red_circle::red_circle:") || col2.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || col3.includes(":red_circle::red_circle::red_circle::red_circle:") || col3.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || col4.includes(":red_circle::red_circle::red_circle::red_circle:") || col4.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || col5.includes(":red_circle::red_circle::red_circle::red_circle:") || col5.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || col6.includes(":red_circle::red_circle::red_circle::red_circle:") || col6.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || col7.includes(":red_circle::red_circle::red_circle::red_circle:") || col7.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:")){

        return "Gagner verticalement"
    }

    var colg1 = ligne1[0] + ligne2[1] + ligne3[2] + ligne4[3] + ligne5[4]
    var colg2 = ligne1[1] + ligne2[2] + ligne3[3] + ligne4[4] + ligne5[5]
    var colg3 = ligne1[2] + ligne2[3] + ligne3[4] + ligne4[5] + ligne5[6]
    var colg4 = ligne1[3] + ligne2[4] + ligne3[5] + ligne4[6]
    var colg5 = ligne2[0] + ligne3[1] + ligne4[2] + ligne5[3]


    if(colg1.includes(":red_circle::red_circle::red_circle::red_circle:") || colg1.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg2.includes(":red_circle::red_circle::red_circle::red_circle:") || colg2.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg3.includes(":red_circle::red_circle::red_circle::red_circle:") || colg3.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg4.includes(":red_circle::red_circle::red_circle::red_circle:") || colg4.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg5.includes(":red_circle::red_circle::red_circle::red_circle:") || colg5.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:")){

        return "Gagner en travers"
    }

    var colg1 = ligne1[3] + ligne2[2] + ligne3[1] + ligne4[0]
    var colg2 = ligne1[4] + ligne2[3] + ligne3[2] + ligne4[1] + ligne5[0]
    var colg3 = ligne1[5] + ligne2[4] + ligne3[3] + ligne4[2] + ligne5[1]
    var colg4 = ligne1[6] + ligne2[5] + ligne3[4] + ligne4[3] + ligne5[2]
    var colg5 = ligne2[6] + ligne3[5] + ligne4[4] + ligne5[3]


    if(colg1.includes(":red_circle::red_circle::red_circle::red_circle:") || colg1.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg2.includes(":red_circle::red_circle::red_circle::red_circle:") || colg2.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg3.includes(":red_circle::red_circle::red_circle::red_circle:") || colg3.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg4.includes(":red_circle::red_circle::red_circle::red_circle:") || colg4.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:") || colg5.includes(":red_circle::red_circle::red_circle::red_circle:") || colg5.includes(":yellow_circle::yellow_circle::yellow_circle::yellow_circle:")){

        return "Gagner en travers"
    }
    


    if(`${ligne1[col-1]}` === ":yellow_circle:" || `${ligne1[col-1]}` === ":red_circle:"){
        var hcol = 5

        return "err 01"
    }else if(`${ligne2[col-1]}` === ":yellow_circle:" || `${ligne2[col-1]}` === ":red_circle:"){
        var hcol = 4
        ligne1[col-1] = joueur

    }else if(`${ligne3[col-1]}` === ":yellow_circle:" || `${ligne3[col-1]}` === ":red_circle:"){
        var hcol = 3
        ligne2[col-1] = joueur

    }else if(`${ligne4[col-1]}` === ":yellow_circle:" || `${ligne4[col-1]}` === ":red_circle:"){
        var hcol = 2
        ligne3[col-1] = joueur

    }else if(`${ligne5[col-1]}` === ":yellow_circle:" || `${ligne5[col-1]}` === ":red_circle:"){
        var hcol = 1
        ligne4[col-1] = joueur

    }else{
        var hcol = 0
        ligne5[col-1] = joueur

    }
    console.log("hauteur : " + hcol)

    var j1 = message.mentions.members.first()
    var j2 = message.mentions.members.last()
    var messageFinal ="**Puissance 4**\n " + j1 + " 🔴" + jr1 + "\n " + j2 + " 🟡" + jr2 + "\n  :one:  |   :two:  |   :three:  |   :four:  |   :five:  |   :six:  |   :seven: \n----------------------------------------------------\n  " + ligne1[0] + "  |   " + ligne1[1] + "  |   " + ligne1[2] + "  |   " + ligne1[3] + "  |   " + ligne1[4] + "  |   " + ligne1[5] + "  |   " + ligne1[6] + " \n----------------------------------------------------\n  " + ligne2[0] + "  |   " + ligne2[1] + "  |   " + ligne2[2] + "  |   " + ligne2[3] + "  |   " + ligne2[4] + "  |   " + ligne2[5] + "  |   " + ligne2[6] + " \n----------------------------------------------------\n  " + ligne3[0] + "  |   " + ligne3[1] + "  |   " + ligne3[2] + "  |   " + ligne3[3] + "  |   " + ligne3[4] + "  |   " + ligne3[5] + "  |   " + ligne3[6] + " \n----------------------------------------------------\n  " + ligne4[0] + "  |   " + ligne4[1] + "  |   " + ligne4[2] + "  |   " + ligne4[3] + "  |   " + ligne4[4] + "  |   " + ligne4[5] + "  |   " + ligne4[6] + " \n----------------------------------------------------\n  " + ligne5[0] + "  |   " + ligne5[1] + "  |   " + ligne5[2] + "  |   " + ligne5[3] + "  |   " + ligne5[4] + "  |   " + ligne5[5] + "  |   " + ligne5[6] + " "

    return messageFinal

}



//clear
//nsfw
client.on("message", function (message) {

    if(message.member.roles.find(r => r.name === "【💻】• Développeur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){
        
        if(message.content === "!shutdown"){
            process.exit(1);

        }

    }

    if(message.content.startsWith('!newrole')){
        
        if(message.channel.name === "🐁cobaye🐁" || message.channel.name === "【📜】•role"){

            var div = message.content.split('|')
            var div2 = div[0].split(' ')
            var nom = div2[1]

            var rol = "";

            for(var i = 1 ; i < div.length - 1 ; i++){

                var neww = div[i]
                var em = neww.split(' ')
                var emo= em[3]

                rol += neww + "\n"
                emot += emo + " ";

            }

            message.channel.send("||Role : **" + nom + "**\n *Cliquez sur une emote pour choisir un role* \n\n__" + rol + "__")
            rol = ""

            message.delete()

        }

    }

    if(message.channel.name === "🐁cobaye🐁" || message.channel.name === "【📜】•role"){
        
        if(message.content.startsWith("||")){
            
            var emote = emot.split(' ')

            for(var i = 0 ; i < emote.length - 1 ; i++){
                message.react(emote[i])

            }
            emot = "";
            var chan = message.channel.id
            var mess = message.id

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'NekShor',
                password : 'NekShor27',
                database : 'NewNation',
                multipleStatements: true
    
            });


            var sql = "INSERT INTO cache(chan, mess) VALUES(" + chan + "," + mess + ")"

            connection.query(
                sql,
                function select(error, results, fields) {
                if (error) {
                    console.log("---2.2---" + error + "ERREUR 1");
                    connection.end();
                    return;
                }
                    
                if ( results.length > 0 )  { 
                    
                } else {
                    
                }
                    connection.end();
                }
            );


        }
    }


    if(message.content.startsWith("!clear")){
        var div = message.content.split(' ')
        var clears = div[1]
        if(clears < 100){
            message.delete()
            message.channel.bulkDelete(clears)
            message.channel.send(clears + " messages ont été supprimés.")
        }else if(clears >= 100){
            message.channel.send("Veuillez choisir un valeur inférieur à 100")
        }else{
            message.channel.send("Ceci n'est pas une valeur valide")
        }
    }


    if(message.member.roles.find(r => r.name === "【🔧】• Modérateur en test") || message.member.roles.find(r => r.name === "【🚨】• Modérateur") || message.member.roles.find(r => r.name === "【🎩】• Responsable") || message.member.roles.find(r => r.name === "Tout puissant") || message.member.roles.find(r => r.name === "【🎩】• Administrateur")){
        var cat = "nsfw"
        var souscat = ""
        if(message.content.startsWith('!newnsfw')){

            var div = message.content.split(' ')
            var di = div[1]

            if(div[2]){
                cat = div[2]
            }

            if(div[3]){
                souscat = div[3]
            }

            if(di.startsWith('http')){

                var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'NekShor',
                    password : 'NekShor27',
                    database : 'NewNation',
                    multipleStatements: true
        
                });

                var sql = "INSERT INTO image(lien, categ, souscat) VALUE('" + di + "','" + cat + "','" + souscat + "')"

                console.log(sql)

                connection.query(
                    sql,
                    function select(error, results, fields) {
                    if (error) {
                        console.log("---2.5---" + error + "ERREUR 1");
                        connection.end();
                        return;
                    }
                        
                    if ( results.length > 0 )  { 
                        
                    } else {
                        
                    }
                        connection.end();
                    }
                );
            
                
                cat = ""

                souscat = ""

                di = ""
            }

        }

    }

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'NekShor',
        password : 'NekShor27',
        database : 'NewNation',
        multipleStatements: true

    });


    if(message.content.startsWith('!nsfw')){
        var sql = "SELECT * FROM image WHERE categ = 'nsfw'"

        connection.query(
            sql,
            function select(error, results, fields) {
            if (error) {
                console.log("---2.6---" + error + "ERREUR 1");
                connection.end();
                return;
            }
                
            if (results.length > 0){ 
                var rand = Math.floor(Math.random() * Math.floor(results.length))
                var res = results[rand]

                message.channel.send(res['lien'])
            } else {
                message.channel.send("Il n'y à pas d'images pour le moment")  
            }
                connection.end();
            }
        );
    }

})




//dés
//flood
// Console
client.on("message", function (message) {

    if(message.content.startsWith("!de") || message.content.startsWith('!dé')){
        var div = message.content.split(' ')
        var max = div[1]

        if(max !== undefined){
            var nbr = Math.floor(Math.random() * Math.floor(max))+1

            message.reply('🎲 •  ' + nbr + '  • 🎲')

        }else{
            message.reply('Veuillez choisir un nombre.')
        }

    }

    var intervals = 2000

    var number = 0

    const args = message.content.slice(prefix.length).trim().split(/  +/g);
    const command = args.shift().toLowerCase();

    
    

    if (command === "flood") {
        let messege = args[0]; // Remember arrays are 0-based!.
        number = args[1];
        let tts = args[2];
        
        if(message.author.id == "302117850380894208" ||message.author.id == "222985392197074944" || message.author.id == "477201358991261706" || message.author.id == "262745076613120011" || message.author.id == "376125888661553172" || message.author.id == "619987595522211850" ){
            if(number < 300){   

                if(tts === "tts"){
			
                	   ttss = setInterval(function (){
                           ttss1 = 10;
                            message.channel.send(` ${messege} (reste ${args[1] - 1})`, {tts: true});
                        
                            args[1] --;

                        if(args[1] < 1){
                            clearInterval(ttss)
                            ttss = 0;
                            ttss1 = 0;
                        }
                                
                    }, intervals);
                        
                        
                     	     
                  	  
			
                }else{
                    ttsss = setInterval(function (){
                        message.channel.send(` ${messege} (reste ${args[1] - 1})`, {tts: false});
                        
                        ttss1 = 10;


                                args[1] --;

                                if(args[1] < 1){
                                    clearInterval(ttsss)
                                    ttsss = 0
                                    ttss1 = 0;
                                }
                                
                            }, intervals);
                        
                        
                     	     
                  	  }
                } else {message.reply("trop grande valeur")}

        }else{
            message.reply("T'y à cru hein ? https://giphy.com/gifs/asianhistorymonth-asian-history-month-heritage-3oKIPj8bJ9ky9ubKGQ ")
        }     
    }
    if(message.content === "number"){
        message.reply(`${number}`)
    } 



   
    if(message.content === "!stop"){
        if(message.author.id == "302117850380894208" ||message.author.id == "222985392197074944" || message.author.id == "477201358991261706" || message.author.id == "262745076613120011" || message.author.id == "376125888661553172" || message.author.id == "619987595522211850"){

            if(ttss1 > 5){
                clearInterval(ttsss)
            }
            if(ttss1 > 5){

                clearInterval(ttss)
            }
        }else{
            message.reply("T'y à cru hein ? https://giphy.com/gifs/asianhistorymonth-asian-history-month-heritage-3oKIPj8bJ9ky9ubKGQ ")
        }

    }

    if(message.content.includes("@Retromania#7868")){
        message.reply("Don't mentionner El magnifico uRetro")
    } 

    if(message.content.startsWith('!')){

        // console.log("(COMMANDE)    Serveur : " + message.guild.name + "   /   Personne : " + message.author.username + "   /   Contenue : " + message.content)

    }else{
        // console.log("Serveur : " + message.guild.name + "   /   Personne : " + message.author.username + "   /   Contenue : " + message.content)

    }

    if(message.channel.name === "•🧾-vote-🧾•"){
        message.react('❌')
        message.react('✅')

    }


    const phrase = message.content.split(/ +/g);
    var str = message.content.toLowerCase();

    if(message.author.id !== '684763229582393345'){
    
        
        if (str.includes("pute")){
            vulgarite(message.content, message.member.user.username, message.channel)

        }else if (str.includes("connard")){
            vulgarite(message.content, message.member.user.username, message.channel)

        }else if (str.includes("salope")){
            vulgarite(message.content, message.member.user.username, message.channel)

        }else if (str.includes(" con ")){
            vulgarite(message.content, message.member.user.username, message.channel)

        }else if (str.includes("encule")){
            vulgarite(message.content, message.member.user.username, message.channel)

        }else if(str.includes(" viol")){
            vulgarite(message.content, message.member.user.username, message.channel)

        }else if(str.includes("chocolatine")){
            message.channel.send(`Pain au chocolat*`)

        }
    }
    
})

function vulgarite(mot, auteur, channel){

    const me = channel.guild.channels.find('name', channel.name);


    client.channels.get('686011037266214962').send("**" + auteur + "** à dis **'" + mot + "'** dans le channel **" + channel + ".** Allez lui péter les dents.")
}

// !ticket
client.on("message", function(message) {

    if(message.content === "!ticket"){
        var random = `${Math.floor(Math.random() * Math.floor(10))}`  +  `${Math.floor(Math.random() * Math.floor(10))}` +  `${Math.floor(Math.random() * Math.floor(10))}` +  `${Math.floor(Math.random() * Math.floor(10))}` +  `${Math.floor(Math.random() * Math.floor(10))}` +  `${Math.floor(Math.random() * Math.floor(10))}` ;

    
        var chan = message.guild.createChannel(`ticket - ${random}`, {
            parent: "684700991135678465",
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
            ]
            
        })
        .then(chan => chan.send('<@' + message.member.id + ">" + ' Tu peux exposer ton problème ici au ' + "<@&684689490702630990>" + " Merci de faire \"!ticket close\" lorsque ton problème est regler"))
        console.log(chan)

    }

    if(message.channel.name.startsWith('ticket')){
        if(message.content === '!ticket close'){
            message.channel.delete()
        }
    }

    ajd = `${message.createdAt}`
    m = message

    if(!message.member.roles.find(r => r.name === "Membre - Discord") && !message.member.roles.find(r => r.name === "【🔻】• Bot")){
        if(message.content === rep){
            console.log(message.member)
            var usere = message.member.user;

            var list = client.guilds.get("684688751762472962"); 

            var u = list.members.find('id', message.member.user.id)
                    
            var mute = message.guild.roles.find('name', `Membre - Discord`);
            u.addRole(mute)

        }else{
            message.channel.send('Vous vous êtes trompé veuillez réessayer')
        }
    }
})

var bump = ""

function bumpfonction() {

    bump = setTimeout(() => {
        const meme = oldMember.guild.roles.find('name', `【🎩】• Administrateur`);

        client.channels.get("686009970092802079").send(meme + `Il faut Bump ! (!d bump)`)

    }, 7200000);
}
  


setInterval(() => {
    let connectés = mess.guild.members.filter(({ presence }) => presence.status !== 'offline').size;
    let membre = mess.guild.members.size;
    client.channels.get("686196737152385142").edit({ name:  `Connectés : ${connectés}` })
    client.channels.get("686263777070678050").edit({ name:  `Membres :  ${membre}` })

}, 5000);



var ajd = "0";
var m ;


var rep = ""


client.on("message", message =>{

    if(message.member.id !== "684763229582393345"){
    if(message.content.length >= 1){
        if(!message.content.startsWith('!')){ 
            var tout = message.content.length
            var flood = 0
            var testv = message.content.split(' ')
            var nbrr = 0
        
            while(`${testv[nbrr]}` !== "undefined"){

                var testvv = `${testv[nbrr]}`

                if(testvv.includes('@') || testvv.includes('#') || testvv.includes('https://') || testvv.includes('http://') || testvv.includes('discord.gg/')){}else{


                    googleTrends.interestOverTime({keyword: testvv})
                    .then(function(results){                                    
                                
                        if(`${results}` === `{"default":{"timelineData":[],"averages":[]}}`){
                            flood = flood + testv[nbrr].length
                            // message.channel.send("Arrete de vomir sur ton clavier")
                        }
                            
                    })
                    .catch(function(err){

                        console.error("---1---" + 'Oh no there was an error', err);

                    });

                        
                }
                                

                nbrr = nbrr + 10;
            }
            if(flood/tout < 0.3){
                var x = message.content.length
                console.log(x)
                var taille = (2*x)/((0.1*x)+10);
                console.log(taille)
                var sql = "SELECT * FROM monnaie WHERE membre = '" + message.member.user.id + "'"

                var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'NekShor',
                    password : 'NekShor27',
                    database : 'NewNation',
                    multipleStatements: true

                });
        
                connection.query(
                    sql,
                    function select(error, results, fields) {
                    if (error) {
                        console.log("---201---" + error + "ERREUR 1");
                        connection.end();
                        return;
                    }

                    if (results.length > 0)  { 
                        var firstResult = results[0];
                        var rentrer = Math.ceil(taille) * parseInt(firstResult['coef'])
                        var fin = rentrer + parseInt(firstResult['valeur'])
                        var sql = "UPDATE monnaie SET valeur = '" + fin + "' WHERE membre = '" + message.member.user.id + "'"
                    
                        connection.query(
                            sql,
                            function select(error, results, fields) {
                                if (error) {
                                    console.log("---202---" + error + "ERREUR 1");
                                    connection.end();
                                    return;
                                }
                               

                            }
                        );
                    
                    } else {
                        
                    }
                        connection.end();
                    }
                );
        

            }

             
        }
    }
    }
})


client.on("guildMemberAdd", user =>{
    if(user.guild.name === "New Nation"){



        client.channels.get("684724972220186677").send(`Bienvenue ${user} je t'invite à lire attentivement les channels <#684802939147386948>, <#684802977378074639>, <#684802923079008437> et <#688361102484045973>, ces channels sont asser important pour comprendre comment marche le serveur. Bonne journée !`)


        /*var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'NekShor',
            password : 'NekShor27',
            database : 'NewNation',
            multipleStatements: true

        });

        rep = ""
        capt = ""
        var sql = "SELECT * FROM image WHERE categ = 'captcha'"

        connection.query(
            sql,
            function select(error, results, fields) {
            if (error) {
                console.log("---200---" + error + "ERREUR 1");
                connection.end();
                return;
            }
                
            if (results.length > 0)  { 
                resul = results[Math.floor(Math.random() * Math.floor(results.length-1))]
                
                rep = resul['souscat']
                capt = resul['lien']

                user.guild.channels.get("684724972220186677").send("Bienvenue" + user + "sur le serveur " + '"' + user.guild.name + '"' + capt)

            } else {
                
            }
                connection.end();
            }
        );*/


    }
});

client.on("guildMemberRemove", user =>{
    if(user.guild.name === "New Nation"){

    }
});




// Vomissement textuel
client.on("message", message =>{

    if(message.content === "!d bump"){
        clearTimeout(bump)

        bumpfonction()
    }

    if(message.author.id === "302117850380894208"  ){
        if(message.content.startsWith("!statut")){
            var stat = message.content.split(' ')
            client.user.setStatus('available')
            client.user.setPresence({
                game: {
                    type: "PLAYING",
                    name: stat[1],
                    url: "https://www.paypal.me/antoinebigot27"
                }
            });
        }
    }

    /*if(!message.content.startsWith('!')){
        var testv = message.content.split(' ')
        var nbrr = 0
        
        while(`${testv[nbrr]}` !== "undefined"){

            var testvv = `${testv[nbrr]}`

            if(testvv.includes('@') || testvv.includes('#') || testvv.includes('https://') || testvv.includes('http://') || testvv.includes('discord.gg/')){}else{


                googleTrends.interestOverTime({keyword: testvv})
                .then(function(results){                                    
                            
                    if(`${results}` === `{"default":{"timelineData":[],"averages":[]}}`){
                        // message.channel.send("Arrete de vomir sur ton clavier")
                    }
                        
                })
                .catch(function(err){

                    console.error("---1---" + 'Oh no there was an error', err);

                });

                    
            }
                            

            nbrr = nbrr + 10;
        }
    }*/
})

client.on("error", function (error) {
    console.log("---error---" + error)

    client.channels.get("686009970092802079").send("j'ai crash")

    process.exit(1);

})



client.login(Token")



client.on("ready", () => {
   
    bumpfonction();

    client.channels.get("686009970092802079").send("bot connecté")
    client.user.setStatus('available');

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'NekShor',
        password : 'NekShor27',
        database : 'NewNation',
        multipleStatements: true

    });

    var sql = "SELECT * FROM cache"

    connection.query(
        sql,
        function select(error, results, fields) {
        if (error) {
            console.log("---2.7---" + error + "ERREUR 1");
            connection.end();
            return;
        }
            
        if (results.length > 0)  { 
            for(var i = 1 ; i < results.length ; i++){
                resul = results[i]

                console.log("CHAN" + resul['chan'] + "| " + resul['mess'])

                if(client.channels.get(resul['chan'])){

                    client.channels.get(resul['chan']).fetchMessage(resul['mess']);

                }else{
                    var sql = "DELETE FROM cache WHERE chan = '" + resul['chan'] + "'"

                    connection.query(
                        sql,
                        function select(error, results, fields) {
                            if (error) {
                                console.log("---2.7---" + error + "ERREUR 1");
                                connection.end();
                                return;
                            }
                           
                        }
                    );

                }

            }
        } else {
            
        }
            connection.end();
        }
    );

    client.user.setPresence({
        game: {
            name: "paypal.me/RockManiaNation"
        }
    });
      
    console.log(`${client.user.tag} est connecté à discord`);
    (function() {
        try {
            console.log("Le bot redémarra dans 24 heures");
            setInterval(() => {
                console.log("process")
        
            }, 86400);
        } catch (e) {
            console.error(`Une erreur est survenue, redémarrage forcer\n[ERROR]: ${e}`);
        }
    }());
});
