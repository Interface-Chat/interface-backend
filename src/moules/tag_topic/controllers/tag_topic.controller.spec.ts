import { Test, TestingModule } from '@nestjs/testing';
import { TagTopicController } from './tag_topic.controller';
import { TagTopicService } from '../services/tag_topic.service';

describe('TagTopicController', () => {
  let controller: TagTopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagTopicController],
      providers: [TagTopicService],
    }).compile();

    controller = module.get<TagTopicController>(TagTopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
