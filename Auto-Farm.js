(async () => {
  // Enhanced configuration with more options
  const CONFIG = {
    START_X: 742,
    START_Y: 1148,
    PIXELS_PER_LINE: 100,
    DELAY: 1000,
    MIN_DELAY: 500,
    MAX_DELAY: 2000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 2000,
    PATTERN_MODES: {
      RANDOM: 'random',
      SPIRAL: 'spiral',
      GRID: 'grid',
      CUSTOM: 'custom'
    },
    THEME: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      accent: '#775ce3',
      text: '#ffffff',
      highlight: '#a855f7',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    },
    STORAGE_KEY: 'wplace-autofarm-config'
  };

  // Enhanced state management
  const state = {
    running: false,
    paused: false,
    paintedCount: 0,
    failedAttempts: 0,
    charges: { count: 0, max: 80, cooldownMs: 30000 },
    userInfo: null,
    lastPixel: null,
    minimized: false,
    menuOpen: false,
    language: 'en',
    patternMode: CONFIG.PATTERN_MODES.RANDOM,
    customColors: [1, 2, 3, 4, 5],
    statistics: {
      startTime: null,
      totalRuntime: 0,
      pixelsPerHour: 0,
      successRate: 0
    },
    settings: {
      enableLogging: true,
      enableSound: false,
      smartDelay: true,
      adaptiveMode: false
    }
  };

  // Enhanced utility functions
  const utils = {
    sleep: ms => new Promise(r => setTimeout(r, ms)),
    
    random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    formatTime: ms => {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    },
    
    log: (message, type = 'info') => {
      if (!state.settings.enableLogging) return;
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
    },
    
    saveConfig: () => {
      try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({
          patternMode: state.patternMode,
          customColors: state.customColors,
          settings: state.settings
        }));
      } catch (e) {
        utils.log('Failed to save config', 'error');
      }
    },
    
    loadConfig: () => {
      try {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (saved) {
          const config = JSON.parse(saved);
          Object.assign(state, config);
        }
      } catch (e) {
        utils.log('Failed to load config', 'error');
      }
    },
    
    playSound: (type) => {
      if (!state.settings.enableSound) return;
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        const frequencies = { success: 800, error: 400, warning: 600 };
        oscillator.frequency.value = frequencies[type] || 500;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.3);
      } catch (e) {
        // Audio context not supported
      }
    }
  };

  // Enhanced API functions with retry logic
  const api = {
    fetchWithRetry: async (url, options = {}, retries = CONFIG.RETRY_ATTEMPTS) => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(url, {
            credentials: 'include',
            timeout: 10000,
            ...options
          });
          
          if (!res.ok && res.status >= 500) {
            throw new Error(`Server error: ${res.status}`);
          }
          
          return await res.json();
        } catch (e) {
          utils.log(`API request failed (attempt ${i + 1}/${retries}): ${e.message}`, 'warning');
          
          if (i === retries - 1) {
            utils.log(`All retry attempts failed for ${url}`, 'error');
            return null;
          }
          
          await utils.sleep(CONFIG.RETRY_DELAY * (i + 1));
        }
      }
    },
    
    getCharge: async () => {
      const data = await api.fetchWithRetry('https://backend.wplace.live/me');
      if (data) {
        state.userInfo = data;
        state.charges = {
          count: Math.floor(data.charges?.count || 0),
          max: Math.floor(data.charges?.max || 80),
          cooldownMs: data.charges?.cooldownMs || 30000
        };
        if (state.userInfo.level) {
          state.userInfo.level = Math.floor(state.userInfo.level);
        }
        utils.log(`Charges updated: ${state.charges.count}/${state.charges.max}`, 'info');
      }
      return state.charges;
    },
    
    paintPixel: async (x, y, color) => {
      const result = await api.fetchWithRetry(
        `https://backend.wplace.live/s0/pixel/${CONFIG.START_X + x}/${CONFIG.START_Y + y}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: JSON.stringify({ coords: [x, y], colors: [color] })
        }
      );
      
      return result;
    }
  };

  // Enhanced pattern generation
  const patterns = {
    random: () => ({
      x: utils.random(0, CONFIG.PIXELS_PER_LINE - 1),
      y: utils.random(0, CONFIG.PIXELS_PER_LINE - 1)
    }),
    
    spiral: (() => {
      let angle = 0;
      let radius = 1;
      const center = CONFIG.PIXELS_PER_LINE / 2;
      
      return () => {
        const x = Math.floor(center + radius * Math.cos(angle));
        const y = Math.floor(center + radius * Math.sin(angle));
        
        angle += 0.2;
        if (angle > 2 * Math.PI) {
          angle = 0;
          radius += 2;
          if (radius > center) radius = 1;
        }
        
        return {
          x: Math.max(0, Math.min(CONFIG.PIXELS_PER_LINE - 1, x)),
          y: Math.max(0, Math.min(CONFIG.PIXELS_PER_LINE - 1, y))
        };
      };
    })(),
    
    grid: (() => {
      let x = 0;
      let y = 0;
      const step = 5;
      
      return () => {
        const pos = { x, y };
        x += step;
        if (x >= CONFIG.PIXELS_PER_LINE) {
          x = 0;
          y += step;
          if (y >= CONFIG.PIXELS_PER_LINE) {
            y = 0;
          }
        }
        return pos;
      };
    })(),
    
    getPosition: () => {
      const generator = patterns[state.patternMode] || patterns.random;
      return generator();
    },
    
    getColor: () => {
      if (state.customColors.length > 0) {
        return state.customColors[Math.floor(Math.random() * state.customColors.length)];
      }
      return utils.random(1, 31);
    }
  };

  // Enhanced location detection with more countries
  const detectUserLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const languageMap = {
        'BR': 'pt',
        'PT': 'pt',
        'US': 'en',
        'GB': 'en',
        'CA': 'en',
        'AU': 'en',
        'FR': 'fr',
        'ES': 'es',
        'DE': 'de',
        'IT': 'it',
        'RU': 'ru',
        'NL': 'nl',
        'UA': 'uk'
      };
      
      state.language = languageMap[data.country] || 'en';
      utils.log(`Detected location: ${data.country}, language: ${state.language}`, 'info');
    } catch {
      state.language = 'en';
      utils.log('Failed to detect location, using English', 'warning');
    }
  };

  // Enhanced statistics calculation
  const updateStatistics = () => {
    if (!state.statistics.startTime) return;
    
    const now = Date.now();
    const runtime = now - state.statistics.startTime;
    state.statistics.totalRuntime = runtime;
    
    const hoursRunning = runtime / (1000 * 60 * 60);
    state.statistics.pixelsPerHour = hoursRunning > 0 ? Math.round(state.paintedCount / hoursRunning) : 0;
    
    const totalAttempts = state.paintedCount + state.failedAttempts;
    state.statistics.successRate = totalAttempts > 0 ? Math.round((state.paintedCount / totalAttempts) * 100) : 0;
  };

  // Enhanced main painting loop with better error handling
  const paintLoop = async () => {
    state.statistics.startTime = Date.now();
    utils.log('Starting paint loop', 'info');
    
    while (state.running) {
      try {
        if (state.paused) {
          await utils.sleep(1000);
          continue;
        }
        
        const { count, cooldownMs } = state.charges;
        
        if (count < 1) {
          const waitTime = Math.ceil(cooldownMs / 1000);
          updateUI(getTranslation(`noCharges`, waitTime), 'warning');
          utils.log(`No charges available, waiting ${waitTime}s`, 'info');
          
          await utils.sleep(cooldownMs);
          await api.getCharge();
          continue;
        }

        const position = patterns.getPosition();
        const color = patterns.getColor();
        
        updateUI(getTranslation('painting'), 'info');
        const paintResult = await api.paintPixel(position.x, position.y, color);
        
        if (paintResult?.painted === 1) {
          state.paintedCount++;
          state.lastPixel = { 
            x: CONFIG.START_X + position.x,
            y: CONFIG.START_Y + position.y,
            color: color,
            time: new Date() 
          };
          state.charges.count--;
          
          // Visual feedback
          const paintEffect = document.getElementById('paintEffect');
          if (paintEffect) {
            paintEffect.style.animation = 'pulse 0.5s';
            setTimeout(() => paintEffect.style.animation = '', 500);
          }
          
          updateUI(getTranslation('pixelPainted'), 'success');
          utils.log(`Pixel painted at (${position.x}, ${position.y}) with color ${color}`, 'success');
          utils.playSound('success');
          
        } else {
          state.failedAttempts++;
          updateUI(getTranslation('paintFailed'), 'error');
          utils.log(`Failed to paint pixel at (${position.x}, ${position.y})`, 'error');
          utils.playSound('error');
        }

        // Smart delay adjustment
        let delay = CONFIG.DELAY;
        if (state.settings.smartDelay) {
          delay = utils.random(CONFIG.MIN_DELAY, CONFIG.MAX_DELAY);
        }
        
        // Adaptive delay based on success rate
        if (state.settings.adaptiveMode && state.statistics.successRate < 50) {
          delay *= 1.5;
        }
        
        await utils.sleep(delay);
        updateStatistics();
        updateStats();
        
      } catch (error) {
        utils.log(`Paint loop error: ${error.message}`, 'error');
        updateUI(getTranslation('error'), 'error');
        await utils.sleep(5000);
      }
    }
    
    utils.log('Paint loop stopped', 'info');
  };

  // Enhanced translations with more languages
  const translations = {
    en: {
      title: "WPlace Auto-Farm Pro",
      start: "Start",
      stop: "Stop",
      pause: "Pause",
      resume: "Resume",
      settings: "Settings",
      ready: "Ready to start",
      user: "User",
      pixels: "Pixels",
      charges: "Charges",
      level: "Level",
      runtime: "Runtime",
      pixelsPerHour: "Pixels/Hour",
      successRate: "Success Rate",
      pattern: "Pattern",
      colors: "Colors",
      noCharges: "⌛ No charges. Waiting {0}s...",
      painting: "🎨 Painting...",
      pixelPainted: "✅ Pixel painted!",
      paintFailed: "❌ Failed to paint",
      error: "❌ Error occurred",
      started: "🚀 Painting started!",
      paused: "⏸️ Painting paused",
      stopped: "⏹️ Painting stopped",
      loading: "Loading..."
    },
    pt: {
      title: "WPlace Auto-Farm Pro",
      start: "Iniciar",
      stop: "Parar",
      pause: "Pausar",
      resume: "Continuar",
      settings: "Configurações",
      ready: "Pronto para começar",
      user: "Usuário",
      pixels: "Pixels",
      charges: "Cargas",
      level: "Level",
      runtime: "Tempo Ativo",
      pixelsPerHour: "Pixels/Hora",
      successRate: "Taxa de Sucesso",
      pattern: "Padrão",
      colors: "Cores",
      noCharges: "⌛ Sem cargas. Esperando {0}s...",
      painting: "🎨 Pintando...",
      pixelPainted: "✅ Pixel pintado!",
      paintFailed: "❌ Falha ao pintar",
      error: "❌ Erro ocorreu",
      started: "🚀 Pintura iniciada!",
      paused: "⏸️ Pintura pausada",
      stopped: "⏹️ Pintura parada",
      loading: "Carregando..."
    }
  };

  const getTranslation = (key, ...args) => {
    let text = translations[state.language]?.[key] || translations.en[key] || key;
    args.forEach((arg, index) => {
      text = text.replace(`{${index}}`, arg);
    });
    return text;
  };

  // Enhanced UI creation with more features
  const createUI = () => {
    if (state.menuOpen) return;
    state.menuOpen = true;

    // Load Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(fontAwesome);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .wplace-bot-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 280px;
        background: ${CONFIG.THEME.primary};
        border: 1px solid ${CONFIG.THEME.accent};
        border-radius: 12px;
        padding: 0;
        box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        z-index: 99999;
        font-family: 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        color: ${CONFIG.THEME.text};
        animation: slideIn 0.4s ease-out;
        overflow: hidden;
        backdrop-filter: blur(10px);
      }
      .wplace-header {
        padding: 15px;
        background: linear-gradient(135deg, ${CONFIG.THEME.secondary}, ${CONFIG.THEME.accent});
        color: ${CONFIG.THEME.text};
        font-size: 16px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        user-select: none;
      }
      .wplace-header-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wplace-header-controls {
        display: flex;
        gap: 8px;
      }
      .wplace-header-btn {
        background: rgba(255,255,255,0.1);
        border: none;
        color: ${CONFIG.THEME.text};
        cursor: pointer;
        padding: 6px 8px;
        border-radius: 6px;
        transition: all 0.2s;
        opacity: 0.8;
      }
      .wplace-header-btn:hover {
        opacity: 1;
        background: rgba(255,255,255,0.2);
        transform: scale(1.1);
      }
      .wplace-content {
        padding: 15px;
        display: ${state.minimized ? 'none' : 'block'};
      }
      .wplace-controls {
        display: flex;
        gap: 8px;
        margin-bottom: 15px;
      }
      .wplace-btn {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.3s;
        font-size: 13px;
      }
      .wplace-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }
      .wplace-btn-primary {
        background: linear-gradient(135deg, ${CONFIG.THEME.accent}, ${CONFIG.THEME.highlight});
        color: white;
      }
      .wplace-btn-stop {
        background: linear-gradient(135deg, ${CONFIG.THEME.error}, #dc2626);
        color: white;
      }
      .wplace-btn-pause {
        background: linear-gradient(135deg, ${CONFIG.THEME.warning}, #d97706);
        color: white;
      }
      .wplace-btn-secondary {
        background: ${CONFIG.THEME.secondary};
        color: ${CONFIG.THEME.text};
        border: 1px solid ${CONFIG.THEME.accent};
      }
      .wplace-stats {
        background: ${CONFIG.THEME.secondary};
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .wplace-stat-item {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        font-size: 13px;
      }
      .wplace-stat-label {
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0.9;
      }
      .wplace-stat-value {
        font-weight: 600;
        color: ${CONFIG.THEME.accent};
      }
      .wplace-status {
        padding: 10px;
        border-radius: 8px;
        text-align: center;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .status-default {
        background: rgba(255,255,255,0.1);
        color: ${CONFIG.THEME.text};
      }
      .status-success {
        background: rgba(16, 185, 129, 0.15);
        color: ${CONFIG.THEME.success};
        border: 1px solid rgba(16, 185, 129, 0.3);
      }
      .status-error {
        background: rgba(239, 68, 68, 0.15);
        color: ${CONFIG.THEME.error};
        border: 1px solid rgba(239, 68, 68, 0.3);
      }
      .status-warning {
        background: rgba(245, 158, 11, 0.15);
        color: ${CONFIG.THEME.warning};
        border: 1px solid rgba(245, 158, 11, 0.3);
      }
      .status-info {
        background: rgba(59, 130, 246, 0.15);
        color: ${CONFIG.THEME.info};
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      #paintEffect {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: 12px;
      }
      .wplace-settings {
        margin-top: 10px;
        padding: 12px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .wplace-setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
        font-size: 12px;
      }
      .wplace-toggle {
        position: relative;
        width: 40px;
        height: 20px;
        background: rgba(255,255,255,0.2);
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s;
      }
      .wplace-toggle.active {
        background: ${CONFIG.THEME.accent};
      }
      .wplace-toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s;
      }
      .wplace-toggle.active::after {
        transform: translateX(20px);
      }
    `;
    document.head.appendChild(style);

    const t = getTranslation;

    const panel = document.createElement('div');
    panel.className = 'wplace-bot-panel';
    panel.innerHTML = `
      <div id="paintEffect"></div>
      <div class="wplace-header">
        <div class="wplace-header-title">
          <i class="fas fa-palette"></i>
          <span>${t('title')}</span>
        </div>
        <div class="wplace-header-controls">
          <button id="settingsBtn" class="wplace-header-btn" title="${t('settings')}">
            <i class="fas fa-cog"></i>
          </button>
          <button id="minimizeBtn" class="wplace-header-btn" title="Minimize">
            <i class="fas fa-${state.minimized ? 'expand' : 'minus'}"></i>
          </button>
        </div>
      </div>
      <div class="wplace-content">
        <div class="wplace-controls">
          <button id="toggleBtn" class="wplace-btn wplace-btn-primary">
            <i class="fas fa-play"></i>
            <span>${t('start')}</span>
          </button>
          <button id="pauseBtn" class="wplace-btn wplace-btn-pause" style="display: none;">
            <i class="fas fa-pause"></i>
            <span>${t('pause')}</span>
          </button>
        </div>
        
        <div id="statusText" class="wplace-status status-default">
          ${t('ready')}
        </div>
        
        <div class="wplace-stats">
          <div id="statsArea">
            <div class="wplace-stat-item">
              <div class="wplace-stat-label">
                <i class="fas fa-spinner fa-spin"></i> 
                ${t('loading')}
              </div>
            </div>
          </div>
        </div>
        
        <div id="settingsPanel" class="wplace-settings" style="display: none;">
          <div class="wplace-setting-item">
            <span>Smart Delay</span>
            <div class="wplace-toggle ${state.settings.smartDelay ? 'active' : ''}" data-setting="smartDelay"></div>
          </div>
          <div class="wplace-setting-item">
            <span>Enable Sound</span>
            <div class="wplace-toggle ${state.settings.enableSound ? 'active' : ''}" data-setting="enableSound"></div>
          </div>
          <div class="wplace-setting-item">
            <span>Adaptive Mode</span>
            <div class="wplace-toggle ${state.settings.adaptiveMode ? 'active' : ''}" data-setting="adaptiveMode"></div>
          </div>
          <div class="wplace-setting-item">
            <span>Enable Logging</span>
            <div class="wplace-toggle ${state.settings.enableLogging ? 'active' : ''}" data-setting="enableLogging"></div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    setupEventListeners(panel);
  };

  // Enhanced event listeners
  const setupEventListeners = (panel) => {
    const header = panel.querySelector('.wplace-header');
    const toggleBtn = panel.querySelector('#toggleBtn');
    const pauseBtn = panel.querySelector('#pauseBtn');
    const minimizeBtn = panel.querySelector('#minimizeBtn');
    const settingsBtn = panel.querySelector('#settingsBtn');
    const content = panel.querySelector('.wplace-content');
    const settingsPanel = panel.querySelector('#settingsPanel');
    
    // Dragging functionality
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    header.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      if (e.target.closest('.wplace-header-btn')) return;
      
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      const newTop = panel.offsetTop - pos2;
      const newLeft = panel.offsetLeft - pos1;
      
      // Boundary checking
      const maxTop = window.innerHeight - panel.offsetHeight;
      const maxLeft = window.innerWidth - panel.offsetWidth;
      
      panel.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";
      panel.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
    }
    
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    
    // Control buttons
    toggleBtn.addEventListener('click', () => {
      if (state.running) {
        stopPainting();
      } else {
        startPainting();
      }
    });
    
    pauseBtn.addEventListener('click', () => {
      state.paused = !state.paused;
      const t = getTranslation;
      
      if (state.paused) {
        pauseBtn.innerHTML = `<i class="fas fa-play"></i> <span>${t('resume')}</span>`;
        updateUI(t('paused'), 'warning');
        utils.log('Painting paused', 'info');
      } else {
        pauseBtn.innerHTML = `<i class="fas fa-pause"></i> <span>${t('pause')}</span>`;
        updateUI(t('painting'), 'info');
        utils.log('Painting resumed', 'info');
      }
    });
    
    minimizeBtn.addEventListener('click', () => {
      state.minimized = !state.minimized;
      content.style.display = state.minimized ? 'none' : 'block';
      minimizeBtn.innerHTML = `<i class="fas fa-${state.minimized ? 'expand' : 'minus'}"></i>`;
    });
    
    settingsBtn.addEventListener('click', () => {
      const isVisible = settingsPanel.style.display !== 'none';
      settingsPanel.style.display = isVisible ? 'none' : 'block';
      settingsBtn.style.background = isVisible ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)';
    });
    
    // Settings toggles
    panel.querySelectorAll('.wplace-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const setting = toggle.dataset.setting;
        state.settings[setting] = !state.settings[setting];
        toggle.classList.toggle('active', state.settings[setting]);
        utils.saveConfig();
        utils.log(`Setting ${setting} changed to ${state.settings[setting]}`, 'info');
      });
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      if (state.running) {
        utils.saveConfig();
      }
      state.menuOpen = false;
    });
  };

  const startPainting = () => {
    const t = getTranslation;
    const toggleBtn = document.querySelector('#toggleBtn');
    const pauseBtn = document.querySelector('#pauseBtn');
    
    state.running = true;
    state.paused = false;
    
    toggleBtn.innerHTML = `<i class="fas fa-stop"></i> <span>${t('stop')}</span>`;
    toggleBtn.classList.remove('wplace-btn-primary');
    toggleBtn.classList.add('wplace-btn-stop');
    
    pauseBtn.style.display = 'block';
    pauseBtn.innerHTML = `<i class="fas fa-pause"></i> <span>${t('pause')}</span>`;
    
    updateUI(t('started'), 'success');
    utils.log('Auto-farm started', 'success');
    utils.playSound('success');
    paintLoop();
  };

  const stopPainting = () => {
    const t = getTranslation;
    const toggleBtn = document.querySelector('#toggleBtn');
    const pauseBtn = document.querySelector('#pauseBtn');
    
    state.running = false;
    state.paused = false;
    
    toggleBtn.innerHTML = `<i class="fas fa-play"></i> <span>${t('start')}</span>`;
    toggleBtn.classList.add('wplace-btn-primary');
    toggleBtn.classList.remove('wplace-btn-stop');
    
    pauseBtn.style.display = 'none';
    
    updateUI(t('stopped'), 'default');
    utils.log('Auto-farm stopped', 'info');
    utils.saveConfig();
  };

  // Enhanced UI update functions
  window.updateUI = (message, type = 'default') => {
    const statusText = document.querySelector('#statusText');
    if (statusText) {
      statusText.textContent = message;
      statusText.className = `wplace-status status-${type}`;
      statusText.style.animation = 'none';
      void statusText.offsetWidth;
      statusText.style.animation = 'fadeIn 0.3s ease-out';
    }
  };

  window.updateStats = async () => {
    await api.getCharge();
    const statsArea = document.querySelector('#statsArea');
    if (statsArea) {
      const t = getTranslation;
      
      statsArea.innerHTML = `
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-user"></i> ${t('user')}</div>
          <div class="wplace-stat-value">${state.userInfo?.name || 'Unknown'}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-paint-brush"></i> ${t('pixels')}</div>
          <div class="wplace-stat-value">${state.paintedCount}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-bolt"></i> ${t('charges')}</div>
          <div class="wplace-stat-value">${Math.floor(state.charges.count)}/${Math.floor(state.charges.max)}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-star"></i> ${t('level')}</div>
          <div class="wplace-stat-value">${state.userInfo?.level || '0'}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-clock"></i> ${t('runtime')}</div>
          <div class="wplace-stat-value">${utils.formatTime(state.statistics.totalRuntime)}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-tachometer-alt"></i> ${t('pixelsPerHour')}</div>
          <div class="wplace-stat-value">${state.statistics.pixelsPerHour}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-percentage"></i> ${t('successRate')}</div>
          <div class="wplace-stat-value">${state.statistics.successRate}%</div>
        </div>
      `;
    }
  };

  // Initialize everything
  try {
    utils.log('Initializing WPlace Auto-Farm Pro', 'info');
    utils.loadConfig();
    await detectUserLocation();
    createUI();
    await api.getCharge();
    updateStats();
    utils.log('Initialization complete', 'success');
  } catch (error) {
    utils.log(`Initialization error: ${error.message}`, 'error');
    console.error('WPlace Auto-Farm Pro initialization failed:', error);
  }
})();
