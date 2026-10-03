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