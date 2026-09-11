import Link from "next/link";
import Image from "next/image";
import SidebarNav from "../../SidebarNav";

export default function NeuroraArticlePage() {
  return (
    <main className="theme-page min-h-screen px-6 py-14 md:py-20 pt-20 md:pt-20">
      <SidebarNav />

      <article className="theme-surface max-w-5xl mx-auto rounded-3xl border theme-border p-6 md:p-12">
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <Link
            href="/articles"
            className="theme-toggle inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-semibold transition-colors"
          >
            <span className="text-lg">←</span> Back to Articles
          </Link>
        </div>

        <header className="mb-10 border-b theme-border pb-8">
          <p className="text-sm uppercase tracking-widest theme-muted mb-3">
            Book Chapter
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            NEURORA: Mandala-Based Digital Phenotyping for Early Detection of
            Parkinson&apos;s Disease and Alzheimer&apos;s Disease in the Era of
            Artificial Intelligence
          </h1>
          <p className="theme-muted text-lg">Luxin Zhang · February 2026</p>
          <p className="theme-muted mt-2">
            Published in &quot;Where Art and Technology Resonate: Binnovative
            Approaches to Digital Health and Wellbeing&quot;
          </p>
        </header>

        <section className="prose prose-lg max-w-none leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8 text-gray-900 dark:text-gray-100">
            <h2 className="!mt-0 !mb-4 text-gray-900 dark:text-white">
              Abstract
            </h2>
            <p className="!mb-0 text-gray-800 dark:text-gray-200">
              Parkinson&apos;s disease (PD) and Alzheimer&apos;s disease (AD)
              together affect more than 60 million individuals worldwide, both
              characterized by long preclinical phases in which subtle motor,
              visuospatial, and executive dysfunction emerge years before formal
              diagnosis. This chapter introduces NEURORA, an iPad-based digital
              phenotyping platform integrating art therapy methodology with
              high-resolution Apple Pencil telemetry and mathematical signal
              modeling to extract clinically meaningful biomarkers from
              structured mandala drawing. We describe the complete NEURORA user
              experience — from template selection through active coloring
              sessions to longitudinal progress monitoring — alongside the
              mathematical foundations governing mandala geometry generation,
              polar symmetry, and six pen movement models used for kinematic
              analysis. Disease-specific hypotheses for PD and AD, a machine
              learning classification architecture, and a rigorous longitudinal
              validation framework are presented. By bridging structured
              creative activity with computational neuroscience, NEURORA
              proposes a scalable, interpretable, and ethically grounded
              paradigm for early neurodegenerative monitoring that treats
              creative expression and clinical measurement as a unified act.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 !mb-0">
              <strong>Keywords:</strong> digital phenotyping · Parkinson&apos;s
              disease · Alzheimer&apos;s disease · mandala geometry · Apple
              Pencil · kinematics · machine learning · biomarkers
            </p>
          </div>

          <h2>1. Introduction</h2>
          <p>
            Neurodegenerative diseases represent one of the defining healthcare
            crises of the twenty-first century. Parkinson&apos;s disease affects
            approximately 10 million individuals worldwide; Alzheimer&apos;s
            disease and related dementias affect more than 55 million, with a
            new case diagnosed every three seconds (World Alzheimer Report,
            2022). Together, these conditions impose staggering human costs:
            progressive loss of autonomy, profound caregiver burden, and
            economic expenditure projected to exceed $2.8 trillion annually by
            2050. No disease-modifying therapy has achieved regulatory approval
            for either condition, largely because interventions arrive too late
            — after neurodegeneration is already extensive.
          </p>
          <p>
            The neuropathological cascade of AD begins 15–20 years before the
            first cognitive symptom (Jack et al., 2013), while dopaminergic
            neurodegeneration in PD may progress silently for a decade before
            motor signs meet diagnostic criteria (Berg et al., 2021). This long
            prodromal window is simultaneously the greatest clinical challenge
            and the greatest opportunity: detecting disease within this window
            makes early intervention theoretically possible. Artificial
            intelligence has transformed neurological research through pattern
            extraction from MRI, accelerometry, and speech (Arora et al., 2015;
            Jo et al., 2019), yet existing digital monitoring paradigms suffer
            from low longitudinal adherence and insufficient ecological validity
            — particularly for older adults where engagement and emotional
            comfort are critical.
          </p>
          <p>
            NEURORA addresses this problem by transforming mandala drawing — a
            culturally universal creative practice — into a longitudinal digital
            biomarker platform. Rooted in a simple but urgent question: what if
            early care for neurodegenerative disease felt creative, calming, and
            human instead of clinical and late? Every Apple Pencil stroke on a
            mandala template becomes a stream of kinematic data; every session
            adds a data point to an evolving individual trajectory. Participants
            engage because they want to, not because they are asked to.
          </p>

          <h2>2. The NEURORA Application</h2>
          <p>
            NEURORA is a native iPadOS application built with SwiftUI and
            PencilKit, organized around four core modules: Gallery, Community,
            Insights, and Progress. Each module serves both the
            participant&apos;s creative and therapeutic experience and the
            platform&apos;s clinical data collection objectives — without these
            two goals ever appearing to conflict from the participant&apos;s
            perspective. The user interface presents mandala drawing as an art
            activity throughout; clinical language is entirely absent from all
            user-facing screens.
          </p>

          <div className="my-8 rounded-xl overflow-hidden border theme-border">
            <Image
              src="/articles/neurora/mandala-gallery.png"
              alt="Mandala Gallery - templates organized by difficulty tier"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <Image
              src="/articles/neurora/coloring-session.png"
              alt="Active Coloring Session - continuous Apple Pencil telemetry"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="text-sm theme-muted p-4 bg-gray-50 dark:bg-gray-900">
              <strong>Figure 1.</strong> Left: Mandala Gallery — templates
              organized by difficulty tier (Easy, Medium, Hard) with radial
              sector previews and community engagement counts. Right: Active
              Coloring Session — continuous Apple Pencil telemetry captured at
              240 Hz from first touch to completion.
            </p>
          </div>

          <h3>2.1 Template Selection — The Mandala Gallery</h3>
          <p>
            Every NEURORA session begins in the Mandala Gallery (Figure 1,
            left). Templates are organized into three progressive difficulty
            tiers serving dual therapeutic and scientific purposes. Easy
            templates (Simple Circle, Lotus Flower) feature 8-fold radial
            symmetry with wide open regions, minimizing fine motor demands while
            establishing the participant&apos;s baseline kinematic profile.
            Medium templates (Geometric Star, Celtic Knot) introduce 10–12-fold
            symmetry and more intricate region boundaries, increasing
            visuospatial planning demands. Hard templates (Sacred Geometry,
            Complex Mandala) present dense multi-layered patterns requiring
            sustained fine motor control, executive sequencing, and high
            visuospatial precision. Participants begin at Easy and progress
            based on performance metrics — completion consistency, stroke
            efficiency, and score stability — with adaptive progression
            preventing performance anxiety while continuing to challenge
            clinically relevant systems.
          </p>

          <h3>2.2 Active Coloring Session — Data Collection in Action</h3>
          <p>
            Tapping a template opens a detailed preview showing the full
            geometry, difficulty and symmetry-fold tags, and a &quot;Start
            Creating&quot; button. At first pen-down, telemetry begins silently
            — no &quot;recording started&quot; prompt that might alter natural
            behavior. The coloring session (Figure 1, right) presents the
            mandala on a clean canvas with no clinical indicators or performance
            timers. Five participant behaviors generate the kinematic signal
            stream: (1) color selection, timestamped to capture
            decision-latency; (2) region identification, modeled as a directed
            graph for executive analysis; (3) stroke execution, captured as
            dense time-series at 240 Hz; (4) region completion, recording
            coverage percentage and stroke count per region; and (5) session
            end, triggering computation of all movement model scores and
            dashboard update within seconds.
          </p>

          <div className="my-8 rounded-xl overflow-hidden border theme-border">
            <Image
              src="/articles/neurora/mandala-create.png"
              alt="Creative Canvas - free drawing mode"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <Image
              src="/articles/neurora/community-events.png"
              alt="Community Events - group sessions and workshops"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="text-sm theme-muted p-4 bg-gray-50 dark:bg-gray-900">
              <strong>Figure 2.</strong> Left: Creative Canvas — free drawing
              mode capturing unconstrained motor baseline. Right: Community
              Events — group mandala sessions, mindful color workshops, and
              structured 7-day courses sustaining longitudinal engagement.
            </p>
          </div>

          <h3>2.3 Creative Canvas and Community Engagement</h3>
          <p>
            The Creative Canvas mode (Figure 2, left) allows unrestricted free
            drawing, capturing the participant&apos;s natural motor signature as
            a within-person baseline and providing a comparison condition for
            evaluating how geometric scaffolding modulates kinematic output. The
            Community module (Figure 2, right) embeds NEURORA within a social
            creative practice: weekly group drawing sessions, mindful color
            workshops, and structured courses like the 7-Day Focus Through
            Patterns program directly address the adherence problem that limits
            most digital phenotyping platforms. Group sessions also provide
            inter-participant kinematic comparison data under standardized
            conditions, enabling cross-participant feature normalization.
          </p>

          <div className="my-8 rounded-xl overflow-hidden border theme-border">
            <Image
              src="/articles/neurora/therapist.png"
              alt="Therapist Connect interface"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <Image
              src="/articles/neurora/wellness-trend.png"
              alt="Wellness Trends Dashboard"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <p className="text-sm theme-muted p-4 bg-gray-50 dark:bg-gray-900">
              <strong>Figure 3.</strong> Left: Therapist Connect — certified art
              therapists review longitudinal data and book consultations within
              the app. Right: Wellness Trends — daily NEURORA Score with four
              sub-metric trends (Steadiness, Consistency, Focus, Completion)
              shown across 1-week to 1-year windows.
            </p>
          </div>

          <h3>2.4 Therapist Connect and Wellness Trends Dashboard</h3>
          <p>
            The Therapist Connect module (Figure 3, left) links participants
            with certified mandala therapists who monitor session progress,
            review kinematic trend reports, and schedule consultations.
            Therapist oversight provides a critical human escalation pathway
            when longitudinal monitoring algorithms detect sustained deviation
            from an individual&apos;s established baseline — the primary
            mechanism for flagging participants who may warrant clinical
            evaluation. Importantly, clinical alerts are routed to the therapist
            rather than directly to participants, preserving NEURORA&apos;s
            non-clinical framing and preventing the anxiety and behavioral
            changes that direct clinical feedback would induce.
          </p>
          <p>
            The Wellness Trends dashboard (Figure 3, right) is the
            participant-facing longitudinal monitoring interface. It displays
            the daily NEURORA Score — a composite wellness index derived from
            all six movement models — alongside four interpretable sub-metrics:
            Steadiness (motor regularity, driven by jerk smoothness and tremor
            power), Consistency (session-to-session reproducibility, driven by
            rhythm regularity and speed stability), Focus (attentional
            engagement, driven by directional stability and active drawing
            ratio), and Completion (task throughput, driven by region coverage
            and path efficiency). The dashboard supports four time windows —
            Week, Month, 3 Months, and Year — enabling participants to observe
            their own longitudinal trajectory.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-6 my-8 border-l-4 border-blue-500 text-gray-900 dark:text-gray-100">
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">
              Design Principle: Participant Experience as Scientific
              Infrastructure
            </h4>
            <p className="!mb-0 text-gray-800 dark:text-gray-200">
              NEURORA&apos;s engagement modules — Community, Therapist Connect,
              and Wellness Trends — are not peripheral features added to make a
              clinical tool more palatable. They are core scientific
              infrastructure. Longitudinal kinematic monitoring is only
              scientifically meaningful if participants complete sessions
              regularly over months and years. Every design decision that
              increases genuine voluntary engagement directly increases the
              statistical power and ecological validity of the resulting
              dataset.
            </p>
          </div>

          <h2>3. Mathematical Foundations of Mandala Generation</h2>
          <p>
            NEURORA&apos;s mandala templates are mathematically defined in polar
            coordinates to enable precise registration of pen strokes to sectors
            and rings. This ensures every region has a deterministic,
            analytically defined boundary, and that hemispheric kinematic
            comparisons between opposite sectors are geometrically valid — any
            kinematic difference must originate from the participant&apos;s
            motor execution, not from template geometry asymmetry.
          </p>

          <h3>3.1 Polar Coordinate Grid and Region Structure</h3>
          <p>
            All templates are defined in a polar coordinate system centered at
            mandala center (x<sub>c</sub>, y<sub>c</sub>). Each canvas point p =
            (x, y) maps to polar coordinates:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto text-gray-900 dark:text-gray-100">
            r = √[(x−x<sub>c</sub>)² + (y−y<sub>c</sub>)²] <br />φ = atan2(y−y
            <sub>c</sub>, x−x<sub>c</sub>) ∈ [−π, π]
          </div>

          <h3>3.2 Radial Symmetry Construction via Rotation</h3>
          <p>
            K-fold symmetry is enforced by defining all decorative path geometry
            within a single seed sector Ω₀ and rotating it K−1 times. This
            construction guarantees exact geometric symmetry so that the
            hemispheric asymmetry index A<sub>sym</sub> reflects only motor
            execution differences, not template geometry.
          </p>

          <h3>3.3 Difficulty Quantification and Adaptive Progression</h3>
          <p>
            Template difficulty is formally quantified as a function of region
            count N<sub>r</sub>, minimum region area A<sub>min</sub>, and mean
            boundary curvature κ:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm text-gray-900 dark:text-gray-100">
            Difficulty = 0.3·N<sub>r</sub> + 0.5·(1/A<sub>min</sub>) + 0.2·κ
          </div>

          <h2>4. Pen Movement Models: Recording and Analyzing Sessions</h2>
          <p>
            The kinematic analysis pipeline is implemented via
            computeSessionMovementModel(). Each Apple Pencil data point is a
            StrokeTelemetry record containing position (x,y), timestamp t,
            pressure p, tilt θ, and azimuth φ. From adjacent telemetric samples,
            the analyzer constructs segment primitives from which all six
            movement models are derived. All model outputs are normalized to [0,
            100].
          </p>

          <h3>4.1 Model 1 — Path Efficiency</h3>
          <p>
            Measures how directly the pen traveled from session start to session
            end. Higher scores reflect goal-directed movement. Reduced path
            efficiency indicates disorganized visuomotor planning characteristic
            of AD; tremor-induced path deviation reduces it in PD.
          </p>

          <h3>4.2 Model 2 — Jerk-Based Smoothness</h3>
          <p>
            Jerk is the gold-standard kinematic measure of motor smoothness
            (Berardelli et al., 2001). Low smoothness scores indicate abrupt
            stop-start behavior and irregular acceleration — the kinematic
            signature of PD bradykinesia and dyskinesia. Primary contributor to
            the Steadiness wellness metric.
          </p>

          <h3>4.3 Model 3 — Directional Stability (Shannon Entropy)</h3>
          <p>
            High entropy — movement spread across many directions — is the
            expected signature of AD executive disorganization, reflecting the
            participant&apos;s lack of a consistent directional completion
            strategy (Perry & Hodges, 1999). Low entropy indicates concentrated,
            purposeful stroke directions typical of healthy older adults.
            Primary contributor to the Focus wellness metric.
          </p>

          <h3>
            4.4 Models 4–6 — Rhythm Regularity, Speed Stability, Active Drawing
          </h3>
          <p>
            Rhythm regularity captures temporal pacing consistency, reduced by
            PD motor fluctuations. Speed stability detects velocity variability
            arising from PD tremor or AD planning uncertainty. Active drawing
            ratio measures the proportion of session time spent actively moving,
            reduced by PD akinesia and AD-related apathy and disengagement.
          </p>

          <h3>4.5 Tremor Spectral Analysis</h3>
          <p>
            Parkinsonian resting and action tremor occupies the 4–6 Hz frequency
            band (Jankovic, 2008). NEURORA applies the Fast Fourier Transform to
            the velocity time-series of each stroke of sufficient duration (≥
            500 ms). Elevated tremor band power is NEURORA&apos;s primary
            PD-specific biomarker.
          </p>

          <h3>4.6 Hemispheric Asymmetry Index</h3>
          <p>
            Motor asymmetry reflects the unilateral onset of dopaminergic
            neurodegeneration in PD (Djaldetti et al., 2006). NEURORA exploits
            mandala radial symmetry to detect hemispheric asymmetry within a
            single session. Elevated A<sub>sym</sub> in PD (unilateral onset);
            persistently low A<sub>sym</sub> in AD (bilateral symmetric decline)
            — providing a key differentiating signature between the two diseases
            without requiring separate laterality assessments.
          </p>

          <h2>5. Neurobiological Rationale and Evidence Base</h2>

          <h3>
            5.1 Parkinson&apos;s Disease: Prodromal Motor and Visual Signatures
          </h3>
          <p>
            PD is a synucleinopathy defined by alpha-synuclein aggregation
            spreading across the nervous system in a Braak staging pattern.
            Cardinal motor features — resting tremor, rigidity, bradykinesia —
            arise from dopaminergic neuron loss in the substantia nigra pars
            compacta, but only after 50–70% of these neurons are already lost.
            The prodromal phase, spanning 10–15 years before motor diagnosis,
            includes hyposmia, REM sleep behavior disorder, autonomic
            dysfunction, and — critically for NEURORA — visuospatial processing
            deficits driven by dopaminergic retinal dysfunction (Bodis-Wollner,
            1990).
          </p>

          <h3>
            5.2 Alzheimer&apos;s Disease: Executive and Visuospatial Deficits
          </h3>
          <p>
            AD is neuropathologically defined by amyloid-beta plaques and tau
            neurofibrillary tangles progressing in a characteristic topographic
            pattern (Braak & Braak, 1991). While episodic memory impairment
            typically prompts clinical presentation, parietal and frontal
            involvement produces measurable deficits in spatial planning,
            constructional praxis, and task organization.
          </p>

          <h3>5.3 Why Mandala Drawing Is Structurally Unique</h3>
          <p>
            Mandala drawing possesses three properties uniquely suited to
            neurodegenerative digital phenotyping. First, radial symmetry
            enables hemispheric motor asymmetry detection within a single
            session without any contrived laterality test. Second, bounded
            geometry enables genuine longitudinal repeatability: sector k in
            session 1 is geometrically identical to sector k in session 100,
            making within-individual change detection statistically rigorous.
            Third, sequential completion structure creates a natural window onto
            executive planning.
          </p>

          <h2>6. Disease-Specific Hypotheses</h2>

          <h3>6.1 Parkinson&apos;s Disease Predicted Signal Profile</h3>
          <ul>
            <li>
              <strong>PD-H1 (Bradykinesia):</strong> Mean stroke speed
              significantly reduced, especially in long sustained strokes
              requiring basal ganglia motor programming; smoothness score
              substantially reduced.
            </li>
            <li>
              <strong>PD-H2 (Tremor):</strong> Tremor band power significantly
              elevated in the 4–6 Hz band; wavelet analysis reveals
              within-stroke tremor modulation consistent with Parkinsonian
              action tremor.
            </li>
            <li>
              <strong>PD-H3 (Asymmetry):</strong> Hemispheric asymmetry index
              significantly elevated in speed and tremor features, reflecting
              the characteristic unilateral onset of dopaminergic
              neurodegeneration.
            </li>
            <li>
              <strong>PD-H4 (Rhythm):</strong> Rhythm regularity score
              significantly reduced, reflecting irregular motor pacing
              consistent with basal ganglia dopaminergic dysfunction.
            </li>
          </ul>

          <h3>6.2 Alzheimer&apos;s Disease Predicted Signal Profile</h3>
          <ul>
            <li>
              <strong>AD-H1 (Entropy):</strong> Directional stability score
              significantly reduced; completion sequence entropy significantly
              elevated, reflecting impaired frontal-parietal executive planning.
            </li>
            <li>
              <strong>AD-H2 (Path):</strong> Path efficiency significantly
              reduced, reflecting disorganized visuomotor planning and
              progressive loss of goal-directedness in spatial task execution.
            </li>
            <li>
              <strong>AD-H3 (Consistency):</strong> Session-to-session strategy
              consistency significantly reduced, reflecting diminished
              procedural memory for established task approaches.
            </li>
            <li>
              <strong>AD-H4 (Symmetry):</strong> A<sub>sym</sub> remains low and
              bilateral — distinguishing AD from PD&apos;s unilateral asymmetry
              pattern.
            </li>
          </ul>

          <h2>7. Machine Learning Classification Pipeline</h2>

          <h3>7.1 Feature Engineering</h3>
          <p>
            NEURORA extracts approximately 200 numerical features per session
            spanning kinematic, spectral, geometric, and executive function
            domains. Features undergo variance thresholding to eliminate
            near-constant features, Spearman rank-correlation filtering to
            remove redundant pairs, and PCA dimensionality reduction retaining
            95% of explained variance.
          </p>

          <h3>7.2 Classification Architecture</h3>
          <p>
            NEURORA implements a hierarchical classification framework. The
            primary classifier distinguishes three groups: healthy older adult,
            early PD, and early AD/MCI. A Random Forest ensemble serves as the
            primary model — selected for its interpretability through feature
            importance scores that map directly to kinematic and executive
            features. For longitudinal sequences of ten or more sessions, a Long
            Short-Term Memory (LSTM) network models the temporal trajectory of
            feature evolution.
          </p>

          <h2>8. Validation Framework</h2>

          <h3>8.1 Proposed Study Design</h3>
          <p>
            Rigorous validation requires a longitudinal, multi-site,
            observational cohort study enrolling four groups: (1) healthy older
            adult controls; (2) prodromal or early PD confirmed by movement
            disorder specialist; (3) amnestic or non-amnestic MCI assessed via
            comprehensive neuropsychological battery; and (4) early probable AD
            per NIA-AA 2011 criteria. Target enrollment of 200 participants per
            group (800 total) is estimated at 80% power, Cohen&apos;s d = 0.5,
            with 25% expected attrition over 24 months.
          </p>

          <h3>8.2 Primary Statistical Model: Linear Mixed-Effects</h3>
          <p>
            The primary analysis uses a linear mixed-effects model (LMM) for
            each kinematic feature and wellness metric over time. The Group×Time
            interaction coefficient is the primary inference target, capturing
            differential longitudinal trajectories between diagnostic groups.
          </p>

          <h3>8.3 Individual Monitoring: CUSUM Alert System</h3>
          <p>
            For individual clinical monitoring, NEURORA implements CUSUM
            (cumulative sum) control charts. A clinical alert is triggered —
            transmitted to the supervising therapist — when the cumulative
            standardized sum exceeds a pre-specified threshold calibrated during
            the validation study to optimize the sensitivity-specificity
            tradeoff for clinically actionable change detection.
          </p>

          <h2>9. Ethical Considerations</h2>

          <h3>9.1 Non-Diagnostic Framing and Clinical Responsibility</h3>
          <p>
            NEURORA is explicitly designed, validated, and positioned as a
            monitoring support tool — not a diagnostic instrument. No NEURORA
            output should serve as the sole basis for a clinical diagnosis,
            treatment decision, or risk disclosure to a participant. All
            platform outputs are framed as signals of interest that warrant
            clinician review.
          </p>

          <h3>9.2 Data Governance and Privacy Architecture</h3>
          <p>
            All data transmission uses end-to-end encryption (TLS 1.3);
            device-level data uses iOS Data Protection at rest. No data is
            shared with insurance providers, employers, or third-party
            advertisers under any circumstances. Participants retain full data
            withdrawal rights at all times, with immediate deletion upon
            request.
          </p>

          <h3>9.3 Equity, Access, and Inclusion</h3>
          <p>
            NEURORA&apos;s iPad-first implementation creates potential access
            barriers that must be actively addressed. A validation phase will
            assess full portability to Android tablet platforms including
            Samsung Galaxy Tab with S Pen. Device loans are provided to all
            eligible study participants who do not own compatible hardware.
            Enrollment diversity is treated as a scientific priority, not merely
            an ethical obligation.
          </p>

          <h2>10. Future Directions</h2>

          <h3>10.1 Expanded Mandala Library and Adaptive Calibration</h3>
          <p>
            Future development will expand the library to 30+ templates spanning
            a wider range of symmetry folds (4-fold through 16-fold), region
            densities, and spatial complexity profiles. Adaptive calibration
            algorithms will match template assignment not only to performance
            level, but to the specific kinematic features showing the most
            statistically significant change in an individual&apos;s
            longitudinal trajectory.
          </p>

          <h3>10.2 Family and Caregiver Dashboards</h3>
          <p>
            A family and caregiver portal with consent-based,
            participant-controlled data sharing is planned. Caregivers will be
            able to view simplified wellness trend summaries and receive
            automated notifications when the platform detects sustained decline
            warranting clinical attention.
          </p>

          <h3>10.3 Path Toward Clinical Integration and Reimbursement</h3>
          <p>
            NEURORA&apos;s long-term vision is reimbursement as a digital
            therapeutic under existing CPT codes for digital health
            interventions, combined with a direct-to-consumer subscription model
            for the wellness and community features. Clinical integration
            pathways include embedding NEURORA data exports into electronic
            health record systems.
          </p>

          <h2>11. Conclusion</h2>
          <p>
            In the AI era, the most transformative medical innovations may not
            be those that extract more signal from patients — but those that
            create conditions in which patients actively choose to generate it.
            NEURORA&apos;s mission is clear: to turn creativity into care, and
            give aging minds a gentler, earlier path to support.
          </p>
          <p>
            By integrating mathematically defined mandala geometry, six-model
            kinematic analysis, a community-centered engagement platform, and a
            rigorous longitudinal validation framework, NEURORA proposes a new
            class of neurodegenerative digital biomarker rooted in human
            creative expression. The platform&apos;s radial symmetry enables
            hemispheric motor asymmetry detection without contrived laterality
            tests. Its sequential completion structure encodes executive
            planning directly into the act of art-making. Its community,
            therapist, and gallery modules sustain the long-term participation
            that transforms a mobile app into a genuine longitudinal monitoring
            instrument.
          </p>
          <p>
            A platform that invites older adults to engage with structured
            creative activity, that honors the intrinsic value of making art
            while generating medically useful signals as a consequence rather
            than a demand — treats participants as whole persons rather than
            data sources. That is not incidental to NEURORA&apos;s design. It is
            the heart of it.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mt-12 text-gray-900 dark:text-gray-100">
            <h3 className="!mt-0 text-gray-900 dark:text-white">
              About the Author
            </h3>
            <p className="!mb-0 text-gray-800 dark:text-gray-200">
              <strong>Luxin Zhang</strong> is a software engineer and
              founder-minded builder focused on transforming ambitious AI ideas
              into production-ready systems. She is the creator of NEURORA, an
              iPadOS platform that leverages Apple Pencil telemetry, signal
              modeling, and AI-driven analysis to transform mandala-based art
              therapy into a tool for early detection and longitudinal
              monitoring of neurodegenerative diseases. Her work is driven by a
              central question: what if early care for conditions like
              Alzheimer&apos;s and Parkinson&apos;s felt creative, calming, and
              human rather than clinical and late? Her technical interests span
              agentic AI architectures, multi-agent orchestration, intelligent
              workflows, and full-stack AI product development, with particular
              focus on kinematic biomarker extraction, longitudinal digital
              phenotyping, and explainable machine learning in clinical
              neurology.
            </p>
          </div>
        </section>

        <footer className="mt-14 border-t theme-border pt-8">
          <a
            href="https://www.amazon.com/Where-Art-Technology-Resonate-Binnovative/dp/B0GW4ZF725/ref=tmm_pap_swatch_0"
            target="_blank"
            rel="noreferrer"
            className="theme-toggle inline-flex items-center px-5 py-3 rounded-xl font-semibold transition-colors"
          >
            View Book on Amazon →
          </a>
        </footer>
      </article>
    </main>
  );
}
