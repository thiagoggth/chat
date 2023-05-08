'use client';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Title } from '@/components/Title';
import { ROUTES } from '@/constants/Routes';
import Link from 'next/link';
import { useState } from 'react';

const RegisterTest = () => (
  <p className="text-gray-600">
    Ainda não possui cadastro click{' '}
    <Link className="text-purple-600" href={ROUTES.public.registerUser}>
      aqui
    </Link>{' '}
    para se cadastrar
  </p>
);

export default function Login() {
  const [error, setError] = useState<string>();

  return (
    <Card>
      <Title>Entrar</Title>
      <form className="flex flex-col gap-4">
        <Input
          label="E-mail"
          name="email"
          onChange={() => setError(undefined)}
          placeholder="Digite seu e-mail Ex: email@email.com"
          type="email"
          error={error}
        />
        <Input
          label="Senhas"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          autoComplete="on"
        />
        <div className="flex flex-col">
          <Button onClick={() => setError('E-mail invalido')}>Entrar</Button>
          <RegisterTest />
        </div>
      </form>
    </Card>
  );
}
