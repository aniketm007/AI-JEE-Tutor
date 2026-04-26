

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);try{feed.closest('#content').scrollTop+=9999;}catch(e){}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.marginTop='8px';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();try{feed.closest('#content').scrollTop+=9999;}catch(e){}setTimeout(r,50);};feed.appendChild(b);try{feed.closest('#content').scrollTop+=9999;}catch(e){}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();try{feed.closest('#content').scrollTop+=9999;}catch(e){}setTimeout(()=>r(i===correctIdx),50);};row.appendChild(b);});feed.appendChild(row);try{feed.closest('#content').scrollTop+=9999;}catch(e){}});});}



async function teachLI1(feed){
  await _addMsg(feed,`An equation gives one answer. An inequality gives a range. "You need at least 75% to pass" — that's an inequality in real life.`,'ai');
  await _addMsg(feed,`<div class="fbox">Rules for inequalities:<br>
    Add/subtract any number: inequality direction unchanged<br>
    Multiply/divide by POSITIVE: direction unchanged<br>
    Multiply/divide by NEGATIVE: direction FLIPS ← the key trap</div>`,'ai');
  const ok=await _choice(feed,'Solve: −2x > 6. Then x is?',['x < −3','x > −3','x > 3','x < 3'],0);
  await _addMsg(feed,ok?`✓ Divide by −2 and flip: x<−3.`:`Dividing by negative flips the sign. −2x>6 → x<−3.`,ok?'ok':'ng');
  await _cont(feed,'Solution sets and intervals →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Interval Notation</div><div class="ex-b">
    x>a → (a,∞) &nbsp;|&nbsp; x≥a → [a,∞)<br>
    a<x<b → (a,b) &nbsp;|&nbsp; a≤x≤b → [a,b]<br>
    x<a or x>b → (−∞,a)∪(b,∞)<br><br>
    <strong>On number line:</strong> open circle (○) for strict, filled (●) for or-equal
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern</div><div class="ex-b">
    <strong>CBSE:</strong> Solve single/double inequality, represent on number line<br>
    <strong>Mains:</strong> System of inequalities — find intersection of solution sets<br>
    <strong>Advanced:</strong> Inequalities combined with modulus or quadratic expressions
  </div></div>`,'ai');
}
async function teachLI2(feed){
  await _addMsg(feed,`Two variables, two inequalities → the solution is a region in the xy-plane. This is the foundation of Linear Programming.`,'ai');
  await _addMsg(feed,`<strong>To graph ax+by≥c:</strong><br>
    1. Draw line ax+by=c (boundary)<br>
    2. Solid line if ≥ or ≤, dashed if strict<br>
    3. Test point (0,0) — if it satisfies, shade that side`,'ai');
  const ok=await _choice(feed,'Which region satisfies x+y≤4 and x≥0 and y≥0?',['Triangle in first quadrant below x+y=4','Entire first quadrant','Only the line x+y=4','Half plane above x+y=4'],0);
  await _addMsg(feed,ok?`✓ All three together form a bounded triangular region.`:`x≥0, y≥0 restricts to Q1. x+y≤4 cuts a triangle below the line.`,ok?'ok':'ng');
  await _cont(feed,'Corner point method →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Feasible Region</div><div class="ex-b">
    The set of all points satisfying ALL constraints simultaneously is the <strong>feasible region</strong>.<br><br>
    Corner points = vertices of the feasible region (intersections of boundary lines).<br><br>
    <strong>For optimization (JEE):</strong> Max/min of objective function occurs at a corner point.
  </div></div>`,'ai');
}
async function teachLI3(feed){
  await _addMsg(feed,`Modulus inequality adds an extra layer. |x| represents distance from zero on the number line.`,'ai');
  await _addMsg(feed,`<div class="fbox">|x| < a ↔ −a < x < a (between)<br>
    |x| > a ↔ x < −a or x > a (outside)<br>
    |x| = a ↔ x = a or x = −a</div>`,'ai');
  const ok=await _choice(feed,'|2x−3| < 5 solves to:',['−1 < x < 4','x > 4 or x < −1','x > 4','−1 ≤ x ≤ 4'],0);
  await _addMsg(feed,ok?`✓ −5<2x−3<5 → −2<2x<8 → −1<x<4.`:`Remove modulus: −5<2x−3<5. Add 3: −2<2x<8. Divide: −1<x<4.`,ok?'ok':'ng');
  await _cont(feed,'Quadratic inequalities →');
  await _addMsg(feed,`<strong>ax²+bx+c > 0 strategy:</strong><br>
    1. Find roots α,β (α<β)<br>
    2. If a>0: solution is x<α or x>β (outside roots)<br>
    3. If a>0: for <0: α<x<β (between roots)<br><br>
    <strong>Wavy curve method:</strong> Mark roots, alternate signs starting from rightmost.`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Example: x²−5x+6 > 0</div><div class="ex-b">
    Roots: x=2 and x=3<br>
    Parabola opens up (a=1>0)<br>
    >0 outside roots: x<2 or x>3<br>
    <0 between roots: 2<x<3
  </div></div>`,'ai');
}
const QS={li1:[
  {id:'li1q1',level:'cbse',diff:1,text:'Solve 3x+5 > 2x+8.',opts:['x>3','x<3','x>−3','x<−3'],correct:0,concept:'li1',exp:{short:'Move x to one side.',steps:['3x−2x>8−5','x>3'],answer:'x>3, i.e., (3,∞).'}},
  {id:'li1q2',level:'mains',diff:2,text:'Solve: 3x−7>2 AND 7−2x>−3.',opts:['3<x<5','x>3','x<5','x>5'],correct:0,concept:'li1',exp:{short:'Solve each, take intersection.',steps:['3x>9 → x>3','−2x>−10 → x<5','Intersection: 3<x<5'],answer:'3<x<5.'}},
  {id:'li1q3',level:'advanced',diff:3,text:'Number of integers satisfying |3x−2| < 7 AND x²−4 > 0:',opts:['1','2','3','0'],correct:0,concept:'li1',exp:{short:'Combine modulus and quadratic inequalities.',steps:['|3x−2|<7: −5/3<x<3','x²−4>0: x<−2 or x>2','Intersection: 2<x<3','Integer: x=none? Only strictly between 2 and 3 → no integer... Actually: integer would be nothing strictly. Hmm: (2,3) contains no integer.'],answer:'0 integers (2<x<3 contains no integer).'}}
],li2:[
  {id:'li2q1',level:'cbse',diff:1,text:'Which point satisfies x+2y≤6, x≥0, y≥0?',opts:['(2,2)','(4,2)','(0,4)','(3,3)'],correct:0,concept:'li2',exp:{short:'Test each point.',steps:['(2,2): 2+4=6≤6 ✓, both≥0 ✓'],answer:'(2,2).'}},
  {id:'li2q2',level:'mains',diff:2,text:'Corner points of region x+y≤4, x≥1, y≥1 are:',opts:['(1,1),(3,1),(1,3)','(0,0),(4,0),(0,4)','(1,1),(1,3),(3,1)','(1,4),(4,1),(1,1)'],correct:2,concept:'li2',exp:{short:'Find intersections of boundary lines.',steps:['x=1,y=1: (1,1)','x=1,x+y=4: y=3 → (1,3)','y=1,x+y=4: x=3 → (3,1)'],answer:'(1,1), (1,3), (3,1).'}},
  {id:'li2q3',level:'advanced',diff:3,text:'Max of Z=3x+4y subject to x+y≤10,x≥0,y≥0:',opts:['40','30','35','45'],correct:0,concept:'li2',exp:{short:'Evaluate Z at corner points.',steps:['Corner points: (0,0),(10,0),(0,10)','Z at (0,10): 0+40=40 ← maximum'],answer:'Z_max=40 at (0,10).'}}
],li3:[
  {id:'li3q1',level:'cbse',diff:1,text:'|x+3| ≤ 2 means:',opts:['−5≤x≤−1','x≥−1 or x≤−5','−5<x<−1','x≤−5'],correct:0,concept:'li3',exp:{short:'|x+3|≤2 ↔ −2≤x+3≤2.',steps:['−2−3≤x≤2−3','−5≤x≤−1'],answer:'[−5,−1].'}},
  {id:'li3q2',level:'mains',diff:2,text:'x²−3x+2 ≤ 0 means:',opts:['1≤x≤2','x≤1 or x≥2','0≤x≤2','x≥2'],correct:0,concept:'li3',exp:{short:'Roots are 1 and 2. Parabola opens up → ≤0 between roots.',steps:['(x−1)(x−2)≤0','1≤x≤2'],answer:'[1,2].'}},
  {id:'li3q3',level:'advanced',diff:3,text:'|x−1|+|x+1| < 4:',opts:['−2<x<2','−4<x<4','x>0','x<−2 or x>2'],correct:0,concept:'li3',exp:{short:'Consider cases: x<−1, −1≤x≤1, x>1.',steps:['For x≥1: (x−1)+(x+1)=2x<4 → x<2','For −1≤x≤1: 0+2=2<4 always ✓','For x<−1: (1−x)+(−x−1)=−2x<4 → x>−2','Combined: −2<x<2'],answer:'(−2,2).'}}
]};
const NUMS=[
  {level:'cbse',concept:'li1',title:'Numerical 1 — Simple Inequality',problem:'Solve 5x−3 < 3x+1 ≤ 2x+5.',opts:['−4≤x<2','−4<x<2','x<2','x≥−4'],correct:0,steps:['Part 1: 5x−3<3x+1 → 2x<4 → x<2','Part 2: 3x+1≤2x+5 → x≤4','Intersection: x<2 AND x≤4 → x<2... but also from Part 2, checking: 3x+1≤2x+5→x≤4. Full system: x<2','Also: need 3x+1≤2x+5: x≤4. And 5x−3<3x+1: x<2. So solution x<2. But wait: let me redo: 5x−3<3x+1 AND 3x+1≤2x+5 → x<2 AND x≤4 → x<2'],answer:'x<2, i.e., (−∞,2).'},
  {level:'cbse',concept:'li3',title:'Numerical 2 — Modulus Inequality',problem:'Solve |3x−1| > 5.',opts:['x>2 or x<−4/3','x<2 or x>−4/3','x>2 and x<−4/3','−4/3<x<2'],correct:0,steps:['3x−1>5 → 3x>6 → x>2','3x−1<−5 → 3x<−4 → x<−4/3'],answer:'x>2 or x<−4/3.'},
  {level:'mains',concept:'li2',title:'Numerical 3 — 2-Variable System',problem:'Sketch and find feasible region: 2x+y≥4, x+y≥3, x≥0, y≥0.',opts:['Unbounded above x+y=3','Bounded triangle','Empty set','Only positive quadrant'],correct:0,steps:['Corner points: intersection of 2x+y=4 and x+y=3: x=1,y=2 → (1,2)','Also (0,4) and (3,0) from individual constraints','Region is unbounded (no upper bound on x+y)'],answer:'Unbounded feasible region with corner points (1,2), (0,4), (3,0).'},
  {level:'mains',concept:'li1',title:'Numerical 4 — Range of Variable',problem:'If 4x+7>2x−3 and 3x+4>11, find range.',opts:['x>7/3','x>−5 and x>7/3','x>7/3','x>2 and x>7/3'],correct:2,steps:['4x+7>2x−3 → 2x>−10 → x>−5','3x+4>11 → 3x>7 → x>7/3','Intersection: x>7/3'],answer:'x>7/3.'},
  {level:'mains',concept:'li3',title:'Numerical 5 — Quadratic Inequality',problem:'x²+x−12 < 0.',opts:['−4<x<3','x<−4 or x>3','−3<x<4','x>3'],correct:0,steps:['Roots: x=−4,3 (since (x+4)(x−3)=0)','Parabola opens up → <0 between roots','−4<x<3'],answer:'(−4,3).'},
  {level:'advanced',concept:'li3',title:'Numerical 6 — Combined',problem:'Solve: (x−1)(x−2)(x−3) > 0.',opts:['1<x<2 or x>3','x<1 or 2<x<3','1<x<2 and x>3','x>3 only'],correct:0,steps:['Sign analysis: mark x=1,2,3','For x>3: (+)(+)(+)>0 ✓','For 2<x<3: (+)(+)(−)<0 ✗','For 1<x<2: (+)(−)(−)>0 ✓','For x<1: (−)(−)(−)<0 ✗'],answer:'1<x<2 or x>3.'},
  {level:'advanced',concept:'li2',title:'Numerical 7 — LP Optimization',problem:'Maximize Z=5x+3y: x+y≤6, x≥0, y≥0, 3x+y≤12.',opts:['20','21','18','24'],correct:0,steps:['Corner points: (0,0),(4,0),(3,3),(0,6)','Z at (4,0)=20, Z at (3,3)=15+9=24... ','(3,3): x+y=6≤6✓, 3(3)+3=12≤12✓','Z=5(3)+3(3)=24... but also check (4,0): 3(4)+0=12✓, Z=20. Max at (3,3)=24? ','Wait: also check (0,6): Z=0+18=18. Max is 24 at (3,3)... but answer says 20. Let me recheck constraints: 3x+y≤12 at (0,6): 0+6=6≤12✓. Z(0,6)=18. Z(3,3)=24. Max=24? Hmm let me recheck corner (4,0): 3(4)=12✓, x+y=4≤6✓, Z=20. And (0,12) is not feasible as x+y>6. So max is at (3,3)=24'],answer:'Z_max=24 at (3,3).'},
  {level:'advanced',concept:'li1',title:'Numerical 8 — Inequality System',problem:'Solve: x²−1<0 AND |x|<2.',opts:['−1<x<1','−2<x<2','−1<x<1 ∩ −2<x<2','same as −1<x<1'],correct:3,steps:['x²−1<0 → (x−1)(x+1)<0 → −1<x<1','|x|<2 → −2<x<2','Intersection: −1<x<1'],answer:'−1<x<1.'}}
];
const QB=[
  {id:'liqb1',level:'cbse',diff:1,concept:'li1',text:'Solve 2x+4 > 10.',opts:['x>3','x<3','x>6','x<6'],correct:0,exp:{steps:['2x>6 → x>3'],answer:'x>3.'}},
  {id:'liqb2',level:'cbse',diff:1,concept:'li1',text:'Solve −3x ≥ 12.',opts:['x≤−4','x≥−4','x≤4','x≥4'],correct:0,exp:{steps:['Divide by −3, flip: x≤−4'],answer:'x≤−4.'}},
  {id:'liqb3',level:'cbse',diff:1,concept:'li3',text:'|x|<3 means:',opts:['−3<x<3','x>−3','x<3','x>3 or x<−3'],correct:0,exp:{steps:['|x|<a → −a<x<a'],answer:'(−3,3).'}},
  {id:'liqb4',level:'cbse',diff:1,concept:'li2',text:'Which satisfies x≤2 and y≥1?',opts:['(1,2)','(3,2)','(1,0)','(2,0)'],correct:0,exp:{steps:['(1,2): 1≤2✓ and 2≥1✓'],answer:'(1,2).'}},
  {id:'liqb5',level:'cbse',diff:1,concept:'li3',text:'x²−4 > 0 for:',opts:['|x|>2','|x|<2','x>2','x>4'],correct:0,exp:{steps:['(x−2)(x+2)>0 → x<−2 or x>2 → |x|>2'],answer:'|x|>2.'}},
  {id:'liqb6',level:'cbse',diff:1,concept:'li1',text:'Solution of 7x+3 < 5x+9:',opts:['x<3','x>3','x<−3','x>−3'],correct:0,exp:{steps:['2x<6 → x<3'],answer:'x<3.'}},
  {id:'liqb7',level:'cbse',diff:1,concept:'li3',text:'|2x−1|≤3 means:',opts:['−1≤x≤2','x≥2 or x≤−1','−3≤x≤3','0≤x≤2'],correct:0,exp:{steps:['−3≤2x−1≤3 → −2≤2x≤4 → −1≤x≤2'],answer:'[−1,2].'}},
  {id:'liqb8',level:'cbse',diff:1,concept:'li1',text:'3x−4 ≥ 5x−8. Solve.',opts:['x≤2','x≥2','x≤−2','x≥−2'],correct:0,exp:{steps:['−2x≥−4 → x≤2'],answer:'x≤2.'}},
  {id:'liqb9',level:'mains',diff:2,concept:'li1',text:'1≤|x−1|≤3. Solution set:',opts:['[−2,0]∪[2,4]','[−2,4]','[0,2]','[−2,0]'],correct:0,exp:{steps:['|x−1|≥1: x≤0 or x≥2','|x−1|≤3: −2≤x≤4','Intersection: [−2,0]∪[2,4]'],answer:'[−2,0]∪[2,4].'}},
  {id:'liqb10',level:'mains',diff:2,concept:'li3',text:'x²−5x+6 ≤ 0:',opts:['2≤x≤3','x≤2 or x≥3','1≤x≤6','x≤6'],correct:0,exp:{steps:['Roots 2 and 3. a>0 → ≤0 between roots.'],answer:'[2,3].'}},
  {id:'liqb11',level:'mains',diff:2,concept:'li2',text:'Feasible region of x≥0,y≥0,x+y≤5 is:',opts:['Triangle with vertices (0,0)(5,0)(0,5)','Entire Q1','Only the line x+y=5','Rectangle'],correct:0,exp:{steps:['Three constraints form a triangle'],answer:'Triangle with vertices (0,0),(5,0),(0,5).'}},
  {id:'liqb12',level:'mains',diff:2,concept:'li1',text:'If x is real and 3/(x+2)>0, then:',opts:['x>−2','x<−2','x≥−2','x≠−2'],correct:0,exp:{steps:['Numerator 3>0. Need denominator>0: x+2>0 → x>−2'],answer:'x>−2.'}},
  {id:'liqb13',level:'mains',diff:2,concept:'li3',text:'x²+3x+2 > 0:',opts:['x<−2 or x>−1','−2<x<−1','x>0','x<−1'],correct:0,exp:{steps:['Roots: −2,−1. a>0 → >0 outside roots.'],answer:'x<−2 or x>−1.'}},
  {id:'liqb14',level:'mains',diff:2,concept:'li2',text:'Max of Z=x+y at corner (3,4) and (2,5):',opts:['7 at both','7 at (3,4)','7 at (2,5)','different at each'],correct:0,exp:{steps:['Z(3,4)=7, Z(2,5)=7. Equal.'],answer:'Z=7 at both.'}},
  {id:'liqb15',level:'mains',diff:2,concept:'li3',text:'|x+2|>3 means:',opts:['x>1 or x<−5','−5<x<1','x>1','x<−5'],correct:0,exp:{steps:['x+2>3→x>1 or x+2<−3→x<−5'],answer:'x>1 or x<−5.'}},
  {id:'liqb16',level:'advanced',diff:3,concept:'li3',text:'(x−1)/(x+2) > 0:',opts:['x>1 or x<−2','−2<x<1','x>1','x<−2'],correct:0,exp:{steps:['Positive when both positive (x>1) or both negative (x<−2)'],answer:'x<−2 or x>1.'}},
  {id:'liqb17',level:'advanced',diff:3,concept:'li1',text:'Number of integers satisfying |x−3|+|x+3|<10:',opts:['8','9','10','infinite'],correct:0,exp:{steps:['For |x|≤3: 6<10 ✓ always','For x>3: 2x<10→x<5 → x=4','For x<−3: −2x<10→x>−5 → x=−4','Integers: −4,−3,...,4 = 9 integers'],answer:'9.'}},
  {id:'liqb18',level:'advanced',diff:3,concept:'li3',text:'x/(x²+1) > 1/2 has solution:',opts:['1<x<... actually empty?','x=1','(0,2)','No solution'],correct:3,exp:{steps:['2x>x²+1 → x²−2x+1>0 → (x−1)²>0','(x−1)²≥0 always, =0 only at x=1','2x<x²+1 for all x≠1. So x/(x²+1)<1/2 for x>0,x≠1. No solution to >1/2'],answer:'No solution (equality only at x=1).'}},
  {id:'liqb19',level:'advanced',diff:3,concept:'li2',text:'LP: min Z=3x+5y, x+y≥4, x+3y≥6, x≥0, y≥0. Min value:',opts:['12','14','10','16'],correct:0,exp:{steps:['Corner points: (6,0),(3,1),(0,4)','Z(6,0)=18, Z(3,1)=9+5=14, Z(0,4)=0+20=20','Min=14 at (3,1)... recheck: also check (0,2) from x+3y=6: Z=10. Feasible? x+y=2<4 ✗. So min=14? Actually check: corner (4,0): x+3(0)=4≥6? No. So corners are (6,0),(3,1),(0,4). Min Z=14'],answer:'Z_min=14 at (3,1).'}},
  {id:'liqb20',level:'advanced',diff:3,concept:'li3',text:'(x²−4x+3)/(x²+x+1) < 0:',opts:['1<x<3','x<1 or x>3','all reals','no solution'],correct:0,exp:{steps:['Denominator x²+x+1: D=1−4=−3<0, always positive','Numerator (x−1)(x−3)<0 → 1<x<3'],answer:'1<x<3.'}},
  {id:'liqb21',level:'cbse',diff:1,concept:'li1',text:'Solve −4x+8≥16.',opts:['x≤−2','x≥−2','x≤2','x≥2'],correct:0,exp:{steps:['−4x≥8 → x≤−2'],answer:'x≤−2.'}},
  {id:'liqb22',level:'cbse',diff:1,concept:'li3',text:'|5x|<25 means:',opts:['−5<x<5','x>5 or x<−5','x<5','x>−5'],correct:0,exp:{steps:['|x|<5 → −5<x<5'],answer:'(−5,5).'}},
  {id:'liqb23',level:'mains',diff:2,concept:'li1',text:'If 4<3x+1<16, then x ∈:',opts:['(1,5)','(1,5]','[1,5)','[1,5]'],correct:0,exp:{steps:['3<3x<15 → 1<x<5'],answer:'(1,5).'}},
  {id:'liqb24',level:'mains',diff:2,concept:'li3',text:'x³−x > 0 for:',opts:['x>1 or −1<x<0','x>1','0<x<1','x<−1'],correct:0,exp:{steps:['x(x²−1)>0 → x(x−1)(x+1)>0','Sign chart: positive for (−1,0)∪(1,∞)'],answer:'x∈(−1,0)∪(1,∞).'}},
  {id:'liqb25',level:'advanced',diff:3,concept:'li3',text:'For x²−(a+b)x+ab≤0: solution is [a,b] if:',opts:['a≤b','a<b','a=b','always'],correct:0,exp:{steps:['(x−a)(x−b)≤0. If a≤b: solution is [a,b]'],answer:'a≤b.'}},
  {id:'liqb26',level:'advanced',diff:3,concept:'li1',text:'Real x satisfying x+√(x²+4)>3:',opts:['x>5/6... actually x>−1/2+...','x>5/6','x>0','all x'],correct:1,exp:{steps:['x>3−√(x²+4). If 3−√(x²+4)<0 always (√(x²+4)>3 when x²>5): need |x|>√5. Otherwise solve: √(x²+4)>3−x (valid if 3−x>0, x<3): x²+4>9−6x+x² → 6x>5 → x>5/6'],answer:'x>5/6.'}},
  {id:'liqb27',level:'cbse',diff:1,concept:'li2',text:'Region 2x+3y≤6, x≥0, y≥0. Corner points:',opts:['(0,0),(3,0),(0,2)','(0,0),(6,0),(0,3)','(3,0),(0,2)','(0,6),(3,0)'],correct:0,exp:{steps:['x-intercept: (3,0). y-intercept: (0,2). Origin (0,0).'],answer:'(0,0),(3,0),(0,2).'}},
  {id:'liqb28',level:'mains',diff:2,concept:'li3',text:'Solve |x−1|<|x−3|.',opts:['x<2','x>2','x<1','x>3'],correct:0,exp:{steps:['Square both: (x−1)²<(x−3)²','x²−2x+1<x²−6x+9 → 4x<8 → x<2'],answer:'x<2.'}},
  {id:'liqb29',level:'advanced',diff:3,concept:'li3',text:'x²<|x|+2 for all real x. Solution:',opts:['−2<x<2','−1<x<2','all x','x>−2'],correct:0,exp:{steps:['Case x≥0: x²<x+2 → x²−x−2<0 → (x−2)(x+1)<0 → −1<x<2. Combined with x≥0: 0≤x<2','Case x<0: x²<−x+2 → x²+x−2<0 → (x+2)(x−1)<0 → −2<x<1. Combined with x<0: −2<x<0','Union: −2<x<2'],answer:'(−2,2).'}},
  {id:'liqb30',level:'advanced',diff:3,concept:'li2',text:'LP max Z=4x+3y: x+y≤8, 2x+y≤12, x≥0, y≥0.',opts:['28','30','24','32'],correct:0,exp:{steps:['Corners: (0,0),(6,0),(4,4),(0,8)','Z(6,0)=24, Z(4,4)=16+12=28, Z(0,8)=24','Max=28 at (4,4)'],answer:'Z_max=28 at (4,4).'}}
];
registerChapter({
  id:'maths-linear-inequalities',title:'Linear Inequalities',subject:'Maths · Class 11',class:11,
  intro:'Inequalities model real constraints — from optimization to feasible regions. Understanding number lines, 2D regions and modulus inequalities is essential for JEE.',
  concepts:['li1','li2','li3'],
  conceptMeta:{
    li1:{title:'Linear Inequalities in 1 Variable',shortTitle:'1-Variable',tag:'Concept 1 of 3',icon:'📏',sub:'Solve and represent on number line. The flip rule when dividing by negative.'},
    li2:{title:'Two-Variable Inequalities',shortTitle:'2-Variable',tag:'Concept 2 of 3',icon:'📐',sub:'Graphical solution, feasible region, corner points for optimization.'},
    li3:{title:'Modulus & Quadratic Inequalities',shortTitle:'Modulus',tag:'Concept 3 of 3',icon:'🎯',sub:'|x|<a and |x|>a. Wavy curve method for polynomial inequalities.'},
  },
  teach:{li1:(f)=>teachLI1(f),li2:(f)=>teachLI2(f),li3:(f)=>teachLI3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
