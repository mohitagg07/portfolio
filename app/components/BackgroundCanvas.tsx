export default function BackgroundCanvas() {
  return (
    <div aria-hidden="true" className="ambient-scene">
      <div className="ambient-scene__grid" />
      <div className="ambient-scene__glow ambient-scene__glow--blue" />
      <div className="ambient-scene__glow ambient-scene__glow--lime" />
      <div className="ambient-scene__glow ambient-scene__glow--violet" />
      <div className="ambient-scene__stars" />
    </div>
  );
}
