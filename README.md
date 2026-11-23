# post-tiktok-day-one-day-seven-20261123-0327

[![Day one, day seven](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
[![Rank](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/vidovizio/post-tiktok-day-one-day-seven-20261123-0327/rank.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)
[![Reward](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/vidovizio/post-tiktok-day-one-day-seven-20261123-0327/reward.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327)

An entry for make.fun's **Day one, day seven** bounty: a short vertical video about the
same tiny agent-built game on the day it was made, and again after six days of daily
updates that were built, drawn and rendered inside one recorded agent session.

## The game: Shell Cove

`Shell Cove` is a one-screen canvas game — a crab on a beach at golden hour, collecting
shells and staying clear of jellyfish. Fixed camera, 1080×1920, no dependencies, one HTML
file plus one JS file.

It was built in versions, one per "day", which is what the video is about:

| build | what the beach holds |
|-------|----------------------|
| v1 | 6 shells, 1 wild crab, a bare shoreline |
| v2–v6 | shells added daily, tide pools, drifting sand, gull shadows, wandering crabs, a combo counter instead of a flat score |
| v7 | 18 shells, 5 drifting jellyfish, a crowd of crabs, tide pools, particle sand, combo HUD |

The point of the entry is not any single frame but the difference between two frames taken
at the *same* clock tick: the engine is deterministic (`mulberry32` seed, fixed 60 Hz step,
a recorded input script replayed identically in every build), so build 1 and build 7 can be
drawn at the exact same second on the exact same map with the camera nailed in place, and
only the added content differs.

## The video

21 seconds, 1080×1920, 30 fps, h264 + aac:

1. three pairs of clips, each pair the same moment one week apart — a cut back and forth
   between day one and day seven at the same timestamp, pairs of 1.6 s, 2.2 s and 2.8 s,
   so the beach visibly fills up while nothing else moves;
2. the v7 build being played, with the line *start yours at make.fun*;
3. make.fun's own 9:16 referral card from the press pack, over the last 2.5 seconds,
   with the referral code typed into its field.

Every gameplay frame in it was drawn by this repository's code in the session that built
the entry; the card is make.fun's file from
<https://make.fun/press/manifest.json>, used as it is. The audio bed is surf noise and a
slow three-note chord synthesised with ffmpeg.

## The repository

`main.ts` (Node 22, standard library only, no network) copies `VIDEO.json` from the
repository root to `/output/VIDEO.json`. `VIDEO.json` names the video's full address on
TikTok. Nothing else here is scored — the entry is the video.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## License

MIT — see `LICENSE`.
