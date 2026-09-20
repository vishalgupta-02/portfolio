import { Briefcase, Cpu, Layers } from "lucide-react"

interface WorkStatsHeaderProps {
  totalRoles: number
  clientDeliveries: number
  domainsCount: number
}

export default function WorkStatsHeader({
  totalRoles,
  clientDeliveries,
  domainsCount,
}: WorkStatsHeaderProps) {
  return (
    <div className='border-border/50 bg-card/40 mt-6 grid grid-cols-3 gap-3 rounded-xl border p-3 text-center sm:p-4 shadow-xs backdrop-blur-xs'>
      <div className='border-border/60 border-r pr-2'>
        <span className='text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs'>
          <Briefcase className='size-3.5 text-emerald-500' aria-hidden='true' />
          Roles
        </span>
        <p className='text-foreground mt-1 font-mono text-lg font-bold'>
          {totalRoles}
        </p>
      </div>

      <div className='border-border/60 border-r px-2'>
        <span className='text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs'>
          <Cpu className='size-3.5 text-blue-500' aria-hidden='true' />
          Client Systems
        </span>
        <p className='text-foreground mt-1 font-mono text-lg font-bold'>
          {clientDeliveries}+
        </p>
      </div>

      <div className='pl-2'>
        <span className='text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs'>
          <Layers className='size-3.5 text-amber-500' aria-hidden='true' />
          Domains
        </span>
        <p className='text-foreground mt-1 font-mono text-lg font-bold'>
          {domainsCount}
        </p>
      </div>
    </div>
  )
}
