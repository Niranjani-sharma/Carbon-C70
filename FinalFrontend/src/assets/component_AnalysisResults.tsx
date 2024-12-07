import { Leaf, Sprout, Wind, Zap } from "lucide-react"

interface ImpactCardProps {
  title: string
  icon: React.ReactNode
  impact: string
  description: string
  accentColor: string
}

const ImpactCard: React.FC<ImpactCardProps> = ({ title, icon, impact, description, accentColor }) => (
  <div className={`p-6 rounded-lg border bg-white box-shadow:0px 4px 18px 5px #8484840D border-black-200 shadow-sm width-[400px] ${accentColor}`}>
    <div className="flex justify-between items-center mb-4">
      <h2 className={`text-lg font-semibold ${accentColor}`}>{title}</h2>
      {icon}
    </div>
    <h3 className="text-3xl font-bold mb-2">{impact}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default function EnvironmentalImpactGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-8xl  ">
      <ImpactCard
        title="Methane Impact"
        icon={<Leaf className="w-6 h-6 text-green-500" />}
        impact="Low"
        description="Reducing methane emissions"
        accentColor="text-green-500"
      />
      <ImpactCard
        title="Afforestation Impact"
        icon={<Sprout className="w-6 h-6 text-green-500" />}
        impact="Low"
        description="Planting trees to absorb CO2"
        accentColor="text-green-500"
      />
      <ImpactCard
        title="Renewable Impact"
        icon={<Wind className="w-6 h-6 text-blue-500" />}
        impact="Low"
        description="Clean energy transition"
        accentColor="text-blue-500"
      />
      <ImpactCard
        title="EV Impact"
        icon={<Zap className="w-6 h-6 text-orange-500" />}
        impact="Low"
        description="Promoting electric vehicles"
        accentColor="text-orange-500"
      />
    </div>
  )
}