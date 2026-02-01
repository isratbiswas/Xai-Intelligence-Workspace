export const DataBar = ({ height, delay = 0 }) => (
  <div
    className="flex-1 bg-gradient-to-t from-fuchsia-500 to-cyan-400 rounded-t-sm transition-all duration-1000 ease-out"
    style={{
      height: `${height}%`,
      transitionDelay: `${delay}ms`,
    }}
  />
);
