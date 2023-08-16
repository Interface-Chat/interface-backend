import { Test, TestingModule } from '@nestjs/testing';
import { TopicContentsService } from './topic_contents.service';

describe('TopicContentsService', () => {
  let service: TopicContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicContentsService],
    }).compile();

    service = module.get<TopicContentsService>(TopicContentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
