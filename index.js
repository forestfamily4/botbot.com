const http = require("http");
const { Client, Intents } = require("discord.js");
const fs = require("fs");
const Fuse = require("fuse.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
http
  .createServer(function (req, res) {
    res.write("OK");
    res.end();
  })
  .listen(8080);

const helpjson = JSON.parse(fs.readFileSync("./help.json", "utf8"));
const tensai =
  "￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣";
const commandarray = [];
helpjson.forEach(data => {
  commandarray.push(data.name);
});

client.on("ready", message => {
  client.user.setPresence({ game: { name: "with discord.js" } });
  console.log("bot is ready!");
  client.user.setActivity("精神崩壊", { type: "PLAYING" });
 fs.readFileSync("")
});

client.on('messageReactionAdd', async (clientmessage, user) => {
  
})

client.on("messageCreate", async message => {
  let sousin = false;
  if (message.author.id == "742347739018297346") {
    message.react("🤔");
  }
  if (
    message.author.bot ||
    message.channel.type == "dm" ||
    message.channel == null ||
    message.author == message.client.user
  )
    return;
  if (message.content.match(/<@!898142974704226314>|<@898142974704226314>/)) {
    return message.reply("\n <@!742347739018297346> こいつに言え");
  }
  const args = message.content
    .slice(1)
    .trim()
    .split(/ +/);
    if (message.content.startsWith('*') == false) {
    return
  }
  if (message.content.startsWith("*eval")) {
    if (
      message.author.id == "742347739018297346" ||
      message.author.id == "894380953718390785"
    ) {
      eeval(message);
    }
  } else if (message.content.startsWith("*help")) {
    if (!args[1]) {
      return message.reply(
        "**__コマンド一覧だぞ__**" +
        " > **タイプ:ゲーム**　\n kanji think_typing \n > **タイプ:管理**　\n roll_control roll_pannel kick&ban mute control \n > **タイプ:その他**　\n list \n ネタ系はここにはかいてないよ"
      );
      //embed 参考 https://qiita.com/nedew/items/4e0c20c1a89e983a6992
    }
    helpjson.forEach(data => {
      if (data.name == args[1]) {
        let altarray = "";
        data.alt.forEach(data => {
          altarray = altarray + data + " ";
        });
        if (altarray == "") {
          altarray = "なし";
        }
        const emb = {
          embeds: [
            {
              title: data.name,
              color: getRandomInt(),
              fields: [
                {
                  name: "代替コマンド",
                  value: altarray
                },
                {
                  name: "説明",
                  value: data.description
                },
                {
                  name: "使い方",
                  value: data.example
                }
              ],
              footer: {
                text: tensai
              }
            }
          ]
        };
        message.channel.send(emb);
        sousin = true;
      }
    });
    for (let i = 0; i < helpjson.length; i++) {
      helpjson[i].alt.forEach(data => {
        if (args[1] == data) {
          let altarray = "";
          helpjson[i].alt.forEach(data => {
            altarray = altarray + data + " ";
          });
          if (altarray == "") {
            altarray = "なし";
          }
          const emb = {
            embeds: [
              {
                title: helpjson[i].name,
                color: getRandomInt(),
                fields: [
                  {
                    name: "代替コマンド",
                    value: altarray
                  },
                  {
                    name: "説明",
                    value: helpjson[i].description
                  },
                  {
                    name: "使い方",
                    value: helpjson[i].example
                  }
                ],
                footer: {
                  text: tensai
                }
              }
            ]
          };
          message.channel.send(emb);
          sousin = true;
        }
      });
    }
  } else if (args[0] == "kanji" || args[0] == "kanzi" || args[0] == "kj") {
    return message.reply({
      embeds: [
        {
          collor: 123456789,
          description:
            "kanjiコマンドだよ　\n タイプ:ゲーム　\n コマンド名:kanji　\n 短縮形:無し　\n 説明 \n 漢字パズルが5問のうちからランダムで出るよ。 \n もちろん未実装☆　\n 使い方 \n 'kannji"
        }
      ]
    });
  } else if (args[0] == "thinking_typing") {// args[1].match(/^(think_typing|t_t)$/)
    return message.reply(
      "think_typingコマンドだよ　\n タイプ:ゲーム \n コマンド名:think_typing \n 短縮形:t_t \n 説明 \n thinkingタイピング！！！（は？） \n もちろん未実装☆　\n 使い方 \n  'think_typing"
    );
  } else if (args[0] == "roll_control" || args[0] == "rc") {
    //これが一番基本 ok
    //上のやつみたいに//で囲んでまとめてあるのを正規表現っていう ok
    return message.reply("未実装");

  }

  else if (args[0] == "clear" || args[0] == "cl") {
    num = args[1];
    if (num > 100) {
      message.reply("100件以上は対応するつもりはありません");
    }
    else if (num == null || num == undefined) {
      message.reply("何件消すか入力しろよ！！");
    }
    else {

      const deleteingmessages = message.channel.messages.fetch({ limit: num }).then(messages => { messages.forEach(async message => { await message.delete() }) })
        .then(function () { message.channel.send(num + "件削除しました。") })

    }
    sousin = true
  }
  else if (
    args[0] == "roll_panel" ||
    args[0] == "rpanel" ||
    args[0] == "rp"
  ) {
    try {

      let rollids = [];
      const abcdefg = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      const emoji=["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"];
      for (let i = 2; i < args.length; i++) {
        rollids.push(args[i]);
      }
      rollids.forEach(data => { data.split('<')[0].split('>')[0].split('@')[0] })
      let rollpanel_message = "";
      for (let i = 0; i < rollids.length; i++) {
        rollpanel_message += ":regional_indicator_"+abcdefg[i] + ': ' + rollids[0] + "\n";
      }
      console.log(rollpanel_message);
      const emb = {
        embeds: [
          {
            title: args[1],
            color: getRandomInt(),
            description: rollpanel_message
          }
        ]
      }

     const roll_panelmessage=await message.channel.send(emb);
    
      for(let i=0;i<rollids.length;i++){
       roll_panelmessage.react(emoji[i]);
     }
     fs.appendFileSync("./rpanel.txt","\n"+roll_panelmessage.id+"|"+roll_panelmessage.channel.id,"utf-8");
     sousin = true;
    }
    catch (e) {
      console.log(e);
    }
  }

  if (sousin == false && message.content.startsWith("*")) {
    const options = {
      includeScore: true
    };
    const fuse = new Fuse(commandarray, options);
    let kensaku;
    if (message.content.slice(1, 5) == "help") {
      kensaku = message.content.slice(5);
    }
    else {
      kensaku = message.content.slice(1);
    }
    const result = fuse.search(kensaku);
    let yosou = "";
    for (let i = 0; i < result.length; i++) {
      if (i == 0) {
        yosou = result[i].item;
      }
      else {
        yosou = yosou + "," + result[i].item;
      }
    }
    if (yosou == "") {
      yosou = "見つからん";
    }
    const emb = {
      embeds: [
        {
          title: "コマンドが見つかりませんでした:thinking:",
          color: getRandomInt(),
          description:
            "わたしの天才的な予想だと" + yosou + "ではないでしょうか？",
          footer: {
            text: tensai
          }
        }
      ]
    };
    message.channel.send(emb);
    return;
  }
});

client.login("");

function eeval(message) {
  const content = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  const result = new Promise(resolve => resolve(eval(content)));
  return result
    .then(async output => {
      if (typeof output !== "string") {
        output = require("util").inspect(output, { depth: 0 });
      }
      if (output.includes(message.client.token)) {
        output = output.replace(message.client.token, "[トークン]");
      }
      await message.react("↩");
      const m = await message.channel.send(`\`\`\`js\n${output}\n\`\`\``);
      const filter = (reaction, user) =>
        user.id === message.author.id && reaction.emoji.name === "↩";
      message
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then(() => {
          m.delete();
          message.reactions.removeAll();
        })
        .catch(() => message.reactions.removeAll());
    })
    .catch(async err => {
      err = err.toString();
      if (err.includes(message.client.token)) {
        err = err.replace(message.client.token, "[トークン]");
      }
      if (err.includes("is not a function")) {
        err = err.replace("is not a function", "は関数ではないようです。");
      }
      if (err.includes("SyntaxError: Unexpected token")) {
        err = err.replace("SyntaxError: Unexpected token", "書き間違い");
      }
      if (err.includes("SyntaxError: Unexpected end of input")) {
        err = err.replace("SyntaxError: Unexpected end of input", "書き間違い");
      }
      await message.react("⚠");
      const m = await message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      const filter = (reaction, user) =>
        user.id === message.author.id && reaction.emoji.name === "⚠";
      message
        .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
        .then(() => {
          m.delete();
          message.reactions.removeAll();
        })
        .catch(() => message.reactions.removeAll());
    });
}
function getRandomInt() {
  let min = 1;
  let max = 16777215;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
