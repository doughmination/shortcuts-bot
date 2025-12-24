import {
  SlashCommandSubcommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags
} from 'discord.js';
import axios from 'axios';

const data = new SlashCommandSubcommandBuilder()
  .setName('usercheck')
  .setDescription('Check if a Hytale username is available')
  .addStringOption(option =>
    option
      .setName('username')
      .setDescription('The username to check')
      .setRequired(true)
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const username = interaction.options.getString('username', true);

  try {
    const res = await axios.get(
      `https://api.hytl.tools/check/${encodeURIComponent(username)}`,
      { timeout: 5000 }
    );

    const { status, cached } = res.data as {
      status: 'available' | 'taken' | 'reserved' | string;
      cached: boolean;
    };

    let title: string;
    let description: string;
    let color: number;

    switch (status) {
      case 'available':
        title = '✅ Username Available';
        description = `**${username}** is available to claim.`;
        color = 0x57f287; // green
        break;

      case 'taken':
        title = '❌ Username Taken';
        description = `**${username}** is already taken.`;
        color = 0xed4245; // red
        break;

      case 'reserved':
        title = '⚠️ Username Reserved';
        description = `**${username}** is reserved and cannot be claimed.`;
        color = 0xfee75c; // yellow
        break;

      default:
        title = '❓ Unknown Status';
        description = `Received unexpected status: \`${status}\``;
        color = 0x95a5a6; // gray
        break;
    }

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setFooter({
        text: cached ? 'Result from cache' : 'Live result'
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    console.error(err);
    await interaction.editReply(
      '⚠️ Failed to check username. Please try again later.'
    );
  }
}

export default {
  data,
  execute
};