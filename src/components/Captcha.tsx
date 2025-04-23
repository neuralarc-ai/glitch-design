
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface CaptchaProps {
  onResult: (valid: boolean, value: string) => void;
  disabled?: boolean;
}

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Captcha: React.FC<CaptchaProps> = ({ onResult, disabled }) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [input, setInput] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const x = getRandomInt(2, 10);
    const y = getRandomInt(2, 10);
    setA(x);
    setB(y);
    setInput("");
    setDirty(false);
    onResult(false, "");
    // eslint-disable-next-line
  }, [disabled]); // refresh on dialog re-open or submit

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setDirty(true);
    const val = parseInt(e.target.value, 10);
    const valid = !isNaN(val) && val === a + b;
    onResult(valid, e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="captcha" className="text-glitch-acid-green text-sm font-mono">
        Prove you aren’t a bot: <span className="font-bold">{a} + {b} = ?</span>
      </label>
      <Input
        id="captcha"
        name="captcha"
        placeholder="Your answer"
        autoComplete="off"
        value={input}
        onChange={handleChange}
        disabled={disabled}
        className={
          dirty
            ? parseInt(input, 10) === a + b
              ? "border-glitch-acid-green"
              : "border-glitch-neon-pink"
            : ""
        }
        required
      />
      {dirty && parseInt(input, 10) !== a + b && (
        <span className="text-xs text-glitch-neon-pink">Incorrect answer. Try again.</span>
      )}
    </div>
  );
};

export default Captcha;
