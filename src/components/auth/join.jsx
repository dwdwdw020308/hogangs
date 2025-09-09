import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useDispatch } from 'react-redux';

const Join = ({ onClose }) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        birth: '',
        tel: '',
    });

    const nextStep = () => {
        if (step === 2) {
            if (!user.name || !user.email || !user.tel) {
                alert('필수 항목을 입력해주세요');
                return;
            }
            dispatch();
        }
        setStep((prev) => prev + 1);
    };

    return (
        <div>
            {step === 1 && <Step1 onNext={nextStep} onClose={onClose} step={step} />}
            {step === 2 && <Step2 onNext={nextStep} onClose={onClose} step={step} />}
            {step === 3 && <Step3 onClose={onClose} />}
        </div>
    );
};

export default Join;
