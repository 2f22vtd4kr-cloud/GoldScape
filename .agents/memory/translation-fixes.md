---
name: Russian Translation Fixes
description: RU translation issues found and patched in LanguageContext.tsx
---

# Russian Translation Fixes (LanguageContext.tsx)

Fixes applied in this session:

| Key | Old RU | New RU | Reason |
|-----|--------|--------|--------|
| `vision_stat_1_lbl` | м высота | м над уровнем моря | More natural/precise: "metres above sea level" |
| `vision_stat_2_lbl` | км горнолыжных трасс | км горнолыжных трасс | (kept — already correct) |
| `vision_stat_3_lbl` | запланированных подъёмников | подъёмников в проекте | More natural phrasing |
| `ski_cat_1` | НАЧИНАЮЩИЙ | НОВИЧОК | More natural for slope category labels |
| `ski_cat_2` | СРЕДНИЙ | ЛЮБИТЕЛЬ | More natural intermediate label |
| `stay_desc_3` | 24 Резиденции | 24 резиденции в продажу | Was missing "for sale" vs EN |
| `exp_1` | Катание на лыжах | Горные лыжи и сноуборд | Was missing snowboarding vs EN |
| `inv_tier_1_title` | ФУНДАМЕНТАЛЬНЫЙ ПАРТНЕР | ПАРТНЁР-ОСНОВАТЕЛЬ | "Фундаментальный" ≠ "Foundation" — should mean founding/founding-level |

Also added new keys:
- `nav_gallery` — added for completeness
- `gallery_title` — Gallery section now has a visible heading (was missing)

**Why:** These were found by cross-checking EN/RU pairs. Most were incomplete translations or false friends.
