using Domain;
using MediatR;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Detials
    {
        public class Query : IRequest<Result<Activity>>{

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
        private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
                
            }
            async Task<Result<Activity>> IRequestHandler<Query, Result<Activity>>.Handle(Query request, CancellationToken cancellationToken)
            {
                var activity =  await _context.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}