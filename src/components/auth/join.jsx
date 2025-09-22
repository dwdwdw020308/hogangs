import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import useAuthStore from "../../store/useAuthStore";

const Join = () => {
  const closeLoginModal = useAuthStore((s) => s.closeLoginModal);
  const addUser = useAuthStore((s) => s.addUser);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    name: "",
    password: "",
    passwordCheck: "",
    email: "",
    birth: "",
    tel: "",
  });

  return (
    <div>
      {step === 1 && (
        <Step1
          setStep={setStep}
          user={user}
          setUser={setUser}
          onClose={closeLoginModal}
          step={step}
        />
      )}
      {step === 2 && (
        <Step2
          setStep={setStep}
          user={user}
          setUser={setUser}
          onClose={closeLoginModal}
          step={step}
        />
      )}
      {step === 3 && (
        <Step3
          onClose={closeLoginModal}
          user={user}
          setUser={setUser}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default Join;
