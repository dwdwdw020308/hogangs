const RadioInput = ({ radioName, radioValue, handler, sel, text }) => {
    const inputProps = handler ? { onChange: handler } : { readOnly: true };

    return (
        <label className="choice">
            <input
                className="radio-donut"
                type="radio"
                name={radioName}
                value={radioValue}
                checked={sel === radioValue}
                {...inputProps}
            />

            <span className="txt">{text}</span>
        </label>
    );
};

// style/base/_default.scss 에서 css 적용
//
export default RadioInput;
