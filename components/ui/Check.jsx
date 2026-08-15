


export default function Check({children}){

    return (
        <li className="flex items-start gap-3 text-[15px] leading-relaxed text-ash">
            <svg className="mt-0.5 h-4 w-4 flex-none text-iris" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{children}</span>
        </li>
    )
}