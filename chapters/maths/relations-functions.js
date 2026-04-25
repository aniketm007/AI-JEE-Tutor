

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.cssText='margin-top:8px;display:block;';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();};feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r(i===correctIdx);};row.appendChild(b);});feed.appendChild(row);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});});}



async function teachRF1(feed){
  await _addMsg(feed,`Every student has exactly one roll number — that's the core idea of a function. One input, one output. Always.`,'ai');
  await _cont(feed);
  await _addMsg(feed,`<div class="fbox">A Function f:A→B means every element of A maps to exactly ONE element of B.</div>
    <div class="fnote">Every function is a relation. Not every relation is a function.</div>`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Two failure modes</div><div class="warn-b">
    <strong>Not a function:</strong> One input → two outputs (e.g. f(1)=2 AND f(1)=3)<br>
    <strong>Not a function:</strong> A domain element has no output<br>
    <strong>Allowed:</strong> Two different inputs → same output (f(2)=5 AND f(3)=5 is fine)
  </div></div>`,'ai');
  await _cont(feed,'Show me types →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">3 Types</div><div class="ex-b">
    <strong>One-One (Injective):</strong> Different inputs always give different outputs. f(a)=f(b)⟹a=b.<br>
    <strong>Onto (Surjective):</strong> Every element of codomain has at least one pre-image. Range=Codomain.<br>
    <strong>Bijective:</strong> Both. Inverse exists only for bijections.<br><br>
    <strong>Counting:</strong> Functions A→B = |B|^|A| &nbsp;|&nbsp; One-one = P(|B|,|A|) &nbsp;|&nbsp; Bijections = |A|! (if |A|=|B|)
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern</div><div class="ex-b">
    <strong>CBSE:</strong> Is this mapping a function? (check uniqueness and totality)<br>
    <strong>Mains:</strong> Count functions / one-one functions between two sets<br>
    <strong>Advanced:</strong> Onto count using inclusion-exclusion; bijection properties
  </div></div>`,'ai');
}
async function teachRF2(feed){
  await _addMsg(feed,`Three things that kill domain — learn these and every domain question becomes mechanical.`,'ai');
  await _addMsg(feed,`<strong>Rule 1 — Square roots:</strong> inside ≥ 0<br>
    <strong>Rule 2 — Denominators:</strong> ≠ 0<br>
    <strong>Rule 3 — Logarithm:</strong> argument > 0<br><br>
    When rules combine, take the INTERSECTION of all conditions.`,'ai');
  const ok=await _choice(feed,'Domain of f(x)=1/(x−3)?',['ℝ','ℝ−{3}','x>3','x<3'],1);
  await _addMsg(feed,ok?`✓ x=3 makes denominator 0. Domain=ℝ−{3}.`:`x−3=0 when x=3. Exclude it. Domain=ℝ−{3}.`,ok?'ok':'ng');
  await _cont(feed,'More examples →');
  await _addMsg(feed,`<strong>f(x)=√(9−x²)</strong> → 9−x²≥0 → −3≤x≤3 → Domain:<span class="hg">[−3,3]</span>, Range:<span class="ha">[0,3]</span><br><br>
    <strong>f(x)=log(x²−4)</strong> → x²−4>0 → |x|>2 → Domain:<span class="hg">ℝ−[−2,2]</span><br><br>
    <strong>f(x)=√(x−1)+√(3−x)</strong> → x≥1 AND x≤3 → Domain:<span class="hg">[1,3]</span>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Range Quick Reference</div><div class="ex-b">
    sinx, cosx → [−1,1] &nbsp;|&nbsp; tanx → ℝ &nbsp;|&nbsp; eˣ → (0,∞) &nbsp;|&nbsp; ln x → ℝ<br>
    |x| → [0,∞) &nbsp;|&nbsp; x² → [0,∞) &nbsp;|&nbsp; 1/x → ℝ−{0}<br>
    <strong>Strategy:</strong> Let y=f(x), solve for x, find y values giving real x.
  </div></div>`,'ai');
}
async function teachRF3(feed){
  await _addMsg(feed,`Two machines in series. Output of g becomes input of f. That's fog.`,'ai');
  await _addMsg(feed,`<strong>fog(x)=f(g(x))</strong> — apply g FIRST, then f.<br>
    f(x)=x², g(x)=x+1:<br>
    fog(x)=(x+1)² &nbsp;&nbsp; gof(x)=x²+1 &nbsp;&nbsp; <span class="ha">fog≠gof!</span>`,'ai');
  const ok=await _choice(feed,'f(x)=2x, g(x)=x+3. Find fog(2).',['7','10','8','14'],1);
  await _addMsg(feed,ok?`✓ g(2)=5, f(5)=10.`:`g(2)=2+3=5. f(5)=2×5=10.`,ok?'ok':'ng');
  await _cont(feed,'Inverse functions →');
  await _addMsg(feed,`<strong>f⁻¹ reverses f.</strong> To find: write y=f(x), swap x↔y, solve for y.<br><br>
    f(x)=2x+3 → y=2x+3 → x=(y−3)/2 → <span class="hg">f⁻¹(x)=(x−3)/2</span><br><br>
    <strong>Key facts:</strong> f⁻¹ exists iff f is bijective &nbsp;|&nbsp; fof⁻¹=identity &nbsp;|&nbsp; (fog)⁻¹=g⁻¹of⁻¹`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ JEE Trap</div><div class="warn-b">
    Composition is associative but NOT commutative<br>
    (fog)⁻¹ = g⁻¹of⁻¹ (reverse order!)<br>
    Domain of f⁻¹ = Range of f
  </div></div>`,'ai');
}

const QS={rf1:[
  {id:'rf1q1',level:'cbse',diff:1,text:'Which is NOT a function from {1,2,3} to {a,b,c}?',opts:['R={(1,a),(2,b),(3,c)}','R={(1,a),(1,b),(3,c)}','R={(1,a),(2,a),(3,a)}','R={(1,c),(2,b),(3,a)}'],correct:1,concept:'rf1',exp:{short:'Each domain element must map to exactly ONE image.',steps:['B: element 1 maps to a AND b — two images'],answer:'Option B.'}},
  {id:'rf1q2',level:'mains',diff:2,text:'f(x)=2x+1, g(x)=x². Then fog(3)=?',opts:['19','37','7','49'],correct:0,concept:'rf1',exp:{short:'fog(x)=f(g(x)).',steps:['g(3)=9','f(9)=19'],answer:'19.'}},
  {id:'rf1q3',level:'advanced',diff:3,text:'Number of onto functions from {1,2,3} to {p,q}:',opts:['6','8','4','2'],correct:0,concept:'rf1',exp:{short:'Total − not onto.',steps:['Total=2³=8','Not onto: all→p (1) or all→q (1)','Onto=6'],answer:'6.'}}
],rf2:[
  {id:'rf2q1',level:'cbse',diff:1,text:'Domain of f(x)=√(x−4):',opts:['x≥4','x>4','x≤4','ℝ'],correct:0,concept:'rf2',exp:{short:'x−4≥0.',steps:['x≥4'],answer:'[4,∞).'}},
  {id:'rf2q2',level:'mains',diff:2,text:'Range of f(x)=3/(1+x²):',opts:['(0,3]','[0,3]','(0,3)','[1,3]'],correct:0,concept:'rf2',exp:{short:'x²≥0 so denominator≥1 so f≤3. Never reaches 0.',steps:['At x=0: f=3','As x→∞: f→0⁺'],answer:'(0,3].'}},
  {id:'rf2q3',level:'advanced',diff:3,text:'Domain of f(x)=sin⁻¹(x²−2):',opts:['[−√3,−1]∪[1,√3]','[−1,1]','[1,√3]','[0,√3]'],correct:0,concept:'rf2',exp:{short:'Need −1≤x²−2≤1.',steps:['x²≥1 and x²≤3','1≤|x|≤√3'],answer:'[−√3,−1]∪[1,√3].'}}
],rf3:[
  {id:'rf3q1',level:'cbse',diff:1,text:'f(x)=3x−1. Find f⁻¹(8).',opts:['3','25','8/3','23/3'],correct:0,concept:'rf3',exp:{short:'Find x where 3x−1=8.',steps:['3x=9, x=3'],answer:'3.'}},
  {id:'rf3q2',level:'mains',diff:2,text:'f(x)=x/(x+1). Find f⁻¹(x).',opts:['x/(1−x)','(x+1)/x','1/(1+x)','x/(x−1)'],correct:0,concept:'rf3',exp:{short:'Swap x and y, solve.',steps:['y=x/(x+1) → x=y/(1−y)'],answer:'f⁻¹(x)=x/(1−x).'}},
  {id:'rf3q3',level:'advanced',diff:3,text:'f(x)=eˣ, g(x)=ln x. (fog)(x)=?',opts:['x','e^(ln x)=x same','ln(eˣ)','x² '],correct:0,concept:'rf3',exp:{short:'f and g are inverses.',steps:['fog(x)=e^(ln x)=x'],answer:'x.'}}
]};
const NUMS=[
  {level:'cbse',concept:'rf1',title:'Numerical 1 — Function Check',problem:'R={(1,4),(2,4),(3,5)}. Function? One-one?',opts:['Function, one-one','Function, not one-one','Not a function','N/A'],correct:1,steps:['Each element has one image ✓ function','f(1)=f(2)=4 ✗ not one-one'],answer:'Function, not one-one.'},
  {level:'cbse',concept:'rf2',title:'Numerical 2 — Domain',problem:'Domain of f(x)=√(x²−5x+6).',opts:['(−∞,2]∪[3,∞)','[2,3]','ℝ','(2,3)'],correct:0,steps:['x²−5x+6=(x−2)(x−3)≥0','x≤2 or x≥3'],answer:'(−∞,2]∪[3,∞).'},
  {level:'mains',concept:'rf1',title:'Numerical 3 — Counting',problem:'One-one functions from {1,2,3} to {1,2,3,4,5}.',opts:['60','125','24','20'],correct:0,steps:['5×4×3=60'],answer:'60.'},
  {level:'mains',concept:'rf3',title:'Numerical 4 — Composition',problem:'f(x)=x+2, g(x)=3x−1. Find gof(2).',opts:['11','8','5','14'],correct:0,steps:['f(2)=4','gof(2)=g(4)=12−1=11'],answer:'11.'},
  {level:'mains',concept:'rf2',title:'Numerical 5 — Range',problem:'Range of f(x)=(x−1)/(x+1), domain ℝ−{−1}.',opts:['ℝ−{1}','ℝ','[0,1)','ℝ−{−1}'],correct:0,steps:['Let y=(x−1)/(x+1), solve for x: x=(1+y)/(1−y)','y≠1 — range=ℝ−{1}'],answer:'ℝ−{1}.'},
  {level:'advanced',concept:'rf3',title:'Numerical 6 — Self-Inverse',problem:'Show f(x)=(3x+2)/(5x−3) is its own inverse.',opts:['f⁻¹(x)=f(x) ✓','f⁻¹ does not exist','f⁻¹(x)≠f(x)','f not bijective'],correct:0,steps:['y=(3x+2)/(5x−3) → 5xy−3y=3x+2 → x(5y−3)=3y+2 → x=(3y+2)/(5y−3)=f(y) ✓'],answer:'f is self-inverse.'},
  {level:'advanced',concept:'rf1',title:'Numerical 7 — Bijections',problem:'Bijections from {1,2,3,4} to {a,b,c,d}.',opts:['24','16','12','4'],correct:0,steps:['|A|=|B|=4, bijections=4!=24'],answer:'24.'},
  {level:'advanced',concept:'rf2',title:'Numerical 8 — Combined Domain',problem:'Domain of f(x)=√(1−x)+√(x+3).',opts:['[−3,1]','(−3,1)','[−3,∞)','[1,∞)'],correct:0,steps:['1−x≥0→x≤1; x+3≥0→x≥−3','Combined: [−3,1]'],answer:'[−3,1].'}
];
const QB=[
  {id:'rfqb1',level:'cbse',diff:1,concept:'rf1',text:'f(x)=x+2 maps ℝ→ℝ. One-one?',opts:['Yes','No'],correct:0,exp:{steps:['f(a)=f(b)→a+2=b+2→a=b ✓'],answer:'Yes.'}},
  {id:'rfqb2',level:'cbse',diff:1,concept:'rf2',text:'Domain of f(x)=1/(x+3):',opts:['ℝ−{−3}','ℝ−{3}','x>−3','ℝ'],correct:0,exp:{steps:['x≠−3'],answer:'ℝ−{−3}.'}},
  {id:'rfqb3',level:'cbse',diff:1,concept:'rf3',text:'f(x)=x+5. f⁻¹(9)=?',opts:['4','14','9','5'],correct:0,exp:{steps:['f⁻¹(x)=x−5, f⁻¹(9)=4'],answer:'4.'}},
  {id:'rfqb4',level:'cbse',diff:1,concept:'rf2',text:'Range of f(x)=x²:',opts:['[0,∞)','ℝ','(0,∞)','[1,∞)'],correct:0,exp:{steps:['x²≥0 always'],answer:'[0,∞).'}},
  {id:'rfqb5',level:'cbse',diff:1,concept:'rf1',text:'A={1,2}, B={a,b,c}. Total functions A→B:',opts:['9','6','8','3'],correct:0,exp:{steps:['3²=9'],answer:'9.'}},
  {id:'rfqb6',level:'cbse',diff:1,concept:'rf1',text:'f(x)=2x, g(x)=x−1. gof(3):',opts:['5','7','11','4'],correct:0,exp:{steps:['f(3)=6, g(6)=5'],answer:'5.'}},
  {id:'rfqb7',level:'cbse',diff:1,concept:'rf3',text:'f(x)=eˣ. f⁻¹(x)=?',opts:['ln x','1/eˣ','log₁₀ x','−eˣ'],correct:0,exp:{steps:['Inverse of exponential is natural log'],answer:'ln x.'}},
  {id:'rfqb8',level:'cbse',diff:1,concept:'rf2',text:'Domain of f(x)=√(4−x):',opts:['x≤4','x<4','x≥4','x>4'],correct:0,exp:{steps:['4−x≥0→x≤4'],answer:'(−∞,4].'}},
  {id:'rfqb9',level:'mains',diff:2,concept:'rf1',text:'One-one functions from {1,2} to {1,2,3,4}:',opts:['12','8','16','6'],correct:0,exp:{steps:['4×3=12'],answer:'12.'}},
  {id:'rfqb10',level:'mains',diff:2,concept:'rf2',text:'Domain of f(x)=log(x²−1):',opts:['|x|>1','|x|<1','x>1','x>−1'],correct:0,exp:{steps:['x²−1>0→x²>1→|x|>1'],answer:'|x|>1.'}},
  {id:'rfqb11',level:'mains',diff:2,concept:'rf3',text:'f(x)=2x+3, g(x)=(x−3)/2. fog(x)=?',opts:['x','2x','x+3','x−3'],correct:0,exp:{steps:['fog(x)=2·(x−3)/2+3=x'],answer:'x. (g=f⁻¹)'}},
  {id:'rfqb12',level:'mains',diff:2,concept:'rf2',text:'Range of f(x)=2ˣ:',opts:['(0,∞)','ℝ','[1,∞)','[0,∞)'],correct:0,exp:{steps:['2ˣ>0 always, all positive values achievable'],answer:'(0,∞).'}},
  {id:'rfqb13',level:'mains',diff:2,concept:'rf1',text:'f:ℝ→ℝ, f(x)=3x+5. Bijective?',opts:['Yes','No — not onto','No — not one-one','No'],correct:0,exp:{steps:['Strictly increasing → one-one. For any y: x=(y−5)/3 → onto.'],answer:'Yes.'}},
  {id:'rfqb14',level:'mains',diff:2,concept:'rf3',text:'f(x)=x/(x−1), x≠1. fof(x)=?',opts:['x','1/x','x−1','1/(x−1)'],correct:0,exp:{steps:['fof(x)=f(x/(x−1))=(x/(x−1))/((x/(x−1))−1)=x'],answer:'x.'}},
  {id:'rfqb15',level:'mains',diff:2,concept:'rf2',text:'Domain of cos⁻¹(2x−1):',opts:['[0,1]','[−1,1]','[0,2]','[−1/2,1/2]'],correct:0,exp:{steps:['−1≤2x−1≤1→0≤x≤1'],answer:'[0,1].'}},
  {id:'rfqb16',level:'advanced',diff:3,concept:'rf1',text:'f:ℤ→ℤ, f(n)=2n. Which is true?',opts:['One-one, not onto','Onto, not one-one','Bijective','Neither'],correct:0,exp:{steps:['One-one ✓. Odd numbers unreachable → not onto.'],answer:'One-one, not onto.'}},
  {id:'rfqb17',level:'advanced',diff:3,concept:'rf2',text:'Domain of log₂(log₃(log₄ x)):',opts:['x>64','x>4','x>256','x≥64'],correct:0,exp:{steps:['log₄x>0→x>1; log₃(log₄x)>0→log₄x>1→x>4; need log₃(log₄x) exists and >0→log₄x>1→x>4... final: x>4³=64'],answer:'x>64.'}},
  {id:'rfqb18',level:'advanced',diff:3,concept:'rf3',text:'(fog)⁻¹ equals:',opts:['g⁻¹of⁻¹','f⁻¹og⁻¹','fog','gof'],correct:0,exp:{steps:['Inverse of composition reverses order'],answer:'g⁻¹of⁻¹.'}},
  {id:'rfqb19',level:'advanced',diff:3,concept:'rf1',text:'f:ℝ→ℝ, f(x)=x|x|. Bijective?',opts:['Yes','No'],correct:0,exp:{steps:['Strictly increasing overall → one-one. Range=ℝ → onto.'],answer:'Yes.'}},
  {id:'rfqb20',level:'advanced',diff:3,concept:'rf2',text:'Range of f(x)=x+1/x for x>0:',opts:['[2,∞)','(0,∞)','(2,∞)','[1,∞)'],correct:0,exp:{steps:['AM-GM: x+1/x≥2. Equality at x=1.'],answer:'[2,∞).'}},
  {id:'rfqb21',level:'cbse',diff:1,concept:'rf1',text:'f(x)=|x|. One-one?',opts:['No — |−2|=|2|','Yes'],correct:0,exp:{steps:['f(2)=f(−2)=2'],answer:'No.'}},
  {id:'rfqb22',level:'cbse',diff:1,concept:'rf2',text:'Range of f(x)=sinx:',opts:['[−1,1]','ℝ','[0,1]','(−1,1)'],correct:0,exp:{steps:['sin oscillates between −1 and 1 inclusive'],answer:'[−1,1].'}},
  {id:'rfqb23',level:'mains',diff:2,concept:'rf3',text:'f(x)=4x−3. (fof)(x)=?',opts:['16x−15','4x−7','8x−6','16x+3'],correct:0,exp:{steps:['fof(x)=4(4x−3)−3=16x−15'],answer:'16x−15.'}},
  {id:'rfqb24',level:'mains',diff:2,concept:'rf1',text:'f:ℝ→ℝ, f(x)=x³. Bijective?',opts:['Yes','No — not one-one','No — not onto','No'],correct:0,exp:{steps:['Strictly increasing → one-one. Range=ℝ → onto.'],answer:'Yes.'}},
  {id:'rfqb25',level:'advanced',diff:3,concept:'rf2',text:'Domain of sin⁻¹(log₂ x):',opts:['[1/2,2]','[0,2]','[1,2]','[−1,1]'],correct:0,exp:{steps:['−1≤log₂x≤1→2⁻¹≤x≤2¹→[1/2,2]'],answer:'[1/2,2].'}},
  {id:'rfqb26',level:'advanced',diff:3,concept:'rf3',text:'f(x)=x²+1 (x≥0). f⁻¹(10)=?',opts:['3','√10','10','√9'],correct:0,exp:{steps:['x²+1=10→x²=9→x=3'],answer:'3.'}},
  {id:'rfqb27',level:'cbse',diff:1,concept:'rf1',text:'Constant function f(x)=5. Onto (codomain ℝ)?',opts:['No','Yes'],correct:0,exp:{steps:['Only 5 in range ≠ ℝ'],answer:'No.'}},
  {id:'rfqb28',level:'mains',diff:2,concept:'rf2',text:'Domain of √(x−1)/√(3−x):',opts:['[1,3)','(1,3)','[1,3]','(1,3]'],correct:0,exp:{steps:['x−1≥0→x≥1; 3−x>0→x<3'],answer:'[1,3).'}},
  {id:'rfqb29',level:'advanced',diff:3,concept:'rf1',text:'Number of bijections from {1,2,3} to {4,5,6}:',opts:['6','9','3','27'],correct:0,exp:{steps:['3!=6'],answer:'6.'}},
  {id:'rfqb30',level:'advanced',diff:3,concept:'rf2',text:'Range of f(x)=(x²−1)/(x²+1):',opts:['[−1,1)','(−1,1)','[0,1)','[−1,1]'],correct:0,exp:{steps:['y=(x²−1)/(x²+1)→x²=(1+y)/(1−y)≥0→−1≤y<1'],answer:'[−1,1).'}}
];
registerChapter({
  id:'maths-relations-functions',title:'Relations & Functions',subject:'Maths · Class 11',class:11,
  intro:'Relations and Functions are the language of all JEE Mathematics. Every equation and graph uses functions. Master domain, range, types, composition and inverse.',
  concepts:['rf1','rf2','rf3'],
  conceptMeta:{
    rf1:{title:'Relations & Functions',shortTitle:'R&F Basics',tag:'Concept 1 of 3',icon:'🔗',sub:'What makes a valid function? Count functions, identify types.'},
    rf2:{title:'Domain & Range',shortTitle:'Domain & Range',tag:'Concept 2 of 3',icon:'📏',sub:'Three rules that restrict domain. Range-finding strategies.'},
    rf3:{title:'Composition & Inverse',shortTitle:'Composition',tag:'Concept 3 of 3',icon:'🔄',sub:'fog vs gof — they differ. Inverse exists only for bijections.'},
  },
  teach:{rf1:(f)=>teachRF1(f),rf2:(f)=>teachRF2(f),rf3:(f)=>teachRF3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
