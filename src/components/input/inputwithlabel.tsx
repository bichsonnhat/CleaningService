import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
    labelText: string;
    inputType: string;
    inputPlaceholder: string;
    inputId: string;
    inputWidth?: string;
}

export function InputWithLabel({
    labelText,
    inputType,
    inputPlaceholder,
    inputId,
    inputWidth = "w-full"
}: InputWithLabelProps) {
    return (
        <div className="grid max-w-max items-center gap-1.5">
            <Label className="text-[14px] font-Averta-Semibold text-[#9FA7B0]" htmlFor={inputId}>
                {labelText}
            </Label>
            <Input className={`${inputWidth} font-Averta-Regular h-[50px] text-[16px] text-[#5f6367] border-2`} type={inputType} id={inputId} placeholder={inputPlaceholder} />
        </div>
    );
}