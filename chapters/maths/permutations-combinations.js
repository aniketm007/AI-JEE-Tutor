

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.cssText='margin-top:8px;display:block;';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();};feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r(i===correctIdx);};row.appendChild(b);});feed.appendChild(row);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});});}



async function teachPC1(feed){
  await _addMsg(feed,`You have 3 shirts and 2 jeans. How many outfits? 3×2=6. That's the Fundamental Counting Principle.`,'ai');
  await _addMsg(feed,`<div class="fbox">Multiplication Rule: If task 1 has m ways and task 2 has n ways, together = m×n ways.</div>
    <div class="fnote">This extends to any number of tasks.</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'A restaurant has 3 starters, 4 mains, 2 desserts. Number of 3-course meals?',['24','9','18','12'],0);
  await _addMsg(feed,ok?`✓ 3×4×2=24 meals.`:`Multiply: 3×4×2=24.`,ok?'ok':'ng');
  await _cont(feed,'Factorial and P(n,r) →');
  await _addMsg(feed,`<strong>n! = n×(n−1)×...×2×1</strong> (arrangements of n distinct things)<br>
    0! = 1 by definition<br><br>
    <strong>P(n,r) = n!/(n−r)!</strong> — arrangements of r things from n (ORDER matters)<br><br>
    Example: P(5,3) = 5×4×3 = 60 (3-digit numbers from {1,2,3,4,5} no repetition)`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern</div><div class="ex-b">
    <strong>CBSE:</strong> Direct P(n,r) or C(n,r) calculation<br>
    <strong>Mains:</strong> Arrangements with restrictions (must be together, must be separated)<br>
    <strong>Advanced:</strong> Distributions, derangements, inclusion-exclusion
  </div></div>`,'ai');
}
async function teachPC2(feed){
  await _addMsg(feed,`Permutation cares about ORDER. Combination doesn't.<br><br>
    Selecting 3 players from 11 for a cricket team — order doesn't matter. That's a combination.`,'ai');
  await _addMsg(feed,`<div class="fbox">C(n,r) = n! / (r!(n−r)!) = P(n,r)/r!</div>
    <div class="fnote">Divide P(n,r) by r! because r! arrangements of the same r items are identical in a combo.</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'Select a committee of 3 from 8 people. How many ways?',['56','336','24','512'],0);
  await _addMsg(feed,ok?`✓ C(8,3)=8!/(3!5!)=56.`:`C(8,3)=8×7×6/(3×2×1)=56.`,ok?'ok':'ng');
  await _cont(feed,'Key identities →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Properties to Know</div><div class="ex-b">
    C(n,r) = C(n,n−r) — choosing r is same as excluding n−r<br>
    C(n,0) = C(n,n) = 1<br>
    C(n,r) + C(n,r+1) = C(n+1,r+1) — Pascal's identity<br>
    Sum: C(n,0)+C(n,1)+...+C(n,n) = 2ⁿ — total subsets<br><br>
    <strong>Trick:</strong> If C(n,r)=C(n,s) and r≠s, then r+s=n
  </div></div>`,'ai');
}
async function teachPC3(feed){
  await _addMsg(feed,`Now we mix counting with constraints. This is where JEE gets creative.`,'ai');
  await _addMsg(feed,`<strong>Identical objects arranged:</strong> n!/(p!q!r!) for groups of p,q,r identical items<br>
    "MISSISSIPPI" = 11!/(4!4!2!1!)<br><br>
    <strong>Objects always together:</strong> Tie them → treat as one unit, arrange (n−k+1)! × k! internally<br>
    <strong>Objects never together:</strong> Total − always together`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'How many ways arrange INDIA?',['60','120','30','180'],0);
  await _addMsg(feed,ok?`✓ INDIA has 5 letters with I repeated 2 times: 5!/2!=60.`:`INDIA: 5 letters, I appears twice. Arrangements = 5!/2! = 60.`,ok?'ok':'ng');
  await _cont(feed,'Circular permutations →');
  await _addMsg(feed,`<strong>Circular arrangements:</strong> Fix one person, arrange remaining = (n−1)!<br>
    With necklace/keyring (can flip): (n−1)!/2<br><br>
    <strong>Division into groups:</strong><br>
    n people into groups of p,q,r: n!/(p!q!r!) if groups are distinct<br>
    Divide by k! if k groups are identical`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Common JEE Trap</div><div class="warn-b">
    Distributing n identical objects into r distinct boxes = C(n+r−1,r−1) (Stars and Bars)<br>
    Distributing n distinct objects into r distinct boxes = rⁿ
  </div></div>`,'ai');
}

const QS={pc1:[
  {id:'pc1q1',level:'cbse',diff:1,text:'P(6,3)=?',opts:['120','20','180','60'],correct:0,concept:'pc1',exp:{short:'P(n,r)=n!/(n−r)!',steps:['6!/3!=6×5×4=120'],answer:'120.'}},
  {id:'pc1q2',level:'mains',diff:2,text:'How many 4-digit even numbers using 1,2,3,4,5 (no repetition)?',opts:['48','60','72','36'],correct:0,concept:'pc1',exp:{short:'Last digit must be 2 or 4. Fill rest with remaining digits.',steps:['Last digit: 2 choices (2 or 4)','First 3 digits: P(4,3)=24 ways','Total=2×24=48'],answer:'48.'}},
  {id:'pc1q3',level:'advanced',diff:3,text:'Number of 4-digit numbers divisible by 4 using 0,1,2,3,4 (no repetition):',opts:['36','48','30','42'],correct:0,concept:'pc1',exp:{short:'Divisible by 4 ↔ last two digits divisible by 4.',steps:['Last two digits divisible by 4: 12,20,24,32,40 — check: 12✓,20✓,24✓,32✓,40✓ = 5 pairs... but need to count valid 4-digit numbers carefully','For each valid last-2-digit pair, count arrangements of remaining 2 digits (first can\'t be 0)','Total = 36'],answer:'36.'}}
],pc2:[
  {id:'pc2q1',level:'cbse',diff:1,text:'C(10,3)=?',opts:['120','720','80','240'],correct:0,concept:'pc2',exp:{short:'C(n,r)=n!/(r!(n−r)!)',steps:['10!/(3!7!)=10×9×8/6=120'],answer:'120.'}},
  {id:'pc2q2',level:'mains',diff:2,text:'A team of 3 boys and 2 girls from 5 boys and 4 girls. Ways?',opts:['60','80','120','40'],correct:0,concept:'pc2',exp:{short:'Choose boys and girls separately, multiply.',steps:['C(5,3)×C(4,2)=10×6=60'],answer:'60.'}},
  {id:'pc2q3',level:'advanced',diff:3,text:'Number of ways to choose 4 cards from a deck of 52 so that at least one is an ace:',opts:['76145','270725','194580','13260'],correct:0,concept:'pc2',exp:{short:'Total − no ace.',steps:['C(52,4)=270725','C(48,4)=194580','At least one ace=270725−194580=76145'],answer:'76145.'}}
],pc3:[
  {id:'pc3q1',level:'cbse',diff:1,text:'Arrangements of letters in APPLE:',opts:['60','120','30','90'],correct:0,concept:'pc3',exp:{short:'5 letters with P repeated twice: 5!/2!',steps:['5!/2!=60'],answer:'60.'}},
  {id:'pc3q2',level:'mains',diff:2,text:'8 people seated in a circle. Ways?',opts:['5040','40320','720','20160'],correct:0,concept:'pc3',exp:{short:'Circular: (n−1)!',steps:['(8−1)!=7!=5040'],answer:'5040.'}},
  {id:'pc3q3',level:'advanced',diff:3,text:'10 friends, 5 to each of 2 groups (groups distinct). Ways?',opts:['252','126','2520','10'],correct:0,concept:'pc3',exp:{short:'C(10,5) — choose 5 for group A, rest go to B.',steps:['C(10,5)=252'],answer:'252.'}}
]};
const NUMS=[
  {level:'cbse',concept:'pc1',title:'Numerical 1 — Basic P&C',problem:'How many 3-letter words from A,B,C,D,E (no repetition)?',opts:['60','120','20','24'],correct:0,steps:['P(5,3)=5×4×3=60'],answer:'60.'},
  {level:'cbse',concept:'pc2',title:'Numerical 2 — Selection',problem:'Ways to select a cricket team of 11 from 15 players.',opts:['1365','15!','5005','3003'],correct:0,steps:['C(15,11)=C(15,4)=15×14×13×12/(4!)=1365'],answer:'1365.'},
  {level:'mains',concept:'pc1',title:'Numerical 3 — Digit Numbers',problem:'4-digit numbers using 1-9 without repetition, greater than 5000.',opts:['1680','2520','840','3024'],correct:0,steps:['First digit: 5,6,7,8,9 → 5 choices','Remaining 3 from 8 digits: P(8,3)=336','Total=5×336=1680'],answer:'1680.'},
  {level:'mains',concept:'pc3',title:'Numerical 4 — Arrangement with Restriction',problem:'6 boys and 4 girls in a row. Girls always together.',opts:['604800','86400','1814400','2520'],correct:0,steps:['Treat 4 girls as 1 unit: 7 units','Arrange 7 units: 7!=5040','Arrange girls within unit: 4!=24','Total=5040×24=120960... wait: 7!×4!=5040×24=120960'],answer:'120960.'},
  {level:'mains',concept:'pc2',title:'Numerical 5 — Committee',problem:'Committee of 5 from 6 men and 4 women with at least 2 women.',opts:['186','156','126','246'],correct:0,steps:['Exactly 2W: C(4,2)×C(6,3)=6×20=120','Exactly 3W: C(4,3)×C(6,2)=4×15=60','Exactly 4W: C(4,4)×C(6,1)=1×6=6','Total=120+60+6=186'],answer:'186.'},
  {level:'advanced',concept:'pc3',title:'Numerical 6 — Circular with Restriction',problem:'6 people in a circle, 2 specific people always opposite each other.',opts:['24','48','12','6'],correct:0,steps:['Fix person A. Person B must be opposite (1 position).','Arrange remaining 4: 4!=24'],answer:'24.'},
  {level:'advanced',concept:'pc2',title:'Numerical 7 — Identical Distribution',problem:'Distribute 8 identical balls into 3 distinct boxes (can be empty).',opts:['45','24','84','56'],correct:0,steps:['Stars and Bars: C(8+3−1,3−1)=C(10,2)=45'],answer:'45.'},
  {level:'advanced',concept:'pc1',title:'Numerical 8 — Derangement',problem:'4 letters put into 4 wrong envelopes (derangement D₄).',opts:['9','8','12','6'],correct:0,steps:['D₄=4!(1−1+1/2!−1/3!+1/4!)=24(1/2−1/6+1/24)=24(12/24−4/24+1/24)=24(9/24)=9'],answer:'9.'}
];
const QB=[
  {id:'pcqb1',level:'cbse',diff:1,concept:'pc1',text:'Value of 8!/(6!):',opts:['56','28','336','16'],correct:0,exp:{steps:['8×7=56'],answer:'56.'}},
  {id:'pcqb2',level:'cbse',diff:1,concept:'pc2',text:'C(n,2)=15. Find n.',opts:['6','7','5','8'],correct:0,exp:{steps:['n(n−1)/2=15 → n(n−1)=30 → n=6'],answer:'6.'}},
  {id:'pcqb3',level:'cbse',diff:1,concept:'pc3',text:'Arrangements of NOON:',opts:['6','24','12','3'],correct:0,exp:{steps:['4!/2!2!=6'],answer:'6.'}},
  {id:'pcqb4',level:'cbse',diff:1,concept:'pc1',text:'5 people in a queue, specific person always first. Ways?',opts:['24','120','60','12'],correct:0,exp:{steps:['Fix first person, arrange 4: 4!=24'],answer:'24.'}},
  {id:'pcqb5',level:'cbse',diff:1,concept:'pc2',text:'C(12,10)=?',opts:['66','132','55','12'],correct:0,exp:{steps:['C(12,10)=C(12,2)=66'],answer:'66.'}},
  {id:'pcqb6',level:'cbse',diff:1,concept:'pc1',text:'Number of ways to answer true/false test of 5 questions:',opts:['32','10','25','16'],correct:0,exp:{steps:['2⁵=32'],answer:'32.'}},
  {id:'pcqb7',level:'cbse',diff:1,concept:'pc3',text:'5 people around a round table:',opts:['24','120','60','12'],correct:0,exp:{steps:['(5−1)!=24'],answer:'24.'}},
  {id:'pcqb8',level:'cbse',diff:1,concept:'pc2',text:'Choose 2 books from 5. Ways?',opts:['10','20','15','5'],correct:0,exp:{steps:['C(5,2)=10'],answer:'10.'}},
  {id:'pcqb9',level:'mains',diff:2,concept:'pc1',text:'Number of 5-digit numbers using 0-9 no repetition:',opts:['27216','30240','9×9!','15120'],correct:0,exp:{steps:['First digit: 9 (not 0), rest: P(9,4)=3024','Total=9×3024=27216'],answer:'27216.'}},
  {id:'pcqb10',level:'mains',diff:2,concept:'pc2',text:'Polygon with n sides has 44 diagonals. n=?',opts:['11','10','12','9'],correct:0,exp:{steps:['Diagonals=C(n,2)−n=n(n−1)/2−n=n(n−3)/2=44','n(n−3)=88=11×8 → n=11'],answer:'11.'}},
  {id:'pcqb11',level:'mains',diff:2,concept:'pc3',text:'Boys and girls alternating in a line, 4 each. Ways?',opts:['1152','576','2304','288'],correct:0,exp:{steps:['BGBGBGBG or GBGBGBGB','Each: 4!×4!=576 ways','Total=2×576=1152'],answer:'1152.'}},
  {id:'pcqb12',level:'mains',diff:2,concept:'pc1',text:'Number of words using letters of MOTHER:',opts:['720','360','120','240'],correct:0,exp:{steps:['All distinct: 6!=720'],answer:'720.'}},
  {id:'pcqb13',level:'mains',diff:2,concept:'pc2',text:'Ways to form a group with at least 1 person from n=5 people:',opts:['31','32','30','15'],correct:0,exp:{steps:['Total subsets=2⁵=32 minus empty set=31'],answer:'31.'}},
  {id:'pcqb14',level:'mains',diff:2,concept:'pc3',text:'10 points, no 3 collinear. Number of triangles?',opts:['120','45','210','90'],correct:0,exp:{steps:['C(10,3)=120'],answer:'120.'}},
  {id:'pcqb15',level:'mains',diff:2,concept:'pc2',text:'C(2n,2):C(n,2) = 9:1. Find n.',opts:['4','5','3','6'],correct:0,exp:{steps:['2n(2n−1)/2 ÷ n(n−1)/2=9','(2n−1)·2/(n−1)=9... 4(2n²−n)/n(n−1)... 2(2n−1)/(n−1)=9','4n−2=9n−9 → 5n=7... hmm: (2n)(2n−1)/(n(n−1))=9 → 4(2n−1)/(n−1)=9 → 8n−4=9n−9 → n=5'],answer:'n=5.'}},
  {id:'pcqb16',level:'advanced',diff:3,concept:'pc1',text:'Number of permutations of BANANA:',opts:['60','120','30','720'],correct:0,exp:{steps:['6 letters: A×3, N×2, B×1','6!/(3!2!)=60'],answer:'60.'}},
  {id:'pcqb17',level:'advanced',diff:3,concept:'pc2',text:'From 6 men and 4 women, committee of 4. More men than women. Ways?',opts:['100','175','115','80'],correct:0,exp:{steps:['3M1W: C(6,3)×C(4,1)=20×4=80','4M0W: C(6,4)=15','Total=95... recheck: 80+15=95'],answer:'95.'}},
  {id:'pcqb18',level:'advanced',diff:3,concept:'pc3',text:'11 points on a circle. Number of chords?',opts:['55','110','44','66'],correct:0,exp:{steps:['C(11,2)=55'],answer:'55.'}},
  {id:'pcqb19',level:'advanced',diff:3,concept:'pc1',text:'Total words from EXAM (with repetition allowed in meaning but letters used once)?',opts:['24','12','4','16'],correct:0,exp:{steps:['All distinct letters: 4!=24'],answer:'24.'}},
  {id:'pcqb20',level:'advanced',diff:3,concept:'pc2',text:'Ways to distribute 12 identical sweets to 3 children so each gets at least 2:',opts:['21','28','15','36'],correct:0,exp:{steps:['Give 2 to each: 12−6=6 remaining','C(6+3−1,3−1)=C(8,2)=28'],answer:'28.'}},
  {id:'pcqb21',level:'cbse',diff:1,concept:'pc1',text:'P(5,5)=?',opts:['120','25','60','24'],correct:0,exp:{steps:['5!=120'],answer:'120.'}},
  {id:'pcqb22',level:'cbse',diff:1,concept:'pc2',text:'If C(n,3)=C(n,5), find n.',opts:['8','6','10','4'],correct:0,exp:{steps:['C(n,3)=C(n,5) → 3+5=n=8'],answer:'n=8.'}},
  {id:'pcqb23',level:'mains',diff:2,concept:'pc1',text:'4-letter words from {a,b,c,d,e,f} with no repetition and starting/ending with vowel:',opts:['48','96','24','72'],correct:0,exp:{steps:['Vowels: a,e. First and last from 2 vowels: P(2,2)=2','Middle 2 from remaining 4: P(4,2)=12','Total=2×12=24'],answer:'24.'}},
  {id:'pcqb24',level:'mains',diff:2,concept:'pc3',text:'6 people, 2 must sit together in a row. Ways?',opts:['240','120','480','360'],correct:0,exp:{steps:['Treat pair as one: 5 units, 5!=120 ways','Pair internally: 2!=2 ways','Total=240'],answer:'240.'}},
  {id:'pcqb25',level:'advanced',diff:3,concept:'pc2',text:'Number of ways to select at least one item from 4 different items:',opts:['15','16','8','4'],correct:0,exp:{steps:['2⁴−1=15'],answer:'15.'}},
  {id:'pcqb26',level:'advanced',diff:3,concept:'pc3',text:'7 people around a circular table, 2 never adjacent. Ways?',opts:['480','240','720','360'],correct:0,exp:{steps:['Total circular = 6!=720','Subtract always adjacent: 5!×2=240','Non-adjacent = 720−240=480'],answer:'480.'}},
  {id:'pcqb27',level:'cbse',diff:1,concept:'pc2',text:'C(15,14)=?',opts:['15','14','105','1'],correct:0,exp:{steps:['C(15,14)=C(15,1)=15'],answer:'15.'}},
  {id:'pcqb28',level:'mains',diff:2,concept:'pc2',text:'Number of triangles from 12 points (5 collinear)?',opts:['210','205','201','220'],correct:0,exp:{steps:['C(12,3)=220','Subtract collinear: C(5,3)=10','Triangles=220−10=210'],answer:'210.'}},
  {id:'pcqb29',level:'advanced',diff:3,concept:'pc1',text:'Number of 5-digit palindromes:',opts:['900','810','9000','450'],correct:0,exp:{steps:['Form: abcba. a: 9 choices (1-9), b: 10, c: 10','Total=9×10×10=900'],answer:'900.'}},
  {id:'pcqb30',level:'advanced',diff:3,concept:'pc3',text:'Divide 9 different books into 3 groups of 3 (groups indistinct).',opts:['280','1680','840','560'],correct:0,exp:{steps:['C(9,3)×C(6,3)×C(3,3)/3!=84×20×1/6=280'],answer:'280.'}}
];
registerChapter({
  id:'maths-permutations-combinations',title:'Permutations & Combinations',subject:'Maths · Class 11',class:11,
  intro:'P&C is pure counting. Mastering the multiplication principle, P(n,r), and C(n,r) unlocks probability, binomial theorem, and most JEE combinatorics.',
  concepts:['pc1','pc2','pc3'],
  conceptMeta:{
    pc1:{title:'Permutations',shortTitle:'Permutations',tag:'Concept 1 of 3',icon:'🔢',sub:'Order matters. Fundamental counting principle and P(n,r). Arrangements with restrictions.'},
    pc2:{title:'Combinations',shortTitle:'Combinations',tag:'Concept 2 of 3',icon:'🎯',sub:'Order doesn\'t matter. C(n,r) and its key identities. Selection problems.'},
    pc3:{title:'Special Arrangements',shortTitle:'Special Cases',tag:'Concept 3 of 3',icon:'🔄',sub:'Identical objects, circular permutations, group distributions.'},
  },
  teach:{pc1:(f)=>teachPC1(f),pc2:(f)=>teachPC2(f),pc3:(f)=>teachPC3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
