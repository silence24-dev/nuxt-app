export const useChatStore = defineStore('chat', {
	state() {
		return {
			messages: [{ id: 1, author: 'Поддержка', text: 'Добро пожаловать в чат!' }],
		};
	},
	actions: {
		addMessage(message) {
			console.log('Сообщение добавлено:', message);
			this.messages.push(message);
		},
	},
});
