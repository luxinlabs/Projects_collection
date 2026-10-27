export default function AboutJudgingWork({
  compact = false,
}: {
  compact?: boolean;
}) {
  const Heading = compact ? "h3" : "h2";
  return (
    <section
      aria-labelledby="judging-intro-heading"
      className={
        compact
          ? "mb-8"
          : "max-w-4xl mx-auto mb-12 theme-surface rounded-2xl border theme-border p-8"
      }
    >
      <Heading id="judging-intro-heading" className="text-2xl font-bold mb-4">
        About My Judging Work
      </Heading>
      <p className="theme-muted leading-relaxed mb-4">
        I am passionate about fostering innovation and supporting the next
        generation of technologists. Through my judging experience across
        academic conferences, hackathons, and innovation competitions, I have
        evaluated hundreds of projects spanning AI/ML, full-stack development,
        and research applications.
      </p>
      <p className="theme-muted leading-relaxed">
        My approach to judging emphasizes technical rigor, real-world impact,
        and innovative thinking. I provide constructive feedback to help
        participants grow and improve their work, while celebrating creativity
        and excellence in technology.
      </p>
    </section>
  );
}
