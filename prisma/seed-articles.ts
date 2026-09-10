import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

type Seed = {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  body: string;
  daysAgo: number;
};

const RESUMES = "Resumes & Applying";
const MISSION = "Mission Fit";
const MATCH = "The Perfect Match";
const MEANING = "Meaning at Work";
const EMPLOYERS = "For Employers";

const articles: Seed[] = [
  // ---------- Resumes & Applying ----------
  {
    slug: "resume-read-in-six-seconds",
    title: "How to Write a Resume That Gets Read in Six Seconds",
    category: RESUMES,
    image: "/blog/resume-desk.jpg",
    daysAgo: 3,
    excerpt: "Recruiters skim before they read. Win the skim and you earn the read.",
    body: `Studies keep landing on the same uncomfortable number: a first-pass resume review lasts about six seconds. That's not cynicism — it's volume. The good news is that six seconds is winnable.

Put your name, your target role, and your strongest credential in the top third. If a hiring manager only sees that band, they should still know exactly who you are and why you're relevant.

• One page unless you have 15+ years
• Bold job titles, not employer names — titles carry the signal
• Three bullets per role, each starting with a verb and ending with a result
• White space is a feature, not wasted space

Win the skim, and the six seconds becomes six minutes. That's when the interview happens.`,
  },
  {
    slug: "perfect-resume-structure-catholic-school-teachers",
    title: "The Perfect Resume Structure for Catholic School Teachers",
    category: RESUMES,
    image: "/blog/teacher-class.jpg",
    daysAgo: 9,
    excerpt: "Certification, classroom results, and faith formation — in the order principals actually look for them.",
    body: `Principals reading teacher resumes look for three things fast: can you manage a classroom, do you know your subject, and will you strengthen the school's Catholic identity. Structure your resume in exactly that order of proof.

Open with a two-line summary naming your grade band, subject, and years in Catholic education. Follow with certifications — state license, catechist certification, safe-environment training — because they're pass/fail filters.

Then your classroom record: enrollment retained, scores improved, programs built. Finish with faith life relevant to the role: sacramental prep, retreat leadership, liturgical ministry.

A principal should finish your first page thinking, "This person could start Monday." Everything else is conversation.`,
  },
  {
    slug: "five-resume-mistakes-faithful-candidates",
    title: "Five Resume Mistakes That Keep Faithful Candidates Invisible",
    category: RESUMES,
    image: "/blog/laptop-writing.jpg",
    daysAgo: 15,
    excerpt: "Humility is a virtue. Vagueness is not.",
    body: `Candidates from ministry and mission-driven backgrounds tend to make the same five mistakes — usually out of humility. But a resume isn't boasting; it's stewardship of the gifts you've been given.

• Vague verbs: "helped with" and "was involved in" hide your actual contribution
• No numbers: "grew the youth group" says less than "grew weekly attendance from 20 to 65"
• Duty lists instead of outcomes: what changed because you were there?
• Burying credentials: certifications belong near the top, not the footer
• One resume for every job: two hours of tailoring beats twenty generic applications

Name what you did plainly and let the results speak. That's not pride — that's clarity.`,
  },
  {
    slug: "youth-group-resume-bullet",
    title: 'How to Turn "I Ran the Youth Group" Into a Resume Bullet That Sells',
    category: RESUMES,
    image: "/blog/notebook-pen.jpg",
    daysAgo: 21,
    excerpt: "Ministry experience is management experience — if you write it that way.",
    body: `"Ran the parish youth group" is the most undersold line in Catholic resumes. Look at what it actually contains: recruiting, budgeting, event production, volunteer management, safeguarding compliance, and weekly public speaking.

Translate the ministry into its professional components. "Directed a weekly program for 45 teens; recruited and trained 12 adult volunteers; planned two retreats and a mission trip on a $15K budget; maintained 100% safe-environment compliance."

Same job. Same faithful service. But now a hiring manager in any sector — school, nonprofit, or business — can see the transferable skill.

Do this for every ministry role you've held. You'll be surprised how much leadership you've been hiding under a bushel basket.`,
  },
  {
    slug: "200-word-cover-letter",
    title: "Cover Letters Are Not Dead — Here's the 200-Word Version That Works",
    category: RESUMES,
    image: "/blog/resume-desk.jpg",
    daysAgo: 28,
    excerpt: "Nobody reads long cover letters. Almost everybody reads short ones.",
    body: `The cover letter isn't dead; the four-paragraph essay version is. What works now is 200 words that do three jobs.

First paragraph: why this organization — one specific, true sentence that proves you know who they are. "I've followed St. Brigid's classical curriculum rebuild since 2024" beats any amount of "esteemed institution."

Second: your one best proof point for this exact role. Not your history — your headline.

Third: a plain close. "I'd welcome the chance to talk. Thank you for the work you do."

Mission-driven employers read short letters because a candidate who can be brief and specific about their mission is already demonstrating fit. Say less, mean more.`,
  },
  {
    slug: "resume-when-ministry-was-your-job",
    title: "What to Put on a Resume When Ministry Was Your Full-Time Job",
    category: RESUMES,
    image: "/blog/praying.jpg",
    daysAgo: 36,
    excerpt: "Your years of service are professional experience. Present them that way.",
    body: `If you spent five years as a missionary, a DRE, or a stay-at-home parent running half the parish's volunteer life, you don't have a resume gap. You have experience that needs translating.

List ministry roles exactly like jobs: title, organization, dates, and results. "Missionary, FOCUS — led 4 weekly Bible studies, mentored 30 students, raised $40K annual support" is a complete professional entry. Fundraising alone is a sales skill most candidates can't claim.

For volunteer leadership, use the title the work deserved: Volunteer Coordinator, Events Lead, Treasurer.

The employers on this board chose to hire from the Catholic community. Your ministry years aren't something to explain away here — they're the point.`,
  },
  {
    slug: "career-change-corporate-to-catholic",
    title: "The Career-Change Resume: Moving From Corporate to Catholic",
    category: RESUMES,
    image: "/blog/laptop-writing.jpg",
    daysAgo: 44,
    excerpt: "Your corporate skills are wanted. Your reasons matter more than you think.",
    body: `Catholic organizations need what corporate refugees bring: operations discipline, marketing craft, financial rigor. But the resume that got you promoted at a Fortune 500 needs two changes before it works here.

First, translate outcomes into mission terms. "Managed $2M P&L" becomes more powerful next to "seeking to bring financial discipline to organizations doing work that matters eternally."

Second, add the missing section: your faith and service life. The parish council seat, the Knights membership, the school auction you chaired — at a mission-driven employer, these aren't padding. They're evidence you'll stay when the salary is smaller and the mission is the compensation.

Expect the "why the change?" question in every interview. Write your honest answer down first — it belongs, in compressed form, in your cover letter.`,
  },
  {
    slug: "faith-on-resume-without-oversharing",
    title: "How to Talk About Your Faith on a Resume (Without Oversharing)",
    category: RESUMES,
    image: "/blog/church-candles.jpg",
    daysAgo: 52,
    excerpt: "Show the practice, not the testimony.",
    body: `On a Catholic job board, faith belongs on your resume — but there's a craft to it. The rule: show the practice, not the testimony.

A resume line is a fact: "Lector and Extraordinary Minister, St. Mary's Parish, 2019-present." "Catechist, 3rd grade, six years." "Retreat team leader." These say everything an employer needs: your faith has a shape, a schedule, and a track record.

What doesn't belong is the essay — conversion stories and spiritual autobiographies are for the interview, if invited, where they can be a conversation instead of a claim.

One clean "Faith & Service" section near the end of the resume, three to five lines of verifiable involvement, outworks any paragraph of piety. Let the facts be faithful for you.`,
  },
  {
    slug: "references-that-actually-help",
    title: "References That Actually Help: Who to Ask and How",
    category: RESUMES,
    image: "/blog/handshake-meet.jpg",
    daysAgo: 60,
    excerpt: "A lukewarm reference from a big title loses to a specific one from a real witness.",
    body: `References are the most neglected part of the application — assembled in a panic, chosen for their titles instead of their testimony.

Choose people who have actually watched you work: the principal who observed your classroom monthly beats the superintendent who met you twice. For mission-driven roles, include one reference who can speak to your character in community — a pastor, a ministry lead, a longtime colleague from parish life.

Then prepare them. Send the job posting, tell them why you want it, and name the two things you hope they'll mention. That's not coaching — it's courtesy, and it turns a generic endorsement into a targeted one.

Three prepared references beat five surprised ones, every time.`,
  },
  {
    slug: "fifteen-minute-resume-tuneup",
    title: "The 15-Minute Resume Tune-Up Before Every Application",
    category: RESUMES,
    image: "/blog/notebook-pen.jpg",
    daysAgo: 68,
    excerpt: "Never send the same resume twice. Here's the fast version of tailoring.",
    body: `Full resume rewrites for every application aren't sustainable. But sending identical resumes everywhere is how good candidates stay invisible. The answer is a 15-minute tune-up ritual.

Minutes 1-5: read the posting and circle the six words they repeat or bold. Those are the employer's own priorities in their own language.

Minutes 6-10: make sure those exact words appear — honestly — in your summary and top bullets. If they want "sacramental preparation" and you wrote "faith formation," change it. Same truth, their vocabulary.

Minutes 11-15: reorder. Your most relevant role or bullet moves up. The line that doesn't serve this application moves down or out.

Small effort, compounding advantage. The tailored resume reads like you wrote it for them — because you did.`,
  },

  // ---------- Mission Fit ----------
  {
    slug: "what-mission-fit-actually-means",
    title: 'What "Mission Fit" Actually Means — and What It Doesn\'t',
    category: MISSION,
    image: "/blog/church-candles.jpg",
    daysAgo: 5,
    excerpt: "It's not vibes, and it's not a loyalty test. It's alignment you can name.",
    body: `"Mission fit" gets used loosely enough to mean almost nothing. Here's a working definition: mission fit is when the organization's purpose and your purpose overlap enough that the hard days still make sense.

That's different from culture fit (do we enjoy the same lunch conversations), and different from mere agreement (I affirm the mission statement). Fit shows up in behavior: you'd do a version of this work even if nobody assigned it.

What mission fit is not: a personality type, a piety contest, or a requirement that you be best friends with your coworkers. Some of the best mission-fit hires are temperamental opposites of their teams — aligned on the why, refreshingly different on the how.

Name your own mission in one sentence. Fit is simply how much of that sentence an employer can help you live.`,
  },
  {
    slug: "culture-fit-vs-mission-fit",
    title: "Culture Fit vs. Mission Fit: Why One Fades and the Other Compounds",
    category: MISSION,
    image: "/blog/interview-one.jpg",
    daysAgo: 12,
    excerpt: "Culture is how it feels this year. Mission is why it exists at all.",
    body: `Culture fit answers "will I enjoy Tuesday?" Mission fit answers "will Tuesday matter?" Both are real, but they age differently.

Culture changes with every leadership transition, office move, and reorg. The team that made a job feel like home can be gone in eighteen months. If culture was your reason for joining, your reason can resign.

Mission compounds instead. The longer you serve a purpose you believe in, the more your skills, relationships, and story organize around it — and the more valuable you become to every organization that shares it.

When you evaluate an offer, weigh culture honestly but weight mission heavier. Charm fades; purpose accrues interest.`,
  },
  {
    slug: "tell-if-employer-lives-its-mission",
    title: "How to Tell if an Employer Really Lives Its Mission (Before You Sign)",
    category: MISSION,
    image: "/brand/hero-church-windows.jpg",
    daysAgo: 19,
    excerpt: "Every organization has a mission statement. Not every organization has a mission.",
    body: `The mission statement tells you what an organization wants to believe about itself. To find out what's true, look at three things money, calendar, and exits can't hide.

Money: where does the budget actually go? An employer that says "people are our mission" but hasn't given raises in four years while renovating the lobby has told you the truth accidentally.

Calendar: what does leadership spend time on? Ask your interviewer, "What did the last leadership meeting spend the most time discussing?" The answer is the real mission.

Exits: why did the last three people leave? Ask directly. Healthy mission-driven workplaces answer honestly because turnover embarrasses them less than pretense.

Organizations live their mission in their habits. Interview the habits.`,
  },
  {
    slug: "interview-questions-reveal-mission-fit",
    title: "The Questions to Ask in an Interview That Reveal Mission Fit",
    category: MISSION,
    image: "/blog/interview-two.jpg",
    daysAgo: 26,
    excerpt: "You're interviewing them too. These five questions do the work.",
    body: `The interview is your best chance to test fit before you commit years to it. These five questions reveal more than any tour:

• "What's a decision this organization made that lost money but served the mission?" (If they can't name one, the mission bends to the budget.)
• "Who's your longest-serving employee, and why have they stayed?"
• "When the mission and a deadline conflicted, what happened?"
• "How does this role serve the mission — in your words, not the posting's?"
• "What would make the person in this role a disappointment a year from now?"

Ask them warmly, and notice not just the answers but the reaction. Mission-driven employers light up at these questions. The other kind changes the subject.`,
  },
  {
    slug: "qualified-but-not-called",
    title: "When You're Qualified but Not Called: Reading Your Own Fit Honestly",
    category: MISSION,
    image: "/blog/praying.jpg",
    daysAgo: 33,
    excerpt: "The hardest job to turn down is the one you could do but shouldn't.",
    body: `The most dangerous opportunity is the one you're perfectly qualified for and quietly wrong for. You can do the work — that's not the question. The question is whether doing it will form you into someone you want to become.

Signs you're qualified but not called: you talk about the offer in terms of what it escapes rather than what it builds. You've started negotiating with your own misgivings. The people who know you best go quiet when you describe it.

Discernment isn't mysticism; it's honesty with a prayer life. Take the question to a holy hour instead of a spreadsheet. Ask what the role serves, who it forms you into, and whether you'd respect the version of yourself who takes it.

A "no" to a good job is often the "yes" that makes the right one possible.`,
  },
  {
    slug: "red-flags-were-like-a-family",
    title: 'Red Flags: When "We\'re Like a Family" Isn\'t a Mission',
    category: MISSION,
    image: "/blog/meeting-office.jpg",
    daysAgo: 41,
    excerpt: "Warmth is wonderful. Warmth as a substitute for clarity is a warning.",
    body: `"We're like a family here" can mean two very different things. Sometimes it means people genuinely care for each other. Sometimes it means boundaries are blurry, pay is low, and guilt is the management system.

Watch for the tells. Family-as-warmth comes with clear roles, honest pay conversations, and people who go home at reasonable hours. Family-as-leverage comes with "we all wear many hats" (no role clarity), "we sacrifice for the mission" (only staff sacrifice, never leadership), and hurt feelings when you negotiate.

A truly mission-driven employer doesn't need the family metaphor — the mission itself is the bond. Colleagues can be brothers and sisters in purpose while remaining professionals in structure.

Love your coworkers. But sign a contract with an organization, and make sure the organization behaves like one.`,
  },
  {
    slug: "mission-fit-two-way-street",
    title: "Mission Fit Is a Two-Way Street: What You Owe Your Employer",
    category: MISSION,
    image: "/blog/sunrise-cross.jpg",
    daysAgo: 49,
    excerpt: "Fit isn't just something you evaluate. It's something you keep.",
    body: `Candidates rightly scrutinize employers for authenticity. But mission fit is a covenant, not a consumer review — and it binds both directions.

If an employer hires you for mission, you owe the mission your craft. Showing up faithful but unprepared isn't holiness; it's a genteel form of theft. The organization bet its limited budget on you doing excellent work.

You owe honesty when your fit changes. Seasons shift, callings evolve — the two-way street means saying so early, not coasting for a year while you quietly interview elsewhere.

And you owe the mission your growth. The person who arrived is not the person the mission needs in year three.

Employers should earn your loyalty. When they do, give it wholeheartedly — that's what makes the whole model work.`,
  },
  {
    slug: "mission-fit-hires-stay-longer",
    title: "Why Mission-Fit Hires Stay Twice as Long",
    category: MISSION,
    image: "/blog/three-crosses.jpg",
    daysAgo: 57,
    excerpt: "Retention isn't a perk problem. It's a purpose problem.",
    body: `Across the organizations on this board, one pattern repeats: hires made primarily for mission alignment outlast hires made primarily for credentials — often dramatically.

The reason is simple mechanics. Every job accumulates friction: the raise that comes slowly, the reorg, the tedious season. Skills give you no reason to endure friction; any employer can rent your skills. Purpose does. The mission-fit hire meets friction with "this is still worth it," while the credential hire meets it with an open browser tab of listings.

For candidates, the lesson is to weight purpose heavily in your decision — you're choosing your own future durability.

For employers, it's to stop treating mission questions as soft-skill garnish in interviews. They're the strongest retention predictor you have.`,
  },

  // ---------- The Perfect Match ----------
  {
    slug: "how-matching-actually-works",
    title: "Connecting the Perfect Candidate to the Perfect Employer: How Matching Actually Works",
    category: MATCH,
    image: "/blog/handshake-meet.jpg",
    daysAgo: 4,
    excerpt: "Great matches aren't found. They're constructed from signals both sides can learn to send.",
    body: `The romance version of hiring says the perfect candidate and the perfect employer simply find each other. The truth is more encouraging: great matches are built from legible signals, and both sides can get better at sending them.

Candidates signal with specificity — a profile that names real roles, real categories, and a genuine location tells the matching engine (and every employer) exactly where you fit. Vague profiles produce vague matches.

Employers signal with honest postings: the actual salary range, the actual work mode, the mission in plain words.

That's why our fit scores work the way they do — they read the overlap between what you've declared and what the job declares. Sharpen your declarations and the green pills follow. The perfect match starts with telling the truth in public.`,
  },
  {
    slug: "best-on-paper-not-right-hire",
    title: "Why the Best Candidate on Paper Isn't Always the Right Hire",
    category: MATCH,
    image: "/blog/interview-one.jpg",
    daysAgo: 11,
    excerpt: "Resumes measure the past. Hiring is a bet on a future.",
    body: `Every experienced hiring manager has a story about the immaculate resume that became a mediocre hire — and the modest resume that became indispensable. The paper measures the wrong decade.

A resume records what someone did inside someone else's structure, with someone else's motivation. It can't show what they'll do inside yours. The candidate who ran a bigger program at a bigger parish may have been carried by systems you don't have.

What predicts better: trajectory (are they growing?), reasons (why this mission, specifically?), and behavior in low-stakes moments — how they treated the receptionist, whether they asked about the mission or only the benefits.

Read resumes to qualify. Hire on direction, motive, and character. Paper qualifies; person performs.`,
  },
  {
    slug: "anatomy-of-a-great-job-match",
    title: "The Anatomy of a Great Job Match: Five Signals That Predict Success",
    category: MATCH,
    image: "/blog/meeting-office.jpg",
    daysAgo: 18,
    excerpt: "After enough placements, the pattern is unmistakable.",
    body: `Watch enough hires succeed and fail and the anatomy of a great match becomes visible. Five signals show up over and over:

• Mission overlap: the candidate can explain the employer's purpose in their own words — and gets something personal from serving it
• Skill adjacency: the role stretches them about 20%. Too little bores; too much breaks
• Honest logistics: commute, schedule, and salary all work without heroics
• Mutual enthusiasm: both sides would be disappointed to lose the other
• A named growth path: everyone can say what year three looks like

Notice that four of the five are knowable before the offer. Most bad matches weren't unlucky — one side skipped a signal and hoped. Check all five, every time.`,
  },
  {
    slug: "how-fit-scores-work",
    title: "How Fit Scores Work — and How to Improve Yours",
    category: MATCH,
    image: "/blog/laptop-writing.jpg",
    daysAgo: 25,
    excerpt: "The pill next to every job is math about you. Here's the formula.",
    body: `Every job you see on Jobs For Catholics carries a colored fit pill — green, amber, or red — scored against your profile. It's not a mystery and it's not a judgment. It's overlap arithmetic.

Your score weighs five things: how closely the job title matches roles you said you want (the biggest factor), whether it's in a category you chose, the job type, the work setting, and location — with credit if you're open to relocating or the job is remote.

Which means you can raise your scores by sharpening your profile. Add every title you'd genuinely accept. Pick all the categories that fit your gifts, not just one. Update your location and relocation status when life changes.

The score serves one purpose: pointing your attention where it's most likely to be returned. Keep your profile honest and current, and let the green pills do your searching.`,
  },
  {
    slug: "where-candidates-and-employers-miss",
    title: "Finding Each Other: Where Faithful Candidates and Employers Miss",
    category: MATCH,
    image: "/blog/open-field.jpg",
    daysAgo: 32,
    excerpt: "The right people keep almost meeting. The gaps are fixable.",
    body: `Somewhere right now a parish needs exactly the coordinator who's praying for exactly that job — and they'll miss each other. The near-misses follow patterns.

Candidates search too narrowly: the perfect role is titled "Family Life Coordinator" and they only searched "Youth Minister." (Fix: search by category, and add multiple titles to your profile.)

Employers post too briefly: a two-line posting with no salary attracts nobody specific. Detail is a magnet.

Both sides move too slowly: faithful candidates deliberate prayerfully, small employers approve slowly, and meanwhile the other side reads silence as rejection.

The mission-driven hiring world is small. Say more, search wider, respond faster — the person you're looking for is probably looking back.`,
  },
  {
    slug: "first-90-days-proving-the-match",
    title: "The First 90 Days: Proving the Match Was Right",
    category: MATCH,
    image: "/blog/teacher-two.jpg",
    daysAgo: 39,
    excerpt: "The hire isn't finished at the signature. It's finished at Thanksgiving.",
    body: `A match isn't proven at the offer letter — it's proven in the first ninety days, and both sides carry the burden of proof.

New hires: your one job is to convert trust into evidence. Ship something visible in the first month, however small. Learn names before you propose changes. Ask your manager the golden question — "what would make this hire feel like a win for you by Christmas?" — then aim at exactly that.

Employers: the fastest way to break a right match is a vague start. A desk that's ready, a first-week schedule, and one clearly-owned early project outperform any welcome lunch.

Ninety days of small kept promises turns a good decision into a great tenure. The match was on paper; the fit is built in person.`,
  },
  {
    slug: "from-application-to-belonging",
    title: "From Application to Belonging: A Match Story Done Well",
    category: MATCH,
    image: "/blog/handshake-meet.jpg",
    daysAgo: 47,
    excerpt: "What it looks like when every step of the process serves the fit.",
    body: `Consider a composite of matches we've watched succeed: a music director we'll call Anna, and a parish that did it right.

The posting was honest — salary range published, expectations plain, the pastor's vision for sacred music in two paragraphs of his own words. Anna's profile was equally honest: her titles, her range, her real location. The fit score turned green; both sides paid attention.

The interview went both directions. The parish asked to see her rehearse a choir, not just talk about one. Anna asked what the parish had sacrificed for beauty in worship — and got a real answer.

The offer came with a named mentor and a year-one goal. By Advent she wasn't the new hire; she was theirs.

Nothing in that story required luck. Every step is copyable.`,
  },

  // ---------- Meaning at Work ----------
  {
    slug: "importance-of-meaning-in-a-job",
    title: "The Importance of Meaning in a Job (It's Not a Luxury)",
    category: MEANING,
    image: "/blog/sunrise-cross.jpg",
    daysAgo: 2,
    excerpt: "Meaning isn't a perk for people who can afford it. It's load-bearing.",
    body: `We talk about meaning at work as if it were a luxury item — something to consider after salary, commute, and dental. The evidence, and the tradition, say otherwise: meaning is load-bearing.

Work occupies more waking hours than family, prayer, and rest combined. A job that means nothing doesn't stay neutral; it slowly teaches you that your effort doesn't matter, and that lesson metastasizes into the rest of life. Burnout research keeps finding that workload alone doesn't break people — pointless workload does.

Meaning doesn't require a dramatic vocation. It requires a connection you actually believe between your daily tasks and a good you actually value. Feeding families, forming students, keeping a parish's lights on — named and owned, ordinary work carries extraordinary weight.

Don't apologize for wanting your work to matter. You were built that way on purpose.`,
  },
  {
    slug: "work-as-vocation-colossians",
    title: "Work as Vocation: What Colossians 3:23 Asks of Your Career",
    category: MEANING,
    image: "/blog/church-candles.jpg",
    daysAgo: 8,
    excerpt: "\"Work at it with all your heart, as working for the Lord\" — a job description for every job.",
    body: `"Whatever you do, work at it with all your heart, as working for the Lord, not for men." Paul wrote that to ordinary workers — most of them doing labor nobody would call a dream job.

Notice what the verse doesn't say: find work worthy of your whole heart. It says bring your whole heart to the work, because the true employer is not the one on the paycheck. That reframe cuts both ways.

It dignifies every honest job — the spreadsheet, the supply closet, the second-grade classroom are all altars if you work them that way.

But it also raises the stakes on your choices. If work is offered to God, then where you work, what it builds, and who it serves are spiritual questions, not just financial ones.

Vocation isn't a category of jobs. It's a posture toward work — and a criterion for choosing it.`,
  },
  {
    slug: "sunday-shouldnt-be-only-day",
    title: "Why Sunday Shouldn't Be the Only Day Your Work Makes Sense",
    category: MEANING,
    image: "/brand/hero-church-windows.jpg",
    daysAgo: 16,
    excerpt: "The gap between what you worship and what you do all week is where fatigue lives.",
    body: `There's a particular tiredness that comes from living in two unconnected worlds: the Sunday world where everything means something, and the Monday world where nothing does. Sociologists call it compartmentalization. It just feels like exhaustion.

The integrated life doesn't require church employment. It requires being able to draw a line — honestly, in one sentence — from your weekday work to something you'd pray about. "I keep honest books for a company that builds needed things" is an integrated sentence. Plenty of secular jobs pass the test.

What corrodes the soul is work that requires you to leave your convictions in the car: products you wouldn't defend, practices you have to not think about.

If you can't draw the line from Monday to Sunday, that's not a mood — it's data. Follow it.`,
  },
  {
    slug: "quiet-burnout-of-meaningless-work",
    title: "The Quiet Burnout of Meaningless Work — and the Way Out",
    category: MEANING,
    image: "/blog/open-field.jpg",
    daysAgo: 23,
    excerpt: "You're not tired because you work too much. You're tired because it counts for too little.",
    body: `The loud kind of burnout — eighty-hour weeks, missed holidays — gets the articles. The quiet kind is more common: reasonable hours, decent pay, and a slow interior flattening, because nothing you do all day would be missed if it stopped.

The way out usually isn't dramatic. Start by locating the meaning that already exists in your work — someone is served by what you do, and naming them specifically restores more than you'd expect.

Then expand what you can: volunteer for the project that actually helps someone, mentor the new hire, bring craftsmanship to tasks that don't require it. Excellence is meaning you can add unilaterally.

And if the well is truly dry — if the organization's purpose and yours will never touch — begin the patient work of leaving well. Quiet burnout doesn't fix itself. It just gets quieter.`,
  },
  {
    slug: "ora-et-labora-benedictines",
    title: "Ora et Labora: What the Benedictines Knew About Careers",
    category: MEANING,
    image: "/blog/praying.jpg",
    daysAgo: 31,
    excerpt: "Fifteen centuries of research on sustainable, meaningful work — hiding in a monastery.",
    body: `Fifteen hundred years before workplace wellness programs, St. Benedict built a rule of life around a radical claim: prayer and work are not rivals. Ora et labora — the two halves of one balanced day.

The Benedictine insights translate directly to careers. Work in rhythm: the monks stop working when the bell rings, trusting the work to be there tomorrow — an antidote to the always-on career. Work with your hands and your mind: every monk labored regardless of rank, and no honest task was beneath dignity. Work as prayer: done attentively and offered up, the garden and the scriptorium counted the same.

Most of all: stability. Monks vow themselves to one community for life and go deep instead of wide. In a job-hopping economy, there's a quiet case for choosing a mission worth staying with.

You don't need a monastery. You need a rule — a deliberate shape for how work fits a life aimed at God.`,
  },
  {
    slug: "ordinary-job-calling",
    title: "Can an Ordinary Job Be a Calling? Yes — Here's How",
    category: MEANING,
    image: "/blog/notebook-pen.jpg",
    daysAgo: 38,
    excerpt: "The bookkeeper and the missionary can both be exactly where God wants them.",
    body: `A subtle clericalism creeps into how we talk about calling — as if vocation belongs to missionaries and youth ministers, while everyone else just has a job. The tradition says otherwise.

A calling has three marks, and none requires a religious employer. It fits your gifts: the work draws on what you're genuinely good at, and doing it well feels like gratitude. It serves real people: you can name who is better off. It's confirmed over time: the people who know you best see you flourishing in it.

An ordinary job becomes a calling the way ordinary bread becomes significant — through what's done with it and who it's offered to. The parish bookkeeper protecting donors' sacrifice with meticulous ledgers is living a vocation, full stop.

Stop waiting for a lightning bolt. Look at your gifts, your neighbors, and your fruits. The call is usually already in your hands.`,
  },
  {
    slug: "money-meaning-tradeoff-myth",
    title: "Money, Meaning, and the Trade-Off Myth",
    category: MEANING,
    image: "/blog/resume-desk.jpg",
    daysAgo: 46,
    excerpt: "You've been told to pick one. The data — and prudence — say it's more complicated.",
    body: `The standard story says meaningful work pays badly and lucrative work means nothing, so choose your poison. Both halves are exaggerated — and the myth does damage in both directions.

It lets mission-driven employers underpay ("the mission is the compensation") — which quietly filters their hiring pool down to people with outside support, and calls it virtue. And it gives high earners an alibi for staying in corrosive jobs ("someday I'll afford meaning").

The truth: providing for a family is itself meaningful work — a just wage serves your first mission. And meaning compounds into market value: people who care become people who excel.

So negotiate without guilt at mission-driven employers; they need sustainable hires, not martyrs. And count meaning honestly in every offer — it's not a discount you accept, it's value you receive. The goal isn't a trade-off. It's a life where the paycheck and the purpose both hold.`,
  },
  {
    slug: "teaching-kids-what-work-is-for",
    title: "Teaching Your Kids What Work Is For (By How You Work)",
    category: MEANING,
    image: "/blog/teacher-two.jpg",
    daysAgo: 54,
    excerpt: "Your children are learning a theology of work at the dinner table. What's the lesson?",
    body: `Long before your kids hold a job, they've absorbed a doctrine of work — from how you talk about Monday, what your face does when your phone buzzes at dinner, whether "work" in your house is a curse word or a calling.

If work is only ever the thing that steals you from them, they learn work is theft. If it's only money, they learn to sell their hours to the highest bidder. But if they hear you speak of your work as service — naming the people helped, the problems solved, even the crosses carried with purpose — they learn work can be love with sleeves rolled up.

This has hiring implications, honestly: choosing an employer whose mission you can explain to a seven-year-old is a family decision, not just a career one.

The catechism of work is taught at your kitchen table, and you're the professor. Teach the version you'd want them to live.`,
  },

  // ---------- For Employers ----------
  {
    slug: "what-employers-look-for-mission-fit",
    title: 'What Employers Actually Look For When They Say "Mission Fit"',
    category: EMPLOYERS,
    image: "/brand/employer-2.jpg",
    daysAgo: 6,
    excerpt: "From the other side of the desk, fit has a surprisingly concrete checklist.",
    body: `Candidates imagine "mission fit" as a mysterious vibe check. Sit on the hiring side for a few searches and it resolves into something concrete. Employers are listening for four things:

• Fluency: can you talk about our mission in your own words, or only quote our website back to us?
• History: does your life show prior investment in this kind of good — before you needed a job from it?
• Cost awareness: do you understand what this work is like when it's hard, or are you in love with a brochure?
• Reciprocity: do you have a reason this mission serves your growth too? (Pure self-sacrifice burns out; employers know it.)

None of these can be faked in an hour, which is exactly why employers probe them. The good news: if the fit is real, all four are easy. Just tell the truth with specifics.`,
  },
  {
    slug: "spot-mission-driven-candidate-one-interview",
    title: "How Hiring Managers Spot a Mission-Driven Candidate in One Interview",
    category: EMPLOYERS,
    image: "/blog/interview-two.jpg",
    daysAgo: 13,
    excerpt: "The tells are small, consistent, and nearly impossible to fake.",
    body: `Experienced mission-driven employers develop a radar, and it's remarkably consistent. The tells they trust:

Questions asked. Mission-driven candidates interrogate the work — "who does this program serve? what's not working yet?" Everyone else interrogates the package first.

Specific gravity. Ask why they applied and listen for specifics. "I read about your literacy program" outweighs ten minutes of eloquent generality.

Free history. Their past includes unrequired service — the choir, the food bank, the coaching — done before and between jobs, when nobody was paying or watching.

Reaction to the hard parts. Describe the role's genuine difficulties and watch: mission-fit candidates lean in and ask how it's being handled. Others visibly re-price the job.

One interview is enough — if you spend it on these four channels instead of a resume walk-through.`,
  },
  {
    slug: "skills-trainable-mission-isnt",
    title: "The Employer's View: Why Skills Are Trainable and Mission Isn't",
    category: EMPLOYERS,
    image: "/blog/teacher-class.jpg",
    daysAgo: 20,
    excerpt: "The hiring principle that separates thriving Catholic organizations from churning ones.",
    body: `Ask leaders of thriving Catholic organizations their hiring secret and you'll hear a version of the same principle: hire for mission, train for skill — because only one of those is teachable.

A parish business manager can learn your accounting software in a month. Nobody can teach them to care whether the parish flourishes. A teacher can be coached into better classroom management; no PD day instills a love of Catholic education that wasn't there.

This isn't an excuse to hire incompetence — skills still gate the interview. It's about the tiebreaker, and most hires come down to one: the polished candidate who could take any job versus the solid candidate who wants this one. Organizations that consistently choose the second build low-turnover, high-trust teams. Organizations that chase credentials rent talent until a better offer arrives.

Skills depreciate and refresh. Mission alignment compounds. Hire the asset that appreciates.`,
  },
  {
    slug: "how-catholic-employers-read-resumes",
    title: "How Catholic Employers Read Your Resume Differently",
    category: EMPLOYERS,
    image: "/blog/resume-desk.jpg",
    daysAgo: 27,
    excerpt: "Same document, different eyes. Know what they're scanning for.",
    body: `A resume that lands at a diocese, Catholic school, or apostolate is read with a second lens laid over the standard one — and knowing it helps both sides.

Catholic employers scan for continuity of service: not just jobs held, but a life pattern of showing up for communities. Gaps that would worry a corporate recruiter often read differently here — mission years, caregiving, formation.

They notice parish and ministry lines that other employers skim past, and treat them as experience, not decoration. A stint as RCIA sponsor signals patience and formation skills; auction chair signals fundraising.

And they read for tone. Grandiose self-marketing that plays well elsewhere can misfire; plain, specific, quantified service plays best.

Candidates: don't hide your Catholic life on a Catholic job board — organize it. Employers: say in your postings what you actually value, so candidates know to show it.`,
  },
  {
    slug: "parish-business-manager-wishes",
    title: "What a Parish Business Manager Wishes Candidates Knew",
    category: EMPLOYERS,
    image: "/blog/meeting-office.jpg",
    daysAgo: 34,
    excerpt: "Notes from the desk where parish hiring actually happens.",
    body: `Talk to the people who actually run parish hiring — often a business manager wearing five other hats — and a consistent wish list emerges.

They wish candidates knew the budget is real: the posted salary took three finance-council meetings to approve. Negotiation is welcome; incredulity is not.

They wish candidates applied even at 80% qualified. Parishes hire whole people for stretchy roles; the perfect-fit unicorn posting is aspirational.

They wish candidates understood the pace: approvals route through pastors, councils, and sometimes the diocese. Two quiet weeks isn't rejection — a brief, warm follow-up genuinely helps.

Most of all: parish jobs are real jobs. The best applications treat a parish with the same professionalism as a company — resume tailored, references ready, questions prepared — while grasping that the bottom line here is measured in souls served.`,
  },
  {
    slug: "hiring-for-mission-legally",
    title: "Hiring for Mission Without Discriminating: What Employers Can and Can't Ask",
    category: EMPLOYERS,
    image: "/brand/tech.jpg",
    daysAgo: 42,
    excerpt: "Religious organizations have real latitude — and real limits. A plain-English orientation.",
    body: `Mission-driven hiring lives inside a legal framework that many small Catholic employers navigate by folklore. A plain-English orientation (not legal advice — confirm specifics with counsel):

Religious organizations generally do have latitude to prefer candidates who share their faith, especially for roles that carry out religious functions — teachers of religion, ministers, liturgical staff. The "ministerial exception" is real but role-dependent, not a blanket license.

What stays off-limits everywhere: questions about age, disability, pregnancy, and family plans. "Are you a practicing Catholic?" may be lawful for a DRE role; "are you planning to have kids?" is not lawful for any role.

Best practice is to put the requirement in the posting — "practicing Catholic in good standing required" — so the standard is public, tied to the role, and applied evenly.

Get the framework right once, write it down, and mission-fit hiring becomes both principled and safe.`,
  },
  {
    slug: "why-employers-pay-more-for-mission",
    title: "Why Employers Pay More for Candidates Who Get the Mission",
    category: EMPLOYERS,
    image: "/blog/handshake-meet.jpg",
    daysAgo: 50,
    excerpt: "Mission fit isn't charity pricing. It's the best ROI line in the hiring budget.",
    body: `There's a persistent myth that mission-driven employers can pay less because meaning subsidizes wages. The sharpest ones have learned the opposite: mission-fit candidates are worth paying up for, on straight arithmetic.

Turnover is the most expensive line item in any people budget — recruiting, retraining, and the year of lost momentum each departure costs. Mission-fit hires demonstrably stay longer, cutting that cost at the root.

They also carry hidden productivity: discretionary effort. The employee who believes in the work does the unassigned things — mentoring, fixing, improving — that never appear in a job description but compound into organizational health.

And they recruit for you. Every fulfilled mission-fit employee is a walking job posting to their whole community.

Pay fairly for alignment. It's not sentiment — it's the best deal in the budget.`,
  },
];

async function main() {
  for (const a of articles) {
    const data = {
      title: a.title,
      excerpt: a.excerpt,
      body: a.body,
      image: a.image,
      category: a.category,
      publishedAt: new Date(Date.now() - a.daysAgo * 86400000),
    };
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: data,
      create: { slug: a.slug, ...data },
    });
  }
  console.log("Seeded", articles.length, "articles");
}

main().finally(() => prisma.$disconnect());
