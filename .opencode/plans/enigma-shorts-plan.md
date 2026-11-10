# Rencana Produksi — "Memecahkan Enigma"

Status: DISETUJUI USER. Siap eksekusi setelah mode plan dilepas.

## Ringkasan keputusan

| Parameter | Nilai |
| --- | --- |
| Topik | Bagaimana Enigma yang nyaris mustahil akhirnya terbaca |
| Platform | YouTube Shorts / Instagram Reels / Facebook Reels |
| Kanvas | 1080 x 1920 (9:16), 30 fps, 1.800 frame (60 detik) |
| Gaya | STYLE-03 Glow Sketch (satu gaya dominan, tanpa hybrid) |
| Palet | 11 swatch disetujui |
| Aset | 100% prosedural (SVG/React), 0 prompt gambar, 0 karakter |
| Audio | VO direkam user; build + QA silent dulu |
| Bahasa | Indonesia |
| Branch | `feat/memecahkan-enigma` (SUDAH DIBUAT, base `bab3b33`) |

## Palet (disetujui)

| Name | HEX | Usage |
| --- | --- | --- |
| Void | `#070A0F` | Latar utama |
| Panel | `#0E141C` | Panel, chip, backing caption |
| Construction | `#1B2733` | Grid samar, leader line |
| Ice Line | `#7FE7FF` | Stroke utama, jalur sinyal aktif |
| Ice Dim | `#3E8FB0` | Stroke sekunder |
| Rotor Violet | `#A78BFF` | Wiring rotor, simpul 1932 |
| Lamp Amber | `#FFC46B` | Lampu Enigma, kandidat tersisa |
| Alert Red | `#FF5C5C` | Kontradiksi, kandidat gugur |
| Signal Green | `#66F2A5` | Pesan terbaca |
| Text Primary | `#EAF4F8` | Judul, angka |
| Text Muted | `#8CA0AE` | Sub-label, satuan, sumber |

Rasio: 80% Void/Panel, 15% Ice, <=5% accent. Accent hanya untuk makna.

## Layout map (1080x1920)

```
y 0    +------------------------------+
       | zona UI atas - kosong        |
y 160  +------------------------------+ batas atas konten
y 100  | 01/07 ----------- progress   |
y 220  | JUDUL / ANGKA                | 220-560
y 560  +------------------------------+
       | ZONA DIAGRAM                 | 560-1200
y 1200 +------------------------------+
       | CAPTION / LABEL              | 1230-1370
y 1400 +------------------------------+ batas bawah konten
       | zona UI Shorts - kosong      | 1400-1920
       +------------------------------+
       x 72 ------------------ 1008
```

Lebar konten 936 px. Tidak ada elemen penting di bawah y=1400.

## Breakdown timecoded

Berturut-turut `[from, from+duration)`:

| Beat | Frames | Timecode | Durasi |
| --- | --- | --- | ---: |
| S1 Hook | 0-209 | 00:00-00:07 | 210 |
| S2 Angka | 210-509 | 00:07-00:17 | 300 |
| S3 Jalur sinyal | 510-839 | 00:17-00:28 | 330 |
| S4 Kelemahan | 840-1169 | 00:28-00:39 | 330 |
| S5 Bombe | 1170-1439 | 00:39-00:48 | 270 |
| S6 Linimasa | 1440-1619 | 00:48-00:54 | 180 |
| S7 Penutup | 1620-1799 | 00:54-01:00 | 180 |

### S1 — Hook (0-209)

- VO: "Enigma. Mesin sandi yang diyakini Jerman mustahil dibaca."
- Visual: `DIA-006` siluet Enigma (baris lampu + keyboard) di zona diagram; judul `ENIGMA` di zona judul.
- Gerak utama: stroke reveal kiri-ke-kanan f0-60; judul naik + glow bloom f30-75; baris lampu pulse f150.
- Tipografi: `ENIGMA` 112 px, tracking 0.18em; sub-label `MESIN SANDI JERMAN · 1940` 28 px muted f90.
- Sekunder: grain halus bergerak (deterministik).
- Kamera: push-in 1.00 -> 1.06.
- Audio: VO-001 pending.
- QA: judul tidak menimpa baris lampu; teks dalam safe area.

### S2 — Angka (210-509)

- VO: "Tiga rotor dari lima. Sepuluh kabel di plugboard. Ditambah pengaturan harian. Totalnya — hampir seratus lima puluh sembilan kuintiliun kemungkinan."
- Visual: `TYP-001` besar `~159 KUINTILIUN`; digit eksak 2 baris `158.962.555.217.826.360.000` @28 px mono; 3 chip konteks.
- Gerak utama: chip masuk f0-45 bertahap; angka naik f45-110; digit eksak f120; garis bawah menyapu f165.
- Sekunder: getaran halus +-1 px dari sinus frame.
- Kamera: statis.
- Fakta: label kecil "Enigma 3 rotor / 5 tersedia / 10 kabel plug".
- Transisi: garis bawah menyusut jadi titik, cut ke S3.

### S3 — Jalur sinyal (510-839)

- VO: "Setiap tombol mengirim arus lewat plugboard, lalu tiga rotor yang berputar, dan reflektor yang memantulkannya kembali ke lampu. Tekan satu huruf, rotor bergeser, dan seluruh jalur berubah."
- Visual: `DIA-001` stack vertikal KEYBOARD -> PLUGBOARD -> ROTOR x3 -> REFLEKTOR -> balik -> LAMPU. Label kanan dengan leader line.
- Gerak utama: path draw f0-60; titik cahaya f60-150; f150-210 tombol kedua + `DIA-002` rotor step, jalur berbeda; f210-300 tiga tekanan cepat.
- Tipografi: caption `1 TOMBOL, 1 JALUR BARU` f240.
- Kamera: drift naik 24 px.
- QA: label tidak tertimpa titik; setiap jalur terlihat berbeda.

### S4 — Kelemahan (840-1169)

- VO: "Satu kelemahan. Karena pantulan reflektor, tidak ada huruf yang bisa menjadi dirinya sendiri. A tidak akan pernah keluar sebagai A. Setiap tebakan yang menaruh huruf sama di posisi sama langsung gugur."
- Visual: `DIA-004` grid 8x8 (A-H) samar; diagonal menyala Alert Red lalu dicoret. Baris contoh `A B C D E` vs `A X Q M N` label `CONTOH`; kolom sama berkedip; alignment dicoret.
- Gerak utama: grid f0-45; diagonal f45-120; `A != A` scale 1.18 -> 1.0 f100; coret alignment f180-240.
- Tipografi: heading 64 px 2 baris `TIDAK ADA HURUF KE DIRINYA SENDIRI`.
- Kamera: push kecil saat `A != A` mendarat.

### S5 — Bombe (1170-1439)

- VO: "Turing dan Welchman membangun Bombe: tiga puluh enam tiruan Enigma yang berjalan serentak, membuang setiap pengaturan yang bertentangan, dan berhenti hanya saat menyisakan beberapa kandidat."
- Visual: `DIA-003` 12 baris triplet (36 drum) lingkaran bercahaya; pola menu; kolom kandidat kanan.
- Gerak utama: baris masuk f0-50; drum spin-up f50-120; kandidat dicoret f120-200; satu kandidat tersisa amber pulse f200-270.
- Tipografi: `BOMBE`, `36 TIRUAN ENIGMA`, `BERHENTI = KANDIDAT`, plus label `SKEMA`.
- Kamera: pull-back.

### S6 — Linimasa (1440-1619)

- VO: "Tapi Inggris bukan yang pertama. 1932, Rejewski di Warsawa sudah memecahkannya. 1939, metodenya sampai ke Bletchley."
- Visual: `DIA-005` 3 simpul: `1932 · WARSAWA` (Rotor Violet), `1939 · PYRY -> BLETCHLEY`, `1940 · BOMBE`.
- Gerak utama: garis draw f0-40; simpul f30/60/90; sorot pindah 1932 -> 1939 f120.
- Kamera: statis.

### S7 — Penutup (1620-1799)

- VO: "Bombe tidak membaca pesan. Ia menyempitkan kemungkinan. Enigma tidak pernah mustahil — hanya dianggap begitu."
- Visual: jaringan Bombe menyusut jadi satu garis; garis menjadi teks.
- Gerak utama: kontraksi f0-48; `ENIGMA TIDAK PERNAH MUSTAHIL` f30-60; `HANYA DIANGGAP BEGITU` f60-90; ripple pelan; fade out f168-180.
- Tipografi: 76 px / 44 px muted; baris sumber 22 px di y~1330.
- Kamera: statis.

Transisi: hard cut semua batas; dip-to-black 6 frame di S2->S3 dan S5->S6. Tanpa paket `@remotion/transitions`.

## Naskah lengkap (disetujui)

> Enigma. Mesin sandi yang diyakini Jerman mustahil dibaca.
>
> Tiga rotor dari lima. Sepuluh kabel di plugboard. Ditambah pengaturan harian.
> Totalnya — hampir seratus lima puluh sembilan kuintiliun kemungkinan.
>
> Setiap tombol mengirim arus lewat plugboard, lalu tiga rotor yang berputar, dan
> reflektor yang memantulkannya kembali ke lampu. Tekan satu huruf, rotor
> bergeser, dan seluruh jalur berubah.
>
> Satu kelemahan. Karena pantulan reflektor, tidak ada huruf yang bisa menjadi
> dirinya sendiri. A tidak akan pernah keluar sebagai A. Setiap tebakan yang
> menaruh huruf sama di posisi sama langsung gugur.
>
> Turing dan Welchman membangun Bombe: tiga puluh enam tiruan Enigma yang
> berjalan serentak, membuang setiap pengaturan yang bertentangan, dan berhenti
> hanya saat menyisakan beberapa kandidat.
>
> Tapi Inggris bukan yang pertama. 1932, Rejewski di Warsawa sudah
> memecahkannya. 1939, metodenya sampai ke Bletchley.
>
> Bombe tidak membaca pesan. Ia menyempitkan kemungkinan. Enigma tidak pernah
> mustahil — hanya dianggap begitu.

Recording sheet (target file, status Pending, belum ada file):

| Clip | Frames | File |
| --- | --- | --- |
| VO-001 | 0-209 | `VO_001_000-007.wav` |
| VO-002 | 210-509 | `VO_002_007-017.wav` |
| VO-003 | 510-839 | `VO_003_017-028.wav` |
| VO-004 | 840-1169 | `VO_004_028-039.wav` |
| VO-005 | 1170-1439 | `VO_005_039-048.wav` |
| VO-006 | 1440-1619 | `VO_006_048-054.wav` |
| VO-007 | 1620-1799 | `VO_007_054-060.wav` |

## Fakta terverifikasi

| Klaim | Detail |
| --- | --- |
| 158.962.555.217.826.360.000 pengaturan | Enigma 3 rotor, 3 dari 5 rotor, 10 kabel plug, penempatan + ring |
| Tidak ada huruf menjadi dirinya sendiri | Sifat reflektor; inti serangan |
| Self-reciprocal | A->D berarti D->A |
| Des 1932 Rejewski memecahkan; Jan 1933 pesan terbaca | Polandia |
| 26-27 Juli 1939 Pyry | Metode diserahkan ke Inggris/Prancis |
| Bombe: Turing 1939, diagonal board Welchman 1940, Harold Keen | Inggris |
| 36 ekuivalen Enigma, 12 triplet | Standar Bombe Inggris |
| Bombe tidak mendekripsi; hanya menyaring kandidat | Penting untuk S7 |

Dihindari: "Turing sendirian", "Bombe mendekripsi", angka waktu per pemecahan,
pesan/unit/korban spesifik, dialog rekaan.

Sumber: Wikipedia "Enigma machine" dan "Bombe" (akses 2026-11-10), yang merujuk
Welchman 2005, Smith 2007, Budiansky 2000, Sebag-Montefiore 2004, Mahon 1945.

## Arsitektur file

```
src/
  Root.tsx                     + <Composition id="EnigmaShorts">; BoilerplateVideo tetap
  compositions/EnigmaShorts.tsx
  scenes/enigma/S1Hook.tsx ... S7Payoff.tsx
  components/SceneShell.tsx, GlowPath.tsx, TrailDot.tsx, DrumBank.tsx,
             MonoNumber.tsx, LabelChip.tsx, ProgressRail.tsx, GrainOverlay.tsx
  data/enigma.ts               satu sumber SCENES + copy + label
  styles/palette.ts, fonts.ts
public/fonts/space-grotesk-latin-*.woff2, ibm-plex-mono-latin-*.woff2
project/
  PRODUCTION_BRIEF.md
  research/RESEARCH_BRIEF.md
  script/VOICEOVER_SCRIPT.md
  script/SCENE_BREAKDOWN.md
  style/STYLE_GUIDE.md
  style/PALETTE.md
  assets/ASSET_REGISTRY.md
  qa/SCENE_QA.md
```

Font: Space Grotesk (judul) + IBM Plex Mono (angka/label), lokal WOFF2 di
`public/fonts/`, dimuat via `@font-face` + `delayRender` sampai
`document.fonts.ready`. Tanpa paket npm baru, tanpa CDN saat render. Fallback
system stack jika unduhan gagal (dicatat sebagai batasan).

Timeline: satu array `SCENES = [{id, from, durationInFrames}]`. Setiap
`<Sequence>` membaca dari situ. Tidak ada magic number tersebar.

## Inventaris aset (disetujui, 0 prompt)

| ID | Aset | Beat | Metode | Animasi |
| --- | --- | --- | --- | --- |
| DIA-001 | Jalur sinyal | S3 | SVG prosedural | stroke + traveling dot |
| DIA-002 | Mekanik rotor | S3 | SVG prosedural | rotasi deterministik |
| DIA-003 | Bank drum Bombe | S5 | SVG prosedural | spin + elimination |
| DIA-004 | Grid kontradiksi | S4 | SVG prosedural | reveal + strike |
| DIA-005 | Linimasa | S6 | SVG prosedural | draw + node pop |
| DIA-006 | Siluet Enigma | S1-S2 | SVG prosedural | stroke reveal |
| TYP-001 | Angka & chip | S2 | React text | count-up |
| BG-001 | Vignette + grid + grain | semua | CSS/SVG | drift halus |
| SFX | Klik, deru rotor, relay | semua | BELUM ADA | - |
| VO | 7 klip | semua | BELUM ADA | - |

## Urutan eksekusi

1. Buat dokumen produksi di `project/` (8 file).
2. Fondasi: `styles/palette.ts`, `styles/fonts.ts`, `data/enigma.ts`,
   `components/SceneShell.tsx`, `ProgressRail.tsx`, `GrainOverlay.tsx`.
3. S1 -> QA still -> S2 -> QA still -> ... -> S7. Satu scene pada satu waktu.
   Tidak ada scene ditandai selesai sebelum still diperiksa.
4. Registrasi composition `EnigmaShorts` (1080x1920, 30 fps, 1800 frame).
5. `npm run lint` (eslint src && tsc).
6. Render still QA frame global: 0, 90, 209, 240, 380, 509, 560, 700, 839, 900,
   1000, 1169, 1250, 1380, 1439, 1500, 1619, 1700, 1799.
7. Studio playback penuh 60 detik.
8. Render final `out/enigma-shorts.mp4`, periksa hasil.

Perintah:

```
npm run dev
npm run lint
npx remotion still EnigmaShorts out/qa/f0000.png --frame=0
npx remotion render EnigmaShorts out/enigma-shorts.mp4
```

## Yang tidak diubah

`BoilerplateVideo` dan ID-nya, `.agents/`, `main`, `feat/template-remotion`,
versi paket (remotion 4.0.542), `remotion.config.ts`, `eslint.config.mjs`.
Tidak ada paket npm baru.

## Risiko dan batasan (dinyatakan di depan)

- VO belum ada: build pertama silent; sinkronisasi audio pekerjaan terpisah.
- Angka 21 digit tidak muat satu baris: ditampilkan `~159 KUINTILIUN` + digit
  eksak kecil dua baris.
- Safe area Shorts/Reels berubah antar versi app: QA pada export 1080x1920.
- SFX tidak dibuat tanpa file berlisensi.
- Klaim build/render/QA hanya dilaporkan bila benar-benar dijalankan.

## Status akhir yang harus dilaporkan terpisah

- Code committed? (SHA)
- Lint/typecheck? (hasil nyata)
- Still dirender dan diperiksa? (daftar frame)
- Studio playback? (ya/tidak)
- Render final MP4? (ya/tidak)
- Sisa masalah visual/faktual.