const fs = require('fs');

// Fix 1: scroll bug in all chapter files
const files = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const p = dir + '/' + f;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.js')) files.push(p);
  });
}
walk('./chapters');

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  const before = c;
  // Fix the bad scroll line
  c = c.replace(/feed\.parentElement\.scrollTop=feed\.parentElement\.scrollHeight;/g,
    "b.scrollIntoView({behavior:'smooth',block:'nearest'});");
  c = c.replace(/feed\.parentElement\.scrollTop = feed\.parentElement\.scrollHeight;/g,
    "b.scrollIntoView({behavior:'smooth',block:'nearest'});");
  if (c !== before) {
    fs.writeFileSync(file, c);
    console.log('Fixed scroll in:', file);
  }
});

// Fix 2: add game CSS to main.css
const GAME_CSS = `
.game-card{background:var(--surface);border:1px solid var(--border2);border-radius:12px;padding:16px;margin:4px 0;}
.gc-t{font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px;}
.gc-i{font-size:12px;color:var(--muted);margin-bottom:12px;}
.dice-row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:10px 0;}
.die{width:50px;height:50px;background:var(--surface2);border:1.5px solid var(--border2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;cursor:pointer;transition:all .18s;user-select:none;color:var(--text);}
.die:hover:not(.locked){border-color:var(--accent2);transform:translateY(-2px);}
.die.sel{background:rgba(34,197,94,.12);border-color:var(--green);color:var(--green);transform:translateY(-3px) scale(1.06);}
.die.miss{background:rgba(239,68,68,.08);border-color:rgba(239,68,68,.3);color:var(--red);opacity:.6;}
.die.dim{opacity:.25;cursor:default;}
.die.locked{cursor:default;}
.die.locked:hover{transform:none;}
.nl-row{display:flex;gap:5px;flex-wrap:wrap;padding:8px 0;}
.nn{width:38px;height:38px;border-radius:8px;background:var(--surface2);border:1.5px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;cursor:pointer;color:var(--text);transition:all .15s;user-select:none;}
.nn:hover{border-color:var(--accent2);}
.nn.ins{background:rgba(108,99,255,.15);border-color:var(--accent);color:var(--accent2);}
.venn-zones{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0;}
.vz{border:1.5px dashed var(--border2);border-radius:10px;padding:8px;min-height:66px;}
.vzl{font-size:10px;font-weight:700;color:var(--hint);text-align:center;margin-bottom:5px;text-transform:uppercase;letter-spacing:.05em;}
.vi-wrap{display:flex;flex-wrap:wrap;gap:4px;min-height:32px;justify-content:center;}
.vtag{padding:3px 9px;border-radius:99px;font-size:12px;font-weight:500;background:var(--surface2);border:1px solid var(--border2);color:var(--text);cursor:pointer;user-select:none;transition:all .15s;}
.vtag:hover{border-color:var(--accent2);}
.vtag.pok{background:rgba(34,197,94,.12);border-color:var(--green);color:var(--green);}
.vtag.png{background:rgba(239,68,68,.08);border-color:var(--red);color:var(--red);}
.vpool{display:flex;flex-wrap:wrap;gap:6px;padding:8px;background:var(--surface2);border-radius:8px;min-height:42px;}
.gc-btn{padding:8px 20px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;display:block;margin:8px auto 0;}
.gc-btn:hover{background:#7c6aff;}
.gc-btn:disabled{opacity:.35;cursor:not-allowed;}
`;

const cssFile = './css/main.css';
const css = fs.readFileSync(cssFile, 'utf8');
if (!css.includes('.game-card{')) {
  fs.writeFileSync(cssFile, css + GAME_CSS);
  console.log('Added game CSS to main.css');
} else {
  console.log('Game CSS already present in main.css');
}

console.log('All done! Commit and push.');
