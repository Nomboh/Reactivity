namespace API.Middleware
{
    public class AppException
    {
        public AppException(int statusCode, string message, string detials = "")
        {
            StatusCode = statusCode;
            Message = message;
            Detials = detials;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Detials { get; set; }
    }
}