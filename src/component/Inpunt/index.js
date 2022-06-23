import React from "react";
import { components } from "react-select";

export const Input = (props) => {
    const { autoComplete, onAutoFill } = props.selectProps;

    const onAnimationStart = !onAutoFill
        ? undefined
        : (e) => {
            const animationNames = ["onAutoFillStart", "onAutoFillCancel"];
            if (e.animationName === "onAutoFillStart") {
                //this.setAutofill();
            } else {
                //this.clearAutofill();
                //this.clearAutofilled();
            }
            animationNames.includes(e.animationName) && onAutoFill(e);
        };

    return (
        <components.Input
            {...props}
            onAnimationStart={onAnimationStart}
            autoComplete={autoComplete || props.autoComplete}
        />
    );
};