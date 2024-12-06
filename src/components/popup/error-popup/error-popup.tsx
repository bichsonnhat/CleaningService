import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type ErrorPopupProps = {
  isOpen?: boolean;
  countdownNumber?: number;
};

const ErrorPopup = ({
  isOpen = false,
  countdownNumber = 15,
}: ErrorPopupProps) => {
  const router = useRouter();
  const navigateToHome = useCallback(() => router.push("/"), [router]);

  const [currentNumber, setCurrentNumber] = useState(countdownNumber);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        const remaining = currentNumber - 1;

        if (remaining <= 0) {
          setCurrentNumber(0);
          navigateToHome();
        } else {
          setCurrentNumber(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentNumber, navigateToHome, isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogHeader></DialogHeader>
      <DialogContent className="flex flex-col gap-10 justify-center items-center">
        <div className="size-20">
          <svg width={100} height={100} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              strokeWidth="10"
              r="45"
              className="stroke-red-200 fill-none"
            />
            <circle
              r="45"
              cx="50"
              cy="50"
              strokeWidth="10"
              transform="rotate(-90 50 50)"
              style={{
                strokeDasharray: 45 * Math.PI * 2,
                strokeDashoffset:
                  45 * Math.PI * 2 * (1 - currentNumber / countdownNumber),
              }}
              className="[stroke-linecap:round] [stroke-linejoin:round] stroke-red-500 fill-none animate-[countdown_15s_linear_forwards]"
            />
            <text
              x="50%"
              y="50%"
              dy="0.3em"
              textAnchor="middle"
              fill="#ef4444"
              fontSize={32}
              fontFamily="Averta-Bold"
            >
              {currentNumber}
            </text>
          </svg>
        </div>
        <div className="space-y-2 text-center">
          <h4 className="text-xl text-red-700 font-bold">
            Service Temporarily Unavailable
          </h4>
          <p className="text-sm text-black">
            We apologize, but all helpers are currently fully booked.
            <br />
            Our team is working hard to expand our available resources.
          </p>
          <p className="text-sm text-black font-semibold">
            You will be redirected to the homepage in a few moments.
          </p>
        </div>
        <DialogFooter className="flex justify-center">
          <Button
            className="bg-error-100 hover:bg-error-200"
            onClick={navigateToHome}
          >
            Back To Homepage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorPopup;
