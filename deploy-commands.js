require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const CLIENT_ID = process.env.CLIENT_ID || "1575161201304932444";
const GUILD_ID = "1115707156835074208";

// Основной index.js регистрирует полный список команд при запуске.
// Этот файл оставлен как отдельная ручная регистрация базовых команд.
const commands = [
    new SlashCommandBuilder()
        .setName("all")
        .setDescription("Разослать сообщение участникам в личные сообщения")
        .addStringOption(option => option
            .setName("message")
            .setDescription("Текст сообщения")
            .setRequired(true)
        )
        .toJSON(),
    new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Отправить панель заявок")
        .addAttachmentOption(option => option
            .setName("image")
            .setDescription("Картинка для панели")
            .setRequired(true)
        )
        .toJSON()
];

if (!process.env.TOKEN) {
    console.error("Не найден TOKEN в .env");
    process.exit(1);
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Регистрация базовых slash-команд...");
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log("Базовые slash-команды зарегистрированы.");
    } catch (error) {
        console.error("Ошибка регистрации команд:", error);
        process.exitCode = 1;
    }
})();
