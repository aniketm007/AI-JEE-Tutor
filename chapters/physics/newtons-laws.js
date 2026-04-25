// ═══════════════════════════════════════════════════════════
// CHAPTER: Newton's Laws of Motion
// Physics · Class 11  
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// ANIMATED DIAGRAM DRAW FUNCTIONS
// Each takes (canvas, t) where t = seconds since start
// ═══════════════════════════════════════════════════════════

function drawInertia(canvas, t){
  const w=canvas.width||600; const h=80; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,w,h);
  // Background
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  // Ground stripes
  ctx.fillStyle='#20253a'; ctx.fillRect(0,h-14,w,14);
  for(let x=0;x<w;x+=18){ctx.fillStyle='#1D9E75';ctx.fillRect(x,h-17,9,4);}
  // Ball moving at constant velocity (inertia)
  const speed=60; // px/s
  const bx=((w*0.3 + t*speed) % (w*0.85)) + w*0.05;
  const by=h-28;
  ctx.beginPath();ctx.arc(bx,by,14,0,Math.PI*2);
  ctx.fillStyle='#3b82f6';ctx.fill();
  ctx.strokeStyle='#60a5fa';ctx.lineWidth=1.5;ctx.stroke();
  // Velocity arrow
  ctx.strokeStyle='#22c55e';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(bx+16,by);ctx.lineTo(bx+46,by);ctx.stroke();
  ctx.beginPath();ctx.moveTo(bx+38,by-5);ctx.lineTo(bx+48,by);ctx.lineTo(bx+38,by+5);
  ctx.fillStyle='#22c55e';ctx.fill();
  // Labels
  ctx.fillStyle='#ef4444';ctx.font='500 12px system-ui';ctx.textAlign='center';
  ctx.fillText('Net Force = 0  →  velocity never changes',w/2,18);
  ctx.fillStyle='#22c55e';ctx.font='10px system-ui';ctx.textAlign='left';
  ctx.fillText('v = constant',bx+52,by+4);
  ctx.textAlign='left';
}

function drawFma(canvas, t){
  const w=canvas.width||600; const h=110; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  // Ground
  ctx.fillStyle='#20253a'; ctx.fillRect(0,h-12,w,12);

  const cycle=4; // seconds per full cycle
  const frac=(t%cycle)/cycle;
  // Ease in-out
  const ease=frac<0.5?2*frac*frac:(1-Math.pow(-2*frac+2,2)/2);

  const maxMove1=180, maxMove2=70; // 2kg moves 2.57x more (a inversely proportional to m)

  // Block 1 (2kg) — starts at x=40, max moves maxMove1
  const b1x=40+ease*maxMove1;
  ctx.fillStyle='#1e3a5f';ctx.fillRect(b1x,h-55,42,43);
  ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.strokeRect(b1x,h-55,42,43);
  ctx.fillStyle='#60a5fa';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('2 kg',b1x+21,h-29);
  // Force arrow for block 1
  ctx.strokeStyle='#22c55e';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(b1x+44,h-33);ctx.lineTo(b1x+84,h-33);ctx.stroke();
  ctx.beginPath();ctx.moveTo(b1x+76,h-39);ctx.lineTo(b1x+86,h-33);ctx.lineTo(b1x+76,h-27);
  ctx.fillStyle='#22c55e';ctx.fill();
  ctx.fillStyle='#22c55e';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('F',b1x+64,h-42);
  // Acceleration label
  ctx.fillStyle='#f59e0b';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('a = F/2',b1x+21,h-62);

  // Block 2 (10kg) — starts at x=w/2+10, max moves maxMove2
  const b2x=w/2+10+ease*maxMove2;
  ctx.fillStyle='#3b1f00';ctx.fillRect(b2x,h-60,62,48);
  ctx.strokeStyle='#f59e0b';ctx.lineWidth=1.5;ctx.strokeRect(b2x,h-60,62,48);
  ctx.fillStyle='#fbbf24';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('10 kg',b2x+31,h-31);
  // Force arrow for block 2
  ctx.strokeStyle='#22c55e';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(b2x+64,h-36);ctx.lineTo(b2x+104,h-36);ctx.stroke();
  ctx.beginPath();ctx.moveTo(b2x+96,h-42);ctx.lineTo(b2x+106,h-36);ctx.lineTo(b2x+96,h-30);
  ctx.fillStyle='#22c55e';ctx.fill();
  ctx.fillStyle='#22c55e';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('F',b2x+84,h-45);
  // Acceleration label
  ctx.fillStyle='#f59e0b';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('a = F/10',b2x+31,h-68);

  // Title
  ctx.fillStyle='#a78bfa';ctx.font='500 12px system-ui';ctx.textAlign='center';
  ctx.fillText('Same force — bigger mass = less acceleration',w/2,14);
  ctx.textAlign='left';
}

function drawAction(canvas, t){
  const w=canvas.width||600; const h=130; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);

  const cycle=3;
  const frac=(t%cycle)/cycle;
  const ease=frac<0.5?2*frac*frac:(1-Math.pow(-2*frac+2,2)/2);
  const gap=10+ease*40; // gap grows as they push apart

  const cx=w/2;
  const cy=h/2+10;
  const bw=80, bh=44;

  // Body A (left, moves left)
  const ax=cx-gap-bw;
  ctx.fillStyle='#1e3a5f';ctx.fillRect(ax,cy-bh/2,bw,bh);
  ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.strokeRect(ax,cy-bh/2,bw,bh);
  ctx.fillStyle='#60a5fa';ctx.font='500 12px system-ui';ctx.textAlign='center';
  ctx.fillText('Body A',ax+bw/2,cy+5);

  // Body B (right, moves right)
  const bx=cx+gap;
  ctx.fillStyle='#3b1f00';ctx.fillRect(bx,cy-bh/2,bw,bh);
  ctx.strokeStyle='#f59e0b';ctx.lineWidth=1.5;ctx.strokeRect(bx,cy-bh/2,bw,bh);
  ctx.fillStyle='#fbbf24';ctx.font='500 12px system-ui';ctx.textAlign='center';
  ctx.fillText('Body B',bx+bw/2,cy+5);

  // Action arrow: A→B
  const arrowLen=Math.max(8, gap-4);
  ctx.strokeStyle='#3b82f6';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(ax+bw,cy-10);ctx.lineTo(ax+bw+arrowLen,cy-10);ctx.stroke();
  ctx.beginPath();ctx.moveTo(ax+bw+arrowLen-6,cy-16);ctx.lineTo(ax+bw+arrowLen+2,cy-10);ctx.lineTo(ax+bw+arrowLen-6,cy-4);
  ctx.fillStyle='#3b82f6';ctx.fill();
  ctx.fillStyle='#60a5fa';ctx.font='10px system-ui';ctx.textAlign='center';
  ctx.fillText('Action → F',cx,cy-18);

  // Reaction arrow: B→A
  ctx.strokeStyle='#f59e0b';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(bx,cy+10);ctx.lineTo(bx-arrowLen,cy+10);ctx.stroke();
  ctx.beginPath();ctx.moveTo(bx-arrowLen+6,cy+4);ctx.lineTo(bx-arrowLen-2,cy+10);ctx.lineTo(bx-arrowLen+6,cy+16);
  ctx.fillStyle='#f59e0b';ctx.fill();
  ctx.fillStyle='#fbbf24';ctx.font='10px system-ui';ctx.textAlign='center';
  ctx.fillText('Reaction ← F',cx,cy+26);

  ctx.fillStyle='#ef4444';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('Acts on DIFFERENT bodies — they do NOT cancel!',w/2,h-8);
  ctx.textAlign='left';
}

// Static diagrams (no animation needed — complex geometry, text-heavy)
function drawIncline(canvas){
  const w=canvas.width||600; const h=130; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  // Incline triangle
  ctx.beginPath();ctx.moveTo(30,h-20);ctx.lineTo(w-60,h-20);ctx.lineTo(w-60,40);ctx.closePath();
  ctx.fillStyle='#20253a';ctx.fill();ctx.strokeStyle='#555b72';ctx.lineWidth=1.5;ctx.stroke();
  // Angle arc
  ctx.beginPath();ctx.arc(30,h-20,32,-(Math.PI*0.3),0);ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.stroke();
  ctx.fillStyle='#60a5fa';ctx.font='500 11px system-ui';ctx.fillText('30°',74,h-24);
  // Block on incline
  const bx=w-152,by=h-82;
  ctx.save();ctx.translate(bx,by);ctx.rotate(-0.3);
  ctx.fillStyle='#1e3a5f';ctx.fillRect(-20,-14,40,28);ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.strokeRect(-20,-14,40,28);
  ctx.fillStyle='#60a5fa';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText('2 kg',0,5);
  ctx.restore();
  // mg arrow
  ctx.strokeStyle='#ef4444';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx,by+52);ctx.stroke();
  ctx.beginPath();ctx.moveTo(bx-4,by+44);ctx.lineTo(bx,by+54);ctx.lineTo(bx+4,by+44);ctx.fillStyle='#ef4444';ctx.fill();
  ctx.fillStyle='#ef4444';ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('mg',bx+6,by+40);
  // mg sin component
  ctx.strokeStyle='#22c55e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx-38,by+13);ctx.stroke();
  ctx.beginPath();ctx.moveTo(bx-31,by+7);ctx.lineTo(bx-41,by+15);ctx.lineTo(bx-33,by+21);ctx.fillStyle='#22c55e';ctx.fill();
  ctx.fillStyle='#22c55e';ctx.font='10px system-ui';ctx.textAlign='right';ctx.fillText('mg sin30°',bx-44,by+12);
  ctx.fillStyle='#a78bfa';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('a = g sin30° = 10 × 0.5 = 5 m/s²',w/2,h-4);
  ctx.textAlign='left';
}

function drawElevator(canvas){
  const w=canvas.width||600; const h=130; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  const cx=w/2,by=h/2-5;
  // Elevator box
  ctx.strokeStyle='#555b72';ctx.lineWidth=2;ctx.strokeRect(cx-65,by-55,130,92);
  ctx.fillStyle='#13161e';ctx.fillRect(cx-64,by-54,128,90);
  // Cable
  ctx.strokeStyle='#8a8fa8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,by-55);ctx.lineTo(cx,by-75);ctx.stroke();
  // Person
  ctx.beginPath();ctx.arc(cx,by-28,10,0,Math.PI*2);ctx.fillStyle='#6c63ff';ctx.fill();
  ctx.fillStyle='#6c63ff';ctx.fillRect(cx-8,by-18,16,26);
  ctx.fillStyle='#a78bfa';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText('60 kg',cx,by+18);
  // mg arrow
  ctx.strokeStyle='#ef4444';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-22,by-20);ctx.lineTo(cx-22,by+20);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx-26,by+12);ctx.lineTo(cx-22,by+22);ctx.lineTo(cx-18,by+12);ctx.fillStyle='#ef4444';ctx.fill();
  ctx.fillStyle='#ef4444';ctx.font='10px system-ui';ctx.textAlign='right';ctx.fillText('mg↓',cx-26,by-4);
  // N arrow
  ctx.strokeStyle='#22c55e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx+22,by+10);ctx.lineTo(cx+22,by-30);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx+18,by-22);ctx.lineTo(cx+22,by-32);ctx.lineTo(cx+26,by-22);ctx.fillStyle='#22c55e';ctx.fill();
  ctx.fillStyle='#22c55e';ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('N↑',cx+26,by-8);
  // a arrow outside
  ctx.strokeStyle='#f59e0b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx+74,by+20);ctx.lineTo(cx+74,by-20);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx+70,by-13);ctx.lineTo(cx+74,by-23);ctx.lineTo(cx+78,by-13);ctx.fillStyle='#f59e0b';ctx.fill();
  ctx.fillStyle='#f59e0b';ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('a↑',cx+78,by+4);
  ctx.fillStyle='#a78bfa';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('N − mg = ma  →  N = m(g + a)',w/2,h-5);
  ctx.textAlign='left';
}

function drawAtwood(canvas, t){
  const w=canvas.width||600; const h=150; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  const cx=w/2, py=30;

  const cycle=3;
  const frac=(t%cycle)/cycle;
  const ease=frac<0.5?2*frac*frac:(1-Math.pow(-2*frac+2,2)/2);
  const drop=ease*40; // m2 drops, m1 rises

  // Pulley support bar
  ctx.strokeStyle='#555b72';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-22,12);ctx.lineTo(cx+22,12);ctx.stroke();
  // Pulley circle
  ctx.beginPath();ctx.arc(cx,py,18,0,Math.PI*2);ctx.strokeStyle='#8a8fa8';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle='#1a1e2a';ctx.fill();
  ctx.beginPath();ctx.arc(cx,py,7,0,Math.PI*2);ctx.strokeStyle='#8a8fa8';ctx.lineWidth=1.5;ctx.stroke();

  // Left string (m1 rises = moves up as drop increases)
  const m1y=py+32-drop;
  ctx.strokeStyle='#8a8fa8';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(cx-18,py);ctx.lineTo(cx-40,py);ctx.lineTo(cx-40,m1y);ctx.stroke();
  // m1 block
  ctx.fillStyle='#1e3a5f';ctx.fillRect(cx-65,m1y,50,44);ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.strokeRect(cx-65,m1y,50,44);
  ctx.fillStyle='#60a5fa';ctx.font='500 11px system-ui';ctx.textAlign='center';ctx.fillText('m₁=3',cx-40,m1y+26);
  ctx.fillStyle='#60a5fa';ctx.font='9px system-ui';ctx.fillText('↑',cx-40,m1y-4);

  // Right string (m2 falls = moves down as drop increases)
  const m2y=py+32+drop;
  ctx.beginPath();ctx.moveTo(cx+18,py);ctx.lineTo(cx+40,py);ctx.lineTo(cx+40,m2y);ctx.stroke();
  // m2 block
  ctx.fillStyle='#3b1f00';ctx.fillRect(cx+15,m2y,50,54);ctx.strokeStyle='#f59e0b';ctx.lineWidth=1.5;ctx.strokeRect(cx+15,m2y,50,54);
  ctx.fillStyle='#fbbf24';ctx.font='500 11px system-ui';ctx.textAlign='center';ctx.fillText('m₂=7',cx+40,m2y+30);
  ctx.fillStyle='#fbbf24';ctx.font='9px system-ui';ctx.fillText('↓',cx+40,m2y-4);

  // Tension labels
  ctx.fillStyle='#8a8fa8';ctx.font='10px system-ui';ctx.textAlign='center';
  ctx.fillText('T',cx-52,m1y-6);ctx.fillText('T',cx+52,m2y-6);

  ctx.fillStyle='#a78bfa';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('a = (m₂ − m₁)g / (m₁ + m₂)',w/2,h-5);
  ctx.textAlign='left';
}

function drawStaticFriction(canvas){
  const w=canvas.width||600; const h=120; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  const cx=w/2,by=h/2+8;
  // Truck outline
  ctx.strokeStyle='#555b72';ctx.lineWidth=1.5;ctx.strokeRect(50,by-52,w-120,56);
  ctx.fillStyle='#13161e';ctx.fillRect(51,by-51,w-122,54);
  ctx.fillStyle='#555b72';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText('Truck accelerating →',cx,by-58);
  // Block on truck
  ctx.fillStyle='#1e3a5f';ctx.fillRect(cx-30,by-46,60,40);ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.strokeRect(cx-30,by-46,60,40);
  ctx.fillStyle='#60a5fa';ctx.font='500 11px system-ui';ctx.textAlign='center';ctx.fillText('Block',cx,by-22);
  // Static friction arrow forward
  ctx.strokeStyle='#22c55e';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(cx+32,by-26);ctx.lineTo(cx+85,by-26);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx+78,by-32);ctx.lineTo(cx+88,by-26);ctx.lineTo(cx+78,by-20);ctx.fillStyle='#22c55e';ctx.fill();
  ctx.fillStyle='#22c55e';ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('Static friction →',cx+34,by-34);
  ctx.fillStyle='#f59e0b';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('Friction acts forward to prevent slipping',w/2,h-5);
  ctx.textAlign='left';
}

function drawConnectedBlocks(canvas, t){
  const w=canvas.width||600; const h=110; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  const cy=h/2+5;

  const cycle=4;
  const frac=(t%cycle)/cycle;
  const ease=frac<0.5?2*frac*frac:(1-Math.pow(-2*frac+2,2)/2);
  const shift=ease*80;

  // Ground
  ctx.fillStyle='#20253a';ctx.fillRect(20,cy+28,w-100,8);
  // m1
  const m1x=40+shift;
  ctx.fillStyle='#1e3a5f';ctx.fillRect(m1x,cy-22,56,50);ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.strokeRect(m1x,cy-22,56,50);
  ctx.fillStyle='#60a5fa';ctx.font='500 12px system-ui';ctx.textAlign='center';ctx.fillText('m₁',m1x+28,cy+5);
  // String
  ctx.strokeStyle='#8a8fa8';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(m1x+56,cy+2);ctx.lineTo(m1x+110,cy+2);ctx.stroke();
  ctx.fillStyle='#8a8fa8';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText('T',m1x+83,cy-5);
  // m2
  ctx.fillStyle='#3b1f00';ctx.fillRect(m1x+110,cy-26,56,54);ctx.strokeStyle='#f59e0b';ctx.lineWidth=1.5;ctx.strokeRect(m1x+110,cy-26,56,54);
  ctx.fillStyle='#fbbf24';ctx.font='500 12px system-ui';ctx.textAlign='center';ctx.fillText('m₂',m1x+138,cy+5);
  // Force F arrow (if not too far right)
  if(m1x > 24){
    ctx.strokeStyle='#22c55e';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(Math.max(20,m1x-40),cy+2);ctx.lineTo(m1x-2,cy+2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(m1x-8,cy-3);ctx.lineTo(m1x,cy+2);ctx.lineTo(m1x-8,cy+7);ctx.fillStyle='#22c55e';ctx.fill();
  } else {
    ctx.strokeStyle='#22c55e';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(20,cy+2);ctx.lineTo(m1x-2,cy+2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(m1x-8,cy-3);ctx.lineTo(m1x,cy+2);ctx.lineTo(m1x-8,cy+7);ctx.fillStyle='#22c55e';ctx.fill();
  }
  ctx.fillStyle='#22c55e';ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillText('F',30,cy-5);
  ctx.fillStyle='#a78bfa';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('a = F/(m₁+m₂)    Tension T = m₂ × a',w/2,h-5);
  ctx.textAlign='left';
}

function drawNormalForce(canvas){
  const w=canvas.width||600; const h=130; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#0b0d12'; ctx.fillRect(0,0,w,h);
  const cx=w/2,by=h/2-5;
  // Ground
  ctx.fillStyle='#20253a';ctx.fillRect(cx-100,by+32,200,10);
  ctx.strokeStyle='#555b72';ctx.lineWidth=1;ctx.strokeRect(cx-100,by+32,200,10);
  // Block
  ctx.fillStyle='#1e3a5f';ctx.fillRect(cx-35,by-28,70,60);ctx.strokeStyle='#3b82f6';ctx.lineWidth=1.5;ctx.strokeRect(cx-35,by-28,70,60);
  ctx.fillStyle='#60a5fa';ctx.font='500 12px system-ui';ctx.textAlign='center';ctx.fillText('Block m',cx,by+8);
  // mg arrow down through block
  ctx.strokeStyle='#ef4444';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,by-28);ctx.lineTo(cx,by-64);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx-4,by-56);ctx.lineTo(cx,by-66);ctx.lineTo(cx+4,by-56);ctx.fillStyle='#ef4444';ctx.fill();
  ctx.fillStyle='#ef4444';ctx.font='10px system-ui';ctx.textAlign='right';ctx.fillText('mg on Earth',cx-6,by-46);
  // N arrow up from block
  ctx.strokeStyle='#22c55e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,by+32);ctx.lineTo(cx,by+68);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx-4,by+60);ctx.lineTo(cx,by+70);ctx.lineTo(cx+4,by+60);ctx.fillStyle='#22c55e';ctx.fill();
  ctx.fillStyle='#22c55e';ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('N on ground',cx+6,by+55);
  ctx.fillStyle='#f59e0b';ctx.font='500 11px system-ui';ctx.textAlign='center';
  ctx.fillText('N = mg only in equilibrium (a = 0)',w/2,h-5);
  ctx.textAlign='left';
}

async function teachC1(feed){
  await addBub(feed,`Before we touch any formula — let's discover the building blocks yourself. No definitions. Just real life.`,'ai',0);
  feed.appendChild(makeDiag('Same force — different mass → different acceleration',drawFma));
  await addBub(feed,`Watch the animation. The same force F acts on a 2 kg block and a 10 kg block. The 2 kg block moves much faster. Why?`,'ai',400);

  const btns=document.createElement('div');btns.style.cssText='display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;';
  [['Because 2 kg is lighter','correct'],['Because F is bigger on 2 kg','wrong'],['Because 10 kg has more friction','wrong']].forEach(([txt,type])=>{
    const b=document.createElement('button');b.className='btn '+(type==='correct'?'bg':'ba');b.textContent=txt;
    b.onclick=async()=>{
      btns.remove();
      await addBub(feed,txt,'student',0);
      if(type==='correct'){
        await addBub(feed,`<span class="hg">✓ Exactly!</span> Same force, lighter object → more acceleration.<br><br>This is because <em>mass</em> is the measure of how strongly an object resists being moved. More mass = more inertia = harder to accelerate.`,'ok',200);
      } else {
        await addBub(feed,`<span class="ha">Not quite.</span> The force is identical on both. The difference is the <em>mass</em>. The 10 kg block resists the force 5× more — that's the definition of <em>inertia</em>.`,'ng',200);
      }
      await delay(400);
      await addBub(feed,`<div class="fbox"><strong>Force</strong> — a push or pull that changes how something moves<br><strong>Mass</strong> — the measure of inertia (resistance to acceleration)<br><strong>Inertia</strong> — tendency of an object to resist any change in its state of motion</div>`,'ai',300);
      await addBub(feed,`<div class="warn"><div class="warn-t">⚠ Mass ≠ Weight</div><div class="warn-b"><strong>Mass (kg)</strong>: amount of matter — same everywhere<br><strong>Weight (N)</strong>: gravitational force = mg — changes with location<br>On the Moon, your mass is unchanged but your weight is 1/6th.</div></div>`,'ai',500);
    };
    btns.appendChild(b);
  });
  feed.appendChild(btns);
}

async function teachC2(feed){
  await addBub(feed,`You've seen what force and mass are. Now: what happens when there is <em>no net force</em> on an object?`,'ai',0);
  feed.appendChild(makeDiag('Net force = 0 → velocity never changes',drawInertia));
  await addBub(feed,`<span class="hi">Newton's First Law:</span> An object at rest stays at rest, and an object in motion stays in motion at constant velocity — <strong>unless a net external force acts on it.</strong><br><br>The ball in the animation has zero net force. It rolls forever without slowing down. In real life, friction stops it — but friction is a force!`,'ai',400);
  await addCont(feed);
  await addBub(feed,`Here's the most common JEE trap on Law 1. Think carefully:`,'ai',200);
  await addBub(feed,`A bus is moving at 60 km/h. The driver brakes suddenly. A standing passenger lurches <strong>forward</strong>. What correctly explains this?`,'ai',200);

  const mcqBtns=document.createElement('div');mcqBtns.style.cssText='display:flex;flex-direction:column;gap:7px;margin:8px 0;';
  const opts=[
    ['The brakes pushed the passenger forward','wrong','Brakes act on the wheels of the bus — they have no direct mechanism to push the passenger. Brakes decelerate the bus, not the passenger.'],
    ["Passenger's inertia keeps them moving while the bus decelerates",'correct','Exactly! Before braking: passenger moves at 60 km/h with the bus. Bus brakes: force acts on bus, not directly on passenger. Passenger continues at 60 km/h by Newton\'s 1st Law while bus slows. This appears as a forward lurch.'],
    ['Friction from the seat pushes the passenger forward','wrong','Seat friction acts backward on the passenger (opposing forward sliding tendency) — it decelerates the passenger, not accelerates them.'],
  ];
  opts.forEach(([txt,type,explain])=>{
    const b=document.createElement('button');
    b.style.cssText='display:flex;align-items:flex-start;gap:9px;padding:11px 13px;background:var(--surface2);border:1px solid var(--border);border-radius:9px;cursor:pointer;font-size:13px;color:var(--text);text-align:left;';
    b.innerHTML=`<span style="width:22px;height:22px;border-radius:6px;background:var(--surface3);display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${'ABC'[opts.indexOf(opts.find(o=>o[0]===txt))]}</span><span>${txt}</span>`;
    b.onmouseover=()=>{if(!b.dataset.answered)b.style.borderColor='var(--accent2)';};
    b.onmouseout=()=>{if(!b.dataset.answered)b.style.borderColor='var(--border)';};
    b.onclick=async()=>{
      mcqBtns.querySelectorAll('button').forEach(x=>{x.style.pointerEvents='none';x.style.opacity='.4';});
      b.style.opacity='1';b.dataset.answered='1';
      b.style.background=type==='correct'?'rgba(34,197,94,.1)':'rgba(239,68,68,.08)';
      b.style.borderColor=type==='correct'?'var(--green)':'rgba(239,68,68,.3)';
      b.style.color=type==='correct'?'var(--green)':'var(--red)';
      if(type!=='correct'){
        // also highlight correct
        mcqBtns.querySelectorAll('button').forEach((x,i)=>{
          if(opts[i][1]==='correct'){x.style.opacity='1';x.style.background='rgba(34,197,94,.1)';x.style.borderColor='var(--green)';x.style.color='var(--green)';}
        });
      }
      await addBub(feed,txt,'student',0);
      await addBub(feed,type==='correct'
        ?`<span class="hg">✓ Correct!</span> ${explain}<br><br><span class="ha">JEE Mains 2010 asked this exact scenario.</span>`
        :`<span class="ha">Not quite.</span> ${explain}`
        ,type==='correct'?'ok':'ng',300);
      await addBub(feed,`<div class="warn"><div class="warn-t">⚠ JEE Trap</div><div class="warn-b"><strong>Pseudo force:</strong> In a non-inertial frame (accelerating bus), the passenger appears to experience a backward force. This is NOT real — it only exists in the accelerating frame. JEE Advanced tests this distinction.</div></div>`,'ai',500);
    };
    mcqBtns.appendChild(b);
  });
  feed.appendChild(mcqBtns);
}

async function teachC3(feed){
  await addBub(feed,`Now the most important law in mechanics. Every JEE numerical uses this.`,'ai',0);
  await addBub(feed,`<div class="fbox" style="font-size:18px">F = ma</div><div class="fnote">Net Force = mass × acceleration</div><br><strong>What this means:</strong><br>• Same force → heavier object = less acceleration<br>• Same mass → more force = more acceleration<br>• Net force of zero → zero acceleration (Law 1!)`,'ai',300);
  feed.appendChild(makeDiag('Same force, different mass → different acceleration (F = ma)',drawFma));
  await addCont(feed);
  await addBub(feed,`Let's apply this. A 5 kg block on a frictionless surface is pushed with 20 N. What is its acceleration?`,'ai',200);

  const btns2=document.createElement('div');btns2.style.cssText='display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;';
  [['100 m/s²','F×m not F/m'],['4 m/s²','correct'],['0.25 m/s²','m/F not F/m'],['25 m/s²','F+m has no meaning']].forEach(([txt,note])=>{
    const b=document.createElement('button');b.className='btn '+(note==='correct'?'bg':'ba');b.textContent=txt;
    b.onclick=async()=>{
      btns2.remove();
      await addBub(feed,txt,'student',0);
      if(note==='correct'){
        await addBub(feed,`<span class="hg">✓ Correct!</span> a = F/m = 20/5 = <strong>4 m/s²</strong><br><br>Always write the formula first: <em>a = F/m</em>. Substitute. Calculate. Never guess.`,'ok',200);
      } else {
        await addBub(feed,`<span class="ha">Not quite.</span> ${note}. Formula: <em>a = F ÷ m = 20 ÷ 5 = 4 m/s²</em>`,'ng',200);
      }
      await delay(400);
      await addBub(feed,`<div class="warn"><div class="warn-t">⚠ Connected bodies — JEE Advanced</div><div class="warn-b">When blocks are connected by a string:<br>1. Treat the whole system to find <strong>a = F_net / m_total</strong><br>2. Isolate one block to find <strong>tension T</strong><br>3. Verify with the other block.</div></div>`,'ai',400);
      feed.appendChild(makeDiag('Connected blocks: a = F/(m₁+m₂), Tension T = m₂ × a',drawConnectedBlocks));
    };
    btns2.appendChild(b);
  });
  feed.appendChild(btns2);
}

async function teachC4(feed){
  await addBub(feed,`Newton's Third Law: for every action, there is an equal and opposite reaction — <em>acting on a different body</em>.`,'ai',0);
  feed.appendChild(makeDiag("Action = Reaction — equal magnitude, opposite direction, DIFFERENT bodies",drawAction));
  await addBub(feed,`The critical word: <strong>DIFFERENT body</strong>. The reaction force acts on the other object, not the same one. That's why they don't cancel.`,'ai',400);
  await addCont(feed);
  await addBub(feed,`<span class="ha">The classic JEE trap:</span> A book rests on a table. Identify the correct Newton's 3rd Law pair:`,'ai',200);

  const pairBtns=document.createElement('div');pairBtns.style.cssText='display:flex;flex-direction:column;gap:7px;margin:8px 0;';
  const pairs=[
    ['Weight of book (down) and Normal force on book (up) — both on the book','wrong','Both these forces act on the SAME body (the book). 3rd Law pairs ALWAYS act on different bodies. W and N are a Law 1 equilibrium balance, not a Law 3 pair.'],
    ["Earth's gravity on book (down) and book's gravity on Earth (up)",'correct',"Perfect! Earth pulls book down → book pulls Earth up. Same type of force (gravity), same two bodies (Earth & book), opposite directions. Classic 3rd Law pair."],
    ['Normal force from table on book and weight of book','wrong','Same body again — both act on the book. The 3rd Law pair for the normal force is: table pushes book up ↔ book pushes table down.'],
  ];
  pairs.forEach(([txt,type,explain],pi)=>{
    const b=document.createElement('button');
    b.style.cssText='display:flex;align-items:flex-start;gap:9px;padding:11px 13px;background:var(--surface2);border:1px solid var(--border);border-radius:9px;cursor:pointer;font-size:13px;color:var(--text);text-align:left;';
    b.innerHTML=`<span style="width:22px;height:22px;border-radius:6px;background:var(--surface3);display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${'ABC'[pi]}</span><span>${txt}</span>`;
    b.onmouseover=()=>{b.style.borderColor='var(--accent2)';};
    b.onmouseout=()=>{b.style.borderColor='var(--border)';};
    b.onclick=async()=>{
      pairBtns.querySelectorAll('button').forEach(x=>{x.style.pointerEvents='none';x.style.opacity='.4';});
      b.style.opacity='1';
      b.style.background=type==='correct'?'rgba(34,197,94,.1)':'rgba(239,68,68,.08)';
      b.style.borderColor=type==='correct'?'var(--green)':'rgba(239,68,68,.3)';
      b.style.color=type==='correct'?'var(--green)':'var(--red)';
      if(type!=='correct'){
        pairBtns.querySelectorAll('button').forEach((x,i)=>{
          if(pairs[i][1]==='correct'){x.style.opacity='1';x.style.background='rgba(34,197,94,.1)';x.style.borderColor='var(--green)';x.style.color='var(--green)';}
        });
      }
      await addBub(feed,txt,'student',0);
      await addBub(feed,type==='correct'
        ?`<span class="hg">✓ Correct! JEE Mains 2019 asked this exact question.</span><br><br>${explain}`
        :`<span class="ha">Classic trap!</span> ${explain}`
        ,type==='correct'?'ok':'ng',300);
      feed.appendChild(makeDiag('Normal force — N = mg only in equilibrium',drawNormalForce));
    };
    pairBtns.appendChild(b);
  });
  feed.appendChild(pairBtns);
}

const QS={
c1:[
  {id:'c1q1',level:'cbse',diff:1,text:'A 10 kg block is pushed with 50 N on a frictionless surface. Its acceleration is:',
   opts:['500 m/s²','5 m/s²','0.2 m/s²','50 m/s²'],correct:1,concept:'c1',
   exp:{short:'a = F/m',steps:['F = 50 N, m = 10 kg','a = F/m = 50/10 = 5 m/s²'],answer:'5 m/s².'}},
  {id:'c1q2',level:'mains',diff:2,text:'On the Moon (g = 1.6 m/s²), a 60 kg astronaut has weight:',
   opts:['60 N','96 N','600 N','9.8 N'],correct:1,concept:'c1',
   exp:{short:'Weight = mg',steps:['W = mg = 60 × 1.6 = 96 N','Mass stays 60 kg everywhere. Weight changes with gravity.'],answer:'96 N on Moon.'}},
  {id:'c1q3',level:'advanced',diff:3,text:'A force F acts on mass m giving acceleration 3a. The same force on mass M gives acceleration a. F acts on (m+M) giving acceleration:',
   opts:['4a','3a/4','3a','2a'],correct:1,concept:'c1',
   exp:{short:'Find F and M from the two conditions, then find combined acceleration.',
    steps:['From m: F = m×3a → m = F/3a','From M: F = M×a → M = F/a','m+M = F/3a + F/a = F(1/3a + 1/a) = F(4/3a)','a_combined = F/(m+M) = F / (4F/3a) = 3a/4'],
    answer:'3a/4.'}}
],
c2:[
  {id:'c2q1',level:'cbse',diff:1,text:'A ball is rolling on a perfectly frictionless surface with no air resistance. What happens?',
   opts:['Gradually slows and stops','Moves at constant speed forever','Speeds up','Curves due to gravity'],correct:1,concept:'c2',
   exp:{short:'Zero net force → zero acceleration → constant velocity.',steps:['No friction, no air resistance → F_net = 0','F = ma → 0 = ma → a = 0','Velocity stays constant forever.'],answer:'Constant speed forever.'}},
  {id:'c2q2',level:'mains',diff:2,text:'A bus brakes suddenly. A standing passenger lurches forward. This is because:',
   opts:["Brakes push passenger forward","Inertia keeps passenger moving as bus decelerates","Friction from seat pushes forward","Passenger is lighter than bus"],correct:1,concept:'c2',
   exp:{short:"Passenger's inertia (Law 1) — no force on passenger means velocity stays at original bus speed.",
    steps:['Before braking: passenger and bus both move at v km/h.','Bus brakes: force on bus, not directly on passenger.','Passenger: F_net = 0 → continues at v (inertia of motion).','Bus slows below v → from bus frame: passenger appears to lurch forward.'],
    answer:"Inertia. JEE Mains 2010."}},
  {id:'c2q3',level:'advanced',diff:3,text:'A block rests on a truck floor. Truck accelerates forward. Block moves with truck (no slip). What force accelerates the block?',
   opts:['Engine force through floor','Static friction from floor (forward)','Normal force (forward component)','No force needed'],correct:1,concept:'c2',
   exp:{short:'Only static friction can provide horizontal force on the block.',
    steps:['Engine force is internal to truck — no direct contact with block.','Normal force is perpendicular (vertical) — zero horizontal component.','Static friction acts horizontally between block and floor.','Since block tends to slip backward relative to truck, static friction acts FORWARD on block.'],
    answer:'Static friction acting forward on the block.'}}
],
c3:[
  {id:'c3q1',level:'cbse',diff:1,text:'A 5 kg block on a frictionless surface is pushed with 20 N. Acceleration is:',
   opts:['100 m/s²','4 m/s²','0.25 m/s²','25 m/s²'],correct:1,concept:'c3',
   exp:{short:'a = F/m',steps:['a = F/m = 20/5 = 4 m/s²'],answer:'4 m/s².'}},
  {id:'c3q2',level:'mains',diff:2,text:'A 1000 kg car accelerates from 0 to 20 m/s in 10 s. Net force is:',
   opts:['200 N','2000 N','20000 N','100 N'],correct:1,concept:'c3',
   exp:{short:'Find a first, then F = ma.',
    steps:['a = Δv/Δt = (20−0)/10 = 2 m/s²','F = ma = 1000 × 2 = 2000 N'],
    answer:'2000 N.'}},
  {id:'c3q3',level:'advanced',diff:3,text:'Two blocks m₁=3 kg, m₂=5 kg connected by string on frictionless surface. Force F=16 N on m₁. Tension T in string is:',
   opts:['16 N','10 N','6 N','8 N'],correct:1,concept:'c3',
   exp:{short:'System acceleration first, then T from m₂ alone.',
    steps:['System: a = F/(m₁+m₂) = 16/8 = 2 m/s²','For m₂: T = m₂ × a = 5 × 2 = 10 N','Verify for m₁: F−T = 16−10 = 6 = 3×2 ✓'],
    answer:'T = 10 N.'}}
],
c4:[
  {id:'c4q1',level:'cbse',diff:1,text:"Earth pulls the Moon with force F. The Moon pulls Earth with:",
   opts:["Zero — only large bodies attract","F/6 — Moon is lighter","Force F toward Moon","Force 6F"],correct:2,concept:'c4',
   exp:{short:"Newton's 3rd Law is absolute. Reaction = action.",
    steps:["Action: Earth pulls Moon toward Earth with F.","Reaction: Moon pulls Earth toward Moon with F.","Equal magnitude, opposite direction, different bodies."],
    answer:"Force F toward the Moon."}},
  {id:'c4q2',level:'mains',diff:2,text:'A book rests on a table. Identify the correct Newton\'s 3rd Law pair:',
   opts:["Weight W (down) and Normal N (up) — both on book","Earth's gravity on book and book's gravity on Earth","Normal from table on book and book's weight","Normal from table on book and gravity from Earth on book"],correct:1,concept:'c4',
   exp:{short:'3rd Law pairs act on DIFFERENT bodies. Weight and Normal act on the SAME body — not a 3rd Law pair.',
    steps:['W and N both act on book → same body → NOT a 3rd Law pair (it\'s equilibrium).','Earth pulls book → book pulls Earth. Same force type (gravity), different bodies. ✓ 3rd Law pair.','JEE Mains 2019 asked exactly this.'],
    answer:"Earth's gravity on book ↔ book's gravity on Earth."}},
  {id:'c4q3',level:'advanced',diff:3,text:'Person (60 kg) in elevator accelerating upward at 2 m/s². Scale reading is: (g=10)',
   opts:['600 N','480 N','720 N','660 N'],correct:2,concept:'c4',
   exp:{short:'Draw FBD. N − mg = ma → N = m(g+a).',
    steps:['Forces on person: N (up), mg (down).','Net force upward = ma (accelerating upward).','N − mg = ma → N = m(g+a) = 60×(10+2) = 60×12 = 720 N.','Rule: accel. up → N > mg (feels heavier). Accel. down → N < mg (feels lighter).'],
    answer:'720 N. Elevator accelerating up: N = m(g+a).'}}
]};

const NUMS=[
  {level:'cbse',concept:'c3',title:'Numerical 1 — Direct F = ma',
   problem:'A force of 25 N acts on a 5 kg block on a frictionless surface. Find: (a) acceleration, (b) velocity after 4 seconds starting from rest.',
   opts:['a=5 m/s², v=20 m/s','a=0.2 m/s², v=0.8 m/s','a=125 m/s², v=500 m/s','a=5 m/s², v=25 m/s'],correct:0,
   steps:['<strong>Part (a):</strong> a = F/m = 25/5 = 5 m/s²','<strong>Part (b):</strong> v = u + at = 0 + 5×4 = 20 m/s'],
   answer:'a = 5 m/s², v = 20 m/s after 4 seconds.'},
  {level:'cbse',concept:'c4',title:'Numerical 2 — Gun Recoil (Law 3)',
   problem:'A gun of mass 2 kg fires a bullet of mass 0.02 kg at 400 m/s. Find the recoil speed of the gun.',
   opts:['4 m/s backward','400 m/s backward','2 m/s backward','0.4 m/s backward'],correct:0,
   steps:['Initial momentum = 0 (both at rest).','By conservation of momentum (Newton\'s 3rd Law): m_gun × v_gun + m_bullet × v_bullet = 0','2 × v_gun + 0.02 × 400 = 0','2 × v_gun = −8','v_gun = −4 m/s (4 m/s backward)'],
   answer:'4 m/s in the opposite direction to bullet.'},
  {level:'mains',concept:'c3',title:'Numerical 3 — Elevator Normal Force',
   problem:'A person of mass 60 kg stands on a weighing scale in an elevator. Find scale reading when: (a) elevator accelerates up at 2 m/s², (b) elevator accelerates down at 3 m/s². (g = 10 m/s²)',
   opts:['(a) 720 N, (b) 420 N','(a) 600 N, (b) 600 N','(a) 480 N, (b) 720 N','(a) 720 N, (b) 600 N'],correct:0,
   steps:['<strong>FBD of person:</strong> N upward, mg downward.','<strong>(a) Accel. upward:</strong> N − mg = ma → N = m(g+a) = 60×12 = 720 N','<strong>(b) Accel. downward:</strong> mg − N = ma → N = m(g−a) = 60×7 = 420 N','Rule: accel. up → heavier (N>mg). Accel. down → lighter (N<mg). Free fall → N=0 (weightless).'],
   answer:'(a) 720 N  (b) 420 N'},
  {level:'mains',concept:'c3',title:'Numerical 4 — Connected Blocks (Pulley on Table)',
   problem:'A 5 kg block A sits on a frictionless table. A string connects it over a frictionless pulley to a 3 kg block B hanging vertically. Find acceleration and tension. (g = 10)',
   opts:['a=3.75 m/s², T=18.75 N','a=5 m/s², T=15 N','a=3 m/s², T=21 N','a=6 m/s², T=12 N'],correct:0,
   diagFn: (cv)=>drawAtwood(cv,1.5),
   steps:['<strong>Driving force</strong> = weight of B = 3×10 = 30 N','<strong>Total mass</strong> = 5+3 = 8 kg','<strong>a</strong> = 30/8 = 3.75 m/s²','<strong>Tension from B:</strong> m_Bg − T = m_Ba → 30 − T = 3×3.75 = 11.25 → T = 18.75 N','<strong>Verify with A:</strong> T = m_A × a = 5×3.75 = 18.75 N ✓'],
   answer:'a = 3.75 m/s², T = 18.75 N'},
  {level:'mains',concept:'c3',title:'Numerical 5 — Inclined Plane',
   problem:'A 2 kg block slides down a frictionless 30° incline. Find acceleration. (g = 10 m/s²)',
   opts:['5 m/s²','8.66 m/s²','10 m/s²','3.5 m/s²'],correct:0,
   diagFn: (cv)=>drawIncline(cv),
   steps:['<strong>Along incline:</strong> only component of gravity acts.','F_net = mg sin30° = 2×10×0.5 = 10 N','a = F/m = 10/2 = 5 m/s²','Note: normal to incline: N = mg cos30° — but this doesn\'t affect motion along incline (frictionless).'],
   answer:'a = 5 m/s² down the incline'},
  {level:'advanced',concept:'c3',title:'Numerical 6 — Atwood Machine',
   problem:'Atwood machine: m₁ = 3 kg, m₂ = 7 kg. Frictionless pulley and string. Find: (a) acceleration, (b) tension. (g = 10)',
   opts:['a=4 m/s², T=42 N','a=2.5 m/s², T=31.25 N','a=5 m/s², T=35 N','a=4 m/s², T=28 N'],correct:0,
   diagFn: (cv)=>drawAtwood(cv,1.5),
   steps:['<strong>For m₂ (going down):</strong> m₂g − T = m₂a → 70 − T = 7a ... (1)','<strong>For m₁ (going up):</strong> T − m₁g = m₁a → T − 30 = 3a ... (2)','<strong>Add (1)+(2):</strong> 40 = 10a → a = 4 m/s²','<strong>T from (2):</strong> T = 30 + 3×4 = 42 N','<strong>Verify with (1):</strong> 70 − 42 = 28 = 7×4 ✓','<strong>Formula shortcut:</strong> a = (m₂−m₁)g/(m₁+m₂) = 4×10/10 = 4 m/s²'],
   answer:'a = 4 m/s², T = 42 N'},
  {level:'advanced',concept:'c3',title:'Numerical 7 — Block on Block (Maximum force)',
   problem:'Block A (3 kg) sits on Block B (7 kg) on a frictionless floor. μ between A and B = 0.3. Find maximum horizontal force F on B so A does not slip. (g = 10)',
   opts:['30 N','9 N','21 N','40 N'],correct:0,
   diagFn: (cv)=>drawStaticFriction(cv),
   steps:['<strong>Max friction on A:</strong> f_max = μ × m_A × g = 0.3×3×10 = 9 N','<strong>Max acceleration of A:</strong> a_max = f_max/m_A = 9/3 = 3 m/s²','<strong>For A not to slip:</strong> both blocks must have same acceleration ≤ a_max.','<strong>F_max on system:</strong> F = (m_A+m_B) × a_max = (3+7) × 3 = 30 N'],
   answer:'F_max = 30 N'},
  {level:'advanced',concept:'c4',title:'Numerical 8 — Man on Trolley',
   problem:'An 80 kg man stands on a 40 kg trolley on frictionless ground. Man walks forward at 2 m/s relative to the ground. Find trolley velocity.',
   opts:['4 m/s backward','2 m/s backward','4 m/s forward','1 m/s backward'],correct:0,
   steps:['Initial momentum = 0 (system at rest).','Conservation of momentum: m_man × v_man + m_trolley × v_trolley = 0','80 × 2 + 40 × v_trolley = 0','v_trolley = −160/40 = −4 m/s (4 m/s backward)'],
   answer:'4 m/s backward (opposite to man\'s direction).'}
];

const QB=[
  // LAW 1 — CBSE
  {id:'qb1',level:'cbse',law:'c2',diff:1,text:'A body is in uniform motion. Net force acting on it is:',
   opts:['Equal to its weight','Zero','In the direction of motion','Opposite to motion'],correct:1,concept:'c2',
   exp:{short:'Uniform motion → constant velocity → a=0 → F=ma=0.',steps:['Uniform motion = constant velocity.','a = 0 → F_net = ma = 0.'],answer:'Zero.'}},
  {id:'qb2',level:'cbse',law:'c2',diff:1,text:'A ball is thrown in the air. At the highest point, the velocity is zero. What is the net force?',
   opts:['Zero','mg upward','mg downward','Zero since velocity is zero'],correct:2,concept:'c2',
   exp:{short:'Gravity acts at all times — velocity being zero does not mean force is zero.',steps:['At highest point: v=0 momentarily.','Gravity still acts: F = mg downward.','Law 1 trap: zero velocity ≠ zero force.'],answer:'mg downward.'}},
  // LAW 1 — MAINS
  {id:'qb3',level:'mains',law:'c2',diff:2,text:'A satellite moves in circular orbit at constant speed. Net force on it is:',
   opts:['Zero — constant speed','Non-zero toward Earth center','Non-zero away from Earth','Zero — Law 1 applies'],correct:1,concept:'c2',
   exp:{short:'Constant speed ≠ constant velocity. Direction changes → acceleration exists.',steps:['Circular orbit: direction changes continuously.','Changing velocity = acceleration ≠ 0.','F = ma ≠ 0. Force is centripetal (toward Earth).'],answer:'Non-zero, toward Earth center.'}},
  // LAW 1 — ADVANCED
  {id:'qb4',level:'advanced',law:'c2',diff:3,text:'A block on a smooth incline (angle θ) connected by string to a hanging block. System in equilibrium. String is cut. Acceleration of incline block is:',
   opts:['Zero','g sinθ down the incline','g up the incline','g cosθ'],correct:1,concept:'c2',
   exp:{short:'Before cut: tension balanced gravity component. After cut: only mg sinθ acts along incline.',
    steps:[
      '<strong>Before cut — Equilibrium:</strong> Tension T pulls block UP the incline. T = mg sinθ exactly balances gravity component along incline. Net force = 0. a = 0.',
      '<strong>After cut — Tension vanishes:</strong> T = 0. Normal force N = mg cosθ acts perpendicular to incline (no contribution to motion along slope).',
      '<strong>Net force after cut:</strong> Only mg sinθ acts downward along incline. No friction (smooth). F_net = mg sinθ.',
      '<strong>Apply F = ma along incline:</strong> mg sinθ = ma → a = g sinθ, directed DOWN the incline.',
      '<strong>Why not g?</strong> Full g only in free fall. On incline, only the component along slope (g sinθ) drives motion. g cosθ is balanced by normal force.',
      '<strong>Key trap:</strong> Before cut the answer was zero (equilibrium). After cut, the restraining tension is removed → net force exists → acceleration g sinθ.'
    ],
    answer:'g sinθ down the incline. Only the gravity component along the slope acts after string is cut.'}},
  // LAW 2 — CBSE
  {id:'qb5',level:'cbse',law:'c3',diff:1,text:'Force of 6 N on 2 kg block (frictionless). Acceleration:',
   opts:['12 m/s²','3 m/s²','0.33 m/s²','4 m/s²'],correct:1,concept:'c3',
   exp:{short:'a = F/m',steps:['a = 6/2 = 3 m/s²'],answer:'3 m/s².'}},
  {id:'qb6',level:'cbse',law:'c3',diff:1,text:'What force gives 4 kg mass acceleration 5 m/s²?',
   opts:['0.8 N','20 N','9 N','1.25 N'],correct:1,concept:'c3',
   exp:{short:'F = ma',steps:['F = 4 × 5 = 20 N'],answer:'20 N.'}},
  // LAW 2 — MAINS
  {id:'qb7',level:'mains',law:'c3',diff:2,text:'2 kg box slides down frictionless 30° incline. Acceleration: (g=10)',
   opts:['10 m/s²','5 m/s²','8.66 m/s²','7 m/s²'],correct:1,concept:'c3',
   exp:{short:'a = g sin30°',steps:['a = g sin30° = 10×0.5 = 5 m/s²'],answer:'5 m/s².'}},
  {id:'qb8',level:'mains',law:'c3',diff:2,text:'70 kg person in lift decelerating upward at 3 m/s². Scale reads: (g=10)',
   opts:['910 N','700 N','490 N','630 N'],correct:2,concept:'c3',
   exp:{short:'Decelerating upward = accelerating downward. N = m(g−a).',steps:['Net force downward: mg − N = ma','N = m(g−a) = 70×(10−3) = 70×7 = 490 N'],answer:'490 N.'}},
  {id:'qb9',level:'mains',law:'c3',diff:2,text:'Three blocks 1 kg, 2 kg, 3 kg connected. Force 12 N on 1 kg (frictionless). System acceleration:',
   opts:['12 m/s²','2 m/s²','4 m/s²','6 m/s²'],correct:1,concept:'c3',
   exp:{short:'Total mass system acceleration.',steps:['Total mass = 1+2+3 = 6 kg','a = 12/6 = 2 m/s²'],answer:'2 m/s².'}},
  // LAW 2 — ADVANCED
  {id:'qb10',level:'advanced',law:'c3',diff:3,text:'Block A (3 kg) on Block B (7 kg), frictionless floor. μ between A and B = 0.3. Max F on B so A doesn\'t slip: (g=10)',
   opts:['30 N','9 N','21 N','None — A always slips'],correct:0,concept:'c3',
   exp:{short:'Only friction accelerates A. Find max friction → max system acceleration → max force on B.',
    steps:[
      '<strong>What force acts on A?</strong> Force F is applied to B only. The ONLY horizontal force on A is static friction from B. If system accelerates too fast, friction cannot keep up and A slips backward.',
      '<strong>Step 1 — Max static friction on A:</strong> f_max = μ × m_A × g = 0.3 × 3 × 10 = 9 N. (Normal on A = m_A×g since surface is horizontal.)',
      '<strong>Step 2 — Max acceleration before A slips:</strong> From F=ma on A alone: f_max = m_A × a_max → a_max = 9/3 = 3 m/s². If acceleration exceeds 3 m/s², friction cannot accelerate A fast enough → A slips.',
      '<strong>Step 3 — Max force on system:</strong> Both blocks must accelerate together at ≤ 3 m/s². Total mass = m_A + m_B = 10 kg. F_max = total mass × a_max = 10 × 3 = 30 N.',
      '<strong>Common mistake — why not 9 N?</strong> 9 N is only the max friction force on A. The force F acts on B which then accelerates both A and B together. The system has total mass 10 kg, not 3 kg.',
      '<strong>Verify at F=30 N:</strong> System a = 30/10 = 3 m/s². Friction needed on A = 3×3 = 9 N = f_max. Exactly at the limit — A is just about to slip. Any force > 30 N and A slips. ✓'
    ],
    answer:'F_max = 30 N. Remember: 9 N = max friction on A alone. 30 N = max force on the whole system.'}},
  {id:'qb11',level:'advanced',law:'c3',diff:3,text:'Atwood machine: m₁=3 kg, m₂=7 kg. Acceleration: (g=10)',
   opts:['2.5 m/s²','4 m/s²','10 m/s²','1 m/s²'],correct:1,concept:'c3',
   exp:{short:'Write F=ma for each mass separately — they share the same tension T and same magnitude acceleration a.',
    steps:[
      '<strong>Setup:</strong> m₂ (7 kg) is heavier → descends. m₁ (3 kg) ascends. Both connected by inextensible string over frictionless pulley. Key: same |a| and same T throughout string.',
      '<strong>FBD for m₂ (going DOWN):</strong> Weight m₂g acts down. Tension T acts up. Net force downward: m₂g − T = m₂a → 70 − T = 7a ... (equation 1)',
      '<strong>FBD for m₁ (going UP):</strong> Weight m₁g acts down. Tension T acts up. Net force upward: T − m₁g = m₁a → T − 30 = 3a ... (equation 2)',
      '<strong>Add equations 1 and 2</strong> (T cancels): (70 − T) + (T − 30) = 7a + 3a → 40 = 10a → <strong>a = 4 m/s²</strong>',
      '<strong>Find T from equation 2:</strong> T = 30 + 3×4 = 30 + 12 = 42 N',
      '<strong>Verify with equation 1:</strong> 70 − 42 = 28 = 7 × 4 ✓',
      '<strong>Shortcut formula</strong> (derived from above): a = (m₂−m₁)g / (m₁+m₂) = (7−3)×10 / (7+3) = 40/10 = 4 m/s²',
      '<strong>Why not g=10?</strong> If one side had zero mass, a=g. But m₁ resists the fall of m₂. The heavier side accelerates slower than free fall.'
    ],
    answer:'a = 4 m/s². T = 42 N. Always derive from FBD equations, not just memorise the formula.'}},
  // LAW 3 — CBSE
  {id:'qb12',level:'cbse',law:'c4',diff:1,text:'A book weighs 10 N. The book pushes the table with:',
   opts:['0 N','5 N','10 N','20 N'],correct:2,concept:'c4',
   exp:{short:'3rd Law: table pushes book up 10 N → book pushes table down 10 N.',steps:['Normal on book = 10 N (equilibrium).','3rd Law reaction: book on table = 10 N downward.'],answer:'10 N.'}},
  {id:'qb13',level:'cbse',law:'c4',diff:1,text:'Which is NOT a Newton\'s 3rd Law pair?',
   opts:["Earth's gravity on Moon and Moon's gravity on Earth","Weight of book and Normal force on book","Horse pulls cart and cart pulls horse back","Rocket exhaust and rocket thrust"],correct:1,concept:'c4',
   exp:{short:'Weight and Normal act on the SAME body — not a 3rd Law pair.',steps:['3rd Law: forces on DIFFERENT bodies.','Weight (gravity on book) and Normal (surface on book) both act on book.','They are a Law 1 equilibrium pair, not Law 3.'],answer:'B — Weight and Normal force.'}},
  // LAW 3 — MAINS
  {id:'qb14',level:'mains',law:'c4',diff:2,text:'60 kg man jumps off 200 kg boat at 3 m/s. Boat velocity:',
   opts:['0.9 m/s backward','0.9 m/s forward','3 m/s backward','1 m/s backward'],correct:0,concept:'c4',
   exp:{short:'Momentum conservation: initial = 0.',steps:['60×3 + 200×v_boat = 0','v_boat = −180/200 = −0.9 m/s'],answer:'0.9 m/s backward.'}},
  {id:'qb15',level:'mains',law:'c4',diff:2,text:'Person (60 kg) in elevator moving up at constant speed. Scale reads: (g=10)',
   opts:['0 N','600 N','720 N','480 N'],correct:1,concept:'c4',
   exp:{short:'Constant speed = a=0 = equilibrium. N = mg.',steps:['Constant speed → a = 0.','N − mg = 0 → N = mg = 60×10 = 600 N.'],answer:'600 N.'}},
  // LAW 3 — ADVANCED
  {id:'qb16',level:'advanced',law:'c4',diff:3,text:'Two blocks A (2 kg) and B (3 kg) in contact on frictionless surface. F=10 N on A. Contact force between A and B:',
   opts:['10 N','6 N','4 N','2 N'],correct:1,concept:'c4',
   exp:{short:'System a first, then contact force on B alone.',steps:['a = F/(m_A+m_B) = 10/5 = 2 m/s²','Contact force on B: F_AB = m_B × a = 3×2 = 6 N','3rd Law: B pushes A backward with 6 N.'],answer:'6 N.'}},
  {id:'qb17',level:'advanced',law:'c4',diff:3,text:'Two skaters A (60 kg) and B (40 kg) push each other from rest. A moves at 2 m/s. B moves at:',
   opts:['2 m/s','3 m/s','1.5 m/s','4 m/s'],correct:1,concept:'c4',
   exp:{short:'Momentum conservation: 0 = m_A×v_A + m_B×v_B.',steps:['0 = 60×2 + 40×v_B','v_B = −120/40 = −3 m/s'],answer:'3 m/s in opposite direction.'}},

  // ── MORE LAW 1 ─────────────────────
  {id:'qb18',level:'cbse',law:'c2',diff:1,text:'A coin placed on a card on a glass. Card is flicked away quickly. The coin:',
   opts:['Moves with card','Falls into the glass','Flies sideways','Stays then falls into glass'],correct:3,concept:'c2',
   exp:{short:'Inertia of rest — brief contact gives negligible impulse to coin.',
    steps:['Coin at rest, inertia resists change.','Card flicked quickly — contact time tiny.','Friction impulse on coin ≈ 0. Coin barely moves horizontally.','Gravity pulls coin straight down into glass.'],answer:'Stays in place, then falls into glass.'}},

  {id:'qb19',level:'cbse',law:'c2',diff:1,text:'A car suddenly starts moving forward. A person sitting inside feels pushed:',
   opts:['Forward','Backward','Upward','No effect'],correct:1,concept:'c2',
   exp:{short:'Inertia — person tends to remain at rest while car accelerates forward.',
    steps:['Car seat accelerates forward.','Person has inertia — tends to remain at rest.','Relative to car, person appears to slide backward.'],answer:'Backward (relative to car). Inertia of rest.'}},

  {id:'qb20',level:'mains',law:'c2',diff:2,text:'A 5 kg body is acted on by two perpendicular forces 8 N and 6 N. Acceleration is:',
   opts:['2 m/s²','2.8 m/s²','14 m/s²','1.4 m/s²'],correct:0,concept:'c2',
   exp:{short:'Resultant F = √(8²+6²), then a = F/m.',
    steps:['F_net = √(64+36) = √100 = 10 N','a = F/m = 10/5 = 2 m/s²'],answer:'2 m/s².'}},

  {id:'qb21',level:'mains',law:'c2',diff:2,text:'0.1 kg ball hits wall at 10 m/s and bounces back at 10 m/s. Contact time = 0.01 s. Force on wall:',
   opts:['100 N','200 N','10 N','20 N'],correct:1,concept:'c2',
   exp:{short:'F = Δp/Δt. Velocity reverses so Δv = 20 m/s.',
    steps:['Δp = m×Δv = 0.1×(10−(−10)) = 0.1×20 = 2 kg m/s','F = Δp/Δt = 2/0.01 = 200 N on ball from wall','By 3rd Law: force on wall = 200 N.'],answer:'200 N. (Δv = 20 m/s, not 10!)'}},

  {id:'qb22',level:'advanced',law:'c2',diff:3,text:'Two blocks 3 kg and 6 kg pushed together by 27 N on 3 kg block (frictionless). Contact force on 6 kg block:',
   opts:['9 N','18 N','27 N','13.5 N'],correct:1,concept:'c2',
   exp:{short:'System acceleration first, then F = ma for 6 kg alone.',
    steps:['a = F/(m₁+m₂) = 27/9 = 3 m/s²','Contact force N on 6 kg: N = 6×3 = 18 N','Verify 3 kg: 27−18 = 9 = 3×3 ✓'],answer:'18 N.'}},

  // ── MORE LAW 2 ─────────────────────
  {id:'qb23',level:'cbse',law:'c3',diff:1,text:'2000 kg car brakes from 20 m/s to 0 in 4 seconds. Braking force:',
   opts:['500 N','10000 N','8000 N','40000 N'],correct:1,concept:'c3',
   exp:{short:'a = Δv/Δt then F = ma.',
    steps:['a = 20/4 = 5 m/s²','F = 2000×5 = 10000 N'],answer:'10000 N.'}},

  {id:'qb24',level:'cbse',law:'c3',diff:1,text:'60 kg person in elevator moving up at constant 3 m/s. Scale reads: (g=10)',
   opts:['780 N','420 N','600 N','588 N'],correct:2,concept:'c3',
   exp:{short:'Constant speed → a = 0 → N = mg.',
    steps:['Constant velocity means a = 0.','N = mg = 60×10 = 600 N.','Speed is irrelevant — only acceleration matters.'],answer:'600 N.'}},

  {id:'qb25',level:'mains',law:'c3',diff:2,text:'10 kg block pulled by 20 N east and 15 N north (frictionless). Acceleration:',
   opts:['3.5 m/s²','2.5 m/s²','1.5 m/s²','5 m/s²'],correct:1,concept:'c3',
   exp:{short:'F_net = √(20²+15²), a = F/m.',
    steps:['F_net = √(400+225) = √625 = 25 N','a = 25/10 = 2.5 m/s²'],answer:'2.5 m/s².'}},

  {id:'qb26',level:'mains',law:'c3',diff:2,text:'5 kg block on frictionless 30° incline. Normal force: (g=10)',
   opts:['50 N','43.3 N','25 N','28.9 N'],correct:1,concept:'c3',
   exp:{short:'N = mg cosθ (perpendicular to incline).',
    steps:['N = mg cos30° = 5×10×(√3/2) = 50×0.866 = 43.3 N'],answer:'43.3 N.'}},

  {id:'qb27',level:'mains',law:'c3',diff:2,text:'4 kg on frictionless table, 6 kg hanging, connected by string over pulley. Tension: (g=10)',
   opts:['24 N','60 N','40 N','36 N'],correct:0,concept:'c3',
   exp:{short:'a = m₂g/(m₁+m₂). T = m₁×a.',
    steps:['a = 60/10 = 6 m/s²','T = 4×6 = 24 N'],answer:'T = 24 N.'}},

  {id:'qb28',level:'advanced',law:'c3',diff:3,text:'Atwood machine: m₁=2 kg, m₂=3 kg. Tension in string: (g=10)',
   opts:['24 N','12 N','30 N','6 N'],correct:0,concept:'c3',
   exp:{short:'T = 2m₁m₂g/(m₁+m₂).',
    steps:['a = (3−2)×10/(3+2) = 2 m/s²','T = m₁(g+a) = 2×12 = 24 N','Verify: m₂g−T = 30−24 = 6 = 3×2 ✓'],answer:'T = 24 N.'}},

  {id:'qb29',level:'advanced',law:'c3',diff:3,text:'60 kg person in elevator decelerating downward at 2 m/s². Scale reads: (g=10)',
   opts:['480 N','720 N','600 N','360 N'],correct:1,concept:'c3',
   exp:{short:'Decelerating downward = accelerating upward. N = m(g+a).',
    steps:['Decelerating downward → acceleration is UPWARD at 2 m/s².','N − mg = ma → N = m(g+a) = 60×12 = 720 N.','Rule: going down and slowing = feels heavier.'],answer:'720 N. N = m(g+a) when accelerating upward.'}},

  // ── MORE LAW 3 ─────────────────────
  {id:'qb30',level:'cbse',law:'c4',diff:1,text:'A horse pulls a cart forward with force F. Cart pulls horse:',
   opts:['Forward with F','Backward with F','Backward with 2F','Does not pull horse'],correct:1,concept:'c4',
   exp:{short:'3rd Law: equal and opposite reaction on horse from cart.',
    steps:['Horse pushes cart forward with F (action).','Cart pulls horse backward with F (reaction).','System moves forward because ground friction on horse hooves > F.'],answer:'Backward with force F.'}},

  {id:'qb31',level:'cbse',law:'c4',diff:1,text:'A rocket in space expels gas. This is explained by:',
   opts:['Law 1 only','Law 2 only','Law 3 only','All three laws'],correct:3,concept:'c4',
   exp:{short:'All three laws apply: inertia, F=ma, and action-reaction.',
    steps:['<strong>Law 3:</strong> Rocket pushes gas backward; gas pushes rocket forward.','<strong>Law 2:</strong> Forward force on rocket → F=ma → acceleration.','<strong>Law 1:</strong> Engines off in space → constant velocity.'],answer:'All three laws.'}},

  {id:'qb32',level:'mains',law:'c4',diff:2,text:'10 g bullet fired from 2 kg gun at 400 m/s. Gun recoil velocity:',
   opts:['2 m/s','0.2 m/s','20 m/s','4 m/s'],correct:0,concept:'c4',
   exp:{short:'Momentum conservation: 0 = m_bullet×v + m_gun×v_gun.',
    steps:['0.01×400 + 2×v_gun = 0','4 = −2×v_gun → v_gun = −2 m/s'],answer:'2 m/s backward.'}},

  {id:'qb33',level:'mains',law:'c4',diff:2,text:'A 40 kg girl pushes a wall with 30 N for 2 s while standing on a 10 kg skateboard (frictionless). Her final speed:',
   opts:['1.2 m/s','6 m/s','3 m/s','0.75 m/s'],correct:0,concept:'c4',
   exp:{short:'Wall pushes girl+skateboard backward at 30 N (Law 3). F=ma.',
    steps:['Wall reaction = 30 N on girl+skateboard (backward).','Total mass = 50 kg. a = 30/50 = 0.6 m/s².','v = at = 0.6×2 = 1.2 m/s.'],answer:'1.2 m/s.'}},

  {id:'qb34',level:'advanced',law:'c4',diff:3,text:'Atwood machine m₁=3 kg, m₂=5 kg. Force on pulley from string: (g=10)',
   opts:['80 N','75 N','40 N','37.5 N'],correct:1,concept:'c4',
   exp:{short:'T × 2 = force on pulley (two string segments each pull with T).',
    steps:['a = (5−3)×10/8 = 2.5 m/s²','T = m₁(g+a) = 3×12.5 = 37.5 N','Force on pulley = 2T = 75 N'],answer:'75 N = 2T.'}},

  // ── CONCEPTUAL ─────────────────────
  {id:'qb35',level:'cbse',law:'c2',diff:1,text:'Why do we fall forward when a running bus stops suddenly?',
   opts:['Gravity pulls forward','Inertia of motion','Driver applied brakes on us','Friction from seat'],correct:1,concept:'c2',
   exp:{short:'Inertia of motion — body continues at bus speed even as bus decelerates.',
    steps:['Bus and body move together at v.','Bus brakes → decelerates.','Body has no braking force → continues at v (inertia of motion).','Relative to bus: body moves forward.'],answer:'Inertia of motion.'}},

  {id:'qb36',level:'mains',law:'c3',diff:2,text:'Man mass M on scale in lift. Scale reads Mg/2. The lift is:',
   opts:['Moving up at constant speed','Accelerating down at g/2','Moving down at constant speed','Accelerating up at g/2'],correct:1,concept:'c3',
   exp:{short:'N = Mg/2 < Mg → net force downward → acceleration downward.',
    steps:['N = Mg/2','N − Mg = Ma → Mg/2 − Mg = Ma → −Mg/2 = Ma','a = −g/2 (downward)'],answer:'Accelerating downward at g/2.'}},

  {id:'qb37',level:'mains',law:'c3',diff:2,text:'Block mass m on frictionless incline angle θ. Horizontal force F needed to keep it stationary:',
   opts:['mg sinθ','mg tanθ','mg cosθ','mg/sinθ'],correct:1,concept:'c3',
   exp:{short:'Resolve along incline: F cosθ = mg sinθ → F = mg tanθ.',
    steps:['Along incline equilibrium: F cosθ − mg sinθ = 0','F = mg sinθ/cosθ = mg tanθ'],answer:'F = mg tanθ.'}},

  {id:'qb38',level:'advanced',law:'c3',diff:3,text:'Mass m on incline angle θ, mass M hanging, connected by string. Equilibrium condition:',
   opts:['M = m sinθ','M = m cosθ','M = m tanθ','m = M sinθ'],correct:0,concept:'c3',
   exp:{short:'T = Mg = mg sinθ → M = m sinθ.',
    steps:['For M: T = Mg (equilibrium).','For m along incline: T = mg sinθ.','Equating: Mg = mg sinθ → M = m sinθ.'],answer:'M = m sinθ.'}},

  {id:'qb39',level:'advanced',law:'c4',diff:3,text:'A 60 kg man stands on a 40 kg cart (frictionless). He walks at 1.5 m/s relative to cart. Cart velocity relative to ground:',
   opts:['1 m/s backward','0.9 m/s backward','1.5 m/s forward','2.25 m/s backward'],correct:1,concept:'c4',
   exp:{short:'Momentum conservation. v_man/ground = v_man/cart + v_cart/ground.',
    steps:['Let v_c = cart velocity (positive = man direction).','Man velocity relative to ground = 1.5 + v_c (if v_c is negative, man moves at 1.5+v_c).','Momentum: 60(1.5+v_c) + 40v_c = 0','90 + 60v_c + 40v_c = 0 → 100v_c = −90 → v_c = −0.9 m/s'],answer:'0.9 m/s backward.'}},

  {id:'qb40',level:'advanced',law:'c3',diff:3,text:'2 kg block on 3 kg cart (frictionless floor). μ=0.3 between them. Force 5 N on block. Cart acceleration: (g=10)',
   opts:['1 m/s²','0.6 m/s²','5/3 m/s²','0 m/s²'],correct:0,concept:'c3',
   exp:{short:'Assume no slip first. Verify friction required does not exceed max.',
    steps:['Assume no slip: a = F/(m_b+m_c) = 5/(2+3) = 1 m/s²',
     'Friction on cart: f = m_c×a = 3×1 = 3 N',
     'Max friction: f_max = μ×m_b×g = 0.3×2×10 = 6 N',
     '3 N < 6 N → no slip confirmed.',
     'Block: 5−3 = 2×1 = 2 ✓. Cart: 3 = 3×1 ✓'],
    answer:'a = 1 m/s² for both. No slipping occurs.'}},

  {id:'qb41',level:'advanced',law:'c2',diff:3,text:'A body of mass m is suspended by two strings making angles 30° and 60° with the vertical. Ratio T₁/T₂ (T₁ at 30°, T₂ at 60°):',
   opts:['√3','1/√3','√3/2','2/√3'],correct:0,concept:'c2',
   exp:{short:'Equilibrium. Resolve horizontally and vertically to find T₁ and T₂.',
    steps:['Horizontal: T₁ sin30° = T₂ sin60° → T₁/2 = T₂√3/2 → T₁ = T₂√3','T₁/T₂ = √3'],answer:'T₁/T₂ = √3.'}}
];

// ─── REGISTER WITH PLATFORM ──────────────────────────────────
registerChapter({
  id: 'phy-newtons-laws',
  title: "Newton's Laws of Motion",
  subject: 'Physics · Class 11',
  class: 11,
  intro: "Three laws that govern every force problem in JEE — from a rolling ball to rockets in space. Master these and you master 30% of JEE Physics.",
  concepts: ['c1','c2','c3','c4'],
  conceptMeta: {
    c1: { title:'Force & Mass', shortTitle:'Force & Mass', tag:'Foundation', icon:'⚽',
           sub:'Before any formula — discover what force and mass mean through real life.' },
    c2: { title:'Law 1 — Inertia', shortTitle:'Law 1', tag:'Law 1 of 3', icon:'🏃',
           sub:'An object resists any change in its state of motion. Catches thousands of JEE students every year.' },
    c3: { title:'Law 2 — F = ma', shortTitle:'Law 2', tag:'Law 2 of 3', icon:'⚡',
           sub:'The most powerful equation in mechanics. Every JEE numerical on forces uses this.' },
    c4: { title:'Law 3 — Action & Reaction', shortTitle:'Law 3', tag:'Law 3 of 3', icon:'🚀',
           sub:'Every action has equal opposite reaction — on a DIFFERENT body.' },
  },
  teach: {
    c1: (feed) => teachC1(feed),
    c2: (feed) => teachC2(feed),
    c3: (feed) => teachC3(feed),
    c4: (feed) => teachC4(feed),
  },
  conceptQs: QS,
  numericals: NUMS,
  qbank: QB,
});
