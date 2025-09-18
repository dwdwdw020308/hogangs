import { useEffect, useState } from 'react';
import RadioInput from '../../common/RadioInput';

const Radio = ({ setEnableTime }) => {
    const [value, setValue] = useState('ok'); // "extend" | "ok"
    const onChange = (value) => setValue(value);

    useEffect(() => {
        setEnableTime(value === 'extend');
    }, [value, setEnableTime]);

    return (
        <fieldset className="radio_area" role="radiogroup" aria-label="퇴실 연장 여부">
            <RadioInput
                radioName="extend"
                radioValue="extend"
                sel={value}
                handler={() => onChange('extend')}
                text="연장할게요."
            />
            <RadioInput
                radioName="ok"
                radioValue="ok"
                sel={value}
                handler={() => onChange('ok')}
                text="괜찮아요."
            />
        </fieldset>
    );
};

export default Radio;
