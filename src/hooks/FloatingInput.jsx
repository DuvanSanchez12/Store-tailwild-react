export default function FloatingInput({
  id,
  label,
  type = "text",
  className = "",
  required = false,
  autoComplete = "on",
  children,
  ...props
}) {
  return (
    <div className={`relative w-full overflow-visible ${className}`}>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        {...props}
        className="
          peer w-full pb-2 pt-5 ps-3 pr-10
          bg-transparent 
          outline-none
          text-base text-gray-700
          placeholder-transparent
        "
      />

      <label
        htmlFor={id}
        className="
          absolute left-3 top-3
          pt-1
          text-gray-500
          transition-all duration-200
          pointer-events-none

          peer-focus:-translate-y-3
          peer-focus:text-[0.80rem]

          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:text-[1rem]

          peer-not-placeholder-shown:-translate-y-3
          peer-not-placeholder-shown:text-[0.80rem]
        "
      >
        {label}
      </label>

      <div
        className="
          absolute inset-0 rounded-lg border border-gray-400 
          peer-focus:border-[rgb(10,173,10)]
          transition-all pointer-events-none
        "
      ></div>
      {children && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {children}
        </div>
      )}
    </div>
  );
}
