const T=Object.freeze({IGNITION:"IGNITION",QUESTION:"QUESTION",DAMIEN_ASSERTION:"DAMIEN_ASSERTION",MODEL_INFERENCE:"MODEL_INFERENCE",EXTERNAL_OBSERVATION:"EXTERNAL_OBSERVATION",HYPOTHESIS:"HYPOTHESIS",CONTRADICTION:"CONTRADICTION",DECISION:"DECISION",ACTION:"ACTION",EXPERIMENT:"EXPERIMENT",ARTIFACT:"ARTIFACT",RESULT:"RESULT",RETRACTION:"RETRACTION",STATE_CHANGE:"STATE_CHANGE",CAPITAL_VIOLATION:"CAPITAL_VIOLATION",INTERRUPT:"INTERRUPT"});
async function githubPublicObserver(){
 const url="https://api.github.com/repos/No-Gas-Labs-Official/no-gas-labs";
 const r=await fetch(url,{headers:{Accept:"application/vnd.github+json"}});
 if(!r.ok) throw new Error("GitHub observation failed: HTTP "+r.status);
 const j=await r.json();
 return {source:url,observed_at:new Date().toISOString(),fact:"Public repository metadata observed directly from GitHub API.",establishes:["external_network_reachable","github_public_api_reachable"],data:{full_name:j.full_name,visibility:j.visibility,default_branch:j.default_branch,open_issues_count:j.open_issues_count,pushed_at:j.pushed_at}};
}
class Contact{
 constructor(emit,observer=githubPublicObserver){this.emit=emit;this.observer=observer;this.events=[];this.seq=0;this.capital=0;this.awaiting=null;this.stopped=false}
 record(type,payload={},causedBy=null){const e={seq:++this.seq,at:new Date().toISOString(),type,payload,causedBy};this.events.push(e);this.emit(e,this);return e}
 ignite(){if(this.stopped)return;const i=this.record(T.IGNITION,{capital_deployed:0});this.ask("What fact about the experiment would most change what CONTACT is permitted to do next?",i.seq)}
 ask(text,cause){if(this.stopped)return null;const q=this.record(T.QUESTION,{text},cause);this.awaiting=q.seq;return q}
 answer(text){if(this.stopped||!this.awaiting)return;const a=this.record(T.DAMIEN_ASSERTION,{text,authority:"founder assertion; not external observation"},this.awaiting);this.awaiting=null;this.stepwire(a)}
 async stepwire(e){
  if(this.stopped)return;
  if(e.type===T.DAMIEN_ASSERTION){
   const d=this.record(T.DECISION,{stepwire:"assertion_requires_contact",reason:"Founder assertion may alter provisional state but cannot self-verify."},e.seq);
   const a=this.record(T.ACTION,{adapter:"githubPublicObserver",purpose:"obtain an independently sourced external observation"},d.seq);
   try{
    const payload=await this.observer();
    if(this.stopped)return;
    this.observe(payload,a.seq);
   }catch(err){
    this.record(T.RESULT,{status:"blocked",adapter:"githubPublicObserver",error:String(err&&err.message||err)},a.seq);
    this.ask("External observation failed. Should CONTACT retry, choose another sensor, or treat network reachability as unresolved?",a.seq);
   }
  }
 }
 observe(payload,cause){
  if(this.stopped)return;
  const o=this.record(T.EXTERNAL_OBSERVATION,payload,cause);
  const added=Array.isArray(payload.establishes)?payload.establishes:[];
  const s=this.record(T.STATE_CHANGE,{added,basis:o.seq},o.seq);
  const art=this.record(T.ARTIFACT,{name:"first-contact-receipt.json",derived_from:[o.seq,s.seq],note:"Event-stream receipt is exportable from the mobile control surface."},s.seq);
  this.ask("CONTACT reached the outside world. What claim or assumption should it try to falsify first?",art.seq);
 }
 interrupt(reason="Founder interrupt"){if(this.stopped)return;this.stopped=true;this.awaiting=null;this.record(T.INTERRUPT,{reason,authority:"founder"},null)}
 export(){return JSON.stringify({schema:"ngl.contact.event-stream.v0",capital_deployed:this.capital,events:this.events},null,2)}
}
if(typeof window!=="undefined"){window.Contact=Contact;window.CONTACT_TYPES=T;window.githubPublicObserver=githubPublicObserver}
if(typeof module!=="undefined"&&module.exports)module.exports={Contact,T,githubPublicObserver};

function projectWorld(events){
 const world={schema:"ngl.agp.world-projection.v0",phase:"DORMANT",facts:[],pressures:[],artifacts:[],mutations:[]};
 const bySeq=new Map();
 const mutate=(kind,event,detail)=>world.mutations.push({kind,event_seq:event.seq,detail});
 for(const event of Array.isArray(events)?events:[]){
  if(!event||!Number.isInteger(event.seq)||typeof event.type!=="string") continue;
  bySeq.set(event.seq,event);
  if(event.type===T.IGNITION){
   world.phase="ACTIVE";
   mutate("WORLD_AWAKENED",event,{basis:"IGNITION"});
   continue;
  }
  if(event.type===T.STATE_CHANGE){
   const basis=bySeq.get(event.payload&&event.payload.basis);
   if(!basis||basis.type!==T.EXTERNAL_OBSERVATION){
    world.pressures.push({kind:"REJECTED_STATE_MUTATION",event_seq:event.seq,reason:"STATE_CHANGE lacks prior EXTERNAL_OBSERVATION basis"});
    continue;
   }
   const added=Array.isArray(event.payload.added)?event.payload.added:[];
   for(const fact of added){
    if(typeof fact!=="string"||!fact) continue;
    if(!world.facts.some(x=>x.value===fact)){
     world.facts.push({value:fact,event_seq:event.seq,evidence_event_seq:basis.seq});
     mutate("FACT_ADMITTED",event,{value:fact,evidence_event_seq:basis.seq});
    }
   }
   continue;
  }
  if(event.type===T.CONTRADICTION||(event.type===T.RESULT&&event.payload&&event.payload.status==="blocked")){
   const pressure={kind:event.type,event_seq:event.seq,payload:event.payload||{}};
   world.pressures.push(pressure);
   mutate("PRESSURE_PRESERVED",event,{kind:pressure.kind});
   continue;
  }
  if(event.type===T.ARTIFACT){
   const refs=Array.isArray(event.payload&&event.payload.derived_from)?event.payload.derived_from:[];
   const valid=refs.length>0&&refs.every(seq=>bySeq.has(seq)&&seq<event.seq);
   if(!valid){
    world.pressures.push({kind:"REJECTED_ARTIFACT",event_seq:event.seq,reason:"ARTIFACT derivation is missing or references unavailable/future events"});
    continue;
   }
   const artifact={name:event.payload.name||"unnamed",event_seq:event.seq,derived_from:refs.slice()};
   world.artifacts.push(artifact);
   mutate("ARTIFACT_ENTERED_WORLD",event,artifact);
   continue;
  }
  if(event.type===T.INTERRUPT){
   world.phase="INTERRUPTED";
   mutate("WORLD_INTERRUPTED",event,{authority:event.payload&&event.payload.authority||"unknown"});
  }
 }
 return world;
}
if(typeof window!=="undefined")window.projectAgpWorld=projectWorld;
if(typeof module!=="undefined"&&module.exports)module.exports.projectWorld=projectWorld;
