import { ApiResponse } from '@/@types/apiTypes';
import api from './api';

export type LoginDtoInput = {
  email: string;
  password: string;
};

export type LoginDtoOutput = {
  token: string;
  user: { id: string };
};

class AuthService {
  async login(loginDto: LoginDtoInput): Promise<ApiResponse<LoginDtoOutput>> {
    const { data: result } = await api.post<ApiResponse<LoginDtoOutput>>('/auth/login', loginDto);
    return result;
  }
}

export default new AuthService();
