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

Win the skim, and the six seconds becomes six minutes. That's when the interview happens.

Think about what those six seconds contain from the reviewer's side. A school posting one teaching job can receive eighty resumes in a week, most reviewed after work hours by a principal who also ran a fire drill that day. The skim isn't disrespect — it's triage. Design for the tired reader and you'll beat the candidates who designed for an imaginary careful one.

A practical exercise: hand your resume to a friend for exactly six seconds, take it back, and ask what they remember. Whatever they say is your current headline — whether you meant it or not. If they remember your objective statement instead of your best achievement, swap the real estate.

One more edge: file names and formatting survive the skim too. "Maria-Alvarez-Theology-Teacher.pdf" reads professional before the document even opens. Send PDF unless asked otherwise, keep fonts boring, and never let the good stuff fall to page two.`,
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

A principal should finish your first page thinking, "This person could start Monday." Everything else is conversation.

A worked example makes the order concrete. Top band: "Middle school science teacher, 8 years in Catholic education, Ohio license + catechist certification." Credentials block next — four lines, no prose. Then the record: "Raised 7th-grade standardized science scores 18 points in two years; launched a STEM club that now enrolls a third of the middle school; retained 95% of families year over year in my homeroom."

Notice what's absent: a paragraph about your teaching philosophy. Principals stopped reading those years ago because everyone's philosophy sounds identical on paper. Your philosophy shows up in the interview and the demo lesson; the resume's job is to earn you both.

Two Catholic-school-specific tips. First, name your sacramental and liturgical involvement precisely — "planned monthly all-school Masses with the chaplain" beats "supported school liturgies." Second, if you've taught in public schools, don't apologize for it; frame it: "bringing eight years of public-school instructional rigor home to Catholic education." Principals love that sentence.`,
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

Name what you did plainly and let the results speak. That's not pride — that's clarity.

There's a sixth mistake worth naming separately: treating the resume as a spiritual autobiography. Your love of the Lord belongs in your life and, in the right form, in your interview. On the page, it has to be carried by evidence — the ministries you showed up for, the programs you built — or it reads as filler to the very employers you most want to reach.

Where does the humility instinct come from? Many faithful candidates were formed to deflect credit, and that's beautiful at the dinner table. But consider the parable of the talents: the servant who buried his gift to keep it safe was not praised. A resume is an accounting of what you did with what you were given. Render it honestly.

Practical fix for the vagueness habit: for every bullet, force yourself to answer "how many, how much, how often, compared to what?" If a bullet survives all four questions with no number, it's probably describing a duty, not a contribution — cut it or dig deeper.`,
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

Do this for every ministry role you've held. You'll be surprised how much leadership you've been hiding under a bushel basket.

Here's the full translation table for common ministry lines. "Led a Bible study" → "facilitated a weekly discussion group of 12, sustained over three years." "Helped with VBS" → "co-directed a five-day program for 120 children with 25 volunteers." "Sang in the choir" → fine as-is under Faith & Service — not every line needs inflating, and knowing the difference is part of the craft.

The deeper principle: ministries are organizations, and you held a role in one. Someone recruited people, managed money, handled a crisis, kept children safe under diocesan protocols. If that someone was you, those are professional facts. Safeguarding compliance in particular is a serious, audited responsibility — name it, because school and parish employers know exactly what it costs to maintain.

If you're unsure whether you're overclaiming, apply the reference test: would the pastor or ministry lead who watched you nod at this bullet? If yes, it's not exaggeration — it's the first honest accounting of work you did for free.`,
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

Mission-driven employers read short letters because a candidate who can be brief and specific about their mission is already demonstrating fit. Say less, mean more.

Here's a complete example, 148 words, for a parish communications role: "Dear Mrs. Delgado — I've admired how St. Anne's bulletin became something people actually read since the redesign last Advent, and I'd love to build on that. For the past four years I've run communications for a 40-employee nonprofit: a weekly email to 8,000 subscribers (48% open rate), a website rebuild that doubled online giving, and social channels grown from scratch to 5,000 followers. I'd bring the same discipline to St. Anne's — with the difference that this mission is my own. I'm a parishioner two towns over and have watched your parish's growth with real joy. I'd welcome a conversation. Thank you for the work you do."

Notice the anatomy: one specific compliment that proves attention, three numbers that prove competence, one sentence of honest connection, and a close with no groveling. Nothing about "passionate self-starters." That letter gets read to the end — and the end is where interviews come from.`,
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

The employers on this board chose to hire from the Catholic community. Your ministry years aren't something to explain away here — they're the point.

The trickiest version is unpaid ministry that ran alongside caregiving — the years you "didn't work" while running the parish festival, coordinating meal trains, and treasurer-ing the school board. Resist the urge to label those years a gap and apologize. Build a section called "Community & Ministry Leadership" with dated entries, exactly like employment, and let the work speak.

One structural choice matters: for heavy ministry backgrounds, consider a skills-forward hybrid resume. Lead with three competency clusters — Program Leadership, Volunteer Management, Fundraising & Stewardship — each with proof bullets drawn from across your ministry life, then the chronological list below. This keeps a reviewer from having to assemble your case themselves.

And convert the fundraising honestly: support-raising as a missionary is real development work — prospecting, asking, stewarding, reporting. Nonprofit employers pay for that exact skill set. "Raised and stewarded $40K/year from 60 individual donors, with 85% year-over-year retention" is a development resume line that many paid professionals can't match.`,
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

Expect the "why the change?" question in every interview. Write your honest answer down first — it belongs, in compressed form, in your cover letter.

Salary deserves its own honest paragraph. You will probably take a cut — sometimes a steep one — and the interview will go better if you've done the math beforehand. When they ask about compensation, "I've reviewed the range and my budget works" is a complete answer that removes their biggest fear about corporate candidates: that you'll leave in a year when the discount stops feeling noble.

Translate your vocabulary too, in both directions. Corporate speak ("drove cross-functional alignment on KPIs") lands as noise in a parish office; say "got the school, parish, and finance council rowing the same direction on enrollment goals." Meanwhile, learn their language: charism, apostolate, ordinary time. Using it correctly signals the move is toward something, not just away from burnout.

Finally, expect a longer, slower process than you're used to — approvals move through pastors and councils. The candidates who convert successfully treat the slower pace as their first lesson in the culture rather than their first frustration with it.`,
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

One clean "Faith & Service" section near the end of the resume, three to five lines of verifiable involvement, outworks any paragraph of piety. Let the facts be faithful for you.

The judgment call gets easier when you sort faith lines into three buckets. Bucket one, always include: roles with duties and dates — catechist, lector, council member, retreat leader. Bucket two, include when relevant: formation and credentials — a theology degree, catechetical certification, safe-environment training. Bucket three, save for conversation: devotional life, conversion story, spiritual direction. The first two are evidence; the third is intimacy, and intimacy shared too early costs credibility.

Adjust for the employer, too. Applying to a diocese, put Faith & Service prominently on page one — it's a qualification. Applying to a Catholic-owned business for an accounting role, keep the section brief and let your professional record lead; the fit shows in where you chose to apply.

One caution for the genuinely accomplished: resist listing every ministry you've ever touched. Twelve lines of involvement reads as either padding or an inability to prioritize. Five lines you'd happily discuss for ten minutes each is the stronger portfolio.`,
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

Three prepared references beat five surprised ones, every time.

Timing matters as much as selection. Ask permission when you begin the search, not when the recruiter calls — "may I list you, and is there anything you'd want to know about what I'm pursuing?" This turns your references into scouts who are watching for you, and it prevents the deadly reference-checker experience: reaching someone who audibly can't place you.

Handle the delicate cases deliberately. If you're leaving a difficult situation and can't use your current supervisor, prepare the sentence that explains it without drama: "My current pastor doesn't know I'm searching; here are three others who've supervised my work directly." Every experienced employer has heard this; said plainly, it costs you nothing.

After the process ends — either way — close the loop. Tell your references what happened and thank them specifically. Partly because gratitude is right, and partly because careers in the Catholic world are long and small: the reference you thank properly this year is the colleague who calls you about an opening in three.`,
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

Small effort, compounding advantage. The tailored resume reads like you wrote it for them — because you did.

An example of the ritual in motion. The posting says: "seeking a Director of Faith Formation to build family-centered catechesis and coordinate sacramental preparation across two merged parishes." Circle: faith formation, family-centered, sacramental preparation, merged parishes. Now the tune-up: your summary line becomes "Faith formation leader experienced in family-based catechesis and sacramental prep — including two years navigating a parish merger." That last clause was buried in your third job; today it's the headline, because today it's their headline.

Keep a "parts bin" document to make this fast: every bullet you've ever written, all versions, organized by theme. Tailoring stops being rewriting and becomes selecting — five minutes of shopping in your own history.

The discipline pays a second dividend: after ten tune-ups you'll notice which of your bullets keeps earning the top slot across different postings. That's the market telling you what your strongest material is — useful intelligence for interviews, and for choosing what to build next in your career.`,
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

Name your own mission in one sentence. Fit is simply how much of that sentence an employer can help you live.

Test yourself with a thought experiment: if this organization vanished tomorrow, would you grieve the loss of the mission or just the loss of the paycheck? Both are legitimate losses — but only the first indicates fit. A second test runs the other direction: does the organization's way of pursuing the mission sit well with your conscience and your gifts? You can love Catholic education and still be wrong for a particular school's model.

Fit also has degrees, and pretending otherwise causes grief. A 100% overlap — the mission is your mission — is rare and mostly found in founders. A healthy hire usually lives at 70%: strong alignment on the core, honest indifference to some of the periphery. Trouble starts below 50%, where you're performing enthusiasm you don't feel; performance of that kind has a short shelf life and a high spiritual cost.

So before the next application, write your one-sentence mission and grade the overlap honestly. Not to disqualify yourself — to know what you're signing, and to say true things in the interview instead of borrowed ones.`,
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

When you evaluate an offer, weigh culture honestly but weight mission heavier. Charm fades; purpose accrues interest.

A story that repeats constantly: a candidate joins a Catholic nonprofit because the team was delightful — game nights, inside jokes, a boss who felt like an older brother. Two years later the boss moves to another diocese, half the team follows, and the delightful culture is a memory. What remains is the actual job: the mission, the work, the people served. The hires who stayed happy were the ones who'd have chosen the place anyway, without the game nights.

This doesn't make culture trivial — a toxic culture will poison even perfect mission alignment, and you should walk away from cruelty no matter how noble the letterhead. The point is about what you optimize for when both options are decent.

There's an interview tactic hiding here too. Culture questions ("what's it like to work here?") get you rehearsed answers. Mission questions ("what has this organization refused to do to grow?") get you the truth. Ask more of the second kind, and notice that employers evaluating you make the same distinction — your game-night charm matters less to them than whether you'd still be here after the reorg.`,
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

Organizations live their mission in their habits. Interview the habits.

Add two more inspection points to the list. People: meet someone below the leadership tier — the front-desk coordinator, a second-year teacher — and ask what the mission means in their daily work. In organizations that live their mission, the answer comes fast and concrete. In organizations that laminate it, you'll hear the website recited back with a small sigh.

History: every mission gets tested eventually — a budget crisis, a scandal weathered, a hard personnel call. Ask "tell me about a season that tested this place." The organizations worth joining tell you the story straight, including what it cost. Evasion on this question is itself an answer.

Calibrate your expectations, though: no organization lives its mission perfectly, and a candidate sniffing for hypocrisy will find it everywhere humans work together. You're not auditing for sainthood. You're distinguishing between places where the mission is a working document — argued over, returned to, occasionally failed and repaired — and places where it's wall art. The first kind deserves your years. The second will spend them.`,
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

Ask them warmly, and notice not just the answers but the reaction. Mission-driven employers light up at these questions. The other kind changes the subject.

Delivery matters as much as the list. Space these questions through the conversation rather than firing them as an audit at the end — the goal is dialogue, not deposition. And genuinely listen, because the follow-up is where the gold is: when they name a decision that cost money but served the mission, ask what the debate was like. Whether there was a debate tells you if the mission has teeth or just a trophy case.

Watch the room, too. In panel interviews, notice who answers mission questions and who defers. If only the pastor can speak to purpose while the operations manager studies the table, you've learned where the mission lives and where it doesn't — useful, since you'd work for the operations manager.

Finally, reciprocate. When they ask why you want the role, give them the same specificity you're demanding: your actual reasons, tied to their actual work. These questions raise the bar for the whole conversation, and the strongest possible interview is one where both sides leave having told the truth and liked it.`,
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

A "no" to a good job is often the "yes" that makes the right one possible.

There's a practical structure for this discernment, borrowed from Ignatian practice. Set a decision date — vague timelines breed vague thinking. Before it, spend three sessions of honest prayer: one imagining you took the job (notice consolation or desolation, not excitement or fear — they're different), one imagining you declined, one asking for indifference to everything except God's will and your family's real needs.

Bring in one or two counselors who know you, not just the situation — a spiritual director, a spouse, an old friend with permission to be blunt. Frame the question carefully: not "should I take it?" but "what do you see in me when I talk about it?" People who love you notice your face and your verbs before you do.

And remember that "no" has a cost you're allowed to count. Turning down a good job on discernment grounds is not a failure of gratitude or ambition; it's a claim that your working years are finite and consecrated. The tradition has a name for treating them that way: stewardship.`,
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

Love your coworkers. But sign a contract with an organization, and make sure the organization behaves like one.

The metaphor gets truly dangerous at departure time. Real families don't have exits; jobs do — and organizations that run on family language often treat resignation as betrayal. Ask around gently: how were the last few departures handled? If people who left in good faith are spoken of like defectors, you've found the tell. Mission-driven workplaces bless their alumni and mean it, because the mission is bigger than the roster.

Also watch compensation conversations closely. In the family-as-leverage shop, negotiation is met with wounded surprise: "we thought you were committed." That sentence is a price tag on your compliance, not your work. A healthy employer hears a negotiation as a professional talking, because the mission needs professionals more than it needs martyrs.

None of this means warmth is a red flag. Plenty of parishes and schools are genuinely tender places, and it's one of the joys of working in them. The distinction is simple: in healthy warmth, care flows alongside clarity — contracts, reviews, honest pay bands. In unhealthy warmth, care substitutes for clarity. Take the warmth; insist on the clarity.`,
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

Employers should earn your loyalty. When they do, give it wholeheartedly — that's what makes the whole model work.

There's a fourth debt worth naming: you owe the mission your voice. Organizations drift — programs calcify, decisions accrete away from the founding purpose — and the people best positioned to notice are the mission-fit hires who care enough to say so. Loyal dissent, offered respectfully through the right channels, is a form of service. The employee who watches drift silently and then leaves "disappointed" gave the mission nothing but their absence.

The covenant framing also disciplines how you leave, when leaving is right. Two-way mission fit means departing the way you'd want to be departed from: real notice, real documentation, a successor set up to win, and no poaching of morale on your way out. In the small world of Catholic employment, how you leave one mission is the first thing the next one learns about you.

Employers, the mirror image is yours: if you hired for mission, honor it — invest in growth, pay what the budget honestly allows, and never weaponize the mission against just complaints. The covenant collapses fastest from the top.`,
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

For employers, it's to stop treating mission questions as soft-skill garnish in interviews. They're the strongest retention predictor you have.

Put rough numbers on it, because leaders budget with numbers. Replacing a mid-level hire is commonly estimated at half to a full year of salary once you count recruiting, onboarding, and the productivity trough. A school that turns over four teachers a year at that rate is burning a program's worth of budget on churn. Cut turnover in half through better fit-screening — an interview-process change that costs almost nothing — and you've funded the raise pool you keep saying you can't afford.

The compounding works inside careers too. The employee who stays seven mission-aligned years builds institutional knowledge, community trust, and program continuity that no talented two-year rotation can replicate. Catholic organizations, whose "product" is largely relationships, feel this more than most.

One caveat to keep the claim honest: mission fit predicts retention only when the basics are met. Below-survival wages, chaotic management, or vanished growth paths will eventually outrun any amount of alignment — mission-fit people leave too, they just leave slower and sadder. Fit is the multiplier, not the substitute.`,
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

That's why our fit scores work the way they do — they read the overlap between what you've declared and what the job declares. Sharpen your declarations and the green pills follow. The perfect match starts with telling the truth in public.

Consider what happens mechanically when both sides sharpen their signals. A candidate adds three honest titles to her profile instead of one; her match surface triples. An employer adds a salary range to a posting; applications rise and — more importantly — the wrong applicants self-select out, saving everyone's time. Each act of specificity does double duty: it attracts the right party and repels the wrong one. Vagueness does the opposite twice.

This is also why "spray and pray" fails in a mission-driven market. Fifty generic applications signal nothing except volume. Five applications with tailored resumes, each engaging the employer's actual mission, send the strongest signal there is: I chose you on purpose. In a community where everyone eventually knows everyone, deliberateness compounds into reputation.

The platform's job — our job — is to make the signals legible: structured profiles, honest postings, fit scores that surface overlap. But no algorithm can invent a signal you didn't send. Write the truth about yourself in public, in detail, and the matching gets shockingly easier.`,
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

Read resumes to qualify. Hire on direction, motive, and character. Paper qualifies; person performs.

The failure mode has a name in hiring circles: credential capture. A stellar resume walks in and the interview quietly becomes a confirmation exercise — every answer heard generously, every doubt suppressed, because surely someone this qualified is right. The discipline that prevents it is boringly procedural: written criteria before you meet anyone, the same questions for every candidate, and a scoring conversation where "what evidence did we see?" outranks "how did they strike you?"

For candidates with modest paper, the inverse lesson is encouraging: you beat stronger resumes by supplying what paper can't. Bring artifacts — the curriculum you wrote, the event plan, the before-and-after numbers. Offer a working session: teach a demo lesson, sketch a comms calendar for their actual parish. Every artifact moves the decision from resumes, where you lose, to evidence, where you might win.

And a caution for both sides: the inverse error exists too. Romanticizing the underdog is credential capture upside-down. The point isn't that paper lies — it's that paper is one witness, and wise hiring calls several.`,
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

Notice that four of the five are knowable before the offer. Most bad matches weren't unlucky — one side skipped a signal and hoped. Check all five, every time.

The 20% stretch deserves elaboration because both sides misjudge it. Candidates chronically overestimate how much stretch they want — the role two sizes up flatters in the interview and crushes by October. Employers underestimate how much stretch retains — the perfectly-sized hire is bored in a year, and boredom resigns politely. The sweet spot: the candidate can do 80% of the job on day one and is genuinely excited to grow into the rest with support that actually exists.

"Honest logistics" also hides the most preventable failures. The 55-minute commute that was "fine" in the offer glow becomes the reason for departure eighteen months later. The salary that required a spouse's second job becomes a slow leak in the family. Say the hard numbers out loud in the final conversation — both sides — because the offer glow is exactly when nobody wants to.

Use the five signals as a literal checklist in your final interview or your final deliberation. Any signal you can't check gets one direct question before signing. Matches rarely fail from the unknowable; they fail from the unasked.`,
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

The score serves one purpose: pointing your attention where it's most likely to be returned. Keep your profile honest and current, and let the green pills do your searching.

A few honest limits, because trust requires them. The score reads your declared preferences, not your soul — it can't know that you'd bend your "full-time only" rule for the right parish, or that "Youth Minister" undersells the range of what you'd love. That's why a red pill is information, not a verdict: it means "this differs from what you told us," and sometimes the right response is updating what you told us.

The score also can't yet read the deepest layer — the actual content of your experience against the actual demands of the role. That upgrade is coming: with resumes as structured data, scoring will weigh what you've done, not just what you've declared. The pills will keep the same colors and get quietly smarter.

Meanwhile, two habits get the most from the current system. Recheck your profile quarterly — profiles go stale the way resumes do, and a stale profile scores stale matches. And when a green pill surprises you, give it a real look before dismissing it: the arithmetic occasionally knows your breadth better than your self-image does.`,
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

The mission-driven hiring world is small. Say more, search wider, respond faster — the person you're looking for is probably looking back.

Two more misses round out the pattern. Geography pride: candidates hard-limit their search to one metro while the ideal role sits ninety minutes away with a pastor who'd happily flex two remote days — and employers never mention the flexibility because nobody asked. Put your true radius and your true flexibility in writing, both of you.

Title inflation and deflation: the parish calling its 30-hour role "coordinator" when the duties are director-level scares off exactly the experienced candidates it needs; the candidate calling herself "volunteer" when she ran the program for six years files herself under the wrong shelf. Titles are search keys — choose them for accuracy, not modesty.

The meta-fix for all of these is the same uncomfortable act: publishing more truth than feels natural. The salary you'd actually pay. The titles you'd actually accept. The flexibility that actually exists. Every withheld detail feels safe and costs a match. In a market this small and this mission-bound, the bold truth-tellers clear first — watch the postings with salary ranges fill while the "competitive compensation" ones age.`,
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

Ninety days of small kept promises turns a good decision into a great tenure. The match was on paper; the fit is built in person.

A week-by-week sketch helps. Weeks 1-2: learn names, systems, and the unwritten calendar; ask "how does this usually go?" before proposing how it should go. Weeks 3-6: ship the first visible win — small, finished, and useful beats large and half-done. Weeks 7-12: take real ownership of one domain and give your manager the recurring one-page update they didn't know they wanted. Somewhere in there, schedule the 45-day conversation yourself: "what's working, what should I adjust?" Asking early converts small misalignments before they compound.

New hires also carry a listening duty: the first ninety days are the only time you'll ever see the organization with outsider eyes. Keep a private list of everything that confuses you. Half will make sense by Christmas; the other half is your improvement agenda for year one — offered humbly, once you've earned the standing.

Employers, one addition to the checklist: assign a peer guide who isn't the boss. The question a new hire won't ask a manager ("is it always like this in Advent?") flows easily to a colleague, and answered questions become retained employees.`,
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

Nothing in that story required luck. Every step is copyable.

It's worth naming what each party resisted, because the temptations are universal. The parish resisted padding the posting — no "competitive salary" evasion, no wish-list of twelve requirements for a role that needed four. Anna resisted the spray: she applied to three jobs that season, not thirty, and it showed in every tailored line. Both resisted rushing the discernment; two weeks of mutual diligence beat the false urgency that produces eighteen-month tenures.

Notice also the small structural choices that carried weight. The rehearsal audition let Anna's actual gift speak — résumés can't conduct. The pastor's honest answer about sacrifices told her the mission had receipts. The named mentor and the year-one goal turned "welcome aboard" from sentiment into scaffolding.

None of this required a big budget — a parish of any size can copy every step this week: write the honest posting, design one working audition, prepare one true answer about cost, name one mentor. Belonging isn't a mystery that happens to lucky hires. It's hospitality, engineered.`,
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

Don't apologize for wanting your work to matter. You were built that way on purpose.

The objection writes itself: "meaning doesn't pay the mortgage." True — and the tradition never asked you to choose. Providing for your family is itself meaningful work, arguably your first mission; a father taking the higher-paying job for his children's sake hasn't abandoned meaning, he's located it. The trap isn't earning well. The trap is the job that pays adequately and means nothing and quietly convinces you that's all work is.

Watch for the symptoms of meaning-deficit, because they masquerade as other things: the Sunday-night dread that isn't about workload, the cynicism that arrives before age forty, the strange fatigue of days that weren't hard. People medicate these with vacations and job-hops, but the underlying condition — effort disconnected from purpose — travels with them.

The repair can start small, this week: write one sentence connecting your work to a good you believe in, and read it before you open your inbox. If you can't write the sentence — if no honest version exists — that's not a prompt for despair. It's a prompt for a job search, and you're in the right place for one.`,
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

Vocation isn't a category of jobs. It's a posture toward work — and a criterion for choosing it.

Paul's audience makes the verse sharper. He was writing, in part, to bondservants — people with no career options, no LinkedIn, no exit. To them he said: your work, even this work, can be offered to the Lord and it will count. If the verse could dignify labor under those conditions, it can certainly dignify your spreadsheet. But notice it never romanticizes the conditions — elsewhere the same Paul tells masters their obligations and slaves to gain freedom if they can. Offering your work to God and improving your working conditions are not rivals.

"With all your heart" also rebukes a subtle temptation in religious circles: treating excellence as worldly. The Christian who does shoddy work while talking piously has inverted the verse — heartless work, heartfelt talk. The tradition's craftsmen knew better: the cathedral carvers finished the backs of statues no one would see, because Someone would.

Try the verse as a daily examen for a week. Each evening, one question: what part of today's work could I honestly have offered up, and what part was I just enduring? The pattern that emerges is your vocational compass, pointing at what to grow and what to change.`,
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

If you can't draw the line from Monday to Sunday, that's not a mood — it's data. Follow it.

Integration has practical architecture, not just sentiment. Morning offering before the commute — thirty seconds that files the whole day under intention. An examen on Friday afternoon: where did this week's work serve, where did it just spin? Grace before the lunch you eat at your desk. These micro-practices sound small because they are; their power is repetition, the same way compartmentalization was built by a thousand unexamined Mondays.

The workplace itself offers material. Every colleague is someone to will the good for — the tiresome one most of all. Every deadline is a chance to do ordinary things with extraordinary care, which a wise saint called the whole program. You don't need a chapel down the hall to work in the presence of God; you need the intention, renewed more often than feels natural at first.

And when you evaluate your next role, add the integration question to your list alongside salary and commute: will this job let me be one person? Jobs that demand a weekday self estranged from your Sunday self charge rent on your integrity. Whatever they pay, subtract that.`,
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

And if the well is truly dry — if the organization's purpose and yours will never touch — begin the patient work of leaving well. Quiet burnout doesn't fix itself. It just gets quieter.

Diagnose before you treat, because quiet burnout has look-alikes. Sometimes the job is meaningful and you've simply lost sight of the chain — a season of drudge tasks obscured who's served, and the fix is reconnection, not resignation. Sometimes the problem is a manager, not a mission; don't leave a good purpose over a bad boss without at least attempting the honest conversation. And sometimes it's life-stage exhaustion wearing work's clothing. The test question: "if I were rested and appreciated, would this work matter to me?" If yes, repair. If no, plan.

When the answer is plan, do it like an adult with obligations: eighteen-month runway, skills sharpened on the current employer's clock (legitimately — take the training, lead the project), debts trimmed, and a specific target list rather than a vague escape wish. Quiet burnout's greatest danger is that it produces desperate, poorly-chosen exits into jobs that are differently meaningless.

And tell someone. Burnout of every volume isolates, and isolation ratifies its lies. A spouse, a director, a friend in your field — the mere act of describing the flatness out loud is often the first day it starts to lift.`,
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

You don't need a monastery. You need a rule — a deliberate shape for how work fits a life aimed at God.

The Rule's most transferable tool might be the bell itself. Benedict's monks stop mid-sentence when it rings — the work is interrupted on purpose, hourly, to remember what the work is for. Your version needn't be liturgical: a phone alarm at noon for the Angelus, a hard stop at six that you keep like an appointment, a Sabbath that email cannot breach. The schedule is the spirituality. Nobody drifts into balance; it's built, in advance, in the calendar.

Benedict also insists that tools of the monastery be treated "as vessels of the altar" — the hoe and the chalice get the same reverence. Applied today: the shared spreadsheet, the school van, the donor database are not beneath your care. Sloppiness with common things is a spiritual tell, and so is its opposite.

Even stability, the strangest vow to modern ears, has a portable core: commit somewhere long enough to be changed by it. You can honor that in five-year seasons rather than lifetimes — but the person with four one-year stints has been introduced to four communities and formed by none. Depth requires staying past the point where novelty runs out. That's precisely where the Benedictines say the good part starts.`,
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

Stop waiting for a lightning bolt. Look at your gifts, your neighbors, and your fruits. The call is usually already in your hands.

The three marks work as a diagnostic when something feels off, too. Gifts without service curdles into mere self-expression — the job that showcases you but helps no one eventually echoes. Service without gifts is generous burnout — the volunteer-turned-employee grinding away at tasks God gave someone else the hands for. Service plus gifts without confirmation deserves attention: if everyone who loves you winces at what the job does to you, humility says collect more data.

Notice also that callings have seasons. The classroom that was unmistakably your vocation for fifteen years may release you; the ledger that was "just a job" may deepen into one as your mastery turns into mentorship. Vocation isn't a one-time assignment sealed at twenty-five — it's a conversation, and conversations continue.

A practical exercise for the unsure: for one month, keep a two-column log. Left: moments at work when you felt most alive and useful. Right: moments of deadness. At month's end, the left column is a map of your gifts in their natural habitat. Whether it points at your current job, a different one, or the same job held differently — it's the most honest career counseling available, and it's free.`,
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

So negotiate without guilt at mission-driven employers; they need sustainable hires, not martyrs. And count meaning honestly in every offer — it's not a discount you accept, it's value you receive. The goal isn't a trade-off. It's a life where the paycheck and the purpose both hold.

Run the actual arithmetic on both sides, because vagueness is where the myth lives. Candidates: price the meaning honestly — if the mission job pays $12K less, that's $1,000 a month; against it, weigh the commute, the healthcare, what the flat feeling of the current job costs your family in your presence and mood. Sometimes the mission job loses that math and declining it is stewardship, not betrayal. Sometimes it wins by a mile and the only obstacle was an unexamined number.

Employers: audit the quiet discount you may be charging. List what your people forgo against market — then ask what you're returning beyond the mission itself: real flexibility, real development, real voice, benefits a corporation wouldn't bother with. If the honest answer is "mostly the mission," you're not running on meaning; you're running on your best people's savings accounts, and the invoice arrives as turnover.

The healthiest sentence either side can say in a negotiation: "the mission matters to me, and I need the number to work." Anyone who hears that as a contradiction — on either side of the table — is still inside the myth.`,
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

The catechism of work is taught at your kitchen table, and you're the professor. Teach the version you'd want them to live.

The curriculum is mostly involuntary, but parts can be taught on purpose. Bring the kids to work once a year if you can — let them see the classroom, the office, the site, and meet one person you serve or serve alongside. Narrate your work decisions at their altitude: "I took this job because it lets me help families keep their homes" is a sentence a seven-year-old files away forever. Let them see you rest, too — the parent who never stops teaches that work is a god, which is its own bad catechism.

Include the hard chapters, edited for age. A season of unemployment, honestly framed — "we're trusting God and I'm working hard to find the next place" — teaches more about providence and dignity than a decade of smooth commutes. Kids don't need your career to be impressive; they need your relationship to it to be truthful.

And when they're older, the dinner table is where discernment gets modeled: talk through your actual crossroads out loud, prayer and spreadsheet both. The child who watches a parent turn down money for mission — or take money for the family's sake, and explain why both can be faithful — has received a complete education in vocation before ever writing a resume.`,
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

None of these can be faked in an hour, which is exactly why employers probe them. The good news: if the fit is real, all four are easy. Just tell the truth with specifics.

Watch how the four channels surface in real interview moments. Fluency: "Tell me what you think we're trying to do here" — the candidate who answers with the website's exact phrasing scores lower than the one who says something imperfect in their own words. History: the interviewer flips to the Faith & Service section first, not last, looking for dates that predate the job search. Cost awareness: "This role includes managing volunteers who don't show up. How does that land?" — the brochure-lovers flinch; the realists smile in recognition.

Reciprocity is the least understood, so employers ask it sideways: "What would you get out of this role?" Candidates trained to answer selflessly ("I just want to serve") actually worry them — selflessness with no fuel source has a two-year burn rate. The reassuring answer names a real personal stake: growth toward a credential, a gift finally used at full stretch, a season of life this work fits.

If you're the candidate, don't game the checklist — inhabit it. Before the interview, write your own four answers honestly. If one is empty, that's not a scripting problem. It's the discernment doing its job early.`,
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

One interview is enough — if you spend it on these four channels instead of a resume walk-through.

There's a fifth channel experienced interviewers add: how candidates talk about previous employers. The mission-driven candidate criticizes carefully and credits generously, even where they were hurt — because they see institutions as communities of people rather than career equipment. The candidate who torches their last parish in the interview will torch yours in three years, and the room knows it.

Two cautions keep the radar honest. First, don't confuse polish with mission — articulate extroverts can perform purpose brilliantly for an hour, while a shy candidate with twenty years of quiet service stumbles over the "why us" question. Weight the history over the eloquence; the record doesn't get nervous. Second, don't let the radar become a piety contest. You're hiring for this role's mission, not canonizing anyone — the bookkeeper needs to love accuracy in service of the parish, not preach.

Structure beats instinct in the end: put the four questions in every interview script, ask them of every candidate identically, and write down evidence rather than impressions. The radar metaphor is romantic, but the checklist is what keeps it fair — and legally defensible.`,
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

Skills depreciate and refresh. Mission alignment compounds. Hire the asset that appreciates.

The principle needs its boundary stated plainly: some skills gates are absolute, and pretending mission covers them is its own failure. The unqualified-but-devout teacher costs children a year of learning; the beloved volunteer promoted past their competence becomes a beloved crisis. "Hire for mission, train for skill" assumes the skill is genuinely trainable within the season the organization can afford. Ask that question explicitly for every role: what's the true ramp time, and can we carry it?

Where the principle earns its keep is the genuine tiebreak — and in building the training muscle that makes it usable. Organizations that hire for mission but never budget for development are writing checks their onboarding can't cash. The pair travels together: choose the aligned candidate, then actually build the skill — mentoring, courses, protected learning time, patience measured in quarters.

There's a compounding effect on the roster, too. Every mission-first hire raises the odds the next great aligned candidate says yes, because people can smell their future colleagues in the interview. Credential-first shops assemble impressive strangers. Mission-first shops assemble a people — and a people, over a decade, out-executes a talent pool.`,
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

Candidates: don't hide your Catholic life on a Catholic job board — organize it. Employers: say in your postings what you actually value, so candidates know to show it.

The second lens has a few more filters worth knowing. Stability reads differently here: the corporate world forgives job-hopping as ambition; parish and school employers, whose communities absorb every departure, quietly prize the candidate with five-year chapters. If your resume hops for good reasons — spouse relocations, mission years, a bad-fit escape — one clause of context ("relocated for spouse's residency") converts a red flag into a shrug.

Names and places carry information too. The reviewer likely knows your former parish, your pastor, possibly your third-grade catechist — the Catholic world is a small town wearing a big map. This cuts both ways: verifiable service builds instant trust, and any inflation will eventually meet someone who was in the room. Write accordingly.

One more difference: the cover letter survives here. In corporate pipelines it's often skipped by software and humans alike; in a parish office, a warm specific letter is frequently read before the resume and sets the frame for everything after. The 200-word version — one true compliment, one proof point, one honest close — is disproportionately powerful precisely where you want to work.`,
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

Most of all: parish jobs are real jobs. The best applications treat a parish with the same professionalism as a company — resume tailored, references ready, questions prepared — while grasping that the bottom line here is measured in souls served.

The list continues past the top four. They wish candidates read the bulletin before the interview — fifteen minutes with three months of bulletins tells you the parish's actual priorities, festivals, finances, and griefs, and the candidate who references them stands out instantly. They wish "what does success look like in year one?" got asked more, because it's the question that proves someone plans to stay. They wish salary expectations came up honestly at the first conversation, not the last — parish budgets have no room for a late-stage surprise, and neither does your mortgage.

On the employer's own side of the ledger, the wish is for grace about the seams: the interview interrupted by a funeral, the offer letter delayed by a finance council vacation, the job description last updated when the previous pastor was new. Small organizations show their seams; candidates who treat the seams with warmth rather than judgment reveal exactly the temperament parish work requires.

The meta-wish underneath all of it: that both sides would treat parish hiring as what it is — serious employment in service of something eternal. Professional standards and supernatural purpose, together. Candidates who bring both halves are the ones whose names get passed between parishes for years.`,
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

Get the framework right once, write it down, and mission-fit hiring becomes both principled and safe.

A few practical structures keep organizations on the right side of their own principles. Write role-by-role religious criteria before posting, with reasons: the theology teacher transmits doctrine (faith requirement clearly tied to function); the facilities manager stewards a sacred space (mission respect required; personal faith optional). When criteria are documented in advance, decisions become defensible and — just as important — consistent, so the answer doesn't drift with whoever interviews that day.

Train everyone who touches interviews, including the volunteer search committee and the well-meaning parishioner on the panel. Most legal exposure comes not from policy but from an unscripted moment — the friendly question about someone's kids, the assumption spoken aloud. A one-page "we ask / we never ask" sheet, reviewed before every interview cycle, prevents the majority of it.

And treat candidates' religious information with the gravity it deserves: it's sensitive data, shared in trust. Collect only what the role justifies, store it carefully, and never let it leak into small talk. Organizations that handle mission requirements with visible professionalism send a message to every candidate — including the ones they don't hire — that this is a place where serious things are done seriously. That reputation is itself a recruiting asset.`,
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

Pay fairly for alignment. It's not sentiment — it's the best deal in the budget.

The arithmetic sharpens when you price discretionary effort directly. Two employees, identical salaries: one does the job description; the other also notices the failing donor pipeline, mentors the new hire through a rough October, and catches the scheduling error before it becomes a parent-facing crisis. The second employee's extra contribution — invisible in any payroll system — is routinely worth 20-30% of salary. Mission alignment is the most reliable predictor of who becomes that second employee, which means paying 10% above your instinct for a mission-fit hire is buying value at a discount.

The recruiting flywheel deserves numbers too. A parish school known for treating aligned staff well fills openings in weeks from warm referrals; the school known for burning through idealists pays recruiters, runs longer vacancies, and settles more often. Reputation in a tight-knit community is a compounding asset with direct payroll consequences — in both directions.

None of this argues for reckless generosity; small-organization budgets are real. It argues for precision: spend your limited compensation dollars preferentially on demonstrated mission fit, state plainly in offers why you're doing so, and watch the retention math quietly outperform every cost-saving instinct that produced the old churn.`,
  },

  // ---------- Catholic Jobs Guide (search-focused) ----------
  {
    slug: "catholic-jobs-near-me",
    title: "Catholic Jobs Near Me: How to Find Faith-Based Work in Your Area",
    category: "Catholic Jobs Guide",
    image: "/blog/open-field.jpg",
    daysAgo: 1,
    excerpt: "Every diocese is an employment network hiding in plain sight. Here's how to search yours.",
    body: `Searching "Catholic jobs near me" returns a strange mix — because Catholic employment is scattered across parish websites, diocesan HR pages, school systems, and general job boards that don't understand the category. The work exists; the indexing doesn't. Here's how to actually search your area.

Start with your diocese. Every diocese in the U.S. maintains some form of employment page covering its offices, parishes, and often its schools — and most parish openings that never reach the big boards land there. Bookmark it and check weekly; diocesan HR pages update on office schedules, not algorithms.

Then think in institutions, not job titles. Within driving distance you likely have parishes, one or more Catholic schools, possibly a Catholic hospital system, Catholic Charities, a pregnancy center, a Newman center, religious orders, and Catholic-owned businesses. Each is an employer. List them, find their careers pages, and you've built a local search engine no algorithm offers.

Third, work the network the way the network actually works: the parish bulletin, the pastor's announcements, the Knights council, the school auction committee. A remarkable share of Catholic hiring happens through "we know someone" — being known is a search strategy.

And of course, use a board built for exactly this. Jobs For Catholics aggregates mission-driven employers and lets you filter by location, category, and work setting — plus fit scores that tell you which local openings actually match your profile. Set your city and state in your candidate profile, turn on alerts, and "near me" stops being a search phrase and becomes an email that arrives when something opens down the road.`,
  },
  {
    slug: "what-counts-as-a-catholic-job",
    title: "What Counts as a Catholic Job? A Complete Guide to Faith-Based Careers",
    category: "Catholic Jobs Guide",
    image: "/brand/hero-church-windows.jpg",
    daysAgo: 3,
    excerpt: "It's a bigger category than parish work — and smaller than 'any job a Catholic holds.'",
    body: `"Catholic job" gets used to mean everything from ordained ministry to any desk a Catholic happens to occupy. For a job search, a working taxonomy helps — because each tier hires differently.

Tier one: roles that transmit the faith directly. Priests and religious, obviously, but also lay ecclesial ministers — directors of religious education, youth ministers, campus ministers, theology teachers, music directors. These roles usually require practicing Catholics, often with credentials in theology or ministry, and employers may lawfully require fidelity to Church teaching.

Tier two: roles inside Catholic institutions that don't teach doctrine — the school's math teacher and business manager, the hospital's nurses, the diocese's accountant, Catholic Charities' case workers. Requirements vary: some employers ask all staff to support the mission; others simply ask for respect toward it. This tier is far larger than most job seekers realize, and it's where most "Catholic jobs" actually live.

Tier three: Catholic-owned businesses and apostolates — publishers, media, devotional goods, faith-driven companies of every kind. Legally ordinary employers, culturally distinct workplaces.

Tier four — and don't dismiss it — any honest work done Catholicly. The tradition insists secular work sanctified by intention is vocation, full stop.

Practical takeaway for your search: decide which tiers fit your gifts and credentials, then search accordingly. A theology degree opens tier one; an accounting license opens tier two everywhere; a marketing portfolio opens tier three. On our board you'll find all three tiers represented — filter by category, and let your profile's fit scores show you which tier is calling loudest.`,
  },
  {
    slug: "catholic-church-jobs-parish-roles",
    title: "Catholic Church Jobs: Every Role a Parish Actually Hires For",
    category: "Catholic Jobs Guide",
    image: "/blog/church-candles.jpg",
    daysAgo: 6,
    excerpt: "A working parish is a small enterprise. Here's the full org chart most job seekers never see.",
    body: `Ask someone what jobs exist at a Catholic parish and they'll name the priest and maybe "the secretary." A functioning parish is actually a small enterprise — often the size of a mid-sized business — and it hires across a surprising range.

The pastoral side: directors of religious education, youth ministers, RCIA/OCIA coordinators, family life ministers, pastoral associates, sacramental coordinators. The liturgical side: music directors, organists, cantors, sacristans, liturgy coordinators. The operational side — where the most overlooked openings live: business managers, bookkeepers, office managers, administrative assistants, communications coordinators, database and stewardship staff, facilities and maintenance technicians, cemetery staff, event coordinators.

Larger parishes add development directors, IT support, safe-environment coordinators, and school liaisons. Parish schools multiply the list again with principals, teachers, aides, counselors, and coaches.

Three things to know about parish hiring. It's seasonal: education and ministry roles cluster in spring for fall starts; operational roles open year-round. It's relational: postings often circulate in bulletins and diocesan pages before anywhere else. And it's stretchy: parish job descriptions flex around the person hired — the communications coordinator who can also photograph events becomes indispensable.

If parish work calls to you, build your candidate profile with every title you'd accept — coordinator, associate, director variants included — because parishes name the same job a dozen ways. Set your categories to Ministry, Music & Liturgy, or Administration, and watch the fit scores sort your local parish openings from best match down.`,
  },
  {
    slug: "catholic-school-jobs-hiring-timeline",
    title: "Catholic School Jobs: The Complete Hiring Timeline (and When to Apply)",
    category: "Catholic Jobs Guide",
    image: "/blog/teacher-class.jpg",
    daysAgo: 9,
    excerpt: "Catholic schools hire on a calendar. Miss it and you wait a year; learn it and you're early.",
    body: `Catholic school hiring runs on an academic clock, and knowing it is half the search. Here's the year as principals actually live it.

January-February: budgets settle and contracts go out to current staff. Principals learn who's leaving. The sharpest candidates introduce themselves now — before postings exist — with a short letter and resume: "if an opening emerges for next fall, I'd love to be considered."

March-May: peak posting season. The bulk of teaching openings for August start dates appear in these three months. Apply fast; Catholic schools often interview on a rolling basis and close when they find their person, not when a deadline passes.

June-July: the second wave — late resignations, enrollment surprises, and the openings created when a school's first choice took another offer. Candidates still searching in June shouldn't despair; schools hiring in June can't afford to be slow, and good candidates get grabbed in days.

August: the scramble. A resignation two weeks before school starts makes a principal call every contact they have. If you're available and known, this is when phones ring.

Year-round: aides, substitutes, coaches, after-care staff, and mid-year openings from life's usual interruptions. Substituting, by the way, remains the single best audition for a full contract — principals hire the sub they've watched over the stranger with the better resume.

Administrative searches (principals, presidents) run earlier — often the fall before. And everything above shifts a few weeks by region and diocese. Build your profile now, set alerts for Education, and let the calendar work for you instead of discovering it a season late.`,
  },
  {
    slug: "remote-catholic-jobs",
    title: "Remote Catholic Jobs: Working for the Church From Anywhere",
    category: "Catholic Jobs Guide",
    image: "/brand/working-laptop.jpg",
    daysAgo: 12,
    excerpt: "The Church went remote too. Here's where the real work-from-home Catholic jobs are.",
    body: `"Remote Catholic jobs" used to be a nearly empty search. Not anymore. Catholic organizations discovered distributed work along with everyone else, and a real remote job market now exists for candidates whose location and vocation don't line up.

Where the remote roles actually are: communications and digital — social media managers, content writers, video editors, and web developers for apostolates, dioceses, and Catholic media. Development — grant writers, donor database managers, and campaign staff work remotely for organizations nationwide. Administration — bookkeeping, virtual assistance, and registrar work for schools and nonprofits. Technology — Catholic publishers, ed-tech, and app teams hire fully remote engineers and designers. Education — online Catholic schools and homeschool programs employ remote teachers and tutors. And the freelance layer: musicians, designers, writers, and consultants serving many parishes from one desk.

What's rarely remote, honestly: ministry that happens to people in rooms — youth ministry, sacramental prep, liturgy, teaching in physical classrooms. Hybrid arrangements exist, but presence is the job.

Remote Catholic work carries a particular challenge worth naming: mission connection thins over distance. The best remote-friendly Catholic employers counter it deliberately — team prayer on video, annual in-person gatherings, missions kept vivid in every meeting. Ask about that rhythm in interviews; its absence predicts the drift.

On our board, filter any search by Remote work setting — or set your profile's work modes to include Remote and let fit scores surface every work-from-anywhere opening automatically. The Church's work now travels over wires too, and somebody faithful has to do it. It might as well be you.`,
  },
  {
    slug: "catholic-jobs-no-theology-degree",
    title: "Catholic Jobs That Don't Require a Theology Degree",
    category: "Catholic Jobs Guide",
    image: "/blog/meeting-office.jpg",
    daysAgo: 16,
    excerpt: "Most Catholic jobs aren't theology jobs. Your existing skills are probably already wanted.",
    body: `The most common misconception about Catholic employment: that it's for theology graduates. Walk through any diocese's payroll and the opposite appears — the majority of Catholic jobs run on skills learned everywhere else.

Every Catholic institution needs money managed: bookkeepers, accountants, business managers, finance directors. Every one needs communication: writers, designers, social media managers, videographers. Buildings need facilities staff, trades, and groundskeepers. Schools need not just teachers but registrars, admissions staff, counselors, coaches, nurses, and IT. Catholic healthcare employs every clinical and administrative role a secular hospital does. Catholic Charities and pregnancy centers need case workers, drivers, warehouse coordinators, and grant writers. Development offices need fundraisers and event planners. And Catholic-owned businesses need everything businesses need.

What these employers ask for, in place of a theology degree, is usually one of three postures depending on the role: active practice of the faith, general support for the mission, or simple respect for it. Job postings state which — and if they don't, ask; it's a fair and expected question.

Two genuine advantages non-theology candidates bring: outside professionalism (parishes and nonprofits often hunger for the operational discipline you take for granted) and durability (you're not competing for the small pool of ministry titles, so your search moves faster).

The move: search by your existing skill category — Administration, Communications, Trades, Technology, Nonprofit — rather than by "Catholic." Set your profile accordingly and let the fit scores match your actual resume to the mission-driven employers who need exactly it. The Church has always run on more than theologians. It runs on people who can close the books, fix the boiler, and tell the story.`,
  },
  {
    slug: "entry-level-catholic-jobs",
    title: "Entry-Level Catholic Jobs: Where to Start a Faith-Based Career",
    category: "Catholic Jobs Guide",
    image: "/blog/laptop-writing.jpg",
    daysAgo: 20,
    excerpt: "No experience, real faith, ready to work? Here's the actual on-ramp map.",
    body: `Every field has its on-ramps, and Catholic employment is no different — though nobody hands you the map. Here it is.

The classic first jobs: parish administrative assistant (the single best view of how a parish actually runs), school aide or after-care staff, youth ministry assistant, development or communications assistant at a diocese or nonprofit, direct-care roles at Catholic Charities, and camp or retreat staff — the summer job that has launched a thousand ministry careers.

The volunteer-to-hire pipeline is real and unusually strong in Catholic institutions. The catechist becomes the DRE's assistant; the festival volunteer becomes the events coordinator; the choir member becomes the part-time cantor. Institutions hire people they've watched. If you're aiming at a particular parish or school, six months of visible, reliable volunteering is often worth more than a credential.

Mission years deserve special mention: NET Ministries, FOCUS, Totus Tuus, Christ in the City, and similar programs function as the Catholic world's graduate school of practical ministry. Alumni networks run deep, and "served two years with NET" opens doors for decades.

Entry-level honesty: pay starts modest — often $15-20/hour or low-thirties salaried. Offset it by learning greedily: volunteer for the database, the livestream, the grant report. Skills stack fast in small organizations because nobody stops you from taking on more.

On the board, filter by Internship, Part-time, and Volunteer job types to surface on-ramps, and keep your profile categories broad at this stage — your first Catholic job is mostly about getting inside the walls. Direction comes after.`,
  },
  {
    slug: "how-much-do-catholic-jobs-pay",
    title: "How Much Do Catholic Jobs Pay? An Honest Salary Guide by Role",
    category: "Catholic Jobs Guide",
    image: "/blog/notebook-pen.jpg",
    daysAgo: 25,
    excerpt: "Real ranges, real trade-offs, and how to negotiate without guilt.",
    body: `Nobody publishes an honest salary guide for Catholic work, so rumors fill the gap — either "it pays nothing" or uncomfortable silence. Here are real ranges as of this writing, with the caveats that region, diocese, and organization size move every number.

Parish roles: administrative assistants $30-42K; bookkeepers and office managers $38-55K; DREs and youth ministers $35-55K; music directors $40-65K full-time (often part-time or stipended); business managers $55-85K. Schools: Catholic school teachers commonly run 10-30% below their public-district neighbors — $38-60K for most classroom roles — with principals $70-110K. Diocesan professional staff (finance, HR, communications) track nonprofit market rates: $50-90K for managers, more for directors. Catholic healthcare pays market clinical rates — nurses lose nothing by choosing the Catholic hospital. Nonprofits and apostolates vary widest: development directors $60-105K, case workers $35-50K. Catholic business jobs simply pay what the business pays.

Beyond the number, weigh the whole compensation: school tuition discounts for staff children (worth thousands per kid), housing at some parishes, genuine schedule flexibility, pensions in some diocesan systems, and the non-trivial value of work you believe in.

Now the negotiation permission slip: mission-driven employers need sustainable employees, not martyrs whose finances quietly collapse. Asking for the top of a posted range, or for a review at six months, is professional behavior — and the healthy employers respond professionally. On our board, look for postings with published ranges (and employers: publish yours — it's the single strongest signal of an honest shop).`,
  },
  {
    slug: "catholic-nonprofit-jobs",
    title: "Catholic Nonprofit Jobs: From Apostolates to Charities",
    category: "Catholic Jobs Guide",
    image: "/blog/praying.jpg",
    daysAgo: 30,
    excerpt: "The Church's works of mercy have payrolls. Here's the landscape beyond parish walls.",
    body: `Between the parish and the purely secular nonprofit lies a vast Catholic middle: organizations doing corporal and spiritual works of mercy at professional scale. If your calling is service more than sanctuary, this is your job market.

The landscape: Catholic Charities affiliates — among the largest social-service networks in the country — hire case managers, counselors, refugee resettlement staff, housing specialists, and every operational role that supports them. Pregnancy resource centers hire client advocates, nurses, sonographers, and center directors. St. Vincent de Paul societies and Catholic food banks run warehouses, thrift operations, and volunteer programs with paid staff. Religious orders operate schools, retreat centers, and eldercare with lay professionals throughout. Apostolates — media, evangelization, campus outreach — hire communicators, fundraisers, and program staff. And the ecosystem's connective tissue: foundations, diocesan mission offices, and national organizations from the bishops' conference to the Knights.

What distinguishes Catholic nonprofit work from parish work: the pace is programmatic rather than liturgical, funding is grant-and-donor-driven (making development skills golden), and teams often mix Catholics with colleagues of every faith united around the mission's works.

What to bring: any human-services credential travels well; so do fundraising, volunteer management, and grant writing. What to ask in interviews: how the Catholic identity concretely shapes the work — the answer tells you whether you're joining an apostolate or a generic agency with a saint's name.

Search the Nonprofit category on the board, and note which employers publish their mission in their postings with specificity. The ones who can say exactly whom they serve are the ones worth serving.`,
  },
  {
    slug: "catholic-jobs-for-career-changers",
    title: "Catholic Jobs for Career Changers: Bringing Your Skills to the Church",
    category: "Catholic Jobs Guide",
    image: "/brand/employer-2.jpg",
    daysAgo: 35,
    excerpt: "Mid-career and mission-hungry: the Church needs exactly what you already know how to do.",
    body: `Somewhere in year twelve of a perfectly fine career, a certain kind of Catholic starts doing math at Mass: how many working years remain, and what are they for? If that's you, here's the encouraging truth — the career-changer is Catholic employment's most valuable import, because institutions rich in mission are frequently poor in exactly the professional disciplines you've spent a decade mastering.

The high-demand imports: finance and accounting (every diocese and school), project and operations management (parishes merging, schools consolidating, nonprofits scaling), marketing and communications (the Church's perennial gap), HR (small institutions desperately need grown-up hiring practices), IT and data (parish systems run decades behind), and sales — which translates directly into development, the most chronically understaffed function in Catholic life.

The transition playbook, condensed: start volunteering your professional skill now, where you worship — the finance council, the school board, the capital campaign. It converts your resume from "outsider with intentions" to "known contributor." Expect and plan for the pay adjustment; run the family math before the interview, not after the offer. Translate your resume into mission terms and add the Faith & Service section corporate formatting taught you to omit. And target tier-two roles first — operational positions inside Catholic institutions — where your skills transfer at full strength while you learn the culture.

Timeline honesty: the move typically takes six to eighteen months from decision to desk. Build your profile now with your real titles and your target categories both, set alerts, and let the fit scores flag the openings where your first career funds your second calling.`,
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
