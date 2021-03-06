# Whisper Village

Quiet Peer-to-Peer Donations

[Satsby hackathon](https://www.thrillerbitcoin.com/satsx-hackathon-2022/) entry.

## Tech Stack
- React Native via Expo
  - Allows web and mobile (Android & iOS) via single codebase
- Backend:
  - For hackathon, no backend - just demo data with stealth address stuff done client-side
  - After hackathon, can use the [v2 Zion relay](https://github.com/getzion/relay) for social features

## Features
- Trust-building via user video testimonials and/or linking social accounts
- Allow peer-to-peer Bitcoin donations via [nondeterministic stealth addresses](https://github.com/ArcadeCity/WhisperVillage/wiki/Nondeterministic-stealth-addresses-with-JavaScript-interpreters)

## Setup
Use node v14

```
git clone https://github.com/ArcadeCity/whispervillage.git
cd whispervillage
yarn
yarn start
```
