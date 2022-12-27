import { useFloating, offset, flip, shift, Placement } from '@floating-ui/react'

interface TooltipProps {
  text?: string
  placement?: Placement
  offsetVal?: number
  children: React.ReactNode
}

export const Tooltip = ({
  text,
  placement = 'bottom',
  offsetVal = 8,
  children
}: TooltipProps) => {
  const { x, y, reference, floating, strategy } = useFloating({
    placement,
    middleware: [offset(offsetVal), flip(), shift()]
  })

  return (
    <span ref={reference} className='group relative'>
      {children}
      <div
        ref={floating}
        style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
        className='invisible absolute min-w-max rounded-md p-2 text-xs font-medium group-hover:visible dark:bg-gray-700'
      >
        {text}
      </div>
    </span>
  )
}
