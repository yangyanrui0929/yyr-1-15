import { Sun, Moon, Coins, Trophy, Calendar, Cloud, CloudRain, CloudSnow, Mic, Coffee, Lightbulb } from 'lucide-react'
import { useGameStore } from '@/store/useGameStore'
import type { Weather } from '@/types'

function WeatherIcon({ w }: { w: Weather }) {
  if (w === '晴') return <Sun className="w-5 h-5 text-gold" />
  if (w === '云') return <Cloud className="w-5 h-5 text-ink-light" />
  if (w === '雨') return <CloudRain className="w-5 h-5 text-tea" />
  if (w === '雪') return <CloudSnow className="w-5 h-5 text-sandal-light" />
  return null
}

function StatusBar({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex-1">
        <div className="stat-label">{label}</div>
        <div className="flex items-center gap-2">
          <div className="stat-value text-sm font-semibold" style={{ color }}>{value}</div>
          <div className="w-16 h-2 bg-paper-dark rounded-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{ width: `${value}%`, backgroundColor: color }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StatusPanel() {
  const { day, phase, gold, reputation, weather, storyteller } = useGameStore()

  return (
    <div className="scroll-panel mb-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sandal" />
            <div>
              <div className="stat-label">第</div>
              <div className="stat-value flex items-baseline gap-1">
                {day}
                <span className="text-sm font-song text-ink-light">日</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {phase === 'day' ? (
              <Sun className="w-6 h-6 text-gold animate-breathe" />
            ) : (
              <Moon className="w-6 h-6 text-sandal animate-breathe" />
            )}
            <div>
              <div className="stat-label">时段</div>
              <div className="stat-value text-lg">
                {phase === 'day' ? '白日经营' : '夜晚开讲'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WeatherIcon w={weather} />
            <div>
              <div className="stat-label">天气</div>
              <div className="stat-value text-lg">{weather}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-gold" />
            <div>
              <div className="stat-label">金币</div>
              <div className="stat-value text-gold font-semibold">{gold}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-cinnabar" />
            <div>
              <div className="stat-label">声望</div>
              <div className="flex items-center gap-2">
                <div className="stat-value text-cinnabar font-semibold">{reputation}</div>
                <div className="w-20 h-2 bg-paper-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-cinnabar transition-all"
                    style={{ width: `${reputation}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-sandal/20 pt-4">
        <div className="text-sm font-song text-ink-light mb-2">说书人状态</div>
        <div className="grid grid-cols-3 gap-4">
          <StatusBar 
            label="嗓伤" 
            value={storyteller.throatDamage} 
            color="#C94C4C"
            icon={<Mic className="w-4 h-4 text-cinnabar" />}
          />
          <StatusBar 
            label="疲惫" 
            value={storyteller.exhaustion} 
            color="#8B7355"
            icon={<Coffee className="w-4 h-4 text-sandal" />}
          />
          <StatusBar 
            label="灵感" 
            value={storyteller.inspiration} 
            color="#6B8E5A"
            icon={<Lightbulb className="w-4 h-4 text-tea" />}
          />
        </div>
        {storyteller.consecutiveNights > 0 && (
          <div className="mt-2 text-xs text-ink-light font-song">
            连续开讲 {storyteller.consecutiveNights} 夜 · 强度：{storyteller.performanceIntensity}
          </div>
        )}
      </div>
    </div>
  )
}
