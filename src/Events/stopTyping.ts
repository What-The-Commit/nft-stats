function debounce(inputFunction, timeToWaitBeforeFiringInMs = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            inputFunction.apply(this, args);
        }, timeToWaitBeforeFiringInMs);
    };
}

export function stopTyping(node) {
    const handleKeyup = debounce(function (event) {
        if (node.contains(event.target)) {
            node.dispatchEvent(new CustomEvent('stopTyping'));
        }
    }, 1000);

    // (4) add a generic keyup event
    window.addEventListener('keyup', handleKeyup, true);

    return {
        destroy() {
            // (5) cleanup on destroy
            window.removeEventListener('keyup', handleKeyup, true);
        }
    };
}