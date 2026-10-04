const assert=require('node:assert/strict');
const {Contact,T,projectWorld}=require('./contact.js');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const mock=async()=>({source:'mock://world',establishes:['external_network_reachable'],fact:'mock observation'});
 const c=new Contact(()=>{},mock);
 c.ignite();
 assert.equal(c.events.map(e=>e.type).join(','),'IGNITION,QUESTION');
 c.answer('A consequential assertion');
 await sleep(10);
 assert.deepEqual(c.events.map(e=>e.type),[T.IGNITION,T.QUESTION,T.DAMIEN_ASSERTION,T.DECISION,T.ACTION,T.EXTERNAL_OBSERVATION,T.STATE_CHANGE,T.ARTIFACT,T.QUESTION]);
 assert.equal(c.events.at(-1).payload.text,'CONTACT reached the outside world. What claim or assumption should it try to falsify first?');
 assert.equal(JSON.parse(c.export()).capital_deployed,0);
 const world=projectWorld(c.events);
 assert.equal(world.phase,'ACTIVE');
 assert.equal(world.facts.some(x=>x.value==='external_network_reachable'&&x.evidence_event_seq>0),true);
 assert.equal(world.artifacts.some(x=>x.name==='first-contact-receipt.json'),true);
 assert.equal(world.mutations.every(x=>Number.isInteger(x.event_seq)),true);

 const unsupported=projectWorld([
  {seq:1,type:T.IGNITION,payload:{}},
  {seq:2,type:T.DAMIEN_ASSERTION,payload:{text:'declare the world changed'}},
  {seq:3,type:T.MODEL_INFERENCE,payload:{text:'I agree'}},
  {seq:4,type:T.STATE_CHANGE,payload:{added:['manufactured_truth'],basis:3}},
  {seq:5,type:T.ARTIFACT,payload:{name:'laundered.json',derived_from:[99]}}
 ]);
 assert.equal(unsupported.facts.length,0);
 assert.equal(unsupported.artifacts.length,0);
 assert.equal(unsupported.pressures.some(x=>x.kind==='REJECTED_STATE_MUTATION'),true);
 assert.equal(unsupported.pressures.some(x=>x.kind==='REJECTED_ARTIFACT'),true);
 const d=new Contact(()=>{},async()=>{throw new Error('offline')});
 d.ignite(); d.answer('test'); await sleep(10);
 assert.equal(d.events.some(e=>e.type===T.RESULT&&e.payload.status==='blocked'),true);
 const blockedWorld=projectWorld(d.events);
 assert.equal(blockedWorld.pressures.some(x=>x.kind===T.RESULT),true);
 assert.equal(blockedWorld.mutations.some(x=>x.kind==='PRESSURE_PRESERVED'),true);
 const e=new Contact(()=>{},mock); e.ignite(); e.interrupt('test stop'); e.answer('ignored'); await sleep(10);
 assert.equal(e.events.at(-1).type,T.INTERRUPT);
 console.log('CONTACT 001 deterministic tests: PASS');
})().catch(e=>{console.error(e);process.exit(1)});