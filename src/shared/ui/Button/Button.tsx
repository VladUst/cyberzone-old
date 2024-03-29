import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}
export enum ButtonRadius {
  RIGHT = 'radius_right',
  LEFT = 'radius_left',
  NONE = 'radius_none'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  children?: ReactNode
  radius?: ButtonRadius
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    radius = ButtonRadius.NONE,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: otherProps.disabled
  };

  return (
      <button className={classNames(cls.Button, mods, [className, cls[theme], cls[radius]])}
                {...otherProps}
        >
          {children}
      </button>
  );
});
