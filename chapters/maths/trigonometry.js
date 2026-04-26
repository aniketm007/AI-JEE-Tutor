

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);try{feed.closest('#content').scrollTop+=9999;}catch(e){}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.marginTop='8px';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();try{feed.closest('#content').scrollTop+=9999;}catch(e){}setTimeout(r,50);};feed.appendChild(b);try{feed.closest('#content').scrollTop+=9999;}catch(e){}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();try{feed.closest('#content').scrollTop+=9999;}catch(e){}setTimeout(()=>r(i===correctIdx),50);};row.appendChild(b);});feed.appendChild(row);try{feed.closest('#content').scrollTop+=9999;}catch(e){}});});}



async function teachTrig1(feed){
  await _addMsg(feed,`You've used sin, cos in geometry. Now we extend them to ALL real numbers using the unit circle.`,'ai');
  await _addMsg(feed,`<div class="fbox">Unit circle: x²+y²=1. For angle θ from positive x-axis:<br>cos θ = x-coordinate &nbsp;|&nbsp; sin θ = y-coordinate</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'sin(π/2) = ?',['0','1','−1','√2/2'],1);
  await _addMsg(feed,ok?`✓ At π/2 (90°), the point on unit circle is (0,1). y-coordinate=1=sin(π/2).`:`At 90°, point is (0,1). sin = y-coordinate = 1.`,ok?'ok':'ng');
  await _cont(feed,'Key values table →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Exact Values — Learn Cold</div><div class="ex-b">
    <table style="font-size:12px;border-collapse:collapse;width:100%">
    <tr style="color:var(--teal)"><td style="padding:3px 8px">θ</td><td>0</td><td>π/6</td><td>π/4</td><td>π/3</td><td>π/2</td></tr>
    <tr><td style="color:var(--muted)">sin</td><td>0</td><td>1/2</td><td>1/√2</td><td>√3/2</td><td>1</td></tr>
    <tr><td style="color:var(--muted)">cos</td><td>1</td><td>√3/2</td><td>1/√2</td><td>1/2</td><td>0</td></tr>
    <tr><td style="color:var(--muted)">tan</td><td>0</td><td>1/√3</td><td>1</td><td>√3</td><td>∞</td></tr>
    </table>
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">ASTC Rule — Signs in Quadrants</div><div class="ex-b">
    <strong>Q1 (0 to π/2):</strong> All positive<br>
    <strong>Q2 (π/2 to π):</strong> Only Sin positive<br>
    <strong>Q3 (π to 3π/2):</strong> Only Tan positive<br>
    <strong>Q4 (3π/2 to 2π):</strong> Only Cos positive<br>
    Mnemonic: <em>All Students Take Calculus</em>
  </div></div>`,'ai');
}
async function teachTrig2(feed){
  await _addMsg(feed,`Identities are shortcuts. The more you know, the faster you solve. Let's build them from sin²+cos²=1.`,'ai');
  await _addMsg(feed,`<strong>Fundamental identity:</strong> sin²θ + cos²θ = 1<br>
    Divide by cos²θ: <span class="hi">1 + tan²θ = sec²θ</span><br>
    Divide by sin²θ: <span class="hi">1 + cot²θ = cosec²θ</span>`,'ai');
  await _cont(feed);
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Compound Angle Formulas (Must Memorise)</div><div class="ex-b">
    sin(A+B) = sinA cosB + cosA sinB<br>
    sin(A−B) = sinA cosB − cosA sinB<br>
    cos(A+B) = cosA cosB − sinA sinB<br>
    cos(A−B) = cosA cosB + sinA sinB<br>
    tan(A+B) = (tanA+tanB)/(1−tanA tanB)
  </div></div>`,'ai');
  const ok=await _choice(feed,'sin75° = sin(45°+30°) = ?',['(√6+√2)/4','(√6−√2)/4','√3/2','1/2'],0);
  await _addMsg(feed,ok?`✓ sin45cos30+cos45sin30 = (1/√2)(√3/2)+(1/√2)(1/2) = (√3+1)/(2√2) = (√6+√2)/4.`:`sin(45+30)=sin45cos30+cos45sin30=(1/√2)(√3/2)+(1/√2)(1/2)=(√6+√2)/4.`,ok?'ok':'ng');
  await _cont(feed,'Double angle and more →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Double Angle — JEE Favourite</div><div class="ex-b">
    sin2A = 2sinA cosA<br>
    cos2A = cos²A−sin²A = 2cos²A−1 = 1−2sin²A<br>
    tan2A = 2tanA/(1−tan²A)<br><br>
    <strong>Half-angle trick:</strong> 1−cos2A = 2sin²A &nbsp;|&nbsp; 1+cos2A = 2cos²A
  </div></div>`,'ai');
}
async function teachTrig3(feed){
  await _addMsg(feed,`Equations like sinx = 1/2 have infinitely many solutions. We need a systematic way to write them all.`,'ai');
  await _addMsg(feed,`<div class="fbox">sinθ = sinα → θ = nπ + (−1)ⁿα, n∈ℤ<br>
    cosθ = cosα → θ = 2nπ ± α, n∈ℤ<br>
    tanθ = tanα → θ = nπ + α, n∈ℤ</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'General solution of sinx = 1/2:',['x = nπ + (−1)ⁿ(π/6)','x = 2nπ ± π/6','x = nπ + π/6','x = π/6 only'],0);
  await _addMsg(feed,ok?`✓ sin(π/6)=1/2, so general solution = nπ+(−1)ⁿ(π/6).`:`sinx=sinα formula: x=nπ+(−1)ⁿα with α=π/6.`,ok?'ok':'ng');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern on Equations</div><div class="ex-b">
    <strong>CBSE:</strong> Find principal value solution in [0,2π]<br>
    <strong>Mains:</strong> Write general solution in correct form<br>
    <strong>Advanced:</strong> Find number of solutions in a given interval (count intersections)<br><br>
    <strong>Trap:</strong> Don't forget to check domain restrictions for tan/sec/cosec
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Range of inverse trig</div><div class="warn-b">
    sin⁻¹: [−1,1]→[−π/2,π/2]<br>
    cos⁻¹: [−1,1]→[0,π]<br>
    tan⁻¹: ℝ→(−π/2,π/2)
  </div></div>`,'ai');
}

const QS={tr1:[
  {id:'tr1q1',level:'cbse',diff:1,text:'cos(2π/3) = ?',opts:['−1/2','1/2','−√3/2','√3/2'],correct:0,concept:'tr1',exp:{short:'2π/3 is in Q2 where cos is negative. Reference angle π/3, cos(π/3)=1/2.',steps:['2π/3=180°−60°','cos(180°−θ)=−cosθ','−cos60°=−1/2'],answer:'−1/2.'}},
  {id:'tr1q2',level:'mains',diff:2,text:'If sinθ=3/5 and θ is in Q2, then cosθ=?',opts:['−4/5','4/5','3/4','−3/4'],correct:0,concept:'tr1',exp:{short:'Use sin²+cos²=1, then apply Q2 sign.',steps:['cos²θ=1−9/25=16/25','cosθ=±4/5','Q2: cos negative → −4/5'],answer:'−4/5.'}},
  {id:'tr1q3',level:'advanced',diff:3,text:'sin20°·sin40°·sin80° = ?',opts:['√3/8','1/4','3/8','√3/4'],correct:0,concept:'tr1',exp:{short:'Product formula: sinθ·sin(60°−θ)·sin(60°+θ)=sin3θ/4.',steps:['sin20·sin40·sin80=sin20·sin(60−20)·sin(60+20)','=sin(3×20°)/4=sin60°/4=√3/8'],answer:'√3/8.'}}
],tr2:[
  {id:'tr2q1',level:'cbse',diff:1,text:'sin2A when sinA=3/5, A in Q1:',opts:['24/25','7/25','6/5','4/5'],correct:0,concept:'tr2',exp:{short:'sin2A=2sinA cosA.',steps:['cosA=4/5 (Q1, positive)','sin2A=2(3/5)(4/5)=24/25'],answer:'24/25.'}},
  {id:'tr2q2',level:'mains',diff:2,text:'cos²θ−sin²θ = ?',opts:['cos2θ','1','sin2θ','2cos2θ'],correct:0,concept:'tr2',exp:{short:'Double angle identity.',steps:['cos2θ=cos²θ−sin²θ'],answer:'cos2θ.'}},
  {id:'tr2q3',level:'advanced',diff:3,text:'tan(π/8) = ?',opts:['√2−1','√2+1','√3−1','1/√2'],correct:0,concept:'tr2',exp:{short:'Use half-angle: tan(A/2)=(1−cosA)/sinA with A=π/4.',steps:['tan(π/8)=(1−cos(π/4))/sin(π/4)=(1−1/√2)/(1/√2)=√2−1'],answer:'√2−1.'}}
],tr3:[
  {id:'tr3q1',level:'cbse',diff:1,text:'Principal solution of cosx=−1/2 in [0,2π]:',opts:['2π/3 and 4π/3','π/3 and 5π/3','π/6 and 5π/6','2π/3 only'],correct:0,concept:'tr3',exp:{short:'cosx=−1/2 → reference angle π/3, negative in Q2 and Q3.',steps:['x=2π/3 (Q2) and x=2π−2π/3=4π/3 (Q3)'],answer:'2π/3 and 4π/3.'}},
  {id:'tr3q2',level:'mains',diff:2,text:'General solution of tan2x=1:',opts:['x=nπ/2+π/8','x=nπ+π/4','x=nπ/2+π/4','x=2nπ±π/4'],correct:0,concept:'tr3',exp:{short:'tan(2x)=tan(π/4), general: 2x=nπ+π/4.',steps:['2x=nπ+π/4','x=nπ/2+π/8'],answer:'x=nπ/2+π/8.'}},
  {id:'tr3q3',level:'advanced',diff:3,text:'Number of solutions of sinx=x/5 in [−π,π]:',opts:['3','1','5','2'],correct:0,concept:'tr3',exp:{short:'Graph sinx and y=x/5. Count intersections.',steps:['y=x/5 is a line with slope 1/5','sinx oscillates between −1 and 1','One solution at x=0, two more where curves cross','Total: 3 solutions'],answer:'3.'}}
]};
const NUMS=[
  {level:'cbse',concept:'tr1',title:'Numerical 1 — Quadrant Values',problem:'If tanθ=−5/12 and θ in Q2, find sinθ and cosθ.',opts:['sin=5/13, cos=−12/13','sin=12/13, cos=−5/13','sin=5/13, cos=12/13','sin=−5/13, cos=−12/13'],correct:0,steps:['sec²θ=1+tan²θ=1+25/144=169/144','cosθ=±12/13. Q2: cos negative → −12/13','sinθ=tanθ·cosθ=(−5/12)(−12/13)=5/13'],answer:'sinθ=5/13, cosθ=−12/13.'},
  {level:'cbse',concept:'tr1',title:'Numerical 2 — Exact Value',problem:'Find cos105°.',opts:['(√2−√6)/4','(√6−√2)/4','(√6+√2)/4','−√3/2'],correct:0,steps:['cos105°=cos(60°+45°)','=cos60cos45−sin60sin45','=(1/2)(1/√2)−(√3/2)(1/√2)=(1−√3)/(2√2)=(√2−√6)/4'],answer:'(√2−√6)/4.'},
  {level:'mains',concept:'tr2',title:'Numerical 3 — Identity',problem:'Prove: (1+sinθ−cosθ)/(1+sinθ+cosθ) = tan(θ/2).',opts:['LHS = tan(θ/2) ✓','LHS ≠ RHS','Cannot simplify','LHS = cot(θ/2)'],correct:0,steps:['Use half-angle: 1−cosθ=2sin²(θ/2), sinθ=2sin(θ/2)cos(θ/2), 1+cosθ=2cos²(θ/2)','Numerator: 2sin(θ/2)(sin(θ/2)+cos(θ/2))... simplifies to tan(θ/2)'],answer:'LHS = tan(θ/2) ✓'},
  {level:'mains',concept:'tr2',title:'Numerical 4 — Double Angle',problem:'If cos2θ=−7/25, find sin4θ (θ in Q1).',opts:['336/625','−336/625','24/25','−24/25'],correct:0,steps:['sin4θ=sin2(2θ)=2sin2θcos2θ','cos2θ=−7/25','sin²2θ=1−49/625=576/625 → sin2θ=24/25 (Q1,2θ<π so positive)','sin4θ=2(24/25)(−7/25)=−336/625'],answer:'sin4θ=−336/625.'},
  {level:'mains',concept:'tr3',title:'Numerical 5 — General Solution',problem:'Solve 2cos²x+sinx=2 for x∈[0,2π].',opts:['x=π/6, 5π/6, π/2','x=π/6, 5π/6','x=π/2, π/6','x=π/6, π/2'],correct:0,steps:['2(1−sin²x)+sinx=2','2−2sin²x+sinx=2 → sinx(1−2sinx)=0','sinx=0 (x=0,π,2π) or sinx=1/2 (x=π/6,5π/6)','In [0,2π]: x=0,π/6,5π/6,π,2π — but check x=0,2π at boundary'],answer:'x=0,π/6,5π/6,π,2π (5 solutions in closed interval).'},
  {level:'advanced',concept:'tr1',title:'Numerical 6 — Product to Sum',problem:'Simplify cos20°·cos40°·cos60°·cos80°.',opts:['1/16','√3/16','1/8','3/16'],correct:0,steps:['cos60°=1/2','cos20°cos40°cos80° = cos20°cos(60°−20°)cos(60°+20°)','=sin(3×20°)/(4sin20°)=sin60°/(4sin20°)=√3/(8sin20°)... ','Actually product formula: cos20cos40cos80=1/8','Total: (1/2)(1/8)=1/16'],answer:'1/16.'},
  {level:'advanced',concept:'tr2',title:'Numerical 7 — Advanced Identity',problem:'tan3A−tanA·tan2A·tan3A = ?',opts:['tanA+tan2A','tan3A','tanA·tan2A','1'],correct:1,steps:['tan3A=tan(A+2A)=(tanA+tan2A)/(1−tanA·tan2A)','So tan3A(1−tanA·tan2A)=tanA+tan2A','tan3A−tan3A·tanA·tan2A=tanA+tan2A... ','tan3A = tanA+tan2A+tanA·tan2A·tan3A... rearrange: yes, the expression equals tanA+tan2A... wait: tan3A−tanA·tan2A·tan3A=tanA+tan2A'],answer:'tanA+tan2A.'},
  {level:'advanced',concept:'tr3',title:'Numerical 8 — Equation Solutions',problem:'How many solutions does sin(πx)=x/3 have?',opts:['7','5','3','infinite'],correct:0,steps:['Graph y=sin(πx) and y=x/3','sin(πx) oscillates, x/3 is a line with small slope','Intersections near x=0,±1,±2,±3','Count carefully: 7 intersections'],answer:'7 solutions.'}
];
const QB=[
  {id:'trqb1',level:'cbse',diff:1,concept:'tr1',text:'sin(−π/6)=?',opts:['−1/2','1/2','−√3/2','√3/2'],correct:0,exp:{steps:['sin(−θ)=−sinθ','−sin(π/6)=−1/2'],answer:'−1/2.'}},
  {id:'trqb2',level:'cbse',diff:1,concept:'tr1',text:'cos(3π/2)=?',opts:['0','−1','1','−1/2'],correct:0,exp:{steps:['3π/2=270°, point (0,−1), cosine=0'],answer:'0.'}},
  {id:'trqb3',level:'cbse',diff:1,concept:'tr2',text:'1−2sin²(θ/2)=?',opts:['cosθ','sinθ','cos2θ','sin2θ'],correct:0,exp:{steps:['1−2sin²A=cos2A with A=θ/2'],answer:'cosθ.'}},
  {id:'trqb4',level:'cbse',diff:1,concept:'tr3',text:'Principal solution of sinx=√3/2 in [0,2π]:',opts:['π/3 and 2π/3','π/3 only','2π/3 only','π/6 and 5π/6'],correct:0,exp:{steps:['sinx=√3/2 at x=π/3 and π−π/3=2π/3'],answer:'π/3 and 2π/3.'}},
  {id:'trqb5',level:'cbse',diff:1,concept:'tr1',text:'tan(5π/4)=?',opts:['1','−1','√3','−√3'],correct:0,exp:{steps:['5π/4 in Q3, tan positive. Reference=π/4, tan=1.'],answer:'1.'}},
  {id:'trqb6',level:'cbse',diff:1,concept:'tr2',text:'sin(A+B)·sin(A−B)=?',opts:['sin²A−sin²B','cos²B−cos²A','sin2A','cos(A+B)'],correct:0,exp:{steps:['(sinAcosB+cosAsinB)(sinAcosB−cosAsinB)=sin²Acos²B−cos²Asin²B=sin²A(1−sin²B)−(1−sin²A)sin²B=sin²A−sin²B'],answer:'sin²A−sin²B.'}},
  {id:'trqb7',level:'cbse',diff:1,concept:'tr3',text:'General solution of cosx=0:',opts:['x=nπ+π/2','x=2nπ+π/2','x=(2n+1)π/2','both A and C'],correct:3,exp:{steps:['cosx=0 at π/2, 3π/2, ...=(2n+1)π/2'],answer:'x=(2n+1)π/2.'}},
  {id:'trqb8',level:'cbse',diff:1,concept:'tr1',text:'sin²30°+cos²60°=?',opts:['1/2','1','3/4','1/4'],correct:0,exp:{steps:['sin30=1/2, cos60=1/2','(1/2)²+(1/2)²=1/4+1/4=1/2'],answer:'1/2.'}},
  {id:'trqb9',level:'mains',diff:2,concept:'tr2',text:'If tanA=1/2, tanB=1/3, then A+B=?',opts:['π/4','π/3','π/6','π/2'],correct:0,exp:{steps:['tan(A+B)=(1/2+1/3)/(1−1/6)=(5/6)/(5/6)=1','tan(A+B)=1 → A+B=π/4'],answer:'π/4.'}},
  {id:'trqb10',level:'mains',diff:2,concept:'tr1',text:'sin10°·sin50°·sin70°=?',opts:['1/8','√3/8','1/4','3/8'],correct:0,exp:{steps:['sin10·sin(60−10)·sin(60+10)=sin30/4=1/8'],answer:'1/8.'}},
  {id:'trqb11',level:'mains',diff:2,concept:'tr3',text:'Solutions of tan²x=3 in [0,π]:',opts:['π/3 and 2π/3','π/3 only','π/6 and 5π/6','no solution'],correct:0,exp:{steps:['tanx=±√3','x=π/3 (tanx=√3) and x=2π/3 (tanx=−√3)'],answer:'π/3 and 2π/3.'}},
  {id:'trqb12',level:'mains',diff:2,concept:'tr2',text:'cos4x in terms of cosx:',opts:['8cos⁴x−8cos²x+1','4cos²x−3','2cos²x−1','8cos³x−4cosx'],correct:0,exp:{steps:['cos2x=2cos²x−1','cos4x=2cos²2x−1=2(2cos²x−1)²−1=8cos⁴x−8cos²x+1'],answer:'8cos⁴x−8cos²x+1.'}},
  {id:'trqb13',level:'mains',diff:2,concept:'tr1',text:'If secθ=13/5 and θ in Q4, sinθ=?',opts:['−12/13','12/13','5/13','−5/13'],correct:0,exp:{steps:['cosθ=5/13','sin²θ=1−25/169=144/169','Q4: sin negative → −12/13'],answer:'−12/13.'}},
  {id:'trqb14',level:'mains',diff:2,concept:'tr3',text:'Number of solutions of cosx=x/3 in [−π,π]:',opts:['3','1','2','0'],correct:0,exp:{steps:['Graph cosx and y=x/3','One intersection each in negative, zero, positive region: 3 total'],answer:'3.'}},
  {id:'trqb15',level:'mains',diff:2,concept:'tr2',text:'sinA+sin3A+sin5A = ?',opts:['3sin3A·cos2A','sin3A·(1+2cos2A)','3sinA','sin3A'],correct:1,exp:{steps:['sinA+sin5A=2sin3A·cos2A','Total=2sin3A·cos2A+sin3A=sin3A(2cos2A+1)'],answer:'sin3A(1+2cos2A).'}},
  {id:'trqb16',level:'advanced',diff:3,concept:'tr2',text:'tan(π/4+θ)·tan(3π/4+θ)=?',opts:['−1','1','tanθ','−tanθ'],correct:0,exp:{steps:['tan(π/4+θ)=(1+tanθ)/(1−tanθ)','tan(3π/4+θ)=tan(π−π/4+θ)=−tan(π/4−θ)=(−1+tanθ)/(1+tanθ)... = (tanθ−1)/(tanθ+1)','Product = (1+tanθ)(tanθ−1)/((1−tanθ)(1+tanθ))... = −1'],answer:'−1.'}},
  {id:'trqb17',level:'advanced',diff:3,concept:'tr3',text:'General solution of sinx+cosx=1:',opts:['x=2nπ or x=2nπ+π/2','x=2nπ+π/4','x=nπ/2','x=2nπ'],correct:0,exp:{steps:['√2 sin(x+π/4)=1','sin(x+π/4)=1/√2','x+π/4=nπ+(−1)ⁿ(π/4)','x=2nπ,0 or x=2nπ+π/2'],answer:'x=2nπ or x=2nπ+π/2.'}},
  {id:'trqb18',level:'advanced',diff:3,concept:'tr1',text:'cos36°−cos72°=?',opts:['1/2','√5/4','1/4','√5/2'],correct:0,exp:{steps:['cos36=( √5+1)/4... use known: cos36°=(1+√5)/4... ','cos36°−cos72°=2sin54°sin18°=2cos36°sin18°... known result = 1/2'],answer:'1/2.'}},
  {id:'trqb19',level:'advanced',diff:3,concept:'tr3',text:'sinx=sin²x has how many solutions in [0,2π]?',opts:['4','3','2','5'],correct:0,exp:{steps:['sinx(sinx−1)=0','sinx=0: x=0,π,2π (3 solutions)','sinx=1: x=π/2 (1 solution)','Total: 4'],answer:'4.'}},
  {id:'trqb20',level:'advanced',diff:3,concept:'tr2',text:'sin⁶x+cos⁶x = ?',opts:['1−3sin²x·cos²x','1−3/4·sin²2x','both A and B','neither'],correct:2,exp:{steps:['a³+b³=(a+b)(a²−ab+b²) with a=sin²x, b=cos²x','=(1)(1−sin²xcos²x)... actually (sin²x)³+(cos²x)³=(sin²x+cos²x)(sin⁴x−sin²xcos²x+cos⁴x)','=1−3sin²xcos²x=1−(3/4)sin²2x'],answer:'1−3sin²xcos²x = 1−(3/4)sin²2x.'}},
  {id:'trqb21',level:'cbse',diff:1,concept:'tr1',text:'tan(45°+θ)·tan(45°−θ)=?',opts:['1','tanθ','tan²θ','−1'],correct:0,exp:{steps:['(1+tanθ)/(1−tanθ) × (1−tanθ)/(1+tanθ)=1'],answer:'1.'}},
  {id:'trqb22',level:'cbse',diff:1,concept:'tr2',text:'2sin²(π/6)+cosec²(7π/6)·cos²(π/3)=?',opts:['1','3/2','2','3'],correct:1,exp:{steps:['2(1/4)+cosec²(7π/6)(1/4)','cosec(7π/6)=−2 so cosec²=4','2(1/4)+4(1/4)=1/2+1=3/2'],answer:'3/2.'}},
  {id:'trqb23',level:'mains',diff:2,concept:'tr2',text:'If sin(A+B)=1 and cos(A−B)=√3/2, find A and B.',opts:['A=60°,B=30°','A=45°,B=45°','A=75°,B=15°','A=90°,B=0°'],correct:0,exp:{steps:['A+B=90°; A−B=30°','Solve: A=60°,B=30°'],answer:'A=60°, B=30°.'}},
  {id:'trqb24',level:'mains',diff:2,concept:'tr3',text:'Solve 2cos²x−5cosx+2=0 in [0,2π].',opts:['π/3 and 5π/3','π/3, 5π/3, and π/2','π/6, π','π/3 and π'],correct:0,exp:{steps:['(2cosx−1)(cosx−2)=0','cosx=1/2 (cosx=2 impossible)','x=π/3, 5π/3'],answer:'x=π/3 and 5π/3.'}},
  {id:'trqb25',level:'advanced',diff:3,concept:'tr1',text:'Maximum of 3sinx+4cosx:',opts:['5','7','4','3'],correct:0,exp:{steps:['Max of a·sinx+b·cosx=√(a²+b²)=√(9+16)=5'],answer:'5.'}},
  {id:'trqb26',level:'advanced',diff:3,concept:'tr2',text:'sin(π/14)·sin(3π/14)·sin(5π/14)=?',opts:['1/8','√3/8','3/8','1/4'],correct:0,exp:{steps:['Known product formula result','sin(π/14)sin(3π/14)sin(5π/14)=1/8'],answer:'1/8.'}},
  {id:'trqb27',level:'cbse',diff:1,concept:'tr1',text:'sec²x−tan²x=?',opts:['1','0','sec²x','2'],correct:0,exp:{steps:['Pythagorean identity: 1+tan²x=sec²x'],answer:'1.'}},
  {id:'trqb28',level:'mains',diff:2,concept:'tr3',text:'General solution of sin3θ=sinθ:',opts:['θ=nπ/2 or θ=nπ+π/4','θ=nπ or θ=nπ/2','θ=nπ or θ=(2n+1)π/4','θ=nπ±π/4'],correct:0,exp:{steps:['sin3θ−sinθ=0 → 2cos2θsinθ=0','cos2θ=0: 2θ=(2n+1)π/2 → θ=(2n+1)π/4 → θ=nπ/2... or sinθ=0: θ=nπ'],answer:'θ=nπ or θ=nπ/2.'}},
  {id:'trqb29',level:'advanced',diff:3,concept:'tr2',text:'cos²π/8+cos²(3π/8)+cos²(5π/8)+cos²(7π/8)=?',opts:['2','1','3/2','4'],correct:0,exp:{steps:['Note cos(5π/8)=−cos(3π/8) so cos²(5π/8)=cos²(3π/8)','Similarly cos(7π/8)=−cos(π/8)','Sum=2cos²(π/8)+2cos²(3π/8)=2(cos²(π/8)+sin²(π/8))=2'],answer:'2.'}},
  {id:'trqb30',level:'advanced',diff:3,concept:'tr3',text:'Number of solutions of sin x = x² in (−π,π):',opts:['3','1','2','infinite'],correct:0,exp:{steps:['x²≥0, sinx can be negative','Near x=0 both near 0, one solution at origin','Two more where sinx=x² symmetric','Total 3'],answer:'3.'}}
];
registerChapter({
  id:'maths-trigonometry',title:'Trigonometric Functions',subject:'Maths · Class 11',class:11,
  intro:'Trigonometry powers everything from oscillations to complex numbers. The unit circle, identities, and general solutions are the three pillars you need for JEE.',
  concepts:['tr1','tr2','tr3'],
  conceptMeta:{
    tr1:{title:'Unit Circle & Values',shortTitle:'Unit Circle',tag:'Concept 1 of 3',icon:'⭕',sub:'Extend sin/cos to all angles using the unit circle. ASTC signs. Exact values cold.'},
    tr2:{title:'Identities',shortTitle:'Identities',tag:'Concept 2 of 3',icon:'🔁',sub:'From sin²+cos²=1 derive everything. Compound, double, half-angle formulas.'},
    tr3:{title:'Equations & Solutions',shortTitle:'Equations',tag:'Concept 3 of 3',icon:'🎯',sub:'Infinitely many solutions — write them all with general solution formulas.'},
  },
  teach:{tr1:(f)=>teachTrig1(f),tr2:(f)=>teachTrig2(f),tr3:(f)=>teachTrig3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
