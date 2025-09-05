import { ButtonProps } from '@/types';

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150";
  
  const variantStyles = {
    primary: "btn-cinema py-2.5 px-5",
    outline: "btn-cinema-outline py-2.5 px-5",
    secondary: "bg-white/5 hover:bg-white/10 border border-white/15 py-2",
    ghost: "bg-transparent hover:bg-white/5 py-2",
  };
  
  const combinedClassName = `${baseStyle} ${variantStyles[variant]} ${className || ''}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}