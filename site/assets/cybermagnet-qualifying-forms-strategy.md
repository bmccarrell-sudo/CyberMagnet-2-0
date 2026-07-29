# CyberMagnet — Qualifying Forms Strategy
## Complete Funnel Audit · Question Sets · Automation Logic · Implementation Guide

---

# PART 1 — WHERE TO ADD QUALIFYING FORMS

## Priority Tiers

**Tier 1 — Build immediately (highest ROI):**
- Strategy Call booking page ✅ (done — see qualifier page HTML)
- Contact page
- Free SEO Audit opt-in funnel
- AI Automation System page

**Tier 2 — Add within 30 days:**
- Local Business System page
- Appointment System page
- Content Repurposing System page
- Systems Overview page

**Tier 3 — Phase 3 additions:**
- Exit-intent popup (site-wide)
- Lead magnet thank-you page
- Digital Products catalog (post-purchase)
- Service pages (individual)

---

## Page-by-Page Placement Guide

### 1. STRATEGY CALL BOOKING PAGE
**Why:** Highest-intent page on the site. Without qualification, every booking gets the same 30-minute call regardless of fit, budget, or readiness — wasting time on poor-fit leads.
**Where:** Between headline and Calendly widget. The qualifier gates the calendar.
**How:** 5-step multi-question card (implemented in `cybermagnet-qualifier-page.html`).
**Placement:** Sticky right column on desktop, below hero content on mobile.

### 2. CONTACT PAGE
**Why:** The contact page gets a mix of every intent level — job inquiries, existing clients, cold prospects, and hot leads. Without qualification, all go to the same inbox with equal priority.
**Where:** Replace the generic contact form with a 3-question pre-form above the main fields.
**How:** Inline card, mid-page. Questions ask intent, then reveal appropriate form fields.
**Placement:** Above the fold on desktop; the first interactive element a visitor hits.

**Questions for contact page:**
1. "What brings you here today?" (options: Get a quote / Ask a question / Book a call / Something else)
2. "Which service are you most interested in?" (dropdown: SEO / Website / AI Automation / Social Media / Branding / Not sure)
3. "What's your timeline?" (ASAP / This month / 2-3 months / Just exploring)

**Routing logic:**
- "Get a quote" + "ASAP" → Tag: `hot-inbound` → Route to priority inbox + immediate callback trigger
- "Ask a question" → Route to standard support queue
- "Book a call" → Redirect to strategy call qualifier page
- "Something else" → Standard form, no priority tag

---

### 3. FREE SEO AUDIT OPT-IN PAGE
**Why:** The SEO audit attracts a wide range of visitors — some are genuinely ready to invest, others are content-collecting. Qualification at this stage identifies which is which before the email sequence begins.
**Where:** After the email capture, on the thank-you page (step 2 of the funnel).
**How:** 2-question micro-form on the thank-you page — doesn't gate the free resource but enriches the lead.
**Placement:** Below the "check your inbox" message and above the strategy call CTA.

**Questions for SEO audit thank-you page:**
1. "Quick question — how soon are you looking to improve your search rankings?" (This month / Next 3 months / Just exploring)
2. "Do you currently work with a marketing agency or do this in-house?" (Agency / In-house / Neither — doing nothing / Not sure)

**Routing logic:**
- "This month" + "Neither" → Tag: `audit-hot` → Trigger: Day 1 sales email + priority flag in CRM
- "This month" + "Agency" → Tag: `audit-agency-switching` → Trigger: Agency comparison email sequence
- "Just exploring" → Tag: `audit-cold` → Route to standard 7-email nurture only

---

### 4. HIGH-TICKET SYSTEM PAGES (All 4)

Each system page should have a qualifying mini-form embedded mid-page, between the tier comparison section and the final CTA. This is the highest-intent moment on a system page — after a visitor has read through pricing and deliverables.

**Position:** After the comparison table, before the CTA section. Label: "Not sure which tier is right for you? Answer 2 questions."

**Universal 2-question mini-qualifier (same across all system pages):**
1. "How much support do you want after setup?" (I'll manage it myself / Some guidance / I want it fully managed for me)
2. "What's your approximate monthly revenue from the service this will support?" (Under $5k / $5k–$20k / $20k–$50k / $50k+)

**Routing logic:**
- "Fully managed" + "$20k+" → Tag: `system-premium-fit` → Pre-select Premium tab, highlight retainer, trigger sales call follow-up within 2 hours
- "Fully managed" + "Under $5k" → Tag: `system-growth-fit` → Suggest Growth tier, add to budget-nurture sequence
- "I'll manage it myself" → Tag: `system-starter-fit` → Suggest Starter tier, trigger DIY onboarding email

---

### 5. SYSTEMS OVERVIEW PAGE
**Why:** The overview page gets visitors still deciding between systems. A quick qualifier routes them to the right individual page — reducing bounce and increasing time on site.
**Where:** Hero section, below the introductory paragraph and above the category grid.
**How:** 1-question "router widget" — visually styled as a category selector.
**Placement:** Prominent, above the fold. Framed as "Not sure where to start? Tell us one thing."

**Single routing question:**
"What's your most urgent business problem right now?"
- 📞 "I'm missing calls and losing leads" → Route to: Appointment System page (tagged: `sys-appts-intent`)
- 🌐 "My local business is invisible online" → Route to: Local Business System page (tagged: `sys-lbs-intent`)
- 🤖 "I need to automate my lead follow-up" → Route to: AI Automation System page (tagged: `sys-ais-intent`)
- 🎬 "I need more content without doing it myself" → Route to: Content Repurposing page (tagged: `sys-crs-intent`)
- 🤷 "I'm not sure — show me everything" → Scroll to category grid (no tag — standard browse)

---

### 6. DIGITAL PRODUCTS CATALOG PAGE
**Why:** The catalog page serves three distinct buyer types: browser (just looking), researcher (comparing options), and ready-to-buy. A single purchase trigger question surfaces the ready-to-buy segment.
**Where:** Sticky bottom bar (appears after 30 seconds or 50% scroll), or as a sidebar widget on desktop.
**How:** Single-question prompt, not a full form. Designed to feel like a helpful guide, not a gate.

**Single qualifier prompt (bottom bar / sidebar):**
"Looking for something specific? Tell me what's giving you the most trouble →"
- "Getting more leads" → Highlight: Lead Gen System, Local SEO Bundle, AI Receptionist Kit
- "Converting website traffic" → Highlight: Website & Funnel Launch Kit, CRO checklist
- "Saving time on admin" → Highlight: Automation Starter Kit, AI Receptionist Kit
- "Looking more professional" → Highlight: Branding Starter Pack, Social Content Pack, Graphic Bundle
- "Not sure — show me everything" → No filter, scroll to all

**Routing logic:** Updates product grid filter in real time (no page reload). Also tags the session: `catalog-[category]-intent` for retargeting.

---

### 7. MICRO-SYSTEM PAGES
**Why:** Each micro-system page needs to surface whether the visitor is a standalone buyer or a potential upsell to a full system.
**Where:** Bottom of the page, above the footer CTA. Framed as "Is a micro-system enough for you — or do you need more?"
**How:** 2-option decision widget, not a multi-step form.

**Decision widget copy:**
"Based on what you've read — what feels right?"
- [This micro-system is what I need →] → Trigger: purchase flow for that specific product
- [I think I need more than this →] → Route to: Strategy Call qualifier page, tagged with the specific micro-system they were viewing

---

### 8. EXIT-INTENT POPUP (site-wide)
**Why:** Visitors leaving without converting represent a significant lost opportunity. An exit-intent popup with a compelling question can capture 3–5% of otherwise-lost visitors.
**Where:** Triggered on cursor-to-exit on desktop; triggered on back-button intent on mobile.
**How:** Single question, low friction. The offer is the lead magnet (free checklist), gated by one qualifying question.
**Design:** Compact modal, max 400px wide, dark card consistent with site design.

**Exit-intent copy:**
"Before you go — one quick question."
"What's your biggest digital marketing challenge right now?"
(Multiple choice — same 5 options as Step 2 of the main qualifier)

**Routing:**
- Any answer + email provided → Tag: `exit-intent-recovered`, add to lead magnet delivery sequence
- No answer → Close modal, fire retargeting pixel if installed

---

# PART 2 — QUALIFYING QUESTION SETS

## Master Question Bank with Scoring

### QUESTION 1 — Business Type
| Answer | Signal | Score |
|---|---|---|
| Local service business | High-fit for most systems | +2 |
| Professional services | High-fit, premium budget signals | +2 |
| Agency or consultant | High-fit, potential reseller | +2 |
| Retail or hospitality | Medium-fit, specific use cases | +1 |
| E-commerce | Lower fit for core DFY systems | +1 |

**Automation tags:** `segment-local`, `segment-professional`, `segment-agency`, `segment-retail`, `segment-ecommerce`

---

### QUESTION 2 — Biggest Challenge (Pain Point)
| Answer | Signal | Score | System Match |
|---|---|---|---|
| Missed calls / slow follow-up | Highest-intent for AI systems | +3 | AI Automation + Appointment |
| Inconsistent lead flow | Ready for a system | +2 | Appointment + Lead Gen |
| Traffic but no leads | Website/funnel work needed | +2 | LBS + Website Kit |
| Not being found on Google | SEO opportunity | +2 | LBS + Local SEO bundle |
| Weak brand / unprofessional | Lower urgency | +1 | Branding + Social |

**Automation tags:** `pain-missed-calls`, `pain-no-leads`, `pain-traffic-no-convert`, `pain-not-found`, `pain-brand`

---

### QUESTION 3 — Timeline / Urgency
| Answer | Signal | Score | Follow-up Priority |
|---|---|---|---|
| As soon as possible | Buying signal — act now | +3 | Call within 2 hours |
| Within 30 days | Active shopping | +2 | Call within 24 hours |
| 2–3 months | Planning stage | +1 | Nurture then call |
| Just exploring | Long cycle | +0 | Nurture only |

**Automation tags:** `urgency-now`, `urgency-30d`, `urgency-90d`, `urgency-cold`

---

### QUESTION 4 — Budget
| Answer | Signal | Score | Recommended Tier |
|---|---|---|---|
| $1,200+ / monthly retainer | Premium budget, serious buyer | +3 | Premium systems |
| $600–$1,200 setup | Growth buyer | +2 | Growth systems |
| $300–$600 setup | Starter buyer | +1 | Starter systems |
| Under $300 | Product buyer or early-stage | +0 | Digital products |

**Automation tags:** `budget-premium`, `budget-growth`, `budget-starter`, `budget-products`

---

### QUESTION 5 — Decision-Making Power (for high-value deals)
| Answer | Signal | Score |
|---|---|---|
| I'm the owner / decision-maker | No sales friction | +2 |
| I need to discuss with a partner | Mild friction | +1 |
| I'm evaluating for someone else | Long cycle | +0 |

*Include this question for deals above $1,000 estimated value only.*

---

### HOT LEAD THRESHOLD

**Total possible score: 12 (questions 1–4 + optional Q5)**

| Score | Classification | Tag | Action |
|---|---|---|---|
| 9–12 | 🔥 HOT LEAD | `hot-lead` | Call within 2 hours, SMS + email |
| 6–8 | ⭐ WARM LEAD | `warm-lead` | Call within 24 hours, email sequence |
| 3–5 | 👍 QUALIFIED | `qualified-lead` | Nurture 7 days, then call |
| 0–2 | 💡 COLD LEAD | `cold-lead` | Nurture 21 days, no immediate call |

---

# PART 3 — AUTOMATION ROUTING LOGIC

## CRM Tags Architecture

```
Lead Source Tags:
  src-strategy-call-qualifier
  src-contact-form
  src-seo-audit-optin
  src-exit-intent
  src-system-page-[system-id]
  src-micro-page-[micro-id]
  src-catalog

Segment Tags:
  segment-local-service
  segment-professional
  segment-agency
  segment-retail
  segment-ecommerce

Pain Point Tags:
  pain-missed-calls
  pain-no-leads
  pain-traffic-no-convert
  pain-not-found
  pain-brand

Urgency Tags:
  urgency-now
  urgency-30d
  urgency-90d
  urgency-cold

Budget Tags:
  budget-premium
  budget-growth
  budget-starter
  budget-products

Lead Quality Tags:
  hot-lead
  warm-lead
  qualified-lead
  cold-lead

System Fit Tags:
  fit-appointment-system
  fit-local-business-system
  fit-ai-automation
  fit-content-repurposing
  fit-digital-products

Action Tags (applied by automation):
  action-call-2hr
  action-call-24hr
  action-nurture-7d
  action-nurture-21d
  action-sms-sent
  action-email-sent
  priority-flag
```

---

## Follow-Up Sequence Routing

### HOT LEAD (`hot-lead` + `urgency-now`)
```
0 min  → CRM notification to team (email + Slack/SMS to salesperson)
5 min  → Automated email: "Your call is confirmed — here's what we prepared"
10 min → SMS (if phone provided): "Hi [Name], we saw your answers — call us at (214) 412-0861 to get started immediately"
2 hrs  → If no booking made: Follow-up call attempt by team
Day 1  → Email: Specific pain point case study (matched to their answer)
Day 3  → Email: Relevant system page + offer to upgrade call to screenshare
Day 5  → SMS: "Slot check — do you still want to chat this week?"
Day 7  → Email: Final "last attempt" with direct booking link
```

### WARM LEAD (`warm-lead` + `urgency-30d`)
```
0 min  → Automated email: "Your answers are saved — book when ready"
2 hrs  → CRM notification to team (lower priority)
Day 1  → Email: Value email — 3 quick wins for their pain point
Day 3  → Email: Case study relevant to their business type
Day 5  → Email: System recommendation based on pain point
Day 7  → Email: Free audit offer
Day 14 → Email: "We still have availability — here's a direct link"
Day 21 → Final check-in, soft close
```

### QUALIFIED LEAD (`qualified-lead` + `urgency-90d`)
```
0 min  → Automated email: Lead magnet delivery (or checklist)
Day 3  → Value email: Education content for their pain point
Day 7  → Email: Comparison email (DFY vs DIY vs doing nothing)
Day 14 → Email: Social proof for their business type
Day 21 → Email: Product recommendation (digital product as entry point)
Day 30 → Email: Seasonal or time-limited offer
Day 45 → Final nurture, blog content
```

### COLD LEAD (`cold-lead` + `urgency-cold`)
```
Day 0  → Lead magnet delivery
Day 7  → Educational blog post
Day 14 → "What we do" overview email
Day 21 → Case study for relevant industry
Day 30 → Digital product recommendation ($37–$97 entry point)
Day 45 → Re-engagement question: "Still thinking about this?"
Day 60 → Final email before list segmentation
```

---

## SMS vs Email vs Call Logic

| Lead Type | SMS | Email | Outbound Call |
|---|---|---|---|
| Hot lead | ✅ Yes, within 30 min | ✅ Immediate | ✅ Within 2 hours |
| Warm lead | ✅ Day 5+ (if opted in) | ✅ Sequence starts immediately | 📞 Team discretion |
| Qualified lead | ❌ No cold SMS | ✅ Nurture sequence | ❌ No outbound call |
| Cold lead | ❌ No SMS | ✅ Long nurture only | ❌ No outbound call |

**SMS rules:**
- Only send if phone number was voluntarily provided in the form
- Always include opt-out instructions ("Reply STOP to unsubscribe")
- Maximum 2 SMS per lead per week
- Never send SMS after 8pm or before 8am CT

---

## System-Fit Routing (Pain Point → Recommended System)

| Pain Point Tag | Primary System | Secondary / Upsell |
|---|---|---|
| `pain-missed-calls` | AI Automation System | Appointment System |
| `pain-no-leads` | Appointment System | Local Business System |
| `pain-traffic-no-convert` | Local Business System (website) | Funnel Launch Kit |
| `pain-not-found` | Local Business System (SEO) | Local SEO Bundle |
| `pain-brand` | Branding Starter Pack | Local Business System |

---

# PART 4 — COPY REWRITES

## Strategy Call Page — Gating Microcopy

**Before qualifier (current):** "Book Your Free Strategy Call"

**With qualifier (updated):**
Headline: "Tell Us About Your Business. We'll Come Prepared to Actually Help."

Sub-framing text (above form): "Answer 5 quick questions — takes 60 seconds — and your call becomes significantly more valuable. We'll come prepared with specific recommendations for your business type, your industry, and your exact challenge. No generic advice."

Privacy microcopy (below form): "Your answers go directly to the CyberMagnet team. We review them before every call — and we use them to prepare, not to pitch."

---

## Contact Page — Intent Qualifier Intro Copy

Current: Generic "Contact Us" headline

Updated:
**Headline:** "Get in Touch — We'll Route You to the Right Place."
**Subheadline:** "Tell us what you're looking for and we'll connect you with the fastest path to an answer — whether that's a direct reply, a strategy call, or a self-serve resource."
**Above-form framing:** "One quick question before we send your message:"

---

## Systems Overview — Router Widget Copy

**Label above widget:** "Not sure where to start?"
**Widget headline:** "Tell us one thing:"
**Question:** "What's the most urgent problem in your business right now?"
**Framing below:** "We'll point you to the right system — and explain why it fits."

---

## Mid-Page System Qualifier (on each system page)

**Headline:** "Not sure which tier is right for you?"
**Subheadline:** "Answer two quick questions and we'll tell you."
**Below result:** "Based on your answers, here's our recommendation: [Dynamic tier suggestion with reasoning]"

---

# PART 5 — OPTIONAL UPGRADES

## Dynamic CTAs Based on Answers

**Implementation:** After each qualifying question is answered, the primary CTA button text updates dynamically to reflect the lead's situation.

Examples:
- Pain: "missed calls" → CTA changes to: "Get My AI Receptionist Strategy →"
- Pain: "not found on Google" → CTA changes to: "See My Local SEO Roadmap →"
- Budget: "$1,200+" → CTA changes to: "Book a Premium Strategy Session →"
- Timeline: "Just exploring" → CTA changes to: "Get the Free Checklist First →"

**Implementation note:** Handled in JavaScript by listening to `opt-btn.selected` events and updating `btnNext.textContent` and the Calendly URL parameters if routing to different calendars.

---

## Personalised Thank-You Pages

Based on `hot-lead` / `warm-lead` / `cold-lead` tag applied during form submission, redirect to three different thank-you page variants:

**`/funnels/thank-you/priority/`** (hot leads)
- Headline: "We've flagged your call as a priority — expect a prep email within the hour."
- Shows team photo + "Your strategy call is being prepared" message
- CTA: Direct phone number for immediate contact

**`/funnels/thank-you/standard/`** (warm leads)
- Headline: "Your call is confirmed — we'll be in touch with preparation notes."
- Shows next-steps timeline
- CTA: Calendar link if they haven't booked yet

**`/funnels/thank-you/nurture/`** (cold/qualified leads)
- Headline: "You're on our list — here's a resource while you decide."
- Offers free checklist PDF
- CTA: "When you're ready, here's the booking link"

---

## Smart Calendar Routing

Use Calendly's routing functionality (or Cal.com for more control) to route different lead types to different calendar pools:

- `hot-lead` → Owner's calendar (Brian's direct calendar)
- `warm-lead` → Strategy team calendar (shared pool)
- `qualified-lead` → Standard booking calendar
- `cold-lead` → No calendar shown; nurture sequence only

**Implementation:** Pass URL parameter `?type=[lead-tier]` to Calendly embed URL and use Calendly's Advanced Routing feature, or use a middleware redirect based on form score.

---

## Lead Scoring Dashboard (CRM)

**Recommended CRM setup (GoHighLevel or HubSpot):**

Create a custom field: `cm_lead_score` (numeric, 0–12)
Create a custom field: `cm_lead_tier` (text: hot/warm/qualified/cold)
Create a custom field: `cm_pain_point` (text: from question 2)
Create a custom field: `cm_system_fit` (text: derived from pain point mapping)
Create a custom field: `cm_budget_range` (text: from question 4)

**Pipeline view:** Filter by `cm_lead_tier` to create four pipeline columns: Priority / Active / Nurturing / Long-term. This gives instant visual clarity on where time should be focused.

**Automation trigger:** When `cm_lead_score` changes to 9+, trigger immediate Slack notification to sales team.

---

## Auto-Generated Personalised Recommendations

**After form completion, generate a personalised "Your Recommended System" card:**

Logic:
```
if pain_point == "missed-calls" AND budget >= "growth":
  recommend = "AI Automation System — Growth Tier"
  reason = "You're losing leads to missed calls — AI handles inbound 24/7"

if pain_point == "not-found" AND business_type == "local-service":
  recommend = "Local Business System — Starter or Growth"
  reason = "Local SEO and GBP optimisation are your fastest wins"

if pain_point == "inconsistent-leads" AND timeline == "asap":
  recommend = "Appointment System — Growth Tier"
  reason = "Consistent outbound is the fastest path to stable pipeline"

if budget == "under-300":
  recommend = "Digital Products — Local SEO Bundle + Cold Calling Scripts"
  reason = "Best ROI for your budget before upgrading to a full system"
```

Display this card in the success panel after form completion (currently shows tier tag and summary — extend to include the recommended system name, a one-sentence reason, and a direct link to that system page).

---

# PART 6 — IMPLEMENTATION NOTES

## Roll-out Priority

**Week 1:**
- [ ] Deploy qualifier page HTML to `/funnels/strategy-call/` ← already built
- [ ] Update contact page with 3-question pre-qualifier
- [ ] Add 2-question micro-form to SEO audit thank-you page
- [ ] Set up CRM tags (create all fields in GHL or HubSpot)

**Week 2:**
- [ ] Add mid-page qualifier widget to all 4 system pages
- [ ] Set up automation sequences for hot/warm/qualified/cold routing
- [ ] Connect form submissions to CRM via webhook
- [ ] Test all tag assignments with test submissions

**Week 3:**
- [ ] Add systems overview router widget
- [ ] Add exit-intent popup with 1-question qualifier
- [ ] Add catalog page recommendation widget
- [ ] Create 3 thank-you page variants

**Week 4:**
- [ ] Enable dynamic CTA updates (JavaScript additions to existing forms)
- [ ] Set up Calendly smart routing
- [ ] Build lead scoring dashboard view in CRM
- [ ] Review first week of data and calibrate scoring thresholds

---

## A/B Testing Recommendations

**Test 1:** Qualifier before calendar vs. qualifier after (current standard)
- Hypothesis: Qualifier before reduces no-shows by improving preparation
- Metric: Show-up rate, call-to-client conversion rate

**Test 2:** 3 questions vs. 5 questions in strategy call qualifier
- Hypothesis: Fewer questions reduce abandonment but reduce personalization quality
- Metric: Form completion rate vs. lead quality score

**Test 3:** Hot lead flash indicator (shown in current form at score ≥6) vs. no indicator
- Hypothesis: Telling high-score leads they're a "priority match" increases booking intent
- Metric: Booking rate among score 6+ leads

**Test 4:** SMS follow-up within 30 minutes vs. email only for hot leads
- Hypothesis: SMS dramatically increases contact rate for high-intent leads
- Metric: Contact rate within 24 hours of form submission
