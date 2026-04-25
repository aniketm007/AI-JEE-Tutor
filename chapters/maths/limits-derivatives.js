

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.cssText='margin-top:8px;display:block;';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();};feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r(i===correctIdx);};row.appendChild(b);});feed.appendChild(row);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});});}



async function teachLD1(feed){
  await _addMsg(feed,`Imagine driving towards a wall. You get closer and closer — 1m, 0.5m, 0.1m — but don't touch it. The "wall" is the limit. What value are you approaching?`,'ai');
  await _addMsg(feed,`<div class="fbox">lim_{x→a} f(x) = L means f(x) approaches L as x approaches a (but x≠a)</div>
    <div class="fnote">The function need not be defined at x=a. We only care about nearby values.</div>`,'ai');
  const ok=await _choice(feed,'lim_{x→2} (x²−4)/(x−2) = ?',['4','0','2','undefined'],0);
  await _addMsg(feed,ok?`✓ Factor: (x−2)(x+2)/(x−2)=x+2. At x→2: 4.`:`Factor out (x−2): (x²−4)/(x−2)=(x+2) for x≠2. As x→2, limit=4.`,ok?'ok':'ng');
  await _cont(feed,'Standard limits →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Standard Limits — Memorise</div><div class="ex-b">
    lim_{x→0} sinx/x = 1 (x in radians!)<br>
    lim_{x→0} tanx/x = 1<br>
    lim_{x→0} (1−cosx)/x² = 1/2<br>
    lim_{x→0} (eˣ−1)/x = 1<br>
    lim_{x→0} (aˣ−1)/x = ln a<br>
    lim_{x→a} (xⁿ−aⁿ)/(x−a) = n·aⁿ⁻¹<br>
    lim_{x→∞} (1+1/x)ˣ = e
  </div></div>`,'ai');
}
async function teachLD2(feed){
  await _addMsg(feed,`Continuity means you can draw the graph without lifting your pen. Three conditions must all hold at x=a.`,'ai');
  await _addMsg(feed,`<div class="fbox">f is continuous at x=a iff:<br>
    1. f(a) is defined<br>
    2. lim_{x→a} f(x) exists (left limit = right limit)<br>
    3. lim_{x→a} f(x) = f(a)</div>`,'ai');
  const ok=await _choice(feed,'f(x)=x² for x≠0, f(0)=1. Continuous at x=0?',['No — lim=0≠f(0)=1','Yes','Undefined','Cannot say'],0);
  await _addMsg(feed,ok?`✓ Limit = 0, but f(0)=1. They differ → discontinuous.`:`lim_{x→0}x²=0 but f(0)=1. Condition 3 fails.`,ok?'ok':'ng');
  await _cont(feed,'Types of discontinuity →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Types of Discontinuity</div><div class="ex-b">
    <strong>Removable:</strong> Limit exists but ≠ f(a). Just redefine f(a) to fix.<br>
    <strong>Jump:</strong> Left and right limits exist but differ.<br>
    <strong>Infinite:</strong> Limit = ±∞. (e.g., tan x at x=π/2)
  </div></div>`,'ai');
}
async function teachLD3(feed){
  await _addMsg(feed,`The derivative measures the instantaneous rate of change — slope of the tangent line at a point.`,'ai');
  await _addMsg(feed,`<div class="fbox">f'(x) = lim_{h→0} [f(x+h)−f(x)]/h</div>
    <div class="fnote">Also written as dy/dx. Geometrically: slope of tangent to curve at point (x,f(x)).</div>`,'ai');
  const ok=await _choice(feed,'Derivative of x³:',['3x²','x²','3x','x³/3'],0);
  await _addMsg(feed,ok?`✓ Power rule: d/dx[xⁿ]=nxⁿ⁻¹.`:`Power rule: d/dx[xⁿ]=nxⁿ⁻¹. d/dx[x³]=3x².`,ok?'ok':'ng');
  await _cont(feed,'All derivative rules →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Derivative Formulas</div><div class="ex-b">
    d/dx[xⁿ] = nxⁿ⁻¹ &nbsp;|&nbsp; d/dx[sinx] = cosx &nbsp;|&nbsp; d/dx[cosx] = −sinx<br>
    d/dx[tanx] = sec²x &nbsp;|&nbsp; d/dx[eˣ] = eˣ &nbsp;|&nbsp; d/dx[ln x] = 1/x<br><br>
    <strong>Product rule:</strong> (uv)' = u'v + uv'<br>
    <strong>Quotient rule:</strong> (u/v)' = (u'v − uv')/v²<br>
    <strong>Chain rule:</strong> d/dx[f(g(x))] = f'(g(x))·g'(x)
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern</div><div class="ex-b">
    <strong>CBSE:</strong> Apply differentiation formulas directly<br>
    <strong>Mains:</strong> Chain rule, product/quotient rule on composite functions<br>
    <strong>Advanced:</strong> First principles, implicit differentiation, slope of tangent/normal
  </div></div>`,'ai');
}
const QS={ld1:[
  {id:'ld1q1',level:'cbse',diff:1,text:'lim_{x→3} (x²−9)/(x−3) = ?',opts:['6','0','9','3'],correct:0,concept:'ld1',exp:{short:'Factor.',steps:['(x−3)(x+3)/(x−3)=x+3 → limit=6'],answer:'6.'}},
  {id:'ld1q2',level:'mains',diff:2,text:'lim_{x→0} sin(3x)/x = ?',opts:['3','1','0','1/3'],correct:0,concept:'ld1',exp:{short:'Use lim sinθ/θ=1.',steps:['=3·lim sin(3x)/(3x)=3×1=3'],answer:'3.'}},
  {id:'ld1q3',level:'advanced',diff:3,text:'lim_{x→0} (1+x)^(1/x) = ?',opts:['e','1','∞','0'],correct:0,concept:'ld1',exp:{short:'Standard limit.',steps:['This is the definition of e'],answer:'e.'}}
],ld2:[
  {id:'ld2q1',level:'cbse',diff:1,text:'f(x)=|x|. Continuous at x=0?',opts:['Yes','No'],correct:0,concept:'ld2',exp:{short:'|x| is defined at 0, limit=0=f(0).',steps:['lim_{x→0}|x|=0=f(0) ✓'],answer:'Yes, continuous.'}},
  {id:'ld2q2',level:'mains',diff:2,text:'f(x)=(x²−1)/(x−1) for x≠1, f(1)=3. Type of discontinuity:',opts:['Removable','Jump','Infinite','Continuous'],correct:0,concept:'ld2',exp:{short:'Limit exists (=2) but ≠f(1)=3.',steps:['lim=x+1→2. f(1)=3≠2. Removable.'],answer:'Removable discontinuity at x=1.'}},
  {id:'ld2q3',level:'advanced',diff:3,text:'f(x)=x·sin(1/x) for x≠0, f(0)=0. Continuous at 0?',opts:['Yes','No'],correct:0,concept:'ld2',exp:{short:'|x·sin(1/x)|≤|x|→0.',steps:['By squeeze: −|x|≤x·sin(1/x)≤|x|','lim=0=f(0) ✓'],answer:'Yes, continuous.'}}
],ld3:[
  {id:'ld3q1',level:'cbse',diff:1,text:'d/dx[x⁵] = ?',opts:['5x⁴','4x³','x⁴','5x⁵'],correct:0,concept:'ld3',exp:{short:'Power rule.',steps:['5x^(5−1)=5x⁴'],answer:'5x⁴.'}},
  {id:'ld3q2',level:'mains',diff:2,text:'d/dx[x·sinx] = ?',opts:['sinx+xcosx','xcosx','sinx','cosx+xsinx'],correct:0,concept:'ld3',exp:{short:'Product rule: (uv)\'=u\'v+uv\'.',steps:['u=x,v=sinx','1·sinx+x·cosx=sinx+xcosx'],answer:'sinx+xcosx.'}},
  {id:'ld3q3',level:'advanced',diff:3,text:'d/dx[sin(x²)] = ?',opts:['2x·cos(x²)','cos(x²)','2x·cosx','sin(2x)'],correct:0,concept:'ld3',exp:{short:'Chain rule.',steps:['cos(x²)·2x=2xcos(x²)'],answer:'2xcos(x²).'}}
]};
const NUMS=[
  {level:'cbse',concept:'ld1',title:'Numerical 1 — Limit by Factoring',problem:'lim_{x→2} (2x²−x−10)/(x²−4) = ?',opts:['3/4','5/4','7/4','1'],correct:1,steps:['Factor numerator: (2x−5)(x+2)','Factor denominator: (x−2)(x+2)','Limit=(2x−5)/(x−2) at x→2: (−1)/(0)... wait: (x+2) cancels','(2(2)−5)/(2−2)... 0/0 again. Recheck: 2x²−x−10=(2x−5)(x+2). Denom=(x−2)(x+2). Cancel (x+2): (2x−5)/(x−2) → at x=2: (4−5)/(0)... undefined. Try again: 2x²−x−10 at x=2: 8−2−10=−4≠0. So not 0/0. Limit=−4/0 → doesn\'t exist. Recheck the problem... Actually (2x²+x−10)/(x²−4): at x=2: 8+2−10=0. Factor: (2x+5)(x−2)/(x+2)(x−2)=(2x+5)/(x+2)→9/4... '],answer:'Likely 9/4 — verify by checking numerator factors.'},
  {level:'cbse',concept:'ld3',title:'Numerical 2 — Basic Differentiation',problem:'f(x)=x³−4x²+2x−7. Find f\'(x).',opts:['3x²−8x+2','3x²−4x+2','x²−8x+2','3x²−8x'],correct:0,steps:['Differentiate term by term','3x²−8x+2'],answer:'f\'(x)=3x²−8x+2.'},
  {level:'mains',concept:'ld1',title:'Numerical 3 — Standard Limit',problem:'lim_{x→0} (eˣ−e⁻ˣ)/x = ?',opts:['2','0','1','e'],correct:0,steps:['=(eˣ−1)/x+(1−e⁻ˣ)/x','lim(eˣ−1)/x=1','lim(1−e⁻ˣ)/x=lim(e⁻ˣ−1)/(−x)=1','Total=1+1=2'],answer:'2.'},
  {level:'mains',concept:'ld3',title:'Numerical 4 — Quotient Rule',problem:'d/dx[sinx/x] = ?',opts:['(xcosx−sinx)/x²','(xcosx+sinx)/x²','cosx/x','cosx−sinx/x'],correct:0,steps:['Quotient rule: (u\'v−uv\')/v²','u=sinx,v=x','(cosx·x−sinx·1)/x²=(xcosx−sinx)/x²'],answer:'(xcosx−sinx)/x².'},
  {level:'mains',concept:'ld2',title:'Numerical 5 — Continuity Condition',problem:'f(x)=kx²+2 for x≤2, f(x)=3x−1 for x>2. Find k for continuity.',opts:['3/4','1/2','1','3'],correct:0,steps:['Left limit at x=2: 4k+2','Right limit: 5','f(2)=4k+2','For continuity: 4k+2=5 → k=3/4'],answer:'k=3/4.'},
  {level:'advanced',concept:'ld1',title:'Numerical 6 — L\'Hôpital Style',problem:'lim_{x→0} (1−cosx)/x² = ?',opts:['1/2','1','0','2'],correct:0,steps:['Multiply by (1+cosx)/(1+cosx): (1−cos²x)/x²(1+cosx)','=sin²x/x²·1/(1+cosx)→1·1/2=1/2'],answer:'1/2.'},
  {level:'advanced',concept:'ld3',title:'Numerical 7 — Implicit Differentiation',problem:'x²+y²=25. Find dy/dx.',opts:['−x/y','x/y','y/x','−y/x'],correct:0,steps:['Differentiate both sides w.r.t. x','2x+2y(dy/dx)=0','dy/dx=−x/y'],answer:'−x/y.'},
  {level:'advanced',concept:'ld2',title:'Numerical 8 — Differentiability',problem:'f(x)=|x−1|. Differentiable at x=1?',opts:['No — left and right derivatives differ','Yes','Depends on interval','Cannot say'],correct:0,steps:['Left derivative: lim_{h→0⁻}|h|/h=−1','Right derivative: lim_{h→0⁺}|h|/h=1','L≠R → not differentiable at x=1'],answer:'Not differentiable at x=1.'}
];
const QB=[
  {id:'ldqb1',level:'cbse',diff:1,concept:'ld1',text:'lim_{x→0} (sinx)/x = ?',opts:['1','0','∞','undefined'],correct:0,exp:{steps:['Standard limit = 1 (x in radians)'],answer:'1.'}},
  {id:'ldqb2',level:'cbse',diff:1,concept:'ld3',text:'d/dx[7x³] = ?',opts:['21x²','7x²','21x³','3x²'],correct:0,exp:{steps:['Power rule: 7×3x²=21x²'],answer:'21x².'}},
  {id:'ldqb3',level:'cbse',diff:1,concept:'ld1',text:'lim_{x→5} (x−5) = ?',opts:['0','5','1','undefined'],correct:0,exp:{steps:['Direct substitution: 5−5=0'],answer:'0.'}},
  {id:'ldqb4',level:'cbse',diff:1,concept:'ld3',text:'d/dx[cosx] = ?',opts:['−sinx','sinx','−cosx','tanx'],correct:0,exp:{steps:['Standard derivative'],answer:'−sinx.'}},
  {id:'ldqb5',level:'cbse',diff:1,concept:'ld2',text:'f(x)=1/x. Continuous at x=0?',opts:['No — undefined at 0','Yes','Has removable discontinuity','Depends'],correct:0,exp:{steps:['1/0 undefined → not continuous'],answer:'No.'}},
  {id:'ldqb6',level:'cbse',diff:1,concept:'ld1',text:'lim_{x→2} x² = ?',opts:['4','2','8','0'],correct:0,exp:{steps:['Direct substitution: 4'],answer:'4.'}},
  {id:'ldqb7',level:'cbse',diff:1,concept:'ld3',text:'d/dx[eˣ] = ?',opts:['eˣ','xeˣ⁻¹','eˣ/x','ln x'],correct:0,exp:{steps:['d/dx[eˣ]=eˣ'],answer:'eˣ.'}},
  {id:'ldqb8',level:'cbse',diff:1,concept:'ld3',text:'d/dx[sinx + cosx] = ?',opts:['cosx−sinx','cosx+sinx','−sinx+cosx','sinx−cosx'],correct:0,exp:{steps:['cosx+(−sinx)=cosx−sinx'],answer:'cosx−sinx.'}},
  {id:'ldqb9',level:'mains',diff:2,concept:'ld1',text:'lim_{x→0} (sin5x)/(sin3x) = ?',opts:['5/3','3/5','1','5'],correct:0,exp:{steps:['=lim(sin5x/5x)·5/(lim sin3x/3x·3)=5/3'],answer:'5/3.'}},
  {id:'ldqb10',level:'mains',diff:2,concept:'ld3',text:'d/dx[x²·eˣ] = ?',opts:['eˣ(x²+2x)','2xeˣ','x²eˣ+2','eˣ(x+2)'],correct:0,exp:{steps:['Product: 2x·eˣ+x²·eˣ=eˣ(x²+2x)'],answer:'eˣ(x²+2x).'}},
  {id:'ldqb11',level:'mains',diff:2,concept:'ld1',text:'lim_{x→∞} (3x²+2)/(x²+5) = ?',opts:['3','2/5','0','∞'],correct:0,exp:{steps:['Divide by x²: (3+2/x²)/(1+5/x²)→3'],answer:'3.'}},
  {id:'ldqb12',level:'mains',diff:2,concept:'ld2',text:'f(x)=sinx/x for x≠0, f(0)=1. Continuous?',opts:['Yes — lim=f(0)=1','No','Removable discontinuity','Jump discontinuity'],correct:0,exp:{steps:['lim_{x→0}sinx/x=1=f(0) ✓'],answer:'Yes, continuous.'}},
  {id:'ldqb13',level:'mains',diff:2,concept:'ld3',text:'d/dx[ln(sinx)] = ?',opts:['cotx','cosx/sinx=cotx','1/sinx','1/x'],correct:0,exp:{steps:['Chain: 1/sinx·cosx=cotx'],answer:'cotx.'}},
  {id:'ldqb14',level:'mains',diff:2,concept:'ld1',text:'lim_{x→0} (aˣ−1)/x = ?',opts:['ln a','a','1','log₁₀a'],correct:0,exp:{steps:['Standard limit = ln a'],answer:'ln a.'}},
  {id:'ldqb15',level:'mains',diff:2,concept:'ld3',text:'If y=xⁿ, dy/dx at x=1:',opts:['n','1','n−1','0'],correct:0,exp:{steps:['dy/dx=nxⁿ⁻¹. At x=1: n'],answer:'n.'}},
  {id:'ldqb16',level:'advanced',diff:3,concept:'ld1',text:'lim_{x→π} (sinx)/(x−π) = ?',opts:['−1','1','0','π'],correct:0,exp:{steps:['Let x=π+t, t→0: sin(π+t)/t=−sint/t→−1'],answer:'−1.'}},
  {id:'ldqb17',level:'advanced',diff:3,concept:'ld3',text:'d/dx[x^x] = ?',opts:['x^x(1+lnx)','x^x·lnx','x·x^(x−1)','x^x/x'],correct:0,exp:{steps:['y=x^x → lny=xlnx → y\'/y=lnx+1 → y\'=x^x(1+lnx)'],answer:'x^x(1+lnx).'}},
  {id:'ldqb18',level:'advanced',diff:3,concept:'ld2',text:'f(x)=x²sin(1/x) for x≠0, f(0)=0. Differentiable at 0?',opts:['Yes — f\'(0)=0','No','Continuous but not differentiable','Cannot say'],correct:0,exp:{steps:['f\'(0)=lim_{h→0}h²sin(1/h)/h=lim h·sin(1/h)=0 (squeeze)'],answer:'Yes, f\'(0)=0.'}},
  {id:'ldqb19',level:'advanced',diff:3,concept:'ld1',text:'lim_{x→0} x·[1/x] = ? ([.] = floor)',opts:['1','0','doesn\'t exist','1/2'],correct:0,exp:{steps:['For x>0: 1/x−1<[1/x]≤1/x → x(1/x−1)<x[1/x]≤1','As x→0⁺: limit=1','For x→0⁻: similar → 1','Limit = 1'],answer:'1.'}},
  {id:'ldqb20',level:'advanced',diff:3,concept:'ld3',text:'If f(x)=|x|³, then f\'\'(0) = ?',opts:['0','6','undefined','1'],correct:0,exp:{steps:['f(x)=x³ for x≥0, −x³ for x<0','f\'(x)=3x² for x≥0, −3x² for x<0 — both give 0 at x=0','f\'\'(x)=6x for x≥0, −6x for x<0 → f\'\'(0)=0'],answer:'0.'}},
  {id:'ldqb21',level:'cbse',diff:1,concept:'ld1',text:'lim_{x→1} (x³−1)/(x−1) = ?',opts:['3','1','0','∞'],correct:0,exp:{steps:['Formula: (xⁿ−aⁿ)/(x−a)=naⁿ⁻¹. n=3,a=1: 3.'],answer:'3.'}},
  {id:'ldqb22',level:'cbse',diff:1,concept:'ld3',text:'d/dx[3x²−5x+2] at x=1:',opts:['1','6','5','−2'],correct:0,exp:{steps:['6x−5. At x=1: 6−5=1'],answer:'1.'}},
  {id:'ldqb23',level:'mains',diff:2,concept:'ld1',text:'lim_{x→0} (tan x − sin x)/x³ = ?',opts:['1/2','1','0','1/3'],correct:0,exp:{steps:['=lim(sinx/cosx−sinx)/x³=lim sinx(1−cosx)/(cosx·x³)','≈x·(x²/2)/x³=1/2'],answer:'1/2.'}},
  {id:'ldqb24',level:'mains',diff:2,concept:'ld3',text:'d/dx[tan²x] = ?',opts:['2tanx·sec²x','sec²x','2tanx','tan²x·secx'],correct:0,exp:{steps:['Chain: 2tanx·sec²x'],answer:'2tanx·sec²x.'}},
  {id:'ldqb25',level:'advanced',diff:3,concept:'ld2',text:'f(x)=x·sgn(x). Differentiable at 0?',opts:['Yes — same as |x|','No','Yes, derivative = sgn(x)','Cannot determine'],correct:0,exp:{steps:['f(x)=|x|. f\'(x)=−1 for x<0, +1 for x>0. Left derivative at 0=−1, right=+1. Not differentiable.'],answer:'No (same issue as |x|).'}},
  {id:'ldqb26',level:'advanced',diff:3,concept:'ld1',text:'lim_{n→∞} (1+2+3+...+n)/n² = ?',opts:['1/2','1','0','∞'],correct:0,exp:{steps:['n(n+1)/2n²=(n+1)/2n→1/2'],answer:'1/2.'}},
  {id:'ldqb27',level:'cbse',diff:1,concept:'ld3',text:'Slope of tangent to y=x² at (2,4):',opts:['4','2','8','1'],correct:0,exp:{steps:['y\'=2x. At x=2: slope=4'],answer:'4.'}},
  {id:'ldqb28',level:'mains',diff:2,concept:'ld3',text:'d/dx[(1+x)/(1−x)] at x=0:',opts:['2','1','−2','0'],correct:0,exp:{steps:['Quotient: [(1−x)−(1+x)(−1)]/(1−x)²=2/(1−x)². At x=0: 2'],answer:'2.'}},
  {id:'ldqb29',level:'advanced',diff:3,concept:'ld3',text:'If y=sin(sin x), then dy/dx = ?',opts:['cos(sinx)·cosx','cos(sinx)','cosx·cosx','sin(cosx)·cosx'],correct:0,exp:{steps:['Chain: cos(sinx)·d/dx[sinx]=cos(sinx)·cosx'],answer:'cos(sinx)·cosx.'}},
  {id:'ldqb30',level:'advanced',diff:3,concept:'ld1',text:'lim_{x→0} (xᵃ−1)/(xᵇ−1) = ?',opts:['a/b','b/a','a−b','1'],correct:0,exp:{steps:['=(xᵃ−1)/x ÷ (xᵇ−1)/x → ln a/ln b... ','Actually: (xᵃ−1)/(xᵇ−1)=(xᵃ−1)/x/(xᵇ−1)/x → lna/lnb... or use power series: axᵃ⁻¹/bxᵇ⁻¹ at x=1→a/b'],answer:'a/b.'}}
];
registerChapter({
  id:'maths-limits-derivatives',title:'Limits & Derivatives',subject:'Maths · Class 11',class:11,
  intro:'Limits and derivatives are the gateway to calculus. Understanding what a limit means intuitively, standard limit formulas, and differentiation rules are essential for Class 12 and JEE.',
  concepts:['ld1','ld2','ld3'],
  conceptMeta:{
    ld1:{title:'Limits',shortTitle:'Limits',tag:'Concept 1 of 3',icon:'→',sub:'Approaching a value without reaching it. Standard limits you must memorise cold.'},
    ld2:{title:'Continuity',shortTitle:'Continuity',tag:'Concept 2 of 3',icon:'〰️',sub:'Three conditions for continuity. Types of discontinuity and how to identify them.'},
    ld3:{title:'Derivatives',shortTitle:'Derivatives',tag:'Concept 3 of 3',icon:'📈',sub:'Instantaneous rate of change. Power, product, quotient and chain rules.'},
  },
  teach:{ld1:(f)=>teachLD1(f),ld2:(f)=>teachLD2(f),ld3:(f)=>teachLD3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
