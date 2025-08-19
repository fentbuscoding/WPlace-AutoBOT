(async () => {
  const CONFIG = {
    COOLDOWN_DEFAULT: 31000,
    TRANSPARENCY_THRESHOLD: 100,
    WHITE_THRESHOLD: 250,
    LOG_INTERVAL: 10,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 2000,
    MIN_DELAY: 500,
    MAX_DELAY: 2000,
    STORAGE_KEY: 'wplace-autoimage-config',
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
    }
  };

  const TEXTS = {
    pt: {
      title: "WPlace Auto-Image",
      initBot: "Iniciar Auto-BOT",
      uploadImage: "Upload da Imagem",
      resizeImage: "Redimensionar Imagem",
      selectPosition: "Selecionar Posição",
      startPainting: "Iniciar Pintura",
      stopPainting: "Parar Pintura",
      checkingColors: "🔍 Verificando cores disponíveis...",
      noColorsFound: "❌ Abra a paleta de cores no site e tente novamente!",
      colorsFound: "✅ {count} cores disponíveis encontradas",
      loadingImage: "🖼️ Carregando imagem...",
      imageLoaded: "✅ Imagem carregada com {count} pixels válidos",
      imageError: "❌ Erro ao carregar imagem",
      selectPositionAlert: "Pinte o primeiro pixel na localização onde deseja que a arte comece!",
      waitingPosition: "👆 Aguardando você pintar o pixel de referência...",
      positionSet: "✅ Posição definida com sucesso!",
      positionTimeout: "❌ Tempo esgotado para selecionar posição",
      startPaintingMsg: "🎨 Iniciando pintura...",
      paintingProgress: "🧱 Progresso: {painted}/{total} pixels...",
      noCharges: "⌛ Sem cargas. Aguardando {time}...",
      paintingStopped: "⏹️ Pintura interrompida pelo usuário",
      paintingComplete: "✅ Pintura concluída! {count} pixels pintados.",
      paintingError: "❌ Erro durante a pintura",
      missingRequirements: "❌ Carregue uma imagem e selecione uma posição primeiro",
      progress: "Progresso",
      pixels: "Pixels",
      charges: "Cargas",
      estimatedTime: "Tempo estimado",
      initMessage: "Clique em 'Iniciar Auto-BOT' para começar",
      waitingInit: "Aguardando inicialização...",
      resizeSuccess: "✅ Imagem redimensionada para {width}x{height}",
      paintingPaused: "⏸️ Pintura em pause na posição X: {x}, Y: {y}",
      smartDelay: "Atraso Inteligente",
      enableSound: "Ativar Som",
      adaptiveMode: "Modo Adaptativo",
      enableLogging: "Ativar Log",
      settings: "Configurações",
      pause: "Pausar",
      resume: "Continuar",
      statistics: "Estatísticas",
      runtime: "Tempo Ativo",
      pixelsPerHour: "Pixels/Hora",
      successRate: "Taxa de Sucesso",
      restartFromPosition: "Retomar da última posição",
      resetPosition: "Resetar posição"
    },
    en: {
      title: "WPlace Auto-Image",
      initBot: "Start Auto-BOT",
      uploadImage: "Upload Image",
      resizeImage: "Resize Image",
      selectPosition: "Select Position",
      startPainting: "Start Painting",
      stopPainting: "Stop Painting",
      checkingColors: "🔍 Checking available colors...",
      noColorsFound: "❌ Open the color palette on the site and try again!",
      colorsFound: "✅ {count} available colors found",
      loadingImage: "🖼️ Loading image...",
      imageLoaded: "✅ Image loaded with {count} valid pixels",
      imageError: "❌ Error loading image",
      selectPositionAlert: "Paint the first pixel at the location where you want the art to start!",
      waitingPosition: "👆 Waiting for you to paint the reference pixel...",
      positionSet: "✅ Position set successfully!",
      positionTimeout: "❌ Timeout for position selection",
      startPaintingMsg: "🎨 Starting painting...",
      paintingProgress: "🧱 Progress: {painted}/{total} pixels...",
      noCharges: "⌛ No charges. Waiting {time}...",
      paintingStopped: "⏹️ Painting stopped by user",
      paintingComplete: "✅ Painting complete! {count} pixels painted.",
      paintingError: "❌ Error during painting",
      missingRequirements: "❌ Load an image and select a position first",
      progress: "Progress",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Estimated time",
      initMessage: "Click 'Start Auto-BOT' to begin",
      waitingInit: "Waiting for initialization...",
      resizeSuccess: "✅ Image resized to {width}x{height}",
      paintingPaused: "⏸️ Painting paused at position X: {x}, Y: {y}",
      smartDelay: "Smart Delay",
      enableSound: "Enable Sound",
      adaptiveMode: "Adaptive Mode",
      enableLogging: "Enable Logging",
      settings: "Settings",
      pause: "Pause",
      resume: "Resume",
      statistics: "Statistics",
      runtime: "Runtime",
      pixelsPerHour: "Pixels/Hour",
      successRate: "Success Rate",
      restartFromPosition: "Restart from last position",
      resetPosition: "Reset position"
    },
    fr: {
      title: "WPlace Auto-Image",
      initBot: "Démarrer Auto-BOT",
      uploadImage: "Télécharger l'image",
      resizeImage: "Redimensionner l'image",
      selectPosition: "Sélectionner la position",
      startPainting: "Commencer la peinture",
      stopPainting: "Arrêter la peinture",
      checkingColors: "🔍 Vérification des couleurs disponibles...",
      noColorsFound: "❌ Ouvrez la palette de couleurs sur le site et réessayez !",
      colorsFound: "✅ {count} couleurs disponibles trouvées",
      loadingImage: "🖼️ Chargement de l'image...",
      imageLoaded: "✅ Image chargée avec {count} pixels valides",
      imageError: "❌ Erreur lors du chargement de l'image",
      selectPositionAlert: "Peignez le premier pixel à l’endroit où vous souhaitez commencer l’art !",
      waitingPosition: "👆 En attente que vous peigniez le pixel de référence...",
      positionSet: "✅ Position définie avec succès !",
      positionTimeout: "❌ Temps écoulé pour la sélection de la position",
      startPaintingMsg: "🎨 Début de la peinture...",
      paintingProgress: "🧱 Progression : {painted}/{total} pixels...",
      noCharges: "⌛ Pas de charges. Attente de {time}...",
      paintingStopped: "⏹️ Peinture arrêtée par l’utilisateur",
      paintingComplete: "✅ Peinture terminée ! {count} pixels peints.",
      paintingError: "❌ Erreur pendant la peinture",
      missingRequirements: "❌ Veuillez d'abord télécharger une image et sélectionner une position",
      progress: "Progression",
      pixels: "Pixels",
      charges: "Charges",
      estimatedTime: "Temps estimé",
      initMessage: "Cliquez sur 'Démarrer Auto-BOT' pour commencer",
      waitingInit: "En attente de l'initialisation...",
      resizeSuccess: "✅ Image redimensionnée à {width}x{height}",
      paintingPaused: "⏸️ Peinture en pause à la position X : {x}, Y : {y}"
    },
    ru: {
      title: "WPlace Auto-Image",
      initBot: "Запустить Auto-BOT",
      uploadImage: "Загрузить Изображение",
      resizeImage: "Изменить Размер",
      selectPosition: "Выбрать Позицию",
      startPainting: "Начать Рисование",
      stopPainting: "Завершить Рисование",
      checkingColors: "🔍 Проверка доступных цветов...",
      noColorsFound: "❌ Откройте палитру цветов на сайте и попробуйте снова!",
      colorsFound: "✅ {count} найдено доступных цветов",
      loadingImage: "🖼️ Загрузка изображения...",
      imageLoaded: "✅ Изображение загружено с {count} допустимых пикселей",
      imageError: "❌ Ошибка загрузки изображения",
      selectPositionAlert: "Нарисуйте первый пиксель в том месте, где вы хотите, чтобы начинался арт.!",
      waitingPosition: "👆 Ждем, когда вы нарисуете опорный пиксель...",
      positionSet: "✅ Положение установлено успешно!",
      positionTimeout: "❌ Время ожидания выбора позиции вышло",
      startPaintingMsg: "🎨 Начинаем рисовать...",
      paintingProgress: "🧱 Прогресс: {painted}/{total} пикселей...",
      noCharges: "⌛ Нет зарядов. ожидание {time}...",
      paintingStopped: "⏹️ Рисование остановлено пользователем",
      paintingComplete: "✅ Рисование завершено! {count} пикселей нарисовано.",
      paintingError: "❌ Ошибка во время рисование",
      missingRequirements: "❌ Сначала загрузите изображение и выберите позицию",
      progress: "Прогресс",
      pixels: "Пиксели",
      charges: "Заряды",
      estimatedTime: "Предположительное время",
      initMessage: "Нажмите «Запустить Auto-BOT», чтобы начать",
      waitingInit: "Ожидание инициализации...",
      resizeSuccess: "✅ Изображение изменено до {width}x{height}",
      paintingPaused: "⏸️ Рисование приостановлено на позиции X: {x}, Y: {y}"
    },
    nl: {
      title: "WPlaats Auto-Afbeelding",
      initBot: "Start Auto-BOT",
      uploadImage: "Upload Afbeelding",
      resizeImage: "Formaat Afbeelding Wijzigen",
      selectPosition: "Selecteer Positie",
      startPainting: "Start Schilderen",
      stopPainting: "Stop Schilderen",
      checkingColors: "🔍 Beschikbare kleuren controleren...",
      noColorsFound: "❌ Open het kleurenpalet op de site en probeer het opnieuw!",
      colorsFound: "✅ {count} beschikbare kleuren gevonden",
      loadingImage: "🖼️ Afbeelding laden...",
      imageLoaded: "✅ Afbeelding geladen met {count} geldige pixels",
      imageError: "❌ Fout bij het laden van de afbeelding",
      selectPositionAlert: "Schilder de eerste pixel op de locatie waar je de afbeelding wilt laten beginnen!",
      waitingPosition: "👆 Wacht tot je de referentiepixel schildert...",
      positionSet: "✅ Positie succesvol ingesteld!",
      positionTimeout: "❌ Time-out voor positieselectie",
      startPaintingMsg: "🎨 Schilderen starten...",
      paintingProgress: "🧱 Voortgang: {geschilderd}/{totaal} pixels...",
      noCharges: "⌛ Geen kosten. Wachten {time}...",
      paintingStopped: "⏹️ Schilderen gestopt door gebruiker",
      paintingComplete: "✅ Schilderen voltooid! {count} pixels geschilderd.",
      paintingError: "❌ Fout tijdens het schilderen",
      missingRequirements: "❌ Laad een afbeelding en selecteer eerst een positie",
      progress: "Voortgang",
      pixels: "Pixels",
      charges: "Kosten",
      estimatedTime: "Geschatte tijd",
      initMessage: "Klik op 'Start Auto-BOT' om te beginnen",
      waitingInit: "Wachten op initialisatie...",
      resizeSuccess: "✅ Afbeelding verkleind naar {breedte} x {hoogte}",
      paintingPaused: "⏸️ Schilderen gepauzeerd op positie X: {x}, Y: {y}"
    },
    uk: {
      title: "WPlace Auto-Image",
      initBot: "Запустити бота",
      uploadImage: "Завантажити зображення",
      resizeImage: "Змінити розмір зображення",
      selectPosition: "Вибрати позицію",
      startPainting: "Почати малювання",
      stopPainting: "Зупинити малювання",
      checkingColors: "🔍 Перевірка доступних кольорів...",
      noColorsFound: "❌ Відкрийте палітру кольорів на сайті та спробуйте ще раз!",
      colorsFound: "✅ Знайдено {count} доступних кольорів",
      loadingImage: "🖼️ Завантаження зображення...",
      imageLoaded: "✅ Зображення завантажено з {count} коректними пікселями",
      imageError: "❌ Помилка завантаження зображення",
      selectPositionAlert: "Намалюйте перший піксель у місці, з якого має початися арт!",
      waitingPosition: "👆 Очікування, поки ви намалюєте контрольний піксель...",
      positionSet: "✅ Позицію успішно встановлено!",
      positionTimeout: "❌ Час очікування вибору позиції вичерпано",
      startPaintingMsg: "🎨 Початок малювання...",
      paintingProgress: "🧱 Прогрес: {painted}/{total} пікселів...",
      noCharges: "⌛ Немає зарядів. Очікування {time}...",
      paintingStopped: "⏹️ Малювання зупинено користувачем",
      paintingComplete: "✅ Малювання завершено! Намальовано {count} пікселів.",
      paintingError: "❌ Помилка під час малювання",
      missingRequirements: "❌ Спочатку завантажте зображення та виберіть позицію",
      progress: "Прогрес",
      pixels: "Пікселі",
      charges: "Заряди",
      estimatedTime: "Орієнтовний час",
      initMessage: "Натисніть «Запустити бота», щоб почати",
      waitingInit: "Очікування запуску...",
      resizeSuccess: "✅ Зображення змінено до {width}x{height}",
      paintingPaused: "⏸️ Малювання призупинено на позиції X: {x}, Y: {y}"
    }
  };

  const state = {
    running: false,
    paused: false,
    imageLoaded: false,
    processing: false,
    totalPixels: 0,
    paintedPixels: 0,
    failedAttempts: 0,
    availableColors: [],
    currentCharges: 0,
    cooldown: CONFIG.COOLDOWN_DEFAULT,
    imageData: null,
    stopFlag: false,
    colorsChecked: false,
    startPosition: null,
    selectingPosition: false,
    region: null,
    minimized: false,
    lastPosition: { x: 0, y: 0 },
    estimatedTime: 0,
    language: 'en',
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

  // Detects and sets the user's language
  function detectLanguage() {
    const userLang = navigator.language.split('-')[0];
    if (TEXTS[userLang]) {
      state.language = userLang;
    }
  }

  // Enhanced utility functions
  const Utils = {
    sleep: ms => new Promise(r => setTimeout(r, ms)),

    random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

    // Euclidean color distance
    colorDistance: (a, b) => Math.sqrt(
      (a[0] - b[0]) ** 2 +
      (a[1] - b[1]) ** 2 +
      (a[2] - b[2]) ** 2
    ),

    log: (message, type = 'info') => {
      if (!state.settings.enableLogging) return;
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] [${type.toUpperCase()}] WPlace Auto-Image: ${message}`);
    },

    saveConfig: () => {
      try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({
          lastPosition: state.lastPosition,
          startPosition: state.startPosition,
          region: state.region,
          settings: state.settings,
          language: state.language
        }));
        Utils.log('Configuration saved', 'info');
      } catch (e) {
        Utils.log('Failed to save config: ' + e.message, 'error');
      }
    },

    loadConfig: () => {
      try {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (saved) {
          const config = JSON.parse(saved);
          if (config.lastPosition) state.lastPosition = config.lastPosition;
          if (config.startPosition) state.startPosition = config.startPosition;
          if (config.region) state.region = config.region;
          if (config.settings) Object.assign(state.settings, config.settings);
          if (config.language) state.language = config.language;
          Utils.log('Configuration loaded', 'info');
        }
      } catch (e) {
        Utils.log('Failed to load config: ' + e.message, 'error');
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
    },

    // Debounced DOM update for stats
    debounce(fn, delay = 100) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    },

    formatTime: ms => {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      let result = '';
      if (days > 0) result += `${days}d `;
      if (hours > 0 || days > 0) result += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m `;
      result += `${seconds}s`;
      return result;
    },

    createImageUploader: () => new Promise(resolve => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png,image/jpeg';
      input.onchange = () => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.readAsDataURL(input.files[0]);
      };
      input.click();
    }),

    extractAvailableColors: () => {
      // Query only once for performance
      const colorElements = document.querySelectorAll('[id^="color-"]');
      return Array.from(colorElements)
        .filter(el => !el.querySelector('svg'))
        .filter(el => {
          const id = parseInt(el.id.replace('color-', ''));
          return id !== 0 && id !== 5;
        })
        .map(el => {
          const id = parseInt(el.id.replace('color-', ''));
          const rgbStr = el.style.backgroundColor.match(/\d+/g);
          const rgb = rgbStr ? rgbStr.map(Number) : [0, 0, 0];
          return { id, rgb };
        });
    },

    formatTime: ms => {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      let result = '';
      if (days > 0) result += `${days}d `;
      if (hours > 0 || days > 0) result += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m `;
      result += `${seconds}s`;
      return result;
    },

    showAlert: (message, type = 'info') => {
      // Only one alert at a time for performance
      let alert = document.getElementById('wplace-alert');
      if (alert) alert.remove();
      alert = document.createElement('div');
      alert.id = 'wplace-alert';
      alert.setAttribute('role', 'alert');
      alert.style.position = 'fixed';
      alert.style.top = '20px';
      alert.style.left = '50%';
      alert.style.transform = 'translateX(-50%)';
      alert.style.padding = '15px 20px';
      alert.style.background = CONFIG.THEME[type] || CONFIG.THEME.accent;
      alert.style.color = CONFIG.THEME.text;
      alert.style.borderRadius = '8px';
      alert.style.zIndex = '10000';
      alert.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
      alert.style.display = 'flex';
      alert.style.alignItems = 'center';
      alert.style.gap = '12px';
      alert.style.fontSize = '14px';
      alert.style.backdropFilter = 'blur(12px)';
      alert.style.animation = 'slideIn 0.3s ease-out';

      const icons = {
        error: 'exclamation-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
      };

      alert.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
      `;

      document.body.appendChild(alert);
      Utils.playSound(type);

      setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transition = 'opacity 0.5s';
        setTimeout(() => alert.remove(), 500);
      }, 4000);
    },

    calculateEstimatedTime: (remainingPixels, currentCharges, cooldown) => {
      const pixelsPerCharge = currentCharges > 0 ? currentCharges : 0;
      const fullCycles = Math.ceil((remainingPixels - pixelsPerCharge) / Math.max(currentCharges, 1));
      return (fullCycles * cooldown) + ((remainingPixels - 1) * 100);
    },

    isWhitePixel: (r, g, b) => {
      return r >= CONFIG.WHITE_THRESHOLD && 
             g >= CONFIG.WHITE_THRESHOLD && 
             b >= CONFIG.WHITE_THRESHOLD;
    },

    t: (key, params = {}) => {
      let text = TEXTS[state.language][key] || TEXTS.en[key] || key;
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v);
      }
      return text;
    }
  };

  // Enhanced WPlace API Service with retry logic
  const WPlaceService = {
    async fetchWithRetry(url, options = {}, retries = CONFIG.RETRY_ATTEMPTS) {
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
          Utils.log(`API request failed (attempt ${i + 1}/${retries}): ${e.message}`, 'warning');
          
          if (i === retries - 1) {
            Utils.log(`All retry attempts failed for ${url}`, 'error');
            return null;
          }
          
          await Utils.sleep(CONFIG.RETRY_DELAY * (i + 1));
        }
      }
    },

    async paintPixelInRegion(regionX, regionY, pixelX, pixelY, color) {
      try {
        const result = await this.fetchWithRetry(
          `https://backend.wplace.live/s0/pixel/${regionX}/${regionY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            body: JSON.stringify({ coords: [pixelX, pixelY], colors: [color] })
          }
        );
        
        if (result?.painted === 1) {
          Utils.log(`Pixel painted at (${pixelX}, ${pixelY}) with color ${color}`, 'success');
          return true;
        } else {
          Utils.log(`Failed to paint pixel at (${pixelX}, ${pixelY})`, 'warning');
          return false;
        }
      } catch (error) {
        Utils.log(`Paint pixel error: ${error.message}`, 'error');
        return false;
      }
    },
    
    async getCharges() {
      try {
        const data = await this.fetchWithRetry('https://backend.wplace.live/me');
        if (data) {
          const charges = data.charges?.count || 0;
          const cooldown = data.charges?.cooldownMs || CONFIG.COOLDOWN_DEFAULT;
          Utils.log(`Charges updated: ${Math.floor(charges)}`, 'info');
          return { charges: Math.floor(charges), cooldown };
        }
        return { charges: 0, cooldown: CONFIG.COOLDOWN_DEFAULT };
      } catch (error) {
        Utils.log(`Get charges error: ${error.message}`, 'error');
        return { charges: 0, cooldown: CONFIG.COOLDOWN_DEFAULT };
      }
    }
  };

  class ImageProcessor {
    constructor(imageSrc) {
      this.imageSrc = imageSrc;
      this.img = new Image();
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.previewCanvas = document.createElement('canvas');
      this.previewCtx = this.previewCanvas.getContext('2d');
    }
    
    async load() {
      return new Promise((resolve, reject) => {
        this.img.onload = () => {
          this.canvas.width = this.img.width;
          this.canvas.height = this.img.height;
          this.ctx.drawImage(this.img, 0, 0);
          resolve();
        };
        this.img.onerror = reject;
        this.img.src = this.imageSrc;
      });
    }
    
    getPixelData() {
      return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    }
    
    getDimensions() {
      return { width: this.canvas.width, height: this.canvas.height };
    }
    
    resize(newWidth, newHeight) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;
      const tempCtx = tempCanvas.getContext('2d');
      
      tempCtx.drawImage(this.img, 0, 0, newWidth, newHeight);
      
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
      this.ctx.drawImage(tempCanvas, 0, 0);
      
      return this.getPixelData();
    }
    
    generatePreview(newWidth, newHeight) {
      this.previewCanvas.width = newWidth;
      this.previewCanvas.height = newHeight;
      this.previewCtx.imageSmoothingEnabled = false;
      this.previewCtx.drawImage(this.img, 0, 0, newWidth, newHeight);
      return this.previewCanvas.toDataURL();
    }
  }

  function findClosestColor(rgb, palette) {
    return palette.reduce((closest, current) => {
      const currentDistance = Utils.colorDistance(rgb, current.rgb);
      return currentDistance < closest.distance 
        ? { color: current, distance: currentDistance } 
        : closest;
    }, { color: palette[0], distance: Utils.colorDistance(rgb, palette[0].rgb) }).color.id;
  }

  async function createUI() {
    detectLanguage();

    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(119, 92, 227, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(119, 92, 227, 0); }
        100% { box-shadow: 0 0 0 0 rgba(119, 92, 227, 0); }
      }
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes glassFade {
        from { backdrop-filter: blur(0px); }
        to { backdrop-filter: blur(12px); }
      }
      #wplace-image-bot-container {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 360px;
        background: ${CONFIG.THEME.primary};
        border: 1px solid ${CONFIG.THEME.accent};
        border-radius: 18px;
        padding: 0;
        box-shadow: 0 8px 32px rgba(0,0,0,0.7);
        z-index: 9998;
        font-family: 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        color: ${CONFIG.THEME.text};
        animation: glassFade 0.7s, slideIn 0.4s ease-out;
        overflow: hidden;
        backdrop-filter: blur(12px);
        transition: width 0.3s, box-shadow 0.3s;
      }
      @media (max-width: 500px) {
        #wplace-image-bot-container {
          width: 98vw;
          right: 1vw;
          top: 1vw;
        }
      }
      .wplace-header {
        padding: 16px 18px;
        background: linear-gradient(135deg, ${CONFIG.THEME.secondary}, ${CONFIG.THEME.accent});
        color: ${CONFIG.THEME.text};
        font-size: 18px;
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        user-select: none;
        border-bottom: 1px solid ${CONFIG.THEME.accent};
      }
      .wplace-header-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wplace-header-controls {
        display: flex;
        gap: 12px;
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
        font-size: 1.1em;
      }
      .wplace-header-btn:focus {
        outline: 2px solid ${CONFIG.THEME.highlight};
      }
      .wplace-header-btn:hover {
        opacity: 1;
        background: rgba(255,255,255,0.2);
        transform: scale(1.15);
      }
      .wplace-content {
        padding: 18px;
        display: block;
      }
      .wplace-controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 18px;
      }
      .wplace-btn {
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.2s;
        box-shadow: 0 2px 8px rgba(119,92,227,0.08);
        position: relative;
      }
      .wplace-btn:focus {
        outline: 2px solid ${CONFIG.THEME.highlight};
      }
      .wplace-btn:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 4px 16px rgba(119,92,227,0.15);
      }
      .wplace-btn-primary {
        background: linear-gradient(90deg, ${CONFIG.THEME.accent} 60%, ${CONFIG.THEME.highlight} 100%);
        color: white;
      }
      .wplace-btn-upload {
        background: rgba(40,40,40,0.8);
        color: white;
        border: 1px dashed ${CONFIG.THEME.text};
      }
      .wplace-btn-start {
        background: linear-gradient(90deg, ${CONFIG.THEME.success} 60%, ${CONFIG.THEME.highlight} 100%);
        color: white;
      }
      .wplace-btn-stop {
        background: linear-gradient(90deg, ${CONFIG.THEME.error} 60%, ${CONFIG.THEME.highlight} 100%);
        color: white;
      }
      .wplace-btn-select {
        background: linear-gradient(90deg, ${CONFIG.THEME.highlight} 60%, ${CONFIG.THEME.accent} 100%);
        color: black;
      }
      .wplace-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
      }
      .wplace-btn .spinner {
        width: 18px;
        height: 18px;
        border: 3px solid #fff;
        border-top: 3px solid ${CONFIG.THEME.highlight};
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 6px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .wplace-stats {
        background: rgba(30,30,30,0.8);
        padding: 14px;
        border-radius: 8px;
        margin-bottom: 18px;
        box-shadow: 0 2px 8px rgba(119,92,227,0.08);
      }
      .wplace-stat-item {
        display: flex;
        justify-content: space-between;
        padding: 7px 0;
        font-size: 15px;
      }
      .wplace-stat-label {
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0.85;
      }
      .wplace-progress {
        width: 100%;
        background: rgba(40,40,40,0.8);
        border-radius: 6px;
        margin: 12px 0;
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(119,92,227,0.08);
      }
      .wplace-progress-bar {
        height: 12px;
        background: linear-gradient(90deg, ${CONFIG.THEME.highlight} 60%, ${CONFIG.THEME.accent} 100%);
        transition: width 0.4s cubic-bezier(.4,2,.3,1);
      }
      .wplace-status {
        padding: 10px;
        border-radius: 6px;
        text-align: center;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-height: 32px;
        transition: background 0.3s, color 0.3s;
      }
      .status-default {
        background: rgba(255,255,255,0.08);
      }
      .status-success {
        background: rgba(0, 255, 0, 0.12);
        color: ${CONFIG.THEME.success};
      }
      .status-error {
        background: rgba(255, 0, 0, 0.12);
        color: ${CONFIG.THEME.error};
      }
      .status-warning {
        background: rgba(255, 165, 0, 0.12);
        color: orange;
      }
      #paintEffect {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: 8px;
      }
      .position-info {
        font-size: 14px;
        margin-top: 7px;
        padding: 7px;
        background: rgba(30,30,30,0.8);
        border-radius: 6px;
        text-align: center;
      }
      .wplace-minimized .wplace-content {
        display: none;
      }
      .resize-container {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(20,20,20,0.9);
        padding: 24px;
        border-radius: 14px;
        z-index: 10000;
        box-shadow: 0 0 32px rgba(0,0,0,0.7);
        max-width: 95vw;
        max-height: 95vh;
        overflow: auto;
        backdrop-filter: blur(8px);
      }
      .resize-preview {
        max-width: 100%;
        max-height: 320px;
        margin: 12px 0;
        border: 2px solid ${CONFIG.THEME.accent};
        border-radius: 8px;
        box-shadow: 0 1px 8px rgba(119,92,227,0.08);
      }
      .resize-controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 18px;
      }
      .resize-slider {
        width: 100%;
      }
      .resize-buttons {
        display: flex;
        gap: 12px;
      }
      .resize-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 9999;
        display: none;
      }
      /* Tooltip styles */
      .wplace-tooltip {
        position: absolute;
        background: rgba(30,30,30,0.95);
        color: #fff;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        z-index: 10001;
        box-shadow: 0 2px 8px rgba(119,92,227,0.12);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
      }
      /* Settings panel styles */
      .wplace-settings {
        margin-top: 10px;
        padding: 12px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
        display: none;
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
      .wplace-btn-pause {
        background: linear-gradient(90deg, ${CONFIG.THEME.warning} 60%, #d97706 100%);
        color: white;
      }
      .wplace-minimized .wplace-content {
        display: none;
      }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'wplace-image-bot-container';
    container.innerHTML = `
      <div class="wplace-header">
        <div class="wplace-header-title">
          <i class="fas fa-image"></i>
          <span>${Utils.t('title')}</span>
        </div>
        <div class="wplace-header-controls">
          <button id="settingsBtn" class="wplace-header-btn" title="${Utils.t('settings')}">
            <i class="fas fa-cog"></i>
          </button>
          <button id="minimizeBtn" class="wplace-header-btn" title="Minimize">
            <i class="fas fa-minus"></i>
          </button>
        </div>
      </div>
      <div class="wplace-content">
        <div class="wplace-controls">
          <button id="initBotBtn" class="wplace-btn wplace-btn-primary">
            <i class="fas fa-robot"></i>
            <span>${Utils.t('initBot')}</span>
          </button>
          <button id="uploadBtn" class="wplace-btn wplace-btn-upload" disabled>
            <i class="fas fa-upload"></i>
            <span>${Utils.t('uploadImage')}</span>
          </button>
          <button id="resizeBtn" class="wplace-btn wplace-btn-primary" disabled>
            <i class="fas fa-expand"></i>
            <span>${Utils.t('resizeImage')}</span>
          </button>
          <button id="selectPosBtn" class="wplace-btn wplace-btn-select" disabled>
            <i class="fas fa-crosshairs"></i>
            <span>${Utils.t('selectPosition')}</span>
          </button>
          <button id="startBtn" class="wplace-btn wplace-btn-start" disabled>
            <i class="fas fa-play"></i>
            <span>${Utils.t('startPainting')}</span>
          </button>
          <button id="pauseBtn" class="wplace-btn wplace-btn-pause" disabled style="display: none;">
            <i class="fas fa-pause"></i>
            <span>${Utils.t('pause')}</span>
          </button>
          <button id="stopBtn" class="wplace-btn wplace-btn-stop" disabled>
            <i class="fas fa-stop"></i>
            <span>${Utils.t('stopPainting')}</span>
          </button>
        </div>
        
        <div class="wplace-progress">
          <div id="progressBar" class="wplace-progress-bar" style="width: 0%"></div>
        </div>
        
        <div class="wplace-stats">
          <div id="statsArea">
            <div class="wplace-stat-item">
              <div class="wplace-stat-label"><i class="fas fa-info-circle"></i> ${Utils.t('initMessage')}</div>
            </div>
          </div>
        </div>
        
        <div id="statusText" class="wplace-status status-default">
          ${Utils.t('waitingInit')}
        </div>
        
        <div id="settingsPanel" class="wplace-settings">
          <div class="wplace-setting-item">
            <span>${Utils.t('smartDelay')}</span>
            <div class="wplace-toggle ${state.settings.smartDelay ? 'active' : ''}" data-setting="smartDelay"></div>
          </div>
          <div class="wplace-setting-item">
            <span>${Utils.t('enableSound')}</span>
            <div class="wplace-toggle ${state.settings.enableSound ? 'active' : ''}" data-setting="enableSound"></div>
          </div>
          <div class="wplace-setting-item">
            <span>${Utils.t('adaptiveMode')}</span>
            <div class="wplace-toggle ${state.settings.adaptiveMode ? 'active' : ''}" data-setting="adaptiveMode"></div>
          </div>
          <div class="wplace-setting-item">
            <span>${Utils.t('enableLogging')}</span>
            <div class="wplace-toggle ${state.settings.enableLogging ? 'active' : ''}" data-setting="enableLogging"></div>
          </div>
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
            <button id="restartBtn" class="wplace-btn wplace-btn-primary" style="width: 100%; margin-bottom: 8px;">
              <i class="fas fa-play"></i>
              <span>${Utils.t('restartFromPosition')}</span>
            </button>
            <button id="resetPosBtn" class="wplace-btn wplace-btn-upload" style="width: 100%;">
              <i class="fas fa-undo"></i>
              <span>${Utils.t('resetPosition')}</span>
            </button>
          </div>
        </div>
      </div>`;
    
    const resizeContainer = document.createElement('div');
    resizeContainer.className = 'resize-container';
    resizeContainer.innerHTML = `
      <h3 style="margin-top: 0; color: ${CONFIG.THEME.text}">${Utils.t('resizeImage')}</h3>
      <div class="resize-controls">
        <label style="color: ${CONFIG.THEME.text}">
          ${Utils.t('width')}: <span id="widthValue">0</span>px
          <input type="range" id="widthSlider" class="resize-slider" min="10" max="500" value="100">
        </label>
        <label style="color: ${CONFIG.THEME.text}">
          ${Utils.t('height')}: <span id="heightValue">0</span>px
          <input type="range" id="heightSlider" class="resize-slider" min="10" max="500" value="100">
        </label>
        <label style="color: ${CONFIG.THEME.text}">
          <input type="checkbox" id="keepAspect" checked>
          ${Utils.t('keepAspect')}
        </label>
        <img id="resizePreview" class="resize-preview" src="">
        <div class="resize-buttons">
          <button id="confirmResize" class="wplace-btn wplace-btn-primary">
            <i class="fas fa-check"></i>
            <span>${Utils.t('apply')}</span>
          </button>
          <button id="cancelResize" class="wplace-btn wplace-btn-stop">
            <i class="fas fa-times"></i>
            <span>${Utils.t('cancel')}</span>
          </button>
        </div>
      </div>
    `;
    
    const resizeOverlay = document.createElement('div');
    resizeOverlay.className = 'resize-overlay';
    
    document.body.appendChild(container);
    document.body.appendChild(resizeOverlay);
    document.body.appendChild(resizeContainer);
    
    const header = container.querySelector('.wplace-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    header.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      if (e.target.closest('.wplace-header-btn')) return;
      
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      container.style.top = (container.offsetTop - pos2) + "px";
      container.style.left = (container.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    
    const initBotBtn = container.querySelector('#initBotBtn');
    const uploadBtn = container.querySelector('#uploadBtn');
    const resizeBtn = container.querySelector('#resizeBtn');
    const selectPosBtn = container.querySelector('#selectPosBtn');
    const startBtn = container.querySelector('#startBtn');
    const stopBtn = container.querySelector('#stopBtn');
    const minimizeBtn = container.querySelector('#minimizeBtn');
    const statusText = container.querySelector('#statusText');
    const progressBar = container.querySelector('#progressBar');
    const statsArea = container.querySelector('#statsArea');
    const content = container.querySelector('.wplace-content');
    
    const widthSlider = resizeContainer.querySelector('#widthSlider');
    const heightSlider = resizeContainer.querySelector('#heightSlider');
    const widthValue = resizeContainer.querySelector('#widthValue');
    const heightValue = resizeContainer.querySelector('#heightValue');
    const keepAspect = resizeContainer.querySelector('#keepAspect');
    const resizePreview = resizeContainer.querySelector('#resizePreview');
    const confirmResize = resizeContainer.querySelector('#confirmResize');
    const cancelResize = resizeContainer.querySelector('#cancelResize');
    
    minimizeBtn.addEventListener('click', () => {
      state.minimized = !state.minimized;
      if (state.minimized) {
        container.classList.add('wplace-minimized');
        minimizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
      } else {
        container.classList.remove('wplace-minimized');
        minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
      }
    });
    
    window.updateUI = (messageKey, type = 'default', params = {}) => {
      const message = Utils.t(messageKey, params);
      statusText.textContent = message;
      statusText.className = `wplace-status status-${type}`;
      statusText.style.animation = 'none';
      void statusText.offsetWidth;
      statusText.style.animation = 'slideIn 0.3s ease-out';
    };

    // Enhanced stats update with runtime tracking
    window.updateStats = Utils.debounce(async () => {
      if (!state.colorsChecked || !state.imageLoaded) return;

      const { charges, cooldown } = await WPlaceService.getCharges();
      state.currentCharges = Math.floor(charges);
      state.cooldown = cooldown;

      const progress = state.totalPixels > 0 ?
        Math.round((state.paintedPixels / state.totalPixels) * 100) : 0;
      const remainingPixels = state.totalPixels - state.paintedPixels;

      // Calculate runtime statistics
      if (state.statistics.startTime) {
        const now = Date.now();
        const runtime = now - state.statistics.startTime;
        state.statistics.totalRuntime = runtime;
        
        const hoursRunning = runtime / (1000 * 60 * 60);
        state.statistics.pixelsPerHour = hoursRunning > 0 ? Math.round(state.paintedPixels / hoursRunning) : 0;
        
        const totalAttempts = state.paintedPixels + state.failedAttempts;
        state.statistics.successRate = totalAttempts > 0 ? Math.round((state.paintedPixels / totalAttempts) * 100) : 0;
      }

      state.estimatedTime = Utils.calculateEstimatedTime(
        remainingPixels,
        state.currentCharges,
        state.cooldown
      );

      progressBar.style.width = `${progress}%`;

      // Enhanced stats display
      const statsHTML = `
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-image"></i> ${Utils.t('progress')}</div>
          <div class="wplace-stat-value">${progress}%</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-paint-brush"></i> ${Utils.t('pixels')}</div>
          <div class="wplace-stat-value">${state.paintedPixels}/${state.totalPixels}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-bolt"></i> ${Utils.t('charges')}</div>
          <div class="wplace-stat-value">${Math.floor(state.currentCharges)}</div>
        </div>
        ${state.statistics.startTime ? `
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-clock"></i> ${Utils.t('runtime')}</div>
          <div class="wplace-stat-value">${Utils.formatTime(state.statistics.totalRuntime)}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-tachometer-alt"></i> ${Utils.t('pixelsPerHour')}</div>
          <div class="wplace-stat-value">${state.statistics.pixelsPerHour}</div>
        </div>
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-percentage"></i> ${Utils.t('successRate')}</div>
          <div class="wplace-stat-value">${state.statistics.successRate}%</div>
        </div>
        ` : ''}
        ${state.imageLoaded ? `
        <div class="wplace-stat-item">
          <div class="wplace-stat-label"><i class="fas fa-hourglass-half"></i> ${Utils.t('estimatedTime')}</div>
          <div class="wplace-stat-value">${Utils.formatTime(state.estimatedTime)}</div>
        </div>
        ` : ''}
      `;
      if (statsArea.innerHTML !== statsHTML) statsArea.innerHTML = statsHTML;
    }, 150);
    
    function showResizeDialog(processor) {
      const { width, height } = processor.getDimensions();
      const aspectRatio = width / height;
      
      widthSlider.value = width;
      heightSlider.value = height;
      widthValue.textContent = width;
      heightValue.textContent = height;
      resizePreview.src = processor.img.src;
      
      resizeOverlay.style.display = 'block';
      resizeContainer.style.display = 'block';
      
      const updatePreview = () => {
        const newWidth = parseInt(widthSlider.value);
        const newHeight = parseInt(heightSlider.value);
        
        widthValue.textContent = newWidth;
        heightValue.textContent = newHeight;
        
        resizePreview.src = processor.generatePreview(newWidth, newHeight);
      };
      
      widthSlider.addEventListener('input', () => {
        if (keepAspect.checked) {
          const newWidth = parseInt(widthSlider.value);
          const newHeight = Math.round(newWidth / aspectRatio);
          heightSlider.value = newHeight;
        }
        updatePreview();
      });
      
      heightSlider.addEventListener('input', () => {
        if (keepAspect.checked) {
          const newHeight = parseInt(heightSlider.value);
          const newWidth = Math.round(newHeight * aspectRatio);
          widthSlider.value = newWidth;
        }
        updatePreview();
      });
      
      confirmResize.onclick = () => {
        const newWidth = parseInt(widthSlider.value);
        const newHeight = parseInt(heightSlider.value);
        
        const newPixels = processor.resize(newWidth, newHeight);
        
        let totalValidPixels = 0;
        for (let y = 0; y < newHeight; y++) {
          for (let x = 0; x < newWidth; x++) {
            const idx = (y * newWidth + x) * 4;
            const r = newPixels[idx];
            const g = newPixels[idx + 1];
            const b = newPixels[idx + 2];
            const alpha = newPixels[idx + 3];
            
            if (alpha < CONFIG.TRANSPARENCY_THRESHOLD) continue;
            if (Utils.isWhitePixel(r, g, b)) continue;
            
            totalValidPixels++;
          }
        }
        
        state.imageData.pixels = newPixels;
        state.imageData.width = newWidth;
        state.imageData.height = newHeight;
        state.imageData.totalPixels = totalValidPixels;
        state.totalPixels = totalValidPixels;
        state.paintedPixels = 0;
        
        updateStats();
        updateUI('resizeSuccess', 'success', { width: newWidth, height: newHeight });
        
        closeResizeDialog();
      };
      
      cancelResize.onclick = closeResizeDialog;
    }
    
    function closeResizeDialog() {
      resizeOverlay.style.display = 'none';
      resizeContainer.style.display = 'none';
    }
    
    initBotBtn.addEventListener('click', async () => {
      try {
        updateUI('checkingColors', 'default');
        
        state.availableColors = Utils.extractAvailableColors();
        
        if (state.availableColors.length === 0) {
          Utils.showAlert(Utils.t('noColorsFound'), 'error');
          updateUI('noColorsFound', 'error');
          return;
        }
        
        state.colorsChecked = true;
        uploadBtn.disabled = false;
        selectPosBtn.disabled = false;
        initBotBtn.style.display = 'none';
        
        updateUI('colorsFound', 'success', { count: state.availableColors.length });
        updateStats();
        
      } catch {
        updateUI('imageError', 'error');
      }
    });
    
    uploadBtn.addEventListener('click', async () => {
      try {
        updateUI('loadingImage', 'default');
        const imageSrc = await Utils.createImageUploader();
        
        const processor = new ImageProcessor(imageSrc);
        await processor.load();
        
        const { width, height } = processor.getDimensions();
        const pixels = processor.getPixelData();
        
        let totalValidPixels = 0;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = pixels[idx];
            const g = pixels[idx + 1];
            const b = pixels[idx + 2];
            const alpha = pixels[idx + 3];
            
            if (alpha < CONFIG.TRANSPARENCY_THRESHOLD) continue;
            if (Utils.isWhitePixel(r, g, b)) continue;
            
            totalValidPixels++;
          }
        }
        
        state.imageData = {
          width,
          height,
          pixels,
          totalPixels: totalValidPixels,
          processor
        };
        
        state.totalPixels = totalValidPixels;
        state.paintedPixels = 0;
        state.imageLoaded = true;
        state.lastPosition = { x: 0, y: 0 };
        
        resizeBtn.disabled = false;
        
        if (state.startPosition) {
          startBtn.disabled = false;
        }
        
        updateStats();
        updateUI('imageLoaded', 'success', { count: totalValidPixels });
      } catch {
        updateUI('imageError', 'error');
      }
    });
    
    resizeBtn.addEventListener('click', () => {
      if (state.imageLoaded && state.imageData.processor) {
        showResizeDialog(state.imageData.processor);
      }
    });
    
    selectPosBtn.addEventListener('click', async () => {
      if (state.selectingPosition) return;
      
      state.selectingPosition = true;
      state.startPosition = null;
      state.region = null;
      startBtn.disabled = true;
      
      Utils.showAlert(Utils.t('selectPositionAlert'), 'info');
      updateUI('waitingPosition', 'default');
      
      const originalFetch = window.fetch;
      
      window.fetch = async (url, options) => {
        if (typeof url === 'string' && 
            url.includes('https://backend.wplace.live/s0/pixel/') && 
            options?.method?.toUpperCase() === 'POST') {
          
          try {
            const response = await originalFetch(url, options);
            const clonedResponse = response.clone();
            const data = await clonedResponse.json();
            
            if (data?.painted === 1) {
              const regionMatch = url.match(/\/pixel\/(\d+)\/(\d+)/);
              if (regionMatch && regionMatch.length >= 3) {
                state.region = {
                  x: parseInt(regionMatch[1]),
                  y: parseInt(regionMatch[2])
                };
              }
              
              const payload = JSON.parse(options.body);
              if (payload?.coords && Array.isArray(payload.coords)) {
                state.startPosition = {
                  x: payload.coords[0],
                  y: payload.coords[1]
                };
                state.lastPosition = { x: 0, y: 0 };
                
                if (state.imageLoaded) {
                  startBtn.disabled = false;
                }
                
                window.fetch = originalFetch;
                state.selectingPosition = false;
                updateUI('positionSet', 'success');
              }
            }
            
            return response;
          } catch {
            return originalFetch(url, options);
          }
        }
        return originalFetch(url, options);
      };
      
      setTimeout(() => {
        if (state.selectingPosition) {
          window.fetch = originalFetch;
          state.selectingPosition = false;
          updateUI('positionTimeout', 'error');
          Utils.showAlert(Utils.t('positionTimeout'), 'error');
        }
      }, 120000);
    });
    
    startBtn.addEventListener('click', async () => {
      if (!state.imageLoaded || !state.startPosition || !state.region) {
        updateUI('missingRequirements', 'error');
        return;
      }
      
      state.running = true;
      state.paused = false;
      state.stopFlag = false;
      state.statistics.startTime = Date.now();
      
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      pauseBtn.style.display = 'block';
      stopBtn.disabled = false;
      uploadBtn.disabled = true;
      selectPosBtn.disabled = true;
      resizeBtn.disabled = true;
      
      updateUI('startPaintingMsg', 'success');
      Utils.log('Image painting started', 'success');
      
      try {
        await processImage();
      } catch (error) {
        Utils.log(`Painting error: ${error.message}`, 'error');
        updateUI('paintingError', 'error');
      } finally {
        state.running = false;
        state.paused = false;
        pauseBtn.disabled = true;
        pauseBtn.style.display = 'none';
        stopBtn.disabled = true;
        
        if (!state.stopFlag) {
          startBtn.disabled = true;
          uploadBtn.disabled = false;
          selectPosBtn.disabled = false;
          resizeBtn.disabled = false;
        } else {
          startBtn.disabled = false;
        }
        
        Utils.saveConfig();
      }
    });

    // Enhanced pause/resume functionality
    const pauseBtn = document.querySelector('#pauseBtn');
    pauseBtn.addEventListener('click', () => {
      state.paused = !state.paused;
      const t = Utils.t;
      
      if (state.paused) {
        pauseBtn.innerHTML = `<i class="fas fa-play"></i> <span>${t('resume')}</span>`;
        updateUI('paintingPaused', 'warning', { x: state.lastPosition.x, y: state.lastPosition.y });
        Utils.log('Painting paused', 'info');
      } else {
        pauseBtn.innerHTML = `<i class="fas fa-pause"></i> <span>${t('pause')}</span>`;
        updateUI('startPaintingMsg', 'success');
        Utils.log('Painting resumed', 'info');
      }
      Utils.playSound(state.paused ? 'warning' : 'success');
    });

    // Settings panel functionality
    const settingsBtn = document.querySelector('#settingsBtn');
    const settingsPanel = document.querySelector('#settingsPanel');
    
    settingsBtn.addEventListener('click', () => {
      const isVisible = settingsPanel.style.display !== 'none';
      settingsPanel.style.display = isVisible ? 'none' : 'block';
      settingsBtn.style.background = isVisible ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)';
    });

    // Settings toggles
    document.querySelectorAll('.wplace-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const setting = toggle.dataset.setting;
        state.settings[setting] = !state.settings[setting];
        toggle.classList.toggle('active', state.settings[setting]);
        Utils.saveConfig();
        Utils.log(`Setting ${setting} changed to ${state.settings[setting]}`, 'info');
      });
    });

    // Restart from last position
    const restartBtn = document.querySelector('#restartBtn');
    restartBtn.addEventListener('click', () => {
      if (state.lastPosition && (state.lastPosition.x > 0 || state.lastPosition.y > 0)) {
        Utils.showAlert(`Resuming from position (${state.lastPosition.x}, ${state.lastPosition.y})`, 'info');
        if (!state.running && state.imageLoaded && state.startPosition) {
          startBtn.click();
        }
      } else {
        Utils.showAlert('No saved position found', 'warning');
      }
    });

    // Reset position
    const resetPosBtn = document.querySelector('#resetPosBtn');
    resetPosBtn.addEventListener('click', () => {
      state.lastPosition = { x: 0, y: 0 };
      state.paintedPixels = 0;
      state.failedAttempts = 0;
      state.statistics.startTime = null;
      state.statistics.totalRuntime = 0;
      Utils.saveConfig();
      updateStats();
      Utils.showAlert('Position and progress reset', 'success');
      Utils.log('Position and progress reset', 'info');
    });
    
    stopBtn.addEventListener('click', () => {
      state.stopFlag = true;
      state.running = false;
      stopBtn.disabled = true;
      updateUI('paintingStopped', 'warning');
    });
  }

  // Enhanced image processing with pause/resume and smart delays
  async function processImage() {
    const { width, height, pixels } = state.imageData;
    const { x: startX, y: startY } = state.startPosition;
    const { x: regionX, y: regionY } = state.region;
    
    let startRow = state.lastPosition.y || 0;
    let startCol = state.lastPosition.x || 0;
    
    Utils.log(`Starting image processing from position (${startCol}, ${startRow})`, 'info');
    
    outerLoop:
    for (let y = startRow; y < height; y++) {
      for (let x = (y === startRow ? startCol : 0); x < width; x++) {
        // Handle pause state
        while (state.paused && state.running) {
          await Utils.sleep(1000);
          continue;
        }
        
        if (state.stopFlag || !state.running) {
          state.lastPosition = { x, y };
          updateUI('paintingPaused', 'warning', { x, y });
          Utils.log(`Painting stopped at position (${x}, ${y})`, 'info');
          break outerLoop;
        }
        
        const idx = (y * width + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const alpha = pixels[idx + 3];
        
        if (alpha < CONFIG.TRANSPARENCY_THRESHOLD) continue;
        if (Utils.isWhitePixel(r, g, b)) continue;
        
        const rgb = [r, g, b];
        const colorId = findClosestColor(rgb, state.availableColors);
        
        // Wait for charges if needed
        if (state.currentCharges < 1) {
          updateUI('noCharges', 'warning', { time: Utils.formatTime(state.cooldown) });
          Utils.log(`No charges available, waiting ${Math.ceil(state.cooldown/1000)}s`, 'warning');
          await Utils.sleep(state.cooldown);
          
          const chargeUpdate = await WPlaceService.getCharges();
          state.currentCharges = chargeUpdate.charges;
          state.cooldown = chargeUpdate.cooldown;
          continue;
        }
        
        const pixelX = startX + x;
        const pixelY = startY + y;
        
        const success = await WPlaceService.paintPixelInRegion(
          regionX,
          regionY,
          pixelX,
          pixelY,
          colorId
        );
        
        if (success) {
          state.paintedPixels++;
          state.currentCharges--;
          Utils.playSound('success');
          
          if (state.paintedPixels % CONFIG.LOG_INTERVAL === 0) {
            updateStats();
            updateUI('paintingProgress', 'default', { 
              painted: state.paintedPixels, 
              total: state.totalPixels 
            });
            Utils.log(`Progress: ${state.paintedPixels}/${state.totalPixels} pixels`, 'info');
          }
        } else {
          state.failedAttempts++;
          Utils.log(`Failed to paint pixel at (${pixelX}, ${pixelY})`, 'warning');
        }
        
        // Smart delay system
        let delay = 100; // Base delay
        if (state.settings.smartDelay) {
          delay = Utils.random(CONFIG.MIN_DELAY, CONFIG.MAX_DELAY);
        }
        
        // Adaptive delay based on success rate
        if (state.settings.adaptiveMode && state.statistics.successRate < 70) {
          delay *= 1.5;
          Utils.log('Adaptive mode: increasing delay due to low success rate', 'info');
        }
        
        await Utils.sleep(delay);
        
        // Update last position for resuming
        state.lastPosition = { x: x + 1, y };
        
        // Periodic save
        if (state.paintedPixels % 50 === 0) {
          Utils.saveConfig();
        }
      }
    }
    
    if (state.stopFlag) {
      updateUI('paintingStopped', 'warning');
      Utils.log('Painting stopped by user', 'info');
    } else {
      updateUI('paintingComplete', 'success', { count: state.paintedPixels });
      Utils.log(`Painting completed! ${state.paintedPixels} pixels painted`, 'success');
      Utils.playSound('success');
      state.lastPosition = { x: 0, y: 0 };
    }
    
    updateStats();
  }

  // Initialize the enhanced Auto-Image bot
  try {
    Utils.log('Initializing WPlace Auto-Image Pro', 'info');
    
    // Load saved configuration
    Utils.loadConfig();
    
    // Detect user language if not already set
    if (!state.language || state.language === 'en') {
      detectLanguage();
    }
    
    // Create the enhanced UI
    await createUI();
    
    Utils.log('WPlace Auto-Image Pro initialized successfully', 'success');
    
    // Auto-save configuration periodically
    setInterval(() => {
      if (state.running || state.imageLoaded) {
        Utils.saveConfig();
      }
    }, 30000); // Save every 30 seconds
    
  } catch (error) {
    console.error('WPlace Auto-Image Pro initialization failed:', error);
    Utils.log(`Initialization error: ${error.message}`, 'error');
  }
})();
