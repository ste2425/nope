const nopeUrl = chrome.runtime.getURL("nope.mp3");

const excludeMatches = ['.nope-ext-overlay', 'body', 'html'];

let enabled = false;

document.addEventListener('click', (e) => {
    if (!enabled)
        return;

    e.stopPropagation();
    e.preventDefault();

    const target = e.target;

    if (!target || excludeMatches.some(x => target.matches(x)))
        return;

    target.remove();

    const audio = new Audio(nopeUrl);
    audio.play();
});

chrome.runtime.onMessage.addListener(() => {        
    enabled = !enabled;        

    if (enabled)
        createOverlay();
    else 
        removeOverlay();
});

function removeOverlay() {
    const overlay = document.querySelector('.nope-ext-overlay');

    if (overlay)
        overlay.remove();
}

function createOverlay() {
    const overlay = document.createElement('div');

    overlay.classList.add('nope-ext-overlay');

    document.body.appendChild(overlay);
}