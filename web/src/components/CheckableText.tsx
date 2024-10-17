import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@heroicons/react/24/outline"

interface CheckableTextProps extends Checkbox.CheckboxProps {
    children: any
}

export const CheckableText: React.FC<CheckableTextProps> = ({
    children,
    ...props
}) => {
    return (
        <Checkbox.Root
            className="flex items-center gap-3 py-1 group"
            {...props}
        >
            <div className={`h-8 w-8 rounded-lg flex-center bg-stone-900 border-2 border-stone-800 group-data-[state=checked]:bg-rose-500 ${!props.disabled && "border-stone-600 hover:bg-stone-700 duration-300"}`}>
                <Checkbox.Indicator>
                    <CheckIcon
                        width={20}
                        className="text-rose-50"
                    />
                </Checkbox.Indicator>
            </div>
            {children}
        </Checkbox.Root>
    )
}
