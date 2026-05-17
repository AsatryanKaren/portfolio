/**
 * Escapes text for Telegram Bot API HTML parse mode (user-controlled fields).
 * @see https://core.telegram.org/bots/api#html-style
 */
export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatContactMessageHtml(fromName: string, message: string): string {
  const name = escapeTelegramHtml(fromName);
  const body = escapeTelegramHtml(message);
  return `<b>New contact message</b>\n<b>Name:</b> ${name}\n\n<b>Message:</b>\n${body}`;
}
