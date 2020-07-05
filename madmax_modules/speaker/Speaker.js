import TTS from "react-native-tts";

export default class Speaker {
	constructor(language, voice) {
		this.config = {
			isInit: false,
			language: language,
			voice: voice,
			speechRate: 0.5,
			speechPitch: 1,
		}

    TTS.addEventListener("tts-start");
    TTS.addEventListener("tts-finish");
    TTS.addEventListener("tts-cancel");
    TTS.setDefaultRate(this.config.speechRate);
    TTS.setDefaultPitch(this.config.speechPitch);
    TTS.getInitStatus().then(this.initTts(this.config.language, this.config.voice));
  }

	async initTts(language, voice) {
		const voices = await TTS.voices();
		const availableVoices = voices.filter(v => !v.networkConnectionRequired && !v.notInstalled).map(v => {return { id: v.id, name: v.name, language: v.language };});
    try {
			var size 			= availableVoices.length;
			for(var i = 0; i < size; i++) {
				var currentVoice 		= availableVoices[i].id;
				var currentLanguage = availableVoices[i].language;
				if(currentVoice == voice
					&& currentLanguage == language) {
					await TTS.setDefaultVoice(voice);
					await TTS.setDefaultLanguage(language);
					this.isInit = true;
					break;
				}
			}
    } catch (err) {
      console.log(`voice error `, err);
    }

  }

	async readText(text) {
		if(!this.isInit) {
			return;
		}
    TTS.stop();
    TTS.speak(text);
  };
}
