// The brand's atmospheric backdrop: cream, sherbet, lavender, indigo, ruby and
// magenta washed across the top of the page. Two slowly drifting layers of soft
// organic shapes. Each <svg> is blurred once by CSS; only the wrapper animates,
// so the blur is cached rather than recomputed every frame.
//
// variant: 'hero' (home, tallest) | 'page' (inner pages) | 'slim' (legal)
// flip:    mirror vertically, for a mesh that rises from the bottom of a section
export default function Mesh({ variant = 'hero', flip = false }) {
  return (
    <div className={`mesh mesh-${variant}${flip ? ' mesh-flip' : ''}`} aria-hidden="true">
      <div className="mesh-layer mesh-layer-a">
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMin slice" focusable="false">
          <ellipse cx="360" cy="170" rx="580" ry="250" transform="rotate(-14 360 170)" fill="#f5e9d4" />
          <ellipse cx="820" cy="215" rx="360" ry="150" transform="rotate(-24 820 215)" fill="#ffab72" />
          <ellipse cx="1030" cy="340" rx="430" ry="170" transform="rotate(-28 1030 340)" fill="#c3bcff" />
          <ellipse cx="1150" cy="140" rx="310" ry="110" transform="rotate(-32 1150 140)" fill="#f96bee" opacity="0.85" />
        </svg>
      </div>
      <div className="mesh-layer mesh-layer-b">
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMin slice" focusable="false">
          <ellipse cx="580" cy="80" rx="240" ry="80" transform="rotate(-20 580 80)" fill="#ffc79a" />
          <ellipse cx="860" cy="450" rx="290" ry="90" transform="rotate(-26 860 450)" fill="#665efd" opacity="0.5" />
          <ellipse cx="1310" cy="260" rx="230" ry="90" transform="rotate(-38 1310 260)" fill="#ea2261" opacity="0.9" />
          <ellipse cx="1290" cy="480" rx="340" ry="130" transform="rotate(-30 1290 480)" fill="#533afd" opacity="0.9" />
        </svg>
      </div>
    </div>
  )
}
