export default function Image ({
  src,
  alt,
  className,
}: React.ComponentProps<"img">
) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};