interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease' | 'neutral'
  color: string
  icon: React.ReactNode
}

export function StatCard({ title, value, change, changeType = 'neutral', color, icon }: StatCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase': return 'text-green-600'
      case 'decrease': return 'text-red-600'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-xs ${getChangeColor()}`}>
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export function StatsGrid({ stats }: { stats: StatCardProps[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}