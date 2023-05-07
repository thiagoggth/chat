import { LoginUseCaseFactory } from '../../../src/factories/useCases/auth/LoginUseCaseFactory';
import { Id } from '../../../src/modules/@shared/domain/valueObjects/Id';
import { Channel, ChannelType } from '../../../src/modules/channel/domain/entities/Channel';
import { ChannelRepository } from '../../../src/modules/channel/repositories/ChannelRepository';

export async function createAndLogin(email: string, password: string) {
  const loginData = await LoginUseCaseFactory.make().handler({
    email,
    password
  });

  return loginData;
}

export async function createValidDirectChannel() {
  const channel = new Channel({
    membersIds: [
      new Id('b03f3e31-f8d9-4868-8811-069c772a4b9c'),
      new Id('21cec9c4-407e-422e-9474-f36807b735ac')
    ],
    type: ChannelType.DIRECT
  });

  await new ChannelRepository().create(channel);
  return channel;
}
