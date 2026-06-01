interface ScrollProgressProps {
  percent: number;
}

export default function ScrollProgress({ percent }: ScrollProgressProps) {
  return (
    <div
      id="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: `${percent}%` }}
    />
  );
}
