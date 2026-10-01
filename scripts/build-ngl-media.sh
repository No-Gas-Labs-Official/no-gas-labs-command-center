#!/usr/bin/env bash
set -euo pipefail

TITLE="${1:-NO_GAS_LABS // EXECUTION RECEIPT}"
BODY="${2:-A claim is not evidence. This artifact was compiled by a GitHub runner.}"
OUT="${3:-out}"
mkdir -p "$OUT"

command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg is required" >&2; exit 2; }
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
test -f "$FONT" || { echo "font missing: $FONT" >&2; exit 3; }

escape_drawtext() {
  printf '%s' "$1" | sed -e "s/'/'\\\\''/g" -e 's/:/\\:/g' -e 's/%/\\%/g'
}
T="$(escape_drawtext "$TITLE")"
B="$(escape_drawtext "$BODY")"

ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "color=c=0x0c0d0b:s=1080x1920:d=12:r=30" \
  -vf "drawtext=fontfile=$FONT:text='$T':fontcolor=0xe8e6dc:fontsize=58:x=70:y=250,drawtext=fontfile=$FONT:text='$B':fontcolor=0xc5cdd4:fontsize=34:x=70:y=520:box=1:boxcolor=0x141512@0.85:boxborderw=30,drawtext=fontfile=$FONT:text='Damien Featherstone // Neophyte Founder // No_Gas_Labs':fontcolor=0x9aa39a:fontsize=27:x=70:y=h-170" \
  -c:v libx264 -pix_fmt yuv420p -movflags +faststart "$OUT/ngl-short.mp4"

sha256sum "$OUT/ngl-short.mp4" | awk '{print $1}' > "$OUT/ngl-short.sha256"
python3 - "$OUT" "$TITLE" "$BODY" <<'PY'
import json, pathlib, sys, hashlib, datetime
out=pathlib.Path(sys.argv[1])
p=out/"ngl-short.mp4"
manifest={
 "schema":"ngl.media.receipt.v0",
 "status":"COMPILED_NOT_PUBLISHED",
 "title":sys.argv[2],
 "body":sys.argv[3],
 "artifact":{"path":str(p),"bytes":p.stat().st_size,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()},
 "claims":[
   {"claim":"media artifact was compiled","evidence":"artifact hash and successful compiler exit","status":"OBSERVED"},
   {"claim":"media artifact was published","evidence":None,"status":"UNVERIFIED"}
 ]
}
(out/"receipt.json").write_text(json.dumps(manifest,indent=2)+"\n")
PY
