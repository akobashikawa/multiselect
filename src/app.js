import { createApp } from 'vue';
import { App } from './components/App.js';

// Re-exportar para compatibilidad con tests existentes
export { CounterLogic as Counter, useCounter } from './components/Counter.js';

// Configuración de la aplicación Vue
const app = createApp(App);

// Solo montar si estamos en el navegador
if (typeof window !== 'undefined' && document.getElementById('app')) {
    app.mount('#app');
}

export default app;
