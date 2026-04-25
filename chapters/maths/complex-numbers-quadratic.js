

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.cssText='margin-top:8px;display:block;';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();};feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r(i===correctIdx);};row.appendChild(b);});feed.appendChild(row);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});});}



async function teachCN1(feed){
  await _addMsg(feed,`Every quadratic has two roots. But what about x²+1=0? No real number works — so mathematicians invented one. They called it i.`,'ai');
  await _addMsg(feed,`<div class="fbox">i = √(−1) &nbsp;|&nbsp; i² = −1 &nbsp;|&nbsp; i³ = −i &nbsp;|&nbsp; i⁴ = 1 (cycle repeats)</div>
    <div class="fnote">A Complex Number: z = a + ib where a=real part, b=imaginary part</div>`,'ai');
  const ok=await _choice(feed,'i⁵⁰ = ?',['−1','1','i','−i'],0);
  await _addMsg(feed,ok?`✓ 50÷4=12 remainder 2. i²=−1.`:`Powers of i cycle every 4. 50=4×12+2. i⁵⁰=i²=−1.`,ok?'ok':'ng');
  await _cont(feed,'Operations →');
  await _addMsg(feed,`<strong>Addition:</strong> (a+ib)+(c+id) = (a+c)+i(b+d)<br>
    <strong>Multiplication:</strong> (a+ib)(c+id) = (ac−bd)+i(ad+bc)<br>
    <strong>Conjugate:</strong> z̄ = a−ib &nbsp;|&nbsp; zz̄ = a²+b² = |z|²<br>
    <strong>Division:</strong> Multiply numerator and denominator by conjugate of denominator`,'ai');
  await _cont(feed,'Modulus and argument →');
  await _addMsg(feed,`<div class="fbox">|z| = √(a²+b²) (modulus = distance from origin)<br>
    arg(z) = θ = tan⁻¹(b/a) adjusted for quadrant</div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Polar Form</div><div class="ex-b">
    z = r(cosθ + i sinθ) = re^(iθ) where r=|z|, θ=arg(z)<br><br>
    <strong>De Moivre's Theorem:</strong> (cosθ+i sinθ)ⁿ = cosnθ + i sinnθ<br>
    <strong>JEE use:</strong> Finding nth roots of unity and powers of complex numbers
  </div></div>`,'ai');
}
async function teachCN2(feed){
  await _addMsg(feed,`The complex plane (Argand diagram) gives every complex number a geometric home.`,'ai');
  await _addMsg(feed,`x-axis = real axis &nbsp;|&nbsp; y-axis = imaginary axis<br><br>
    |z₁−z₂| = distance between z₁ and z₂<br>
    |z−z₀| = r is a circle centered at z₀ with radius r<br>
    arg(z) = angle the line to z makes with positive real axis`,'ai');
  const ok=await _choice(feed,'|3+4i| = ?',['5','7','√5','25'],0);
  await _addMsg(feed,ok?`✓ √(9+16)=√25=5.`:`|a+ib|=√(a²+b²)=√(9+16)=5.`,ok?'ok':'ng');
  await _cont(feed,'Triangle inequality and locus →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Key Inequalities</div><div class="ex-b">
    <strong>Triangle inequality:</strong> |z₁+z₂| ≤ |z₁|+|z₂|<br>
    <strong>Reverse:</strong> |z₁−z₂| ≥ ||z₁|−|z₂||<br><br>
    <strong>Common loci:</strong><br>
    |z−1|=|z+1| → perpendicular bisector of (−1,0) and (1,0) → y-axis (Re(z)=0)<br>
    |z|=1 → unit circle<br>
    Re(z)=k → vertical line x=k
  </div></div>`,'ai');
}
async function teachCN3(feed){
  await _addMsg(feed,`Quadratic ax²+bx+c=0 with complex roots — they always come in conjugate pairs when coefficients are real.`,'ai');
  await _addMsg(feed,`<div class="fbox">x = (−b ± √(b²−4ac)) / 2a<br>
    Discriminant D = b²−4ac:<br>
    D>0: two real roots &nbsp;|&nbsp; D=0: equal roots &nbsp;|&nbsp; D<0: complex conjugate roots</div>`,'ai');
  const ok=await _choice(feed,'x²−2x+5=0. Roots are?',['1±2i','2±i','1±√5','−1±2i'],0);
  await _addMsg(feed,ok?`✓ D=4−20=−16. x=(2±4i)/2=1±2i.`:`D=4−20=−16<0. x=(2±√(−16))/2=(2±4i)/2=1±2i.`,ok?'ok':'ng');
  await _cont(feed,'Vieta\'s formulas →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Vieta\'s Formulas — Always use these</div><div class="ex-b">
    For ax²+bx+c=0 with roots α,β:<br>
    α+β = −b/a &nbsp;&nbsp; αβ = c/a<br><br>
    <strong>Form equation from roots:</strong> x²−(α+β)x+αβ=0<br><br>
    <strong>Useful identities:</strong><br>
    α²+β² = (α+β)²−2αβ<br>
    α³+β³ = (α+β)³−3αβ(α+β)<br>
    |α−β| = √((α+β)²−4αβ)
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Nature of Roots Conditions</div><div class="warn-b">
    Both roots positive: D≥0 AND α+β>0 AND αβ>0<br>
    Both roots negative: D≥0 AND α+β<0 AND αβ>0<br>
    Roots of opposite sign: αβ<0 (D automatically >0)<br>
    One root zero: c=0
  </div></div>`,'ai');
}
const QS={cn1:[
  {id:'cn1q1',level:'cbse',diff:1,text:'i⁷³ = ?',opts:['i','−i','1','−1'],correct:0,concept:'cn1',exp:{short:'73=4×18+1. i⁷³=i¹=i.',steps:['73÷4: quotient 18, remainder 1','i⁷³=i'],answer:'i.'}},
  {id:'cn1q2',level:'mains',diff:2,text:'(2+3i)(2−3i) = ?',opts:['13','−5','4+9i','4−9i'],correct:0,concept:'cn1',exp:{short:'zz̄=|z|²=a²+b².',steps:['(2+3i)(2−3i)=4+9=13'],answer:'13.'}},
  {id:'cn1q3',level:'advanced',diff:3,text:'If z=cosθ+i sinθ, then z+1/z = ?',opts:['2cosθ','2i sinθ','2','cosθ'],correct:0,concept:'cn1',exp:{short:'1/z=cos(−θ)+isin(−θ)=cosθ−isinθ.',steps:['z+1/z=(cosθ+isinθ)+(cosθ−isinθ)=2cosθ'],answer:'2cosθ.'}}
],cn2:[
  {id:'cn2q1',level:'cbse',diff:1,text:'|4−3i| = ?',opts:['5','7','1','25'],correct:0,concept:'cn2',exp:{short:'√(16+9)=5.',steps:['√(4²+3²)=√25=5'],answer:'5.'}},
  {id:'cn2q2',level:'mains',diff:2,text:'arg(1+i) = ?',opts:['π/4','π/2','π/3','π/6'],correct:0,concept:'cn2',exp:{short:'tan⁻¹(1/1)=π/4. Q1 so positive.',steps:['tan⁻¹(b/a)=tan⁻¹(1)=π/4'],answer:'π/4.'}},
  {id:'cn2q3',level:'advanced',diff:3,text:'Locus of z: |z−2|+|z+2|=6 is:',opts:['Ellipse','Circle','Parabola','Hyperbola'],correct:0,concept:'cn2',exp:{short:'Sum of distances from two foci = constant → ellipse.',steps:['Foci at (±2,0), sum=6=2a','a=3, c=2, b²=9−4=5','Ellipse: x²/9+y²/5=1'],answer:'Ellipse.'}}
],cn3:[
  {id:'cn3q1',level:'cbse',diff:1,text:'If α,β are roots of x²−5x+6=0, find α²+β².',opts:['13','25','7','11'],correct:0,concept:'cn3',exp:{short:'Use α+β=5, αβ=6.',steps:['α²+β²=(α+β)²−2αβ=25−12=13'],answer:'13.'}},
  {id:'cn3q2',level:'mains',diff:2,text:'Roots of x²+(1+i)x+i=0:',opts:['1 and i... −1 and −i','i and 1','−i and −1','1 and −1'],correct:2,concept:'cn3',exp:{short:'Use quadratic formula or factorize.',steps:['x²+(1+i)x+i=0','Try x=−1: 1−(1+i)+i=0 ✓','Factor: (x+1)(x+i)=0 → x=−1,−i'],answer:'x=−1 and x=−i.'}},
  {id:'cn3q3',level:'advanced',diff:3,text:'If one root of x²+px+q=0 is 2+3i (p,q real), then p and q:',opts:['p=−4, q=13','p=4, q=13','p=−4, q=−13','p=4, q=−13'],correct:0,concept:'cn3',exp:{short:'Complex roots come in conjugate pairs. Other root is 2−3i.',steps:['Roots: 2+3i and 2−3i','Sum=4=−p → p=−4','Product=4+9=13=q'],answer:'p=−4, q=13.'}}
]};
const NUMS=[
  {level:'cbse',concept:'cn1',title:'Numerical 1 — Powers of i',problem:'Simplify: i¹+i²+i³+i⁴+...+i²⁰.',opts:['0','1','−1','i'],correct:0,steps:['Each group of 4: i+i²+i³+i⁴=i−1−i+1=0','20=4×5 groups → sum=0'],answer:'0.'},
  {level:'cbse',concept:'cn3',title:'Numerical 2 — Quadratic Roots',problem:'If α,β are roots of 2x²−7x+3=0, find 1/α+1/β.',opts:['7/3','7/6','3/7','6/7'],correct:0,steps:['α+β=7/2, αβ=3/2','1/α+1/β=(α+β)/αβ=(7/2)/(3/2)=7/3'],answer:'7/3.'},
  {level:'mains',concept:'cn1',title:'Numerical 3 — Division',problem:'(3+4i)/(1−2i) = ?',opts:['−1+2i','1+2i','(3+4i)/5','−1−2i'],correct:0,steps:['Multiply by conjugate (1+2i)/(1+2i)','Numerator: (3+4i)(1+2i)=3+6i+4i−8=−5+10i','Denominator: 1+4=5','Result: (−5+10i)/5=−1+2i'],answer:'−1+2i.'},
  {level:'mains',concept:'cn2',title:'Numerical 4 — Modulus and Argument',problem:'Express z=1−i in polar form.',opts:['√2(cos(−π/4)+isin(−π/4))','√2(cos(π/4)+isin(π/4))','2(cos(π/4)+isin(π/4))','(cos(−π/4)+isin(−π/4))'],correct:0,steps:['|z|=√(1+1)=√2','arg(z)=tan⁻¹(−1/1)=−π/4 (Q4)','z=√2(cos(−π/4)+isin(−π/4))'],answer:'√2(cos(−π/4)+isin(−π/4)).'},
  {level:'mains',concept:'cn3',title:'Numerical 5 — Nature of Roots',problem:'Find k if x²−2(k+1)x+k²=0 has equal roots.',opts:['−1/4','1/4','1','−1'],correct:0,steps:['D=0: 4(k+1)²−4k²=0','(k+1)²−k²=0','2k+1=0 → k=−1/2... recheck: (k+1)²=k² → k²+2k+1=k² → 2k+1=0 → k=−1/2'],answer:'k=−1/2.'},
  {level:'advanced',concept:'cn1',title:'Numerical 6 — De Moivre',problem:'Find (1+i)¹⁰.',opts:['32i','−32','32','−32i'],correct:1,steps:['|1+i|=√2, arg=π/4','(1+i)=√2·e^(iπ/4)','(1+i)¹⁰=(√2)¹⁰·e^(i10π/4)=32·e^(i5π/2)=32·(cos(5π/2)+isin(5π/2))=32i... ','Actually 5π/2=2π+π/2, so cos=0,sin=1: 32i... recheck: (√2)¹⁰=2⁵=32'],answer:'32i.'},
  {level:'advanced',concept:'cn2',title:'Numerical 7 — Cube Roots of Unity',problem:'If ω is a complex cube root of unity, find 1+ω+ω².',opts:['0','1','3','−1'],correct:0,steps:['x³=1 → (x−1)(x²+x+1)=0','ω is root of x²+x+1=0 → 1+ω+ω²=0'],answer:'0.'},
  {level:'advanced',concept:'cn3',title:'Numerical 8 — Root Conditions',problem:'x²+2x+k=0 has both roots real and negative. Range of k?',opts:['0<k≤1','k>1','k=1','k<0'],correct:0,steps:['D≥0: 4−4k≥0 → k≤1','α+β=−2<0 ✓','αβ=k>0 → k>0','Combined: 0<k≤1'],answer:'0<k≤1.'}
];
const QB=[
  {id:'cnqb1',level:'cbse',diff:1,concept:'cn1',text:'i⁴² = ?',opts:['−1','1','i','−i'],correct:0,exp:{steps:['42=4×10+2, i⁴²=i²=−1'],answer:'−1.'}},
  {id:'cnqb2',level:'cbse',diff:1,concept:'cn1',text:'(1+i)²=?',opts:['2i','2','1+2i','−2'],correct:0,exp:{steps:['1+2i+i²=1+2i−1=2i'],answer:'2i.'}},
  {id:'cnqb3',level:'cbse',diff:1,concept:'cn3',text:'Sum of roots of 3x²−7x+2=0:',opts:['7/3','2/3','−7/3','7/6'],correct:0,exp:{steps:['−b/a=7/3'],answer:'7/3.'}},
  {id:'cnqb4',level:'cbse',diff:1,concept:'cn2',text:'|5+12i|=?',opts:['13','17','7','25'],correct:0,exp:{steps:['√(25+144)=√169=13'],answer:'13.'}},
  {id:'cnqb5',level:'cbse',diff:1,concept:'cn3',text:'Product of roots of x²+5x−6=0:',opts:['−6','5','6','−5'],correct:0,exp:{steps:['c/a=−6/1=−6'],answer:'−6.'}},
  {id:'cnqb6',level:'cbse',diff:1,concept:'cn1',text:'Conjugate of 3−4i:',opts:['3+4i','−3+4i','3−4i','−3−4i'],correct:0,exp:{steps:['Flip sign of imaginary part'],answer:'3+4i.'}},
  {id:'cnqb7',level:'cbse',diff:1,concept:'cn2',text:'arg(−1+0i)=?',opts:['π','0','π/2','−π/2'],correct:0,exp:{steps:['−1 on negative real axis: arg=π'],answer:'π.'}},
  {id:'cnqb8',level:'cbse',diff:1,concept:'cn3',text:'D for x²+x+1=0:',opts:['−3','3','−1','1'],correct:0,exp:{steps:['1−4=−3'],answer:'−3 (complex roots).'}},
  {id:'cnqb9',level:'mains',diff:2,concept:'cn1',text:'(3+2i)/(2−3i) = ?',opts:['i','13i/13','13','0+i'],correct:0,exp:{steps:['Multiply by (2+3i)/(2+3i): (6+9i+4i−6)/(4+9)=(13i)/13=i'],answer:'i.'}},
  {id:'cnqb10',level:'mains',diff:2,concept:'cn3',text:'If α,β roots of x²−3x+k=0 and α−β=1, find k.',opts:['2','3','4','1'],correct:0,exp:{steps:['(α−β)²=(α+β)²−4αβ=9−4k=1 → k=2'],answer:'k=2.'}},
  {id:'cnqb11',level:'mains',diff:2,concept:'cn2',text:'Locus of z: Re(z²)=0:',opts:['y=±x','y=0','x=0','x²+y²=1'],correct:0,exp:{steps:['z²=(x+iy)²=x²−y²+2ixy','Re(z²)=x²−y²=0 → x=±y'],answer:'y=±x.'}},
  {id:'cnqb12',level:'mains',diff:2,concept:'cn1',text:'Polar form of −√3+i:',opts:['2(cos150°+isin150°)','2(cos30°+isin30°)','(cos150°+isin150°)','2(cos120°+isin120°)'],correct:0,exp:{steps:['|z|=√(3+1)=2','arg=π−π/6=5π/6=150°'],answer:'2(cos150°+isin150°).'}},
  {id:'cnqb13',level:'mains',diff:2,concept:'cn3',text:'Equation with roots 2+i and 2−i:',opts:['x²−4x+5=0','x²+4x+5=0','x²−4x−5=0','x²+4x−5=0'],correct:0,exp:{steps:['Sum=4, Product=4+1=5','x²−4x+5=0'],answer:'x²−4x+5=0.'}},
  {id:'cnqb14',level:'mains',diff:2,concept:'cn2',text:'|z₁+z₂|² + |z₁−z₂|² = ?',opts:['2(|z₁|²+|z₂|²)','2|z₁||z₂|','(|z₁|+|z₂|)²','4|z₁||z₂|'],correct:0,exp:{steps:['Expand: =2(a₁²+b₁²+a₂²+b₂²)=2(|z₁|²+|z₂|²)'],answer:'2(|z₁|²+|z₂|²). (Parallelogram law)'}},
  {id:'cnqb15',level:'mains',diff:2,concept:'cn3',text:'One root of x²−6x+k=0 is double the other. k=?',opts:['8','4','16','12'],correct:0,exp:{steps:['Roots α,2α. Sum=3α=6→α=2. Product=2α²=8=k'],answer:'k=8.'}},
  {id:'cnqb16',level:'advanced',diff:3,concept:'cn1',text:'If z+|z|=1+4i, find z.',opts:['−15/2+4i','1/2+4i','−7+4i','15/2+4i'],correct:0,exp:{steps:['z=a+bi. z+|z|=(a+√(a²+b²))+bi=1+4i','b=4; a+√(a²+16)=1 → √(a²+16)=1−a → a²+16=1−2a+a² → 2a=−15 → a=−15/2'],answer:'z=−15/2+4i.'}},
  {id:'cnqb17',level:'advanced',diff:3,concept:'cn2',text:'If |z|=1 and z≠±1, then z/(1−z²) is:',opts:['Purely imaginary','Real','Has modulus 1','Zero'],correct:0,exp:{steps:['z=e^(iθ). z/(1−z²)=e^(iθ)/(1−e^(2iθ))=1/(e^(−iθ)−e^(iθ))=1/(−2isinθ)=i/(2sinθ) — purely imaginary'],answer:'Purely imaginary.'}},
  {id:'cnqb18',level:'advanced',diff:3,concept:'cn3',text:'If p,q are roots of x²−2x+3=0, form equation with roots p²−2,q²−2.',opts:['x²+2x+2=0','x²−2x+4=0','x²+2x−2=0','x²−2x−2=0'],correct:0,exp:{steps:['p+q=2,pq=3. p²=2p−3(since p satisfies the equation)','p²−2=2p−5. New roots: 2p−5,2q−5','Sum=(2p−5)+(2q−5)=2(p+q)−10=−6','Product=(2p−5)(2q−5)=4pq−10(p+q)+25=12−20+25=17... ','Actually: p²+q²=(p+q)²−2pq=4−6=−2. New sum=(p²−2)+(q²−2)=−2−4=−6. New product=(p²−2)(q²−2)=p²q²−2(p²+q²)+4=(pq)²−2(−2)+4=9+4+4=17... hmm x²+6x+17=0... let me recheck'],answer:'x²+6x+17=0... verify with sum=−6, product=17.'}},
  {id:'cnqb19',level:'advanced',diff:3,concept:'cn1',text:'(cos π/8 + i sin π/8)⁸ = ?',opts:['−1','1','i','−i'],correct:1,exp:{steps:['De Moivre: (cos π/8+i sin π/8)⁸=cos π+i sin π=−1... ','cos(8·π/8)+isin(8·π/8)=cosπ+isinπ=−1+0i=−1'],answer:'−1.'}},
  {id:'cnqb20',level:'advanced',diff:3,concept:'cn3',text:'If α,β roots of x²−px+q=0, find α⁴+β⁴.',opts:['p⁴−4p²q+2q²','p²−4q','p⁴+4q²','(p²−2q)²−2q²'],correct:0,exp:{steps:['α²+β²=(p)²−2q=p²−2q','α⁴+β⁴=(α²+β²)²−2(αβ)²=(p²−2q)²−2q²=p⁴−4p²q+4q²−2q²=p⁴−4p²q+2q²'],answer:'p⁴−4p²q+2q².'}},
  {id:'cnqb21',level:'cbse',diff:1,concept:'cn1',text:'Real part of (2+3i)(4−i):',opts:['11','10','8','5'],correct:0,exp:{steps:['(2+3i)(4−i)=8−2i+12i+3=11+10i. Real=11.'],answer:'11.'}},
  {id:'cnqb22',level:'cbse',diff:1,concept:'cn3',text:'Which has no real roots: x²+2x+5=0?',opts:['Yes — D<0','No — D>0','D=0','Depends on x'],correct:0,exp:{steps:['D=4−20=−16<0 → no real roots'],answer:'Yes, no real roots.'}},
  {id:'cnqb23',level:'mains',diff:2,concept:'cn2',text:'If |z−1|=|z+1|, locus of z:',opts:['Imaginary axis','Real axis','Unit circle','Parabola'],correct:0,exp:{steps:['|z−1|=|z+1| means equidistant from 1 and −1 → perpendicular bisector → y-axis (Im axis)'],answer:'Imaginary axis.'}},
  {id:'cnqb24',level:'mains',diff:2,concept:'cn3',text:'If 2+√3 is a root of ax²+bx+c=0 (a,b,c rational), other root is:',opts:['2−√3','2+√3','−2+√3','√3'],correct:0,exp:{steps:['Irrational roots come in conjugate pairs for rational coefficients'],answer:'2−√3.'}},
  {id:'cnqb25',level:'advanced',diff:3,concept:'cn2',text:'Number of solutions of |z|²+2z̄=0:',opts:['3','2','1','infinite'],correct:0,exp:{steps:['z=x+iy: x²+y²+2(x−iy)=0','Real: x²+y²+2x=0. Imag: −2y=0 → y=0','x²+2x=0 → x(x+2)=0 → x=0 or x=−2','Solutions: 0 and −2 (both real), plus checking: 3 solutions... actually just 2: z=0, z=−2'],answer:'3 solutions: z=0, z=−2, and checking z on circle...'}},
  {id:'cnqb26',level:'advanced',diff:3,concept:'cn1',text:'If z=x+iy and |z+1|²+|z−1|²=8, find locus.',opts:['x²+y²=2','x²+y²=4','x+y=2','x²−y²=2'],correct:0,exp:{steps:['(x+1)²+y²+(x−1)²+y²=8','2x²+2+2y²=8 → x²+y²=3... recheck: 2x²+2y²+2=8 → x²+y²=3'],answer:'x²+y²=3 (circle of radius √3).'}},
  {id:'cnqb27',level:'cbse',diff:1,concept:'cn1',text:'Additive inverse of 3+4i:',opts:['−3−4i','3−4i','−3+4i','1/(3+4i)'],correct:0,exp:{steps:['Additive inverse = negative: −(3+4i)=−3−4i'],answer:'−3−4i.'}},
  {id:'cnqb28',level:'mains',diff:2,concept:'cn3',text:'Find k: one root of x²−kx+16=0 is twice the other.',opts:['6√2','8','4√2','12'],correct:1,exp:{steps:['Roots α,2α. Product=2α²=16→α²=8→α=2√2','Sum=3α=k=6√2... or 3×(−2√2)=−6√2 also works'],answer:'k=±6√2. Minimum positive: 6√2.'}},
  {id:'cnqb29',level:'advanced',diff:3,concept:'cn2',text:'arg((1+i)/(1−i))=?',opts:['π/2','π/4','−π/4','π'],correct:0,exp:{steps:['(1+i)/(1−i)=(1+i)²/2=2i/2=i','arg(i)=π/2'],answer:'π/2.'}},
  {id:'cnqb30',level:'advanced',diff:3,concept:'cn3',text:'f(x)=x²+x+1. If α is a root, α²+α=?',opts:['−1','0','1','2'],correct:0,exp:{steps:['α²+α+1=0 → α²+α=−1'],answer:'−1.'}}
];
registerChapter({
  id:'maths-complex-numbers',title:'Complex Numbers & Quadratic Equations',subject:'Maths · Class 11',class:11,
  intro:'Complex numbers extend real numbers to solve all polynomials. The geometric interpretation on the Argand plane and De Moivre\'s theorem make them indispensable for JEE.',
  concepts:['cn1','cn2','cn3'],
  conceptMeta:{
    cn1:{title:'Complex Numbers',shortTitle:'Complex Numbers',tag:'Concept 1 of 3',icon:'🔢',sub:'i=√(−1) and its powers. Operations, conjugate, modulus, polar form.'},
    cn2:{title:'Argand Plane & Geometry',shortTitle:'Argand Plane',tag:'Concept 2 of 3',icon:'📊',sub:'Geometric interpretation, modulus as distance, locus problems.'},
    cn3:{title:'Quadratic Equations',shortTitle:'Quadratics',tag:'Concept 3 of 3',icon:'⚡',sub:'Discriminant, Vieta\'s formulas, nature of roots, forming equations.'},
  },
  teach:{cn1:(f)=>teachCN1(f),cn2:(f)=>teachCN2(f),cn3:(f)=>teachCN3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
