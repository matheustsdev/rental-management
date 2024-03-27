using Backend.Domain.Constants;

namespace Backend.Domain.Helpers
{
    public class ResponseModel<TResult>
    {
        public string Message {  get; set; }

        public TResult Result {  get; set; }

        public EStatusResponse Status {  get; set; }

        public ResponseModel(string _message, TResult _result, EStatusResponse _status)
        {
            Message = _message;
            Result = _result;
            Status = _status;
        }
    }
}
