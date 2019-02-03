namespace Machete.Api.ViewModels
{
    public class TransportProviderAvailability : BaseModel
    {
        public int day { get; set; }
        public bool available { get; set; }
    }
}