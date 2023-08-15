import { Test, TestingModule } from '@nestjs/testing';
import { TopicContentsController } from './topic_contents.controller';
import { TopicContentsService } from '../topic_contents.service';

describe('TopicContentsController', () => {
  let controller: TopicContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicContentsController],
      providers: [TopicContentsService],
    }).compile();

    controller = module.get<TopicContentsController>(TopicContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
