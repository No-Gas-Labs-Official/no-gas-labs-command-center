const assert=require('node:assert/strict');
const {githubPublicObserver}=require('./contact.js');
(async()=>{
 const o=await githubPublicObserver();
 assert.equal(o.data.full_name,'No-Gas-Labs-Official/no-gas-labs');
 assert.equal(o.establishes.includes('github_public_api_reachable'),true);
 assert.ok(o.observed_at);
 console.log('CONTACT 001 live sensor: PASS',JSON.stringify(o.data));
})().catch(e=>{console.error(e);process.exit(1)});