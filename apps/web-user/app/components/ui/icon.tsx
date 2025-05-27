export default function SvgIcon ({
  data,
  type = "image/svg+xml",
  className,
}: React.ComponentProps<"object">
) {
  return (
    <object
      data={data}
      type={type}
      className={className}
      aria-label="icon"
    />
  );
};