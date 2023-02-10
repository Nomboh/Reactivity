using Application.Following;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController: BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username){
            return HandleResult(await Mediator.Send(
                new ToggleFollowing.Command{TargetUsername = username}));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollows(string username, string predicate){
            return HandleResult(await Mediator.Send(
                new List.Query{Username = username, Predicate = predicate}
            ));
        }
    }
}