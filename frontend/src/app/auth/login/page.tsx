'use client';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Title } from '@/components/Title';
import { useState } from 'react';

const RegisterTest = () => (
  <p className="text-gray-600">
    Ainda não possui cadastro click{' '}
    <a className="text-purple-600" href="#">
      aqui
    </a>{' '}
    para se cadastrar
  </p>
);

export default function Login() {
  const [error, setError] = useState<string>();

  return (
    <div className="flex items-center justify-center bg-zinc-800 p-2 h-screen">
      <Card>
        <Title>Entrar</Title>
        <Input
          onChange={() => setError(undefined)}
          label="E-mail"
          name="email"
          placeholder="Digite seu e-mail Ex: email@email.com"
          error={error}
        />
        <Input label="Senhas" name="password" type="password" placeholder="Digite sua senha" />
        <div className="flex flex-col">
          <Button onClick={() => setError('E-mail invalido')}>Entrar</Button>
          <RegisterTest />
        </div>
      </Card>
    </div>
  );
}
