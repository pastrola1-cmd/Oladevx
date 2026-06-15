/* ==========================================================================
   OLADEVX LIVE TELEMETRY SIMULATOR
   ========================================================================== */

class TelemetrySimulator {
  constructor() {
    this.history = {
      scalewealth: [15, 18, 14, 16, 20, 18, 17, 19, 16, 18],
      schoolos: [22, 25, 24, 28, 23, 27, 26, 25, 28, 30],
      vyza: [40, 42, 45, 38, 41, 46, 44, 43, 47, 45],
      mannabible: [8, 10, 9, 11, 8, 12, 10, 9, 11, 10]
    };
    
    this.init();
  }

  init() {
    // Run simulation loop every 2.5 seconds
    this.updateStats();
    this.intervalId = setInterval(() => this.updateStats(), 2500);
  }

  getRandomValue(base, variance) {
    const delta = (Math.random() * 2 - 1) * variance;
    return Math.round(base + delta);
  }

  drawSparkline(canvasId, historyData, color = '#00d4aa') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set display size
    const width = 120;
    const height = 30;
    
    // Set actual buffer size multiplied by DPR
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // Scale context back
    ctx.scale(dpr, dpr);
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    const max = Math.max(...historyData, 1);
    const min = Math.min(...historyData, 0);
    const range = max - min === 0 ? 1 : max - min;
    
    ctx.beginPath();
    for (let i = 0; i < historyData.length; i++) {
      const x = (i / (historyData.length - 1)) * width;
      const y = height - ((historyData[i] - min) / range) * (height - 6) - 3;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // Create fill under sparkline
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = color === '#00d4aa' ? 'rgba(0, 212, 170, 0.05)' : 'rgba(108, 99, 255, 0.05)';
    ctx.fill();
  }

  updateStats() {
    // 1. Scalewealth Stats
    const swUsers = this.getRandomValue(340, 15);
    const swLatency = this.getRandomValue(52, 4);
    const swCpu = this.getRandomValue(15, 3);
    this.history.scalewealth.shift();
    this.history.scalewealth.push(swCpu);
    
    this.setTextContent('sw-users', swUsers);
    this.setTextContent('sw-latency', swLatency + 'ms');
    this.setTextContent('sw-cpu', swCpu + '%');
    this.drawSparkline('sw-sparkline', this.history.scalewealth, '#00d4aa');

    // 2. SchoolOS Stats
    const sosUsers = this.getRandomValue(1430, 25);
    const sosLatency = this.getRandomValue(31, 3);
    const sosCpu = this.getRandomValue(24, 4);
    this.history.schoolos.shift();
    this.history.schoolos.push(sosCpu);
    
    this.setTextContent('sos-users', sosUsers);
    this.setTextContent('sos-latency', sosLatency + 'ms');
    this.setTextContent('sos-cpu', sosCpu + '%');
    this.drawSparkline('sos-sparkline', this.history.schoolos, '#00d4aa');

    // 3. Vyza Stats (AI response times and accuracy)
    const vyzaUsers = this.getRandomValue(2450, 50);
    const vyzaLatency = this.getRandomValue(195, 15);
    const vyzaCpu = this.getRandomValue(98, 1); // Represents AI Accuracy %
    this.history.vyza.shift();
    this.history.vyza.push(vyzaCpu);
    
    this.setTextContent('vyza-users', vyzaUsers);
    this.setTextContent('vyza-latency', vyzaLatency + 'ms');
    this.setTextContent('vyza-cpu', vyzaCpu + '.8%');
    this.drawSparkline('vyza-sparkline', this.history.vyza, '#6c63ff');

    // 4. Manna Bible App Stats
    const mnUsers = this.getRandomValue(915, 12);
    const mnLatency = this.getRandomValue(14, 2);
    const mnCpu = this.getRandomValue(10, 2);
    this.history.mannabible.shift();
    this.history.mannabible.push(mnCpu);
    
    this.setTextContent('mn-users', mnUsers);
    this.setTextContent('mn-latency', mnLatency + 'ms');
    this.setTextContent('mn-cpu', mnCpu + '%');
    this.drawSparkline('mn-sparkline', this.history.mannabible, '#6c63ff');

    // 5. DevLoop Stats
    const dlDownloads = this.getRandomValue(3535, 3);
    const dlUptime = '99.98%';
    this.setTextContent('dl-downloads', dlDownloads);
    this.setTextContent('dl-uptime', dlUptime);
    
    // Update global timestamp in UTC
    const now = new Date();
    const timeString = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    this.setTextContent('telemetry-clock', timeString);
  }

  setTextContent(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
}

// Initialise Telemetry Simulator when page loads
document.addEventListener('DOMContentLoaded', () => {
  new TelemetrySimulator();
});
