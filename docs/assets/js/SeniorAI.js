document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const greetingElement = document.getElementById('greeting');

    // Configurar el saludo según la hora
    setGreetingByTime();

    // Verificar si hay alguna sugerencia predictiva visible
    let activeSuggestion = null;

    // Configurar eventos
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Ajustar automáticamente la altura del textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight > 200 ? 200 : this.scrollHeight) + 'px';
    });

    // Configurar botones de sugerencia
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'More') {
                // Lógica para mostrar más opciones
                showMoreOptions();
            } else {
                userInput.value = this.textContent;
                sendMessage();
            }
        });
    });

    // Función para establecer el saludo según la hora
    function setGreetingByTime() {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good Morning, Paralegal';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Good Afternoon, Paralegal';
        } else {
            greeting = 'Good Evening, Paralegal';
        }
        
        greetingElement.textContent = greeting;
    }

    // Función para mostrar más opciones
    function showMoreOptions() {
        const moreOptions = [
            'Redactar documento legal',
            'Buscar jurisprudencia',
            'Explicar término legal',
            'Crear plantilla para notificación'
        ];
        
        // Limpiar sugerencias existentes
        const existingSuggestions = document.querySelectorAll('.predictive-suggestion');
        existingSuggestions.forEach(suggestion => suggestion.remove());
        
        // Crear y mostrar nuevas sugerencias
        moreOptions.forEach(option => {
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'predictive-suggestion';
            suggestionElement.textContent = option;
            suggestionElement.addEventListener('click', function() {
                userInput.value = this.textContent;
                sendMessage();
                
                // Eliminar todas las sugerencias
                document.querySelectorAll('.predictive-suggestion').forEach(el => el.remove());
            });
            
            chatMessages.appendChild(suggestionElement);
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Función para enviar mensaje
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Eliminar todas las sugerencias predictivas si existen
        document.querySelectorAll('.predictive-suggestion').forEach(el => el.remove());
        
        // Añadir mensaje del usuario
        addMessage(message, 'user');
        
        // Limpiar input y resetear altura
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Simular procesamiento (en producción, aquí iría la llamada a la API)
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            processUserMessage(message);
        }, 1000);
    }

    // Función para añadir un mensaje al chat
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = content;
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mostrar indicador de escritura
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = '<span>●</span><span>●</span><span>●</span>';
        typingDiv.id = 'typing-indicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remover indicador de escritura
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Función para procesar el mensaje del usuario - MODIFICADA
    async function processUserMessage(message) {
        try {
            // Usar la API real de OpenAI en lugar de simular
            const response = await getAIResponse(message);
            addMessage(response, 'ai');
            
            // Solo después de la primera interacción, cambiamos el encabezado
            if (greetingElement.textContent.includes('Morning') || 
                greetingElement.textContent.includes('Afternoon') || 
                greetingElement.textContent.includes('Evening')) {
                greetingElement.textContent = "¿En qué más puedo ayudarte?";
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Lo siento, ha ocurrido un error al procesar tu solicitud.', 'ai');
        }
    }

    // Función para obtener respuesta de la API de OpenAI - DESCOMENTADA Y MODIFICADA
    async function getAIResponse(userMessage) {
        try {
            const OpenAI = await import("openai");
            const client = new OpenAI({
                apiKey: 'TU_API_KEY_AQUI' // ¡Reemplaza con tu API key real!
            });
            
            const completion = await client.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "Eres un asistente especializado en temas legales para paralegales. Proporciona información precisa y útil sobre procedimientos legales, terminología, y mejores prácticas."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
            });
            
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error al comunicarse con OpenAI:', error);
            throw error;
        }
    }

    // Función para simular la respuesta de la API - MANTENIDA COMO BACKUP
    function simulateAIResponse(message) {
        return new Promise((resolve) => {
            // Respuestas predefinidas para demostración
            const legalTerms = {
                'demanda': 'Una demanda es una reclamación formal presentada ante un tribunal por la cual un demandante busca un recurso legal.',
                'audiencia': 'Una audiencia es un procedimiento ante un juez o tribunal en el que las partes presentan argumentos y evidencias.',
                'moción': 'Una moción es una solicitud formal a un juez para que emita una orden o resolución.',
                'descubrimiento': 'El descubrimiento es el proceso previo al juicio durante el cual las partes intercambian información y pruebas.'
            };
            
            // Verificar si el mensaje contiene algún término legal conocido
            const lowerMessage = message.toLowerCase();
            for (const term in legalTerms) {
                if (lowerMessage.includes(term)) {
                    return resolve(legalTerms[term]);
                }
            }
            
            // Respuesta genérica si no se encontró un término específico
            if (lowerMessage.includes('hola') || lowerMessage.includes('saludos')) {
                return resolve('Hola, ¿en qué puedo ayudarte con tus tareas paralegales hoy?');
            } else if (lowerMessage.includes('gracias')) {
                return resolve('De nada. Estoy aquí para ayudarte con cualquier otra consulta legal que tengas.');
            } else if (lowerMessage.includes('ayuda') || lowerMessage.includes('asistencia')) {
                return resolve('Puedo ayudarte con la redacción de documentos legales, investigación de jurisprudencia, organización de expedientes, y más. ¿Qué necesitas específicamente?');
            } else if (lowerMessage.includes('search with seniorai')) {
                return resolve('Iniciando búsqueda... Puedo buscar en bases de datos legales, jurisprudencia y códigos para encontrar información relevante para tu caso.');
            } else if (lowerMessage.includes('talk with seniorai')) {
                return resolve('Estoy listo para conversar y ayudarte con cualquier consulta legal. ¿Sobre qué tema específico necesitas asesoría?');
            } else if (lowerMessage.includes('research')) {
                return resolve('Modo investigación activado. Puedo ayudarte a recopilar información para casos, precedentes legales, y análisis de documentos. ¿Qué tema necesitas investigar?');
            } else {
                // En un entorno real, aquí se enviaría el mensaje a la API de OpenAI
                resolve(`Como asistente paralegal, te puedo informar que tu consulta sobre "${message}" requiere análisis. En un sistema completo, esto sería procesado por la API de OpenAI. ¿Puedes proporcionar más detalles sobre tu consulta legal?`);
            }
        });
    }

    // Inicializar el chat con un mensaje de bienvenida después de un breve retraso
    setTimeout(() => {
        addMessage('Hi, Im Senior AI. I specialize in paralegal assistance. How can I help you today?', 'ai');
    }, 500);
});