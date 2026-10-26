export default function LuxinAvatar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Little Luxin, a girl with long dark hair and a rose bow"
    >
      <circle cx="50" cy="50" r="49" fill="#eee4d6" />
      <path d="M22 80V45C22 8 78 8 78 45v35Z" fill="#46322f" />
      <path d="M28 99v-9c0-24 44-24 44 0v9" fill="#c78d94" />
      <path d="m40 78 10 10 10-10" fill="#f9ecd9" />
      <ellipse cx="50" cy="51" rx="24" ry="28" fill="#f1c5a7" />
      <path
        d="M25 48c1-28 14-33 26-30 19-2 27 17 25 31-14-1-25-11-27-18-4 9-12 13-24 17"
        fill="#46322f"
      />
      <path
        d="M27 47c-6 23-4 39 2 42l6-11-1-33M74 46c6 21 5 37-3 44l-5-13 1-32"
        fill="#533936"
      />
      <ellipse cx="40" cy="54" rx="3.2" ry="4.2" fill="#392b27" />
      <ellipse cx="60" cy="54" rx="3.2" ry="4.2" fill="#392b27" />
      <circle cx="39" cy="52.5" r="1.2" fill="#fffaf0" />
      <circle cx="59" cy="52.5" r="1.2" fill="#fffaf0" />
      <path
        d="m35 50 3 1m27-1-3 1"
        stroke="#392b27"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="33" cy="63" rx="5" ry="2.6" fill="#df9d94" opacity=".65" />
      <ellipse cx="67" cy="63" rx="5" ry="2.6" fill="#df9d94" opacity=".65" />
      <path
        d="M45 66q5 6 10 0"
        fill="none"
        stroke="#ae6f68"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M72 27c-18-10-14 7-3 4-4 13 16 11 8-1"
        fill="#d6a0a5"
        stroke="#b67b84"
        strokeWidth="1"
      />
      <circle cx="72" cy="30" r="3" fill="#f1d0bc" />
    </svg>
  );
}
