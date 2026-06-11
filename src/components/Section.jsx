export default function Section({
  id,
  className = '',
  blobs = [],
  children,
  ...rest
}) {
  return (
    <section id={id} className={className} {...rest}>
      {blobs.length > 0 && (
        <div className="section__blobs" aria-hidden="true">
          {blobs.map((blob, index) => (
            <div
              key={blob.key ?? `${blob.variant ?? 'blob'}-${index}`}
              className={`blob ${blob.variant ?? ''}`.trim()}
              data-parallax={blob.parallax}
              style={blob.style}
            />
          ))}
        </div>
      )}
      {children}
    </section>
  );
}
