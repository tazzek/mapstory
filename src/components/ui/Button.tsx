import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vintage-primary disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";

    const variants = {
        primary: "bg-vintage-primary text-white hover:bg-vintage-primaryHover shadow-md hover:shadow-xl hover:-translate-y-0.5",
        dark: "bg-vintage-text text-white hover:bg-[#1a252f] shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-transparent",
        secondary: "bg-vintage-secondary text-vintage-text hover:bg-[#CDB5A0]",
        outline: "border-2 border-vintage-primary text-vintage-primary hover:bg-vintage-primary hover:text-white",
        ghost: "text-vintage-text hover:bg-vintage-secondary/20 hover:text-vintage-primary",
        light: "bg-white text-vintage-text hover:bg-gray-50 border border-vintage-border shadow-sm hover:shadow-md"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs uppercase",
        md: "px-6 py-3 text-sm uppercase",
        lg: "px-10 py-4 text-sm uppercase font-semibold",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            {...props}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
