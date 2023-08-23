import { useMemo } from 'react'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisLeft } from '@visx/axis'
import { cn } from '@/lib/utils'

export function BarChart({
  width,
  height,
  outstandingBalances,
}: {
  width: number
  height: number
  outstandingBalances: [string, number][]
}) {
  const margin = { top: 12, bottom: 12, left: 52, right: 12 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = useMemo(() => {
    return scaleBand({
      domain: outstandingBalances.map(([contributor]) => contributor),
      range: [0, xMax],
      padding: 0.1,
    })
  }, [outstandingBalances, xMax])

  const yScale = useMemo(() => {
    const max = Math.max(
      ...outstandingBalances.map(([, balance]) => Math.abs(balance))
    )
    return scaleLinear({
      domain: [-max, max],
      range: [yMax, 0],
    })
  }, [outstandingBalances, yMax])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left} ${margin.top})`}>
        {outstandingBalances.map(([contributor, balance]) => {
          return (
            <rect
              className={cn(balance > 0 ? 'fill-green-500' : 'fill-red-500')}
              key={contributor}
              x={xScale(contributor)}
              width={xScale.bandwidth()}
              y={yScale(Math.max(0, balance))}
              height={Math.abs(yScale(balance) - yScale(0))}
              rx={4}
            />
          )
        })}
      </g>
      <AxisLeft
        hideAxisLine
        hideTicks
        left={margin.left}
        top={margin.top}
        scale={yScale}
        numTicks={5}
        tickLabelProps={() => ({
          fontSize: 16,
          textAnchor: 'end',
          dominantBaseline: 'middle',
        })}
        tickFormat={(t) => {
          const tickValue = Number(t)
          return (
            `${tickValue < 0 ? '-' : ''}$` +
            formatNumber(Math.abs(tickValue), 0)
          )
        }}
      />
    </svg>
  )
}

function formatNumber(number: number, precision = 2) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ]

  const found = map.find((x) => Math.abs(number) >= x.threshold)
  if (found) {
    const formatted =
      (number / found.threshold).toFixed(precision) + found.suffix
    return formatted
  }

  return number
}
