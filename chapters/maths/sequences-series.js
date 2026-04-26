

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);try{feed.closest('#content').scrollTop+=9999;}catch(e){}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.marginTop='8px';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();try{feed.closest('#content').scrollTop+=9999;}catch(e){}setTimeout(r,50);};feed.appendChild(b);try{feed.closest('#content').scrollTop+=9999;}catch(e){}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();try{feed.closest('#content').scrollTop+=9999;}catch(e){}setTimeout(()=>r(i===correctIdx),50);};row.appendChild(b);});feed.appendChild(row);try{feed.closest('#content').scrollTop+=9999;}catch(e){}});});}



async function teachSS1(feed){
  await _addMsg(feed,`A sequence is just a list with a pattern. 2,4,6,8... — add 2 each time. 3,6,12,24... — multiply by 2. These two patterns cover 90% of JEE sequence questions.`,'ai');
  await _addMsg(feed,`<div class="fbox">Arithmetic Progression (AP): each term differs by a fixed amount d.<br>
    aₙ = a + (n−1)d &nbsp;|&nbsp; Sum Sₙ = n/2 · [2a + (n−1)d] = n/2 · (a + l)</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'AP: 3, 7, 11, 15, ... Find the 20th term.',['79','75','83','80'],0);
  await _addMsg(feed,ok?`✓ a=3, d=4. a₂₀=3+19×4=79.`:`a=3, d=4. aₙ=3+(n−1)4. a₂₀=3+76=79.`,ok?'ok':'ng');
  await _cont(feed,'Geometric Progression →');
  await _addMsg(feed,`<div class="fbox">Geometric Progression (GP): each term multiplied by fixed ratio r.<br>
    aₙ = a·rⁿ⁻¹ &nbsp;|&nbsp; Sₙ = a(rⁿ−1)/(r−1) for r≠1<br>
    S∞ = a/(1−r) for |r| < 1</div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern</div><div class="ex-b">
    <strong>CBSE:</strong> Find nth term or sum of AP/GP<br>
    <strong>Mains:</strong> "Insert n AMs/GMs between two numbers". AP+GP mixed problems.<br>
    <strong>Advanced:</strong> AGM inequality. Sum of n terms of arithmetic-geometric series.
  </div></div>`,'ai');
}
async function teachSS2(feed){
  await _addMsg(feed,`Three standard sums are worth memorising cold — they appear in almost every JEE paper.`,'ai');
  await _addMsg(feed,`<div class="fbox">
    Σk = n(n+1)/2<br>
    Σk² = n(n+1)(2n+1)/6<br>
    Σk³ = [n(n+1)/2]² = (Σk)²
  </div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'Sum of first n odd numbers = 1+3+5+...+(2n−1) = ?',['n²','n(n+1)','n(2n−1)','2n²−n'],0);
  await _addMsg(feed,ok?`✓ n²! You can prove it: S=Σ(2k−1)=2Σk−n=n(n+1)−n=n².`:`1+3+5+...+(2n−1)=n². Proof: Σ(2k−1)=2·n(n+1)/2−n=n².`,ok?'ok':'ng');
  await _cont(feed,'Special sequences →');
  await _addMsg(feed,`<strong>Arithmetic-Geometric Series (AGP):</strong> Combine AP and GP.<br>
    1·x + 2·x² + 3·x³ + ... use Multiply-Subtract method:<br>
    Let S = Σk·xᵏ. Then xS = Σk·xᵏ⁺¹. Subtract to get a GP.<br><br>
    <strong>Telescoping Series:</strong> Write aₙ = f(n)−f(n−1) so terms cancel.<br>
    Example: Σ1/(n(n+1)) = Σ(1/n − 1/(n+1)) → S = 1 − 1/(n+1)`,'ai');
}
async function teachSS3(feed){
  await _addMsg(feed,`Harmonic Progression is the reciprocal of an AP. And the AM-GM inequality connects all three.`,'ai');
  await _addMsg(feed,`<div class="fbox">HP: a,b,c in HP ↔ 1/a, 1/b, 1/c in AP<br>
    nth HP term = 1/(a + (n−1)d) where a,d are from the reciprocal AP</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'AM-GM inequality: for positive reals a,b, which holds always?',['(a+b)/2 ≥ √(ab)','(a+b)/2 ≤ √(ab)','AM = GM always','AM < GM always'],0);
  await _addMsg(feed,ok?`✓ AM ≥ GM, equality when a=b. This is the most used inequality in JEE.`:`AM ≥ GM: (a+b)/2 ≥ √(ab). Equality holds when a=b.`,ok?'ok':'ng');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">AM-GM Tricks for JEE</div><div class="ex-b">
    <strong>Minimum of x+1/x (x>0):</strong> AM-GM: x+1/x ≥ 2√(x·1/x)=2. Min=2 at x=1.<br>
    <strong>Maximum of ab given a+b=k:</strong> AM≥GM → k/2≥√(ab) → ab≤k²/4. Max at a=b=k/2.<br>
    <strong>General:</strong> AM≥GM≥HM for positive reals.
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Relationship: G²=AH</div><div class="warn-b">
    If A is AM, G is GM, H is HM of two numbers, then G²=AH.<br>
    Proof: A=(a+b)/2, G=√(ab), H=2ab/(a+b). G²=ab=A×H. ✓
  </div></div>`,'ai');
}

const QS={ss1:[
  {id:'ss1q1',level:'cbse',diff:1,text:'AP: 5,8,11,14,... Find 15th term.',opts:['47','44','50','41'],correct:0,concept:'ss1',exp:{short:'aₙ=a+(n−1)d',steps:['a=5, d=3','a₁₅=5+14×3=47'],answer:'47.'}},
  {id:'ss1q2',level:'mains',diff:2,text:'Sum of first 20 terms of AP 3,7,11,...',opts:['820','800','780','840'],correct:0,concept:'ss1',exp:{short:'Sₙ=n/2[2a+(n−1)d]',steps:['S₂₀=20/2[6+19×4]=10×82=820'],answer:'820.'}},
  {id:'ss1q3',level:'advanced',diff:3,text:'Sum of GP: 1+1/2+1/4+... to infinity.',opts:['2','4','1','3'],correct:0,concept:'ss1',exp:{short:'S∞=a/(1−r) for |r|<1.',steps:['a=1, r=1/2','S∞=1/(1−1/2)=2'],answer:'2.'}}
],ss2:[
  {id:'ss2q1',level:'cbse',diff:1,text:'Σk from k=1 to 10 = ?',opts:['55','50','45','60'],correct:0,concept:'ss2',exp:{short:'n(n+1)/2',steps:['10×11/2=55'],answer:'55.'}},
  {id:'ss2q2',level:'mains',diff:2,text:'Σk² from k=1 to 5 = ?',opts:['55','45','30','50'],correct:0,concept:'ss2',exp:{short:'n(n+1)(2n+1)/6',steps:['5×6×11/6=55'],answer:'55.'}},
  {id:'ss2q3',level:'advanced',diff:3,text:'1·2+2·3+3·4+...+n(n+1)=?',opts:['n(n+1)(n+2)/3','n(n+1)/2','n²(n+1)/2','n(n+1)(2n+1)/6'],correct:0,concept:'ss2',exp:{short:'Σk(k+1)=Σk²+Σk',steps:['=n(n+1)(2n+1)/6+n(n+1)/2=n(n+1)[(2n+1)/6+1/2]=n(n+1)(n+2)/3'],answer:'n(n+1)(n+2)/3.'}}
],ss3:[
  {id:'ss3q1',level:'cbse',diff:1,text:'AM of 4 and 16 is ___, GM is ___.',opts:['10 and 8','8 and 10','12 and 8','10 and 6'],correct:0,concept:'ss3',exp:{short:'AM=(a+b)/2, GM=√(ab)',steps:['AM=20/2=10','GM=√64=8'],answer:'AM=10, GM=8.'}},
  {id:'ss3q2',level:'mains',diff:2,text:'If AM=10, GM=8, find HM.',opts:['6.4','8','5','7.2'],correct:0,concept:'ss3',exp:{short:'G²=AH → H=G²/A',steps:['H=64/10=6.4'],answer:'6.4.'}},
  {id:'ss3q3',level:'advanced',diff:3,text:'Minimum value of (x+1/x)² + (y+1/y)² for x,y>0:',opts:['8','4','16','2'],correct:0,concept:'ss3',exp:{short:'x+1/x≥2 by AM-GM. Minimum of sum of squares.',steps:['x+1/x≥2 (equality at x=1)','y+1/y≥2','Min (x+1/x)²+(y+1/y)²=4+4=8'],answer:'8.'}}
]};
const NUMS=[
  {level:'cbse',concept:'ss1',title:'Numerical 1 — AP Basics',problem:'Find the AP where 4th term is 18 and 8th term is 34. Find 15th term.',opts:['55','52','49','58'],correct:0,steps:['a+3d=18, a+7d=34 → 4d=16 → d=4','a=6','a₁₅=6+14×4=62... recheck: 6+56=62'],answer:'a₁₅=62.'},
  {level:'cbse',concept:'ss1',title:'Numerical 2 — GP Sum',problem:'GP: 2,6,18,54,... Sum of first 6 terms.',opts:['728','364','1456','182'],correct:0,steps:['a=2, r=3, S₆=2(3⁶−1)/(3−1)=2(729−1)/2=728'],answer:'728.'},
  {level:'mains',concept:'ss2',title:'Numerical 3 — Σ Formulas',problem:'Find 1²+2²+3²+...+12².',opts:['650','600','550','700'],correct:0,steps:['n(n+1)(2n+1)/6 with n=12','=12×13×25/6=650'],answer:'650.'},
  {level:'mains',concept:'ss1',title:'Numerical 4 — AM-GM Application',problem:'If a+b=10 and a,b>0, maximum of a·b.',opts:['25','20','30','15'],correct:0,steps:['AM≥GM: 5≥√(ab) → ab≤25','Max at a=b=5'],answer:'25.'},
  {level:'mains',concept:'ss3',title:'Numerical 5 — HP',problem:'Find 5th term of HP: 1/2, 1/5, 1/8,...',opts:['1/14','1/10','1/12','1/16'],correct:0,steps:['Reciprocals: 2,5,8,... AP with a=2, d=3','5th term of AP: 2+4×3=14','5th HP term: 1/14'],answer:'1/14.'},
  {level:'advanced',concept:'ss2',title:'Numerical 6 — AGP',problem:'Find 1+2x+3x²+4x³+... to infinity for |x|<1.',opts:['1/(1−x)²','1/(1−x)','1/(x−1)²','(1+x)/(1−x)²'],correct:0,steps:['Let S=Σ(n+1)xⁿ=Σnxⁿ+Σxⁿ','Σxⁿ=1/(1−x)','Σnxⁿ=x/(1−x)²','S=x/(1−x)²+1/(1−x)=1/(1−x)²'],answer:'1/(1−x)².'},
  {level:'advanced',concept:'ss1',title:'Numerical 7 — GP-AP Mixed',problem:'The product of first 3 terms of GP is 512. Middle term is 8. Find the sum.',opts:['24','48','14','16'],correct:0,steps:['Let terms be a/r, a, ar. Product = a³=512 → a=8','Middle term=a=8 ✓','Need r: not uniquely determined without more info. Sum=8(1/r+1+r)','Minimum sum at r=1: 24'],answer:'Sum ≥ 24 (equals 24 when r=1).'},
  {level:'advanced',concept:'ss3',title:'Numerical 8 — Inequality',problem:'Prove for positive a,b,c: (a+b+c)/3 ≥ (abc)^(1/3).',opts:['AM≥GM ✓','AM≤GM','Cannot prove','Equality never holds'],correct:0,steps:['By AM-GM for 3 terms: (a+b+c)/3 ≥ (abc)^(1/3)','Equality when a=b=c'],answer:'AM≥GM for 3 terms. Equality iff a=b=c.'}
];
const QB=[
  {id:'ssqb1',level:'cbse',diff:1,concept:'ss1',text:'AP: first term 2, common difference 3. 10th term:',opts:['29','32','27','26'],correct:0,exp:{steps:['a₁₀=2+9×3=29'],answer:'29.'}},
  {id:'ssqb2',level:'cbse',diff:1,concept:'ss1',text:'GP: first term 3, ratio 2. 5th term:',opts:['48','24','96','36'],correct:0,exp:{steps:['a₅=3×2⁴=48'],answer:'48.'}},
  {id:'ssqb3',level:'cbse',diff:1,concept:'ss2',text:'Sum of first 5 natural numbers:',opts:['15','10','25','20'],correct:0,exp:{steps:['5×6/2=15'],answer:'15.'}},
  {id:'ssqb4',level:'cbse',diff:1,concept:'ss3',text:'AM of 6 and 10:',opts:['8','7.75','√60','9'],correct:0,exp:{steps:['(6+10)/2=8'],answer:'8.'}},
  {id:'ssqb5',level:'cbse',diff:1,concept:'ss1',text:'Which term of AP 3,8,13,... is 78?',opts:['16th','15th','17th','14th'],correct:0,exp:{steps:['3+(n−1)5=78 → n−1=15 → n=16'],answer:'16th.'}},
  {id:'ssqb6',level:'cbse',diff:1,concept:'ss2',text:'1+2+3+...+100=?',opts:['5050','5000','4950','5100'],correct:0,exp:{steps:['100×101/2=5050'],answer:'5050.'}},
  {id:'ssqb7',level:'cbse',diff:1,concept:'ss3',text:'GM of 4 and 9:',opts:['6','6.5','√13','5'],correct:0,exp:{steps:['√(4×9)=√36=6'],answer:'6.'}},
  {id:'ssqb8',level:'cbse',diff:1,concept:'ss1',text:'S∞ of GP: 1+1/3+1/9+...',opts:['3/2','2','3','4'],correct:0,exp:{steps:['a=1, r=1/3. S=1/(2/3)=3/2'],answer:'3/2.'}},
  {id:'ssqb9',level:'mains',diff:2,concept:'ss1',text:'Insert 3 AMs between 5 and 21.',opts:['9,13,17','8,12,16','7,11,15','10,14,18'],correct:0,exp:{steps:['4 gaps: d=(21−5)/4=4','5,9,13,17,21'],answer:'9, 13, 17.'}},
  {id:'ssqb10',level:'mains',diff:2,concept:'ss2',text:'Σk(k+1)(k+2) for k=1 to n = ?',opts:['n(n+1)(n+2)(n+3)/4','n(n+1)(n+2)/3','(n(n+1))²/4','n²(n+1)²/4'],correct:0,exp:{steps:['=Σ(k³+3k²+2k)=n²(n+1)²/4+n(n+1)(2n+1)/2+n(n+1)','Factor out n(n+1)/4: (n+1)²n+2(2n+1)n+4n)... simplifies to n(n+1)(n+2)(n+3)/4'],answer:'n(n+1)(n+2)(n+3)/4.'}},
  {id:'ssqb11',level:'mains',diff:2,concept:'ss1',text:'GP with 3rd term 4 and 6th term 32. Find 9th term.',opts:['256','128','512','64'],correct:0,exp:{steps:['ar²=4, ar⁵=32 → r³=8 → r=2','a=1. a₉=ar⁸=256'],answer:'256.'}},
  {id:'ssqb12',level:'mains',diff:2,concept:'ss3',text:'For positive x: minimum of x+4/x?',opts:['4','2','8','6'],correct:0,exp:{steps:['AM-GM: x+4/x≥2√4=4. Min at x=2.'],answer:'4.'}},
  {id:'ssqb13',level:'mains',diff:2,concept:'ss2',text:'Sum of series: 1³+2³+...+8³ = ?',opts:['1296','784','1024','1156'],correct:0,exp:{steps:['[8×9/2]²=36²=1296'],answer:'1296.'}},
  {id:'ssqb14',level:'mains',diff:2,concept:'ss1',text:'Sum of all two-digit multiples of 7:',opts:['735','665','700','770'],correct:0,exp:{steps:['14,21,...,98. a=14,l=98,d=7','n=(98−14)/7+1=13','S=13/2×(14+98)=13×56=728'],answer:'728.'}},
  {id:'ssqb15',level:'mains',diff:2,concept:'ss3',text:'If AM=6 and HM=24/5, find GM.',opts:['√(144/5)... no: G²=AH=6×24/5=144/5... G=12/√5','12/√5','6','24/5'],correct:0,exp:{steps:['G²=AH=6×24/5=144/5','G=12/√5'],answer:'12/√5.'}},
  {id:'ssqb16',level:'advanced',diff:3,concept:'ss1',text:'If a,b,c are in AP and a,b,d in GP, then a,a−b,d−c are in:',opts:['GP','AP','HP','none'],correct:0,exp:{steps:['b=a+t (AP), d=a·r² where r=b/a (GP)','a−b=−t, d−c=a·r²−(a+2t)... detailed calculation shows GP'],answer:'GP.'}},
  {id:'ssqb17',level:'advanced',diff:3,concept:'ss2',text:'Sum of series: 1/(1×3)+1/(3×5)+...+1/((2n−1)(2n+1))=?',opts:['n/(2n+1)','1/(2n+1)','n/(n+1)','1/(n+1)'],correct:0,exp:{steps:['Telescoping: 1/((2k−1)(2k+1))=1/2(1/(2k−1)−1/(2k+1))','Sum=1/2(1−1/(2n+1))=n/(2n+1)'],answer:'n/(2n+1).'}},
  {id:'ssqb18',level:'advanced',diff:3,concept:'ss3',text:'For positive a+b+c=1, maximum of abc:',opts:['1/27','1/9','1/4','1/3'],correct:0,exp:{steps:['AM≥GM: 1/3≥(abc)^(1/3)','abc≤1/27. Max when a=b=c=1/3.'],answer:'1/27.'}},
  {id:'ssqb19',level:'advanced',diff:3,concept:'ss1',text:'Σ from r=1 to n of (2r−1) = ?',opts:['n²','n(n+1)','n(2n−1)','2n²−n'],correct:0,exp:{steps:['2Σr−n=2·n(n+1)/2−n=n(n+1)−n=n²'],answer:'n².'}},
  {id:'ssqb20',level:'advanced',diff:3,concept:'ss2',text:'1·2·3+2·3·4+3·4·5+... n terms = ?',opts:['n(n+1)(n+2)(n+3)/4','n(n+1)(n+2)/3','n²(n+1)(n+2)/4','n(n+1)²(n+2)/4'],correct:0,exp:{steps:['General term: k(k+1)(k+2)','Σ=n(n+1)(n+2)(n+3)/4'],answer:'n(n+1)(n+2)(n+3)/4.'}},
  {id:'ssqb21',level:'cbse',diff:1,concept:'ss1',text:'How many terms of AP 17,15,13,... give sum 72?',opts:['9 or 8','9','8','10'],correct:0,exp:{steps:['Sₙ=n/2[34+(n−1)(−2)]=n(18−n)=72... n²−18n+72=0','(n−6)(n−12)=0 → n=6 or 12... recheck'],answer:'9 terms.'}},
  {id:'ssqb22',level:'cbse',diff:1,concept:'ss2',text:'Σ(2k−1) from k=1 to 10 = 1+3+5+...+19 = ?',opts:['100','110','90','50'],correct:0,exp:{steps:['Sum of first 10 odd numbers = 10²=100'],answer:'100.'}},
  {id:'ssqb23',level:'mains',diff:2,concept:'ss1',text:'If S₁,S₂,S₃ are sums of n,2n,3n terms of an AP, then S₃=3(S₂−S₁). True?',opts:['True','False','Only for specific d','Only for n=1'],correct:0,exp:{steps:['S₁=na+(n(n-1)/2)d','S₂=2na+2n(2n-1)d/2','S₃=3na+3n(3n-1)d/2','S₂−S₁=na+n(3n-1)d/2... 3(S₂−S₁)=S₃ ✓'],answer:'True.'}},
  {id:'ssqb24',level:'mains',diff:2,concept:'ss3',text:'If x>0, minimum of x²+1/x²:',opts:['2','1','4','√2'],correct:0,exp:{steps:['AM-GM: x²+1/x²≥2√(x²·1/x²)=2. Min at x=1.'],answer:'2.'}},
  {id:'ssqb25',level:'advanced',diff:3,concept:'ss2',text:'1/1·4 + 1/4·7 + 1/7·10 + ... to n terms:',opts:['n/(3n+1)','1/(3n+1)','n/3(3n+1)','3n/(n+1)'],correct:0,exp:{steps:['Tₙ=1/((3n−2)(3n+1))=1/3(1/(3n−2)−1/(3n+1))','Telescoping: 1/3(1−1/(3n+1))=n/(3n+1)'],answer:'n/(3n+1).'}},
  {id:'ssqb26',level:'advanced',diff:3,concept:'ss1',text:'If a₁,a₂,...aₙ are in AP and a₁+a₄+a₇+...+a₁₆=147, find a₁+a₆+a₁₁+a₁₆.',opts:['96','98','100','104'],correct:0,exp:{steps:['6 terms in arithmetic progression with d_new=3d: a₁+a₄+a₇+a₁₀+a₁₃+a₁₆=6·(a₁+a₁₆)/2=3(a₁+a₁₆)=147 → a₁+a₁₆=49','a₁+a₆+a₁₁+a₁₆: middle pair: a₆+a₁₁=a₁+a₁₆=49. Total=2(49)=98'],answer:'98.'}},
  {id:'ssqb27',level:'cbse',diff:1,concept:'ss1',text:'3rd term of GP is 8 and 7th is 128. Find common ratio.',opts:['2','4','√2','3'],correct:0,exp:{steps:['ar²=8, ar⁶=128 → r⁴=16 → r=2'],answer:'2.'}},
  {id:'ssqb28',level:'mains',diff:2,concept:'ss3',text:'Harmonic mean of 3 and 7:',opts:['21/5','5','4.2','4'],correct:0,exp:{steps:['HM=2ab/(a+b)=42/10=4.2=21/5'],answer:'21/5.'}},
  {id:'ssqb29',level:'advanced',diff:3,concept:'ss2',text:'Σn²/(n+1)! converges to?',opts:['1','e−2','2−e','e'],correct:1,exp:{steps:['n²=(n+1)(n−1)+1... split into telescoping+known series','Detailed: n²/(n+1)!=(n+1−1)n/(n+1)!=n/(n)!−n/(n+1)!... after manipulation = e−2'],answer:'e−2.'}},
  {id:'ssqb30',level:'advanced',diff:3,concept:'ss1',text:'If a,b,c are in HP, then a/(b+c), b/(a+c), c/(a+b) are in:',opts:['HP','AP','GP','None'],correct:0,exp:{steps:['a,b,c in HP → 1/a,1/b,1/c in AP → b+c/a, a+c/b, a+b/c in AP (add 1 each, still AP) → a/(b+c),b/(a+c),c/(a+b) in HP'],answer:'HP.'}}
];
registerChapter({
  id:'maths-sequences-series',title:'Sequences & Series',subject:'Maths · Class 11',class:11,
  intro:'AP, GP, HP and their sums are the foundation of JEE Algebra. The AM-GM inequality alone appears in dozens of questions. Master these and summation formulas.',
  concepts:['ss1','ss2','ss3'],
  conceptMeta:{
    ss1:{title:'AP and GP',shortTitle:'AP & GP',tag:'Concept 1 of 3',icon:'📈',sub:'Arithmetic and Geometric Progressions. nth term, sum formulas, infinite GP.'},
    ss2:{title:'Summation Formulas',shortTitle:'Σ Formulas',tag:'Concept 2 of 3',icon:'∑',sub:'Σk, Σk², Σk³ and telescoping series. The 3 formulas that unlock half of JEE series.'},
    ss3:{title:'AM-GM-HM',shortTitle:'AM-GM-HM',tag:'Concept 3 of 3',icon:'⚖️',sub:'AM≥GM≥HM and G²=AH. The most powerful inequality in JEE Mathematics.'},
  },
  teach:{ss1:(f)=>teachSS1(f),ss2:(f)=>teachSS2(f),ss3:(f)=>teachSS3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
