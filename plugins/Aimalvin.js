const { casper } = require('../casper');
const axios = require('axios');

casper({
    pattern: "Casperai",
    alias: ["aiimg", "generateimg", "aiimage", "Casperai"],
    desc: "Generate AI Images using Stable Diffusion",
    category: "ai",
    react: "🤖",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            const txt = `
*⛩️ CASPER AI IMAGE GENERATOR*

Generate AI art based on your description.

✦ 𝖴𝗌𝖺𝗀𝖾:  *.casperai <description>*
✦ 𝖤𝗑𝖺𝗆𝗉𝗅𝖾:  *.casperai A glowing dragon flying over a neon city*

*Try one of the styles below:*
            `.trim();

            const buttons = [
                { buttonId: `.casperai cyberpunk samurai in rain`, buttonText: { displayText: "Cyberpunk Samurai" }, type: 1 },
                { buttonId: `.casperai anime girl in forest`, buttonText: { displayText: "Anime Girl" }, type: 1 },
                { buttonId: `.casperai realistic galaxy landscape`, buttonText: { displayText: "Galaxy Landscape" }, type: 1 }
            ];

            return await conn.sendMessage(from, {
                image: { url: "https://files.catbox.moe/7hqhsw.jpg" },
                caption: txt,
                footer: "Choose a preset or type your own prompt.",
                buttons: buttons,
                headerType: 4,
                mentions: [m.sender]
            }, { quoted: mek });
        }

        await m.react("🔄");

        const apiUrl = `https://api.davidcyriltech.my.id/diffusion?prompt=${encodeURIComponent(q)}`;
        const response = await axios({
            method: 'get',
            url: apiUrl,
            responseType: 'arraybuffer',
            timeout: 60000
        });

        if (!response.data) return reply("❌ Failed to generate image. No data received.");

        await conn.sendMessage(from, {
            image: response.data,
            caption: `
*🖼️ CASPER ᴀɪ ɪᴍᴀɢᴇ ɢᴇɴᴇʀᴀᴛᴏʀ*

⟡ 𝙋𝙧𝙤𝙢𝙥𝙩:  ${q}
⟡ 𝙈𝙤𝙙𝙚𝙡: Stable Diffusion v2.1
⟡ 𝙍𝙚𝙨𝙪𝙡𝙩: Image successfully generated.

> *Powered by CasperAI*
            `.trim(),
            quoted: mek
        });

        await m.react("✅");

    } catch (error) {
        console.error("MalvinAI Error:", error);
        await m.react("❌");

        if (error.response) {
            if (error.response.status === 429) return reply("⏳ Too many requests. Try again soon.");
            if (error.response.status === 500) return reply("🚫 AI server error. Try later.");
            return reply(`❌ Error ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
            return reply("🌐 No response from server. Check connection.");
        } else {
            return reply(`❌ Unexpected Error: ${error.message}`);
        }
    }
});
