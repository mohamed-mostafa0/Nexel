


export default function Framed({
    children,
    className=""
}){

    return (

    <div className={`relative ${className}`}>
        <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-twilight/20 blur-[60px]"
        />
        <div className="overflow-hidden rounded-card border border-twilight/60 bg-graphite">
        {children}
      </div>
    </div>
    )
}