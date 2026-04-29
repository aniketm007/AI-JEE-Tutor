// ═══════════════════════════════════════════════════════════
// CHAPTER: Sets
// Maths · Class 11
// NOTE: uses game helpers (addMsg, makeDiceGame, makeNLGame, makeVennGame)
// that are Sets-specific — included here until refactored
// ═══════════════════════════════════════════════════════════

// ─── SETS-SPECIFIC TEACH HELPERS (dice/venn games) ───────────
function addMsg(feed,html,type='ai',delay=0){
  return new Promise(r=>{
    setTimeout(()=>{
      const b=document.createElement('div');
      b.className='bub '+type;
      const labels={ai:'◆ Tutor',ok:'✓ Tutor',ng:'↩ Tutor'};
      if(labels[type]) b.innerHTML=`<div class="lbl">${labels[type]}</div>${html}`;
      else b.innerHTML=html;
      feed.appendChild(b);
      b.scrollIntoView({behavior:'smooth',block:'nearest'});
      r();
    },delay);
  });
}

function addGame(feed,el){
  feed.appendChild(el);
  b.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function cont(feed,label='Got it →'){
  return new Promise(r=>{
    const b=document.createElement('button');
    b.className='btn bp';b.style.marginTop='8px';b.textContent=label;
    b.onclick=()=>{b.remove();r();};
    feed.appendChild(b);
  });
}

// ─── DICE GAME ───
function makeDice(question,correct){
  return new Promise(r=>{
    const card=document.createElement('div');card.className='game-card';
    card.innerHTML=`<div class="gc-t">🎲 Dice Challenge</div><div class="gc-i">${question}</div>
      <div class="dice-row" id="dr">${[1,2,3,4,5,6].map(n=>`<div class="die" data-v="${n}">${n}</div>`).join('')}</div>
      <div style="font-size:11px;color:var(--hint);text-align:center;margin-bottom:10px">Click the faces that belong in your answer</div>
      <div style="text-align:center"><button class="btn bp" id="ds" disabled>Check →</button></div>
      <div id="df" style="margin-top:10px;font-size:13px;text-align:center;min-height:18px"></div>`;
    const sel=new Set(),sub=card.querySelector('#ds'),fb=card.querySelector('#df');
    card.querySelectorAll('.die').forEach(d=>{
      d.onclick=()=>{
        if(d.classList.contains('locked'))return;
        const v=+d.dataset.v;
        sel.has(v)?(sel.delete(v),d.className='die'):(sel.add(v),d.className='die sel');
        sub.disabled=sel.size===0;
      };
    });
    sub.onclick=()=>{
      sub.disabled=true;
      card.querySelectorAll('.die').forEach(d=>d.classList.add('locked'));
      [1,2,3,4,5,6].forEach(n=>{
        const d=card.querySelector(`[data-v="${n}"]`);
        if(correct.includes(n))d.className='die sel locked';
        else if(sel.has(n))d.className='die miss locked';
        else d.className='die dim locked';
      });
      const got=[...sel].sort((a,b)=>a-b);
      const ok=JSON.stringify(got)===JSON.stringify([...correct].sort((a,b)=>a-b));
      fb.innerHTML=ok?`<span class="hg">✓ Exactly — {${correct.join(',')}}</span>`:`<span class="ha">Correct answer: {${correct.join(',')}}. Let's see why.</span>`;
      setTimeout(()=>r(ok),600);
    };
    r._card=card;
    return card;
  });
}

function makeDiceGame(feed,question,correct){
  return new Promise(r=>{
    const card=document.createElement('div');card.className='game-card';
    card.innerHTML=`<div class="gc-t">🎲 Dice Challenge</div><div class="gc-i">${question}</div>
      <div class="dice-row">${[1,2,3,4,5,6].map(n=>`<div class="die" data-v="${n}">${n}</div>`).join('')}</div>
      <div style="font-size:11px;color:var(--hint);text-align:center;margin-bottom:10px">Click the faces that belong in your answer</div>
      <div style="text-align:center"><button class="btn bp" id="dds" disabled>Check →</button></div>
      <div id="ddf" style="margin-top:10px;font-size:13px;text-align:center;min-height:18px"></div>`;
    addGame(feed,card);
    const sel=new Set(),sub=card.querySelector('#dds'),fb=card.querySelector('#ddf');
    card.querySelectorAll('.die').forEach(d=>{
      d.onclick=()=>{
        if(d.classList.contains('locked'))return;
        const v=+d.dataset.v;
        sel.has(v)?(sel.delete(v),d.className='die'):(sel.add(v),d.className='die sel');
        sub.disabled=sel.size===0;
      };
    });
    sub.onclick=()=>{
      sub.disabled=true;card.querySelectorAll('.die').forEach(d=>d.classList.add('locked'));
      [1,2,3,4,5,6].forEach(n=>{
        const d=card.querySelector(`[data-v="${n}"]`);
        if(correct.includes(n))d.className='die sel locked';
        else if(sel.has(n))d.className='die miss locked';
        else d.className='die dim locked';
      });
      const got=[...sel].sort((a,b)=>a-b);
      const ok=JSON.stringify(got)===JSON.stringify([...correct].sort((a,b)=>a-b));
      fb.innerHTML=ok?`<span class="hg">✓ Exactly — {${correct.join(',')}}</span>`:`<span class="ha">Correct: {${correct.join(',')}}. Let's understand why.</span>`;
      setTimeout(()=>r(ok),600);
    };
  });
}

function makeNLGame(feed,q,correct){
  return new Promise(r=>{
    const card=document.createElement('div');card.className='game-card';
    card.innerHTML=`<div class="gc-t">🔢 Build the Set</div><div class="gc-i">${q}</div>
      <div class="nl-row">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<div class="nn" data-n="${n}">${n}</div>`).join('')}</div>
      <div style="font-size:11px;color:var(--hint);margin:4px 0 10px">Click numbers to include them in your set</div>
      <button class="btn bp" id="nls" disabled>Check →</button>
      <div id="nlf" style="margin-top:8px;font-size:13px;min-height:16px"></div>`;
    addGame(feed,card);
    const ch=new Set(),sub=card.querySelector('#nls'),fb=card.querySelector('#nlf');
    card.querySelectorAll('.nn').forEach(el=>{
      el.onclick=()=>{
        const n=+el.dataset.n;
        ch.has(n)?(ch.delete(n),el.classList.remove('ins')):(ch.add(n),el.classList.add('ins'));
        sub.disabled=ch.size===0;
      };
    });
    sub.onclick=()=>{
      sub.disabled=true;card.querySelectorAll('.nn').forEach(el=>el.style.pointerEvents='none');
      card.querySelectorAll('.nn').forEach(el=>{if(correct.includes(+el.dataset.n))el.classList.add('ins');else el.classList.remove('ins');});
      const sel=[...ch].sort((a,b)=>a-b);
      const ok=JSON.stringify(sel)===JSON.stringify([...correct].sort((a,b)=>a-b));
      fb.innerHTML=ok?`<span class="hg">✓ {${correct.join(',')}}</span>`:`<span class="ha">Correct: {${correct.join(',')}}</span>`;
      setTimeout(()=>r(ok),600);
    };
  });
}

function makeVennGame(feed,setA,setB,onlyA,onlyB,both){
  return new Promise(r=>{
    const all=[...onlyA,...both,...onlyB];
    const card=document.createElement('div');card.className='game-card';
    const zMap={};
    card.innerHTML=`<div class="gc-t">🔵 Venn Diagram</div><div class="gc-i">Click a name, then click the zone it belongs to.</div>
      <div class="venn-zones">
        <div class="vz" data-z="A"><div class="vzl">Only ${setA}</div><div class="vi-wrap" id="vA"></div></div>
        <div class="vz" data-z="both"><div class="vzl">In Both (A∩B)</div><div class="vi-wrap" id="vB"></div></div>
        <div class="vz" data-z="B"><div class="vzl">Only ${setB}</div><div class="vi-wrap" id="vC"></div></div>
      </div>
      <div style="font-size:11px;color:var(--hint);margin:8px 0 4px">Unplaced — click one, then click its zone:</div>
      <div class="vpool" id="vpool">${all.map(x=>`<div class="vtag" data-i="${x}">${x}</div>`).join('')}</div>
      <div style="margin-top:10px;text-align:center"><button class="btn bp" id="vs" disabled>Check →</button></div>
      <div id="vf" style="margin-top:8px;font-size:13px;text-align:center;min-height:16px"></div>`;
    addGame(feed,card);
    let sel=null;
    const pool=card.querySelector('#vpool'),sub=card.querySelector('#vs'),fb=card.querySelector('#vf');
    const zones={A:card.querySelector('#vA'),both:card.querySelector('#vB'),B:card.querySelector('#vC')};
    pool.addEventListener('click',e=>{
      const t=e.target.closest('.vtag');if(!t)return;
      pool.querySelectorAll('.vtag').forEach(x=>x.style.outline='');
      if(sel===t){sel=null;return;}
      sel=t;t.style.outline='2px solid var(--accent2)';
    });
    card.querySelectorAll('.vz').forEach(z=>{
      z.addEventListener('click',()=>{
        if(!sel)return;
        const zk=z.dataset.z;
        sel.style.outline='';
        zones[zk].appendChild(sel);
        zMap[sel.dataset.i]=zk;
        sel=null;
        sub.disabled=card.querySelectorAll('.vz .vtag').length<all.length;
      });
    });
    sub.onclick=()=>{
      sub.disabled=true;let ok=true;
      card.querySelectorAll('.vz .vtag').forEach(t=>{
        const item=t.dataset.i,placed=zMap[item];
        const cor=onlyA.includes(item)?'A':both.includes(item)?'both':'B';
        t.className='vtag '+(placed===cor?'pok':'png');
        if(placed!==cor)ok=false;
      });
      fb.innerHTML=ok?`<span class="hg">✓ Perfect Venn diagram!</span>`:`<span class="ha">Some items in wrong zones (red). Let's review.</span>`;
      setTimeout(()=>r(ok),700);
    };
  });
}

// ─── TEACHING SCRIPTS ────────────────────────────────────────
// ─── TEACHING SCRIPTS ───
async function teachC1(feed){
  await addMsg(feed,`Hey! Before we touch any definition, let's play a quick game. Roll a dice — faces 1 to 6. 🎲`,'ai',0);
  const d1=await makeDiceGame(feed,'Click all dice faces with a value <span class="hb">greater than 3</span>',[4,5,6]);
  await addMsg(feed,d1
    ?`Exactly! You picked <span class="hg">{4, 5, 6}</span>.<br><br>Notice what makes this special — there's a <em>clear rule</em>: "greater than 3". No ambiguity. 4 qualifies, 3 doesn't, 7 isn't even on the dice. <strong>That collection is called a Set.</strong>`
    :`The numbers greater than 3 are <span class="hg">{4,5,6}</span>. The key idea: a <em>clear rule</em> decides membership. Either a number qualifies or it doesn't. That's a <strong>Set</strong>.`,
    d1?'ok':'ng',400);
  await cont(feed);
  await addMsg(feed,`Now, which of these can be a set?`,'ai',200);
  await addMsg(feed,`<strong>A.</strong> The collection of tall students<br><strong>B.</strong> Students scoring above 90% in Maths<br><strong>C.</strong> Good cricketers in India<br><br>Type A, B, or C in your mind — then click to reveal.`,'ai',200);
  const rev=document.createElement('button');rev.className='btn ba';rev.textContent='Reveal answer';
  rev.onclick=async()=>{
    rev.remove();
    await addMsg(feed,`<span class="hg">B is the only valid set.</span><br><br>"Tall" — who counts? 5'8"? 6'? Subjective. "Good cricketer" — same problem. But <em>scoring above 90%</em> has a clear, testable rule. Every student either did or didn't.`,'ok',0);
    await addMsg(feed,`<div class="fbox">A Set is a well-defined collection of distinct objects.</div><div class="fnote">"Well-defined" = unambiguous membership rule for every possible element.</div>`,'ai',400);
    await addMsg(feed,`<strong>Key notation you'll see in every question:</strong><br><br>
      • <span class="hi">x ∈ A</span> means "x belongs to set A"<br>
      • <span class="hi">x ∉ A</span> means "x does NOT belong to set A"<br>
      • <span class="ha">|A|</span> means the <em>cardinality</em> of A — simply the <strong>count of distinct elements</strong><br><br>
      Example: A = {4,5,6} → <span class="ha">|A| = 3</span>&nbsp;&nbsp; B = {1,1,2} = {1,2} → <span class="ha">|B| = 2</span> (duplicate ignored)`,'ai',600);
    await addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Common trap</div><div class="warn-b">Order doesn't matter: {1,2,3} = {3,1,2}<br>Repetition is ignored: {1,1,2} = {1,2}, so |{1,1,2}| = 2 not 3.</div></div>`,'ai',800);
    await cont(feed,'Show me more examples →');
    await addMsg(feed,`Let's make this concrete with 3 quick examples. For each, I'll tell you the collection — you decide: valid set or not?`,'ai',0);
    await addMsg(feed,`<strong>Example 1 —</strong> "All players in India's World Cup 2023 squad"<br><br>Valid set or not? Think about it... Yes! The BCCI published an exact 15-member list. Clear membership rule. It's a set with |A| = 15.`,'ai',300);
    await addMsg(feed,`<strong>Example 2 —</strong> "The letters in the word MATHEMATICS"<br><br>M,A,T,H,E,M,A,T,I,C,S — but sets ignore repeats!<br>Distinct letters: M,A,T,H,E,I,C,S → <span class="hg">{M,A,T,H,E,I,C,S}</span>, so <span class="ha">|A| = 8</span>, not 11.`,'ai',500);
    await addMsg(feed,`<strong>Example 3 —</strong> "All x such that x² + 1 = 0, where x is real"<br><br>No real number squared gives −1. So this set has <em>zero elements</em>. It's valid as a set — but it's the <span class="hi">empty set ∅</span>!<br><br>Key lesson: a set-builder rule can produce an empty set. Always check if the rule is satisfiable.`,'ai',700);
    await addMsg(feed,`<div class="ex-box"><div class="ex-tag">JEE Pattern: What to expect</div><div class="ex-b">
      <strong>CBSE level:</strong> Is this a valid set? (Identify well-defined vs subjective)<br>
      <strong>JEE Mains:</strong> Find |A| after removing duplicates from a word or expression<br>
      <strong>JEE Advanced:</strong> A defined by a quadratic/equation — find elements, then do operations on A and B
    </div></div>`,'ai',900);
  };
  feed.appendChild(rev);

}

async function teachC2(feed){
  await addMsg(feed,`You already know what a set is. Now let's see how mathematicians write it. Two ways — JEE tests both.`,'ai',0);
  await addMsg(feed,`<strong>Method 1 — Roster form:</strong> List all elements.<br><div class="fbox">A = {4, 5, 6}</div><strong>Method 2 — Set-Builder form:</strong> Write the rule.<div class="fbox">A = {x : x ∈ {1..6} and x > 3}</div><div class="fnote">Read as: "A is the set of all x such that x is on the dice and x > 3"</div>`,'ai',200);
  await cont(feed);
  await addMsg(feed,`Let's practice. I'll give you a set-builder rule — you build the set by clicking numbers:`,'ai',200);
  const nl1=await makeNLGame(feed,'Set B = {x : x ∈ ℕ and x ≤ 5}',[1,2,3,4,5]);
  await addMsg(feed,nl1
    ?`✓ <span class="hg">B = {1,2,3,4,5}</span> — you read the rule (natural numbers ≤ 5) and applied it perfectly.`
    :`B = <span class="hg">{1,2,3,4,5}</span>. Natural numbers start from 1. Every number ≤ 5 is included.`,
    nl1?'ok':'ng',300);
  await cont(feed);
  await addMsg(feed,`<div class="warn"><div class="warn-t">⚠ JEE Trap</div><div class="warn-b"><strong>{x : x² = −1, x ∈ ℝ} = ∅</strong><br>No real number squared gives −1! Set-builder doesn't guarantee elements exist. Always check.</div></div>`,'ai',300);
  await cont(feed,'More examples →');
  await addMsg(feed,`Converting between forms is a must-have JEE skill. Let's do 3 conversions:`,'ai',0);
  await addMsg(feed,`<strong>Roster → Set-Builder:</strong><br>
    A = {2, 4, 6, 8, 10}<br>
    Pattern: even numbers from 2 to 10<br>
    Set-Builder: <span class="hi">A = {x : x ∈ ℕ, x is even, x ≤ 10}</span><br><br>
    Or more precisely: <span class="hi">A = {x : x = 2n, n ∈ ℕ, 1 ≤ n ≤ 5}</span>`,'ai',300);
  await addMsg(feed,`<strong>Set-Builder → Roster:</strong><br>
    B = {x : x² − 5x + 6 = 0}<br>
    Solve: (x−2)(x−3) = 0 → x = 2 or x = 3<br>
    Roster: <span class="hg">B = {2, 3}</span><br><br>
    Note: |B| = 2. Even though it's defined by an equation, it has exactly 2 elements.`,'ai',500);
  await addMsg(feed,`<strong>Tricky one:</strong><br>
    C = {x : x ∈ ℤ, −1 < x < 3}<br>
    ℤ means integers: ..., −2, −1, 0, 1, 2, ...<br>
    Integers strictly between −1 and 3: 0, 1, 2<br>
    Roster: <span class="hg">C = {0, 1, 2}</span>, so <span class="ha">|C| = 3</span><br><br>
    Common mistake: forgetting to include 0, or confusing "integer" with "natural number".`,'ai',700);
  await addMsg(feed,`<div class="ex-box"><div class="ex-tag">Quick reference</div><div class="ex-b">
    <strong>ℕ</strong> = Natural numbers = {1, 2, 3, ...} (starts from 1)<br>
    <strong>ℤ</strong> = Integers = {..., −2, −1, 0, 1, 2, ...} (includes negatives and 0)<br>
    <strong>ℚ</strong> = Rationals = fractions p/q<br>
    <strong>ℝ</strong> = Real numbers = everything on the number line
  </div></div>`,'ai',900);

}

async function teachC3(feed){
  await addMsg(feed,`Sets come in different "types". Let me introduce them, and then I'll throw the trap question at you.`,'ai',0);
  await addMsg(feed,`<span class="hi">Empty Set ∅</span> — no elements at all. Written as ∅ or {}.<br><br>
    <span class="hb">Singleton Set</span> — exactly one element. Like {5} or {0}.<br><br>
    <span class="hg">Finite Set</span> — countable elements. Like {1,2,3,4,5}.<br><br>
    <span class="ha">Infinite Set</span> — goes on forever. Like all natural numbers.`,'ai',200);
  await cont(feed);
  await addMsg(feed,`🎯 <em>Here's the trap</em> that appears almost every year. Think carefully before answering:`,'ai',200);
  await addMsg(feed,`<strong>Is the set {0} an empty set?</strong><br><br>
    A. Yes — zero means nothing, so {0} is empty<br>B. No — {0} has the number 0 as its element`,'ai',200);
  const ans=document.createElement('div');ans.style.cssText='display:flex;gap:8px;margin-top:8px;';
  ['A — Yes, it\'s empty','B — No, it\'s singleton'].forEach((txt,i)=>{
    const b=document.createElement('button');b.className='btn '+(i===0?'ba':'bg');b.textContent=txt;
    b.onclick=async()=>{
      ans.remove();
      if(i===1){
        await addMsg(feed,`<span class="hg">✓ Correct!</span> {0} is a <em>singleton set</em> — it contains the number zero.<br><br>The <span class="hi">empty set ∅</span> looks like {} — literally nothing between the braces.<br><br><strong>Zero is a number</strong>, just like 5 or −3. It is not "nothing". Confusing these is the #1 Sets error in JEE.`,'ok',0);
      } else {
        await addMsg(feed,`Classic trap! {0} contains the <em>number zero</em> — it has exactly 1 element. That's a singleton.<br><br>The empty set <span class="hi">∅ = {}</span> has literally nothing inside — not even zero.<br><br>Zero is a number. It is not "absence of content".`,'ng',0);
      }
      await addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Also remember</div><div class="warn-b"><strong>Equal Sets</strong>: {1,2,3} = {3,1,2} (order irrelevant)<br><strong>Universal Set U</strong>: contains everything under consideration in the problem</div></div>`,'ai',400);
      await cont(feed,'Show me all types clearly →');
      await addMsg(feed,`Let me give you a crisp table of all types with examples you'll actually remember:`,'ai',0);
      await addMsg(feed,`<div class="ex-box"><div class="ex-tag">Types of Sets — with real examples</div><div class="ex-b">
        <strong>Empty Set ∅</strong>: {x ∈ ℝ : x² = −4} — no solution exists<br>
        <strong>Singleton</strong>: {Captain of India's 2023 WC squad} = {Rohit Sharma}<br>
        <strong>Finite</strong>: {vowels in English} = {a,e,i,o,u}, |A| = 5<br>
        <strong>Infinite</strong>: {even natural numbers} = {2,4,6,8,...} — never ends<br>
        <strong>Equal Sets</strong>: {1,2,3} = {3,2,1} — same elements, different order<br>
        <strong>Universal Set U</strong>: In a dice problem, U = {1,2,3,4,5,6}
      </div></div>`,'ai',400);
      await addMsg(feed,`<strong>A common JEE question type:</strong><br><br>
        "Which of the following is an empty set?"<br><br>
        A. {x : x² = 4} → x = ±2, so NOT empty<br>
        B. {x : x² + 1 = 0, x ∈ ℝ} → No real solution → <span class="hg">This is ∅</span><br>
        C. {x : x + 3 = 3} → x = 0, so {0} → NOT empty (singleton!)<br>
        D. {x : x ≠ x} → No number satisfies this → <span class="hg">This is also ∅</span><br><br>
        <strong>Trick:</strong> B and D are both empty — multiple answers possible in Advanced!`,'ai',600);
    };
    ans.appendChild(b);
  });
  feed.appendChild(ans);

}

async function teachC4(feed){
  await addMsg(feed,`Two key operations that JEE tests in almost every question. Let's discover them — not memorise them.`,'ai',0);
  await addMsg(feed,`Imagine two groups of friends. Some are in Group A only, some in Group B only, and some are in <em>both</em>.<br><br>
    <span class="hb">A ∪ B (Union)</span> = everyone who is in A <em>or</em> B (or both) — the combined group.<br>
    <span class="hi">A ∩ B (Intersection)</span> = only those who are in A <em>and</em> B — the overlap.<br><br>
    The symbol ∪ looks like a <strong>U</strong>nion. The symbol ∩ looks like an <strong>∩</strong>tersection.`,'ai',300);
  await cont(feed,'Got it — show me with real people →');
  await addMsg(feed,`Now sort these JEE students into the correct zones:`,'ai',200);
  await addMsg(feed,`<span class="hb">Group A (cleared Mains)</span>: Rahul, Priya, Arjun, Sara<br><span class="hr" style="color:var(--pink)">Group B (cleared Advanced)</span>: Priya, Arjun, Dev, Meera`,'ai',300);
  const v1=await makeVennGame(feed,'Mains','Advanced',['Rahul','Sara'],['Dev','Meera'],['Priya','Arjun']);
  await addMsg(feed,v1
    ?`✓ Brilliant! Look at what you just built:<br><br>
      <span class="hb">A ∪ B (Union)</span> = everyone in EITHER group = {Rahul, Priya, Arjun, Sara, Dev, Meera}<br><br>
      <span class="hi">A ∩ B (Intersection)</span> = only those in BOTH = {Priya, Arjun}<br><br>
      <div class="fbox">n(A∪B) = n(A) + n(B) − n(A∩B)</div>
      <div class="fnote">We subtract n(A∩B) because Priya & Arjun were counted twice — once in each group.</div>`
    :`A∪B = everyone in either group. A∩B = only those in both.<br><br>
      <div class="fbox">n(A∪B) = n(A) + n(B) − n(A∩B)</div>
      <div class="fnote">Subtract intersection to fix double-counting.</div>`,
    v1?'ok':'ng',400);
  await cont(feed);
  await addMsg(feed,`For three sets (JEE Advanced level):<br><div class="fbox" style="font-size:13px">n(A∪B∪C) = n(A)+n(B)+n(C) − n(A∩B)−n(B∩C)−n(A∩C) + n(A∩B∩C)</div><div class="fnote">Pattern: add individuals → subtract pairs → add the triple back.</div>`,'ai',300);
  await cont(feed,'Solve a real problem with me →');
  await addMsg(feed,`Let's apply the 2-set formula right now. A class has 60 students. 35 like cricket, 28 like football, and 18 like both. How many like at least one sport?`,'ai',0);
  await addMsg(feed,`Think before scrolling... Got it? Here's the solution:<br><br>
    n(C∪F) = n(C) + n(F) − n(C∩F)<br>
    = 35 + 28 − 18<br>
    = <span class="hg">45 students</span> like at least one sport<br><br>
    And how many like neither? 60 − 45 = <span class="ha">15 students</span>`,'ai',400);
  await addMsg(feed,`<strong>Why subtract n(C∩F)?</strong> Those 18 "both" students were counted once in the 35 AND once in the 28 — so 35 + 28 = 63 counts them twice. Subtract once to fix: 63 − 18 = 45. ✓`,'ai',600);
  await addMsg(feed,`<strong>JEE Mains style:</strong> "In a survey of 700 people, 200 read Hindi newspaper, 300 read English, 100 read both. How many read neither?"<br><br>
    n(H∪E) = 200 + 300 − 100 = 400<br>
    Neither = 700 − 400 = <span class="hg">300 people</span><br><br>
    This exact type appears almost every year in JEE Mains. Formula banao, plug in karo, done.`,'ai',800);
  await addMsg(feed,`<div class="ex-box"><div class="ex-tag">Important: "exactly one" vs "at least one"</div><div class="ex-b">
    <strong>At least one (A∪B):</strong> n(A) + n(B) − n(A∩B)<br>
    <strong>Exactly one:</strong> n(A) + n(B) − 2·n(A∩B) = n(A∪B) − n(A∩B)<br>
    <strong>Only A (not B):</strong> n(A) − n(A∩B)<br>
    <strong>Neither:</strong> n(U) − n(A∪B)
  </div></div>`,'ai',1000);

}

async function teachC5(feed){
  await addMsg(feed,`Back to our dice. U = {1,2,3,4,5,6}, A = {4,5,6}.<br><br>The <span class="hi">complement A'</span> = everything in U that is NOT in A. What is it?`,'ai',0);
  await addMsg(feed,`<strong>A.</strong> {4,5,6} &nbsp;&nbsp;<strong>B.</strong> {1,2,3} &nbsp;&nbsp;<strong>C.</strong> {} (empty)`,'ai',200);
  const btns=document.createElement('div');btns.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;';
  ['{4,5,6}','{1,2,3}','{}'].forEach((txt,i)=>{
    const b=document.createElement('button');b.className='btn '+(i===1?'bg':'ba');b.textContent=txt;
    b.onclick=async()=>{
      btns.remove();
      if(i===1){
        await addMsg(feed,`<span class="hg">✓ Correct!</span> A' = {1,2,3} — the dice faces not in A.<br><br>
          Key properties:<br>• <span class="ha">A ∪ A' = U</span> (together they cover everything)<br>• <span class="ha">A ∩ A' = ∅</span> (nothing in common)<br>• <span class="ha">(A')' = A</span> (double complement brings you back)`,'ok',0);
      } else {
        await addMsg(feed,`The complement is U minus A. U = {1..6}, A = {4,5,6}. Remove A from U → <span class="hg">{1,2,3}</span>.`,'ng',0);
      }
      await addMsg(feed,`<strong>De Morgan's Laws</strong> (JEE favourite):<br>
        <div class="fbox">(A∪B)' = A'∩B'</div>
        <div class="fbox">(A∩B)' = A'∪B'</div>
        <div class="fnote">Complement flips ∪ to ∩ and vice versa. Think: "NOT (this OR that)" = "NOT this AND NOT that".</div>`,'ai',400);
      await addMsg(feed,`<div class="ex-box"><div class="ex-tag">Set Difference A−B</div><div class="ex-b">Elements in A but NOT in B.<br><div class="fbox" style="font-size:13px">A−B = {x : x∈A and x∉B}</div><strong>Note:</strong> A−B ≠ B−A in general!</div></div>`,'ai',600);
      await cont(feed,'De Morgan examples →');
      await addMsg(feed,`De Morgan's Laws are the most tested complement rules in JEE. Let me verify them with actual numbers so you see WHY they work.`,'ai',0);
      await addMsg(feed,`<strong>Setup:</strong> U = {1,2,3,4,5,6,7,8,9,10}<br>
        A = {2,3,5,7} (prime numbers in U)<br>
        B = {1,3,5,7,9} (odd numbers in U)<br><br>
        <strong>Verify Law 1: (A∪B)' = A'∩B'</strong><br><br>
        A∪B = {1,2,3,5,7,9} → (A∪B)' = {4,6,8,10} ← LHS<br>
        A' = {1,4,6,8,9,10}<br>
        B' = {2,4,6,8,10}<br>
        A'∩B' = {4,6,8,10} ← RHS<br><br>
        LHS = RHS = <span class="hg">{4,6,8,10} ✓</span>`,'ai',400);
      await addMsg(feed,`<strong>Meaning in words:</strong><br><br>
        (A∪B)' = "NOT in A and NOT in B" — exactly what A'∩B' says.<br>
        Whenever you see a complement pushed inside brackets, the ∪ flips to ∩ and vice versa.<br><br>
        <div class="fbox" style="font-size:13px">(A∪B)' = A'∩B' &nbsp;&nbsp;|&nbsp;&nbsp; (A∩B)' = A'∪B'</div>`,'ai',600);
      await addMsg(feed,`<strong>Quick trick for JEE:</strong><br><br>
        n(A'∩B') = n((A∪B)') = n(U) − n(A∪B)<br><br>
        So if a question gives you n(U), n(A), n(B), n(A∩B) and asks for n(A'∩B') — use De Morgan's to convert it to a complement of a union, then use the subtraction formula. One step!`,'ai',800);
    };
    btns.appendChild(b);
  });
  feed.appendChild(btns);

}

async function teachC6(feed){
  await addMsg(feed,`Let's start with a question: what does <span class="ha">A ⊆ B</span> mean?<br><br>It means every element of A is also in B. Example: {1,2} ⊆ {1,2,3} ✓<br><br>A <span class="ha">subset</span> is simply a smaller (or equal) collection from inside another set.`,'ai',0);
  await cont(feed,'Got it, what is a Power Set? →');
  await addMsg(feed,`The <span class="hi">Power Set P(A)</span> is the set of <em>all possible subsets</em> of A — including the empty set and A itself.<br><br>Example: A = {1,2}<br>All subsets: ∅, {1}, {2}, {1,2}<br>So P(A) = { ∅, {1}, {2}, {1,2} }<br><br>Notice: |P(A)| = 4. How many elements are in A? Just 2. And 2² = 4.`,'ai',300);
  await cont(feed,'I see the pattern! Let me verify →');
  await addMsg(feed,`A = {1, 2, 3}. Let's count all its subsets together — for each element you decide: In or Out.`,'ai',200);
  await addMsg(feed,`For each of the 3 elements, you have exactly <em>2 choices</em>: include it or leave it out.<br><br>
    Element 1: In or Out → 2 options<br>Element 2: In or Out → 2 options<br>Element 3: In or Out → 2 options<br><br>
    Total combinations = 2 × 2 × 2 = ?`,'ai',300);
  const btns=document.createElement('div');btns.style.cssText='display:flex;gap:8px;margin-top:8px;';
  ['6','8','9'].forEach((txt,i)=>{
    const b=document.createElement('button');b.className='btn '+(i===1?'bg':'ba');b.textContent=txt;
    b.onclick=async()=>{
      btns.remove();
      if(i===1){
        await addMsg(feed,`<span class="hg">✓ 8!</span> Let's list them all:<br><br>
          {}, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}<br><br>
          <div class="fbox">|P(A)| = 2ⁿ where n = |A|</div>
          <div class="fnote">P(A) = Power Set = set of ALL subsets. For n=3: 2³ = 8.</div>`,'ok',0);
      } else {
        await addMsg(feed,`Not quite. Count them: {} + three singles + three pairs + {1,2,3} = 1+3+3+1 = <span class="hg">8 = 2³</span>.`,'ng',0);
      }
      await addMsg(feed,`<div class="warn"><div class="warn-t">⚠ Proper Subsets = 2ⁿ − 1</div><div class="warn-b">Exclude A itself. ∅ IS a proper subset. So {1,2,3} has 7 proper subsets.</div></div>`,'ai',400);
      await addMsg(feed,`<div class="ex-box"><div class="ex-tag">Subset vs Proper Subset</div><div class="ex-b">
        <strong>A ⊆ B</strong>: every element of A is in B (includes case A = B)<br>
        <strong>A ⊂ B</strong>: A ⊆ B AND A ≠ B<br>
        ∅ is a subset of EVERY set. Every set is a subset of itself.
      </div></div>`,'ai',600);
      await cont(feed,'JEE level questions →');
      await addMsg(feed,`The 2ⁿ formula leads to some beautiful JEE questions. Let me walk through the 3 most common types:`,'ai',0);
      await addMsg(feed,`<strong>Type 1 (CBSE/Easy):</strong> A = {a,b,c,d}. How many subsets?<br>
        |A| = 4 → subsets = 2⁴ = <span class="hg">16</span><br><br>
        <strong>Type 2 (Mains):</strong> A set has 63 proper subsets. How many elements?<br>
        Proper subsets = 2ⁿ − 1 = 63 → 2ⁿ = 64 = 2⁶ → <span class="hg">n = 6</span><br><br>
        <strong>Type 3 (Advanced):</strong> Non-empty proper subsets = 30. Find |A|.<br>
        Non-empty proper = 2ⁿ − 2 = 30 → 2ⁿ = 32 = 2⁵ → <span class="hg">n = 5</span>`,'ai',400);
      await addMsg(feed,`<strong>Why 2ⁿ − 2 for non-empty proper subsets?</strong><br><br>
        Total subsets = 2ⁿ<br>
        Remove ∅ (the empty set) → 2ⁿ − 1 proper subsets... wait, that's wrong!<br><br>
        Actually: proper subsets = exclude A itself = 2ⁿ − 1<br>
        Non-empty proper = exclude both ∅ AND A = 2ⁿ − 2<br><br>
        <div class="warn" style="margin:8px 0"><div class="warn-t">⚠ Don't confuse these</div><div class="warn-b">
          All subsets: 2ⁿ<br>
          Proper subsets (A ⊂ S, not equal): 2ⁿ − 1<br>
          Non-empty proper subsets: 2ⁿ − 2
        </div></div>`,'ai',600);
      await addMsg(feed,`<strong>JEE Advanced bonus — Power Set of Power Set:</strong><br><br>
        If |A| = n, then |P(A)| = 2ⁿ<br>
        So |P(P(A))| = 2^(2ⁿ)<br><br>
        Example: |A| = 3 → |P(A)| = 8 → |P(P(A))| = 2⁸ = 256<br><br>
        This appears as a 1-liner in JEE Advanced. Know it cold.`,'ai',800);
    };
    btns.appendChild(b);
  });
  feed.appendChild(btns);

}

// ═══════ QUESTION DATA ═══════
const QS={
c1:[
  {id:'c1q1',level:'cbse',diff:1,text:'Which of the following is a well-defined set?',
   opts:['The collection of five most talented singers','The collection of all even natural numbers less than 20','The collection of most intelligent students','The collection of beautiful paintings'],
   correct:1,concept:'c1',
   exp:{short:'A set must have an unambiguous membership rule.',
     steps:['Option A: "most talented" is subjective — no clear rule.','Option B: Even naturals < 20 = {2,4,6,8,10,12,14,16,18} — completely objective.','Option C: "most intelligent" is subjective.','Option D: "beautiful" depends on opinion.'],
     answer:'Option B — even natural numbers < 20. The rule is clear and testable for any number.'}},
  {id:'c1q2',level:'mains',diff:2,text:'If A = {x : x is a letter in "FOLLOW"}, what is |A|?',
   opts:['6','5','4','3'],correct:2,concept:'c1',
   exp:{short:'Sets only keep distinct elements — duplicates are ignored.',
     steps:['Letters in FOLLOW: F,O,L,L,O,W','Remove duplicates: F,O,L,W','|A| = 4'],
     answer:'|A| = 4. The set is {F,O,L,W}. L and O each appear twice but are counted once.'}},
  {id:'c1q3',level:'advanced',diff:3,text:'If A = {x : x²−5x+6=0} and B = {x : x²−3x+2=0}, then A∩B = ?',
   opts:['{2}','{3}','{2,3}','{1,2,3}'],correct:0,concept:'c1',
   exp:{short:'A∩B (intersection) = elements that appear in BOTH sets. Solve each equation first, then find the common element.',
     steps:['<strong>What is A∩B?</strong> The intersection — elements belonging to BOTH A and B simultaneously.',
       'Solve A: x²−5x+6=0 → (x−2)(x−3)=0 → x=2 or x=3 → A = {2,3}',
       'Solve B: x²−3x+2=0 → (x−1)(x−2)=0 → x=1 or x=2 → B = {1,2}',
       'A∩B = elements in A AND in B = only 2 appears in both sets'],
     answer:'A∩B = {2}. The only element satisfying both equations is x=2.'}}
],
c2:[
  {id:'c2q1',level:'cbse',diff:1,text:'Roster form of A = {x : x ∈ ℕ, 3 < x < 8}',
   opts:['{3,4,5,6,7,8}','{4,5,6,7}','{3,4,5,6,7}','{4,5,6,7,8}'],correct:1,concept:'c2',
   exp:{short:'Strict inequalities — 3 and 8 are excluded.',
     steps:['3 < x < 8 (strict — 3 and 8 not included)','Natural numbers: 4,5,6,7'],
     answer:'A = {4,5,6,7}.'}},
  {id:'c2q2',level:'mains',diff:2,text:'Set-builder form of B = {1, 1/2, 1/3, 1/4, 1/5}',
   opts:['B = {x : x = 1/n, n ∈ {1,2,3,4,5}}','B = {x : x < 1, x > 0}','B = {x : x is a fraction < 1}','B = {x : 0 < x ≤ 1}'],correct:0,concept:'c2',
   exp:{short:'Identify the pattern: each element is 1/n for n=1 to 5.',
     steps:['1=1/1, 1/2, 1/3, 1/4, 1/5 → pattern is 1/n, n=1..5','Options B,C,D include infinitely many values.'],
     answer:'B = {x : x = 1/n, n ∈ {1,2,3,4,5}}.'}},
  {id:'c2q3',level:'advanced',diff:3,text:'{x ∈ ℝ : |x²−4| ≤ 0} in Roster form is:',
   opts:['{−2,2}','{2}','∅','{0,2,−2}'],correct:0,concept:'c2',
   exp:{short:'|expression| ≤ 0 forces the expression to be exactly 0.',
     steps:['|x²−4| ≥ 0 always. So |x²−4| ≤ 0 forces |x²−4| = 0','x²−4=0 → x²=4 → x=±2'],
     answer:'{−2,2}.'}}
],
c3:[
  {id:'c3q1',level:'cbse',diff:1,text:'Is the set {0} an empty set?',
   opts:['Yes, zero means nothing','No — {0} is a singleton set','Yes, {0} and ∅ are equivalent','Cannot be determined'],correct:1,concept:'c3',
   exp:{short:'Zero is a number. An empty set contains nothing — not even zero.',
     steps:['{0} contains one element: the number 0','∅ = {} contains zero elements — nothing at all','Zero is not "nothing" — it is a specific numerical value'],
     answer:'{0} is a singleton set. ∅ is the empty set. They are completely different.'}},
  {id:'c3q2',level:'mains',diff:2,text:'Which is an infinite set?',
   opts:['{x : x is prime, x < 100}','{x : x ∈ ℕ, x² < 50}','{x : x is a prime number}','{x : x is a vowel}'],correct:2,concept:'c3',
   exp:{short:'An infinite set has no upper bound on elements.',
     steps:['A: primes < 100 — finite (2,3,5,...,97)','B: x²<50 → x<7.1 → {1,2,3,4,5,6,7} — finite','C: primes go on forever (Euclid proved this)','D: vowels = {a,e,i,o,u} — exactly 5'],
     answer:'C — the set of all prime numbers is infinite.'}},
  {id:'c3q3',level:'advanced',diff:3,text:'Let A = {x : x is a subset of {1,2}}. What is |A|?',
   opts:['2','3','4','5'],correct:2,concept:'c3',
   exp:{short:'A is being defined as the collection of ALL subsets of {1,2}. Count them all to find |A|.',
     steps:['<strong>Recall:</strong> |A| means the number of elements in set A.',
       'The question says A = the set of all subsets of {1,2}. So each SUBSET of {1,2} is one ELEMENT of A.',
       'List ALL subsets of {1,2}: (1) empty set ∅, (2) {1}, (3) {2}, (4) {1,2}',
       'So A = {∅, {1}, {2}, {1,2}} — a set containing 4 elements (each element is itself a set)',
       'Therefore |A| = 4. This is the Power Set P({1,2}), and |P(S)| = 2ⁿ where n=|S|. Here n=2, so 2²=4.'],
     answer:'|A| = 4. A has 4 elements — the 4 subsets of {1,2}: ∅, {1}, {2}, {1,2}.'}}
],
c4:[
  {id:'c4q1',level:'cbse',diff:1,text:'40 study Maths, 30 study Science, 15 study both. How many study at least one?',
   opts:['70','55','45','85'],correct:1,concept:'c4',
   exp:{short:'n(M∪S) = n(M)+n(S)−n(M∩S)',
     steps:['n(M∪S) = 40+30−15 = 55','The 15 "both" students were counted twice; subtract once.'],
     answer:'55 students.'}},
  {id:'c4q2',level:'mains',diff:2,text:'600 students: 150 drink tea, 225 drink coffee, 100 drink both. How many drink neither?',
   opts:['325','275','225','300'],correct:0,concept:'c4',
   exp:{short:'Find n(T∪C), then subtract from total.',
     steps:['n(T∪C) = 150+225−100 = 275','Neither = 600−275 = 325'],
     answer:'325 students drink neither.'}},
  {id:'c4q3',level:'advanced',diff:3,text:'70 students: 37 like cricket, 48 football, 27 hockey, 19 like C∩F, 12 like F∩H, 4 like all three. Find n(C∩H).',
   opts:['15','11','7','9'],correct:0,concept:'c4',
   exp:{short:'Use the three-set union formula and solve for the unknown.',
     steps:['n(C∪F∪H)=n(C)+n(F)+n(H)−n(C∩F)−n(F∩H)−n(C∩H)+n(all)','70=37+48+27−19−12−n(C∩H)+4','70=85−n(C∩H)','n(C∩H)=15'],
     answer:'n(C∩H) = 15.'}}
],
c5:[
  {id:'c5q1',level:'cbse',diff:1,text:'U={1..10}, A={2,4,6,8,10}. Find A\'.',
   opts:['{1,3,5,7,9}','{2,4,6,8,10}','{1,2,3,4,5}','{5,6,7,8,9,10}'],correct:0,concept:'c5',
   exp:{short:'A\' = U − A',
     steps:['A = even numbers 1−10','A\' = U−A = odd numbers = {1,3,5,7,9}'],
     answer:'A\' = {1,3,5,7,9}.'}},
  {id:'c5q2',level:'mains',diff:2,text:'Using De Morgan\'s Law, (A\'∪B\') equals:',
   opts:['A∩B','(A∩B)\'','A\'∩B\'','(A∪B)\''],correct:1,concept:'c5',
   exp:{short:'De Morgan\'s 2nd law: (A∩B)\' = A\'∪B\'',
     steps:['De Morgan\'s 2nd: (A∩B)\' = A\'∪B\'','Therefore A\'∪B\' = (A∩B)\''],
     answer:'(A∩B)\'.'}},
  {id:'c5q3',level:'advanced',diff:3,text:'n(U)=50, n(A)=20, n(B)=28, n(A∩B)=8. Find n(A\'∩B\').',
   opts:['10','14','18','22'],correct:0,concept:'c5',
   exp:{short:'Use De Morgan\'s: A\'∩B\' = (A∪B)\'',
     steps:['n(A∪B) = 20+28−8 = 40','n(A\'∩B\') = n((A∪B)\') = n(U)−n(A∪B) = 50−40 = 10'],
     answer:'n(A\'∩B\') = 10.'}}
],
c6:[
  {id:'c6q1',level:'cbse',diff:1,text:'How many subsets does {a,b,c,d} have?',
   opts:['8','12','16','4'],correct:2,concept:'c6',
   exp:{short:'Subsets = 2ⁿ where n = number of elements.',
     steps:['|{a,b,c,d}| = 4','2⁴ = 16'],
     answer:'16 subsets.'}},
  {id:'c6q2',level:'mains',diff:2,text:'A set has 63 proper subsets. How many elements does it have?',
   opts:['5','6','7','8'],correct:1,concept:'c6',
   exp:{short:'Proper subsets = 2ⁿ−1. Solve for n.',
     steps:['2ⁿ−1 = 63 → 2ⁿ = 64 = 2⁶ → n = 6'],
     answer:'6 elements.'}},
  {id:'c6q3',level:'advanced',diff:3,text:'Number of non-empty proper subsets of A is 30. What is |A|?',
   opts:['4','5','6','7'],correct:1,concept:'c6',
   exp:{short:'Non-empty proper subsets = 2ⁿ−2 (exclude ∅ and A itself).',
     steps:['2ⁿ−2 = 30 → 2ⁿ = 32 = 2⁵ → n = 5'],
     answer:'|A| = 5.'}}
]};

// ─── CONCEPT QUESTIONS ───────────────────────────────────────


// ─── NUMERICALS ──────────────────────────────────────────────
const NUMS=[
  {level:'cbse',concept:'c4',title:'Numerical 1 — Basic Union Formula',
   problem:'In a group of 65 people, 40 like cricket and 25 like football. Everyone likes at least one. How many like both?',
   opts:['n(C∩F) = 5','n(C∩F) = 0','n(C∩F) = 15','n(C∩F) = 10'],correct:1,
   steps:['n(C∪F) = 65 (everyone likes at least one)','n(C∪F) = n(C)+n(F)−n(C∩F)','65 = 40+25−n(C∩F)','65 = 65−n(C∩F)','n(C∩F) = 0'],
   answer:'n(C∩F) = 0. The groups are completely disjoint — no one likes both!'},
  {level:'cbse',concept:'c4',title:'Numerical 2 — Three Sets Word Problem',
   problem:'60 students: 30 French, 20 Spanish, 25 German, 7 French∩Spanish, 5 Spanish∩German, 8 French∩German, 3 all three. How many study none?',
   opts:['4 students','2 students','6 students','0 students'],correct:1,
   steps:['n(F∪S∪G) = 30+20+25 − 7−5−8 + 3 = 58','None = 60−58 = 2'],
   answer:'2 students study none of the three languages.'},
  {level:'mains',concept:'c5',title:'Numerical 3 — Finding n(A) from complement info',
   problem:'n(U)=200, n(A\'∩B\')=50, n(A\'∩B)=30. Find n(A).',
   opts:['n(A) = 100','n(A) = 120','n(A) = 150','n(A) = 80'],correct:1,
   steps:['n(A\'∩B\') = n((A∪B)\') = 50 → n(A∪B) = 150','n(A\') = n(A\'∩B\')+n(A\'∩B) = 50+30 = 80','n(A) = n(U)−n(A\') = 200−80 = 120'],
   answer:'n(A) = 120.'},
  {level:'mains',concept:'c6',title:'Numerical 4 — Power Set Ratio',
   problem:'Set A has 3 more elements than set B. If |P(A)| = 8 × |P(B)|, find |B| and |A|.',
   opts:['|B| = 2, |A| = 5','|B| = 3, |A| = 6','|B| can be any value','|B| = 1, |A| = 4'],correct:0,
   steps:['Let |B| = n, so |A| = n + 3',
     '|P(A)| = 2^(n+3), |P(B)| = 2^n',
     'Given ratio: 2^(n+3) / 2^n = 8',
     '2^(n+3−n) = 8 → 2³ = 8 ✓ This holds for ANY value of n.',
     'The ratio condition only tells us the DIFFERENCE is 3, not the actual value.',
     'The question needs an extra constraint. The simplest valid pair: |B|=2, |A|=5.',
     'Check: |P(A)| = 2⁵ = 32, |P(B)| = 2² = 4. Ratio = 32/4 = 8 ✓'],
   answer:'|B| = 2, |A| = 5 (or any pair where |A|−|B|=3). The ratio 8 = 2³ confirms a 3-element difference.'},
  {level:'mains',concept:'c5',title:'Numerical 5 — De Morgan Verification',
   problem:'U={1..10}, A={2,3,5,7}, B={1,3,5,8,9}. What is A\'∩B\'?',
   opts:['{4,6,10}','{1,2,4,6}','{3,5}','{4,6,8,10}'],correct:0,
   steps:['A\' = U−A = {1,4,6,8,9,10}','B\' = U−B = {2,4,6,7,10}','A\'∩B\' = {4,6,10}','Verify: (A∪B)\' = U−{1,2,3,5,7,8,9} = {4,6,10} ✓ De Morgan holds'],
   answer:'A\'∩B\' = {4,6,10}. De Morgan\'s Law verified.'},
  {level:'advanced',concept:'c4',title:'Numerical 6 — Three Sets with Unknowns',
   problem:'n(P)=25, n(C)=23, n(M)=24, n(P∩C)=12, n(M∩C)=11, n(P∩M)=13, n(all three)=6. Total=50. Find n(P\'∩C\'∩M\').',
   opts:['8','10','12','6'],correct:0,
   steps:['n(P∪C∪M) = 25+23+24 − 12−11−13 + 6 = 72−36+6 = 42','n(P\'∩C\'∩M\') = n((P∪C∪M)\') = 50−42 = 8'],
   answer:'8 students study none of the three subjects.'},
  {level:'advanced',concept:'c4',title:'Numerical 7 — Symmetric Difference',
   problem:'n(A)=8, n(B)=6, n(A∩B)=3. Find n(A△B) where A△B = (A−B)∪(B−A).',
   opts:['6','8','11','5'],correct:1,
   steps:['n(A−B) = n(A)−n(A∩B) = 8−3 = 5','n(B−A) = n(B)−n(A∩B) = 6−3 = 3','A−B and B−A are disjoint, so n(A△B) = 5+3 = 8','Alternative: n(A△B) = n(A∪B)−n(A∩B) = (8+6−3)−3 = 8 ✓'],
   answer:'n(A△B) = 8.'},
  {level:'advanced',concept:'c6',title:'Numerical 8 — Cartesian Product & Power Set',
   problem:'A×B = {(1,a),(1,b),(2,a),(2,b)}. Find |P(A×B)|.',
   opts:['8','16','4','32'],correct:1,
   steps:['From pairs: A = {1,2}, B = {a,b}','|A×B| = 2×2 = 4','|P(A×B)| = 2⁴ = 16'],
   answer:'|P(A×B)| = 16.'}
];

// ─── QUESTION BANK ───────────────────────────────────────────
const QB=[
  {id:'qb1',level:'cbse',diff:1,concept:'c1',text:'Which is a valid set? (A) {most talented singers} (B) {even naturals < 20} (C) {intelligent students} (D) {beautiful paintings}',
   opts:['Option A','Option B','Option C','Option D'],correct:1,
   exp:{steps:['Only B has an objective rule.'],answer:'Option B = {2,4,6,...,18}.'}},
  {id:'qb2',level:'cbse',diff:1,concept:'c1',text:'A = {1,2,3,4}, B = {3,4,5,6}. What is A−B?',
   opts:['{1,2}','{3,4}','{5,6}','{1,2,3,4,5,6}'],correct:0,
   exp:{steps:['A−B = elements in A but not B','3 and 4 are in B, so remove them','A−B = {1,2}'],answer:'A−B = {1,2}.'}},
  {id:'qb3',level:'cbse',diff:1,concept:'c2',text:'Roster form of {1,4,9,16,25}:',
   opts:['{x:x≤25}','{x:x=n²,n∈ℕ,1≤n≤5}','{x:x is perfect square}','{x:x divisible by 4}'],correct:1,
   exp:{steps:['1=1²,4=2²,...,25=5²','Pattern: squares of 1 to 5'],answer:'{x:x=n²,n∈{1,2,3,4,5}}.'}},
  {id:'qb4',level:'cbse',diff:1,concept:'c3',text:'Which set equals {1,2,3}?',
   opts:['{1,2,2,3}','{3,2,1,0}','{1,2}','{1,2,3,4}'],correct:0,
   exp:{steps:['{1,2,2,3}: duplicate ignored → {1,2,3} ✓'],answer:'{1,2,2,3} = {1,2,3}.'}},
  {id:'qb5',level:'cbse',diff:1,concept:'c4',text:'n(A)=12, n(B)=15, n(A∩B)=5. Find n(A∪B).',
   opts:['22','32','27','17'],correct:0,
   exp:{steps:['n(A∪B) = 12+15−5 = 22'],answer:'22.'}},
  {id:'qb6',level:'cbse',diff:1,concept:'c5',text:'U={1..10}, A={1,3,5,7,9}. Find A\'.',
   opts:['{2,4,6,8,10}','{1,3,5,7,9}','{0,2,4,6,8,10}','{1,2,3,4,5}'],correct:0,
   exp:{steps:['A = odds. A\' = evens = {2,4,6,8,10}'],answer:'{2,4,6,8,10}.'}},
  {id:'qb7',level:'cbse',diff:1,concept:'c6',text:'How many subsets does {p,q} have?',
   opts:['2','3','4','6'],correct:2,
   exp:{steps:['2² = 4. Subsets: {},{p},{q},{p,q}'],answer:'4 subsets.'}},
  {id:'qb8',level:'cbse',diff:1,concept:'c3',text:'The set of months having 28 days is:',
   opts:['∅','Singleton set','2 elements','11 elements'],correct:1,
   exp:{steps:['Every month has ≥28 days. Only Feb has exactly 28 (non-leap). Set = {February}.'],answer:'Singleton set.'}},
  {id:'qb9',level:'mains',diff:2,concept:'c4',text:'300 watch Star Sports, 240 ESPN, 150 both. Exactly one channel?',
   opts:['240','390','300','150'],correct:0,
   exp:{steps:['Only Star: 300−150=150. Only ESPN: 240−150=90. Total: 240'],answer:'240.'}},
  {id:'qb10',level:'mains',diff:2,concept:'c5',text:'n(A\'∩B\')=12, n(U)=50, n(A)=22, n(B)=25. Find n(A∩B).',
   opts:['7','9','11','15'],correct:1,
   exp:{steps:['n(A∪B) = 50−12 = 38','n(A∩B) = 22+25−38 = 9'],answer:'9.'}},
  {id:'qb11',level:'mains',diff:2,concept:'c6',text:'|P(P(A))| if |A|=n:',
   opts:['2ⁿ','2^(2ⁿ)','4n','n²'],correct:1,
   exp:{steps:['|P(A)|=2ⁿ. |P(P(A))| = 2^(2ⁿ)'],answer:'2^(2ⁿ).'}},
  {id:'qb12',level:'mains',diff:2,concept:'c4',text:'A={x:x²−7x+10=0}, B={x:x²−5x+6=0}. A∪B=?',
   opts:['{2,3,5}','{2,5}','{3,5}','{2,3}'],correct:0,
   exp:{steps:['A={2,5}, B={2,3}. A∪B={2,3,5}'],answer:'{2,3,5}.'}},
  {id:'qb13',level:'mains',diff:2,concept:'c5',text:'Which is always true?',
   opts:['A−B=B−A','(A−B)∩B=∅','A∩B\'=B∩A\'','(A∪B)−A=A'],correct:1,
   exp:{steps:['A−B = in A, not B. (A−B)∩B requires being in B and not in B — impossible.'],answer:'(A−B)∩B = ∅.'}},
  {id:'qb14',level:'mains',diff:2,concept:'c6',text:'If P(A)⊆P(B), then:',
   opts:['A⊆B','B⊆A','A=B','Nothing'],correct:0,
   exp:{steps:['For any x∈A: {x}∈P(A)⊆P(B) → {x}⊆B → x∈B'],answer:'A⊆B.'}},
  {id:'qb15',level:'mains',diff:2,concept:'c3',text:'Which pairs are equal sets?',
   opts:['A={2,3},B={x:x²−5x+6=0}','A={1},B=∅','A={0,1},B={1,0,0}','Both A and C'],correct:3,
   exp:{steps:['A: B={2,3}=A ✓','C: B={0,1}=A ✓','Both pairs are equal'],answer:'Both A and C.'}},
  {id:'qb16',level:'advanced',diff:3,concept:'c4',text:'20% mango, 30% orange, 40% banana, 10% M∩O, 10% O∩Ba, 10% M∩Ba, 5% all. % like none?',
   opts:['15%','20%','25%','35%'],correct:3,
   exp:{steps:['n(M∪O∪B)=20+30+40−10−10−10+5=65%','None=100−65=35%'],answer:'35%.'}},
  {id:'qb17',level:'advanced',diff:3,concept:'c5',text:'n(A∪B)=50,n(A)=28,n(B)=32. Find n(A\'∩B\') if U=A∪B.',
   opts:['0','5','10','15'],correct:0,
   exp:{steps:['If U=A∪B then n(A\'∩B\')=n((A∪B)\')=0'],answer:'0.'}},
  {id:'qb18',level:'advanced',diff:3,concept:'c6',text:'A={1,..,10}. Pairs (B,C) with B⊆C⊆A:',
   opts:['2¹⁰','3¹⁰','2¹⁰+3¹⁰','(3¹⁰+1)/2'],correct:1,
   exp:{steps:['For each element: 3 choices (not in C, in C not B, in both). Total=3¹⁰'],answer:'3¹⁰.'}},
  {id:'qb19',level:'advanced',diff:3,concept:'c4',text:'n(A△B)=n(A)+n(B)−2n(A∩B). A=7,B=5,A∩B=3. Find n(A△B).',
   opts:['4','6','8','9'],correct:1,
   exp:{steps:['7+5−2(3)=12−6=6'],answer:'6.'}},
  {id:'qb20',level:'advanced',diff:3,concept:'c5',text:'Which example shows (A−B)−C ≠ A−(B−C)?',
   opts:['A={1,2,3},B={1,2},C={2}','A={1,2,3},B={2,3},C={3}','A={1,2,3},B={1},C={1,2}','Both A and B'],correct:3,
   exp:{steps:['Example A: (A−B)−C={3}; A−(B−C)={2,3}. Different ✓','Example B: (A−B)−C={1}; A−(B−C)={1,3}. Different ✓'],answer:'Both A and B.'}},
  {id:'qb21',level:'mains',diff:2,concept:'c6',text:'|A|=2. How many relations from A to A?',
   opts:['4','8','16','2'],correct:2,
   exp:{steps:['A×A has 4 pairs. Relations = subsets of A×A = 2⁴=16'],answer:'16.'}},
  {id:'qb22',level:'cbse',diff:1,concept:'c4',text:'If A⊆B, what is A∩B?',
   opts:['B','A','∅','A∪B'],correct:1,
   exp:{steps:['All of A is in B, so A∩B = A'],answer:'A.'}},
  {id:'qb23',level:'cbse',diff:1,concept:'c5',text:'If A⊆B, what is A−B?',
   opts:['A','B','∅','B−A'],correct:2,
   exp:{steps:['Every element of A is in B, so nothing is in A but not B'],answer:'∅.'}},
  {id:'qb24',level:'mains',diff:2,concept:'c4',text:'n(A∪B)=50, n(A)=28, n(B)=32. Is this possible?',
   opts:['Yes, always','No, intersection would be negative','Yes, n(A∩B)=10','Not enough info'],correct:2,
   exp:{steps:['n(A∩B)=28+32−50=10 ≥ 0 ✓'],answer:'Yes, n(A∩B)=10.'}},
  {id:'qb25',level:'advanced',diff:3,concept:'c3',text:'A={x:x/|x|, x≠0, x∈ℝ} in Roster form:',
   opts:['{−1,0,1}','{−1,1}','{1}','∅'],correct:1,
   exp:{steps:['x/|x|=+1 if x>0, −1 if x<0. Set of values = {−1,1}'],answer:'{−1,1}.'}},
  {id:'qb26',level:'mains',diff:2,concept:'c5',text:'A∩(B−A) = ?',
   opts:['A','B','∅','A−B'],correct:2,
   exp:{steps:['B−A = {x∈B, x∉A}. A∩(B−A) requires x∈A AND x∉A — contradiction.'],answer:'∅.'}},
  {id:'qb27',level:'advanced',diff:3,concept:'c6',text:'|P(A)|=|P(B)|=64. |A△B| can be:',
   opts:['0 only','0 or 6','0,2,4,6','Any even ≤6'],correct:2,
   exp:{steps:['64=2⁶ → |A|=|B|=6. Same-size sets: symmetric difference always even. Max=6.'],answer:'0,2,4, or 6.'}},
  {id:'qb28',level:'cbse',diff:1,concept:'c1',text:'{x:x+8=8} = ∅?',
   opts:['True','False, x=0 is a solution','True, zero is not a number','False, x=8'],correct:1,
   exp:{steps:['x+8=8 → x=0. Set = {0}, a singleton, not empty.'],answer:'False.'}},
  {id:'qb29',level:'mains',diff:2,concept:'c6',text:'n(A)=4. Subsets with at least 2 elements:',
   opts:['10','11','12','6'],correct:1,
   exp:{steps:['Total=16, subsets with 0 el=1, with 1 el=4. At least 2: 16−5=11'],answer:'11.'}},
  {id:'qb30',level:'advanced',diff:4,concept:'c4',text:'Each student studies ≥1 of Maths,Physics,Chemistry. M=40,P=50,C=60,M∩P=20,P∩C=15,M∩C=25,all=10. Total?',
   opts:['100','110','120','130'],correct:0,
   exp:{steps:['n(M∪P∪C)=40+50+60−20−15−25+10=100'],answer:'100 students.'}}
];

// ─── REGISTER WITH PLATFORM ──────────────────────────────────
registerChapter({
  id: 'maths-sets',
  title: 'Sets',
  subject: 'Maths · Class 11',
  class: 11,
  intro: 'Sets is the foundation of all JEE Mathematics. Every topic — Relations, Functions, Calculus — builds on this. Taught through games, not textbooks.',
  concepts: ['c1','c2','c3','c4','c5','c6'],
  conceptMeta: {
    c1: { title:'What is a Set?', shortTitle:'What is a Set?', tag:'Concept 1 of 6', icon:'🎲',
           sub:'Discover the idea through a dice game — no definitions yet.' },
    c2: { title:'Set Notation', shortTitle:'Set Notation', tag:'Concept 2 of 6', icon:'✍️',
           sub:'Two ways to write any set. JEE tests both — roster form and set-builder form.' },
    c3: { title:'Types of Sets', shortTitle:'Types of Sets', tag:'Concept 3 of 6', icon:'📦',
           sub:'A trap that catches thousands every year: is {0} empty? You will never forget after this.' },
    c4: { title:'Union & Intersection', shortTitle:'Union & Intersection', tag:'Concept 4 of 6', icon:'🔵',
           sub:'Build a Venn diagram together before touching any formula.' },
    c5: { title:'Complement & Laws', shortTitle:'Complement', tag:'Concept 5 of 6', icon:'🌐',
           sub:"De Morgan's Laws and complement — the most tested formulas in JEE Sets." },
    c6: { title:'Subsets & Power Set', shortTitle:'Subsets', tag:'Concept 6 of 6', icon:'⊆',
           sub:'The 2ⁿ formula — derive it through counting, not memorisation.' },
  },
  teach: {
    c1: (feed) => teachC1(feed),
    c2: (feed) => teachC2(feed),
    c3: (feed) => teachC3(feed),
    c4: (feed) => teachC4(feed),
    c5: (feed) => teachC5(feed),
    c6: (feed) => teachC6(feed),
  },
  conceptQs: QS,
  numericals: NUMS,
  qbank: QB,
});
