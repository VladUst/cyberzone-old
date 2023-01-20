import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>;

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autofocus?: boolean
  readonly?: boolean
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;
  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlurHandler = () => {
    setIsFocused(false);
  };

  const onFocusHandler = () => {
    setIsFocused(true);
  };

  const onSelectHandler = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const mods: Mods = {
    [cls.readonly]: readonly
  };

  return (
      <div className={classNames(cls.InputWrapper, mods, [className])}>
          {placeholder && (
          <div className={cls.placeholder}>
              {`${placeholder}>`}
          </div>
          )}
          <div className={cls.caretWrapper}>
              <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onSelect={onSelectHandler}
                    readOnly={readonly}
                    {...otherProps}
                />
              {isCaretVisible && (
                  <span
                    className={cls.caret}
                    style={{ left: `${caretPosition * 9}px` }}
              />
              )}
          </div>
      </div>
  );
});

Input.displayName = 'Input';
