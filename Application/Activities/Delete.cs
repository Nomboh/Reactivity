using Domain;
using MediatR;
using Application.Core;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command :  IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit> > Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.Id);
                //if(activity == null) return null;

                _context.Remove(activity);
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("We could not delete this activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}