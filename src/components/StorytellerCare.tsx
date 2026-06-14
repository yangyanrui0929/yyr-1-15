import { Soup, Moon, BookOpen } from 'lucide-react'
import { useGameStore } from '@/store/useGameStore'
import type { DayActivity } from '@/types'

interface ActivityOption {
  id: DayActivity
  name: string
  description: string
  cost: number
  effects: string
  icon: React.ReactNode
}

const ACTIVITIES: ActivityOption[] = [
  {
    id: '润喉汤',
    name: '润喉养声汤',
    description: '川贝雪梨炖冰糖，舒缓喉咙不适',
    cost: 15,
    effects: '嗓伤 -25，灵感 +5',
    icon: <Soup className="w-8 h-8 text-cinnabar" />,
  },
  {
    id: '歇场',
    name: '闭门歇场',
    description: '整日休养，恢复精力',
    cost: 0,
    effects: '嗓伤 -10，疲惫 -30，灵感 +10',
    icon: <Moon className="w-8 h-8 text-sandal" />,
  },
  {
    id: '短讲',
    name: '午后短讲',
    description: '小段评书练手，积累灵感',
    cost: 0,
    effects: '嗓伤 +5，疲惫 +10，灵感 +20',
    icon: <BookOpen className="w-8 h-8 text-tea" />,
  },
]

export default function StorytellerCare() {
  const { storyteller, gold, doDayActivity, phase } = useGameStore()

  const canDoActivity = phase === 'day' && storyteller.todayActivity === '无'

  const handleActivity = (activity: DayActivity) => {
    if (!canDoActivity) return
    doDayActivity(activity)
  }

  return (
    <div className="scroll-panel">
      <h2 className="text-2xl font-brush text-sandal mb-4 flex items-center gap-2">
        <span className="text-2xl">🎭</span> 说书人调养
      </h2>

      {!canDoActivity && storyteller.todayActivity !== '无' && (
        <div className="bg-tea/10 border border-tea/30 rounded-lg p-3 mb-4 text-sm font-song text-ink">
          今日已安排：<span className="font-bold text-tea">{storyteller.todayActivity}</span>
        </div>
      )}

      <div className="space-y-3">
        {ACTIVITIES.map((activity) => {
          const canAfford = gold >= activity.cost
          const disabled = !canDoActivity || !canAfford

          return (
            <button
              key={activity.id}
              onClick={() => handleActivity(activity.id)}
              disabled={disabled}
              className={`w-full card-ancient p-4 text-left transition-all ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-cinnabar/50 hover:shadow-md cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-paper-dark flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-brush text-lg text-ink">{activity.name}</h3>
                    {activity.cost > 0 && (
                      <span className={`text-sm font-semibold ${canAfford ? 'text-gold' : 'text-cinnabar'}`}>
                        {activity.cost} 文
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-light mt-1 font-song">
                    {activity.description}
                  </p>
                  <p className="text-xs text-tea mt-2 font-song">
                    效果：{activity.effects}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-4 text-xs text-ink-light font-song">
        <p>💡 提示：连续高强度夜场会累积嗓伤和疲惫，增加失误风险</p>
        <p>💡 灵感越高，打赏和故事热度加成越多</p>
      </div>
    </div>
  )
}
