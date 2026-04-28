function startRotator(rotator) {
    const cases = rotator.querySelectorAll('.rotator__case');
    if (cases.length === 0) return;
    
    let currentIndex = 0;
    
    cases.forEach((item, index) => {
        if (item.classList.contains('rotator__case_active')) {
            currentIndex = index;
        }
    });
    
    setInterval(() => {
        cases[currentIndex].classList.remove('rotator__case_active');
        
        currentIndex = (currentIndex + 1) % cases.length;
        
        cases[currentIndex].classList.add('rotator__case_active');
    }, 1000);
}

const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
    startRotator(rotator);
});