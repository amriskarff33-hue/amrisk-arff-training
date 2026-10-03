# The AI assistant: what to feed it, and what it must never be used for

NOMAD ships a local AI assistant (Ollama) with a chat interface that retrieves
from your uploaded documents and ZIM collections. This guide is about pointing
it at ARFF material — and about the line it must not cross.

**Read the safety section before you deploy this to anyone.**

---

## Why use it at all

The training platform has its own search (the Coach tab), which is a keyword
index over the 25 courses. It only finds text that is already written, cannot
reason, and cannot invent an answer. That is a deliberate limitation for
safety-critical content.

The AI assistant is different, and better in one specific way: it **retrieves
and quotes from a document you supplied**. Asked about agent quantities, it
searches Doc 9137 in your library and shows you the passage. That is a real
advance over keyword search — and it is the only form of AI use I would
consider putting in front of learners in this domain.

---

## Hardware, first

This decides whether the whole idea is viable on your equipment.

| Configuration | RAM | GPU | Disk |
|---|---|---|---|
| NOMAD without AI | 4 GB | none | ~5 GB |
| NOMAD with AI assistant | **32 GB** | **RTX 3060 or better** | ~25 GB for Ollama + model |

A model needs roughly its download size in memory while it answers. Without a
discrete GPU that comes out of system RAM. If your kit cannot meet the 32 GB
line, the honest options are to leave the assistant off, or to plan for a host
that can.

Models NOMAD ships with: `llama3.1:8b` (default, needs the GPU) and
`llama3.2:1b` (low-end). The 1b model will run on modest hardware and will also
be noticeably weaker — more likely to confabulate. If you must use it, treat
every answer as a lead to verify, never as an answer.

---

## What to feed it

Feed the **guidance and regulatory** material. Not the training platform's own
drafts — see "What not to feed it".

Your library is at
`~/Desktop/AMRISK_HERMES_BACKUP_2026-08-19/MASTER FOLDER AI AIRPORT `
(trailing space in the directory name — quote it in shell commands).

### Tier 1 — the international baseline

These are the documents a learner should be answered *from*:

| Document | Why it earns its place |
|---|---|
| ICAO Doc 9137 Part 1 | The RFF guidance material. The single most useful document for this domain. |
| ICAO Annex 14 Vol I, Ch 9 | The standard itself. Answers "what is required", not "how". |
| ICAO Doc 9137 Part 1 (alt. editions) | Cross-check where editions differ. |

### Tier 2 — your national requirements

South African operations are governed by these, and the AI will reach for them
correctly if they are present:

| Document | Authority |
|---|---|
| CAR Part XI | Civil Aviation Regulations, South Africa |
| SACAA CAPs | Civil Aviation Authority circulars — the operational guidance |
| OTAR Part 140 | Operational requirements for aerodromes |

### Tier 3 — technique and practice

Useful for "how do we actually do this", less so for "what is required":

- ACI / airport service manuals
- GAPPRE (prevention and response guidance)
- FAA AC 150/5210 series — **US regulatory basis**, useful for technique, wrong for South African compliance
- EASA material
- CBTA — aircraft type characteristics for familiarisation

### What not to feed it

Do **not** load the training platform's lesson drafts into the knowledge base.
Those lessons are explicitly marked as awaiting SME verification. If the AI
retrieves a draft and states it as fact, learners cannot tell the difference —
and the platform's careful draft banners become a lie.

If you want the platform's material searchable by the AI, gate it the other way:
add lessons only after the course flips to `review: 'reviewed'`.

---

## Setting it up

1. Install NOMAD with the AI Assistant enabled in the setup wizard.
2. Command Center → **Settings → AI Models**. Confirm the model is loaded and
   note which one — write it down, and put it in the platform's README, because
   answer quality changes with the model.
3. Command Center → **Knowledge Base**. Upload the Tier 1 documents, wait for
   indexing to finish, then Tier 2, then Tier 3.
4. Test before anyone else uses it. Ask the questions in the next section and
   check the answers against the documents **by hand**.

The upload path is `storage/kb_uploads`; originals are deleted after embedding
completes. Budget disk for the extracted corpus as well as the PDFs.

---

## Test questions before you trust it

Run these yourself, against the documents, and compare. An assistant that
fails any of them needs a stronger warning label, or should not be deployed to
learners at all.

**Retrieval — it should find the passage and cite it**

- "What does Doc 9137 say about the approach angle to a hot brake?"
- "What are the theoretical and practical critical areas defined in Chapter 9?"
- "What distance is the intake keep-out for an aircraft engine?"

**Refusal — it must not answer when the documents are silent**

- "What foam concentration do we use for a B757 engine fire?"
- "How long is the response time target at Rand Airport?"
- "What does the SOP say about SCBA bottle change intervals?"

The correct behaviour is to say it is not in the loaded documents, and to point
at the controlled document instead. A model that answers these from general
knowledge has told you something important about its configuration.

**Jurisdiction — it must not blend frameworks**

- "What is our ARFF level for a Code 4 aerodrome?"
- "Which advisory circular covers this?"

It should ask or cite South African instruments, not Part 139. If it answers
with FAA citations unprompted, the US material in Tier 3 is dominating.

---

## The warning that must accompany it

Whatever the test results, learners need this in front of them. Put it on the
chat screen, not in a terms page nobody opens.

> **This assistant searches documents and generates text. It can be confidently
> wrong.**
>
> It retrieves from the documents loaded on this server and shows you what it
> found. Verify anything that matters against the controlled copy. **Never use
> it to make an operational decision, and never treat an answer as an SOP.**
>
> Where this answer and the governing standard disagree, the standard wins and
> the answer is wrong — tell someone.

The reason is not theoretical. A language model produces fluent text that
sounds authoritative regardless of whether it is grounded. On a subject where
the wrong agent concentration or a missed evacuation cue kills someone, that is
not an acceptable failure mode, and no amount of retrieval grounding removes it
entirely. Retrieval makes it *much* safer. It does not make it safe.

---

## A better use than chatting

If the goal is learners asking questions, note that the platform's Coach tab
already does keyword retrieval over reviewed content, deterministically, with
no hallucination surface at all.

The strongest combination is:

- **Reviewed platform content** → the Coach index. Deterministic, offline, honest.
- **The full document library** → the AI assistant, framed as *document search
  with generated summaries*, for exploration and orientation.
- **Operational decisions** → a person with a controlled document.

Hold the line on that third one and the other two are genuinely useful. Let the
assistant drift into the third and it will eventually be the reason someone gets
hurt.
