import { type ReactNode, useEffect, useRef, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"

interface SheetComponentProps {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void

  showDangerZone?: boolean
  onDelete?: () => void
  deleteLabel?: string
}

export function SheetComponent({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  showDangerZone = false,
  onDelete,
  deleteLabel = "Excluir cliente",
}: SheetComponentProps) {
  const endRef = useRef<HTMLDivElement | null>(null)
  const [showDanger, setShowDanger] = useState(false)

  useEffect(() => {
    if (!open) {
      setShowDanger(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowDanger(true)
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    )

    if (endRef.current) {
      observer.observe(endRef.current)
    }

    return () => observer.disconnect()
  }, [open])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent
        className="
          bg-background text-foreground
          border-l border-border
          max-w-[0px] sm:max-w-[480px]
        "
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && (
            <SheetDescription>{description}</SheetDescription>
          )}
        </SheetHeader>

        <div className="mt-6 max-h-[calc(100vh-140px)] overflow-y-auto space-y-6">
          {children}

          <div ref={endRef} />

          {/* ZONA DE PERIGO */}



          <Separator />

          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4">
            <h4 className="mb-1 text-sm font-semibold text-destructive">
              Zona de perigo
            </h4>

            <p className="mb-3 text-sm text-muted-foreground">
              Esta ação é permanente e não poderá ser desfeita.
            </p>

            <Button
              variant="destructive"
              onClick={onDelete}
              className="w-full"
            >
              <Trash className="mr-2 h-4 w-4" />
              {deleteLabel}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}