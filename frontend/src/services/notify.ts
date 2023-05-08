import { toast } from 'react-hot-toast';

class Notify {
  public success(message: string): void {
    toast.success(message);
  }

  public error(message: string): void {
    toast.error(message);
  }

  public warning(message: string): void {
    throw new Error('not implemented');
  }
}

export default new Notify();
