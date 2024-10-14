"use client";

import { Button } from "../ui/button";
import { useState } from "react";

interface ToggleButtonProps {
    id: number;
    contentText: string;
    className: string;
    isToggled: boolean;
    onToggle: (id: number) => void;
}

export function ToggleButton({
    id,
    contentText,
    className,
    isToggled,
    onToggle,
}: ToggleButtonProps) {
    return (
        <Button
            className={`${className} ${isToggled ? 'border-[#1A78F2] text-[#1A78F2]' : 'border-[#d3d8dd] text-[#4f6071]'}`}
            onClick={() => onToggle(id)}
        >
            {contentText}
        </Button>
    );
}

interface ToggleButtonGroupProps {
    buttons: { id: number; contentText: string }[];
    classNameCommon: string
}

export function ToggleButtonGroup({ buttons, classNameCommon }: ToggleButtonGroupProps) {
    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setActiveButtonId(id);
    };

    return (
        <div className="space-x-2">
            {buttons.map((button) => (
                <ToggleButton
                    key={button.id}
                    id={button.id}
                    contentText={button.contentText}
                    className={classNameCommon}
                    isToggled={activeButtonId === button.id}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    );
}