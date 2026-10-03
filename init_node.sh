#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

printf '
[{repo}] Termux bootstrap starting...
' | sed "s/{repo}/no-gas-labs-command-center/g"
pkg update -y
pkg install -y git nodejs python clang make rust binutils termux-exec
npm config set prefix "$HOME/.npm-global"
npm config set cache "$HOME/.npm-cache"
mkdir -p "$HOME/.npm-global" "$HOME/.npm-cache"
export PATH="$HOME/.npm-global/bin:$PATH"
npm cache clean --force || true
if [ -f package-lock.json ]; then
  npm install --no-audit --no-fund
else
  npm install --no-audit --no-fund || npm install --legacy-peer-deps --no-audit --no-fund
fi
npm run build --if-present || true
npm run test --if-present || true
printf '
[no-gas-labs-command-center] Bootstrap complete.
'
