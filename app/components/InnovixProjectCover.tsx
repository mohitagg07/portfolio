"use client";

export default function InnovixProjectCover() {
  return (
    <div
      className="innovix-project-cover"
      role="img"
      aria-label="Editorial project cover for Innovix Studio, a creative studio website"
    >
      <div className="innovix-project-cover__top">
        <span>PROJECT / 04</span>
        <span>JAMMU · INDIA</span>
      </div>

      <div className="innovix-project-cover__field" aria-hidden="true">
        <span className="innovix-project-cover__shape innovix-project-cover__shape--one" />
        <span className="innovix-project-cover__shape innovix-project-cover__shape--two" />
        <span className="innovix-project-cover__shape innovix-project-cover__shape--three" />
      </div>

      <div className="innovix-project-cover__wordmark">
        <span>INNOVIX</span>
        <small>STUDIO</small>
      </div>

      <div className="innovix-project-cover__bottom">
        <span>CREATIVE STUDIO WEBSITE</span>
        <span>BRAND · DIGITAL · ENQUIRIES</span>
      </div>
    </div>
  );
}
