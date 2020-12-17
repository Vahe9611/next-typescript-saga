import React, { useEffect, useCallback, useMemo, useState } from 'react';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export interface NumberCounterProps {
  count?: number,
  onChange?: (variant: 'decrement' | 'increment') => void;
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  onChange = () => {},
  count = 0
}) => {
  const [counter, setCounter] = useState(count)

  useEffect(() => {
    setCounter(count)
  }, [count])

  const handleIncrement = useCallback(() => {
    const newCount = counter + 1
    
    setCounter(newCount);
    onChange('increment');
  }, [counter, onChange]);

  const handleDecrement = useCallback(() => {
    const newCount = counter - 1

    setCounter(newCount);
    onChange('decrement');
  }, [counter, onChange]);

  const disableIncrement = useMemo(() => counter === 0, [counter])

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button disabled={disableIncrement} onClick={handleDecrement}>-</Button>
      <Button disabled>{counter}</Button>
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  );
};

export default NumberCounter;
