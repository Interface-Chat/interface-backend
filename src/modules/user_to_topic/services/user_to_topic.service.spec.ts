import { Test, TestingModule } from '@nestjs/testing';
import { UserToTopicService } from './user_to_topic.service';

describe('UserToTopicService', () => {
  let service: UserToTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserToTopicService],
    }).compile();

    service = module.get<UserToTopicService>(UserToTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
