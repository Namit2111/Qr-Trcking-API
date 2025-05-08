interface DashboardHeaderProps {
  title: string
  description: string
}

export default function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}
