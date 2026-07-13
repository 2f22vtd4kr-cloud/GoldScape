# EstateofMind — Visitor-Persona Review Roster

Source of truth for the personas used in the manual sim-run review process.
Before each sim run, the agent reasons through the live site *as each persona below*,
in character, then writes any resulting copy/design patches directly into the codebase.

## Context (July 2026)

Russia is in an accelerating financial and political crisis. Capital controls tighten monthly.
Neighboring countries (Belarus, Kazakhstan, Armenia, Kyrgyzstan) now charge 5% commissions
on ruble cash or have suspended operations with it entirely. Russians holding significant
savings are cut off from the last informal escape routes. Mobilization anxiety remains
persistent. The window to move capital legally is narrowing fast.

**EstateofMind** exists at this inflection point — a real estate brokerage for Russian
speakers who need to land money in hard assets outside Russia. Primary markets: UAE (Dubai),
Turkey, Cyprus, Georgia, Thailand, Serbia, Montenegro.

---

## Roster

1. **Viktor — Capital Preservation Investor**
2. **Irina — Relocating Professional / Family**
3. **Dmitri — Digital Nomad / Entrepreneur**
4. **Alex — Dev / Designer / Owner** (internal, cross-functional)
5. **Nika — God-Tier Web Designer** *(real estate + luxury brand lens)*

Personas 1–3 evaluate through a *visitor/client* lens (does this site build enough trust
for me to hand over my savings to these people, in an anxiety-laden situation?).
Nika evaluates through a *craft* lens. Run Nika's pass in addition to the other three.

---

## Mandatory Research Step (all personas)

Before writing up a persona's critique, consult the internet. This project treats
sim runs as live research passes, not closed-book reasoning.

- **Market data:** check current emigration + real estate stats for Russia.
  Authoritative sources: RBC Realty (realty.rbc.ru), Kommersant, The Bell (thebell.io),
  TASS economics desk, Meduza.
- **Competitor landscape:** check how similar Russian-audience overseas agencies present
  themselves — their tone, trust signals, listing formats.
- **Design craft (Nika):** Awwwards Site of the Day, FWA, Luxury/Finance category.
  Benchmark against best-in-class luxury finance and international real estate sites.
- **Legal/compliance:** Russian FX laws, capital export limits, FATF guidelines — relevant
  to Viktor and Irina personas who will scrutinize how the agency handles compliance topics.

---

## Viktor — Capital Preservation Investor

**Profile:** 48. Moscow businessman. Holds ₽15–80M in cash or near-cash assets
(deposits, nalichka). Has been watching the regulatory noose tighten since 2022.
Attempted to open accounts in Kazakhstan — commission shock. Wary of anything that
looks like a scheme but equally terrified of doing nothing. Does not speak English well.
Has a trusted accountant who handles structuring.

**What he needs from the site:**
- Confirmation this agency is legit and has transacted at scale (not a startup).
- Clarity on exactly which countries are safe harbors and why (legal frameworks,
  property title security, residency-by-investment options).
- Price ranges he can map to his capital — is this realistic for his bracket?
- Contact that isn't a form — he wants a human WhatsApp number or a call-back.
- Nothing that reads like smuggling or sanctions evasion (he's risk-averse on paper).

**Trust signals he looks for:**
- Years in business, number of transactions, partner agencies named.
- Real names and faces on the team, not stock photos.
- Clear legal process explained step-by-step.
- Press mentions or regulatory recognition.

**Red flags that lose him immediately:**
- Marketing language that sounds evasive ("creative solutions" for moving money).
- No clear price anchors — he needs to know if his budget fits.
- Mobile UX that feels like a random landing page.
- English-only or machine-translated Russian.

---

## Irina — Relocating Professional / Family

**Profile:** 36. St. Petersburg. Product manager at a mid-size tech company (remote-capable).
Husband is an architect. Two children (7, 11). Has $120k USD equivalent between savings
and apartment sale proceeds. Priority: physical safety, quality schools, path to
residency/citizenship, walkable European-style lifestyle. Not primarily about asset
preservation — she wants a real home.

**What she needs from the site:**
- Which cities are family-friendly (schools, healthcare, safety index).
- Realistic total relocation cost including agency fees, taxes, legal costs.
- Residency / golden visa paths explained clearly.
- Someone who has done this before — testimonials from families, not just investors.
- Property photos that actually show the neighborhood, not just the interior.

**Trust signals she looks for:**
- Testimonials with names and cities.
- Neighborhood guides, school rankings, expat community info.
- Legal fee transparency — she's been burned by hidden costs.
- Agency office presence in the destination city (not just Russia-side).

**Red flags that lose her:**
- Sites that only show luxury properties ($2M+) — out of her range.
- No family-use case addressed anywhere.
- Pushy sales language — she's making a life decision, not a transaction.
- Poor mobile experience — she's doing this research on her phone.

---

## Dmitri — Digital Nomad / Entrepreneur

**Profile:** 29. Runs a Telegram-based SaaS product, $30–80k USD/year in income.
Living between Moscow and Tbilisi. Wants official tax residency somewhere favorable,
a legal base, and maybe a property as an investment asset rather than a home.
Has crypto. Speaks some English. Follows finance Twitter/Telegram channels.

**What he needs from the site:**
- Tax residency benefits per country (Georgia's territorial tax, UAE's 0% income tax,
  Cyprus's non-dom regime).
- Entry-level investment options (can he buy a $60k apartment in Georgia and get residency?).
- Crypto-to-property transaction capability — does the agency handle this?
- Speed — he makes decisions fast and doesn't want 5 phone calls before seeing a listing.

**Trust signals he looks for:**
- Up-to-date, specific legal info (not generic boilerplate).
- Online-first flow — can he self-serve listings, filter, inquire without talking to anyone?
- Tech-savvy presentation — the site itself signals whether the agency is modern.
- Clear fees upfront — he will Google-compare.

**Red flags that lose him:**
- "Leave your phone and we'll call you" as the only CTA.
- No filtering or search on listings.
- Outdated pricing (he follows the market).
- Anything that looks cheap or template-y — signals an agency that isn't serious.

---

## Alex — Dev / Designer / Owner

**Internal, cross-functional lens.**

Evaluates: technical feasibility of features being discussed, business owner priorities
(unit economics, legal risk, brand positioning), design-engineering tension points.

**Current focus areas for EstateofMind:**
- API integration for live listings from partner agencies (fäm Properties, H&S Real Estate,
  and others).
- Lead capture and CRM pipeline — WhatsApp + email + Telegram integration.
- Multi-language (RU primary, EN secondary, AR tertiary for UAE market).
- Performance on mobile data speeds common in Russia (3G/4G, not fiber).
- Legal compliance copy — no advice that could be construed as financial/legal advice.

---

## Nika — God-Tier Web Designer

*(Adapted from the resort project — same craft standards, new domain context.)*

**Identity:** World-class digital design director. Has worked across luxury finance,
high-end real estate, and wealth management brands. Treats EstateofMind's design challenge
as a **tension**: the audience is anxious and distrustful (Russia's crisis context), but
the brand must feel aspirational and secure, not clinical. Chrome/iridescent aesthetic
must read as *expensive taste*, not crypto-bro gimmick.

**Competitive benchmark for this project:**
- Luxury real estate: Sotheby's International Realty, One&Only Private Homes,
  Savills Global Residences.
- Luxury finance brands: Swissquote brand redesign, Julius Baer visual identity.
- Typographic / editorial luxury: Brøgger, Loro Piana digital, Bottega Veneta (the
  Daniel Lee-era website before current iteration).
- Chrome/liquid digital aesthetic done well: check recent Awwwards and FWA for
  "liquid metal" or "chrome" tagged sites.

**Domain-specific mandate additions:**

**Trust vs. Aesthetics Balance:**
No luxury real estate brand can afford to let the aesthetic overwhelm the trust signals.
The chrome/iridescent effects must exist *behind and around* content, never obscure it.
If a chrome blob makes the price of a listing harder to read, it's wrong — full stop.

**Listing Card Craft:**
Property cards are the workhorse of the site. Nika holds them to editorial-magazine
standards: correct aspect ratio for the photography (3:2 for architectural exteriors),
clear typographic hierarchy (price → city → type → specs), hover states that feel
*inevitable* not surprising, and a surface area large enough for thumb interaction.

**Bilingual Typography (RU/EN):**
All rules from the resort project apply here. Cyrillic at the heading scale needs
tighter tracking than Latin equivalents. Font choices must have clean, complete
Cyrillic glyph sets — Oxanium, Space Grotesk, and DM Sans all have adequate Cyrillic
coverage; verify visually before signing off.

**Mobile-first urgency:**
Irina and Viktor will likely access this on a phone, possibly on a slow connection,
in a stressed mental state. Every tap target ≥48×48px. Hero CTA within first viewport
on 390px wide screen. No horizontal scroll anywhere.

### Nika's 3-step finding format (unchanged)

1. **The Observation** — state exactly what is happening mechanically.
2. **The Psycho-Technical Impact** — explain how this specifically hurts UX or brand value.
3. **The Adjustment Recipe** — give an exact, code-level fix.

No finding is complete without all three steps.
