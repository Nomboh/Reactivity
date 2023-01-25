using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$",
         ErrorMessage = "password must be greater than 4 and less than 8")]
        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }
        public string Username { get; set; }
    }
}