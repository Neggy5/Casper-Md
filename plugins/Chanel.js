const { casper } = require('../casper');

// Official Links
const CHANNEL_LINK = "https://whatsapp.com/channel/0029VaySwxF9Bb67U6rkUB2i";
const SUPPORT_LINK = "https://chat.whatsapp.com/Ij8D2TyoMIo1LhF79m6Z0Y";

/**
 * 🟢 Command: Channel
 * 📢 Get the official Casper channel link
 */
malvin({
    pattern: "channel",
    desc: "Get the official Casper WhatsApp Channel link.",
    react: "🚀",
    category: "support",
    use: ".channel",
    filename: __filename,
}, async (_, mek, __, { reply }) => {
    try {
        reply(
            `🎉 *Welcome to the CASPER-MD Official Channel!*\n\n` +
            `🔥 Stay ahead with exclusive updates, new features, and exciting announcements.\n\n` +
            `🔗 *Join Now:* ${CHANNEL_LINK}\n\n` +
            `_Tap the link above and be part of something amazing!_ 🚀`
        );
    } catch (error) {
        console.error("❌ Error fetching channel link:", error.message);
        reply("⚠️ Oops! I couldn't fetch the channel link. Try again later.");
    }
});

/**
 * 🟢 Command: Support
 * 🛠️ Get help & join the Casper support group
 */
malvin({
    pattern: "support",
    desc: "Join the Casper-MD Support Group for assistance.",
    react: "💡",
    category: "support",
    use: ".support",
    filename: __filename,
}, async (_, mek, __, { reply }) => {
    try {
        reply(
            `🤝 *Welcome to the CASPER-MD Support Hub!*\n\n` +
            `🛠️ Have questions? Facing issues? Or just want to connect with fellow users?\n` +
            `💬 Join our *official support group* where you can ask for help and share feedback.\n\n` +
            `🔗 *Join Here:* ${SUPPORT_LINK}\n\n` +
            `_Your voice matters! Let’s make MALVIN-XD even better together._ 🌟`
        );
    } catch (error) {
        console.error("❌ Error fetching support link:", error.message);
        reply("⚠️ Oops! Something went wrong while fetching the support link. Try again later.");
    }
});
