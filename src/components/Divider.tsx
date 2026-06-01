interface DividerProps {
  type: 'torn' | 'dotted' | 'steam';
  icon?: string;
}

export default function Divider({ type, icon }: DividerProps) {
  if (type === 'torn') {
    return <div className="divider divider-torn" aria-hidden="true" />;
  }

  if (type === 'dotted') {
    return (
      <div className="divider divider-dotted" aria-hidden="true">
        <span className="divider-dotted-icon">{icon}</span>
      </div>
    );
  }

  if (type === 'steam') {
    return (
      <div className="divider divider-steam" aria-hidden="true">
        <span className="steam-particle" />
        <span className="steam-particle" />
        <span className="steam-particle" />
        <span className="steam-particle" />
        <span className="steam-particle" />
        <span className="steam-particle" />
      </div>
    );
  }

  return null;
}
