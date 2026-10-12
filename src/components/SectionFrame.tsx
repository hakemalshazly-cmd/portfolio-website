import type { ReactNode } from 'react'

type SectionFrameProps = {
  id: string
  label: string
  children?: ReactNode
}

export default function SectionFrame({ id, label, children }: SectionFrameProps) {
  return (
    <section id={id} aria-label={label}>
      {children}
    </section>
  )
}
