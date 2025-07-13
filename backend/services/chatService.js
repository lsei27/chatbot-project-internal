const OpenAI = require('openai');
const config = require('../../config/config');
const chatHistory = require('./chatHistoryService');

// Inicializace OpenAI klienta
const openai = new OpenAI({
    apiKey: config.openai.apiKey,
    organization: config.openai.organization
});

class ChatService {
    constructor() {
        this.assistantId = config.openai.assistantId;
        this.model = config.openai.model;
    }

    // Vytvořit nový thread
    async createThread() {
        try {
            console.log('Vytvářím thread u OpenAI...');
            const thread = await openai.beta.threads.create();
            console.log('Thread vytvořen:', thread);
            return thread;
        } catch (error) {
            console.error('Error creating thread:', error);
            throw new Error('Nepodařilo se vytvořit nový thread');
        }
    }

    // Odeslat zprávu asistentovi
    async sendMessage(message, threadId) {
        try {
            if (!threadId) {
                console.log('ThreadId není, vytvářím nový thread...');
                const thread = await this.createThread();
                threadId = thread.id;
            }

            console.log('Přidávám zprávu do threadu:', threadId);
            await openai.beta.threads.messages.create(
                threadId,
                {
                    role: "user",
                    content: message
                }
            );
            console.log('Zpráva přidána.');

            await chatHistory.saveMessage(threadId, 'user', message, new Date().toISOString());

            console.log('Spouštím run s asistentem:', this.assistantId);
            const run = await openai.beta.threads.runs.create(
                threadId,
                {
                    assistant_id: this.assistantId
                }
            );
            console.log('Run spuštěn:', run);

            // Počkat na dokončení run
            const result = await this.waitForRunCompletion(threadId, run.id);
            console.log('Run dokončen:', result);

            // Získat odpověď asistenta
            const messages = await openai.beta.threads.messages.list(threadId);
            console.log('OpenAI thread messages:', JSON.stringify(messages, null, 2));
            const assistantMessage = messages.data.find(msg => 
                msg.role === 'assistant' && 
                msg.run_id === run.id
            );

            if (assistantMessage) {
                await chatHistory.saveMessage(
                    threadId,
                    'assistant',
                    assistantMessage.content[0]?.text?.value || '',
                    new Date().toISOString()
                );
            } else {
                console.error('Žádná odpověď od asistenta! Celá OpenAI odpověď:', JSON.stringify(messages, null, 2));
            }

            return {
                threadId,
                userMessage: message,
                assistantMessage: assistantMessage?.content[0]?.text?.value || 'Nepodařilo se získat odpověď',
                runStatus: result.status
            };
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Nepodařilo se odeslat zprávu asistentovi');
        }
    }

    // Počkat na dokončení run
    async waitForRunCompletion(threadId, runId) {
        const maxAttempts = 30; // 30 sekund
        let attempts = 0;

        while (attempts < maxAttempts) {
            const run = await openai.beta.threads.runs.retrieve(threadId, runId);
            
            if (run.status === 'completed') {
                return run;
            } else if (run.status === 'failed' || run.status === 'cancelled') {
                throw new Error(`Run failed with status: ${run.status}`);
            }

            // Počkat 1 sekundu před dalším pokusem
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
        }

        throw new Error('Timeout waiting for run completion');
    }

    // Získat zprávy z threadu
    async getThreadMessages(threadId) {
        try {
            return await chatHistory.getMessagesByThread(threadId);
        } catch (error) {
            console.error('Error getting thread messages:', error);
            throw new Error('Nepodařilo se získat zprávy z threadu');
        }
    }
}

// --- ZMĚNA ZDE ---
// Exportujeme třídu (šablonu), nikoli její instanci.
module.exports = ChatService;