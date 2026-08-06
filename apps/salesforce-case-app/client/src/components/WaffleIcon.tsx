export default function WaffleIcon() {
  return (
    <span className="waffle-icon" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
    </span>
  );
}
