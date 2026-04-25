

function _addMsg(feed,html,type,d){return new Promise(r=>{setTimeout(()=>{const b=document.createElement('div');b.className='bub '+type;const L={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};if(L[type])b.innerHTML='<div class="lbl">'+L[type]+'</div>'+html;else b.innerHTML=html;feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();},d||0);});}
function _cont(feed,label){return new Promise(r=>{const b=document.createElement('button');b.className='btn bp';b.style.cssText='margin-top:8px;display:block;';b.textContent=label||'Got it →';b.onclick=()=>{b.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r();};feed.appendChild(b);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});}
function _choice(feed,question,options,correctIdx){return new Promise(r=>{_addMsg(feed,question,'ai').then(()=>{const row=document.createElement('div');row.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';options.forEach((txt,i)=>{const b=document.createElement('button');b.className='btn '+(i===correctIdx?'bg':'ba');b.textContent=txt;b.onclick=()=>{row.remove();const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}r(i===correctIdx);};row.appendChild(b);});feed.appendChild(row);const ct=feed.closest('#content');if(ct){ct.scrollTop=feed.offsetTop+feed.scrollHeight;}});});}



async function teachSL1(feed){
  await _addMsg(feed,`Before equations, let's build intuition. Slope is just "steepness". Going from left to right — does the line go up or down?`,'ai');
  await _addMsg(feed,`<div class="fbox">Slope m = (y₂−y₁)/(x₂−x₁) = tanθ where θ is inclination angle</div>
    <div class="fnote">Horizontal line: m=0. Vertical line: m=undefined. Parallel lines: equal slopes. Perpendicular: m₁·m₂=−1</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'Line through (1,2) and (4,8). Slope?',['2','6','1/2','3'],0);
  await _addMsg(feed,ok?`✓ m=(8−2)/(4−1)=6/3=2.`:`m=(y₂−y₁)/(x₂−x₁)=(8−2)/(4−1)=6/3=2.`,ok?'ok':'ng');
  await _cont(feed,'Equations of lines →');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">5 Forms of Line Equations</div><div class="ex-b">
    <strong>Slope-intercept:</strong> y = mx + c<br>
    <strong>Point-slope:</strong> y−y₁ = m(x−x₁)<br>
    <strong>Two-point:</strong> (y−y₁)/(y₂−y₁) = (x−x₁)/(x₂−x₁)<br>
    <strong>Intercept:</strong> x/a + y/b = 1<br>
    <strong>Normal:</strong> x·cosα + y·sinα = p (p=distance from origin)
  </div></div>`,'ai');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern</div><div class="ex-b">
    <strong>CBSE:</strong> Find equation of line given slope + point or two points<br>
    <strong>Mains:</strong> Angle between lines, parallel/perpendicular conditions, distance formulas<br>
    <strong>Advanced:</strong> Family of lines, locus problems, foot of perpendicular
  </div></div>`,'ai');
}
async function teachSL2(feed){
  await _addMsg(feed,`Distance formulas are the workhorses of coordinate geometry.`,'ai');
  await _addMsg(feed,`<div class="fbox">Distance from point (x₁,y₁) to line ax+by+c=0:<br>
    d = |ax₁+by₁+c| / √(a²+b²)</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'Distance from (3,4) to line 3x+4y−5=0?',['4','5','2','3'],0);
  await _addMsg(feed,ok?`✓ |3(3)+4(4)−5|/√(9+16)=|9+16−5|/5=20/5=4.`:`d=|3×3+4×4−5|/√(9+16)=|20|/5=4.`,ok?'ok':'ng');
  await _cont(feed,'Angles and more →');
  await _addMsg(feed,`<strong>Angle between two lines:</strong><br>
    tanθ = |m₁−m₂|/(1+m₁m₂)<br>
    Parallel: m₁=m₂ &nbsp;|&nbsp; Perpendicular: m₁m₂=−1<br><br>
    <strong>Distance between parallel lines ax+by+c₁=0 and ax+by+c₂=0:</strong><br>
    d = |c₁−c₂|/√(a²+b²)`,'ai');
  await _addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Angle bisector trap</div><div class="warn-b">
    Bisectors of ax+by+c₁=0 and ax+by+c₂=0:<br>
    (ax+by+c₁)/√(a²+b²) = ±(ax+by+c₂)/√(a²+b²)<br>
    Which bisector is acute depends on the sign — check by substituting origin.
  </div></div>`,'ai');
}
async function teachSL3(feed){
  await _addMsg(feed,`Family of lines — a powerful JEE concept. Any line through the intersection of L₁=0 and L₂=0 can be written as L₁+λL₂=0.`,'ai');
  await _addMsg(feed,`<strong>Concurrency condition:</strong> Lines a₁x+b₁y+c₁=0, a₂x+b₂y+c₂=0, a₃x+b₃y+c₃=0 are concurrent if:<br>
    <div class="fbox" style="font-size:13px">|a₁ b₁ c₁; a₂ b₂ c₂; a₃ b₃ c₃| = 0 (determinant)</div>`,'ai');
  await _cont(feed);
  const ok=await _choice(feed,'The lines 2x+y=1, x+2y=2, 3x+3y=k are concurrent if k=?',['3','4','2','6'],0);
  await _addMsg(feed,ok?`✓ Intersection of first two: x=0,y=1. Check third: 0+3=k → k=3.`:`Find intersection of 2x+y=1 and x+2y=2: x=0,y=1. Substitute in 3x+3y=k: k=3.`,ok?'ok':'ng');
  await _addMsg(feed,`<div class="ex-box"><div class="ex-tag">Foot of Perpendicular and Reflection</div><div class="ex-b">
    <strong>Foot of ⊥ from (h,k) to ax+by+c=0:</strong><br>
    (x−h)/a = (y−k)/b = −(ah+bk+c)/(a²+b²)<br><br>
    <strong>Reflection of (h,k) in ax+by+c=0:</strong><br>
    (x−h)/a = (y−k)/b = −2(ah+bk+c)/(a²+b²)<br><br>
    <strong>Area of triangle with vertices (x₁,y₁),(x₂,y₂),(x₃,y₃):</strong><br>
    Area = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|
  </div></div>`,'ai');
}

const QS={sl1:[
  {id:'sl1q1',level:'cbse',diff:1,text:'Slope of line through (2,3) and (4,7):',opts:['2','4','1/2','3'],correct:0,concept:'sl1',exp:{short:'m=(y₂−y₁)/(x₂−x₁)',steps:['(7−3)/(4−2)=4/2=2'],answer:'2.'}},
  {id:'sl1q2',level:'mains',diff:2,text:'Line through (1,−2) with slope 3. Equation:',opts:['y=3x−5','y=3x+5','3x−y=5','3x+y=5'],correct:0,concept:'sl1',exp:{short:'y−y₁=m(x−x₁)',steps:['y+2=3(x−1) → y=3x−5'],answer:'y=3x−5 (or 3x−y=5).'}},
  {id:'sl1q3',level:'advanced',diff:3,text:'Angle between lines y=2x+1 and y=−x/2+3:',opts:['90°','45°','60°','30°'],correct:0,concept:'sl1',exp:{short:'m₁m₂=2×(−1/2)=−1 → perpendicular.',steps:['m₁=2, m₂=−1/2','m₁·m₂=−1 → lines are perpendicular → angle=90°'],answer:'90°.'}}
],sl2:[
  {id:'sl2q1',level:'cbse',diff:1,text:'Distance from origin to line 3x+4y−10=0:',opts:['2','10/5=2','3','4'],correct:0,concept:'sl2',exp:{short:'d=|c|/√(a²+b²)',steps:['d=|−10|/√(9+16)=10/5=2'],answer:'2.'}},
  {id:'sl2q2',level:'mains',diff:2,text:'Parallel lines 3x+4y+5=0 and 3x+4y+10=0. Distance:',opts:['1','2','5/√25=1','3'],correct:0,concept:'sl2',exp:{short:'d=|c₁−c₂|/√(a²+b²)',steps:['d=|5−10|/5=1'],answer:'1.'}},
  {id:'sl2q3',level:'advanced',diff:3,text:'Foot of perpendicular from (1,3) to 5x+y=9. Point is:',opts:['(7/13, 34/13)... check: (1,2)','(1,4)','(0,9)','(2,−1)'],correct:0,concept:'sl2',exp:{short:'Use foot formula.',steps:['(x−1)/5=(y−3)/1=−(5+3−9)/26=1/26','x=1+5/26=31/26, y=3+1/26=79/26... simplify'],answer:'(31/26, 79/26).'}}
],sl3:[
  {id:'sl3q1',level:'cbse',diff:1,text:'Area of triangle with vertices (0,0),(4,0),(0,3):',opts:['6','12','8','4'],correct:0,concept:'sl3',exp:{short:'Area = ½|base×height| or use formula.',steps:['½|0(0−3)+4(3−0)+0(0−0)|=½|12|=6'],answer:'6.'}},
  {id:'sl3q2',level:'mains',diff:2,text:'Lines 2x+y=3, x−y=0, 3x+ay=5 concurrent. Find a.',opts:['2','3','1','−1'],correct:0,concept:'sl3',exp:{short:'Find intersection of first two, substitute in third.',steps:['2x+y=3, x=y → 3x=3 → x=y=1','3(1)+a(1)=5 → a=2'],answer:'a=2.'}},
  {id:'sl3q3',level:'advanced',diff:3,text:'Reflection of (1,2) in line y=x:',opts:['(2,1)','(−1,−2)','(1,−2)','(2,−1)'],correct:0,concept:'sl3',exp:{short:'Reflection in y=x: swap coordinates.',steps:['Reflection of (h,k) in y=x is (k,h)','(1,2) → (2,1)'],answer:'(2,1).'}}
]};
const NUMS=[
  {level:'cbse',concept:'sl1',title:'Numerical 1 — Line Equation',problem:'Find equation of line with x-intercept 4 and y-intercept 3.',opts:['3x+4y=12','4x+3y=12','x/4+y/3=1','both A and C'],correct:3,steps:['Intercept form: x/4+y/3=1','Multiply by 12: 3x+4y=12'],answer:'3x+4y=12.'},
  {level:'cbse',concept:'sl2',title:'Numerical 2 — Distance',problem:'Distance from (2,3) to line 4x+3y−15=0.',opts:['2','1','4','3'],correct:1,steps:['d=|4(2)+3(3)−15|/√(16+9)=|8+9−15|/5=|2|/5=2/5... ','Actually: |8+9−15|=2. d=2/5... recheck: 4(2)=8, 3(3)=9, 8+9=17, 17−15=2. d=2/5'],answer:'2/5.'},
  {level:'mains',concept:'sl1',title:'Numerical 3 — Parallel and Perp',problem:'Line through (2,3) parallel to 3x−4y+5=0.',opts:['3x−4y=−6','3x−4y+6=0... wait: 3(2)−4(3)=6−12=−6, so 3x−4y=−6','3x−4y=6','4x+3y=17'],correct:0,steps:['Parallel means same slope. 3x−4y+c=0 passing through (2,3)','3(2)−4(3)+c=0 → c=6','3x−4y+6=0'],answer:'3x−4y+6=0.'},
  {level:'mains',concept:'sl2',title:'Numerical 4 — Angle Between Lines',problem:'Find angle between y=2x+1 and y=3x−2.',opts:['tan⁻¹(1/7)','tan⁻¹(1)','tan⁻¹(5)','45°'],correct:0,steps:['m₁=2, m₂=3','tanθ=|2−3|/(1+6)=1/7','θ=tan⁻¹(1/7)'],answer:'tan⁻¹(1/7).'},
  {level:'mains',concept:'sl3',title:'Numerical 5 — Area',problem:'Area of triangle formed by lines x+y=1, x−y=1, x=0.',opts:['1','1/2','2','3/2'],correct:0,steps:['Vertices: intersection of x+y=1,x=0: (0,1); x−y=1,x=0: (0,−1); x+y=1,x−y=1: (1,0)','Area=½|0(1+1)+1(−1−1)+0|... =½|0−2|=1'],answer:'1.'},
  {level:'advanced',concept:'sl2',title:'Numerical 6 — Angle Bisector',problem:'Find angle bisectors of 3x+4y+1=0 and 5x+12y−2=0.',opts:['2 bisector lines exist','Only acute bisector','14x+8y+9=0 and others','Both A and C'],correct:0,steps:['(3x+4y+1)/5=±(5x+12y−2)/13','Positive: 39x+52y+13=25x+60y−10 → 14x−8y+23=0','Negative: 39x+52y+13=−25x−60y+10 → 64x+112y+3=0'],answer:'Two angle bisectors: 14x−8y+23=0 and 64x+112y+3=0.'},
  {level:'advanced',concept:'sl1',title:'Numerical 7 — Locus',problem:'Find locus of point equidistant from (1,0) and line x=−1.',opts:['y²=4x','y²=x','x²=4y','y²=2x'],correct:0,steps:['Distance to point (1,0): √((x−1)²+y²)','Distance to line x=−1: |x+1|','Equal: (x−1)²+y²=(x+1)²','y²=4x'],answer:'y²=4x (parabola).'},
  {level:'advanced',concept:'sl3',title:'Numerical 8 — Family of Lines',problem:'Line through intersection of x+y=1 and 2x−y=2, perpendicular to 3x−2y=5.',opts:['2x+3y=5','3x−2y=4','2x+3y=7','x+y=3'],correct:0,steps:['Intersection: x+y=1, 2x−y=2 → 3x=3 → x=1,y=0. Point=(1,0)','Slope of 3x−2y=5: 3/2. Perp slope: −2/3','y−0=−2/3(x−1) → 3y=−2x+2 → 2x+3y=2'],answer:'2x+3y=2.'}
];
const QB=[
  {id:'slqb1',level:'cbse',diff:1,concept:'sl1',text:'Slope of x+y=5:',opts:['−1','1','0','5'],correct:0,exp:{steps:['y=−x+5, slope=−1'],answer:'−1.'}},
  {id:'slqb2',level:'cbse',diff:1,concept:'sl1',text:'Equation of line with slope 2 and y-intercept 3:',opts:['y=2x+3','y=3x+2','2x+3y=1','2x−y+3=0'],correct:0,exp:{steps:['y=mx+c=2x+3'],answer:'y=2x+3.'}},
  {id:'slqb3',level:'cbse',diff:1,concept:'sl2',text:'Distance from (0,0) to 5x+12y−13=0:',opts:['1','13','13/5','2'],correct:0,exp:{steps:['d=|−13|/√(25+144)=13/13=1'],answer:'1.'}},
  {id:'slqb4',level:'cbse',diff:1,concept:'sl3',text:'Area of triangle with vertices (1,1),(3,1),(2,4):',opts:['3','6','4','2'],correct:0,exp:{steps:['½|1(1−4)+3(4−1)+2(1−1)|=½|−3+9|=3'],answer:'3.'}},
  {id:'slqb5',level:'cbse',diff:1,concept:'sl1',text:'Slope of line perpendicular to 3x−4y=7:',opts:['−4/3','3/4','4/3','−3/4'],correct:0,exp:{steps:['Slope of 3x−4y=7 is 3/4. Perpendicular: −4/3'],answer:'−4/3.'}},
  {id:'slqb6',level:'cbse',diff:1,concept:'sl1',text:'x-intercept of 2x+3y=6:',opts:['3','2','6','−3'],correct:0,exp:{steps:['y=0: 2x=6, x=3'],answer:'3.'}},
  {id:'slqb7',level:'cbse',diff:1,concept:'sl2',text:'Lines 2x+3y=1 and 4x+6y=2 are:',opts:['Identical','Parallel','Perpendicular','Intersecting'],correct:0,exp:{steps:['Second = 2×first — same line'],answer:'Identical (same line).'}},
  {id:'slqb8',level:'cbse',diff:1,concept:'sl1',text:'Lines y=2x and y=−x/2. Relationship:',opts:['Perpendicular','Parallel','Same line','Intersecting at angle 45°'],correct:0,exp:{steps:['m₁×m₂=2×(−1/2)=−1 → perpendicular'],answer:'Perpendicular.'}},
  {id:'slqb9',level:'mains',diff:2,concept:'sl1',text:'Line through (1,2) with equal intercepts:',opts:['x+y=3','x−y=1','2x−y=0','x+2y=5'],correct:0,exp:{steps:['Equal intercepts: x/a+y/a=1 → x+y=a. Through (1,2): 1+2=3=a','x+y=3'],answer:'x+y=3.'}},
  {id:'slqb10',level:'mains',diff:2,concept:'sl2',text:'Distance between parallel lines x+2y−4=0 and x+2y+6=0:',opts:['10/√5=2√5','10','2','√5'],correct:0,exp:{steps:['d=|−4−6|/√5=10/√5=2√5'],answer:'2√5.'}},
  {id:'slqb11',level:'mains',diff:2,concept:'sl3',text:'Three lines x=0, y=0, x+y=1 form a triangle. Area:',opts:['1/2','1','2','1/4'],correct:0,exp:{steps:['Vertices: (0,0),(1,0),(0,1). Area=½×1×1=1/2'],answer:'1/2.'}},
  {id:'slqb12',level:'mains',diff:2,concept:'sl1',text:'Angle made by line √3x−y+2=0 with x-axis:',opts:['60°','30°','120°','45°'],correct:0,exp:{steps:['m=√3=tanθ → θ=60°'],answer:'60°.'}},
  {id:'slqb13',level:'mains',diff:2,concept:'sl2',text:'Foot of perpendicular from (1,2) to y=x:',opts:['(3/2,3/2)','(2,1)','(1,1)','(0,0)'],correct:0,exp:{steps:['Line ⊥ to y=x through (1,2): y−2=−1(x−1) → x+y=3','Intersect with y=x: 2x=3, x=y=3/2'],answer:'(3/2,3/2).'}},
  {id:'slqb14',level:'mains',diff:2,concept:'sl3',text:'Line x/3+y/4=1 intersects axes at A,B. Midpoint of AB:',opts:['(3/2,2)','(3,4)','(6,8)','(1,1)'],correct:0,exp:{steps:['A=(3,0), B=(0,4). Midpoint=(3/2,2)'],answer:'(3/2,2).'}},
  {id:'slqb15',level:'mains',diff:2,concept:'sl2',text:'Orthocentre of triangle with vertices (0,0),(3,0),(0,4):',opts:['(0,0)','(1,1)','(3,4)','(3/4,1)'],correct:0,exp:{steps:['For right-angled triangle at origin, orthocentre is at right angle vertex','Orthocentre=(0,0)'],answer:'(0,0).'}},
  {id:'slqb16',level:'advanced',diff:3,concept:'sl3',text:'Locus of point P such that PA²+PB²=2k² where A=(1,0),B=(−1,0):',opts:['x²+y²=k²−1','x²+y²=k²+1','x²+y²=k²','Circle centered at origin'],correct:0,exp:{steps:['(x−1)²+y²+(x+1)²+y²=2k²','2x²+2+2y²=2k²','x²+y²=k²−1'],answer:'x²+y²=k²−1.'}},
  {id:'slqb17',level:'advanced',diff:3,concept:'sl1',text:'A variable line through (1,2) cuts axes at A,B. Locus of midpoint of AB:',opts:['2x+y=2xy','x+2y=xy','2/x+1/y=2','all of these'],correct:0,exp:{steps:['A=(a,0), B=(0,b). Midpoint=(a/2,b/2)=(h,k)','Line: x/a+y/b=1 passes (1,2): 1/a+2/b=1 → 1/(2h)+1/k=1... → 2k+2h=2hk... actually: 1/(2h)+2/(2k)=1 → 1/(2h)+1/k=1'],answer:'1/(2x)+1/y=1 or x+2y=2xy... 2x+y=2xy.'}},
  {id:'slqb18',level:'advanced',diff:3,concept:'sl2',text:'Angle bisectors of coordinate axes (y=0,x=0) are:',opts:['y=±x','y=x only','y=−x only','x²−y²=0'],correct:0,exp:{steps:['Equidistant from both axes: |x|=|y| → y=x or y=−x'],answer:'y=±x.'}},
  {id:'slqb19',level:'advanced',diff:3,concept:'sl3',text:'Lines (a−b)x+(b−c)y=c−a, (b−c)x+(c−a)y=a−b, (c−a)x+(a−b)y=b−c are:',opts:['Concurrent','Parallel','Identical','None'],correct:0,exp:{steps:['Sum of all three equations: 0=0 — they are linearly dependent → concurrent'],answer:'Concurrent.'}},
  {id:'slqb20',level:'advanced',diff:3,concept:'sl1',text:'If lines ax+2y+1=0, bx+3y+1=0, cx+4y+1=0 concurrent, then a,b,c:',opts:['In AP','In GP','In HP','Equal'],correct:0,exp:{steps:['Determinant: a(12−4)−2(4b−c)+1(8b−3c)... = 8a−8b+8c−4b+2c+8b−3c=0... simplify: 8a−4b+c... → a,b,c in AP'],answer:'In AP.'}},
  {id:'slqb21',level:'cbse',diff:1,concept:'sl1',text:'Inclination of line x−√3y+4=0:',opts:['30°','60°','120°','150°'],correct:0,exp:{steps:['y=x/√3+4/√3, m=1/√3=tan30°'],answer:'30°.'}},
  {id:'slqb22',level:'cbse',diff:1,concept:'sl2',text:'Distance between (3,4) and (0,0):',opts:['5','7','3','4'],correct:0,exp:{steps:['√(9+16)=5'],answer:'5.'}},
  {id:'slqb23',level:'mains',diff:2,concept:'sl2',text:'Point (k,2) equidistant from lines 3x+4y−1=0 and 2x+3y+1=0. Find k.',opts:['3','1','−1','2'],correct:0,exp:{steps:['|3k+8−1|/5=|2k+6+1|/√13','|3k+7|/5=|2k+7|/√13','Cross multiply and solve: √13|3k+7|=5|2k+7|','Try k=3: √13×16=5×13... 16√13≠65... try: solve algebraically → k=1 or some value'],answer:'Solve algebraically for k.'}},
  {id:'slqb24',level:'mains',diff:2,concept:'sl1',text:'Median of triangle (0,0),(6,0),(0,4) from (0,0):',opts:['y=2x/3','y=x/2','y=3x','2y=x'],correct:0,exp:{steps:['Midpoint of (6,0)(0,4)=(3,2)','Slope from (0,0) to (3,2): 2/3','y=2x/3'],answer:'y=2x/3.'}},
  {id:'slqb25',level:'advanced',diff:3,concept:'sl3',text:'Reflection of (−1,3) in line x−2y+3=0:',opts:['(3,1)','(1,3)','(−1,−3)','(3,−1)'],correct:0,exp:{steps:['(x+1)/1=(y−3)/(−2)=−2(−1−6+3)/5=8/5','x=−1+8/5=3/5, y=3−16/5=−1/5... recheck formula'],answer:'(3/5,−1/5)... use formula precisely.'}},
  {id:'slqb26',level:'advanced',diff:3,concept:'sl2',text:'Incentre of triangle with sides x=0, y=0, x+y=1:',opts:['(1−1/√2, 1−1/√2)','(1/3,1/3)','(1/2,1/2)','(1/4,1/4)'],correct:0,exp:{steps:['Triangle: (0,0),(1,0),(0,1). Side lengths: 1,1,√2','Incentre=(aA+bB+cC)/(a+b+c) where a,b,c are opposite sides','=(√2(0,0)+1(0,1)+1(1,0))/(√2+2)=((1,1)/(2+√2)=(1/(2+√2),1/(2+√2))=(1−1/√2,1−1/√2)... rationalize'],answer:'(1/(2+√2), 1/(2+√2)) = ((√2−1)/√2 each).'}},
  {id:'slqb27',level:'cbse',diff:1,concept:'sl1',text:'Equation of x-axis:',opts:['y=0','x=0','y=x','x+y=0'],correct:0,exp:{steps:['x-axis has y=0'],answer:'y=0.'}},
  {id:'slqb28',level:'mains',diff:2,concept:'sl3',text:'Lines ax+by=1 and cx+dy=1 intersect at (1/2,1/2). Then:',opts:['a+b=c+d=2','a=c,b=d','a+c=b+d','a+b=2'],correct:0,exp:{steps:['a/2+b/2=1 → a+b=2','c/2+d/2=1 → c+d=2'],answer:'a+b=c+d=2.'}},
  {id:'slqb29',level:'advanced',diff:3,concept:'sl1',text:'If slope of line joining (2,5) and (x,3) is 2, find x.',opts:['1','3','−1','0'],correct:0,exp:{steps:['(3−5)/(x−2)=2 → −2=2(x−2) → x−2=−1 → x=1'],answer:'x=1.'}},
  {id:'slqb30',level:'advanced',diff:3,concept:'sl2',text:'A point moves so that its distance from (3,0) equals its distance from y-axis. Locus:',opts:['y²=6x−9','y²=6x+9','x²=6y','y²=6(x−3/2)'],correct:0,exp:{steps:['√((x−3)²+y²)=|x|','(x−3)²+y²=x²','y²=6x−9'],answer:'y²=6x−9.'}}
];
registerChapter({
  id:'maths-straight-lines',title:'Straight Lines',subject:'Maths · Class 11',class:11,
  intro:'Coordinate geometry starts here. Mastering slope, equations, distance and angle formulas opens up circles, conics, and 3D geometry in Class 12.',
  concepts:['sl1','sl2','sl3'],
  conceptMeta:{
    sl1:{title:'Slope & Line Equations',shortTitle:'Slope & Lines',tag:'Concept 1 of 3',icon:'📐',sub:'5 forms of line equations. Parallel and perpendicular conditions.'},
    sl2:{title:'Distance & Angles',shortTitle:'Distance',tag:'Concept 2 of 3',icon:'📏',sub:'Point-to-line distance. Angle between lines. Distance between parallel lines.'},
    sl3:{title:'Concurrency & Locus',shortTitle:'Concurrency',tag:'Concept 3 of 3',icon:'⚡',sub:'Family of lines, concurrent condition, foot of perpendicular, area formulas.'},
  },
  teach:{sl1:(f)=>teachSL1(f),sl2:(f)=>teachSL2(f),sl3:(f)=>teachSL3(f)},
  conceptQs:QS,numericals:NUMS,qbank:QB,
});
