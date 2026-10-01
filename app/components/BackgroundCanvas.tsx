export default function BackgroundCanvas() {
  return (
    <div aria-hidden="true" className="ambient-scene">
      <div className="ambient-scene__grid" />
      <div className="ambient-scene__aurora" />
      <div className="ambient-scene__stars" />
    </div>
  );
}
