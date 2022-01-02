const Discord = require("discord.js");
const { Permissions } = require("discord.js");
const fs = require("fs");
const Fuse = require("fuse.js");
const express = require("express");
const { get } = require("express/lib/request");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
});
require("dotenv").config();

const prefix="*"

const app = express();
app.listen(8080);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


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
  client.user.setActivity("精神崩壊 " + prefix + "help", { type: "PLAYING" });
  const rollpanels = fs.readFileSync("./rpanel.txt", "utf-8").split("\n");
  for (let i = 0; i < rollpanels.length; i++) {
    const roll_panel_id = rollpanels[i].split("|")[0];
    const roll_panel_channel = rollpanels[i].split("|")[1];
    if (roll_panel_id != "") {
      console.log(roll_panel_channel)
      client.channels.cache.get(roll_panel_channel).messages.fetch(roll_panel_id);
      client.channels.cache
        .get("890225582237958194")
        .messages.fetch("926028738590810114");
    }
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) {
    return;
  }
  const emoji = [
    "🇦",
    "🇧",
    "🇨",
    "🇩",
    "🇪",
    "🇫",
    "🇬",
    "🇭",
    "🇮",
    "🇯",
    "🇰",
    "🇱",
    "🇲",
    "🇳",
    "🇴",
    "🇵",
    "🇶",
    "🇷",
    "🇸",
    "🇹",
    "🇺",
    "🇻",
    "🇼",
    "🇽",
    "🇾",
    "🇿"
  ];
  const r = fs.readFileSync("./rpanel.txt", "utf-8").split("\n");
  for (let i = 0; i < r.length; i++) {
    if (r[i].split("|")[0] == reaction.message.id) {
      let num = emoji.indexOf(reaction.emoji.name);
      if (num != -1) {
        const rollmessage = reaction.message.embeds[0].description;
        const rollid = rollmessage
          .split("\n")
          [num].split(" ")[1]
          .slice(3, -1);
        reaction.message.guild.members
          .resolve(user.id)
          .roles.add(rollid)
          .catch(e => {
            console.log(e);
          });
        const m = await reaction.message.reply(
        {
          embeds:[{
            title:"成功",
            description:"<@" + user.id + ">に<@&" + rollid + ">ロールを追加しました。"
          }]
        }
        );
        setTimeout(() => {
          m.delete();
        }, 1000);
      } else {
        if (reaction.emoji.createdAt == null) {
          reaction.message.reactions
            .resolve(reaction.emoji.name)
            .users.remove(user);
        } else {
          reaction.message.reactions
            .resolve(reaction.emoji.id)
            .users.remove(user);
        }
      }
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) {
    return;
  }
  const abcdefg = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  const emoji = [
    "🇦",
    "🇧",
    "🇨",
    "🇩",
    "🇪",
    "🇫",
    "🇬",
    "🇭",
    "🇮",
    "🇯",
    "🇰",
    "🇱",
    "🇲",
    "🇳",
    "🇴",
    "🇵",
    "🇶",
    "🇷",
    "🇸",
    "🇹",
    "🇺",
    "🇻",
    "🇼",
    "🇽",
    "🇾",
    "🇿"
  ];
  const r = fs.readFileSync("./rpanel.txt", "utf-8").split("\n");
  for (let i = 0; i < r.length; i++) {
    if (r[i].split("|")[0] == reaction.message.id) {
      let num = emoji.indexOf(reaction.emoji.name);
      if (num != -1) {
        const rollmessage = reaction.message.embeds[0].description;
        const rollid = rollmessage
          .split("\n")
          [num].split(" ")[1]
          .slice(3, -1);
        reaction.message.guild.members
          .resolve(user.id)
          .roles.remove(rollid)
          .catch(e => {
            console.log(e);
          });
        const m = await reaction.message.reply(
          {
            embeds:[{
              title:"成功",
              description:"<@" + user.id + ">の<@&" + rollid + ">ロールを削除しました。"
            }]
          }
        );
        setTimeout(() => {
          m.delete();
        }, 1000);
      } else {
        try {
          if (reaction.emoji.createdAt == null) {
            reaction.message.reactions
              .resolve(reaction.emoji.name)
              .users.remove(user);
          } else {
            reaction.message.reactions
              .resolve(reaction.emoji.id)
              .users.remove(user);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
});

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
    return message.reply(
      "\n <@!742347739018297346> こいつに言え\nちなみに公式サイト https://botbot.f5.si \nもちろん未完成☆"
    );
  }
  const args = message.content
    .slice(1)
    .trim()
    .split(/ +/);
  if (message.content.startsWith(prefix) == false) {
    return;
  }
  if (message.content.startsWith(prefix + "eval")) {
    if (
      message.author.id == "742347739018297346" ||
      message.author.id == "894380953718390785"
    ) {
      eeval(message);
    }
  } else if (message.content.startsWith(prefix + "help")) {
    if (!args[1]) {
      return message.reply(
        "**__コマンド一覧だぞ__**" +
          " > **タイプ:ゲーム**　\n kanji think_typing \n > **タイプ:管理**　\n role_control role_pannel kick&ban mute control \n > **タイプ:その他**　\n list \n ネタ系はここにはかいてないよ"
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
  }
  else if(args[0]=="invite"){
    return message.reply({
      embeds:[{
        color:getRandomInt(),
        description:"公式サーバーだよ\nhttps://discord.gg/botbot.com"
      }]
    })
  }
  else if (args[0] == "kanji" || args[0] == "kanzi") {
    return message.reply({
      embeds: [
        {
          color: 334334,
          description:
            "kanjiコマンドだよ　\n タイプ:ゲーム　\n コマンド名:kanji　\n 短縮形:無し　\n 説明 \n 漢字パズルが5問のうちからランダムで出るよ。 \n もちろん未実装☆　\n 使い方 \n 'kannji"
        }
      ]
    });
  } else if (args[0] == "thinking_typing") {
    // args[1].match(/^(think_typing|t_t)$/)
    return message.reply(
      "think_typingコマンドだよ　\n タイプ:ゲーム \n コマンド名:think_typing \n 短縮形:t_t \n 説明 \n thinkingタイピング！！！（は？） \n もちろん未実装☆　\n 使い方 \n  'think_typing"
    );
  } else if (args[0] == "roll_control" || args[0] == "rc") {
    //これが一番基本 ok
    //上のやつみたいに//で囲んでまとめてあるのを正規表現っていう ok
    return message.reply("未実装");
  } else if (args[0] == "clear" || args[0] == "cl") {
    const num = args[1];
    if (num > 100) {
      message.reply("100件以上は対応するつもりはありません");
    } else if (num == null || num == undefined) {
      message.reply("何件消すか入力しろよ！！");
    } else {
      const deleteingmessages = message.channel.messages
        .fetch({ limit: num })
        .then(messages => {
          messages.forEach(async message => {
            await message.delete();
          });
        })
        .then(function() {
          message.channel.send(num + "件削除しました。");
        });
    }
    sousin = true;
  } else if (
    args[0] == "role_panel" ||
    args[0] == "rpanel" ||
    args[0] == "rp"
  ) {
    if (
      message.guild.members
        .resolve(process.env.BOTID)
        .permissions.has(Permissions.MANAGE_ROLES) == false ||
      message.guild.members
        .resolve(message.author.id)
        .permissions.has(Permissions.MANAGE_MESSAGES) != true
    ) {
      return message.reply("権限がないようです");
    }

    try {
      let rollids = [];
      const abcdefg = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      const emoji = [
        "🇦",
        "🇧",
        "🇨",
        "🇩",
        "🇪",
        "🇫",
        "🇬",
        "🇭",
        "🇮",
        "🇯",
        "🇰",
        "🇱",
        "🇲",
        "🇳",
        "🇴",
        "🇵",
        "🇶",
        "🇷",
        "🇸",
        "🇹",
        "🇺",
        "🇻",
        "🇼",
        "🇽",
        "🇾",
        "🇿"
      ];
      for (let i = 2; i < args.length; i++) {
        rollids.push(args[i]);
      }
      for (let i = 0; i < rollids.length; i++) {
        rollids[i] = rollids[i]
          .replace(/</g, "")
          .replace(/>/g, "")
          .replace(/@/g, "")
          .replace(/&/g, "");
      }
      console.log(rollids);
      let rollpanel_message = "";
      for (let i = 0; i < rollids.length; i++) {
        rollpanel_message +=
          ":regional_indicator_" + abcdefg[i] + ": <@&" + rollids[i] + ">\n";
      }
      const emb = {
        embeds: [
          {
            title: args[1],
            color: getRandomInt(),
            description: rollpanel_message
          }
        ]
      };

      const roll_panelmessage = await message.channel.send(emb);

      for (let i = 0; i < rollids.length; i++) {
        roll_panelmessage.react(emoji[i]);
      }
      fs.appendFileSync(
        "./rpanel.txt",
        "\n" + roll_panelmessage.id + "|" + roll_panelmessage.channel.id,
        "utf-8"
      );
      sousin = true;
    } catch (e) {
      console.log(e);
    }
  }

  if (sousin == false && message.content.startsWith(prefix)) {
    const options = {
      includeScore: true
    };
    const fuse = new Fuse(commandarray, options);
    let kensaku;
    if (message.content.slice(1, 5) == "help") {
      kensaku = message.content.slice(5);
    } else {
      kensaku = message.content.slice(1);
    }
    const result = fuse.search(kensaku);
    let yosou = "";
    for (let i = 0; i < result.length; i++) {
      if (i == 0) {
        yosou = result[i].item;
      } else {
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

client.login(process.env["TOKEN"]);

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
