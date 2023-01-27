using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
     
        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            return HandleResult(await Mediator.Send(new List.Query())) ;
        }

        [Authorize]
        [HttpGet("{id}")] // api/activities/jsdfuekdir
        public async Task<IActionResult> GetActivity(Guid id){
            
           return HandleResult(await Mediator.Send(new Detials.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){
            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}