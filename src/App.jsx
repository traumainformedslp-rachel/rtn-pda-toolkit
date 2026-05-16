import { useState, useEffect, useMemo } from "react";

// ─────────── THEME — RdYlBl Design System ───────────
// 8-stop diverging palette: #d73027 #f46d43 #fdae61 #7cca7c #abd9e9 #4b6ce4 #4575b4 #313695

const GRADIENT = "linear-gradient(90deg, #4575b4 0%, #abd9e9 50%, #7cca7c 100%)";
const RAINBOW  = "linear-gradient(90deg, #d73027, #f46d43, #fdae61, #7cca7c, #abd9e9, #4b6ce4, #4575b4, #313695)";

const T = {
  dark: {
    bg: "#0f1528", card: "#181e36", border: "#2a3254", inputBg: "#121830",
    text: "#e4e8f4", textMuted: "#8e96b8", textDim: "#5c6488", textSub: "#b4bcd6",
    accent: "#6b8ef0", btnBg: "#1c2440", tagBg: "#1e2748",
    checkBg: "#1e2b50", checkColor: "#8db4f8",
    gradient: GRADIENT, rainbow: RAINBOW,
  },
  light: {
    bg: "#f0f2f5", card: "#ffffff", border: "#c0c6d0", inputBg: "#f4f6fa",
    text: "#1a1a2a", textMuted: "#3a3c50", textDim: "#6b7280", textSub: "#3a3c50",
    accent: "#313695", btnBg: "#f4f6fa", tagBg: "#e8eff7",
    checkBg: "#dde4f2", checkColor: "#252a70",
    gradient: GRADIENT, rainbow: RAINBOW,
  },
};

// ─────────── REFERENCES ───────────

const REFERENCES = [
  { id: "newson2003",    full: "Newson, E., Le Maréchal, K., & David, C. (2003). Pathological demand avoidance syndrome: a necessary distinction within the pervasive developmental disorders. Archives of Disease in Childhood, 88(7), 595–600.", url: "https://adc.bmj.com/content/88/7/595" },
  { id: "onions2014",    full: "O'Nions, E., Christie, P., Gould, J., Viding, E., & Happé, F. (2014). Development of the 'Extreme Demand Avoidance Questionnaire' (EDA-Q). Journal of Child Psychology and Psychiatry, 55(7), 758–768." },
  { id: "onions2018",    full: "O'Nions, E., Happé, F., Evers, K., Boonen, H., & Noens, I. (2018). How do parents manage irritability, challenging behaviour, non-compliance and anxiety in children with autism spectrum disorders? Journal of Autism and Developmental Disorders, 48(4), 1272–1286." },
  { id: "eaton2018",     full: "Eaton, J. (2018). A Guide to Mental Health Issues in Girls and Young Women on the Autism Spectrum: Diagnosis, Intervention and Family Support. Jessica Kingsley Publishers." },
  { id: "pdasociety",    full: "PDA Society. (2022). Being Misunderstood: Experiences of the Pathological Demand Avoidance profile of autism. PDA Society, UK.", url: "https://www.pdasociety.org.uk" },
  { id: "murphy2020",    full: "Murphy, L. K. (2020). Declarative Language Handbook: Using a Thoughtful Language Style to Help Kids with Social Learning Challenges Feel Competent, Connected, and Understood. Independently published.", url: "https://declarativelanguage.com" },
  { id: "greene2014",    full: "Greene, R. W. (2014). The Explosive Child: A New Approach for Understanding and Parenting Easily Frustrated, Chronically Inflexible Children (5th ed.). Harper.", url: "https://livesinthebalance.org" },
  { id: "greene2021",    full: "Greene, R. W. (2021). Lost & Found: Helping Behaviorally Challenging Students (2nd ed.). Jossey-Bass." },
  { id: "cannon2011",    full: "Cannon, L., Kenworthy, L., Alexander, K. C., Werner, M. A., & Anthony, L. (2011). Unstuck and On Target!: An Executive Function Curriculum to Improve Flexibility for Children with Autism Spectrum Disorders. Brookes Publishing.", url: "https://unstuckandontarget.com" },
  { id: "kenworthy2014", full: "Kenworthy, L., Anthony, L. G., Naiman, D. Q., Cannon, L., Wills, M. C., Luong-Tran, C., Werner, M. A., Alexander, K. C., Strang, J., Bal, E., Sokoloff, J. L., & Wallace, G. L. (2014). Randomized controlled effectiveness trial of executive function intervention for children on the autism spectrum. Journal of Child Psychology and Psychiatry, 55(4), 374–383." },
  { id: "mahler2019",    full: "Mahler, K. (2019). The Interoception Curriculum: A Step-by-Step Framework for Developing Mindful Self-Regulation. Kelly Mahler.", url: "https://www.kelly-mahler.com" },
  { id: "mahler2022",    full: "Mahler, K., Hample, K., Jones, C., Sensenig, J., Thomasco, P., & Hilton, C. (2022). Impact of an interoception-based program on emotion regulation in autistic children. Occupational Therapy International, 2022, Article 9328967." },
  { id: "mahler2024",    full: "Mahler, K. et al. (2024). An interoception-based intervention for improving emotional regulation in children in a special education classroom. OT in Health Care." },
  { id: "porges2011",    full: "Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-Regulation. W. W. Norton." },
  { id: "siegel2012",    full: "Siegel, D. J. (2012). The Developing Mind: How Relationships and the Brain Interact to Shape Who We Are (2nd ed.). Guilford Press." },
  { id: "milton2012",    full: "Milton, D. E. M. (2012). On the ontological status of autism: the 'double empathy problem'. Disability & Society, 27(6), 883–887." },
  { id: "chapman2023",   full: "Chapman, R., & Botha, M. (2023). Neurodivergence-informed therapy. Developmental Medicine & Child Neurology, 65(3), 310–317." },
  { id: "deciryan2000",  full: "Deci, E. L., & Ryan, R. M. (2000). The 'what' and 'why' of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268." },
];

// ─────────── CORE PRINCIPLES ───────────

const CORE_PRINCIPLES = [
  { title: "Autonomy over compliance", desc: "The goal is never 'follows directions.' It is 'communicates needs and negotiates task approach.' Self-determination is the target skill.", cite: "deciryan2000, pdasociety" },
  { title: "Declarative over imperative", desc: "Share observations, don't issue commands. Information reduces perceived demand; instructions escalate it.", cite: "murphy2020" },
  { title: "Competence over correction", desc: "This student is smart and knows it. Leverage identity-level framing — expert, scientist, detective, co-pilot.", cite: "greene2014" },
  { title: "Co-regulation over behavior management", desc: "Your calm is the intervention. Nervous systems regulate one another before cognition is possible.", cite: "porges2011, siegel2012" },
  { title: "Observation over interrogation", desc: "'I noticed…' and 'I wonder…' invite without requiring. Question-load is a hidden demand.", cite: "murphy2020" },
  { title: "Partial engagement counts", desc: "A student who listens but doesn't write is still learning. Lower the bar for 'success' — consent to engage is the floor.", cite: "eaton2018" },
  { title: "Double empathy, not deficit", desc: "The gap between autistic and non-autistic communication is bidirectional. Adapt your style; do not ask the student to mask.", cite: "milton2012, chapman2023" },
];

// ─────────── SESSIONS ───────────

const SESSIONS = [
  {
    id: 1, title: "The Expert Within", subtitle: "Strengths-Based Self-Awareness", duration: "30 min", icon: "🧠",
    color: "#4575b4",
    targetSkill: "Self-awareness, strategy identification, strengths-based identity",
    evidence: "Strengths-based practice; Self-Determination Theory (Deci & Ryan, 2000); Declarative Language (Murphy, 2020)",
    cite: ["deciryan2000", "murphy2020"],
    evVideos: ["Self-Controller Scanner — Introduction", "Checking In With Yourself", "Finding Strategies That Work for You"],
    unstuckLink: "Lesson 1: Get to Know You · Lesson 3: Emotional Identification",
    activities: [
      { name: "Energy Meter Check-In", time: "5 min", type: "opening",
        desc: "Place a 1–5 energy scale visible (not pointed at the student). You share yours first. Wait. No demand to respond.",
        prompt: "What did the student's energy seem like today? Did they share voluntarily?",
        swaps: [{ old: "How are you feeling?", new: "I noticed the hallway was really loud today." }, { old: "Are you ready?", new: "I'm thinking we could start with something I found..." }],
        useEnergyMeter: true,
        selectOptions: { label: "Student engagement level", options: ["Shared voluntarily", "Observed but didn't share", "Avoided/resistant", "Matched my energy check-in"] }
      },
      { name: "Two Experts Protocol", time: "10 min", type: "core",
        desc: "Give a high-interest text matched to the student's interests. Both of you read it. You each write ONE takeaway (you write yours too). Frame: 'We're both researching this.' Then pivot to connected non-preferred task: 'Here's the tricky part. I wonder how an expert like you would handle it.'",
        prompt: "What text/topic did you use? How did the student respond to being positioned as an expert?",
        swaps: [{ old: "Read this passage.", new: "I've been wondering what you'd think of this." }, { old: "Answer the questions.", new: "I'm curious what stood out to you." }],
        selectOptions: { label: "Student's response to expert framing", options: ["Engaged readily", "Needed warm-up time", "Took the lead", "Resistant to the pivot"] }
      },
      { name: "Interest Inventory Detective Work", time: "8 min", type: "core",
        desc: "Student creates a 'classified file' on themselves — not a worksheet, a dossier. Categories: Expert Topics, Brain Fuel (what energizes them), Kryptonite (what drains them), Secret Weapons (strategies that work). They fill in only what they want. You fill one out too.",
        prompt: "What did the student list as their Expert Topics and Secret Weapons?",
        swaps: [{ old: "Tell me what you're good at.", new: "I've noticed you seem to know a lot about [topic]. I'm curious what else is in that category." }, { old: "What's hard for you?", new: "Every expert has things that drain their battery. Mine is [share yours]." }],
      },
      { name: "Strategy Bank Deposit", time: "7 min", type: "closing",
        desc: "Visual of a vault/safe. Student identifies what worked today and 'deposits' it. They name, draw, or describe. It's theirs — no one tells them which strategies to deposit. Running tally across sessions.",
        prompt: "What strategy did the student deposit today?",
        swaps: [{ old: "What did you learn?", new: "I noticed something cool about how you handled that tricky part." }, { old: "Good job!", new: "That approach was really creative." }],
      },
    ],
  },
  {
    id: 2, title: "The Flexibility Lab", subtitle: "Open-Mind Science Experiments", duration: "30 min", icon: "🔬",
    color: "#4b6ce4",
    targetSkill: "Cognitive flexibility, Plan A / Plan B thinking, tolerance of unexpected change",
    evidence: "Unstuck & On Target RCT (Kenworthy et al., 2014); flexibility training in autistic EF curricula",
    cite: ["cannon2011", "kenworthy2014"],
    evVideos: ["Keeping an Open Mind — Introduction", "Keeping an Open Mind (Full Lesson)", "When the Little Things Feel Big"],
    unstuckLink: "Lesson 5: Flexibility Investigation · Lesson 8: Plan A to Plan B",
    activities: [
      { name: "Lab Setup & Naming", time: "5 min", type: "opening",
        desc: "Frame as a science experiment. Student is Lead Scientist, you're the assistant. Give them a Lab Notebook (folded paper). Write 'CLASSIFIED' on cover. Let them name the lab. No demands — just set up the materials and let curiosity do the work.",
        prompt: "What did the student name their lab? How did they respond to the scientist role?",
        swaps: [{ old: "Today we're learning about flexible thinking.", new: "I set up something interesting — like a lab experiment about brains." }, { old: "Sit down and watch this.", new: "I found a video that shows something I thought was pretty cool." }],
      },
      { name: "Brain Path Mapping", time: "10 min", type: "core",
        desc: "After watching 'Keeping an Open Mind': present 3 scenario cards (ideally from this student's real triggers). For each, student draws/writes the 'stuck path' and the 'flexible path.' Both are valid observations — not right/wrong. Use Unstuck language: 'Plan A didn't work. I wonder what Plan B could look like.'",
        prompt: "Which scenarios did you use? What stuck/flexible paths did the student identify?",
        swaps: [{ old: "Was Shay being flexible or stuck?", new: "I noticed Shay's brain did something interesting when the rules changed..." }, { old: "What should he have done?", new: "I wonder what was happening in Shay's brain right then." }],
        selectOptions: { label: "Flexibility awareness", options: ["Identified both paths easily", "Needed prompting for flexible path", "Got stuck on the stuck path (meta!)", "Generated creative alternatives"] }
      },
      { name: "The Obstacle Course Experiment", time: "8 min", type: "core",
        desc: "From Unstuck & On Target: Physical flexibility demo. Can you get through an obstacle course faster with a rigid body or a flexible one? Set up simple desk/chair obstacles. Student tries rigid (arms stiff, no bending) then flexible. Debrief: 'I noticed your body did better when it was flexible. I wonder if brains work the same way.' Hands-on, low demand, high engagement.",
        prompt: "How did the student respond to the physical metaphor? Did they make the brain connection?",
        swaps: [{ old: "Now try it the flexible way.", new: "I'm curious what happens if you try it differently this time." }, { old: "See? Being flexible is better.", new: "Interesting — your body seemed to move more easily that time." }],
      },
      { name: "Big Deal / Little Deal Sort", time: "7 min", type: "core",
        desc: "From Unstuck & On Target. Give student scenario cards with various frustrations. Two piles: Big Deal and Little Deal. Key: there's no 'right' answer. The student's sort is their sort. Then discuss: 'I notice you put [X] in Big Deal. I'm curious about that — I might have put it somewhere different.' Opens perspective-taking without correction.",
        prompt: "Which items did the student sort as Big Deal vs. Little Deal? Any surprises?",
        swaps: [{ old: "That's not really a big deal.", new: "Interesting — I see that differently. I wonder why we see it differently." }, { old: "You need to let that go.", new: "I notice that one landed in the Big Deal pile. Bodies and brains react strongly to Big Deals." }],
        selectOptions: { label: "Big Deal/Little Deal calibration", options: ["Most items sorted as expected", "Many items in Big Deal (high threat detection)", "Sorted quickly with confidence", "Struggled to differentiate / wanted to discuss"] }
      },
      { name: "Lab Report", time: "5 min", type: "closing",
        desc: "Student records findings: Hypothesis (what I expected), Observation (what happened), Next Experiment (what I want to try). They choose how much to write. One word counts.",
        prompt: "What did the student write for their Next Experiment?",
        swaps: [{ old: "Write what you learned.", new: "Scientists usually record their best findings. I'm curious which experiment you'd want to remember." }],
      },
    ],
  },
  {
    id: 3, title: "The Co-Pilot Protocol", subtitle: "Collaborative Negotiation with Adults", duration: "30 min", icon: "✈️",
    color: "#7cca7c",
    targetSkill: "Self-advocacy, collaborative problem-solving, authentic negotiation",
    evidence: "Collaborative & Proactive Solutions — Plan B (Greene, 2014, 2021); Unstuck Lessons 9 & 11",
    cite: ["greene2014", "greene2021", "cannon2011"],
    evVideos: ["Compromising With Others", "Advocating in the Classroom", "Advocate for Your Learning Accommodations"],
    unstuckLink: "Lesson 9: Compromise · Lesson 11: Choice vs. No Choice",
    activities: [
      { name: "Cockpit Introduction", time: "5 min", type: "opening",
        desc: "Draw or show cockpit visual. Pilot = Teacher (sets destination). Co-Pilot = Student (chooses route, monitors, flags problems). Key message: Co-pilot has REAL power and REAL responsibility. 'In your classes, when do you feel more like a pilot, a co-pilot, or a passenger?'",
        prompt: "How did the student identify themselves across different classes/settings?",
        swaps: [{ old: "Today we're learning to follow directions.", new: "I was thinking about how pilots work together — neither flies alone." }, { old: "Sometimes you need to listen to adults.", new: "I've noticed that even expert pilots use co-pilots. I wonder why." }],
        selectOptions: { label: "Student self-identified as...", options: ["Mostly pilot (wants full control)", "Mix of pilot/co-pilot", "Mostly passenger (feels powerless)", "Different roles in different settings"] }
      },
      { name: "Plan B Flight Simulations", time: "12 min", type: "core",
        desc: "Ross Greene's CPS Plan B, simplified for the student: (1) EMPATHY — 'I noticed you seem to [feel/think] when [situation].' (2) DEFINE CONCERN — 'The thing is, [adult concern].' (3) INVITATION — 'I wonder if we could figure this out together.' Practice with 3 REAL scenarios from the student's actual day. Student role-plays as co-pilot.",
        prompt: "Which 3 scenarios did you use? What solutions did the student generate?",
        swaps: [{ old: "How could you follow this direction?", new: "The pilot set the destination. I'm curious what route the co-pilot might suggest." }, { old: "You need to do what the teacher says.", new: "The destination is fixed, but there seem to be a few flight paths..." }],
      },
      { name: "Choice vs. No Choice Sorting", time: "8 min", type: "core",
        desc: "From Unstuck & On Target Lesson 11. Present real school scenarios on cards. Student sorts into: CHOICE (I can negotiate how) vs. NO CHOICE (the destination is fixed). This validates that some things are negotiable while building acceptance of true non-negotiables. Key: keep the No Choice pile SMALL and honest. Most things are more flexible than adults realize.",
        prompt: "What landed in Choice vs. No Choice? Did the student challenge any No Choice items?",
        swaps: [{ old: "You don't get a choice about that.", new: "That one's interesting — it seems like a No Choice destination, but I wonder about the route." }, { old: "That's just a rule.", new: "I notice some rules feel harder than others. This one seems to land heavy." }],
        selectOptions: { label: "Response to Choice/No Choice", options: ["Accepted sorting framework", "Challenged No Choice items (healthy!)", "Put everything in No Choice (learned helplessness)", "Engaged in negotiation about borderline items"] }
      },
      { name: "Co-Pilot Card Creation", time: "5 min", type: "closing",
        desc: "Student creates a laminated card to keep: sentence starters for self-advocacy. Suggestions: 'Can I try it a different way that gets to the same place?' / 'I work better when...' / 'Can we figure this out together?' Student picks which ones go on THEIR card.",
        prompt: "Which sentence starters did the student choose for their card?",
        swaps: [{ old: "Try this in class tomorrow.", new: "I'm curious which co-pilot move you might test this week." }],
      },
    ],
  },
  {
    id: 4, title: "The Social Detective Agency", subtitle: "Reading the Room Without Losing Yourself", duration: "30 min", icon: "🔍",
    color: "#fdae61",
    targetSkill: "Situational awareness and perspective-taking — without masking or forced conformity",
    evidence: "Double Empathy Problem (Milton, 2012); neurodivergence-informed practice (Chapman & Botha, 2023)",
    cite: ["milton2012", "chapman2023"],
    evVideos: ["Being a Social Chameleon", "Thinking About Others' Feelings", "Listening to Others' Ideas"],
    unstuckLink: "Lesson 12: Expect the Unexpected",
    activities: [
      { name: "Detective Badge & Briefing", time: "5 min", type: "opening",
        desc: "Frame: 'Detectives observe and gather information. They don't change who they are — they just notice more.' This reframes social awareness as intelligence-gathering rather than compliance or masking. Student gets a Detective Notebook. Critical PDA note: emphasize that observing does NOT mean obeying. It means having MORE information to make YOUR choices.",
        prompt: "How did the student respond to the detective framing? Any concerns about masking?",
        swaps: [{ old: "You need to pay attention to how others feel.", new: "Detectives notice things other people miss. I wonder what you notice about this room right now." }, { old: "Watch how other kids act.", new: "I've been observing something interesting about how people shift in different spaces." }],
      },
      { name: "Room Scan Protocol", time: "8 min", type: "core",
        desc: "Watch 'Being a Social Chameleon' FIRST, but reframe: 'This video calls it being a chameleon. I think of it more as being a detective — you're gathering intel, not changing colors.' After video, practice a Room Scan: What's the ENERGY in this room? (calm/busy/tense/playful). What are MOST people doing? What's the UNWRITTEN RULE here? Student fills in Detective Report for 2–3 settings they know (cafeteria, library, gym).",
        prompt: "What did the student observe for each setting? Did they differentiate between observing and conforming?",
        swaps: [{ old: "How should you act in the library?", new: "I notice the library has a different energy than the cafeteria. I wonder what you notice." }, { old: "You're being too loud.", new: "The detective in me just picked up a signal about this room's energy level." }],
        selectOptions: { label: "Observation skills", options: ["Strong observer — noticed subtle cues", "Focused on one element (energy OR behavior)", "Struggled to separate observation from judgment", "Made connections between settings independently"] }
      },
      { name: "Thought Bubble Investigation", time: "10 min", type: "core",
        desc: "Use Everyday Speech's thought bubble concept. Show 3–4 photos/illustrations of social situations. Student draws thought bubbles for each person. Key PDA twist: include a thought bubble for the student themselves: 'What might YOU be thinking in this situation?' Validates their internal experience alongside others'. No right answers.",
        prompt: "What thought bubbles did the student create? Did they include their own perspective?",
        swaps: [{ old: "What is that person feeling?", new: "I wonder what's going on in that person's thought bubble." }, { old: "You should think about how they feel.", new: "It's interesting that two people can look at the same situation and have totally different thought bubbles." }],
      },
      { name: "'I Noticed / I Wonder' Debrief", time: "7 min", type: "closing",
        desc: "Student practices the detective's two favorite phrases: 'I noticed...' and 'I wonder...' These are declarative-language tools THEY can use. Practice: student shares one 'I noticed' and one 'I wonder' from today's session. Add to Detective Notebook. These phrases also give them language for self-advocacy: 'I noticed I work better when...' 'I wonder if I could try...'",
        prompt: "What 'I noticed' and 'I wonder' statements did the student generate?",
        swaps: [{ old: "What did you learn today?", new: "Detectives always debrief after a mission. I'm curious what intel you gathered." }],
      },
    ],
  },
  {
    id: 5, title: "The Body Scientist", subtitle: "Interoception Without the Interrogation", duration: "30 min", icon: "🫀",
    color: "#f46d43",
    targetSkill: "Interoception, self-regulation, body–brain connection",
    evidence: "Mahler Interoception Curriculum RCT evidence (Mahler et al., 2022, 2024); Polyvagal Theory (Porges, 2011)",
    cite: ["mahler2019", "mahler2022", "mahler2024", "porges2011"],
    evVideos: ["Self-Controller Scanner — Introduction", "Taking a Break When You Need It", "Balloon Breathing"],
    unstuckLink: "Lesson 4: What Can You Do to Feel Better?",
    activities: [
      { name: "Body Map Baseline", time: "7 min", type: "opening",
        desc: "Give a body outline. Student marks where they notice sensations RIGHT NOW (not emotions — sensations). Tight shoulders? Jumpy legs? Warm face? You fill one out too and share first. Key: this is data collection, not a feelings check. 'Scientists track what their instruments are telling them.' No judgment on what they mark. Grounded in Kelly Mahler's interoception work.",
        prompt: "What body sensations did the student identify? Where were they located?",
        swaps: [{ old: "How does your body feel?", new: "I notice my shoulders are kind of tight today. I wonder if my body is telling me something." }, { old: "Are you calm or upset?", new: "Scientists check their instruments. I'm curious what data your body is giving you right now." }],
        selectOptions: { label: "Body awareness level", options: ["Identified multiple sensations", "Identified 1–2 basic sensations", "Said 'I don't know' / 'fine'", "Drew extensively with detail"] }
      },
      { name: "Signal-to-Strategy Matching", time: "10 min", type: "core",
        desc: "Create a two-column chart: BODY SIGNAL on left, STRATEGY THAT HELPS on right. Student fills in from their own experience. Example: 'Jumpy legs' → 'Walk to water fountain.' 'Hot face' → 'Breathe out slowly.' 'Brain fog' → 'Doodle for 2 minutes.' Key: Student picks strategies. Watch 'Finding Strategies That Work for You' first to normalize individual differences.",
        prompt: "What signal-to-strategy matches did the student create?",
        swaps: [{ old: "When you're upset, try taking deep breaths.", new: "I've been curious — when your legs get jumpy, what do you notice helps?" }, { old: "You need to use a coping strategy.", new: "Some scientists find that certain signals respond to certain strategies. I wonder which ones match for you." }],
      },
      { name: "The Break Lab", time: "8 min", type: "core",
        desc: "Watch 'Taking a Break When You Need It.' Then design a personalized break protocol: What does the student's break LOOK like? (location, duration, activity). What's the SIGNAL that they need one? (body data from earlier). What's the RETURN plan? (how do they come back without it feeling like a demand?). Student writes this up as a Break Prescription — like a doctor prescribing medicine. They're the doctor.",
        prompt: "What did the student's Break Prescription include? What signal triggers the break?",
        swaps: [{ old: "You can take a break if you need one.", new: "I notice that bodies send signals when they need a reset. I wonder what your signal is." }, { old: "Come back when you're calm.", new: "The prescription says [X minutes] — your body will probably send a 'ready' signal when it's done." }],
        selectOptions: { label: "Break protocol engagement", options: ["Designed detailed protocol enthusiastically", "Needed scaffolding but engaged", "Already has informal break strategies to formalize", "Resistant to the idea of needing breaks"] }
      },
      { name: "Data Log Entry", time: "5 min", type: "closing",
        desc: "Student adds today's body data to their running log. Over sessions, patterns emerge: 'I notice your shoulders show up a lot on Mondays. I wonder what's different about Mondays.' Student owns the data. They can share it or keep it private.",
        prompt: "Any patterns emerging across sessions? Student observations?",
        swaps: [{ old: "Write down how you felt today.", new: "Scientists log their data. I'm curious which observations you'd want to track." }],
      },
    ],
  },
  {
    id: 6, title: "The Mission Control Center", subtitle: "Generalization, Self-Monitoring & Real-World Practice", duration: "30 min", icon: "🚀",
    color: "#d73027",
    targetSkill: "Self-monitoring, generalization, independence, goal-directed behavior",
    evidence: "Unstuck GWPDC framework (Cannon et al., 2011; Kenworthy et al., 2014 RCT); Self-Determination Theory",
    cite: ["cannon2011", "kenworthy2014", "deciryan2000"],
    evVideos: ["Self-Advocacy", "Advocate for Your Learning Accommodations", "Learning to Try My Best"],
    unstuckLink: "Lesson 15: Setting and Achieving Goals (GWPDC) · Lesson 21: Interview",
    activities: [
      { name: "Mission Debrief", time: "7 min", type: "opening",
        desc: "Review what the student has tried in real life since last session. Use the 'I've been wondering...' opener: 'I've been wondering how your co-pilot move went in [class].' or 'I heard something interesting happened in [setting]...' No interrogation. If they don't want to share, pivot: 'That's cool — sometimes data needs time to process.'",
        prompt: "What real-world practice did the student report? What went well?",
        swaps: [{ old: "Did you use your strategies this week?", new: "I've been wondering how things went with that co-pilot move." }, { old: "Your teacher said you had a hard day.", new: "I heard something interesting happened. I'm curious about your version." }],
        selectOptions: { label: "Generalization status", options: ["Used strategies independently", "Used with adult prompting", "Described situations but didn't use strategies", "Reported no opportunities (avoidance?)"] }
      },
      { name: "Goal-Why-Plan-Do-Check (GWPDC)", time: "10 min", type: "core",
        desc: "From Unstuck & On Target. Student picks a real upcoming challenge. Walk through: GOAL (What do I want?), WHY (Why does it matter to me?), PLAN (What's my approach?), DO (Try it), CHECK (How'd it go?). Key: the student sets the goal. Not 'follow directions better' — maybe 'get through math without losing recess.' The goal is THEIRS. Write it on a GWPDC card.",
        prompt: "What goal did the student set? What plan did they create?",
        swaps: [{ old: "Your goal should be to follow directions.", new: "I'm curious what YOU want to be different. What would make your day go better?" }, { old: "Here's what you need to do.", new: "You've got the goal. I wonder what plan would get you there." }],
      },
      { name: "Self-Advocacy Script Builder", time: "8 min", type: "core",
        desc: "Watch 'Advocate for Your Learning Accommodations.' Then build personalized scripts the student can actually use. Template: 'I work best when ___.' / 'It helps me to ___.' / 'Can I try ___ instead?' / 'I'm feeling ___ and I think I need ___.' Student picks 2–3 favorites. Practice saying them out loud. Role-play: you play the teacher, student practices their script. Then switch — student plays the teacher to build perspective.",
        prompt: "Which scripts did the student choose? How did role-play go?",
        swaps: [{ old: "Practice saying this to your teacher.", new: "I'm curious how it feels to say that out loud. Want to try it and see?" }, { old: "You need to tell your teacher when you need help.", new: "Having the right words ready makes a difference. I wonder which of these fit you best." }],
        selectOptions: { label: "Self-advocacy readiness", options: ["Selected scripts confidently", "Needed help adapting language to fit their voice", "Practiced but expressed anxiety about real use", "Already using some version of these naturally"] }
      },
      { name: "Toolkit Review & Launch", time: "5 min", type: "closing",
        desc: "Review all tools collected across sessions: Strategy Bank, Lab Notebook, Co-Pilot Card, Detective Notebook, Break Prescription, GWPDC Card, Self-Advocacy Scripts. Student decides which ones to keep active. They're the mission commander — they choose their loadout.",
        prompt: "Which tools did the student choose to keep? Which are they most likely to use?",
        swaps: [{ old: "Remember to use your strategies.", new: "You've built up quite a toolkit. I'm curious which tools you'll have in your pocket this week." }],
      },
    ],
  },
];

const QUICK_ACTIVITIES = [
  { name: "Would You Rather (Flexibility Edition)", time: "5 min", skill: "Flexibility", desc: "Present would-you-rather cards but with a twist: after choosing, change the rules. 'Actually, that one's not available today.' Practice Plan A → Plan B in a low-stakes, fun context. Declarative: 'Hmm, that option just disappeared. I wonder what happens now.'" },
  { name: "Comic Strip Social Stories", time: "10 min", skill: "Perspective-taking", desc: "Student draws a 3-panel comic of a school scenario. Panel 1: What happened. Panel 2: Thought bubbles for each person. Panel 3: What could happen next. They're the author — no wrong answers. Great for students who resist writing but will draw." },
  { name: "The Negotiation Game", time: "8 min", skill: "Self-advocacy", desc: "You and the student each have a 'wish list' for the session (activities, order, materials). You negotiate the session plan together. Models real-world negotiation. 'I notice we both want different things. I wonder how we figure this out.'" },
  { name: "Stuck/Unstuck Body Scan", time: "3 min", skill: "Interoception", desc: "Quick body check: 'My jaw feels stuck today. My hands feel unstuck.' Student mirrors. Physical awareness of tension without emotional labeling. Can do at start of any session." },
  { name: "Interest-Based Reading Detective", time: "10 min", skill: "Reading + Social cognition", desc: "High-interest article matched to student. After reading: 'What would the author think about [related topic]?' Leverages reading strength to practice inference and perspective-taking. Student is the expert reader." },
  { name: "The Rule Behind the Rule", time: "8 min", skill: "Flexible thinking", desc: "Present a school rule. Student figures out the REASON behind it. 'The rule is no running in the hall. I wonder why that rule exists.' When students understand the WHY, compliance becomes problem-solving. They may even generate better rules." },
  { name: "Power Meter", time: "5 min", skill: "Self-awareness", desc: "Draw a 0–10 power meter. Student rates how much control they feel in different situations. Not good/bad — just data. 'Interesting — math class is a 2 but reading is an 8. I wonder what's different.' Helps identify triggers and strengths." },
  { name: "Strategy Taste Test", time: "10 min", skill: "Self-regulation", desc: "Present 5–6 different calming/regrouping strategies (breathing, doodling, movement, music, fidget, water break). Student tries each for 30 seconds and rates them. They're a food critic but for strategies. No right answers — it's personal preference data." },
  { name: "Rewrite the Script", time: "8 min", skill: "Problem-solving", desc: "Take a real scenario that went poorly. Student 'rewrites' it like a movie director doing a second take. Not 'what should you have done' — 'if you were directing this scene, what would you change?' They maintain creative control." },
  { name: "Two Truths and a Strategy", time: "5 min", skill: "Self-advocacy", desc: "Student shares two true things about how they learn best and one thing that doesn't work. You guess which is which. Fun, low-demand way to practice articulating learning preferences." },
];

const DECLARATIVE_REF = [
  { cat: "Starting tasks",       old: "Open your book to page 12.",            new: "I noticed everyone's finding page 12." },
  { cat: "Transitions",          old: "Time to stop. Clean up now.",           new: "It looks like we're running out of time for this part." },
  { cat: "Behavior redirect",    old: "Stop that and sit down.",               new: "I notice the chair is tipped back pretty far." },
  { cat: "Participation",        old: "Answer the question.",                  new: "I'm wondering what you think about that." },
  { cat: "Work completion",      old: "You need to finish this.",              new: "It seems like there are still a few parts left." },
  { cat: "Social conflict",      old: "Say sorry to him.",                     new: "It looks like something happened between you two." },
  { cat: "Offering help",        old: "Do you need help?",                     new: "That looks like it might be tricky." },
  { cat: "Correcting work",      old: "That's wrong. Fix it.",                 new: "I notice something different about number 3." },
  { cat: "Group work",           old: "Work with your partner now.",           new: "It seems like this might go faster with two brains on it." },
  { cat: "Emotional escalation", old: "Calm down right now.",                  new: "I notice your body seems like it's working really hard right now." },
  { cat: "Instruction giving",   old: "Listen up — here's what we're doing.",  new: "I've got a plan I'm thinking about. Want to hear it?" },
  { cat: "Praise (spotlight)",   old: "Great job!",                            new: "That approach was really creative." },
];

const PRO_TIPS = [
  { text: "Reduce question load. Even open-ended questions can feel like demands. Lead with observations.", cite: "murphy2020" },
  { text: "Offer information, not instructions. 'Some kids find it helps to...' not 'You should try...'",    cite: "murphy2020" },
  { text: "Use humor and novelty. Playfulness reduces threat detection in the nervous system.",              cite: "porges2011" },
  { text: "Narrate rather than direct. 'I'm noticing that...' instead of 'You need to...'",                  cite: "murphy2020" },
  { text: "Wait longer than feels comfortable. Processing time is essential. Resist filling silence.",        cite: "eaton2018" },
  { text: "Accept partial engagement. A student who listens but doesn't write is still learning.",            cite: "pdasociety" },
  { text: "Give advance warnings for transitions. 'In about 5 minutes, we'll probably shift to something different.'", cite: "cannon2011" },
  { text: "Avoid public praise. For many students with a PDA profile, being spotlighted (even positively) feels like a demand.", cite: "pdasociety" },
  { text: "Use 'I wonder' as your secret weapon. It invites without requiring.",                              cite: "murphy2020" },
  { text: "Check YOUR body first. If you're tense, they'll feel it. Co-regulation starts with you.",         cite: "porges2011, siegel2012" },
];

const IEP_GOALS = [
  { area: "Self-Advocacy", goal: "Given a non-preferred task, [student] will use a self-advocacy strategy (e.g., requesting modification, offering an alternative approach) to engage with the task in 4/5 opportunities across 2 settings.", cite: "deciryan2000" },
  { area: "Flexible Problem-Solving", goal: "When presented with an unexpected change, [student] will identify the change, generate an alternative plan, and implement it with minimal adult prompting in 3/4 opportunities.", cite: "kenworthy2014" },
  { area: "Collaborative Negotiation", goal: "[Student] will use a co-regulation strategy (e.g., co-pilot protocol, Plan B conversation) to negotiate task approach with an adult, resulting in task engagement in 3/4 opportunities.", cite: "greene2014" },
  { area: "Interoception / Self-Monitoring", goal: "[Student] will identify a body signal associated with escalation and independently initiate a pre-planned regulation strategy in 3/5 opportunities across 2 settings.", cite: "mahler2022" },
  { area: "Generalization", goal: "[Student] will apply a taught self-advocacy script in at least one authentic classroom interaction per week, documented by staff across a 4-week period.", cite: "cannon2011" },
];

const STAFF_SHIFTS = [
  { shift: "Commands → Observations",   ex: "Instead of 'Open your book,' try 'I notice everyone's finding their page.'" },
  { shift: "Questions → Wondering",     ex: "Instead of 'How are you?' try 'I noticed the morning was a bit hectic today.'" },
  { shift: "Praise → Acknowledgment",   ex: "Instead of 'Great job!' try 'That approach was interesting.' (Spotlight feels like demand.)" },
  { shift: "Consequence → Collaboration", ex: "Instead of 'If you don't ___, then ___' try 'I notice this isn't working. I wonder what would.'" },
  { shift: "Compliance → Negotiation",  ex: "This student has a Co-Pilot Card with phrases to use. Honor their attempts to negotiate." },
];

const STAFF_RESOURCES = [
  { name: "Declarative Language Handbook",  author: "Linda Murphy, MS, CCC-SLP",         note: "The single best shift staff can make.",                                           url: "https://declarativelanguage.com" },
  { name: "Lives in the Balance (free)",    author: "Ross Greene, PhD",                   note: "Free CPS 'Plan B' cheat sheets, videos, and trainings.",                         url: "https://livesinthebalance.org" },
  { name: "PDA Society",                    author: "UK charity / practice guidance",     note: "Free strategy handouts and webinars on PDA-profile autism.",                     url: "https://www.pdasociety.org.uk" },
  { name: "Unstuck & On Target!",            author: "Cannon, Kenworthy et al.",           note: "RCT-validated EF curriculum with scripts, visuals, and parent materials.",       url: "https://unstuckandontarget.com" },
  { name: "Kelly Mahler Interoception",     author: "Kelly Mahler, OTD",                  note: "Body-awareness curriculum with growing RCT evidence base.",                      url: "https://www.kelly-mahler.com" },
  { name: "Everyday Speech",                author: "Everyday Speech, LLC",               note: "Video modeling for social communication (subscription).",                       url: "https://everydayspeech.com" },
];

// ─────────── GLOBAL STYLE ───────────

const STYLE = `
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  transition: background 0.3s ease, color 0.3s ease;
  position: relative;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
[data-theme="dark"] {
  --rtn-tealFaint: #1e2748;
}
:root {
  --rtn-tealFaint: #e8eff7;
}
input, textarea, button, select { font-family: inherit; }
textarea:focus, input:focus { outline: none; }
:focus-visible { outline: 2px solid #4575b4 !important; outline-offset: 3px; border-radius: 2px; }
button { cursor: pointer; }
a { color: inherit; }
::selection { background: var(--rtn-tealFaint); color: inherit; }
@media print {
  body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: #fff !important; color: #000 !important; font-size: 11px !important; }
  body::before { display: none !important; }
  .rainbow-bar { display: none !important; }
  .no-print { display: none !important; }
  .print-break { page-break-before: always; }
  textarea { border: 1px solid #ccc !important; min-height: 40px !important; }
  button { display: none !important; }
  .section-card { page-break-inside: avoid; }
  .print-open { display: block !important; }
}
`;

// ─────────── SMALL COMPONENTS ───────────

const Tag = ({ text, color, t }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", fontSize: 10, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: color || t.textMuted, background: t.tagBg, border: `1px solid ${t.border}`, borderRadius: 20 }}>
    {text}
  </span>
);

const MonoLabel = ({ children, color, t }) => (
  <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: color || t.textDim, marginBottom: 8 }}>
    {children}
  </div>
);

function TextInput({ label, value, onChange, rows = 2, t }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <MonoLabel t={t}>{label}</MonoLabel>}
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
        style={{ width: "100%", padding: "10px 12px", border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 14, background: t.inputBg, color: t.text, resize: "vertical", lineHeight: 1.6 }} />
    </div>
  );
}

function SelectPills({ label, options, value, onChange, t, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <MonoLabel t={t} color={color}>{label}</MonoLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {options.map((opt) => {
          const sel = value === opt;
          return (
            <button key={opt} onClick={() => onChange(sel ? "" : opt)}
              style={{
                padding: "6px 12px", borderRadius: 20,
                border: `1px solid ${sel ? (color || t.accent) : t.border}`,
                background: sel ? (color ? `${color}20` : t.checkBg) : "transparent",
                color: sel ? (color || t.checkColor) : t.textMuted,
                fontSize: 12, fontWeight: sel ? 700 : 500, transition: "all 0.15s",
              }}>
              {sel && "✓ "}{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const ENERGY_ZONES = [
  { level: 1, label: "Sleepy / Still", seenAs: "sluggish", feelsLike: "energy is drained", fits: "beginning or end of day, hungry, sick", color: "#4575b4" },
  { level: 2, label: "Settled / Calm", seenAs: "relaxed", feelsLike: "slow, steady, pulsing energy", fits: "reading, listening to music", color: "#abd9e9" },
  { level: 3, label: "Focused / Purposeful", seenAs: "activity oriented and engaged", feelsLike: "directed flow of energy", fits: "hobby or preferred activity, class", color: "#7cca7c" },
  { level: 4, label: "Amped Up / Fidgety", seenAs: "hyper", feelsLike: "expanding energy", fits: "PE class, celebration", color: "#fdae61" },
  { level: 5, label: "Maxed Out / Frenzied", seenAs: "not available for learning", feelsLike: "bursting energy or shut down", fits: "upsetting event, recess", color: "#d73027" },
];

function EnergyMeter({ value, onChange, t, who = "student" }) {
  const selected = ENERGY_ZONES.find(z => z.level === value);
  return (
    <div style={{ marginBottom: 16 }}>
      <MonoLabel t={t}>My Energy — {who}</MonoLabel>
      <div style={{ display: "flex", gap: 0, borderRadius: 10, overflow: "hidden", border: `1px solid ${t.border}` }}>
        {ENERGY_ZONES.map((z) => {
          const sel = value === z.level;
          const textColor = sel ? (z.level >= 4 ? "#1a1a2a" : "#fff") : t.textDim;
          return (
            <button key={z.level} onClick={() => onChange(sel ? null : z.level)}
              style={{
                flex: 1, padding: "10px 4px 8px", border: "none", cursor: "pointer",
                background: sel ? z.color : "transparent",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                transition: "all 0.15s",
                borderRight: z.level < 5 ? `1px solid ${t.border}` : "none",
              }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: textColor, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{z.level}</span>
              <span style={{ fontSize: 8, fontWeight: 600, color: sel ? textColor : t.textMuted, fontFamily: "'DM Sans', system-ui, sans-serif", textTransform: "uppercase", letterSpacing: 0.2, lineHeight: 1.2, textAlign: "center" }}>{z.label}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <div style={{ marginTop: 8, padding: "10px 12px", background: `${selected.color}12`, borderLeft: `3px solid ${selected.color}`, borderRadius: "0 8px 8px 0", fontSize: 12, fontFamily: "'DM Sans', system-ui, sans-serif", lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, color: selected.color, marginBottom: 2 }}>{selected.label}</div>
          <div style={{ color: t.textSub }}>Often seen as: <em>{selected.seenAs}</em></div>
          <div style={{ color: t.textSub }}>Often feels like: <em>{selected.feelsLike}</em></div>
          <div style={{ color: t.textMuted, fontSize: 11 }}>Where it fits: <em>{selected.fits}</em></div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: t.textDim, fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: 0.3, textTransform: "uppercase", marginTop: 4 }}>
        <span>Low energy</span>
        <span>Regulated</span>
        <span>High energy</span>
      </div>
    </div>
  );
}

function SwapBox({ swaps, t, color }) {
  return (
    <div style={{ marginTop: 10, padding: 12, background: t.inputBg, borderLeft: `3px solid ${color}`, borderRadius: 8 }}>
      <MonoLabel t={t} color={color}>Declarative Language Swaps</MonoLabel>
      {swaps.map((s, i) => (
        <div key={i} style={{ marginBottom: i < swaps.length - 1 ? 8 : 0, fontSize: 13, lineHeight: 1.5 }}>
          <div style={{ color: "#d73027" }}><span style={{ fontWeight: 700 }}>✕ </span>{s.old}</div>
          <div style={{ color: "#2d7a2d" }}><span style={{ fontWeight: 700 }}>✓ </span>{s.new}</div>
        </div>
      ))}
    </div>
  );
}

function CiteList({ ids, t }) {
  const list = String(ids || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>
      {list.map((id) => {
        const r = REFERENCES.find((x) => x.id === id);
        const short = r ? r.full.split(".")[0].replace(/,.*$/, "") : id;
        return <span key={id} title={r?.full || id} style={{ fontSize: 10, fontFamily: "'DM Sans', system-ui, sans-serif", color: t.accent, background: `${t.accent}15`, padding: "2px 8px", borderRadius: 10, letterSpacing: 0.5 }}>{short}</span>;
      })}
    </div>
  );
}

// ─────────── ACTIVITY / SESSION ───────────

function ActivityCard({ act, sessionId, sessionColor, responses, setResponses, t }) {
  const [open, setOpen] = useState(false);
  const key = `s${sessionId}-${act.name}`;
  const typeLabels  = { opening: "Opening", core: "Core Activity", closing: "Closing" };
  const typeColors  = { opening: "#fdae61", core: sessionColor, closing: t.textMuted };

  return (
    <div className="section-card" style={{ background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} className="no-print"
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", border: "none", background: "transparent", textAlign: "left", color: t.text }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: typeColors[act.type], background: `${typeColors[act.type]}18`, padding: "2px 8px", borderRadius: 10 }}>{typeLabels[act.type]}</span>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: t.textDim }}>{act.time}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{act.name}</div>
        </div>
        <span style={{ fontSize: 16, color: t.textDim, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
      </button>

      <div className={open ? "" : "print-open"} style={{ display: open ? "block" : "none", padding: "0 14px 14px" }}>
        <p style={{ margin: "6px 0 10px", fontSize: 13.5, color: t.textSub, lineHeight: 1.65 }}>{act.desc}</p>
        {act.swaps && <SwapBox swaps={act.swaps} t={t} color={sessionColor} />}
        {act.selectOptions && (
          <div style={{ marginTop: 12 }}>
            <SelectPills label={act.selectOptions.label} options={act.selectOptions.options}
              value={responses[key + "-select"] || ""} onChange={(v) => setResponses((p) => ({ ...p, [key + "-select"]: v }))} t={t} color={sessionColor} />
          </div>
        )}
        {act.prompt && (
          <div style={{ marginTop: 4 }}>
            <TextInput label={act.prompt} value={responses[key + "-notes"] || ""}
              onChange={(v) => setResponses((p) => ({ ...p, [key + "-notes"]: v }))} rows={3} t={t} />
          </div>
        )}
      </div>
    </div>
  );
}

function SessionSection({ session, responses, setResponses, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="section-card" style={{ background: t.card, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, borderLeft: `3px solid ${session.color}`, borderRadius: 14, marginBottom: 18, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} className="no-print"
        style={{ width: "100%", border: "none", background: "transparent", padding: "18px 20px", textAlign: "left", color: t.text }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 22 }}>{session.icon}</span>
          <Tag text={`Session ${session.id} · ${session.duration}`} color={session.color} t={t} />
        </div>
        <h2 style={{ margin: "0 0 4px", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{session.title}</h2>
        <p style={{ margin: "0 0 10px", fontSize: 14, color: t.textMuted, fontStyle: "italic" }}>{session.subtitle}</p>
        <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.55 }}>
          <span style={{ color: session.color, fontWeight: 700 }}>Target: </span>{session.targetSkill}
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 20px 18px" }}>
          <div style={{ background: `${session.color}10`, border: `1px solid ${session.color}30`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
            <MonoLabel t={t} color={session.color}>Evidence base</MonoLabel>
            <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>{session.evidence}</div>
            <CiteList ids={session.cite?.join(",")} t={t} />
            <div style={{ marginTop: 12 }}>
              <MonoLabel t={t} color={session.color}>Everyday Speech videos</MonoLabel>
              {session.evVideos.map((v, i) => <div key={i} style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>▸ {v}</div>)}
            </div>
            <div style={{ marginTop: 12 }}>
              <MonoLabel t={t} color={session.color}>Unstuck &amp; On Target alignment</MonoLabel>
              <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>{session.unstuckLink}</div>
            </div>
          </div>

          <TextInput label="Pre-session notes / student mood / context" value={responses[`s${session.id}-pre`] || ""}
            onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-pre`]: v }))} t={t} />

          {session.activities.map((act, i) => (
            <ActivityCard key={i} act={act} sessionId={session.id} sessionColor={session.color} responses={responses} setResponses={setResponses} t={t} />
          ))}

          <div style={{ background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 14, marginTop: 10 }}>
            <TextInput label="Session summary / key observations" value={responses[`s${session.id}-summary`] || ""}
              onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-summary`]: v }))} rows={3} t={t} />
            <SelectPills label="Overall session engagement"
              options={["Highly engaged throughout", "Engaged with warm-up needed", "Partial engagement", "Resistant — adjusted approach", "Session modified significantly"]}
              value={responses[`s${session.id}-engagement`] || ""} onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-engagement`]: v }))} t={t} color={session.color} />
            <TextInput label="Plan for next session / adjustments needed" value={responses[`s${session.id}-next`] || ""}
              onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-next`]: v }))} rows={2} t={t} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────── THEME TOGGLE ───────────

function ThemeToggle({ dark, toggle, t }) {
  return (
    <button onClick={toggle} className="no-print" aria-label="Toggle theme"
      style={{ background: t.btnBg, border: `1.5px solid ${t.border}`, borderRadius: 6, padding: "6px 12px", color: t.textMuted, fontSize: 12, fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: 0.5 }}>
      {dark ? "Light" : "Dark"}
    </button>
  );
}

// ─────────── ABOUT MODAL ───────────

function AboutModal({ onClose, t }) {
  const h3 = { fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: t.text, margin: "22px 0 8px", display: "flex", alignItems: "center", gap: 8 };
  const p  = { fontSize: 14, color: t.textSub, lineHeight: 1.65, marginBottom: 10 };
  const li = { fontSize: 14, color: t.textSub, lineHeight: 1.65, marginBottom: 4 };
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-labelledby="about-title"
      style={{ position: "fixed", inset: 0, background: "rgba(10,10,15,0.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, overflowY: "auto" }}
      className="no-print">
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, maxWidth: 640, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "22px 26px 14px", borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: t.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📖</div>
            <div>
              <h2 id="about-title" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.2, margin: 0 }}>About the Autonomy-First Toolkit</h2>
              <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: t.textMuted, letterSpacing: 1, marginTop: 2 }}>RTN | Speech, Language &amp; Literacy</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", color: t.textMuted, fontSize: 26, lineHeight: 1, padding: 4 }}>×</button>
        </div>

        <div style={{ padding: "6px 26px 24px" }}>
          <h3 style={h3}><span>✨</span>About this resource</h3>
          <p style={p}>The Autonomy-First Toolkit is a free, open-source planning tool for clinicians and educators working with students who present a Pathological Demand Avoidance (PDA) / Pervasive Drive for Autonomy profile. It reframes demand avoidance as a <em>nervous-system response to perceived loss of autonomy</em> — not willful defiance — and offers six structured sessions, a modular activity bank, declarative-language scripts, and a staff guide.</p>
          <p style={p}>The tool runs entirely in your browser. No account, login, or internet connection is required after the initial load. No data is sent to any server, stored in any database, or shared with any third party. Session data exists only in browser memory during use unless you choose to export or print it.</p>

          <h3 style={h3}><span>🔬</span>Evidence base</h3>
          <p style={p}>Sessions synthesize converging frameworks from research and clinical practice:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 10 }}>
            <li style={li}>PDA-profile autism — Newson (2003); O'Nions et al. (2014, 2018); Eaton (2018); PDA Society practice guidance</li>
            <li style={li}>Declarative Language — Murphy (2020)</li>
            <li style={li}>Collaborative &amp; Proactive Solutions / Plan B — Greene (2014, 2021)</li>
            <li style={li}>Unstuck &amp; On Target — Cannon et al. (2011); Kenworthy et al. (2014) RCT</li>
            <li style={li}>Interoception — Mahler (2019); Mahler et al. (2022, 2024)</li>
            <li style={li}>Polyvagal Theory &amp; Window of Tolerance — Porges (2011); Siegel (2012)</li>
            <li style={li}>Double Empathy &amp; neurodiversity-affirming practice — Milton (2012); Chapman &amp; Botha (2023)</li>
            <li style={li}>Self-Determination Theory — Deci &amp; Ryan (2000)</li>
          </ul>

          <h3 style={h3}><span>⚖️</span>Disclaimer</h3>
          <p style={p}>This tool supports reflective planning by qualified professionals. It is not a diagnostic instrument and is not a substitute for clinical judgment, formal assessment, or individualized treatment planning. PDA is not a standalone diagnosis in DSM-5-TR or ICD-11; it is described here as a clinical profile that often co-occurs with autism. Users are responsible for ensuring their practice complies with professional standards, scope of practice, and institutional policies.</p>
          <p style={p}>The Autonomy-First Toolkit is an independent project and is not affiliated with or endorsed by Everyday Speech, Brookes Publishing, Lives in the Balance, the PDA Society, or Kelly Mahler. All program names and trademarks belong to their respective owners.</p>

          <h3 style={h3}><span>📎</span>Citation</h3>
          <div style={{ fontSize: 13, color: t.textSub, fontStyle: "italic", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 14px", lineHeight: 1.6 }}>
            Norton, R. T. (2026). The Autonomy-First Toolkit: PDA-profile intervention planning [Web application]. RTN | Speech, Language &amp; Literacy.
          </div>

          <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: t.textDim, letterSpacing: 0.5, marginTop: 18, textAlign: "center" }}>Code licensed under MIT. Educational content licensed under CC BY-NC 4.0.</div>
          <div aria-hidden="true" style={{ height: 3, borderRadius: 3, background: t.rainbow, marginTop: 14 }} />
        </div>
      </div>
    </div>
  );
}

// ─────────── MAIN APP ───────────

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('rtn-theme') === 'dark'; } catch (e) { return false; }
  });
  const [tab, setTab]                 = useState("profile");
  const [showAbout, setShowAbout]     = useState(false);
  const [responses, setResponses]     = useState({});
  const [profile, setProfile]         = useState({ name: "", age: "", grade: "", interests: "", strengths: "", triggers: "", currentGoals: "", staffNotes: "" });
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [activeActivityIdx, setActiveActivityIdx] = useState(-1); // -1 = session overview/pre-notes

  const t = dark ? T.dark : T.light;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('rtn-theme', dark ? 'dark' : 'light'); } catch (e) {}
  }, [dark, t.bg, t.text]);
  useEffect(() => { const el = document.createElement("style"); el.textContent = STYLE; document.head.appendChild(el); return () => el.remove(); }, []);
  useEffect(() => {
    if (!showAbout) return;
    const onKey = (e) => { if (e.key === "Escape") setShowAbout(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showAbout]);

  const handlePrint = () => window.print();
  const handleExport = () => {
    const data = {
      toolkit: "RTN Autonomy-First Toolkit",
      date: new Date().toISOString().split("T")[0],
      profile,
      responses,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `autonomy-first-toolkit-${data.date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { key: "profile",  label: "Profile" },
    { key: "sessions", label: "Sessions" },
    { key: "bank",     label: "Activity Bank" },
    { key: "ref",      label: "Quick Ref" },
    { key: "staff",    label: "Staff Guide" },
    { key: "refs",     label: "References" },
  ];

  const totalResponses = useMemo(() => Object.values(responses).filter((v) => String(v).trim()).length, [responses]);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 60px" }}>
      {/* Rainbow accent */}
      <div aria-hidden="true" style={{ height: 4, borderRadius: 3, background: t.rainbow, marginBottom: 20 }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: t.textDim, marginBottom: 4 }}>PDA-Profile Practice</div>
          <h1 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 34, fontWeight: 700, color: t.text, letterSpacing: -0.5, margin: "0 0 6px", lineHeight: 1.1 }}>The Autonomy-First Toolkit</h1>
          <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: t.textMuted, letterSpacing: 1 }}>Declarative Language · CPS Plan B · Unstuck &amp; On Target · Interoception · Polyvagal</div>
        </div>
        <ThemeToggle dark={dark} toggle={() => setDark((d) => !d)} t={t} />
      </div>

      {/* Toolbar */}
      <div className="no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
        <button onClick={handlePrint} style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.card, color: t.textMuted, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          Print This Tab
        </button>
        <button onClick={handleExport} style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.card, color: t.textMuted, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          Export JSON
        </button>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: t.textDim, fontWeight: 500 }}>{totalResponses} response{totalResponses === 1 ? "" : "s"} captured</span>
      </div>

      {/* Tabs */}
      <div className="no-print" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {tabs.map((tb) => (
          <button key={tb.key} onClick={() => setTab(tb.key)} style={{
            padding: "8px 16px", borderRadius: 6,
            border: `1.5px solid ${tab === tb.key ? t.accent : t.border}`,
            background: tab === tb.key ? t.accent : "transparent",
            color: tab === tb.key ? "#fff" : t.textMuted,
            fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          }}>{tb.label}</button>
        ))}
      </div>

      {/* ===== PROFILE TAB ===== */}
      {tab === "profile" && (
        <div>
          <div style={{ background: `${t.accent}10`, border: `1px solid ${t.accent}30`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <MonoLabel t={t} color={t.accent}>About this tool</MonoLabel>
            <div style={{ fontSize: 13.5, color: t.textSub, lineHeight: 1.65 }}>
              Fill in the student profile below — ideally using initials or a code rather than a full name. All data stays in your browser. Use <strong>Export JSON</strong> or <strong>Print / Save PDF</strong> to capture a snapshot at any time. The profile informs activity customization throughout the toolkit.
            </div>
          </div>

          {/* Student Profile */}
          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20, marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 20, margin: "0 0 16px", color: t.text }}>Student Profile</h3>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
              <TextInput label="Name / Initials / Code" value={profile.name} onChange={(v) => setProfile((p) => ({ ...p, name: v }))} rows={1} t={t} />
              <TextInput label="Age" value={profile.age} onChange={(v) => setProfile((p) => ({ ...p, age: v }))} rows={1} t={t} />
              <TextInput label="Grade" value={profile.grade} onChange={(v) => setProfile((p) => ({ ...p, grade: v }))} rows={1} t={t} />
            </div>
            <TextInput label="Interests / expert topics (for activity customization)" value={profile.interests} onChange={(v) => setProfile((p) => ({ ...p, interests: v }))} rows={2} t={t} />
            <TextInput label="Strengths (reading, cognitive, social, creative, mechanical)"  value={profile.strengths} onChange={(v) => setProfile((p) => ({ ...p, strengths: v }))} rows={2} t={t} />
            <TextInput label="Known triggers / demand sensitivities" value={profile.triggers} onChange={(v) => setProfile((p) => ({ ...p, triggers: v }))} rows={2} t={t} />
            <TextInput label="Current IEP goals related to this work" value={profile.currentGoals} onChange={(v) => setProfile((p) => ({ ...p, currentGoals: v }))} rows={2} t={t} />
            <TextInput label="Staff / team notes (who's on board, who needs training)" value={profile.staffNotes} onChange={(v) => setProfile((p) => ({ ...p, staffNotes: v }))} rows={2} t={t} />
          </div>

          {/* Core Principles */}
          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20, marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 20, margin: "0 0 6px", color: t.text }}>Core Principles</h3>
            <div style={{ fontSize: 12.5, color: t.textMuted, marginBottom: 14, fontStyle: "italic" }}>Review before each session.</div>
            {CORE_PRINCIPLES.map((p, i) => (
              <div key={i} style={{ padding: "12px 14px", marginBottom: 8, background: t.inputBg, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, borderLeft: `3px solid ${t.accent}`, borderRadius: 10 }}>
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 15, fontWeight: 700, color: t.accent, marginBottom: 2 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>{p.desc}</div>
                <CiteList ids={p.cite} t={t} />
              </div>
            ))}
          </div>

          {/* Sample IEP Goals */}
          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 20, margin: "0 0 14px", color: t.text }}>Sample IEP Goal Language</h3>
            {IEP_GOALS.map((g, i) => (
              <div key={i} style={{ padding: "12px 14px", marginBottom: 8, background: t.inputBg, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, borderLeft: `3px solid ${t.accent}`, borderRadius: 10 }}>
                <MonoLabel t={t} color={t.accent}>{g.area}</MonoLabel>
                <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.65 }}>{g.goal}</div>
                <CiteList ids={g.cite} t={t} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== SESSIONS TAB — SPLIT LAYOUT ===== */}
      {tab === "sessions" && (() => {
        const session = SESSIONS.find(s => s.id === activeSessionId) || SESSIONS[0];
        const act = activeActivityIdx >= 0 ? session.activities[activeActivityIdx] : null;
        const typeLabels = { opening: "Opening", core: "Core Activity", closing: "Closing" };
        const hasNotes = (key) => String(responses[key] || "").trim().length > 0;
        const actKey = (si, ai) => `s${si}-${session.activities[ai]?.name}`;

        return (
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, minHeight: 600 }}>
            {/* LEFT PANEL — Session & Activity Nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Session selector */}
              <div style={{ marginBottom: 12 }}>
                <MonoLabel t={t}>Session</MonoLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {SESSIONS.map(s => {
                    const isActive = s.id === activeSessionId;
                    const sessionHasData = s.activities.some((a, i) =>
                      hasNotes(`s${s.id}-${a.name}-notes`) || hasNotes(`s${s.id}-${a.name}-select`)
                    ) || hasNotes(`s${s.id}-pre`) || hasNotes(`s${s.id}-summary`);
                    return (
                      <button key={s.id} onClick={() => { setActiveSessionId(s.id); setActiveActivityIdx(-1); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                          borderRadius: 8, border: `1.5px solid ${isActive ? s.color : t.border}`,
                          background: isActive ? `${s.color}12` : "transparent",
                          color: isActive ? t.text : t.textMuted, fontSize: 13, fontWeight: isActive ? 700 : 500,
                          fontFamily: "'DM Sans', system-ui, sans-serif", textAlign: "left", cursor: "pointer",
                        }}>
                        <span style={{ fontSize: 16 }}>{s.icon}</span>
                        <span style={{ flex: 1 }}>{s.title}</span>
                        {sessionHasData && <span style={{ width: 6, height: 6, borderRadius: 3, background: s.color, flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Activity list for active session */}
              <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>
                <MonoLabel t={t} color={session.color}>Activities</MonoLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Overview / Pre-notes */}
                  <button onClick={() => setActiveActivityIdx(-1)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
                      borderRadius: 6, border: activeActivityIdx === -1 ? `1.5px solid ${session.color}` : `1px solid transparent`,
                      background: activeActivityIdx === -1 ? `${session.color}12` : "transparent",
                      color: activeActivityIdx === -1 ? t.text : t.textMuted, fontSize: 12, fontWeight: activeActivityIdx === -1 ? 700 : 500,
                      fontFamily: "'DM Sans', system-ui, sans-serif", textAlign: "left", cursor: "pointer",
                    }}>
                    <span style={{ width: 18, height: 18, borderRadius: 4, background: `${session.color}20`, color: session.color, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>i</span>
                    <span>Overview & Evidence</span>
                  </button>

                  {session.activities.map((a, i) => {
                    const isAct = activeActivityIdx === i;
                    const actHasData = hasNotes(`${actKey(session.id, i)}-notes`) || hasNotes(`${actKey(session.id, i)}-select`);
                    return (
                      <button key={i} onClick={() => setActiveActivityIdx(i)}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
                          borderRadius: 6, border: isAct ? `1.5px solid ${session.color}` : `1px solid transparent`,
                          background: isAct ? `${session.color}12` : "transparent",
                          color: isAct ? t.text : t.textMuted, fontSize: 12, fontWeight: isAct ? 700 : 500,
                          fontFamily: "'DM Sans', system-ui, sans-serif", textAlign: "left", cursor: "pointer", lineHeight: 1.3,
                        }}>
                        <span style={{ width: 18, height: 18, borderRadius: 4, background: actHasData ? `${session.color}25` : t.tagBg, color: actHasData ? session.color : t.textDim, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {actHasData ? "✓" : i + 1}
                        </span>
                        <span style={{ flex: 1 }}>{a.name}</span>
                        <span style={{ fontSize: 10, color: t.textDim }}>{a.time}</span>
                      </button>
                    );
                  })}

                  {/* Session wrap-up */}
                  <button onClick={() => setActiveActivityIdx(session.activities.length)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
                      borderRadius: 6, border: activeActivityIdx === session.activities.length ? `1.5px solid ${session.color}` : `1px solid transparent`,
                      background: activeActivityIdx === session.activities.length ? `${session.color}12` : "transparent",
                      color: activeActivityIdx === session.activities.length ? t.text : t.textMuted, fontSize: 12, fontWeight: activeActivityIdx === session.activities.length ? 700 : 500,
                      fontFamily: "'DM Sans', system-ui, sans-serif", textAlign: "left", cursor: "pointer",
                    }}>
                    <span style={{ width: 18, height: 18, borderRadius: 4, background: `${session.color}20`, color: session.color, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✎</span>
                    <span>Session Wrap-Up</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — Active Content */}
            <div style={{ background: t.card, border: `1.5px solid ${t.border}`, borderRadius: 12, padding: "24px 28px", minHeight: 400 }}>
              {/* Session header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: `2px solid ${session.color}` }}>
                <span style={{ fontSize: 26 }}>{session.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: session.color, fontFamily: "'DM Sans', system-ui, sans-serif" }}>Session {session.id}</div>
                  <h2 style={{ margin: 0, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{session.title}</h2>
                </div>
              </div>

              {/* Overview panel */}
              {activeActivityIdx === -1 && (
                <div>
                  <p style={{ fontSize: 14, color: t.textMuted, fontStyle: "italic", marginBottom: 16 }}>{session.subtitle}</p>
                  <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.55, marginBottom: 16 }}>
                    <span style={{ color: session.color, fontWeight: 700 }}>Target: </span>{session.targetSkill}
                  </div>
                  <div style={{ background: `${session.color}08`, border: `1px solid ${session.color}25`, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                    <MonoLabel t={t} color={session.color}>Evidence base</MonoLabel>
                    <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>{session.evidence}</div>
                    <CiteList ids={session.cite?.join(",")} t={t} />
                    <div style={{ marginTop: 12 }}>
                      <MonoLabel t={t} color={session.color}>Unstuck &amp; On Target alignment</MonoLabel>
                      <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>{session.unstuckLink}</div>
                    </div>
                  </div>
                  <TextInput label="Pre-session notes / student mood / context" value={responses[`s${session.id}-pre`] || ""}
                    onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-pre`]: v }))} t={t} />
                  <div style={{ marginTop: 16 }}>
                    <button onClick={() => setActiveActivityIdx(0)}
                      style={{ padding: "10px 20px", borderRadius: 6, border: "none", background: session.color, color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      Start Session →
                    </button>
                  </div>
                </div>
              )}

              {/* Activity panel */}
              {act && (
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: session.color, background: `${session.color}15`, padding: "3px 10px", borderRadius: 4, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{typeLabels[act.type]}</span>
                    <span style={{ fontSize: 12, color: t.textDim, fontFamily: "'DM Sans', system-ui, sans-serif" }}>{act.time}</span>
                  </div>
                  <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: t.text, margin: "0 0 10px" }}>{act.name}</h3>
                  <p style={{ margin: "0 0 16px", fontSize: 14, color: t.textSub, lineHeight: 1.7 }}>{act.desc}</p>

                  {act.swaps && <SwapBox swaps={act.swaps} t={t} color={session.color} />}

                  {act.useEnergyMeter && (
                    <div style={{ marginTop: 16 }}>
                      <EnergyMeter who="clinician" value={responses[`${actKey(session.id, activeActivityIdx)}-energy-clinician`] || null}
                        onChange={(v) => setResponses((p) => ({ ...p, [`${actKey(session.id, activeActivityIdx)}-energy-clinician`]: v }))} t={t} />
                      <EnergyMeter who="student" value={responses[`${actKey(session.id, activeActivityIdx)}-energy-student`] || null}
                        onChange={(v) => setResponses((p) => ({ ...p, [`${actKey(session.id, activeActivityIdx)}-energy-student`]: v }))} t={t} />
                    </div>
                  )}

                  {act.selectOptions && (
                    <div style={{ marginTop: 16 }}>
                      <SelectPills label={act.selectOptions.label} options={act.selectOptions.options}
                        value={responses[`${actKey(session.id, activeActivityIdx)}-select`] || ""} onChange={(v) => setResponses((p) => ({ ...p, [`${actKey(session.id, activeActivityIdx)}-select`]: v }))} t={t} color={session.color} />
                    </div>
                  )}

                  {act.prompt && (
                    <div style={{ marginTop: 12 }}>
                      <TextInput label={act.prompt} value={responses[`${actKey(session.id, activeActivityIdx)}-notes`] || ""}
                        onChange={(v) => setResponses((p) => ({ ...p, [`${actKey(session.id, activeActivityIdx)}-notes`]: v }))} rows={3} t={t} />
                    </div>
                  )}

                  {/* Navigation */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${t.border}` }}>
                    <button onClick={() => setActiveActivityIdx(activeActivityIdx - 1)}
                      style={{ padding: "8px 16px", borderRadius: 6, border: `1.5px solid ${t.border}`, background: "transparent", color: t.textMuted, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer" }}>
                      ← {activeActivityIdx === 0 ? "Overview" : session.activities[activeActivityIdx - 1]?.name}
                    </button>
                    <button onClick={() => setActiveActivityIdx(activeActivityIdx + 1)}
                      style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: session.color, color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer" }}>
                      {activeActivityIdx < session.activities.length - 1 ? session.activities[activeActivityIdx + 1]?.name : "Wrap-Up"} →
                    </button>
                  </div>
                </div>
              )}

              {/* Wrap-up panel */}
              {activeActivityIdx === session.activities.length && (
                <div>
                  <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: t.text, margin: "0 0 16px" }}>Session Wrap-Up</h3>
                  <TextInput label="Session summary / key observations" value={responses[`s${session.id}-summary`] || ""}
                    onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-summary`]: v }))} rows={4} t={t} />
                  <SelectPills label="Overall session engagement"
                    options={["Highly engaged throughout", "Engaged with warm-up needed", "Partial engagement", "Resistant — adjusted approach", "Session modified significantly"]}
                    value={responses[`s${session.id}-engagement`] || ""} onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-engagement`]: v }))} t={t} color={session.color} />
                  <TextInput label="Plan for next session / adjustments needed" value={responses[`s${session.id}-next`] || ""}
                    onChange={(v) => setResponses((p) => ({ ...p, [`s${session.id}-next`]: v }))} rows={3} t={t} />

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${t.border}` }}>
                    <button onClick={() => setActiveActivityIdx(session.activities.length - 1)}
                      style={{ padding: "8px 16px", borderRadius: 6, border: `1.5px solid ${t.border}`, background: "transparent", color: t.textMuted, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer" }}>
                      ← {session.activities[session.activities.length - 1]?.name}
                    </button>
                    {session.id < 6 && (
                      <button onClick={() => { setActiveSessionId(session.id + 1); setActiveActivityIdx(-1); }}
                        style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: t.accent, color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer" }}>
                        Next Session →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ===== ACTIVITY BANK ===== */}
      {tab === "bank" && (
        <div>
          <div style={{ background: `${t.accent}10`, border: `1px solid ${t.accent}30`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>
            Quick-grab activities for any session. Mix and match based on what the student needs that day. Each can stand alone or supplement a full session.
          </div>
          {QUICK_ACTIVITIES.map((a, i) => (
            <div key={i} className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 16, fontWeight: 700, color: t.text }}>{a.name}</div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  <Tag text={a.skill} color={t.accent} t={t} />
                  <Tag text={a.time} t={t} />
                </div>
              </div>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>{a.desc}</p>
              <TextInput label="Notes / student response" value={responses[`bank-${i}`] || ""} onChange={(v) => setResponses((p) => ({ ...p, [`bank-${i}`]: v }))} rows={2} t={t} />
              <SelectPills label="How did it land?" options={["Great engagement", "Moderate interest", "Adapted on the fly", "Save for later"]}
                value={responses[`bank-${i}-rating`] || ""} onChange={(v) => setResponses((p) => ({ ...p, [`bank-${i}-rating`]: v }))} t={t} color={t.accent} />
            </div>
          ))}
        </div>
      )}

      {/* ===== QUICK REF ===== */}
      {tab === "ref" && (
        <div>
          <div style={{ background: `${t.accent}10`, border: `1px solid ${t.accent}30`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>
            Print this page as a standalone cheat sheet for yourself or to share with classroom staff. Adapted from Murphy's <em>Declarative Language Handbook</em>.
          </div>

          <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 22, margin: "0 0 12px", color: t.text }}>Imperative → Declarative Swaps</h3>
          {DECLARATIVE_REF.map((item, i) => (
            <div key={i} className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
              <MonoLabel t={t}>{item.cat}</MonoLabel>
              <div style={{ fontSize: 13, color: "#d73027", textDecoration: "line-through", opacity: 0.7, marginBottom: 4 }}>✕ {item.old}</div>
              <div style={{ fontSize: 14, color: "#2d7a2d", fontWeight: 500, lineHeight: 1.6 }}>✓ {item.new}</div>
            </div>
          ))}

          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20, marginTop: 20 }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, margin: "0 0 12px", color: t.accent }}>PDA-Profile Pro Tips</h3>
            {PRO_TIPS.map((tip, i) => (
              <div key={i} style={{ padding: "8px 12px", marginBottom: 4, borderLeft: `2px solid ${t.accent}`, fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>
                {tip.text}
                <CiteList ids={tip.cite} t={t} />
              </div>
            ))}
          </div>

          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20, marginTop: 16 }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, margin: "0 0 10px", color: t.text }}>Your own declarative-language notes</h3>
            <TextInput label="Swaps that worked well with this student" value={responses["ref-worked"] || ""} onChange={(v) => setResponses((p) => ({ ...p, "ref-worked": v }))} rows={3} t={t} />
            <TextInput label="Phrases to avoid with this student"       value={responses["ref-avoid"]  || ""} onChange={(v) => setResponses((p) => ({ ...p, "ref-avoid":  v }))} rows={3} t={t} />
          </div>
        </div>
      )}

      {/* ===== STAFF GUIDE ===== */}
      {tab === "staff" && (
        <div>
          <div style={{ background: `${t.accent}10`, border: `1px solid ${t.accent}30`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>
            Print this tab as a one-pager for classroom staff, paraprofessionals, and specials teachers. Customize the student-specific fields below.
          </div>

          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20, marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 20, margin: "0 0 4px", color: t.text }}>Staff Quick Guide</h3>
            <p style={{ fontSize: 12.5, color: t.textMuted, margin: "0 0 14px", fontStyle: "italic" }}>Customize and print for each team member.</p>

            <TextInput label="Student (initials or code)" value={responses["staff-name"] || profile.name} onChange={(v) => setResponses((p) => ({ ...p, "staff-name": v }))} rows={1} t={t} />

            <div style={{ background: t.inputBg, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, borderLeft: `3px solid ${t.accent}`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <MonoLabel t={t} color={t.accent}>What you need to know</MonoLabel>
              <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.7 }}>
                This student presents features of a <strong>Pathological Demand Avoidance / Pervasive Drive for Autonomy profile</strong> — a nervous system that perceives everyday demands (even kind ones) as threats. This is <em>not</em> willful defiance. The brain's threat-detection system is overactive, and demands (questions, instructions, transitions, even praise) can trigger a fight / flight / freeze response. Support looks like collaboration, declarative language, and preserving the student's sense of agency.
              </div>
            </div>

            <div style={{ background: t.inputBg, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, borderLeft: `3px solid #7cca7c`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <MonoLabel t={t} color="#7cca7c">This student's strengths</MonoLabel>
              <TextInput label="" value={responses["staff-strengths"] || profile.strengths} onChange={(v) => setResponses((p) => ({ ...p, "staff-strengths": v }))} rows={2} t={t} />
            </div>

            <div style={{ background: t.inputBg, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, borderLeft: `3px solid #fdae61`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
              <MonoLabel t={t} color="#fdae61">Known triggers</MonoLabel>
              <TextInput label="" value={responses["staff-triggers"] || profile.triggers} onChange={(v) => setResponses((p) => ({ ...p, "staff-triggers": v }))} rows={2} t={t} />
            </div>

            <h4 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 17, margin: "0 0 10px", color: t.text }}>The 5 shifts that help most</h4>
            {STAFF_SHIFTS.map((s, i) => (
              <div key={i} style={{ padding: "10px 12px", marginBottom: 6, background: t.inputBg, borderTop: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, borderLeft: `3px solid ${t.accent}`, borderRadius: 8 }}>
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, fontWeight: 700, color: t.accent }}>{s.shift}</div>
                <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.55 }}>{s.ex}</div>
              </div>
            ))}

            <div style={{ background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 14, marginTop: 14 }}>
              <TextInput label="Student's active tools (Co-Pilot Card, Break Prescription, GWPDC card, etc.)" value={responses["staff-tools"] || ""} onChange={(v) => setResponses((p) => ({ ...p, "staff-tools": v }))} rows={2} t={t} />
              <TextInput label="Additional notes for this staff member"                                          value={responses["staff-additional"] || ""} onChange={(v) => setResponses((p) => ({ ...p, "staff-additional": v }))} rows={3} t={t} />
            </div>
          </div>

          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 18, margin: "0 0 12px", color: t.text }}>Key Resources for Staff</h3>
            {STAFF_RESOURCES.map((r, i) => (
              <div key={i} style={{ padding: "10px 12px", marginBottom: 6, background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 13, color: t.textSub, lineHeight: 1.55 }}>
                <strong style={{ color: t.text }}>{r.name}</strong> ({r.author}) — {r.note} {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: t.accent }}>{r.url.replace(/^https?:\/\//, "")}</a>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== REFERENCES ===== */}
      {tab === "refs" && (
        <div>
          <div style={{ background: `${t.accent}10`, border: `1px solid ${t.accent}30`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: t.textSub, lineHeight: 1.6 }}>
            Peer-reviewed and practice-based sources behind the toolkit. Tap a citation tag in any session to connect it back here.
          </div>
          <div className="section-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 22 }}>
            {REFERENCES.map((r) => (
              <div key={r.id} style={{ fontSize: 12.5, color: t.textSub, lineHeight: 1.7, marginBottom: 8, paddingLeft: 20, textIndent: -20 }}>
                {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: t.accent, textDecoration: "none" }}>{r.full}</a> : r.full}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: 48, paddingTop: 20, borderTop: `1px solid ${t.border}`, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: t.textDim, letterSpacing: 0.5, lineHeight: 1.8 }}>
        <button onClick={() => setShowAbout(true)} className="no-print" aria-label="About this resource"
          style={{ background: "transparent", border: `1.5px solid ${t.border}`, borderRadius: 6, padding: "6px 16px", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: t.textMuted, letterSpacing: 0.5, marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
          About this resource
        </button>
        <p>Rachel Terra Norton, MS, CCC-SLP</p>
        <p>RTN | Speech, Language &amp; Literacy &middot; rachelslp.org</p>
      </footer>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} t={t} />}
    </div>
  );
}
