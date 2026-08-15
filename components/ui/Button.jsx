import Link from "next/link"




export default function Button({
    href,
    variant ="primary",
    className ='',
    children,
    icon=""
}){


    const baseStyle = "inline-flex items-center justify-center gap-2 rounded-pill py-3 px-6 transition-colors duration-200 text-sm font-medium"

    const variants = {
        primary:"bg-vellum text-obsidian hover:bg-white",
        ghost:"border border-charcoal text-vellum hover:border-smoke hover:bg-white/[0.04]"
    }

    const combinedStyle = `${baseStyle} ${variants[variant]} ${className}`

    if(href){
        return (
            <Link href={href} className={combinedStyle}>
                {children} {icon && <span>{icon}</span>}
            </Link>
        )
    }

    return (
        <button className={combinedStyle}>
            {children} {icon && <span>{icon}</span>}
        </button>
    )
}
