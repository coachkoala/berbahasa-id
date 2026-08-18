export function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z"
        fill={filled ? "#FFD100" : "none"}
        stroke="#111111"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
