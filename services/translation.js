class TranslationService {
    constructor() {
        this.baseUrl = 'http://47.101.144.137:11434/api';
        this.model = 'translater:latest';
    }

    async translate(text) {
        try {
            const response = await fetch(`${this.baseUrl}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    prompt: text,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Translation error:', error);
            throw new Error('翻译服务暂时不可用，请稍后重试');
        }
    }
}

// 创建全局翻译服务实例
window.translationService = new TranslationService();
