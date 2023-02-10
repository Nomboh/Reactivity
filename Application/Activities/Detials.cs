using Domain;
using MediatR;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Activities
{
    public class Detials
    {
        public class Query : IRequest<Result<ActivityDto>>{

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
                
            }
            async Task<Result<ActivityDto>> IRequestHandler<Query, Result<ActivityDto>>.Handle(Query request, CancellationToken cancellationToken)
            {
                var activity =  await _context.Activities.ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, 
                    new {currentUsername = _userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(a => a.Id == request.Id);
                return Result<ActivityDto>.Success(activity);
            }
        }
    }
}