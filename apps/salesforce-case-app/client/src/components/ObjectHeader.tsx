export default function ObjectHeader({
  icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="object-header" data-testid="object-header">
      <div className="object-icon" aria-hidden="true">{icon}</div>
      <div>
        {eyebrow && <div className="object-eyebrow">{eyebrow}</div>}
        <h1 className="object-title">{title}</h1>
        {subtitle && <div className="object-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}
