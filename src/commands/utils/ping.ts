import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    MessageFlags
} from 'discord.js';

export default {
    data: new SlashCommandSubcommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s latency'),

    async execute(interaction: ChatInputCommandInteraction) {
        const sent = await interaction.reply({ 
            content: 'Pinging...', 
            fetchReply: true,
            flags: MessageFlags.Ephemeral
        });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        await interaction.editReply(
            `🏓 Pong!\n` +
            `Roundtrip latency: ${latency}ms\n` +
            `WebSocket latency: ${apiLatency}ms`
        );
    }
};