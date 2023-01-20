using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Detials
    {
        public class Query : IRequest<Activity>{

            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
        private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
                
            }
            async Task<Activity> IRequestHandler<Query, Activity>.Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}