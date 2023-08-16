import { Test, TestingModule } from '@nestjs/testing';
import { TagTopicService } from './tag_topic.service';

describe('TagTopicService', () => {
  let service: TagTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagTopicService],
    }).compile();

    service = module.get<TagTopicService>(TagTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
