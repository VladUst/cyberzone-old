import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selector/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selector/getLoginPassword/getLoginPassword';
import { getLoginLoading } from '../../model/selector/getLoginLoading/getLoginLoading';
import { getLoginError } from '../../model/selector/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';

export interface LoginFormProps {
  className?: string
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
};

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);

  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);
  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);
  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);
  return (
      <DynamicModuleLoader
          removeAfterUnmount
          reducers={initialReducers}
      >
          <div className={classNames(cls.LoginForm, {}, [className])}>
              <Text title={t('Авторизация')}/>
              {error && <Text text={t('Неверный логин или пароль')} theme={TextTheme.ERROR}/>}
              <Input autofocus
                     type="text"
                     className={cls.input}
                     placeholder={t('Введите имя')}
                     onChange={onChangeUserName}
                     value={username}
              />
              <Input
                  type="text"
                  className={cls.input}
                  placeholder={t('Введите пароль')}
                  onChange={onChangePassword}
                  value={password}
              />
              <Button className={cls.loginBtn}
                      theme={ButtonTheme.OUTLINE}
                      onClick={onLoginClick}
                      disabled={isLoading}
              >
                  {t('Войти')}
              </Button>
          </div>
      </DynamicModuleLoader>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;
