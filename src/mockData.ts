import { ChatSession, PromptTemplate, ModelOption } from './types';

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  // Today
  {
    id: 'chat-sprint-plan',
    title: 'Create a detailed 7-day sprint plan f...',
    timeGroup: 'Today',
    createdAt: '10:15 AM',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Create a detailed 7-day sprint plan for shipping our new analytics dashboard MVP.',
        timestamp: '10:15 AM',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### 🚀 7-Day Sprint Plan: Analytics Dashboard MVP

Here is a structured agile sprint framework tailored for velocity and high reliability:

#### **Day 1: Scope Freeze & Schema Architecture**
- Lock key metrics: MAU, conversion funnel, p95 query latency.
- Finalize API endpoints: \`GET /api/v1/metrics/timeseries\`, \`GET /api/v1/dashboards/widgets\`.
- **Deliverable:** Signed-off PRD and API contracts.

#### **Day 2: Core Visual Scaffold & Mock Data**
- Scaffold frontend grid with Chart.js / Recharts components.
- Implement responsive layout with dark/light theme support.
- **Deliverable:** Working UI shell with mock state providers.

#### **Day 3: Backend Aggregation Pipeline**
- Build PostgreSQL/ClickHouse rollup materialized views.
- Implement Redis caching layer with 60-second TTL.
- **Deliverable:** Live data ingestion passing mock load tests.

#### **Day 4: Real-time Telemetry & Filter Controls**
- Hook date-range pickers and drill-down filters into query params.
- Add live WebSocket updates for active user counters.
- **Deliverable:** Full end-to-end data flow integrated.

#### **Day 5: Error Boundaries & Edge Cases**
- Handle offline states, null data cards, and loading skeletons.
- Audit permission tiers (Admin vs Viewer access controls).
- **Deliverable:** Zero unhandled UI exceptions during error injection.

#### **Day 6: QA Hardening & Stakeholder Demo**
- Cross-browser verification on Chromium, Safari, and mobile breakpoints.
- Conduct 30-minute interactive review with product leadership.
- **Deliverable:** Green status on all critical path acceptance tests.

#### **Day 7: Canary Rollout & Observability Monitoring**
- 10% traffic canary release with Datadog / Sentry dashboards live.
- Post-launch verification and team retrospective notes.
- **Deliverable:** MVP live in production with error rate < 0.05%.

*Would you like me to generate ticket descriptions or estimate story point weights for each item?*`,
        timestamp: '10:16 AM',
      },
    ],
  },
  {
    id: 'chat-stakeholder-email',
    title: 'Draft a concise email to stakeholder...',
    timeGroup: 'Today',
    createdAt: '09:40 AM',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Draft a concise email to stakeholders explaining a 48-hour delivery delay due to third-party API rate limits.',
        timestamp: '09:40 AM',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `**Subject:** Update: Q4 Analytics Rollout Schedule (48-Hour Adjustment)

Hi Team,

I am writing to share a brief operational update regarding our Q4 Analytics rollout.

### **Current Status & Context**
During yesterday's final staging stress tests, our upstream data provider enacted new rate-limiting throttles on batch sync requests. While the core dashboard build is complete, this dependency bottleneck impacts our ingestion pipeline stability.

### **Resolution Plan**
- **Action Taken:** Our data infrastructure team has implemented intelligent request batching with exponential backoff and coordinated elevated rate limits with the provider's technical account manager.
- **Timeline:** We are conducting end-to-end load validation over the next 24 hours.

### **Revised Milestones**
- **Internal Verification:** Tomorrow by 4:00 PM EST
- **Public Availability:** Thursday, 10:00 AM EST (48-hour adjustment from Tuesday)

All core feature scope remains 100% intact with zero degradation to security or performance. I will send a confirmation update by 3:00 PM tomorrow. Please let me know if you have any questions in the interim.

Best regards,  
**Jackson Reed**  
Lead Product Manager`,
        timestamp: '09:41 AM',
      },
    ],
  },
  {
    id: 'chat-eisenhower-matrix',
    title: "Analyze the 'Eisenhower Matrix' an...",
    timeGroup: 'Today',
    createdAt: '08:22 AM',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: "Analyze the 'Eisenhower Matrix' and show me how to apply it to modern remote engineering leadership.",
        timestamp: '08:22 AM',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### 🧭 The Eisenhower Matrix in Remote Engineering Leadership

The Eisenhower Matrix categorizes tasks across two axes: **Urgency** (time sensitivity) and **Importance** (strategic leverage). In distributed tech teams, the failure mode is almost always living exclusively in Quadrant 1 and Quadrant 3.

\`\`\`
                  URGENT                   NOT URGENT
         +-----------------------+-------------------------+
         |      QUADRANT 1       |       QUADRANT 2        |
         |        DO NOW         |        SCHEDULE         |
IMPORTANT|  P0 Production Incidents|  System Architecture Refactor|
         |  Key Hire Resignation|  Mentorship & 1-on-1s   |
         |  Regulatory Blockers  |  Tech Debt Automation   |
         +-----------------------+-------------------------+
         |      QUADRANT 3       |       QUADRANT 4        |
         |       DELEGATE        |        ELIMINATE        |
   NOT   |  Ad-hoc Slack Pings   |  Zombie Status Meetings |
IMPORTANT|  Low-priority PRs     |  Unread Vendor Pitches  |
         |  Routine Status Reports|  Endless Tool Tweaking  |
         +-----------------------+-------------------------+
\`\`\`

#### **Strategic Rules for Remote Leads:**
1. **Protect Q2 Ruthlessly:** Block 2 contiguous mornings per week for "Deep Architecture & Strategy". If Q2 is starved, Q1 emergencies compound.
2. **Automate Q3 via Async Rituals:** Replace daily status syncs with structured Slack/Geekbot check-ins.
3. **Audit Q4 Bi-weekly:** If a recurring sync has no agenda 2 hours prior, cancel it automatically.`,
        timestamp: '08:23 AM',
      },
    ],
  },

  // Yesterday
  {
    id: 'chat-diff-between',
    title: 'Summarize the main differences be...',
    timeGroup: 'Yesterday',
    createdAt: 'Yesterday, 4:15 PM',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Summarize the main differences between optimistic UI updates and pessimistic UI updates in client-server apps.',
        timestamp: 'Yesterday, 4:15 PM',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### Optimistic vs. Pessimistic UI Updates

| Characteristic | Optimistic UI | Pessimistic UI |
| :--- | :--- | :--- |
| **Execution Trigger** | Updates client UI immediately on user action before network confirmation. | Waits for backend response before updating UI state. |
| **Perceived Latency** | Instant (0ms response feeling). | Bounded by network RTT + server latency (200ms–2000ms+). |
| **Failure Handling** | Requires rollback logic, snackbar alerts, or retry queues. | Simpler: shows error state, no state rollback needed. |
| **Best Used For** | Likes, bookmarks, toggle switches, message feeds. | Financial checkouts, bank transfers, critical deletions. |
| **State Complexity** | High (must manage temporary IDs & rollback cache). | Low (source of truth remains purely server-driven). |`,
        timestamp: 'Yesterday, 4:16 PM',
      },
    ],
  },
  {
    id: 'chat-negotiate-extension',
    title: 'I need to negotiate an extension for ...',
    timeGroup: 'Yesterday',
    createdAt: 'Yesterday, 1:10 PM',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'I need to negotiate an extension for our vendor contract renewal without looking vulnerable.',
        timestamp: 'Yesterday, 1:10 PM',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### 🎯 Strategic Framework for Contract Extension Negotiations

When requesting an extension, position it from a stance of **governance and thorough evaluation**, rather than indecision or weakness.

#### **The Anchor Principle**
> *"We value our partnership and want to ensure our upcoming renewal accurately reflects our projected expansion tiers."*

#### **Recommended Script**
*"Hi [Account Executive],*  
*Our executive steering committee is currently finalizing our enterprise budget allocations for the forthcoming fiscal cycle. To ensure our renewed scope comprehensively accounts for our new regional teams, we would like to execute a 45-day extension of our current agreement terms.*  

*This will give us the breathing room to complete our usage projections and present a well-structured multi-year proposal to our CFO. Please send through an amendment rider for the extension period at your earliest convenience."*`,
        timestamp: 'Yesterday, 1:11 PM',
      },
    ],
  },

  // 7 days
  {
    id: 'chat-morning-habits',
    title: 'Generate 5 effective morning habits...',
    timeGroup: '7 days',
    createdAt: '3 days ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Generate 5 effective morning habits for cognitive clarity and sustained energy.',
        timestamp: '3 days ago',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### 5 High-Leverage Morning Protocols for Mental Clarity

1. **Delayed Dopamine & Zero Screen First 30 Min:** Avoid opening social or work notifications immediately upon waking to prevent reactive cortisol spikes.
2. **Early Photonic Calibration:** Get 10–15 minutes of outdoor sunlight in the eyes within an hour of waking to anchor your circadian rhythm.
3. **Hydration with Electrolyte Matrix:** Drink 500ml water with a pinch of Celtic sea salt and lemon before any caffeine.
4. **90-Minute Caffeine Delay:** Allow adenosine clearance before ingesting caffeine to eliminate the dreaded 2:00 PM afternoon crash.
5. **The Daily 3 Focus Selection:** Pen down the exact three high-value outcomes that define success before checking inbox communications.`,
        timestamp: '3 days ago',
      },
    ],
  },
  {
    id: 'chat-non-tech-pm',
    title: 'As a non-technical PM, list 5 crucial...',
    timeGroup: '7 days',
    createdAt: '4 days ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'As a non-technical PM, list 5 crucial questions to ask engineers during technical grooming.',
        timestamp: '4 days ago',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### 5 Crucial Technical Grooming Questions for PMs

1. **"What is the simplest version of this that proves our hypothesis?"** (Cuts over-engineering early).
2. **"What assumptions are we making about existing systems or third-party APIs?"** (Exposes hidden dependencies).
3. **"Where is this most likely to fail in production, and how will we know?"** (Encourages observability and error handling).
4. **"If we had to cut this ticket's scope by 50%, what delivers the core value?"** (Finds the true MVP slice).
5. **"What technical debt does this implementation create, and what is our plan to service it?"** (Prevents compounding architecture drag).`,
        timestamp: '4 days ago',
      },
    ],
  },
  {
    id: 'chat-allocate-hours',
    title: 'Help me allocate 8 hours tomorrow:...',
    timeGroup: '7 days',
    createdAt: '5 days ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Help me allocate 8 hours tomorrow: 2 client meetings, 1 code review, deep work for pitch deck, and admin.',
        timestamp: '5 days ago',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### Chrono-Optimized 8-Hour Daily Schedule

- **08:30 – 11:00 (2.5 hrs):** 🧠 **Deep Work: Pitch Deck Architecture** (Peak cognitive window; zero notifications).
- **11:00 – 11:30 (0.5 hr):** ⚡ **Code Review & Pull Requests** (Fresh eyes, high attention to detail).
- **11:30 – 12:30 (1.0 hr):** 🤝 **Client Meeting 1** (High energy mid-day delivery).
- **12:30 – 01:15 (45 min):** 🥗 *Lunch & Screen-free recharge*.
- **01:15 – 02:15 (1.0 hr):** 🤝 **Client Meeting 2** (Collaborative discovery session).
- **02:15 – 03:45 (1.5 hrs):** 🎨 **Pitch Deck Visual Polish & Narrative Wrap** (Iterative focus).
- **03:45 – 04:30 (45 min):** 📥 **Admin, Invoicing, Async Slack Triage** (Low-cognitive tasks).
- **04:30 – 05:00 (30 min):** 🏁 **Daily Retrospective & Tomorrow Plan**.`,
        timestamp: '5 days ago',
      },
    ],
  },
  {
    id: 'chat-creative-name',
    title: 'We need a creative name for our ne...',
    timeGroup: '7 days',
    createdAt: '6 days ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'We need a creative name for our new AI-assisted research and knowledge synthesis tool.',
        timestamp: '6 days ago',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `### 🎯 Naming Directions for AI Knowledge Tool

#### 1. Neoclassical & Cognitive
- **Cortex:** Clean, authoritative, structural intelligence.
- **Synapse:** High speed, network effects, neural associations.
- **Episteme:** Rooted in verified knowledge and truth.

#### 2. Fluent & Modern Minimalist
- **Aura:** Atmospheric, ambient, effortlessly supportive.
- **Strata:** Deep geological layers of knowledge synthesis.
- **Nodex:** Interconnected knowledge points.

#### 3. Action-Driven
- **Distill:** Direct benefit of refining messy data into gold.
- **Vantage:** Elevating users above raw noise to see key insights.`,
        timestamp: '6 days ago',
      },
    ],
  },
  {
    id: 'chat-positive-feedback',
    title: 'Write a 100-word positive feedback...',
    timeGroup: '7 days',
    createdAt: '7 days ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Write a 100-word positive feedback for a junior engineer who stepped up during an unexpected production incident.',
        timestamp: '7 days ago',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        text: `*"I want to commend your exceptional composure and technical execution during yesterday's production database outage. You immediately stepped forward, methodically parsed the replica error logs, and clearly communicated the root cause to the incident command channel. Your rapid mitigation script restored query availability ten minutes ahead of our target SLA. Demonstrating such high ownership, calm under pressure, and rigorous systematic debugging is rare and deeply valued. Outstanding work—you made a tremendous difference for the team and our users!"* (88 words)`,
        timestamp: '7 days ago',
      },
    ],
  },
];

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Cortex',
    description: 'Fast, articulate intelligence for general cognition and synthesis',
    badge: 'Standard',
    speed: 'Ultra Fast (0.2s)',
    reasoning: 'Balanced',
  },
  {
    id: 'gemini-3.8-flash-deep',
    name: 'Cortex Deep',
    description: 'Extended thinking mode for complex STEM, coding, and multi-step reasoning',
    badge: 'Pro',
    speed: 'High Depth (0.8s)',
    reasoning: 'Extensive',
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Cortex Lite',
    description: 'Low-latency conversational partner with zero overhead',
    badge: 'Lite',
    speed: 'Instant (0.1s)',
    reasoning: 'Concise',
  },
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Synthesize Data',
    description: 'Turn my meeting notes into 5 key bullet points for the team.',
    category: 'Product',
    icon: 'ph-chart-pie-slice',
    prompt: 'Synthesize these notes into 5 clear executive bullet points with owners and deadlines: ',
  },
  {
    id: 'tpl-2',
    title: 'Creative Brainstorm',
    description: 'Generate 3 taglines for a new sustainable fashion brand.',
    category: 'Creative',
    icon: 'ph-lightbulb-filament',
    prompt: 'Generate 3 distinct creative brand taglines and emotional positioning angles for a sustainable fashion brand.',
  },
  {
    id: 'tpl-3',
    title: 'Check Facts',
    description: 'Compare key differences between GDPR and CCPA.',
    category: 'Legal',
    icon: 'ph-gavel',
    prompt: 'Compare the critical legal and operational differences between GDPR and CCPA in a clean comparison table.',
  },
  {
    id: 'tpl-4',
    title: 'Architecture Review',
    description: 'Evaluate microservices vs modular monolith for an early-stage startup.',
    category: 'Engineering',
    icon: 'ph-cpu',
    prompt: 'Provide a rigorous trade-off evaluation comparing microservices vs modular monolith for a seed-stage team of 5 engineers.',
  },
  {
    id: 'tpl-5',
    title: 'Board Pitch Narrative',
    description: 'Frame a 3-act narrative for quarterly board meeting deck.',
    category: 'Strategy',
    icon: 'ph-presentation',
    prompt: 'Draft a compelling 3-act story arc for a Series A board meeting reviewing revenue growth and runway.',
  },
];
