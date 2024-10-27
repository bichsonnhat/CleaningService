"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./MonthCarousel.module.css"; // Make sure you have the CSS module file

export default function MonthCarousel() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [currentIndex, setCurrentIndex] = useState(11);
    const [direction, setDirection] = useState("none");
    const [animating, setAnimating] = useState(false);

    const handleNext = () => {
        if (animating) return; // Prevent re-triggering animation
        setDirection("right");
        setAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % months.length);
    };

    const handlePrev = () => {
        if (animating) return; // Prevent re-triggering animation
        setDirection("left");
        setAnimating(true);
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + months.length) % months.length
        );
    };

    const getMonth = (index: any) => {
        return months[(index + months.length) % months.length];
    };

    // Reset animation state after the animation completes
    useEffect(() => {
        if (animating) {
            const timer = setTimeout(() => setAnimating(false), 300); // Match duration of CSS animation
            return () => clearTimeout(timer);
        }
    }, [animating]);

    return (
        <div className="mt-[50px] flex flex-row justify-between min-w-[1002px]">
            <div>
                <Image
                    src="/images/icons/arrow_back.svg"
                    alt="arrow_back"
                    height={24}
                    width={24}
                    onClick={handlePrev}
                />
            </div>
            <div
                className={`flex flex-row gap-4 text-2xl font-Averta-Regular items-center ${
                    animating &&
                    (direction === "left"
                        ? styles.slideLeft
                        : styles.slideRight)
                }`}
            >
                <div
                    className="w-[122px] text-center text-neutral-400 cursor-pointer"
                    onClick={handlePrev}
                >
                    {getMonth(currentIndex - 1)}
                </div>

                <div
                    className="w-[122px] text-center text-neutral-950 font-Averta-Semibold"
                    key={currentIndex} // Helps React recognize each month as unique
                >
                    {getMonth(currentIndex)}
                </div>

                <div
                    className="w-[122px] text-center text-neutral-400 cursor-pointer"
                    onClick={handleNext}
                >
                    {getMonth(currentIndex + 1)}
                </div>
            </div>
            <div>
                <Image
                    src="/images/icons/arrow_forward.svg"
                    alt="arrow_forward"
                    height={24}
                    width={24}
                    onClick={handleNext}
                />
            </div>
        </div>
    );
}
