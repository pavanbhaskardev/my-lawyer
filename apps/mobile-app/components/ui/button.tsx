import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonContainerVariants = cva(
  'flex flex-row items-center justify-center p-4 gap-4 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary/90',
        destructive: 'bg-destructive hover:bg-destructive/90',
        outline: 'border border-primary bg-primary/5',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-14 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  }
)

const buttonTextVariants = cva('font-bold text-lg', {
  variants: {
    variant: {
      default: 'text-background',
      destructive: 'text-background',
      outline: 'text-primary',
    },
    defaultVariants: {
      variant: 'default',
    },
  },
})

interface ButtonProps
  extends VariantProps<typeof buttonContainerVariants>,
    TouchableOpacityProps {
  title: string
  className?: string
  prefixLogo?: JSX.Element
  suffixLogo?: JSX.Element
}

export const Button = ({
  title,
  variant = 'default',
  size,
  className = '',
  prefixLogo,
  suffixLogo,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(buttonContainerVariants({ variant, size, className }))}
      {...props}
    >
      {prefixLogo}
      <Text className={cn(buttonTextVariants({ variant }))}>{title}</Text>
      {suffixLogo}
    </TouchableOpacity>
  )
}
