'use client';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Title } from '@/components/Title';
import { ROUTES } from '@/constants/Routes';
import api from '@/services/api';
import notify from '@/services/notify';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type ApiResponse<T = any> = {
  data: T;
  message: string;
  success: boolean;
  errors: { name: string; message: string }[];
};

interface CreateUserDto {
  name: string;
  password: string;
  email: string;
}

const Register = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createUserDto: CreateUserDto = { email, name, password };
    try {
      const { data: result } = await api.post<ApiResponse<{ id: string }>>('/users', createUserDto);
      notify.success(result.message);
      push(ROUTES.public.login);
    } catch (error: any) {
      if (!(error instanceof AxiosError)) throw error;
      notify.error(error.response?.data.message);
    }
  };

  return (
    <Card className="w-full max-w-xl ">
      <Title>Registro de usuário</Title>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full flex-col">
        <Input
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          label="Nome"
          name="name"
          placeholder="Digite seu nome completo"
        />
        <Input
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          label="E-mail"
          name="email"
          placeholder="Digite seu e-mail Ex: email@email.com"
          type="email"
        />
        <Input
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          label="Senha"
          type="password"
          autoComplete="on"
          name="password"
          placeholder="Digite sua senha"
        />
        <Button type="submit" className="mt-4">
          Registrar
        </Button>
      </form>
    </Card>
  );
};

export default Register;
