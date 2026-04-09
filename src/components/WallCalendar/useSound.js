let audioCtx = null;

export const playFlipSound = () => {
    try {
        if (typeof window === "undefined") return;

        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            audioCtx = new AudioContext();
        }
        
        // Ensure context is running (fixes browsers that suspend audio context before user interaction)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const bufferSize = audioCtx.sampleRate * 0.15; // 150ms
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate a rustling noise profile
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.4;
        }
        
        const noiseSource = audioCtx.createBufferSource();
        noiseSource.buffer = buffer;
        
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        // Sharp attack for the initial pulling tear
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
        // Quick decay as the paper releases
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.14);
        
        // Lowpass filter to simulate the muffled, dull sound of thick matte paper
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, audioCtx.currentTime);
        filter.frequency.linearRampToValueAtTime(200, audioCtx.currentTime + 0.15);
        
        noiseSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        noiseSource.start();
    } catch (e) {
        console.error("Audio playback failed", e);
    }
};
