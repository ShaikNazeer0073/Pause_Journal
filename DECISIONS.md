# DECISIONS.md — Engineering & Design Rationale

**Track Selected**: Part 2 — The Premium Home Page  
**Product**: Morrow — A Quiet Daily Journal (`project1.html`)  

---

### 1. Why This Design Strategy Over The Obvious Alternative Rejected?

**Strategy Chosen**: A **Privacy-First Memory Sanctuary** using a luminous light rose quartz theme (`#fff5f7` paper, Rose Quartz `#e85d75`, espresso rose typography `#2a1c22`), system typography (Georgia / System Sans), a **Filter Icon Dropdown Menu**, and **minimal Date-only Memory Vault boxes** that trigger an interactive Journal Reader Modal equipped with **Edit (✏️)** controls.

**Obvious Alternatives Rejected**:
1. *Destructive Deletion*: Completely removed destructive delete actions. In a peaceful journaling experience, every day's reflection is preserved as a permanent milestone of personal growth. Users can edit past entries to update their thoughts, but cannot accidentally erase history.
2. *Read-Only Vault Display*: Rejected static read-only history cards. Users have full agency to edit and refine past reflections when needed.
3. *External Dependencies & Cloud Servers*: Morrow is 100% self-contained and operates entirely offline in the user's browser with zero network requests.
4. *Productivity & Engagement-Driven SaaS Marketing*: Replaced aggressive growth tactics (streak counters, artificial urgency, notification badges) with genuine care for the customer's mental well-being and privacy.

---

### 2. Trade-Offs Made Under Time Constraints & What I’d Do With a Real Week

* **Trade-Off Made**: Client-side in-memory state persistence via native DOM elements rather than an external cloud database.
* **Why**: To guarantee 100% privacy, zero data leaks, and zero network latency while evaluating UI craft and user experience.

* **With a Real Week I Would**:
  1. **Local-First File Exports**: Add native HTML5 Blob/File API export buttons so users can download their entries as Markdown or JSON without any server.
  2. **Service Worker PWA Offline Support**: Package as a Progressive Web App (PWA) for 1-click desktop/mobile installation.

---

### 3. AI Tool Usage & Personal Verification

* **Where AI Tools Were Used**:
  * Scaffolding initial CSS layout structures and dropdown menu positioning.
  * Brainstorming editorial philosophy copy.
  * Draft verification for cross-browser CSS property mappings.

* **What Was Personally Verified and Changed**:
  * **Interactive Edit Modal**: Hand-coded the modal edit state transition, star-rating update handler, real-time word count recalculation, and DOM grid card synchronization.
  * **Copy Tuning**: Rewrote all hero, philosophy, and sample entries line-by-line to ensure every sentence sounds authentic, caring, grounded, and human.
  * **Theme & Contrast Ratios**: Hand-calculated and adjusted HSL/HEX color tokens (`#fff5f7`, `#e85d75`, `#2a1c22`) to meet WCAG AA contrast standards in light mode.
  * **Interactive Code & Logic**: Personally authored and verified the star rating radio behavior, the Filter Icon Dropdown menu toggle, the Memory Vault search/filter logic, the Reader Modal keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`), and the Konami Code easter egg listener.
