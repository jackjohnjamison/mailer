(() => {
    const content = document.getElementById('content')

    const brightnessToggle = document.createElement("button")
    content.prepend(brightnessToggle)
    
    brightnessToggle.id = "brightness-mode"
    
    brightnessToggle.addEventListener( 'click', toggleBrightness)
    
    function toggleBrightness() {
        content.classList.toggle("dark")
    }
})()