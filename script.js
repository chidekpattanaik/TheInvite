const screens = {
  one: document.getElementById('screen-1'),
  two: document.getElementById('screen-2'),
  yes: document.getElementById('screen-yes'),
  no: document.getElementById('screen-no')
};

let selectedOptions = [];
let noClickCount = 0;

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    if (screen) {
      screen.style.display = key === name ? 'block' : 'none';
    }
  });
}

function selectOpt(button) {
  const optionText = button.querySelector('.chip-title').textContent.trim();
  
  if (selectedOptions.includes(optionText)) {
    selectedOptions = selectedOptions.filter(opt => opt !== optionText);
    button.classList.remove('selected');
  } else {
    selectedOptions.push(optionText);
    button.classList.add('selected');
  }
}

function go(target) {
  if (selectedOptions.length === 0) {
    alert('Pick at least one vibe first 💕');
    return;
  }

  if (target === 'yes') {
    showScreen('yes');
    document.body.className = 'bg-party'; 
    
    // Show the floating background pictures!
    document.getElementById('yes-bg-images').style.display = 'block';
    
    if (typeof confetti === 'function') {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      setTimeout(() => {
        confetti({ particleCount: 150, spread: 120, origin: { y: 0.4 } });
      }, 500);
    }
  }
}

function goNo() {
  noClickCount++;
  const btnNo = document.getElementById('btn-no');
  const btnYes = document.getElementById('btn-yes');
  
  if (noClickCount < 3) {
    let currentNoScale = 1 - (noClickCount * 0.3); 
    let currentYesScale = 1 + (noClickCount * 0.2); 
    
    btnNo.style.transform = `scale(${currentNoScale})`;
    btnYes.style.transform = `scale(${currentYesScale})`;
    
    if (noClickCount === 1) btnNo.innerText = "Are you sure? 🥺";
    if (noClickCount === 2) btnNo.innerText = "Last chance... 😭";
    
  } else {
    // 3rd CLICK: HYPNOSIS MODE 🌀
    showScreen('no');
    
    // Trigger the mind control background
    document.body.className = 'bg-hypnotic';
    
    // Add the faint/slump animation
    document.getElementById('screen-no').classList.add('faint');
    
    noClickCount = 0;
    btnNo.style.transform = 'scale(1)';
    btnYes.style.transform = 'scale(1)';
    btnNo.innerText = "No — I'm boring 😐";
  }
}

function backToPick() {
  showScreen('two');
  document.body.className = 'bg-galaxy';
  
  // Remove faint animation
  document.getElementById('screen-no').classList.remove('faint'); 
}

function done() {
  const choices = selectedOptions.join(' & ');
  const message = `We’re set for ${choices}! Let’s pick a date. 💕`;
  
  document.getElementById('yes-bg-images').style.display = 'none';
  
  window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const openNameButton = document.getElementById('openName');
  if (openNameButton) {
    openNameButton.addEventListener('click', () => showScreen('two'));
  }

  document.querySelectorAll('.rich-chip').forEach((chip) => {
    chip.addEventListener('click', () => selectOpt(chip));
  });
});
