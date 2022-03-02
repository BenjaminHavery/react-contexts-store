
export const Media = (config = {}) => {
  const media = {
          ...config,
          up: {},
          down: {},
          only: {},
          sorted: Object.keys(config).map(key => ({ key, width: config[key] })).sort((a, b) => a.width > b.width),
        };

  media.sorted.forEach((bp, i) => {
    const next = media.sorted[i + 1] || false;
    media.up[bp.key] = `only screen and (min-width: ${bp.width}px)`;
    media.only[bp.key] = `only screen and (min-width: ${bp.width}px) ${next ? `and (max-width: ${next.width - 0.02}px)` : ''}`;
    media.down[bp.key] = next ? `only screen and (max-width: ${next.width - 0.02}px)` : 'only screen';
  });

  return media
}
