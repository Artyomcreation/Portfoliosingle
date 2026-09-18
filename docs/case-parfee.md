# Case 01 — Parfee

Reference case. Once this one works, the other three follow the same shape.

Markers used below:
`⟨confirm⟩` — written from CV facts, but I inferred the framing. Confirm or correct.
`⟨you⟩` — only you know this. I deliberately did not invent it.

---

## Meta bar

| | |
|---|---|
| Client | Parfee — on-demand household services platform |
| Location | Nice, France |
| Year | `⟨you⟩` |
| Role | Product Designer — sole designer on the product |
| Team | Product manager + development team `⟨confirm⟩` |
| Duration | `⟨you⟩` |
| Platforms | Desktop + mobile |
| Scope | 4 connected role interfaces, booking state model, scheduling system, payout dashboard |

---

## 01 · Context

Parfee is a marketplace for household services — a customer books a cleaning, and the work is carried out not by Parfee but by an independent service provider company that employs the cleaners.

That detail is the whole case. This is not a two-sided product with a customer and an operator. **One booking is seen by four different parties, and it means something different to each of them.** Parfee's own admin needs to see money and disputes. The provider company needs to see workload and payouts. The employee needs to see today's route. `⟨confirm — who exactly are the three external interfaces? "service provider companies and their employees" is two; what is the third?⟩`

I joined to design the operational core: the interfaces the business actually runs on, not the customer-facing booking funnel. `⟨confirm — did the customer-facing side exist already, or was it out of scope?⟩`

---

## 02 · Problem

`⟨you — what was the actual trigger? Pick one:⟩`
- *There was no system yet* — MVP, designed from zero
- *There was a system and it was breaking* — if so: what broke, and how did you find out? Support load? The founder's complaints? Watching an operator work?

The structural problem, regardless of trigger:

A booking carries two independent facts — **has it been paid for**, and **has the work been confirmed and done**. The statuses in use ran them together: `Paid`, `Not Confirmed`, `Booked but Unpaid`. That list looks like one axis but is actually two collapsed into one, which means some real-world combinations have no name, and every role is left guessing what a booking's status obliges them to do. `⟨confirm — is this a fair reading of why the statuses were hard?⟩`

Second problem: **a job is not always one job.** A team cleaning is several people working at once who must finish together. A task-by-task job is one person moving through a sequence. Those are different scheduling models, and the product needed both.

---

## 03 · Decisions

Three forks. Each needs the thing you gave up — a decision without a sacrifice is not a decision, it is a preference.

### Fork 1 — How to model booking state

**The choice:** one flat status list, or payment state and work state as two independent axes.

- *Flat list* — simpler screen, one badge, one filter. But combinations that exist in reality have no name, and edge cases get resolved by whoever is looking at the screen.
- *Two axes* — every real situation is expressible, but the interface has to carry two pieces of state everywhere a booking appears, in four different interfaces.

**What you chose:** `⟨you⟩`
**What you gave up:** `⟨you⟩`
**Cascading effects across roles** — the CV says state changes cascaded. Name one concrete chain: *when X happens on the admin side, the provider sees Y and the employee sees Z.* One worked example here is worth more than any diagram. `⟨you⟩`

### Fork 2 — Simultaneous vs sequential scheduling

You supported both. Supporting both is the expensive answer — the cheap answer is to pick one model and force the other to fit.

**Why both, rather than forcing one:** `⟨you⟩`
**What it cost:** `⟨you — a more complex scheduling UI? a longer build? a harder mental model for the provider?⟩`

This is the fork I would lead the case with. Choosing the expensive answer *and being able to say why* is exactly the signal a design lead reads as product judgement rather than execution.

### Fork 3 — How much money to show an external company

The payout dashboard exposes financial data to a party outside Parfee. Every such surface is a decision about how much to reveal and how much to summarise.

**What you showed, and what you deliberately did not:** `⟨you⟩`
**Why:** `⟨you — trust? disputes? support tickets? the provider needing to verify their own numbers?⟩`

If there is no real reasoning here, cut Fork 3 and run the case on two. **Two real forks beat three padded ones.**

---

## 04 · Outcome

**Scope shipped**
- 4 connected role interfaces — main admin plus three external
- Booking state model covering payment and confirmation states with cross-role effects
- Employee scheduling supporting both simultaneous and sequential execution
- Payout tracking dashboard for external provider companies
- Desktop and mobile

**Client reaction**
> "Consistently delivers exceptional, user-centered designs that elevate the product experience. Excels in collaboration, creativity, and attention to detail."

**What I would change now** `⟨you — required, do not skip⟩`

This is the highest-signal paragraph in the whole case. Some angles worth testing against your memory:
- Did the four interfaces genuinely need to be four, or did two of them mostly overlap?
- Did the two-axis state model hold up, or did it push complexity onto the operator?
- Was there a role you designed for without ever talking to one of them?
- What did the developers push back on?

Write it plainly, name the thing that was actually wrong, and do not add a sentence that rescues it at the end. The rescue is what makes it read as false modesty.

---

## Length target

On the page: **250–400 words** of body copy, plus visuals. Not more.

`Decisions` gets roughly half the words. `Context` and `Problem` are three or four sentences each — they exist to make `Decisions` legible, not to demonstrate thoroughness. Anyone who wants the full story will ask you in the interview, and that is the outcome you want: a case that leaves a question worth asking.

---

## What I need from you to finish this

Short answers are fine — I will write the prose.

1. Year and duration.
2. Who are the three external interfaces? (companies + employees = two)
3. Was there an existing system, or did you build from zero?
4. **Fork 1** — flat statuses or two axes? What did you give up? One concrete cascade example.
5. **Fork 2** — why support both scheduling models instead of forcing one? What did it cost?
6. **Fork 3** — real reasoning on the payout dashboard, or should we cut it?
7. **What you would change now.**
