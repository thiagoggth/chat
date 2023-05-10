'use client';
import { ApiResponse } from '@/@types/apiTypes';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Title } from '@/components/Title';
import { ROUTES } from '@/constants/Routes';
import { useAuth } from '@/contexts/AuthContext';
import notify from '@/services/notify';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const RegisterTest = () => (
  <p className="text-gray-600">
    Ainda não possui cadastro click{' '}
    <Link className="text-purple-600" href={ROUTES.public.registerUser}>
      aqui
    </Link>{' '}
    para se cadastrar
  </p>
);

interface LoginUserDto {
  email: string;
  password: string;
}

export default function Login() {
  // mandar para o back, tratar resposta e criar a pagina home
  const { signIn } = useAuth();
  const [errorList, setErrorList] = useState<Record<string, string>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginDto: LoginUserDto = { email, password };
    try {
      await signIn(loginDto);
      // logica de login
    } catch (error: any) {
      if (!(error instanceof AxiosError)) throw error;

      const apiResult: ApiResponse<null> | undefined = error.response?.data;
      if (!apiResult) return;
      notify.error(apiResult?.message);

      const fieldErrors = apiResult.errors;
      for (const fieldError of fieldErrors) {
        {
          const newErrorList = { ...errorList };
          newErrorList[fieldError.propName] = fieldError.message;
          setErrorList(newErrorList);
        }
      }
    }
  };

  const clearFieldError = (name: string) => {
    if (!errorList || !errorList[name]) return;
    const newErrorList = { ...errorList };
    delete newErrorList[name];
    if (Object.keys(errorList).length === 0) {
      setErrorList(undefined);
    } else {
      setErrorList(newErrorList);
    }
  };

  return (
    <Card>
      <Title>Entrar</Title>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="E-mail"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
            clearFieldError('email');
          }}
          name="email"
          placeholder="Digite seu e-mail Ex: email@email.com"
          type="email"
          error={errorList && errorList.email}
        />
        <Input
          label="Senha"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
            clearFieldError('password');
          }}
          type="password"
          name="password"
          placeholder="Digite sua senha"
          autoComplete="on"
          error={errorList && errorList.password}
        />
        <div className="flex flex-col">
          <Button>Entrar</Button>
          <RegisterTest />
        </div>
      </form>
    </Card>
  );
}
