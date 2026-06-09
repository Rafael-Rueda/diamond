"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export type StepperVariant = "horizontal" | "vertical" | "progress" | "numbered" | "segmented" | "editorial";

export interface StepperStep {
    label: string;
    description?: string;
}

const stepperVariants = cva("w-full max-w-[320px] text-sm", {
    variants: {
        variant: {
            horizontal: "",
            vertical: "",
            progress: "",
            numbered: "",
            segmented: "",
            editorial: "",
        },
    },
    defaultVariants: { variant: "horizontal" },
});

export interface StepperProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof stepperVariants> {
    steps?: StepperStep[];
    currentStep?: number;
}

const defaultSteps: StepperStep[] = [{ label: "Account" }, { label: "Details" }, { label: "Review" }];

export const Stepper = React.forwardRef<HTMLElement, StepperProps>(function Stepper(
    { className, variant = "horizontal", steps = defaultSteps, currentStep = 1, ...rest },
    ref,
) {
    const progress = ((currentStep + 1) / steps.length) * 100;

    if (variant === "progress") {
        return (
            <section ref={ref} aria-label="Progress" className={cn(stepperVariants({ variant }), className)} {...rest}>
                <div className="mb-2 flex justify-between font-mono text-(--diamond-muted,#6b6862) text-[10px] uppercase tracking-[0.1em]">
                    <span>
                        Step {currentStep + 1} / {steps.length}
                    </span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-(--diamond-surface-alt,#ebe8e1)">
                    <div className="h-full bg-(--diamond-accent,#2b7fff)" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-3 font-semibold text-(--diamond-ink,#1a1917)">{steps[currentStep]?.label}</div>
                {steps[currentStep]?.description && (
                    <p className="m-0 text-(--diamond-muted,#6b6862) text-[12px]">{steps[currentStep]?.description}</p>
                )}
            </section>
        );
    }

    if (variant === "segmented") {
        return (
            <section ref={ref} aria-label="Progress" className={cn(stepperVariants({ variant }), className)} {...rest}>
                <div className="flex gap-1">
                    {steps.map((step, index) => (
                        <span
                            key={step.label}
                            className={cn(
                                "h-1.5 flex-1 rounded-full",
                                index <= currentStep
                                    ? "bg-(--diamond-accent,#2b7fff)"
                                    : "bg-(--diamond-surface-alt,#ebe8e1)",
                            )}
                        />
                    ))}
                </div>
                <div className="mt-2 flex justify-between text-(--diamond-muted,#6b6862) text-[12px]">
                    <span>{steps[currentStep]?.label}</span>
                    <span className="font-semibold text-(--diamond-accent,#2b7fff)">
                        {currentStep + 1} / {steps.length}
                    </span>
                </div>
            </section>
        );
    }

    return (
        <nav ref={ref} aria-label="Steps" className={cn(stepperVariants({ variant }), className)} {...rest}>
            <ol
                className={cn(
                    "flex items-start",
                    variant === "vertical" && "flex-col gap-2",
                    variant === "numbered" && "gap-0",
                    variant === "editorial" && "items-center",
                )}
            >
                {steps.map((step, index) => {
                    const done = index < currentStep;
                    const current = index === currentStep;
                    return (
                        <React.Fragment key={step.label}>
                            <li
                                className={cn(
                                    "flex flex-col items-center gap-1",
                                    variant === "vertical" && "flex-row gap-3",
                                    variant === "numbered" && "flex-row",
                                )}
                            >
                                <span
                                    aria-current={current ? "step" : undefined}
                                    className={cn(
                                        "flex size-6 items-center justify-center rounded-full border border-(--diamond-border,#d9d5cc) bg-(--diamond-surface-alt,#ebe8e1) font-bold font-mono text-(--diamond-muted,#6b6862) text-[11px]",
                                        done &&
                                            "border-(--diamond-accent,#2b7fff) bg-(--diamond-accent,#2b7fff) text-white",
                                        current &&
                                            "border-(--diamond-accent,#2b7fff) border-2 bg-(--diamond-surface,#fff) text-(--diamond-accent,#2b7fff)",
                                        variant === "numbered" && "h-6 w-9 rounded-md",
                                        variant === "editorial" &&
                                            current &&
                                            "size-9 border-[3px] font-serif text-[14px]",
                                    )}
                                >
                                    {done ? "OK" : index + 1}
                                </span>
                                <span
                                    className={cn(
                                        "whitespace-nowrap text-[10px] uppercase tracking-[0.08em]",
                                        current || done
                                            ? "text-(--diamond-ink,#1a1917)"
                                            : "text-(--diamond-muted,#6b6862)",
                                        variant === "editorial" &&
                                            "font-serif text-[12px] normal-case italic tracking-0",
                                    )}
                                >
                                    {step.label}
                                </span>
                            </li>
                            {index < steps.length - 1 && variant !== "vertical" && (
                                <li
                                    className={cn(
                                        "mt-3 h-px flex-1 bg-(--diamond-border,#d9d5cc)",
                                        done && "bg-(--diamond-accent,#2b7fff)",
                                        variant === "editorial" && "mt-4",
                                    )}
                                    aria-hidden="true"
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
});

Stepper.displayName = "Diamond.Stepper";

export { stepperVariants };
