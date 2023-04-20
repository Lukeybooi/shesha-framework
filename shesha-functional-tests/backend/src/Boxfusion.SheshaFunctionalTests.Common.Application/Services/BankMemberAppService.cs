﻿using Abp.Domain.Repositories;
using Boxfusion.SheshaFunctionalTests.Common.Application.Services.Dto;
using Boxfusion.SheshaFunctionalTests.Common.Domain.Domain;
using Shesha;
using Shesha.DynamicEntities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Boxfusion.SheshaFunctionalTests.Common.Application.Services
{
    public class BankMemberAppService: SheshaAppServiceBase
    {
        private readonly IRepository<Bank, Guid> _bankRepo;
        private readonly IRepository<Member, Guid> _memberRepo;

        public BankMemberAppService(IRepository<Bank, Guid> bankRepo, IRepository<Member, Guid> memberRepo)
        {
            _bankRepo = bankRepo;
            _memberRepo = memberRepo;
        }

        public async Task<DynamicDto<Bank, Guid>> CreateBankWithMembersAsync (BankMemberDto input)
        {
            var bank = ObjectMapper.Map<Bank>(input);
            var bankEntity = await _bankRepo.InsertAsync(bank);

            input.Members.ForEach(async member =>
            {
                using (var uow = UnitOfWorkManager.Begin())
                {
                    await SaveOrUpdateEntityAsync<Member>(member, async item =>
                    {
                        item.Bank = bankEntity;
                    });
                    await uow.CompleteAsync();
                }
            });
            return await MapToDynamicDtoAsync<Bank, Guid>(bankEntity);
        }

        public async Task<BankMemberDto> GetBankWithMembers (Guid id)
        {
            var bank = await _bankRepo.GetAsync(id);
            var bankMembers = new BankMemberDto()
            {
                Address = bank.Address.Id,
                Description = bank.Description,
                Id = bank.Id,
                Name = bank.Name,
                Members = _memberRepo.GetAll().Where(x => x.Bank.Id == bank.Id).Select(x => x.Id).ToList()
            };
            return ObjectMapper.Map<BankMemberDto>(bankMembers);
        }
    }
}