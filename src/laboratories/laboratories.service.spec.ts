import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from '../_utils/enum/status.enum';
import { Laboratory } from './entities/laboratory.entity';

import { LaboratoriesService } from './laboratories.service';

describe('LaboratoriesService', () => {
  let service: LaboratoriesService;
  const repositoryFake = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((lab) => Promise.resolve(lab)),
    find: jest.fn().mockImplementation((labs) => Promise.resolve(labs)),
    findOne: jest.fn().mockImplementation((id) => Promise.resolve(id)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LaboratoriesService,
        {
          provide: getRepositoryToken(Laboratory),
          useValue: repositoryFake,
        },
      ],
    }).compile();
    service = module.get<LaboratoriesService>(LaboratoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('func create(createLaboratoryDto)', () => {
    describe('when a laboratory is created', () => {
      it('should new laboratory and return that', async () => {
        const payload = {
          name: 'fake-name',
          address: 'fake-address',
          status: Status.ACTIVE,
        };
        expect(await service.create(payload)).toEqual(payload);
      });
    });
  });

  describe('func findAll()', () => {
    describe('when laboratories are researched', () => {
      it('should sent a object where status is active { where: { status: active } }', async () => {
        expect(await service.findAll()).toEqual({
          where: { status: Status.ACTIVE },
        });
      });
      it('should return a list', async () => {
        const payload = {
          id: 1,
          name: 'fake-name',
          address: 'fake-address',
          status: Status.ACTIVE,
        };
        jest
          .spyOn(repositoryFake, 'find')
          .mockImplementation(() =>
            Promise.resolve([payload, { ...payload, id: 2 }]),
          );

        expect(await service.findAll()).toEqual([
          payload,
          { ...payload, id: 2 },
        ]);
      });
      it('should return only active laboratories', async () => {
        const payload = {
          name: 'fake-name',
          address: 'fake-address',
          status: Status.ACTIVE,
        };

        jest
          .spyOn(repositoryFake, 'find')
          .mockImplementation(() => Promise.resolve([payload, payload]));

        const fundedLaboratories = await service.findAll();

        fundedLaboratories.map((lab) => {
          expect(lab.status).toEqual(Status.ACTIVE);
        });
      });
    });
  });

  describe('func findOne(id)', () => {
    describe('when a laboratory by id is researched', () => {
      it('should the func receive a id', async () => {
        expect(await service.findOne(1)).toEqual(1);
      });
      it('should be return a laboratory', async () => {
        const payload = {
          id: 1,
          name: 'fake-name',
          address: 'fake-address',
          status: Status.ACTIVE,
        };

        jest
          .spyOn(repositoryFake, 'findOne')
          .mockImplementation(() => Promise.resolve(payload));
        expect(await service.findOne(1)).toEqual(payload);
        expect(await (await service.findOne(1)).id).toEqual(payload.id);
      });
      it('when not found it should return 404', async () => {
        const result = {
          statusCode: 404,
          message: 'Not Found',
        };

        jest
          .spyOn(repositoryFake, 'findOne')
          .mockImplementation(() => Promise.resolve(result));
        expect(await service.findOne(1)).toEqual(result);
      });
    });
  });
});
