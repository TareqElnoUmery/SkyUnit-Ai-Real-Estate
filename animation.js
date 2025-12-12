// SkyUnit Interactive Animation Script
const enterBtn = document.getElementById('enter');
const real = document.getElementById('realworld');
const sky = document.getElementById('skyunit');
const sound = document.getElementById('sound');

if(enterBtn) {
  enterBtn.addEventListener('click', () => {
    if(sound) sound.play();
    
    // كسر الشاشة
    const rect = enterBtn.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    const shatter = document.createElement('div');
    shatter.className = 'shatter';
    shatter.style.setProperty('--x', x + 'px');
    shatter.style.setProperty('--y', y + 'px');
    document.body.appendChild(shatter);

    // أمطار نيون + 100 خط
    const rain = document.querySelector('.rain');
    if(rain) {
      for(let i=0; i<100; i++){
        const drop = document.createElement('div');
        drop.style.position='absolute';
        drop.style.left = Math.random()*100 + 'vw';
        drop.style.width='2px';
        drop.style.height=Math.random()*100+50+'px';
        drop.style.background='linear-gradient(transparent,#00f2ff)';
        drop.style.animation = `rain ${1+Math.random()}s linear infinite`;
        drop.style.animationDelay = Math.random()*2+'s';
        rain.appendChild(drop);
      }
    }

    setTimeout(() => {
      if(real) real.classList.add('hidden');
      if(sky) sky.classList.remove('hidden');
      init3D();
    }, 1500);
  });
}

function init3D() {
  const canvas = document.getElementById('canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  // Avatar + Orbital Ring
  let angle = 0;
  const segments = 8;
  const labels = ["NEURAL","VOID","FORGE","REALMS","VAULT","STREAM","CORE","ABYSS"];
  const colors = ["#00f2ff","#c41eff","#ff6a00","#00ff9d","#fff","#8a2be2","#ffd700","#ff0044"];

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx = canvas.width/2;
    const cy = canvas.height/2;
    angle += 0.005;

    // Avatar وسط
    ctx.strokeStyle = '#00f2ff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for(let i=0; i<360; i+=10){
      const a = i*Math.PI/180 + angle*2;
      const r = 80 + Math.sin(a*6)*20;
      const x = cx + Math.cos(a)*r;
      const y = cy + Math.sin(a)*r;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();

    // Orbital Ring
    for(let i=0; i<segments; i++){
      const a = angle + i*(Math.PI*2/segments);
      const x = cx + Math.cos(a)*200;
      const y = cy + Math.sin(a)*200;
      
      // القطعة
      ctx.fillStyle = colors[i];
      ctx.shadowBlur = 50;
      ctx.shadowColor = colors[i];
      ctx.fillRect(x-40, y-20, 80, 40);
      
      // النص
      ctx.fillStyle = '#fff';
      ctx.font = '16px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x, y+5);
    }
    requestAnimationFrame(draw);
  }
  draw();
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('canvas');
  if(canvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
});

// Initialize on page load
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('SkyUnit animation initialized');
  });
} else {
  console.log('SkyUnit animation initialized');
}
