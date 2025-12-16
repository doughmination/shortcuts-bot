import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from 'discord.js';
import { SlashCommand } from '../types/Command';

const CRAZY_MESSAGE = 'Crazy?...\nI was crazy once...\nThey locked me in a room...\nA rubber room\nA rubber room of rats...\nAnd rats make me crazy...';

// Slash command: /crazy [user]
export const slashCommand: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('crazy')
        .setDescription('I was crazy once')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to annoy')
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const targetUser = interaction.options.getUser('user');

        if (targetUser) {
            await interaction.reply(`You know what ${targetUser}...\n${CRAZY_MESSAGE}`);
        } else {
            await interaction.reply(CRAZY_MESSAGE);
        }
    }
};

// Export all commands as an array for the command handler
export const commands = [slashCommand];