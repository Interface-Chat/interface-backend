import { Test, TestingModule } from '@nestjs/testing';
import { UserToTopicController } from './user_to_topic.controller';
import { UserToTopicService } from '../services/user_to_topic.service';

describe('UserToTopicController', () => {
  let controller: UserToTopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToTopicController],
      providers: [UserToTopicService],
    }).compile();

    controller = module.get<UserToTopicController>(UserToTopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
