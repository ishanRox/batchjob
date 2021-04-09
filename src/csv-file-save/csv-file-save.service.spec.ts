import { Test, TestingModule } from '@nestjs/testing';
import { CsvFileSaveService } from './csv-file-save.service';

describe('CsvFileSaveService', () => {
  let service: CsvFileSaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvFileSaveService],
    }).compile();

    service = module.get<CsvFileSaveService>(CsvFileSaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
