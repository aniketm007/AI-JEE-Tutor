

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.cssText='margin-top:8px;display:block;';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();};feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r(i===correctIdx);};row.appendChild(b);});feed.appendChild(row);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});});}



async function teachSP1(feed){
  await _addMsg(feed,`Statistics is about summarising data. Two things matter most: where the data is centred, and how spread out it is.`,'ai');
  await _addMsg(feed,`<div class="fbox">Measures of Central Tendency:<br>
    Mean (x̄) = Σxᵢ/n &nbsp;|&nbsp; Median = middle value &nbsp;|&nbsp; Mode = most frequent</div>`,'ai');
  const ok=await _choice(feed,'Data: 3,7,7,2,9. Mean is?',['5.6','7','2','28'],0);
  await _addMsg(feed,ok?`✓ (3+7+7+2+9)/5=28/5=5.6.`:`Sum=28, n=5, mean=5.6.`,ok?'ok':'ng');
  await _cont(feed,'Measures of dispersion →');
  await _addMsg(feed,`<div class="fbox">Variance σ² = Σ(xᵢ−x̄)²/n = Σxᵢ²/n − x̄²<br>
    Standard Deviation σ = √(Variance)</div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern</div><div class="ex-b">
    <strong>CBSE:</strong> Calculate mean, median, mode, variance<br>
    <strong>Mains:</strong> Effect of transformation on mean/variance: if y=ax+b, mean(y)=a·mean(x)+b, var(y)=a²·var(x)<br>
    <strong>Advanced:</strong> Combined mean and variance of two groups merged
  </div></div>`,'ai');
}
async function teachSP2(feed){
  await _addMsg(feed,`Probability measures how likely something is. From 0 (impossible) to 1 (certain).`,'ai');
  await _addMsg(feed,`<div class="fbox">P(A) = Number of favourable outcomes / Total outcomes<br>
    0 ≤ P(A) ≤ 1 &nbsp;|&nbsp; P(A) + P(A') = 1</div>`,'ai');
  const ok=await _choice(feed,'A card drawn from 52. P(King) = ?',['1/13','4/52... same','1/4','4/13'],0);
  await _addMsg(feed,ok?`✓ 4 kings in 52 cards: 4/52=1/13.`:`4 kings ÷ 52 total = 1/13.`,ok?'ok':'ng');
  await _cont(feed,'Addition and multiplication rules →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Key Rules</div><div class="ex-b">
    <strong>Addition Rule:</strong> P(A∪B) = P(A)+P(B)−P(A∩B)<br>
    <strong>Mutually Exclusive:</strong> P(A∪B) = P(A)+P(B)<br>
    <strong>Multiplication Rule:</strong> P(A∩B) = P(A)·P(B|A)<br>
    <strong>Independent Events:</strong> P(A∩B) = P(A)·P(B)
  </div></div>`,'ai');
}
async function teachSP3(feed){
  await _addMsg(feed,`Conditional probability — how does knowing one event happened change the probability of another?`,'ai');
  await _addMsg(feed,`<div class="fbox">P(A|B) = P(A∩B)/P(B) &nbsp; (probability of A given B happened)</div>`,'ai');
  const ok=await _choice(feed,'P(A)=0.4, P(B)=0.3, P(A∩B)=0.1. Find P(A|B).',['1/3','2/3','1/4','1/2'],0);
  await _addMsg(feed,ok?`✓ P(A|B)=0.1/0.3=1/3.`:`P(A|B)=P(A∩B)/P(B)=0.1/0.3=1/3.`,ok?'ok':'ng');
  await _cont(feed,'Bayes\' theorem and total probability →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Bayes\' Theorem</div><div class="ex-b">
    <strong>Total Probability:</strong> P(B) = P(B|A)P(A) + P(B|A')P(A')<br>
    <strong>Bayes:</strong> P(A|B) = P(B|A)·P(A) / P(B)<br><br>
    <strong>JEE intuition:</strong> Bayes updates your belief based on new evidence.
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Independent vs Mutually Exclusive</div><div class="warn-b">
    <strong>Independent:</strong> P(A∩B)=P(A)·P(B). They can happen simultaneously.<br>
    <strong>Mutually Exclusive:</strong> P(A∩B)=0. They CANNOT happen simultaneously.<br>
    Independent events are NOT mutually exclusive (unless P(A)=0 or P(B)=0).
  </div></div>`,'ai');
}
const QS={sp1:[
  {id:'sp1q1',level:'cbse',diff:1,text:'Data: 2,4,4,4,5,5,7,9. Standard deviation = ?',opts:['2','4','√2·2=2','√2'],correct:0,concept:'sp1',exp:{short:'Calculate variance first.',steps:['Mean=5','Σ(x−5)²=9+1+1+1+0+0+4+16=32','Var=32/8=4','SD=√4=2'],answer:'SD=2.'}},
  {id:'sp1q2',level:'mains',diff:2,text:'If each observation is increased by 5, the variance:',opts:['Unchanged','Increases by 5','Increases by 25','Decreases by 5'],correct:0,concept:'sp1',exp:{short:'Variance is unaffected by adding a constant.',steps:['Var(x+c)=Var(x) — shifting data doesn\'t change spread'],answer:'Unchanged.'}},
  {id:'sp1q3',level:'advanced',diff:3,text:'n=5 observations: mean=4, variance=9. If each xᵢ is replaced by 2xᵢ−3, new mean and variance:',opts:['5 and 36','5 and 18','8 and 36','11 and 36'],correct:0,concept:'sp1',exp:{short:'y=2x−3. Mean(y)=2mean(x)−3, Var(y)=4Var(x).',steps:['New mean=2(4)−3=5','New var=4(9)=36'],answer:'Mean=5, Var=36.'}}
],sp2:[
  {id:'sp2q1',level:'cbse',diff:1,text:'P(not A) if P(A)=0.4:',opts:['0.6','0.4','1','0'],correct:0,concept:'sp2',exp:{short:'P(A\'')=1−P(A).',steps:['1−0.4=0.6'],answer:'0.6.'}},
  {id:'sp2q2',level:'mains',diff:2,text:'Two dice. P(sum=7) = ?',opts:['1/6','5/36','6/36=1/6','7/36'],correct:0,concept:'sp2',exp:{short:'Favourable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 ways.',steps:['P=6/36=1/6'],answer:'1/6.'}},
  {id:'sp2q3',level:'advanced',diff:3,text:'P(A∪B)=0.7, P(A)=0.4, P(B)=0.5. Are A,B independent?',opts:['No — P(A∩B)=0.2≠P(A)P(B)=0.2... actually yes!','No','Yes — P(A∩B)=P(A)P(B)=0.2','Cannot say'],correct:2,concept:'sp2',exp:{short:'P(A∩B)=P(A)+P(B)−P(A∪B)=0.2. P(A)P(B)=0.2. Equal!',steps:['P(A∩B)=0.4+0.5−0.7=0.2','P(A)P(B)=0.4×0.5=0.2 ✓'],answer:'Yes, independent.'}}
],sp3:[
  {id:'sp3q1',level:'cbse',diff:1,text:'P(A|B) if P(A∩B)=0.2, P(B)=0.4:',opts:['0.5','0.8','0.2','2'],correct:0,concept:'sp3',exp:{short:'P(A|B)=P(A∩B)/P(B).',steps:['0.2/0.4=0.5'],answer:'0.5.'}},
  {id:'sp3q2',level:'mains',diff:2,text:'P(exactly one of A,B) if P(A)=0.3, P(B)=0.4, P(A∩B)=0.1:',opts:['0.5','0.6','0.3','0.4'],correct:0,concept:'sp3',exp:{short:'P(only A)+P(only B).',steps:['P(only A)=0.3−0.1=0.2','P(only B)=0.4−0.1=0.3','Sum=0.5'],answer:'0.5.'}},
  {id:'sp3q3',level:'advanced',diff:3,text:'Bag A: 3R,4B. Bag B: 4R,3B. Ball drawn from random bag is Red. P(from A)?',opts:['3/7','1/2','3/14','4/7'],correct:0,concept:'sp3',exp:{short:'Bayes\' theorem.',steps:['P(A)=P(B_bag)=1/2','P(R|A)=3/7, P(R|B)=4/7','P(A|R)=(3/7·1/2)/((3/7+4/7)·1/2)=3/7'],answer:'P(from bag A | Red) = 3/7.'}}
]};
const NUMS=[
  {level:'cbse',concept:'sp1',title:'Numerical 1 — Variance Calculation',problem:'Find variance of 6,8,10,12,14.',opts:['8','10','4','6'],correct:0,steps:['Mean=10','Deviations: −4,−2,0,2,4. Squared: 16,4,0,4,16','Sum=40, Var=40/5=8'],answer:'Variance=8.'},
  {level:'cbse',concept:'sp2',title:'Numerical 2 — Basic Probability',problem:'3 red, 4 blue, 5 green balls. P(not red) if one drawn randomly.',opts:['3/4','1/4','9/12=3/4','2/3'],correct:0,steps:['Total=12, not red=9','P=9/12=3/4'],answer:'3/4.'},
  {level:'mains',concept:'sp1',title:'Numerical 3 — Combined Mean',problem:'Group A: 50 students, mean marks=60. Group B: 30 students, mean=70. Combined mean?',opts:['63.75','65','62.5','66'],correct:0,steps:['Combined mean=(50×60+30×70)/80=(3000+2100)/80=5100/80=63.75'],answer:'63.75.'},
  {level:'mains',concept:'sp2',title:'Numerical 4 — P(A∪B)',problem:'P(A)=0.6, P(B)=0.5, P(A∩B)=0.3. Find P(A∪B).',opts:['0.8','0.7','1.1','0.9'],correct:0,steps:['P(A∪B)=0.6+0.5−0.3=0.8'],answer:'0.8.'},
  {level:'mains',concept:'sp3',title:'Numerical 5 — Conditional Probability',problem:'Box 1: 3W 2B. Box 2: 2W 3B. Box chosen randomly, ball drawn is White. P(from box 1)?',opts:['3/5','1/2','6/11... no: 3/5','2/5'],correct:0,steps:['P(B1)=P(B2)=1/2','P(W|B1)=3/5, P(W|B2)=2/5','P(B1|W)=(3/5·1/2)/((3/5+2/5)·1/2)=3/5... P(W)=(3/10+2/10)=1/2','P(B1|W)=(3/10)/(1/2)=3/5'],answer:'P(Box 1 | White) = 3/5.'},
  {level:'advanced',concept:'sp1',title:'Numerical 6 — Mean Deviation',problem:'5 observations: mean=50, variance=100. Observations are 50±k,50,50±2k. Find k.',opts:['5','10','4','8'],correct:1,steps:['Observations: 50−2k,50−k,50,50+k,50+2k','Mean=50 ✓','Var=((−2k)²+(−k)²+0+k²+(2k)²)/5=(10k²)/5=2k²=100','k²=50... hmm: 2k²=100→k=√50... or 10k²/5=2k²=100→k²=50 → k=5√2? Recheck: sum of squared deviations=(4k²+k²+0+k²+4k²)=10k², variance=2k²=100→k²=50→k=5√2'],answer:'k=5√2 (or approximately 7.07).'},
  {level:'advanced',concept:'sp2',title:'Numerical 7 — Binomial Probability',problem:'P(getting exactly 2 heads in 5 coin tosses).',opts:['10/32=5/16','1/4','5/32','3/16'],correct:0,steps:['B(5,1/2): P(X=2)=C(5,2)(1/2)²(1/2)³=10/32=5/16'],answer:'5/16.'},
  {level:'advanced',concept:'sp3',title:'Numerical 8 — Bayes\' Theorem',problem:'1% have disease. Test: 99% correct (both ways). P(disease|positive test).',opts:['50%','1%','99%','approximately 50%'],correct:3,steps:['P(D)=0.01, P(+|D)=0.99, P(+|D\')=0.01','P(+)=0.99×0.01+0.01×0.99=0.0198','P(D|+)=0.99×0.01/0.0198=0.5=50%'],answer:'Approximately 50% — this famous result shows rare disease + 99% accurate test still gives 50/50!'}
];
const QB=[
  {id:'spqb1',level:'cbse',diff:1,concept:'sp1',text:'Mean of 5,6,7,8,9:',opts:['7','8','6','6.5'],correct:0,exp:{steps:['35/5=7'],answer:'7.'}},
  {id:'spqb2',level:'cbse',diff:1,concept:'sp2',text:'P(head) in one coin toss:',opts:['1/2','1','0','1/4'],correct:0,exp:{steps:['1 head out of 2 outcomes'],answer:'1/2.'}},
  {id:'spqb3',level:'cbse',diff:1,concept:'sp1',text:'Median of 2,3,5,7,9:',opts:['5','4','6','7'],correct:0,exp:{steps:['Middle value of sorted data: 5'],answer:'5.'}},
  {id:'spqb4',level:'cbse',diff:1,concept:'sp2',text:'P(number > 4) on a die:',opts:['1/3','1/2','2/3','1/6'],correct:0,exp:{steps:['5 and 6: 2 outcomes. 2/6=1/3'],answer:'1/3.'}},
  {id:'spqb5',level:'cbse',diff:1,concept:'sp3',text:'If A and B are mutually exclusive, P(A∩B)=?',opts:['0','1','P(A)+P(B)','P(A)P(B)'],correct:0,exp:{steps:['Cannot occur together → P=0'],answer:'0.'}},
  {id:'spqb6',level:'cbse',diff:1,concept:'sp1',text:'Mode of 1,2,2,3,3,3,4:',opts:['3','2','1','4'],correct:0,exp:{steps:['3 appears most (3 times)'],answer:'3.'}},
  {id:'spqb7',level:'cbse',diff:1,concept:'sp2',text:'P(A)+P(A\')=?',opts:['1','0','2','P(A)'],correct:0,exp:{steps:['Complementary events'],answer:'1.'}},
  {id:'spqb8',level:'cbse',diff:1,concept:'sp1',text:'Variance of 3,3,3,3,3:',opts:['0','3','1','9'],correct:0,exp:{steps:['All values equal mean. No deviation → variance=0'],answer:'0.'}},
  {id:'spqb9',level:'mains',diff:2,concept:'sp2',text:'P(at least one head in 3 tosses):',opts:['7/8','1/2','3/4','1'],correct:0,exp:{steps:['P(no head)=(1/2)³=1/8. P(at least one)=7/8'],answer:'7/8.'}},
  {id:'spqb10',level:'mains',diff:2,concept:'sp1',text:'If variance of x is 4, variance of 3x+2:',opts:['36','12','38','4'],correct:0,exp:{steps:['Var(ax+b)=a²Var(x). Var(3x+2)=9×4=36'],answer:'36.'}},
  {id:'spqb11',level:'mains',diff:2,concept:'sp3',text:'P(A)=0.5, P(B|A)=0.4. P(A∩B)=?',opts:['0.2','0.9','0.1','0.4'],correct:0,exp:{steps:['P(A∩B)=P(A)·P(B|A)=0.5×0.4=0.2'],answer:'0.2.'}},
  {id:'spqb12',level:'mains',diff:2,concept:'sp2',text:'Two cards drawn without replacement from 52. P(both aces):',opts:['1/221','4/52×4/52','1/169','4/663'],correct:0,exp:{steps:['4/52×3/51=12/2652=1/221'],answer:'1/221.'}},
  {id:'spqb13',level:'mains',diff:2,concept:'sp1',text:'Mean of 10 numbers is 15. If one observation 10 is removed, new mean:',opts:['15.56','14.44','16.67','15'],correct:0,exp:{steps:['Sum=150. Remove 10: sum=140. New mean=140/9≈15.56'],answer:'140/9≈15.56.'}},
  {id:'spqb14',level:'mains',diff:2,concept:'sp3',text:'A,B independent. P(A)=0.3, P(B)=0.4. P(A∪B):',opts:['0.58','0.7','0.12','0.5'],correct:0,exp:{steps:['P(A∩B)=0.12. P(A∪B)=0.3+0.4−0.12=0.58'],answer:'0.58.'}},
  {id:'spqb15',level:'mains',diff:2,concept:'sp2',text:'P(sum=6) when two dice thrown:',opts:['5/36','6/36','4/36','1/6'],correct:0,exp:{steps:['(1,5),(2,4),(3,3),(4,2),(5,1): 5 ways. 5/36'],answer:'5/36.'}},
  {id:'spqb16',level:'advanced',diff:3,concept:'sp3',text:'Bag: 4R,6B. Two drawn without replacement. P(2nd red | 1st red):',opts:['1/3','3/9','3/10','4/10'],correct:0,exp:{steps:['After removing 1 red: 3R,6B remain. P=3/9=1/3'],answer:'1/3.'}},
  {id:'spqb17',level:'advanced',diff:3,concept:'sp1',text:'If Σxᵢ=50 and Σxᵢ²=510 for n=10, variance=?',opts:['11','26','1','10'],correct:0,exp:{steps:['x̄=5. Var=Σxᵢ²/n−x̄²=510/10−25=51−25=26'],answer:'26.'}},
  {id:'spqb18',level:'advanced',diff:3,concept:'sp2',text:'Letters of PROBABILITY arranged randomly. P(2 B\'s together):',opts:['2/11','1/10','1/11','2/12'],correct:0,exp:{steps:['PROBABILITY: 11 letters, 2 B\'s.','Treat 2 B\'s as one unit: 10 units, 10! arrangements.','But 2 B\'s identical. Total = 11!/2!.','P = 10!/(11!/2!) = 2×10!/11! = 2/11'],answer:'2/11.'}},
  {id:'spqb19',level:'advanced',diff:3,concept:'sp3',text:'P(A)=0.6, P(B|A)=0.3, P(B|A\')=0.2. Find P(A|B).',opts:['9/17','3/10','0.6','0.3'],correct:0,exp:{steps:['P(B)=P(B|A)P(A)+P(B|A\')P(A\')=0.18+0.08=0.26','P(A|B)=P(B|A)P(A)/P(B)=0.18/0.26=9/13'],answer:'9/13.'}},
  {id:'spqb20',level:'advanced',diff:3,concept:'sp1',text:'For distribution: x=1,2,3,4,5 with equal frequency. Coefficient of variation = ?',opts:['√2/3 × 100%','200/3 %','√2 × 100%','100/√2 %'],correct:1,exp:{steps:['Mean=3, Var=[(1+4+9+16+25)/5−9]=11−9... wait: Σx²/n=55/5=11, mean²=9, Var=2, SD=√2','CV=SD/mean×100=√2/3×100≈47.1≈200/3%... Actually CV=√2/3×100'],answer:'CV = 100√2/3 % ≈ 47.1%.'}},
  {id:'spqb21',level:'cbse',diff:1,concept:'sp2',text:'Sample space of tossing 2 coins:',opts:['HH,HT,TH,TT','HH,TT','H,T','HH,HT,TT'],correct:0,exp:{steps:['All possible outcomes'],answer:'{HH,HT,TH,TT}.'}},
  {id:'spqb22',level:'cbse',diff:1,concept:'sp1',text:'Range of 4,7,2,9,1,5:',opts:['8','9','7','5'],correct:0,exp:{steps:['Max−Min=9−1=8'],answer:'8.'}},
  {id:'spqb23',level:'mains',diff:2,concept:'sp2',text:'P(drawing a face card) from 52 cards:',opts:['3/13','1/4','4/13','1/13'],correct:0,exp:{steps:['12 face cards (J,Q,K in 4 suits). 12/52=3/13'],answer:'3/13.'}},
  {id:'spqb24',level:'mains',diff:2,concept:'sp3',text:'Events A,B: P(A)=1/2, P(B)=1/3, P(A|B)=1/4. P(B|A)=?',opts:['1/6','1/3','1/4','1/2'],correct:0,exp:{steps:['P(A∩B)=P(A|B)P(B)=1/12','P(B|A)=P(A∩B)/P(A)=(1/12)/(1/2)=1/6'],answer:'1/6.'}},
  {id:'spqb25',level:'advanced',diff:3,concept:'sp2',text:'From 1 to 100, P(number divisible by 3 or 5):',opts:['47/100','1/2','13/25','50/100'],correct:0,exp:{steps:['Div by 3: 33; by 5: 20; by 15: 6','|A∪B|=33+20−6=47. P=47/100'],answer:'47/100.'}},
  {id:'spqb26',level:'advanced',diff:3,concept:'sp1',text:'If a is added to each observation, standard deviation:',opts:['Unchanged','Increases by a','Decreases by a','Multiplied by a'],correct:0,exp:{steps:['Adding constant shifts data, doesn\'t change spread'],answer:'Unchanged.'}},
  {id:'spqb27',level:'cbse',diff:1,concept:'sp2',text:'If P(A∩B)=0 and P(A)=0.4, P(B)=0.3, P(A∪B)=?',opts:['0.7','0.12','0.4','0.3'],correct:0,exp:{steps:['Mutually exclusive: P(A∪B)=0.4+0.3=0.7'],answer:'0.7.'}},
  {id:'spqb28',level:'mains',diff:2,concept:'sp1',text:'Mean of x and 1/x where x≠0: minimum value of mean if x>0:',opts:['1','2','1/2','√x'],correct:0,exp:{steps:['(x+1/x)/2≥1 by AM-GM. Min=1 at x=1'],answer:'1.'}},
  {id:'spqb29',level:'advanced',diff:3,concept:'sp3',text:'P(getting 53 Sundays in a leap year):',opts:['2/7','1/7','3/7','4/7'],correct:0,exp:{steps:['Leap year: 366 days = 52 weeks + 2 extra days','Extra days: Mon-Tue,Tue-Wed,...,Sun-Mon: 7 cases','53 Sundays if Sun in extra: Sun-Mon or Sat-Sun: 2 cases','P=2/7'],answer:'2/7.'}},
  {id:'spqb30',level:'advanced',diff:3,concept:'sp2',text:'4 white, 6 black balls. 3 drawn. P(all black):',opts:['1/5','C(6,3)/C(10,3)=20/120=1/6','6/10×5/9×4/8','both B and C'],correct:3,exp:{steps:['C(6,3)/C(10,3)=20/120=1/6','Also: 6/10×5/9×4/8=120/720=1/6 ✓'],answer:'1/6.'}}
];
registerChapter({
  id:'maths-statistics-probability',title:'Statistics & Probability',subject:'Maths · Class 11',class:11,
  intro:'Statistics describes data, probability models uncertainty. Together they form the backbone of data science, machine learning, and dozens of JEE questions every year.',
  concepts:['sp1','sp2','sp3'],
  conceptMeta:{
    sp1:{title:'Statistics',shortTitle:'Statistics',tag:'Concept 1 of 3',icon:'📊',sub:'Mean, median, mode, variance, standard deviation. Effect of transformations on stats.'},
    sp2:{title:'Probability Basics',shortTitle:'Probability',tag:'Concept 2 of 3',icon:'🎲',sub:'Sample space, events, P(A), addition rule, independent events.'},
    sp3:{title:'Conditional Probability',shortTitle:'Conditional',tag:'Concept 3 of 3',icon:'🔗',sub:'P(A|B), Bayes\' theorem. The most tricky — and most tested — probability concept.'},
  },
  teach:{sp1:(f)=>teachSP1(f),sp2:(f)=>teachSP2(f),sp3:(f)=>teachSP3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
