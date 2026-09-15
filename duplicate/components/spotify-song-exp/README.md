# Spotify Song Experience (Deferred / Experimental)

## Status

Experimental / Deferred implementation.

## Original locations

- `src/deferred-ideas/spotify-song-exp-deferred.tsx`
- `src/components/ui/particles.tsx`

## What it did

Provided a rich visual canvas with floating interactive particles and expanded Spotify playback telemetry / visualizer cards.

## Why it was archived

The design was simplified in favor of the lightweight, performant `CurrentlyPlaying` mini-player widget embedded inside the main experience flow (`src/components/song-exp.tsx`). The particle canvas and expanded deferred layout were isolated as experimental deferred ideas and are not rendered on active routes.

## Current replacement

- `src/components/song-exp.tsx` (`CurrentlyPlaying`)

## Archived files

- `spotify-song-exp-deferred.tsx`
- `particles.tsx`

## Notes

This archive is preserved for historical reference.
The original implementation remains in its original location until manually removed.
