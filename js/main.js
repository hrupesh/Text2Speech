window.onload = function() {
    const syn = window.speechSynthesis;
    let voices = [];
    var voiceSelect = document.getElementById('voice-select');
    var rate = document.getElementById('rate')
    var rateValue = document.getElementById('rate-value');
    var pitch = document.getElementById('pitch');
    var pitchValue = document.getElementById('pitch-value');
    var textForm = document.querySelector('form');
    var textInput = document.querySelector('#input');
    var message = document.querySelector('#message');
    var body = document.getElementById('body');
    const get_voices = () => {
        voices = syn.getVoices();
        rate.addEventListener('change', e => { rateValue.textContent = rate.value });
        pitch.addEventListener('change', e => { pitchValue.textContent = pitch.value });
        voices.forEach(voice => {
            var opt = document.createElement('option');
            opt.textContent = voice.name + voice.lang;
            opt.setAttribute('data-lang', voice.lang);
            opt.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(opt);
        });
    };
    if (syn.onvoiceschanged !== undefined) {
        syn.onvoiceschanged = get_voices;
    }

    const speak = () => {

        const speakText = new SpeechSynthesisUtterance(textInput.value);
        if (syn.speaking) {
            message.innerHTML = "Already Speaking";
            message.className = "alert-warning";
        }

        if (textInput.value == '') {
            message.innerHTML = "Enter the Text Please.....";
            message.className = "alert-danger";
            return
        } else {
            body.style.background = "#363636 url(assets/siri.gif)"
            body.style.backgroundRepeat = 'repeat-x';
            body.style.backgroundSize = "100% 100%";
        }
        speakText.onend = e => {
            message.innerHTML = "Translated Successfully";
            message.className = "alert-success";
            body.style.background = "#202020";
        }

        speakText.onerror = e => {
            window.alert("Something went wrong....!!!");
        }

        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        syn.speak(speakText);
    }


    textForm.addEventListener('submit', e => {
        e.preventDefault();
        speak();
        textInput.blur();
    })

    voiceSelect.addEventListener('change', e => {
        speak();
    });

}